import { FormControl, MenuItem, Select } from "@mui/material";
import { quantumTranslations, type UiLanguage } from "../locales/translations";

export function LanguageSelector(props: {
  languageList: string[];
  lang: string;
  language?: UiLanguage;
  onChange: (lang: string) => void;
}) {
  const languageNames: { [language: string]: string } =
    quantumTranslations[props.language ?? "en"].languageNames;
  return (
    <FormControl variant="standard">
      <Select
        value={props.lang}
        label="language"
        onChange={(event) => props.onChange(event.target.value)}
      >
        {props.languageList.map((label) => (
          <MenuItem key={label} value={label}>
            {languageNames[label] ?? label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
