import source from "./quantum.json";

export type UiLanguage = "zh" | "en" | "ja" | "it" | "es";

type Locale = Omit<typeof source.en, "languageNames"> & {
  languageNames: Record<string, string>;
};
type DeepPartial<T> = T extends (infer U)[]
  ? DeepPartial<U>[]
  : T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T;

const overlays: Record<Exclude<UiLanguage, "zh" | "en">, DeepPartial<Locale>> = {
  ja: {
    switchLabel: "中文",
    common: { save: "保存", undo: "元に戻す", reset: "リセット", revert: "復元", cancel: "キャンセル", ok: "OK", enableAll: "すべて有効", disableAll: "すべて無効" },
    keycodeTabs: { Basic: "基本", Mouse: "マウス", UserWireless: "ユーザー", Media: "メディア", Quantum: "Quantum", RGB: "RGB", Layer: "レイヤー", Macro: "マクロ", TapDance: "タップダンス", Combos: "コンボ", KeyOverride: "キー上書き", AltRepeatKey: "代替リピートキー" },
    tabs: { Keymap: "キーマップ", Macro: "マクロ", Lighting: "ライティング", TapDance: "タップダンス", Combos: "コンボ", KeyOverride: "キー上書き", AltRepeatKey: "代替リピートキー", MatrixTester: "マトリックステスト", Magic: "Magic", "Grave Escape": "Grave Escape", "Tap-Hold": "タップ・ホールド", "Auto Shift": "自動Shift", Combo: "コンボ", "One Shot Keys": "ワンショットキー", "Mouse Keys": "マウスキー", Quantum: "QMK設定" },
    lighting: { effect: "RGB効果", color: "RGBカラー", brightness: "RGB輝度", speed: "RGB速度", chooseColor: "RGBカラーを選択", notSupported: "キーボード定義でライティングがサポートされていません。" },
    colorPicker: { basicColors: "基本色", hex: "HEX", hue: "色相", red: "赤", saturation: "彩度", green: "緑", value: "明度", blue: "青", cancel: "キャンセル", ok: "OK" },
    tapDance: { onTap: "タップ時", onHold: "長押し時", onDoubleTap: "ダブルタップ時", onTapHold: "タップ後に長押し", tappingTerm: "タップ判定時間 [ms]" },
    combos: { keys: ["キー 1", "キー 2", "キー 3", "キー 4", "出力キー"] },
    keyOverride: { enable: "有効", enableOnLayers: "有効なレイヤー", enableAll: "すべて有効", disableAll: "すべて無効", trigger: "トリガー", triggerMods: "トリガーモディファイア", negativeMods: "除外モディファイア", suppressedMods: "抑制モディファイア", replacement: "置換キー", options: "オプション", optionLabels: ["トリガーキーを押したときに有効化", "必要なモディファイアを押したときに有効化", "除外モディファイアを離したときに有効化", "モディファイアが1つのときに有効化", "上書き解除後にトリガーキーを再送信しない", "他のキーを押しても解除しない"] },
    altRepeatKey: { enable: "有効", lastKey: "直前のキー", altKey: "代替キー", allowedMods: "許可するモディファイア", options: "オプション", optionLabels: ["この代替キーを既定にする", "双方向", "左右のモディファイアを区別しない"] },
    macro: { title: "マクロ M を編集", addText: "+テキスト", addTap: "+タップ", addDown: "+押下", addUp: "+解放", addDelay: "+遅延", delay: "遅延 [ms]", tap: "タップ", down: "押下", up: "解放", revert: "復元", save: "保存", none: "使用可能なマクロはありません。" },
    keyPopup: { base: "基本キー（タップ）", hold: "ホールド時のキー", hex: "キーコード（16進数）" },
    dialog: { eraseCustom: "カスタム設定をすべて消去しますか？", eraseQuantum: "QMK設定をすべて消去しますか？", clearBonds: "Bluetoothのペアリングを解除しますか？解除後は再ペアリングが必要です。" },
    toolbar: { load: "読み込み", refreshApp: "アプリを更新", currentLayer: "現在のレイヤー", refreshCurrentLayer: "現在のレイヤーを更新", styleDefault: "標準", styleSculpted: "スカルプト", styleMatrixTester: "マトリックステスター", themeToDark: "ダークテーマに切り替え", themeToLight: "ライトテーマに切り替え", bleShortcuts: "BLEショートカット", noShortcuts: "ショートカットが見つかりません", batteryBoth: "バッテリー 左 {left}% / 右 {right}%", batteryLoading: "バッテリー残量を取得中", batterySingle: "バッテリー {level}%、レイヤー {layer}", batteryLeft: "左側のバッテリー", batteryRight: "右側のバッテリー", connected: "接続済み", connectedRight: "右側 接続済み", downloadSettings: "設定をダウンロード", uploadSettings: "設定をアップロード", resetKeyboard: "キーボードを再起動", clearBonds: "ペアリングを解除", deviceType: "デバイス", deviceSlave: "スレーブ" },
    languageNames: { US: "US", zh: "中文", de: "ドイツ語", ja: "日本語", it: "イタリア語", es: "スペイン語" },
  },
  it: {
    switchLabel: "中文",
    common: { save: "Salva", undo: "Annulla", reset: "Ripristina", revert: "Reimposta", cancel: "Annulla", ok: "OK", enableAll: "Abilita tutto", disableAll: "Disabilita tutto" },
    keycodeTabs: { Basic: "Base", Mouse: "Mouse", UserWireless: "Utente", Media: "Media", Quantum: "Quantum", RGB: "RGB", Layer: "Livello", Macro: "Macro", TapDance: "Tap Dance", Combos: "Combo", KeyOverride: "Sovrascritture", AltRepeatKey: "Tasto ripetizione alternativo" },
    tabs: { Keymap: "Mappatura", Macro: "Macro", Lighting: "Illuminazione", TapDance: "Tap Dance", Combos: "Combinazioni", KeyOverride: "Sovrascritture", AltRepeatKey: "Tasto ripetizione alternativo", MatrixTester: "Test matrice", Magic: "Magic", "Grave Escape": "Grave Escape", "Tap-Hold": "Tocco-Mantenimento", "Auto Shift": "Maiusc automatico", Combo: "Combinazione", "One Shot Keys": "Tasti a impulso", "Mouse Keys": "Tasti mouse", Quantum: "Impostazioni QMK" },
    lighting: { effect: "Effetto RGB", color: "Colore RGB", brightness: "Luminosità RGB", speed: "Velocità RGB", chooseColor: "Scegli il colore RGB", notSupported: "L'illuminazione non è dichiarata nella definizione della tastiera." },
    colorPicker: { basicColors: "Colori base", hex: "HEX", hue: "Tonalità", red: "Rosso", saturation: "Saturazione", green: "Verde", value: "Luminosità", blue: "Blu", cancel: "Annulla", ok: "OK" },
    tapDance: { onTap: "Al tocco", onHold: "Alla pressione", onDoubleTap: "Al doppio tocco", onTapHold: "Tocco e pressione", tappingTerm: "Intervallo di tocco [ms]" },
    combos: { keys: ["tasto 1", "tasto 2", "tasto 3", "tasto 4", "tasto output"] },
    keyOverride: { enable: "Abilita", enableOnLayers: "Abilita sui livelli", enableAll: "Abilita tutto", disableAll: "Disabilita tutto", trigger: "Attivazione", triggerMods: "Modificatori di attivazione", negativeMods: "Modificatori esclusi", suppressedMods: "Modificatori soppressi", replacement: "Sostituzione", options: "Opzioni", optionLabels: ["Attiva alla pressione del tasto trigger", "Attiva alla pressione del modificatore richiesto", "Attiva al rilascio del modificatore escluso", "Attiva con un solo modificatore", "Non inviare di nuovo il tasto trigger dopo la disattivazione", "Non disattivare alla pressione di un altro tasto"] },
    altRepeatKey: { enable: "Abilita", lastKey: "Ultimo tasto", altKey: "Tasto alternativo", allowedMods: "Modificatori consentiti", options: "Opzioni", optionLabels: ["Usa questo tasto alternativo come predefinito", "Bidirezionale", "Ignora la distinzione destra/sinistra"] },
    macro: { title: "Modifica macro M", addText: "+TESTO", addTap: "+TOCCO", addDown: "+PREMI", addUp: "+RILASCIA", addDelay: "+RITARDO", delay: "Ritardo [ms]", tap: "Tocco", down: "Premi", up: "Rilascia", revert: "Ripristina", save: "Salva", none: "Nessuna macro disponibile." },
    keyPopup: { base: "Base (tocco)", hold: "Opzione (pressione)", hex: "Codice tasto (hex)" },
    dialog: { eraseCustom: "Eliminare tutte le impostazioni personalizzate?", eraseQuantum: "Eliminare tutte le impostazioni QMK?", clearBonds: "Cancellare l'associazione Bluetooth? Sarà necessario associare di nuovo la tastiera." },
    toolbar: { load: "Carica", refreshApp: "Aggiorna app", currentLayer: "Livello corrente", refreshCurrentLayer: "Aggiorna livello corrente", styleDefault: "Predefinito", styleSculpted: "Scolpito", styleMatrixTester: "Test matrice", themeToDark: "Passa al tema scuro", themeToLight: "Passa al tema chiaro", bleShortcuts: "Scorciatoie BLE", noShortcuts: "Nessuna scorciatoia trovata", batteryBoth: "Batteria S {left}% / D {right}%", batteryLoading: "Lettura batteria in corso", batterySingle: "Batteria {level}%, livello {layer}", batteryLeft: "Batteria sinistra", batteryRight: "Batteria destra", connected: "Connesso", connectedRight: "Destro connesso", downloadSettings: "Scarica impostazioni", uploadSettings: "Carica impostazioni", resetKeyboard: "Riavvia", clearBonds: "Rimuovi associazione", deviceType: "Dispositivo", deviceSlave: "Slave" },
    languageNames: { US: "US", zh: "Cinese", de: "Tedesco", ja: "Giapponese", it: "Italiano", es: "Spagnolo" },
  },
  es: {
    switchLabel: "中文",
    common: { save: "Guardar", undo: "Deshacer", reset: "Restablecer", revert: "Revertir", cancel: "Cancelar", ok: "Aceptar", enableAll: "Activar todo", disableAll: "Desactivar todo" },
    keycodeTabs: { Basic: "Básico", Mouse: "Ratón", UserWireless: "Usuario", Media: "Multimedia", Quantum: "Quantum", RGB: "RGB", Layer: "Capa", Macro: "Macro", TapDance: "Tap Dance", Combos: "Combinaciones", KeyOverride: "Sobrescrituras", AltRepeatKey: "Tecla de repetición alternativa" },
    tabs: { Keymap: "Mapa de teclas", Macro: "Macro", Lighting: "Iluminación", TapDance: "Tap Dance", Combos: "Combinaciones", KeyOverride: "Sobrescrituras", AltRepeatKey: "Tecla de repetición alternativa", MatrixTester: "Prueba de matriz", Magic: "Magic", "Grave Escape": "Grave Escape", "Tap-Hold": "Pulsar-Mantener", "Auto Shift": "Mayús automático", Combo: "Combinación", "One Shot Keys": "Teclas de un solo uso", "Mouse Keys": "Teclas del ratón", Quantum: "Ajustes de QMK" },
    lighting: { effect: "Efecto RGB", color: "Color RGB", brightness: "Brillo RGB", speed: "Velocidad RGB", chooseColor: "Elegir color RGB", notSupported: "La definición del teclado no declara compatibilidad con iluminación." },
    colorPicker: { basicColors: "Colores básicos", hex: "HEX", hue: "Tono", red: "Rojo", saturation: "Saturación", green: "Verde", value: "Luminosidad", blue: "Azul", cancel: "Cancelar", ok: "Aceptar" },
    tapDance: { onTap: "Al pulsar", onHold: "Al mantener", onDoubleTap: "Al pulsar dos veces", onTapHold: "Pulsar y mantener", tappingTerm: "Intervalo de pulsación [ms]" },
    combos: { keys: ["tecla 1", "tecla 2", "tecla 3", "tecla 4", "tecla de salida"] },
    keyOverride: { enable: "Activar", enableOnLayers: "Activar en capas", enableAll: "Activar todo", disableAll: "Desactivar todo", trigger: "Disparador", triggerMods: "Modificadores del disparador", negativeMods: "Modificadores excluidos", suppressedMods: "Modificadores suprimidos", replacement: "Reemplazo", options: "Opciones", optionLabels: ["Activar al pulsar la tecla disparadora", "Activar al pulsar un modificador necesario", "Activar al soltar un modificador excluido", "Activar con un solo modificador", "No volver a enviar la tecla tras desactivar la sobrescritura", "No desactivar al pulsar otra tecla"] },
    altRepeatKey: { enable: "Activar", lastKey: "Última tecla", altKey: "Tecla alternativa", allowedMods: "Modificadores permitidos", options: "Opciones", optionLabels: ["Usar esta tecla alternativa de forma predeterminada", "Bidireccional", "Ignorar el lado del modificador"] },
    macro: { title: "Editar macro M", addText: "+TEXTO", addTap: "+PULSAR", addDown: "+PRESIONAR", addUp: "+SOLTAR", addDelay: "+ESPERA", delay: "Espera [ms]", tap: "Pulsar", down: "Presionar", up: "Soltar", revert: "Revertir", save: "Guardar", none: "No hay macros disponibles." },
    keyPopup: { base: "Base (pulsación)", hold: "Opción (mantener)", hex: "Código de tecla (hex)" },
    dialog: { eraseCustom: "¿Borrar todos los ajustes personalizados?", eraseQuantum: "¿Borrar todos los ajustes QMK?", clearBonds: "¿Borrar el emparejamiento Bluetooth? Tendrás que emparejar el teclado de nuevo." },
    toolbar: { load: "Cargar", refreshApp: "Actualizar aplicación", currentLayer: "Capa actual", refreshCurrentLayer: "Actualizar capa actual", styleDefault: "Predeterminado", styleSculpted: "Esculpido", styleMatrixTester: "Prueba de matriz", themeToDark: "Cambiar al tema oscuro", themeToLight: "Cambiar al tema claro", bleShortcuts: "Atajos BLE", noShortcuts: "No se encontraron atajos", batteryBoth: "Batería I {left}% / D {right}%", batteryLoading: "Leyendo batería", batterySingle: "Batería {level}%, capa {layer}", batteryLeft: "Batería izquierda", batteryRight: "Batería derecha", connected: "Conectado", connectedRight: "Derecho conectado", downloadSettings: "Descargar ajustes", uploadSettings: "Subir ajustes", resetKeyboard: "Reiniciar", clearBonds: "Borrar emparejamiento", deviceType: "Dispositivo", deviceSlave: "Esclavo" },
    languageNames: { US: "US", zh: "Chino", de: "Alemán", ja: "Japonés", it: "Italiano", es: "Español" },
  },
};

function mergeLocale(base: Locale, overlay: DeepPartial<Locale>): Locale {
  const merge = (original: unknown, additions: unknown): unknown => {
    if (
      additions === null ||
      typeof additions !== "object" ||
      Array.isArray(additions)
    ) {
      return additions;
    }
    const result = { ...(original as Record<string, unknown>) };
    for (const [key, value] of Object.entries(additions)) {
      result[key] = merge(result[key], value);
    }
    return result;
  };
  return merge(base, overlay) as Locale;
}

export const quantumTranslations: typeof source & Record<UiLanguage, Locale> = {
  ...source,
  ja: mergeLocale(source.en, overlays.ja),
  it: mergeLocale(source.en, overlays.it),
  es: mergeLocale(source.en, overlays.es),
};