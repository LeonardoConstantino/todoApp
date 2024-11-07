// src/components/dropdown.js
/**
 * @import { Task } from '../utils/types.js'
 * @import { ElementConfig } from '../utils/types.js'
 */
import {
  getComponent,
  getLang,
  getTextComponent,
  getTextSpan,
} from '../utils/helpers.js';
import { createButton } from '../components/button.js';
import { toggleTask, deleteTask } from '../services/handlers.js';
import {
  capitalizeFirstLetter,
  formatDate,
  getTimeDiff,
} from '../utils/helpers.js';
import { EventDelegator, renderElement } from '../utils/renderElement.js';
import { getText } from '../services/dialogHandler.js';

/**
 * Filtra a lista de tarefas com base nos filtros de status e prioridade selecionados.
 *
 * @param {Array< Task >} tasks - A lista de tarefas a ser filtrada.
 * @returns {Array< Task >} - A lista de tarefas filtrada.
 */
const getFilteredTasks = (tasks) => {
  /** @type {HTMLSelectElement | null} */
  const selectStatusFilter = document.querySelector('select#statusFilter');
  const statusFilter = selectStatusFilter ? selectStatusFilter?.value : 'all';
  /** @type {HTMLSelectElement | null} */
  const selectPriorityFilter = document.querySelector('select#priorityFilter');
  const priorityFilter = selectPriorityFilter
    ? selectPriorityFilter?.value
    : 'all';

  return tasks.filter((task) => {
    const statusMatch =
      statusFilter === 'all' ||
      (statusFilter === 'completed' && task.completed) ||
      (statusFilter === 'pending' && !task.completed);
    const priorityMatch =
      priorityFilter === 'all' || task.priority === priorityFilter;
    return statusMatch && priorityMatch;
  });
};

/**
 * Cria um cartão de tarefa com base em uma tarefa filtrada.
 *
 * @param {Array< Task >} tasks - A tarefa a ser exibida no cartão.
 * @returns {Array<ElementConfig>} - O elemento HTML do cartão de tarefa.
 */
const getTaskList = (tasks) => {
  const filteredTasks = getFilteredTasks(tasks);

  return filteredTasks.map((task) => {
    const {
      id,
      title,
      priority,
      completed,
      createdAt,
      completedAt,
    } = task;

    const taskPriority = getComponent(
      'span',
      getTextComponent(
        capitalizeFirstLetter(getText(getLang(), 'priorities')[priority])
      )
    );
    taskPriority.props.class = `task-priority priority-${priority}`;

    const taskTitle = getComponent('span', getTextComponent(title));
    taskTitle.props.class = 'task-title';

    const inputCheckbox = getComponent('input');
    inputCheckbox.props.class = 'task-checkbox';
    inputCheckbox.props.type = 'checkbox';
    inputCheckbox.props.id = `task-${id}`;
    if (completed) inputCheckbox.props.checked = '';
    inputCheckbox.props.onchange = () => toggleTask(id, tasks);

    const taskHeader = getComponent(
      'div',
      inputCheckbox,
      taskTitle,
      taskPriority
    );
    taskHeader.props.class = 'task-header';

    const taskDates = getComponent('div');
    taskDates.props.children.push(
      getTextSpan(
        getText(getLang(), 'taskDetails.created', formatDate(createdAt))
      )
    );
    if (completed) {
      taskDates.props.children.push(
        getTextSpan(
          getText(getLang(), 'taskDetails.completed', formatDate(completedAt))
        )
      );
    }
    taskDates.props.children.push(
      getTextSpan(
        getText(
          getLang(),
          'taskDetails.timeSpent',
          completed
            ? getTimeDiff(+new Date(createdAt), +new Date(completedAt))
            : getTimeDiff(+new Date(createdAt), +new Date())
        )
      )
    );
    taskDates.props.class = 'task-dates';

    const label = getComponent('label', taskHeader, taskDates);
    label.props.class = 'task-wrapper';

    const deleteButton = createButton(
      getText(getLang(), 'labels.delete'),
      () => deleteTask(id, tasks),
      '',
      'delete-button',
      getText(getLang(), 'actions.deleteTaskConfirm', title)
    );

    const taskActions = getComponent('div', deleteButton);
    taskActions.props.class = 'task-actions';

    const divTaskCard = getComponent('div', label, taskActions);
    divTaskCard.props.class = `task-card ${completed ? 'task-completed' : ''}`;
    return divTaskCard;
  });
};

/**
 * Renderiza a lista de tarefas na página.
 * @param {Array< Task >} tasks - Um array de objetos de tarefa.
 * @returns {void}
 */
export const renderTasks = (tasks) => {
  /** @type {HTMLElement | null} */
  const btnRemoveAll = document.querySelector('.btn-remove-all');

  if (btnRemoveAll) {
    btnRemoveAll.classList.toggle('hidden', tasks.length === 0);
    btnRemoveAll.title = getText(
      getLang(),
      'actions.deleteAllTasksConfirm',
      tasks.length
    );
  }

  const taskList = getTaskList(tasks);

  /** @type {HTMLElement | null} */
  const taskListContainer = document.querySelector('#taskList');
  if (taskListContainer) {
    EventDelegator.cleanup(taskListContainer);
    taskListContainer.innerHTML = '';

    taskList.forEach((task) => {
      renderElement(task, true, taskListContainer);
    });
  }
};
