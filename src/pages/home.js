// src/pages/home.js
import {
  calculateLocalStorageSize,
  getComponent,
  getLang,
  getLastCompletedTask,
  getTextComponent,
  getTextSpan,
  updateStats,
} from '../utils/helpers';
import { createButton } from '../components/button';
import {
  addTasks,
  applyFilters,
  togglePriority,
} from '../services/handlers.js';
import { header } from '../layout/header.js';
import { footer } from '../layout/footer.js';
import { tasks } from '../services/storageHandle.js';
import { getText } from '../services/dialogHandler.js';

const lastCompletedTask = getLastCompletedTask(tasks);

const stats = getTextSpan(updateStats(tasks) || '');
stats.props.title = getText(
  getLang(),
  'infos.lastCompletedTask',
  lastCompletedTask
);
stats.props.id = 'stats';

const occupiedSize = getTextSpan(
  getText(
    getLang(),
    'notifications.storageUsage',
    calculateLocalStorageSize(tasks)
  )
);
occupiedSize.props.title = getText(getLang(), 'infos.sizeInfo');
occupiedSize.props.id = 'sizeInfo';

const infos = getComponent('div', stats, occupiedSize);
infos.props.class = 'infos';

const textarea = getComponent('textarea');
textarea.props.id = 'taskInput';
textarea.props.placeholder = getText(getLang(), 'placeholders.taskInput');

/**
 * Cria um elemento de seleção (select) com opções baseadas em um objeto fornecido.
 *
 * @param {string} id - O ID do elemento de seleção.
 * @param {Object} objectOptions - Um objeto cujas chaves são os valores das opções e os valores são os rótulos das opções.
 * @returns {Object} - O elemento de seleção criado.
 */
const getSelection = (id, objectOptions) => {
  const options = Object.entries(objectOptions).map(([key, value]) => {
    const option = getComponent('option', getTextComponent(value));
    option.props.value = key;
    return option;
  });

  const select = getComponent('select', ...options);
  select.props.id = id;
  return select;
};

const priorityOptions = getSelection(
  'prioritySelect',
  getText(getLang(), 'priorities')
);
priorityOptions.props.onChange = togglePriority;

const btnAddTasks = createButton(
  getText(getLang(), 'actions.addTasks'),
  addTasks,
  '',
  '',
  getText(getLang(), 'actions.addTasks')
);

const inputGroupAction = getComponent('div', priorityOptions, btnAddTasks);
inputGroupAction.props.class = 'input-group-actions';

const inputGroup = getComponent('div', textarea, inputGroupAction);
inputGroup.props.class = 'input-group';

const inputSection = getComponent('div', inputGroup);
inputSection.props.class = 'input-section';

const statusFilter = getSelection(
  'statusFilter',
  getText(getLang(), 'filters.status')
);
statusFilter.props.id = 'statusFilter';
statusFilter.props.onChange = applyFilters;

const priorityFilter = getSelection(
  'priorityFilter',
  getText(getLang(), 'filters.priority')
);
priorityFilter.props.id = 'priorityFilter';
priorityFilter.props.onChange = applyFilters;

const filters = getComponent('div', statusFilter, priorityFilter);
filters.props.class = 'filters';

const taskList = getComponent('div');
taskList.props.id = 'taskList';
taskList.props.class = 'task-list';

export const home = getComponent(
  'div',
  header,
  infos,
  inputSection,
  filters,
  taskList,
  footer
);
home.props.class = 'container';
