import { createButton } from '../components/button';
import { getText } from '../services/dialogHandler';
import {
  deleteAllTasks,
  shareOptionsHandler,
  shareTasksHandler,
} from '../services/handlers';
import { tasks } from '../services/storageHandle';
import { getComponent, getLang, getTextComponent } from '../utils/helpers';
import { showModal } from './../services/handlers';
import { getInputCheckBox } from './../components/inputCheckBox';
import { getSelection } from '../components/selection';

const modalDeleteTasks = getComponent(
  'div',
  getComponent(
    'h3',
    getTextComponent(getText(getLang(), 'app.modalDeleteTasks.title'))
  )
);

const statusFilter = getSelection(
  'shareStatusFilter',
  getText(getLang(), 'filters.status'),
  shareOptionsHandler
);

const priorityFilter = getSelection(
  'sharePriorityFilter',
  getText(getLang(), 'filters.priority'),
  shareOptionsHandler
);

const checkBoxPriority = getInputCheckBox(
  'priority',
  'Prioridades',
  false,
  '',
  'shareCheckBoxPriority',
  shareOptionsHandler
);

const checkBoxCompleted = getInputCheckBox(
  'completed',
  'Status',
  false,
  '',
  'shareCheckBoxCompleted',
  shareOptionsHandler
);

const checkBoxCreatedAt = getInputCheckBox(
  'createdAt',
  'Data de criação',
  false,
  '',
  'shareCheckBoxCreatedAt',
  shareOptionsHandler
);
const textContent = getComponent('code');
textContent.props.id = 'contentShare';
const contentShare = getComponent('pre', textContent);

const modalShareTasks = getComponent(
  'div',
  getComponent(
    'h3',
    getTextComponent(getText(getLang(), 'app.modalShareTasks.title'))
  ),
  getComponent(
    'fieldset',
    getComponent(
      'legend',
      getTextComponent(getText(getLang(), 'actions.chooseShareOptions'))
    ),
    statusFilter,
    priorityFilter,
    checkBoxPriority,
    checkBoxCompleted,
    checkBoxCreatedAt
  ),
  contentShare
);

const showModalShareTasksButton = createButton(
  getText(getLang(), 'actions.shareTasks'),
  () => {
    showModal(
      modalShareTasks,
      'share-modal scrollbar',
      shareTasksHandler,
      getText(getLang(), 'actions.shareTasks')
    );
    shareOptionsHandler();
  },
  '',
  'btn-share-tasks',
  getText(getLang(), 'actions.shareTasks')
);

const showModalDeleteTasksButton = createButton(
  getText(getLang(), 'actions.deleteTasks'),
  () => {
    showModal(modalDeleteTasks, 'remove-all-modal', deleteAllTasks);
  },
  '',
  'button-secondary',
  getText(getLang(), 'actions.deleteAllTasksConfirm', tasks.length)
);

export const footer = getComponent(
  'footer',
  showModalShareTasksButton,
  showModalDeleteTasksButton
);
