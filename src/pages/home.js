// src/pages/home.js
import {
  calculateLocalStorageSize,
  getComponent,
  getLang,
  getLastCompletedTask,
  getTextSpan,
  updateStats,
} from '../utils/helpers';
import { createButton } from '../components/button';
import {
  applyFilters,
  handleTasksView,
  inputSearchHandler,
  togglePriority,
} from '../services/handlers.js';
import { header } from '../layout/header.js';
import { footer } from '../layout/footer.js';
import { getTasks } from '../services/storageHandle.js';
import { getText } from '../services/dialogHandler.js';
import { getInputSearch } from '../components/inputSearch.js';
import { getSelection } from '../components/selection.js';
import { addTasks } from '../services/addTasksHandler.js';

const tasks = getTasks();

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
textarea.props.class = 'scrollbar';
textarea.props.placeholder = getText(getLang(), 'placeholders.taskInput');

const priorityOptions = getSelection(
  'prioritySelect',
  getText(getLang(), 'priorities'),
  togglePriority
);

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
  getText(getLang(), 'filters.status'),
  applyFilters
);

const priorityFilter = getSelection(
  'priorityFilter',
  getText(getLang(), 'filters.priority'),
  applyFilters
);

const tasksViewButton = createButton(
  getText(getLang(), 'actions.tasksView', false),
  handleTasksView,
  '',
  'button-secondary',
  getText(getLang(), 'actions.tasksView', false)
);

const inputSearch = getInputSearch(
  inputSearchHandler,
  'search',
  'search-task',
  getText(getLang(), 'placeholders.search'),
  getText(getLang(), 'infos.searchInfo')
);

const filters = getComponent('div', statusFilter, priorityFilter, tasksViewButton, inputSearch);
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
