import { ArrowDownward, ArrowUpward, Delete, FiberManualRecord, Stop } from "@mui/icons-material";
import { Box, Button, IconButton, Stack, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { ViaKeyboard } from "../services/vialKeyboad";
import { quantumTranslations, type UiLanguage } from "../locales/translations";
import { KeycodeConverter, QmkKeycode } from "./keycodes/keycodeConverter";
import { EditableKey } from "./KeymapEditor";
import { KeycodeCatalog } from "./KeycodeCatalog";


export function MacroEditor(props: {
  via: ViaKeyboard;
  keycodeConverter: KeycodeConverter;
  macroIndex: number;
  macroCount: number;
  language?: UiLanguage;
}) {
  const [macroData, setMacroData] = useState<{ [id: number]: number[] }>({});
  const boundaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    navigator.locks.request("load-macro", async () => {
      if (props.macroIndex < 0 || props.macroIndex >= props.macroCount) return;
      const newMacro = (await getMacros(props.macroIndex)) ?? macroData;
      setMacroData(newMacro);
    });
  }, [props.macroIndex, props.macroCount]);

  const getMacros = async (macroIndex: number) => {
    if (macroIndex < 0 || macroIndex >= props.macroCount) return macroData;
    const fetchedMacroIndex = Object.keys(macroData)
      .map((k) => parseInt(k))
      .sort((a, b) => a - b);
    if (macroIndex != fetchedMacroIndex.findIndex((k) => k === macroIndex)) {
      const readOffset = fetchedMacroIndex.reduce(
        (acc, num, idx) => {
          return num === idx
            ? { id: idx + 1, offset: acc.offset + macroData[idx].length + 1 }
            : acc;
        },
        { id: 0, offset: 0 },
      );
      const readLength = 28 * 4;
      const macroArray: number[][] = [[]];

      while (readOffset.id + macroArray.length <= macroIndex + 1) {
        const buffer = await props.via.GetMacroBuffer(readOffset.offset, readLength);
        buffer.reduce((acc, num) => {
          if (num === 0) {
            acc.push([]);
          } else {
            acc[acc.length - 1].push(num);
          }
          return acc;
        }, macroArray);
        readOffset.offset += readLength;
      }
      macroArray.pop();

      const newMacro = { ...macroData };
      macroArray.forEach((macro, idx) => {
        if (readOffset.id + idx < props.macroCount) newMacro[readOffset.id + idx] = macro;
      });

      console.log(newMacro);

      return newMacro;
    }
  };

  const sendMacros = (offset: number, data: number[]) => {
    props.via.SetMacroBuffer(offset, data);
  };

  const saveMacros = async (actions: number[][], macroIndex: number) => {
    const actionBuffer = actions
      .map((action) => {
        if (action[0] == 1) {
          if (action[1] < 4) {
            if (action[2] == 0) return [];
            else if (action[2] > 0xff) {
              return [
                action[0],
                action[1] + 4,
                action[2] & 0xff,
                action[2] >> 8,
              ];
            } else {
              return [action[0], action[1], action[2] & 0xff];
            }
          } else if (action[1] == 4) {
            const upperbyte = Math.floor(action[2] / 255) + 1;
            return [action[0], action[1], action[2] - (upperbyte - 1) * 255 + 1, upperbyte];
          } else {
            if (action[2] == 0) return [];
            else if (action[2] > 0xff) {
              return [action[0], action[1], action[2] & 0xff, action[2] >> 8];
            } else {
              return [action[0], action[1] - 4, action[2] & 0xff];
            }
          }
        } else {
          return action;
        }
      })
      .flat();

    const newMacroData = { ...macroData, ...(await getMacros(props.macroCount - 1)) };
    newMacroData[macroIndex] = actionBuffer;

    const writeOffset = Object.entries(macroData)
      .filter((m) => parseInt(m[0]) < macroIndex)
      .reduce((acc, m) => acc + m[1].length + 1, 0);

    const writeData = Object.entries(newMacroData)
      .filter((m) => parseInt(m[0]) >= macroIndex)
      .reduce((acc, m) => {
        acc.push(...m[1], 0);
        return acc;
      }, [] as number[]);
    console.log(`write macro data. offset:${writeOffset} length:${writeData.length}`);
    console.log(writeData);
    sendMacros(writeOffset, writeData);

    setMacroData(newMacroData);
  };

  return (
    <Box ref={boundaryRef}>
      <Box className="editor-title">{`${quantumTranslations[props.language ?? "en"].macro.title}${props.macroIndex}`}</Box>
      <MacroEntry
        buffer={macroData[props.macroIndex] ?? []}
        keycodeConverter={props.keycodeConverter}
        boundaryRef={boundaryRef}
        language={props.language}
        onSave={(actions: number[][]) => saveMacros(actions, props.macroIndex)}
      ></MacroEntry>
    </Box>
  );
}

function MacroEntry(props: {
  buffer: number[];
  keycodeConverter: KeycodeConverter;
  boundaryRef?: React.RefObject<HTMLDivElement>;
  language?: UiLanguage;
  onSave: (actions: number[][]) => void;
}) {
  const t = quantumTranslations[props.language ?? "en"];
  const [actions, setActions] = useState<number[][]>([[]]);
  const [focusedAction, setFocusedAction] = useState<number | null>(null);
  const [recording, setRecording] = useState(false);
  const heldKeys = useRef(new Map<string, number>());
  const lastRecordedAt = useRef<number | null>(null);

  const appendRecordedKey = (action: number[]) => {
    const now = performance.now();
    const previous = lastRecordedAt.current;
    lastRecordedAt.current = now;
    setActions((current) => {
      const next = [...current];
      if (previous !== null) {
        let delay = Math.round(now - previous);
        while (delay > 0) {
          const chunk = Math.min(delay, 64769);
          next.push([1, 4, chunk]);
          delay -= chunk;
        }
      }
      next.push(action);
      return next;
    });
  };

  const stopRecording = () => {
    const releases = [...heldKeys.current.entries()].map(([, keycode]) => [1, 3, keycode]);
    heldKeys.current.clear();
    lastRecordedAt.current = null;
    setRecording(false);
    if (releases.length) setActions((current) => [...current, ...releases]);
  };

  useEffect(() => {
    if (!recording) return;

    const keycodeNames: Record<string, string> = {
      Escape: "KC_ESCAPE", Enter: "KC_ENTER", NumpadEnter: "KC_KP_ENTER", Tab: "KC_TAB",
      Space: "KC_SPACE", Backspace: "KC_BACKSPACE", Delete: "KC_DELETE", Insert: "KC_INSERT",
      Home: "KC_HOME", End: "KC_END", PageUp: "KC_PAGE_UP", PageDown: "KC_PAGE_DOWN",
      ArrowLeft: "KC_LEFT", ArrowRight: "KC_RIGHT", ArrowUp: "KC_UP", ArrowDown: "KC_DOWN",
      CapsLock: "KC_CAPS_LOCK", PrintScreen: "KC_PSCREEN", ScrollLock: "KC_SCROLLLOCK", Pause: "KC_PAUSE",
      Minus: "KC_MINUS", Equal: "KC_EQUAL", BracketLeft: "KC_LEFT_BRACKET", BracketRight: "KC_RIGHT_BRACKET",
      Backslash: "KC_BACKSLASH", Semicolon: "KC_SEMICOLON", Quote: "KC_QUOTE",
      Backquote: "KC_GRAVE", Comma: "KC_COMMA", Period: "KC_DOT", Slash: "KC_SLASH",
      NumpadDivide: "KC_KP_SLASH", NumpadMultiply: "KC_KP_ASTERISK", NumpadSubtract: "KC_KP_MINUS",
      NumpadAdd: "KC_KP_PLUS", NumpadDecimal: "KC_KP_DOT", NumLock: "KC_NUM_LOCK",
      ShiftLeft: "KC_LEFT_SHIFT", ShiftRight: "KC_RIGHT_SHIFT", ControlLeft: "KC_LEFT_CTRL", ControlRight: "KC_RIGHT_CTRL",
      AltLeft: "KC_LEFT_ALT", AltRight: "KC_RIGHT_ALT", MetaLeft: "KC_LEFT_GUI", MetaRight: "KC_RIGHT_GUI",
      ContextMenu: "KC_MENU",
    };
    const toKeycode = (code: string) => {
      const name = keycodeNames[code] ??
        (/^Key[A-Z]$/.test(code) ? `KC_${code.slice(3)}` :
          /^Digit[0-9]$/.test(code) ? `KC_${code.slice(5)}` :
            /^F([1-9]|1[0-2])$/.test(code) ? `KC_${code}` :
              /^Numpad[0-9]$/.test(code) ? `KC_KP_${code.slice(6)}` : undefined);
      return name === undefined
        ? undefined
        : props.keycodeConverter.getTapKeycodeList().find(
            (keycode) => keycode.key === name || keycode.aliases?.includes(name),
          )?.value;
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const keycode = toKeycode(event.code);
      if (keycode === undefined) return;
      event.preventDefault();
      if (event.repeat || heldKeys.current.has(event.code)) return;
      heldKeys.current.set(event.code, keycode);
      appendRecordedKey([1, 2, keycode]);
    };
    const onKeyUp = (event: KeyboardEvent) => {
      const keycode = heldKeys.current.get(event.code);
      if (keycode === undefined) return;
      event.preventDefault();
      heldKeys.current.delete(event.code);
      appendRecordedKey([1, 3, keycode]);
    };
    const onWindowBlur = () => stopRecording();

    window.addEventListener("keydown", onKeyDown, true);
    window.addEventListener("keyup", onKeyUp, true);
    window.addEventListener("blur", onWindowBlur);
    return () => {
      window.removeEventListener("keydown", onKeyDown, true);
      window.removeEventListener("keyup", onKeyUp, true);
      window.removeEventListener("blur", onWindowBlur);
    };
  }, [recording, props.keycodeConverter]);

  useEffect(() => {
    setActions(getActions(props.buffer));
  }, [props.buffer]);

  const getActions = (buffer: number[]) => {
    const newActions: number[][] = [[]];
    let idx = 0;
    while (idx < buffer.length) {
      if (buffer[idx] == 1) {
        if (newActions[newActions.length - 1].length == 0) {
          newActions.pop();
        }
        newActions.push([buffer[idx]]);
        idx += 1;
        if (1 <= buffer[idx] && buffer[idx] <= 3) {
          const keycode = buffer[idx + 1];
          newActions[newActions.length - 1].push(buffer[idx], keycode);
          idx += 2;
          newActions.push([]);
        } else if (buffer[idx] == 4) {
          const delay = buffer[idx + 1] - 1 + (buffer[idx + 2] - 1) * 255;
          newActions[newActions.length - 1].push(buffer[idx], delay);
          idx += 3;
          newActions.push([]);
        } else if (5 <= buffer[idx] && buffer[idx] <= 7) {
          const keycode = buffer[idx + 1] | (buffer[idx + 2] << 8);
          newActions[newActions.length - 1].push(buffer[idx], keycode);
          idx += 3;
          newActions.push([]);
        }
      } else {
        newActions[newActions.length - 1].push(buffer[idx]);
        idx += 1;
      }
    }
    if (newActions[newActions.length - 1].length == 0) newActions.pop();
    return newActions;
  };

  return (
    <>
      <div>
        <Button
          color={recording ? "error" : "primary"}
          startIcon={recording ? <Stop /> : <FiberManualRecord />}
          onClick={() => {
            if (recording) {
              stopRecording();
            } else {
              heldKeys.current.clear();
              lastRecordedAt.current = null;
              setRecording(true);
            }
          }}
        >
          {recording ? t.macro.stopRecording : t.macro.startRecording}
        </Button>
      </div>
      {actions.map((action, idx) => {
        return (
          <Stack key={idx} className="macro-entry-row" direction={"row"} mt={0.5}>
            <IconButton
              className="macro-action-button macro-delete-button"
              sx={{
                color: "#fecaca",
                backgroundColor: "rgba(220, 38, 38, 0.22)",
                border: "1px solid rgba(248, 113, 113, 0.7)",
                "&:hover": {
                  color: "#fff1f2",
                  backgroundColor: "rgba(220, 38, 38, 0.42)",
                  borderColor: "#fca5a5",
                },
              }}
              onClick={() => setActions(actions.filter((_, id) => id !== idx))}
            >
              <Delete></Delete>
            </IconButton>
            <IconButton className="macro-action-button"
              sx={{
                color: "#bfdbfe",
                "&:hover": { backgroundColor: "rgba(96, 165, 250, 0.14)" },
              }}
              onClick={() => {
                if (idx > 0) {
                  setActions(
                    actions.map((action, id) =>
                      id == idx - 1 ? actions[idx] : id == idx ? actions[idx - 1] : action,
                    ),
                  );
                }
              }}
            >
              <ArrowUpward></ArrowUpward>
            </IconButton>
            <IconButton className="macro-action-button"
              sx={{
                color: "#bfdbfe",
                "&:hover": { backgroundColor: "rgba(96, 165, 250, 0.14)" },
              }}
              onClick={() => {
                if (idx < actions.length - 1) {
                  setActions(
                    actions.map((action, id) =>
                      id == idx + 1 ? actions[idx] : id == idx ? actions[idx + 1] : action,
                    ),
                  );
                }
              }}
            >
              <ArrowDownward></ArrowDownward>
            </IconButton>
            {action.length < 1 || action[0] != 1 || action[1] > 7 ? (
              <TextField
                value={new TextDecoder("ascii").decode(Uint8Array.from(action))}
                size="small"
                fullWidth
                onChange={(event) => {
                  const asciiArray = [...Array(event.target.value.length)].reduce((acc, _, idx) => {
                    const charcode = event.target.value.charCodeAt(idx);
                    if (charcode <= 0x7f) acc.push(charcode);
                    return acc;
                  }, [] as number[]);
                  setActions(actions.map((action, id) => (idx == id ? asciiArray : action)));
                }}
              ></TextField>
            ) : action[1] == 4 ? (
              <TextField
                type="number"
                size="small"
                label={t.macro.delay}
                InputLabelProps={{ shrink: true }}
                value={action[2]}
                onChange={(event) => {
                  setActions(
                    actions.map((action, id) =>
                      idx == id
                        ? [action[0], action[1], parseInt("0" + event.target.value)]
                        : action,
                    ),
                  );
                }}
              ></TextField>
            ) : (
              <>
                <EditableKey
                  keycode={props.keycodeConverter.convertIntToKeycode(action[2])}
                  onKeycodeChange={(keycode) =>
                    setActions(
                      actions.map((action, id) =>
                        idx == id ? [action[0], action[1], keycode.value] : action,
                      ),
                    )
                  }
                  onClick={() => {
                    setFocusedAction(idx);
                  }}
                ></EditableKey>
                <div className="macro-item-label">
                  {
                    {
                      1: t.macro.tap,
                      2: t.macro.down,
                      3: t.macro.up,
                      5: t.macro.tap,
                      6: t.macro.down,
                      7: t.macro.up,
                    }[action[1]]
                  }
                </div>
              </>
            )}
          </Stack>
        );
      })}
      <div>
        <Button onClick={() => setActions([...actions, []])}>{t.macro.addText}</Button>
        <Button onClick={() => setActions([...actions, [1, 1, 0]])}>{t.macro.addTap}</Button>
        <Button onClick={() => setActions([...actions, [1, 2, 0]])}>{t.macro.addDown}</Button>
        <Button onClick={() => setActions([...actions, [1, 3, 0]])}>{t.macro.addUp}</Button>
        <Button onClick={() => setActions([...actions, [1, 4, 0]])}>{t.macro.addDelay}</Button>
      </div>
      <div>
        <Button onClick={() => setActions(getActions(props.buffer))}>{t.macro.revert}</Button>
        <Button disabled={recording} onClick={() => props.onSave(actions)} variant="outlined">
          {t.macro.save}
        </Button>
      </div>
      {focusedAction !== null && (
        <Box sx={{ mt: 2 }}>
          <KeycodeCatalog
            keycodeConverter={props.keycodeConverter}
            hideRgbMatrixKeys
            hideBacklightControlKeys
            tab={[
              { label: t.keycodeTabs.Basic, keygroup: ["basic"] },
              { label: t.keycodeTabs.Mouse, keygroup: ["mouse"] },
              { label: t.keycodeTabs.UserWireless, keygroup: ["custom"] },
              { label: t.keycodeTabs.Media, keygroup: ["media"] },
              { label: t.keycodeTabs.Quantum, keygroup: ["quantum", "magic"], layout: "quantumModifiers" },
              { label: t.keycodeTabs.RGB, keygroup: ["backlight", "rgb", "rgb_matrix"] },
              { label: t.keycodeTabs.Layer, keygroup: ["layer"] },
              { label: t.keycodeTabs.Macro, keygroup: ["macro"] },
              { label: t.keycodeTabs.TapDance, keygroup: ["tapdance"] },
            ]}
            onKeycodeSelect={(keycode: QmkKeycode) => {
              setActions((currentActions) =>
                currentActions.map((action, index) =>
                  index === focusedAction ? [action[0], action[1], keycode.value] : action,
                ),
              );
              setFocusedAction(null);
            }}
          />
        </Box>
      )}
    </>
  );
}
