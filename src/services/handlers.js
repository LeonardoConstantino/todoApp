//src/services/handlers.js
/**
 * @import { Task } from '../utils/types.js'
 * @import { ElementConfig } from '../utils/types.js'
 */

import { storageUtil } from '../utils/storageUtil.js';
import {
  formatDate,
  getLang,
  saveTasks,
  updateOccupiedSize,
} from '../utils/helpers.js';
import { getFilteredTasks, renderTasks } from './../layout/tasks';
import { showSnackbar } from '../utils/showSnackbar.js';
import { getTasks } from './storageHandle.js';
import { getText } from './dialogHandler.js';
import { renderElement } from '../utils/renderElement.js';
import { closeModal, getModal } from '../components/modal.js';

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
 * Aplica os filtros selecionados e atualiza a exibição das tarefas.
 *
 * @returns {void}
 */
export const applyFilters = () => {
  const currentTasks = getTasks();
  renderTasks(currentTasks);
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
  const nextPriorityIndex =
    (currentPriorityIndex + 1) % availablePriorities.length;
  task.priority = availablePriorities[nextPriorityIndex];

  const updatedPriority = getText(getLang(), 'priorities')[task.priority];

  saveTasks(tasks);
  renderTasks(tasks);
  showSnackbar(
    getText(getLang(), 'notifications.priorityUpdated', updatedPriority)
  );
};

/**
 * Exclui todas as tarefas da lista de tarefas.
 *
 * @returns {void}
 */
export const deleteAllTasks = () => {
  const currentTasks = getTasks();
  currentTasks.length = 0;
  saveTasks(currentTasks);
  renderTasks(currentTasks);
  updateOccupiedSize(currentTasks);
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
 * @param {ElementConfig} content - O conteúdo a ser exibido no modal.
 * @param {string} className - Uma string que representa o nome da classe CSS a ser aplicada ao modal.
 * @param {Function} confirmeHandler - A função a ser executada quando o usuário confirmar a ação.
 * @param {string} [textBtnConfirme='OK'] - O texto a ser exibido no botão de confirmação.
 * @param {string} [titleBtnConfirme='Confirmar'] - O título a ser exibido no botão de confirmação.
 * @param {Function} [cancelHandler=closeModal] - A função a ser executada quando o usuário cancelar a ação.
 * @param {string} [textBtnCancel='Cancelar'] - O texto a ser exibido no botão de cancelamento.
 * @param {string} [titleBtnCancel='Fechar'] - O título a ser exibido no botão de fechamento.
 * @returns {void}
 */
export const showModal = (
  content,
  className,
  confirmeHandler,
  textBtnConfirme,
  titleBtnConfirme,
  cancelHandler,
  textBtnCancel,
  titleBtnCancel
) => {
  const modal = renderElement(
    getModal(
      content,
      className,
      confirmeHandler,
      textBtnConfirme,
      titleBtnConfirme,
      cancelHandler,
      textBtnCancel,
      titleBtnCancel
    ),
    true
  );

  if (modal instanceof HTMLDialogElement) {
    modal.showModal();
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

  button.title = getText(getLang(), 'actions.tasksView', !isCompact);
  buttonTextWrapper.textContent = getText(
    getLang(),
    'actions.tasksView',
    !isCompact
  );
};

/**
 * Variável que armazena o ID do timeout para o debounce.
 */
let debounceTimeout;

/**
 * Manipulador de eventos para o campo de pesquisa de tarefas.
 *
 * Esse manipulador é responsável por filtrar as tarefas exibidas com base no
 * valor digitado no campo de pesquisa. Ele utiliza um debounce para evitar
 * atualizações excessivas da interface.
 *
 * @param {Event} e - O evento de entrada do usuário no campo de pesquisa.
 * @returns {void}
 */
export const inputSearchHandler = (e) => {
  e.preventDefault();
  if (!(e.target instanceof HTMLInputElement)) return;

  const inputValue = e.target.value.toLowerCase().trim();

  clearTimeout(debounceTimeout);

  const currentTasks = getTasks();

  debounceTimeout = setTimeout(() => {
    const filteredTasks = currentTasks.filter((task) => {
      const taskText = task.title.toLowerCase();
      return taskText.includes(inputValue);
    });

    renderTasks(filteredTasks);
  }, 300);
};

/**
 * Manipulador de eventos para as opções de compartilhamento.
 * Esse manipulador é responsável por gerenciar as interações do usuário com as
 * opções de compartilhamento, como filtros de status, prioridade e checkboxes.
 * Ele atualiza os filtros correspondentes na interface do usuário e renderiza
 * as tarefas filtradas no container de compartilhamento.
 */
export const shareOptionsHandler = () => {
  /** @type {HTMLSelectElement | null} */
  const shareStatusFilter = document.querySelector('#shareStatusFilter');
  /** @type {HTMLSelectElement | null} */
  const sharePriorityFilter = document.querySelector('#sharePriorityFilter');
  /** @type {HTMLInputElement | null} */
  const shareCheckBoxPriority = document.querySelector(
    '#shareCheckBoxPriority'
  );
  /** @type {HTMLInputElement | null} */
  const shareCheckBoxCompleted = document.querySelector(
    '#shareCheckBoxCompleted'
  );
  /** @type {HTMLInputElement | null} */
  const shareCheckBoxCreatedAt = document.querySelector(
    '#shareCheckBoxCreatedAt'
  );
  /** @type {HTMLElement | null} */
  const sharedContainer = document.querySelector('#contentShare');
  /** @type {HTMLSelectElement | null} */
  const selectStatusFilter = document.querySelector('select#statusFilter');
  /** @type {HTMLSelectElement | null} */
  const selectPriorityFilter = document.querySelector('select#priorityFilter');

  const currentTasks = getTasks();

  if (
    !shareStatusFilter ||
    !sharePriorityFilter ||
    !selectStatusFilter ||
    !selectPriorityFilter ||
    !sharedContainer
  ) {
    showSnackbar(getText(getLang(), 'notifications.shareTasks.error'));
    return;
  }
  selectStatusFilter.value = shareStatusFilter.value;
  selectPriorityFilter.value = sharePriorityFilter.value;

  const formatTaskText = ({ title, completed, priority, createdAt }) => {
    const statusText = shareCheckBoxCompleted?.checked
      ? `[${completed ? '✅' : '❌'}] `
      : '';
    const priorityText = shareCheckBoxPriority?.checked
      ? `[${priority === 'high' ? '🔴' : priority === 'low' ? '🔵' : '🟠'}] `
      : '';
    const createdAtText = shareCheckBoxCreatedAt?.checked
      ? `\n[${formatDate(createdAt)}]`
      : '';
    return `${statusText}${priorityText}${title}${createdAtText}\n`;
  };

  sharedContainer.textContent = getFilteredTasks(currentTasks)
    .map(formatTaskText)
    .join('');
};

/**
 * Manipulador de eventos para compartilhar tarefas.
 * Esse manipulador é responsável por copiar o conteúdo do elemento '#contentShare' para a área de transferência do navegador.
 * Ele também verifica se o navegador suporta a API de área de transferência e exibe uma mensagem de notificação apropriada.
 *
 * @param {Event} e - O evento que acionou o manipulador.
 * @returns {Promise<void>} - Uma Promise que resolve quando a operação de compartilhamento é concluída.
 */
export const shareTasksHandler = async (e) => {
  /** @type {HTMLElement | null} */
  const sharedContainer = document.querySelector('#contentShare');
  if (!sharedContainer) return;

  const text = sharedContainer.textContent?.trim();
  if (!text) return;

  if (!navigator.clipboard) {
    showSnackbar(getText(getLang(), 'notifications.shareTasks.unsupported'));
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    showSnackbar(getText(getLang(), 'notifications.shareTasks.success'));
  } catch (error) {
    showSnackbar(getText(getLang(), 'notifications.shareTasks.error'));
  } finally {
    closeModal(e);
  }
};
