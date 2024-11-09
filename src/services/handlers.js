//src/services/handlers.js
/**
 * @import { Task } from '../utils/types.js'
 */

import { storageUtil } from '../utils/storageUtil.js';
import { getLang, saveTasks, updateOccupiedSize } from '../utils/helpers.js';
import { renderTasks } from './../layout/tasks';
import { showSnackbar } from '../utils/showSnackbar.js';
import { tasks } from './storageHandle.js';
import { getText } from './dialogHandler.js';
import { renderElement } from '../utils/renderElement.js';
import { getModal } from '../components/modal.js';

/**
 * Alterna o tema da aplicação entre claro e escuro.
 *
 * @param {Event} e - O evento que disparou a função.
 * @returns {void}
 */
export const toggleTheme = (e) => {
  if (!(e.target instanceof HTMLElement)) return;

  const btn = e.target.closest('button');
  if (!btn) return;

  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  btn.title = getText(getLang(), 'notifications.themeToggled', newTheme);
  document.documentElement.setAttribute('data-theme', newTheme);
  storageUtil.setItem('theme', newTheme);
  showSnackbar(getText(getLang(), 'notifications.themeChanged', newTheme));
};

/**
 * Alterna a prioridade de uma tarefa.
 *
 * @param {Event} e - O evento que disparou a função.
 * @returns {void}
 */
export const togglePriority = (e) => {
  if (!(e.target instanceof HTMLElement)) return;
  const select = e.target.querySelector('option:checked');
  if (select) {
    const priority = select?.textContent;
    showSnackbar(getText(getLang(), 'notifications.priorityUpdated', priority));
  }
};

/**
 * Adiciona uma ou mais tarefas à lista de tarefas.
 *
 * @param {Event} e - O evento que disparou a função.
 * @returns {void}
 */
export const addTasks = (e) => {
  // console.log('e :', e);
  e.preventDefault();
  /** @type {HTMLSelectElement | null} */
  const input = document.querySelector('#taskInput');
  /** @type {HTMLSelectElement | null} */
  const prioritySelect = document.querySelector('select#prioritySelect');
  const priority = prioritySelect ? prioritySelect.value : 'low';
  const taskLines =
    input?.value
      .trim()
      .split('\n')
      .filter((line) => Boolean(line)) || [];

  if (taskLines.length === 0) {
    showSnackbar(getText(getLang(), 'notifications.taskEmpty'));
    return;
  }

  taskLines.forEach((title) => {
    if (title.trim()) {
      const now = new Date();
      const task = {
        id: +(Date.now() + Math.random()),
        title: title.trim(),
        priority,
        completed: false,
        createdAt: now,
        completedAt: now,
      };
      tasks.push(task);
    }
  });

  saveTasks(tasks);

  if (input) {
    input.value = '';
  }

  renderTasks(tasks);
  updateOccupiedSize(tasks);
  showSnackbar(getText(getLang(), 'notifications.tasksAdded'));
};

/**
 * Aplica os filtros selecionados e atualiza a exibição das tarefas.
 *
 * @returns {void}
 */
export const applyFilters = () => {
  renderTasks(tasks);
  showSnackbar(getText(getLang(), 'notifications.filtersApplied'));
};

/**
 * Alterna o status de conclusão de uma tarefa.
 *
 * @param {number} id - O ID da tarefa a ser alternada.
 * @param {Array<Task>} tasks - A lista de tarefas.
 * @returns {void}
 */
export const toggleTask = (id, tasks) => {
  /**@type {Task | undefined} */
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.completed = !task.completed;
    task.completedAt = task.completed ? new Date() : task.createdAt;
    saveTasks(tasks);
    renderTasks(tasks);
    showSnackbar(getText(getLang(), 'notifications.taskStatusChanged', task));
    return;
  }
  showSnackbar(getText(getLang(), 'notifications.taskNotFound'));
};

/**
 * Exclui uma tarefa da lista de tarefas.
 *
 * @param {number} id - O ID da tarefa a ser excluída.
 * @param {Array<Task>} tasks - A lista de tarefas.
 * @returns {void}
 */
export const deleteTask = (id, tasks) => {
  const deletedTask = tasks.find((t) => t.id === id);
  const filteredTasks = tasks.filter((t) => t.id !== id);
  saveTasks(filteredTasks);
  renderTasks(filteredTasks);
  updateOccupiedSize(filteredTasks);
  showSnackbar(getText(getLang(), 'notifications.taskDeleted', deletedTask));
};

/**
 * Altera a prioridade de uma tarefa na lista de tarefas.
 *
 * @param {Event} e - O evento de clique do usuário.
 * @param {Array<Task>} tasks - A lista de tarefas.
 * @returns {void}
 */
export const handleChangePriority = (e, tasks) => {
  if (!(e.target instanceof HTMLElement)) return;

  const button = e.target.closest('button');
  const id = button?.dataset.id;
  if (!button || !id) return;

  /** @type {Task | undefined} */
  const task = tasks.find((t) => t.id === Number(id));
  if (!task) return;

  const availablePriorities = Object.keys(getText(getLang(), 'priorities'));
  const currentPriorityIndex = availablePriorities.indexOf(task.priority);
  
  // Calcula o próximo índice de prioridade de forma circular
  const nextPriorityIndex = (currentPriorityIndex + 1) % availablePriorities.length;
  task.priority = availablePriorities[nextPriorityIndex];

  const updatedPriority = getText(getLang(), 'priorities')[task.priority];

  saveTasks(tasks);
  renderTasks(tasks);
  showSnackbar(getText(getLang(), 'notifications.priorityUpdated', updatedPriority));
};


/**
 * Exclui todas as tarefas da lista de tarefas.
 *
 * @returns {void}
 */
export const deleteAllTasks = () => {
  tasks.length = 0;
  saveTasks(tasks);
  renderTasks(tasks);
  updateOccupiedSize(tasks);
  showSnackbar(getText(getLang(), 'notifications.allTasksDeleted'));
};

/**
 * Exibe uma mensagem no modal quando um idioma é selecionado.
 *
 * @param {Event} e - O evento de clique do usuário.
 * @returns {void}
 */
export const showMessageSelectedLang = (e) => {
  e.preventDefault();
  if (!(e.target instanceof HTMLElement)) return;

  const modal = e.target.closest('dialog');
  if (!modal) return;

  const selectedLanguage = modal.querySelector(
    'input[name="language"]:checked'
  );

  if (selectedLanguage instanceof HTMLInputElement) {
    showSnackbar(
      getText(
        getLang(),
        'notifications.languageSelected',
        selectedLanguage.value
      )
    );
  }
};

/**
 * Exibe um modal na aplicação.
 *
 * @param {any} content - O conteúdo a ser exibido no modal.
 * @param {Function} confirmeHandler - A função a ser chamada quando o usuário confirmar o modal.
 * @returns {void}
 */
export const showModal = (content, confirmeHandler) => {
  const modal = renderElement(getModal(content, confirmeHandler), true);
  if (modal instanceof HTMLDialogElement) {
    modal.showModal();
  }
};

/**
 * Fecha um modal exibido na aplicação.
 *
 * @param {Event} e - O evento de clique do usuário que acionou o fechamento do modal.
 * @returns {void}
 */
export const closeModal = (e) => {
  e.preventDefault();
  if (!(e.target instanceof HTMLElement)) return;

  const modal = e.target.closest('dialog');
  if (modal instanceof HTMLDialogElement) {
    modal.close();
    modal.remove();
  }
};

/**
 * Alterna o idioma da aplicação.
 *
 * @param {Event} e - O evento de clique do usuário.
 * @returns {void}
 */
export const toggleLanguage = (e) => {
  e.preventDefault();
  if (!(e.target instanceof HTMLElement)) return;

  const modal = e.target.closest('dialog');
  if (!modal) return;

  const selectedLanguage = modal.querySelector(
    'input[name="language"]:checked'
  );
  if (selectedLanguage instanceof HTMLInputElement) {
    storageUtil.setItem('language', selectedLanguage.value);
  }

  closeModal(e);
  window.location.reload();
};

export const handleTasksView = (e) => {
  e.preventDefault();
  if (!(e.target instanceof HTMLElement)) return;

  const button = e.target.closest('button');
  const buttonTextWrapper = e.target.closest('span');
  const taskList = document.querySelector('#taskList');
  if (!button || !taskList || !buttonTextWrapper) return;

  const isCompact = taskList.classList.contains('task-card-compact');
  taskList.classList.toggle('task-card-compact', !isCompact);
  
  button.title = getText(getLang(), 'actions.tasksView', !isCompact)
  buttonTextWrapper.textContent = getText(getLang(), 'actions.tasksView', !isCompact);
}

let debounceTimeout;

export const inputSearchHandler = (e) => {
  e.preventDefault();
  if (!(e.target instanceof HTMLInputElement)) return;

  const inputValue = e.target.value.toLowerCase().trim();

  clearTimeout(debounceTimeout);

  debounceTimeout = setTimeout(() => {
    const filteredTasks = tasks.filter((task) => {
      const taskText = task.title.toLowerCase();
      return taskText.includes(inputValue);
    });

    renderTasks(filteredTasks);
  }, 300);
};