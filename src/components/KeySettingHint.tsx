import { Box, ClickAwayListener, Popper, Typography } from "@mui/material";
import { useContext } from "react";
import { getKeySettingHint, getStackedHint, KeySettingHintType } from "../locales/keySettingHints";
import { UiLanguageContext } from "../locales/UiLanguageContext";
import { describeKeycode } from "./keycodeDescription";
import { KeycodeConverter, QmkKeycode } from "./keycodes/keycodeConverter";

/**
 * Hint shown when a key is picked with Ctrl. It explains how to set keys in the current view
 * (keymap, combos, tap dance, key override, alt repeat key) instead of opening the key editor
 * popup: keycodes are chosen from the catalog below, stacked keys can be edited line by line, and
 * keycodes can be dragged onto a key.
 *
 * Help text follows the selected UI language.
 */
export function KeySettingHint(props: {
  type: KeySettingHintType;
  open: boolean;
  keycode: QmkKeycode;
  keycodeconverter: KeycodeConverter;
  anchor?: HTMLElement;
  boundary: HTMLElement | null;
  onClose?: () => void;
}) {
  const language = useContext(UiLanguageContext);
  const hint = getKeySettingHint(language, props.type);
  // The example refers to the key that was clicked, so it mentions its current keycode (or an empty
  // key): "把当前的 Z 换成 X" / "当前还是空的，点 A 就能把它设成 A".
  const currentLabel = props.keycode.label.trim();
  const isEmptyKeycode = props.keycode.value === 0 || currentLabel === "";
  const exampleTarget = isEmptyKeycode ? "A" : currentLabel === "X" ? "Z" : "X";
  const emptyExample = (hint as { exampleEmpty?: string }).exampleEmpty;
  const example = (isEmptyKeycode && emptyExample ? emptyExample : hint.example)
    .replace(/\{current\}/g, currentLabel)
    .replace(/\{target\}/g, exampleTarget);
  // Keycodes without a description (plain basic keys) fall back to a generic sentence.
  const fallback = (hint as { fallback?: string }).fallback;
  const description =
    describeKeycode(props.keycode, props.keycodeconverter, language) ??
    fallback?.replace(/\{label\}/g, currentLabel || props.keycode.key);
  const holdLegend =
    props.keycode.modNameLabel ?? props.keycode.modLabel ?? props.keycode.holdLabel;

  return (
    <ClickAwayListener
      mouseEvent="onMouseUp"
      touchEvent="onTouchEnd"
      onClickAway={(event) => {
        if (props.anchor?.contains(event.target as Node)) return;
        props.onClose?.();
      }}
    >
      <Popper
        open={props.open}
        anchorEl={props.anchor}
        placement="auto-start"
        disablePortal={false}
        sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}
        modifiers={[
          {
            name: "preventOverflow",
            options: { boundary: props.boundary || document.body, padding: 8 },
          },
          {
            name: "flip",
            options: {
              fallbackPlacements: ["top-start", "top-end", "bottom-start", "bottom-end"],
              boundary: props.boundary || document.body,
            },
          },
        ]}
      >
        <Box className="key-set-hint">
          <Typography component="div" sx={{ fontWeight: 600, mb: 0.75 }}>
            {hint.title}
          </Typography>
          {description && (
            <Typography
              component="div"
              sx={{ fontSize: "0.8rem", lineHeight: 1.6, mb: 0.5, fontWeight: 500 }}
            >
              {language === "zh" ? "功能：" : language === "ja" ? "機能：" : language === "it" ? "Funzione: " : language === "es" ? "Función: " : "Function: "}
              {description}
            </Typography>
          )}
          {holdLegend && (
            <Typography component="div" sx={{ fontSize: "0.78rem", lineHeight: 1.6, mb: 0.5 }}>
              {getStackedHint(language).replace("{hold}", holdLegend)}
            </Typography>
          )}
          {hint.steps.map((step) => (
            <Typography key={step} component="div" sx={{ fontSize: "0.78rem", lineHeight: 1.6 }}>
              {step}
            </Typography>
          ))}
          {example !== "" && (
            <Typography
              component="div"
              sx={{
                fontSize: "0.78rem",
                lineHeight: 1.6,
                mt: 0.75,
                pt: 0.75,
                opacity: 0.85,
                borderTop: "1px solid rgba(148, 163, 184, 0.35)",
              }}
            >
              {example}
            </Typography>
          )}
        </Box>
      </Popper>
    </ClickAwayListener>
  );
}
