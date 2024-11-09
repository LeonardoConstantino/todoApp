import { createButton } from '../components/button';
import { getInputRadio } from '../components/inputRadio';
import { getText } from '../services/dialogHandler';
import {
  showMessageSelectedLang,
  showModal,
  toggleLanguage,
  toggleTheme,
} from '../services/handlers';
import { currentTheme } from '../services/storageHandle';
import { getComponent, getLang, getTextComponent } from '../utils/helpers';

/**
 * Determina o novo tema da aplicação, alternando entre 'light' e 'dark'.
 * @returns {string} O novo tema da aplicação.
 */
const newTheme = currentTheme === 'light' ? 'dark' : 'light';

const modalContent = getComponent(
  'div',
  getComponent(
    'h3',
    getTextComponent(getText(getLang(), 'app.modalLang.title'))
  ),
  getComponent(
    'fieldset',
    getComponent(
      'legend',
      getTextComponent(getText(getLang(), 'actions.changeLanguage'))
    ),
    getInputRadio(
      'language',
      'pt-br',
      getText(getLang(), 'app.pt-br'),
      true,
      '',
      '',
      showMessageSelectedLang
    ),
    getInputRadio(
      'language',
      'en-us',
      getText(getLang(), 'app.en-us'),
      false,
      '',
      '',
      showMessageSelectedLang
    ),
    getInputRadio(
      'language',
      'es-es',
      getText(getLang(), 'app.es-es'),
      false,
      '',
      '',
      showMessageSelectedLang
    )
  )
);

const title = getComponent(
  'h1',
  getTextComponent(getText(getLang(), 'app.title'))
);

const toggleThemeButton = createButton(
  getText(getLang(), 'actions.toggleTheme'),
  toggleTheme,
  '',
  'button-secondary',
  getText(getLang(), 'notifications.themeToggled', newTheme)
);

const langModalButton = createButton(
  getText(getLang(), 'actions.changeLanguage'),
  () => {
    showModal(modalContent, 'lang-modal', toggleLanguage);
  },
  '',
  'lang-modal-button',
  getText(getLang(), 'actions.toggleLanguage')
);

const headerActions = getComponent('div', toggleThemeButton, langModalButton);
headerActions.props.class = 'header-actions';

export const header = getComponent('header', title, headerActions);
header.props.class = 'header';
