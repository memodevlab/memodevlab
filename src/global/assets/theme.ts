/**
 * @project MemoDevLab
 * @file src/global/assets/theme.ts
 * @description Configuración del tema Mantine compuesta desde theme/ (colores y componentes)
 * @author Guillermo Corredor
 * @created 22/03/2026
 *
 * @overview
 * Punto de entrada del tema Mantine: usa colors y themeBase de theme/colors y los temas
 * de cada componente. createTheme une base + components.
 */

/** @import Mantine */
import { createTheme } from "@mantine/core";

/** @import Base (colores y opciones globales) */
import { themeBase, themeColors } from "./theme/colors";

/** @import Temas por componente */
import { buttonTheme } from "./theme/button.theme";
import { textInputTheme } from "./theme/textInput.theme";
import { passwordInputTheme } from "./theme/passwordInput.theme";
import { selectTheme } from "./theme/select.theme";
import { multiSelectTheme } from "./theme/multiSelect.theme";
import { dateInputTheme } from "./theme/dateInput.theme";
import { datePickerInputTheme } from "./theme/datePickerInput.theme";
import { checkboxTheme } from "./theme/checkbox.theme";
import { colorInputTheme } from "./theme/colorInput.theme";
import { numberInputTheme } from "./theme/numberInput.theme";
import { textareaTheme } from "./theme/textarea.theme";
import { pinInputTheme } from "./theme/pinInput.theme";
import { alertTheme } from "./theme/alert.theme";
import { anchorTheme } from "./theme/anchor.theme";
import { tabsTheme } from "./theme/tabs.theme";
import { autocompleteTheme } from "./theme/autocomplete.theme";

/**
 * @constant theme
 * @description Tema Mantine configurado con la paleta Davivienda y overrides de componentes
 * @returns {MantineTheme} Objeto de tema para MantineProvider
 */
export const theme = createTheme({
  colors: {
    red: [...themeColors.red],
    green: [...themeColors.green],
    blue: [...themeColors.blue],
    purple: [...themeColors.purple]
  },
  primaryColor: themeBase.primaryColor,
  defaultRadius: themeBase.defaultRadius,
  fontFamily: themeBase.fontFamily,
  components: {
    Button: buttonTheme,
    TextInput: textInputTheme,
    PasswordInput: passwordInputTheme,
    Select: selectTheme,
    MultiSelect: multiSelectTheme,
    DateInput: dateInputTheme,
    DatePickerInput: datePickerInputTheme,
    Checkbox: checkboxTheme,
    ColorInput: colorInputTheme,
    NumberInput: numberInputTheme,
    Textarea: textareaTheme,
    PinInput: pinInputTheme,
    Alert: alertTheme,
    Anchor: anchorTheme,
    Tabs: tabsTheme,
    Autocomplete: autocompleteTheme
  }
});
