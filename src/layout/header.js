import { createButton } from "../components/button";
import { getText } from "../services/dialogHandler";
import { toggleTheme } from "../services/handlers";
import { currentTheme } from "../services/storageHandle";
import { getComponent, getLang, getTextComponent } from "../utils/helpers";

/**
 * Determina o novo tema da aplicação, alternando entre 'light' e 'dark'.
 * @returns {string} O novo tema da aplicação.
 */
const newTheme = currentTheme === 'light' ? 'dark' : 'light';

export const header = getComponent(
  'header',
  getComponent('h1', getTextComponent(getText(getLang(), 'app.title'))),
  createButton(
    getText(getLang(), 'actions.toggleTheme'),
    toggleTheme,
    '',
    'theme-toggle',
    getText(getLang(), 'notifications.themeToggled', newTheme)
  )
);
header.props.class = 'header';