import chineseHints from "./keySettingHints.json";
import type { UiLanguage } from "./translations";

export type KeySettingHintType = Exclude<keyof typeof chineseHints, "stacked">;

type HintText = {
  title: string;
  steps: string[];
  example: string;
  exampleEmpty?: string;
  fallback?: string;
};

type HintLocale = {
  hints: Record<KeySettingHintType, HintText>;
  stacked: string;
};

const english: HintLocale = {
  hints: {
    keymap: { title: "How to assign a key", steps: ["1. Click the key you want to change. The keycode list will appear below.", "2. Click a keycode in the list to assign it.", "3. You can also drag a keycode from the list onto a key."], example: "Example: change {current} to {target} by choosing {target} in Basic.", exampleEmpty: "Example: choose {target} in Basic to assign it to this empty key." },
    combos: { title: "How to configure a combo", steps: ["1. The first four fields are the keys pressed together; Output key is sent when the combo triggers.", "2. Select a field, then click the keycode you want in the list below.", "3. You can use up to four keys. Leave unused fields empty."], example: "Example: J + K outputs ESC: set key 1 to J, key 2 to K, and Output key to ESC." },
    tapDance: { title: "How to configure Tap Dance", steps: ["1. Select a field, then click the keycode you want in the list below.", "2. Tap, hold, double tap, and tap-and-hold each have a field; unused fields can stay empty.", "3. Tapping term, in milliseconds, sets the boundary between a tap and a hold."], example: "Example: tap A for A and hold A for Ctrl: choose A for On tap and LCtrl for On hold." },
    keyOverride: { title: "How to configure a key override", steps: ["1. An override replaces one key (Trigger) with another keycode (Replacement).", "2. Select Trigger and choose the pressed key, for example CapsLock.", "3. Select Replacement and choose the output key, for example LCtrl. Enable layers controls where it applies."], example: "Example: turn CapsLock into Ctrl by setting Trigger to CapsLock and Replacement to LCtrl." },
    altRepeatKey: { title: "How to configure an alternate repeat key", steps: ["1. Last key is the key you press; Alt key is sent instead when you repeat it.", "2. Select Last key and choose a key, for example Backspace.", "3. Select Alt key and choose its alternate, for example Delete."], example: "Example: repeating Backspace sends Delete. Set Last key to Backspace and Alt key to Delete." },
    keycode: { title: "What does this keycode do?", steps: [], example: "", fallback: "Pressing this key sends {label}." },
  },
  stacked: "This key has two parts: the top, {hold}, is the hold/modifier action; the bottom is sent on tap. Click the whole key to edit both parts, or the bottom half to edit only its tap action.",
};

const japanese: HintLocale = {
  hints: {
    keymap: { title: "キーの割り当て方法", steps: ["1. 変更するキーをクリックすると、下にキーコード一覧が表示されます。", "2. 一覧からキーコードをクリックして割り当てます。", "3. 一覧のキーコードをキーにドラッグして割り当てることもできます。"], example: "例：Basicで{target}を選ぶと、{current}を{target}に変更できます。", exampleEmpty: "例：空のキーに割り当てるには、Basicで{target}を選びます。" },
    combos: { title: "コンボの設定方法", steps: ["1. 最初の4項目は同時に押すキー、Output keyはコンボ成立時に出力するキーです。", "2. 項目を選択し、下の一覧からキーコードをクリックします。", "3. 最大4キーを設定できます。使わない項目は空欄にします。"], example: "例：J + KでESCを出力する場合、key 1にJ、key 2にK、Output keyにESCを設定します。" },
    tapDance: { title: "Tap Danceの設定方法", steps: ["1. 項目を選択し、下の一覧からキーコードをクリックします。", "2. タップ、長押し、ダブルタップ、タップ後の長押しを設定します。不要な項目は空欄にできます。", "3. Tapping term（ミリ秒）はタップと長押しを判定する時間です。"], example: "例：AをタップするとA、長押しするとCtrlを入力するには、On tapにA、On holdにLCtrlを設定します。" },
    keyOverride: { title: "キー上書きの設定方法", steps: ["1. Triggerキーを押したとき、Replacementのキーコードを出力します。", "2. Triggerを選択し、押されたキー（例：CapsLock）を設定します。", "3. Replacementを選択し、出力キー（例：LCtrl）を設定します。有効なレイヤーで適用先を指定します。"], example: "例：CapsLockをCtrlにするには、TriggerをCapsLock、ReplacementをLCtrlにします。" },
    altRepeatKey: { title: "代替リピートキーの設定方法", steps: ["1. Last keyは押すキー、Alt keyは連続して押したときに代わりに出力するキーです。", "2. Last keyを選択し、キー（例：Backspace）を設定します。", "3. Alt keyを選択し、代替キー（例：Delete）を設定します。"], example: "例：Backspaceを連続入力するとDeleteを出力するには、Last keyをBackspace、Alt keyをDeleteにします。" },
    keycode: { title: "このキーコードの機能", steps: [], example: "", fallback: "押すと{label}を出力します。" },
  },
  stacked: "このキーは上下2つの動作があります。上側の{hold}は長押し／修飾動作、下側はタップ時の出力です。キー全体で両方を編集し、下半分でタップ動作のみを編集します。",
};

const italian: HintLocale = {
  hints: {
    keymap: { title: "Come assegnare un tasto", steps: ["1. Fai clic sul tasto da modificare: l'elenco dei codici apparirà sotto.", "2. Fai clic su un codice nell'elenco per assegnarlo.", "3. Puoi anche trascinare un codice dall'elenco sul tasto."], example: "Esempio: scegli {target} in Base per sostituire {current} con {target}.", exampleEmpty: "Esempio: scegli {target} in Base per assegnarlo a questo tasto vuoto." },
    combos: { title: "Come configurare una combinazione", steps: ["1. I primi 4 campi sono i tasti premuti insieme; Output key è il tasto inviato quando la combinazione scatta.", "2. Seleziona un campo e fai clic sul codice desiderato nell'elenco sottostante.", "3. Puoi impostare fino a 4 tasti; lascia vuoti i campi inutilizzati."], example: "Esempio: J + K produce ESC: imposta key 1 su J, key 2 su K e Output key su ESC." },
    tapDance: { title: "Come configurare Tap Dance", steps: ["1. Seleziona un campo e fai clic sul codice desiderato nell'elenco sottostante.", "2. Tocco, pressione, doppio tocco e tocco seguito da pressione hanno campi separati; quelli inutilizzati possono restare vuoti.", "3. Tapping term, in millisecondi, definisce il limite tra tocco e pressione."], example: "Esempio: tocco A produce A e pressione A produce Ctrl: scegli A per On tap e LCtrl per On hold." },
    keyOverride: { title: "Come configurare una sostituzione del tasto", steps: ["1. Quando premi un tasto (Trigger), la sostituzione invia un altro codice (Replacement).", "2. Seleziona Trigger e scegli il tasto premuto, ad esempio CapsLock.", "3. Seleziona Replacement e scegli il tasto inviato, ad esempio LCtrl. Abilita sui livelli determina dove si applica."], example: "Esempio: trasforma CapsLock in Ctrl impostando Trigger su CapsLock e Replacement su LCtrl." },
    altRepeatKey: { title: "Come configurare il tasto di ripetizione alternativo", steps: ["1. Last key è il tasto premuto; Alt key viene inviato al suo posto quando lo ripeti.", "2. Seleziona Last key e scegli un tasto, ad esempio Backspace.", "3. Seleziona Alt key e scegli il tasto alternativo, ad esempio Delete."], example: "Esempio: ripetendo Backspace si invia Delete. Imposta Last key su Backspace e Alt key su Delete." },
    keycode: { title: "A cosa serve questo codice?", steps: [], example: "", fallback: "Premendo questo tasto viene inviato {label}." },
  },
  stacked: "Questo tasto ha due parti: quella superiore, {hold}, è l'azione di pressione/modificatore; quella inferiore viene inviata al tocco. Fai clic sul tasto intero per modificare entrambe, oppure sulla metà inferiore per modificare solo il tocco.",
};

const spanish: HintLocale = {
  hints: {
    keymap: { title: "Cómo asignar una tecla", steps: ["1. Haz clic en la tecla que quieras cambiar; la lista de códigos aparecerá abajo.", "2. Haz clic en un código de la lista para asignarlo.", "3. También puedes arrastrar un código de la lista hasta una tecla."], example: "Ejemplo: elige {target} en Básico para cambiar {current} por {target}.", exampleEmpty: "Ejemplo: elige {target} en Básico para asignarlo a esta tecla vacía." },
    combos: { title: "Cómo configurar una combinación", steps: ["1. Los primeros 4 campos son las teclas que se pulsan juntas; Output key es la tecla que se envía al activar la combinación.", "2. Selecciona un campo y haz clic en el código deseado de la lista inferior.", "3. Puedes configurar hasta 4 teclas; deja vacíos los campos que no uses."], example: "Ejemplo: J + K produce ESC: configura key 1 como J, key 2 como K y Output key como ESC." },
    tapDance: { title: "Cómo configurar Tap Dance", steps: ["1. Selecciona un campo y haz clic en el código deseado de la lista inferior.", "2. Pulsar, mantener, doble pulsación y pulsar y mantener tienen campos separados; los que no uses pueden quedar vacíos.", "3. Tapping term, en milisegundos, define el límite entre pulsar y mantener."], example: "Ejemplo: pulsar A escribe A y mantener A escribe Ctrl: elige A en On tap y LCtrl en On hold." },
    keyOverride: { title: "Cómo configurar una sustitución de tecla", steps: ["1. Al pulsar una tecla (Trigger), la sustitución envía otro código (Replacement).", "2. Selecciona Trigger y elige la tecla pulsada, por ejemplo CapsLock.", "3. Selecciona Replacement y elige la tecla de salida, por ejemplo LCtrl. Activar en capas determina dónde se aplica."], example: "Ejemplo: convertir CapsLock en Ctrl: configura Trigger como CapsLock y Replacement como LCtrl." },
    altRepeatKey: { title: "Cómo configurar la tecla de repetición alternativa", steps: ["1. Last key es la tecla que pulsas; Alt key se envía en su lugar al repetirla.", "2. Selecciona Last key y elige una tecla, por ejemplo Backspace.", "3. Selecciona Alt key y elige la alternativa, por ejemplo Delete."], example: "Ejemplo: repetir Backspace envía Delete. Configura Last key como Backspace y Alt key como Delete." },
    keycode: { title: "¿Qué hace este código?", steps: [], example: "", fallback: "Al pulsar, envía {label}." },
  },
  stacked: "Esta tecla tiene dos partes: la superior, {hold}, es la acción de mantener/modificador; la inferior se envía al pulsar. Haz clic en toda la tecla para editar ambas partes o en la mitad inferior para editar solo la acción de pulsación.",
};

const locales: Partial<Record<UiLanguage, HintLocale>> = { en: english, ja: japanese, it: italian, es: spanish };

export function getKeySettingHint(language: UiLanguage, type: KeySettingHintType): HintText {
  return language === "zh" ? chineseHints[type] : locales[language]!.hints[type];
}

export function getStackedHint(language: UiLanguage): string {
  return language === "zh" ? chineseHints.stacked : locales[language]!.stacked;
}

const localizedKeyFunctions: Record<Exclude<UiLanguage, "zh">, Record<string, string>> = {
  en: {
    KC_NO: "No action: pressing this key sends nothing.", KC_TRNS: "Transparent: use the keycode at this position on the next active layer.",
    MO: "Momentary layer: activate layer {layer} while held, then return to the previous layer.", TO: "Switch layer: stay on layer {layer} until another layer is selected.",
    TG: "Toggle layer: switch between layer {layer} and the previous layer each time you press it.", DF: "Default layer: make layer {layer} the default layer.",
    OSL: "One-shot layer: activate layer {layer} for the next keypress.", TT: "Tap to toggle layer {layer}; hold to activate it momentarily.",
    LT: "Hold to activate layer {layer}; tap to send {base}.", LM: "Hold to activate layer {layer} and press modifier {mod}.",
    MODS: "Press {mod} and {base} together.", MOD_TAP: "Hold for {mod}; tap for {base}.", OSM: "One-shot modifier: apply {mod} to the next keypress.",
    TD: "Trigger Tap Dance {index}.", MACRO: "Run macro {index}.", custom: "Custom keycode: {label}.",
    RGB_TOG: "Toggle RGB lighting.", RGB_MODE_FORWARD: "Select the next RGB effect.", RGB_MODE_REVERSE: "Select the previous RGB effect.",
    RGB_HUI: "Increase RGB hue.", RGB_HUD: "Decrease RGB hue.", RGB_SAI: "Increase RGB saturation.", RGB_SAD: "Decrease RGB saturation.", RGB_VAI: "Increase RGB brightness.", RGB_VAD: "Decrease RGB brightness.",
    KC_SYSTEM_POWER: "Open the system power options.", KC_SYSTEM_SLEEP: "Put the computer to sleep.", KC_SYSTEM_WAKE: "Wake the computer.",
  },
  ja: {
    KC_NO: "無効キー：押しても何も出力しません。", KC_TRNS: "透過：次の有効レイヤーの同じ位置にあるキーコードを使います。",
    MO: "一時レイヤー：押している間レイヤー{layer}を有効にし、離すと元に戻ります。", TO: "レイヤー切替：レイヤー{layer}に切り替えます。別のレイヤーに切り替えるまで維持します。",
    TG: "レイヤー切替：押すたびにレイヤー{layer}と元のレイヤーを切り替えます。", DF: "既定レイヤー：レイヤー{layer}を既定にします。",
    OSL: "ワンショットレイヤー：次のキー入力にレイヤー{layer}を適用します。", TT: "タップでレイヤー{layer}を切替、長押しで一時的に有効にします。",
    LT: "長押しでレイヤー{layer}、タップで{base}を出力します。", LM: "長押しでレイヤー{layer}を有効にし、修飾キー{mod}を押します。",
    MODS: "{mod}と{base}を同時に押します。", MOD_TAP: "長押しで{mod}、タップで{base}を出力します。", OSM: "ワンショット修飾キー：次のキー入力に{mod}を適用します。",
    TD: "Tap Dance {index}を実行します。", MACRO: "マクロ{index}を実行します。", custom: "カスタムキーコード：{label}。",
    RGB_TOG: "RGBライティングを切り替えます。", RGB_MODE_FORWARD: "次のRGB効果に切り替えます。", RGB_MODE_REVERSE: "前のRGB効果に切り替えます。",
    RGB_HUI: "RGBの色相を上げます。", RGB_HUD: "RGBの色相を下げます。", RGB_SAI: "RGBの彩度を上げます。", RGB_SAD: "RGBの彩度を下げます。", RGB_VAI: "RGBの明るさを上げます。", RGB_VAD: "RGBの明るさを下げます。",
    KC_SYSTEM_POWER: "システムの電源メニューを開きます。", KC_SYSTEM_SLEEP: "コンピューターをスリープにします。", KC_SYSTEM_WAKE: "コンピューターをスリープから復帰させます。",
  },
  it: {
    KC_NO: "Nessuna azione: questo tasto non invia nulla.", KC_TRNS: "Trasparente: usa il codice nella stessa posizione del livello attivo successivo.",
    MO: "Livello momentaneo: attiva il livello {layer} mentre tieni premuto, poi torna al livello precedente.", TO: "Cambia livello: resta sul livello {layer} finché non ne selezioni un altro.",
    TG: "Alterna il livello {layer} e quello precedente a ogni pressione.", DF: "Livello predefinito: imposta il livello {layer} come predefinito.",
    OSL: "Livello one-shot: applica il livello {layer} alla prossima pressione.", TT: "Tocco per alternare il livello {layer}; tieni premuto per attivarlo temporaneamente.",
    LT: "Tieni premuto per attivare il livello {layer}; tocca per inviare {base}.", LM: "Tieni premuto per attivare il livello {layer} e premere il modificatore {mod}.",
    MODS: "Premi {mod} e {base} insieme.", MOD_TAP: "Tieni premuto per {mod}; tocca per {base}.", OSM: "Modificatore one-shot: applica {mod} alla prossima pressione.",
    TD: "Attiva Tap Dance {index}.", MACRO: "Esegue la macro {index}.", custom: "Codice personalizzato: {label}.",
    RGB_TOG: "Attiva o disattiva l'illuminazione RGB.", RGB_MODE_FORWARD: "Seleziona il prossimo effetto RGB.", RGB_MODE_REVERSE: "Seleziona l'effetto RGB precedente.",
    RGB_HUI: "Aumenta la tonalità RGB.", RGB_HUD: "Diminuisce la tonalità RGB.", RGB_SAI: "Aumenta la saturazione RGB.", RGB_SAD: "Diminuisce la saturazione RGB.", RGB_VAI: "Aumenta la luminosità RGB.", RGB_VAD: "Diminuisce la luminosità RGB.",
    KC_SYSTEM_POWER: "Apre le opzioni di alimentazione del sistema.", KC_SYSTEM_SLEEP: "Sospende il computer.", KC_SYSTEM_WAKE: "Riattiva il computer.",
  },
  es: {
    KC_NO: "Sin acción: esta tecla no envía nada.", KC_TRNS: "Transparente: usa el código de la misma posición en la siguiente capa activa.",
    MO: "Capa momentánea: activa la capa {layer} mientras se mantiene pulsada y luego vuelve a la anterior.", TO: "Cambiar capa: permanece en la capa {layer} hasta seleccionar otra.",
    TG: "Alterna entre la capa {layer} y la anterior en cada pulsación.", DF: "Capa predeterminada: establece la capa {layer} como predeterminada.",
    OSL: "Capa de un solo uso: aplica la capa {layer} a la siguiente pulsación.", TT: "Pulsar para alternar la capa {layer}; mantener para activarla momentáneamente.",
    LT: "Mantener para activar la capa {layer}; pulsar para enviar {base}.", LM: "Mantener para activar la capa {layer} y pulsar el modificador {mod}.",
    MODS: "Pulsa {mod} y {base} a la vez.", MOD_TAP: "Mantener para {mod}; pulsar para {base}.", OSM: "Modificador de un solo uso: aplica {mod} a la siguiente pulsación.",
    TD: "Activa Tap Dance {index}.", MACRO: "Ejecuta la macro {index}.", custom: "Código personalizado: {label}.",
    RGB_TOG: "Activa o desactiva la iluminación RGB.", RGB_MODE_FORWARD: "Selecciona el siguiente efecto RGB.", RGB_MODE_REVERSE: "Selecciona el efecto RGB anterior.",
    RGB_HUI: "Aumenta el tono RGB.", RGB_HUD: "Reduce el tono RGB.", RGB_SAI: "Aumenta la saturación RGB.", RGB_SAD: "Reduce la saturación RGB.", RGB_VAI: "Aumenta el brillo RGB.", RGB_VAD: "Reduce el brillo RGB.",
    KC_SYSTEM_POWER: "Abre las opciones de energía del sistema.", KC_SYSTEM_SLEEP: "Suspende el ordenador.", KC_SYSTEM_WAKE: "Activa el ordenador.",
  },
};

export function getLocalizedKeyFunction(
  language: UiLanguage,
  name: string,
  values: Record<string, string | number>,
): string {
  if (language === "zh") return String(values.key ?? name);
  const templates = localizedKeyFunctions[language];
  const template = templates[name] ?? localizedFamilyTemplate(language, name);
  if (!template) {
    const unknown = { en: "Keycode: {key}.", ja: "キーコード：{key}。", it: "Codice tasto: {key}.", es: "Código de tecla: {key}." };
    return unknown[language].replace("{key}", String(values.key ?? name));
  }
  return template.replace(/\{(\w+)\}/g, (placeholder, key: string) =>
    String(values[key] ?? placeholder),
  );
}

function localizedFamilyTemplate(language: Exclude<UiLanguage, "zh">, name: string) {
  const suffix = name.replace(/^QK_MIDI_/, "").replace(/_SHARP/g, "#").replace(/_/g, " ");
  if (name.startsWith("QK_MIDI_NOTE_")) {
    return { en: "MIDI note: send {value}.", ja: "MIDIノート：{value}を送信します。", it: "Nota MIDI: invia {value}.", es: "Nota MIDI: envía {value}." }[language].replace("{value}", suffix.slice("NOTE ".length));
  }
  if (name.startsWith("QK_MIDI_VELOCITY_")) return { en: "MIDI: set velocity to {value}.", ja: "MIDI：ベロシティを{value}に設定します。", it: "MIDI: imposta la velocity su {value}.", es: "MIDI: establece la velocidad en {value}." }[language].replace("{value}", name.slice("QK_MIDI_VELOCITY_".length));
  if (name.startsWith("QK_MIDI_CHANNEL_")) return { en: "MIDI: select channel {value}.", ja: "MIDI：チャンネル{value}に切り替えます。", it: "MIDI: seleziona il canale {value}.", es: "MIDI: selecciona el canal {value}." }[language].replace("{value}", name.slice("QK_MIDI_CHANNEL_".length));
  if (name.startsWith("QK_MIDI_TRANSPOSE_")) return { en: "MIDI: transpose by {value} semitones.", ja: "MIDI：{value}半音移調します。", it: "MIDI: trasponi di {value} semitoni.", es: "MIDI: transpone {value} semitonos." }[language].replace("{value}", name.slice("QK_MIDI_TRANSPOSE_".length));
  if (name.startsWith("QK_MIDI_")) return { en: "MIDI control: {value}.", ja: "MIDIコントロール：{value}。", it: "Controllo MIDI: {value}.", es: "Control MIDI: {value}." }[language].replace("{value}", suffix.slice("MIDI ".length));
  return undefined;
}