import { createContext } from "react";
import type { UiLanguage } from "./translations";

export const UiLanguageContext = createContext<UiLanguage>("en");