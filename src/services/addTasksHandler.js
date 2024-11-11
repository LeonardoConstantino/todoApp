/**
 * Gerenciador de tarefas com suporte a prioridades e status
 * @module addTasksHandler
 * 
 * @import { Task } from '../utils/types.js'
 */

import { renderTasks } from "../layout/tasks";
import { convertToDate, getLang, saveTasks, updateOccupiedSize } from "../utils/helpers";
import { showSnackbar } from "../utils/showSnackbar";
import { getText } from "./dialogHandler";
import { getTasks } from "./storageHandle";

/**
 * Gerenciador de tarefas com suporte a prioridades e status
 */

// Constantes
const TASK_STATUS = {
    COMPLETE: '✅',
    INCOMPLETE: '❌'
  };
  
  const PRIORITY_ICONS = {
    high: '🔵',
    medium: '🟠',
    low: '🔴'
  };
  
  const DATE_PATTERN = /^\[\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2}:\d{2}\]$/;
  
  /**
   * Processa e adiciona tarefas à lista
   * @returns {void}
   */
  export const addTasks = () => {
    const tasks = getTasks()

    /**@type {HTMLInputElement | null} */
    const input = document.querySelector('#taskInput');
    /**@type {HTMLSelectElement | null} */
    const prioritySelect = document.querySelector('select#prioritySelect');
    
    const taskLines = input?.value.trim().split('\n').filter(Boolean) || [];
    
    if (!taskLines.length) {
      showSnackbar(getText(getLang(), 'notifications.taskEmpty'));
      return;
    }
  
    // Agrupa as linhas em pares de tarefa e data
    const taskPairs = groupTasksAndDates(taskLines);
    
    const newTasks = taskPairs.map(([taskLine, dateLine]) => 
      createTaskObject(taskLine, dateLine, prioritySelect?.value || 'low')
    );
  
    tasks.push(...newTasks);
    
    // Limpar e atualizar UI
    updateUI(input, tasks);
  };
  
  /**
 * Agrupa as linhas em pares de tarefa e data
 * @param {string[]} lines - Array de linhas do input
 * @returns {Array} Array de pares [tarefa, data]
 */
const groupTasksAndDates = (lines) => {
    const pairs = [];
  
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
  
      // Pula se for uma linha de data
      if (DATE_PATTERN.test(line)) continue;
  
      // Verifica se a próxima linha é uma data
      const nextLine = lines[i + 1]?.trim();
      const isNextLineDate = nextLine && DATE_PATTERN.test(nextLine);
      const dateLine = isNextLineDate ? nextLine : null;
  
      // Adiciona o par [tarefa, data] ou [tarefa, null]
      pairs.push([line, dateLine]);
    }
  
    return pairs;
  };
  
  
  /**
   * Cria um objeto de tarefa baseado no texto de entrada
   * @param {string} taskLine - Linha de texto da tarefa
   * @param {Date|null} dateLine - Linha com a data
   * @param {string} defaultPriority - Prioridade padrão
   * @returns {Task} Objeto da tarefa
   */
  const createTaskObject = (taskLine, dateLine, defaultPriority) => {
    const now = new Date();
    const isSharedTask = Object.values({...TASK_STATUS, ...PRIORITY_ICONS})
      .some(icon => taskLine.includes(`[${icon}]`));
  
    // Extrair informações da tarefa
    const status = extractStatus(taskLine);
    const priority = extractPriority(taskLine, defaultPriority);
    const title = taskLine.replace(/\[.*?\]/g, '').trim();
    const createdAt = extractDate(dateLine);
  
    return {
      id: Date.now() + Math.random(),
      title,
      priority: isSharedTask ? priority : defaultPriority,
      completed: status === TASK_STATUS.COMPLETE,
      createdAt: createdAt || now,
      completedAt: now
    };
  };
  
  /**
   * Extrai o status da tarefa do texto
   * @param {string} text - Texto da tarefa
   * @returns {string} Status extraído
   */
  const extractStatus = (text) => {
    const match = text.match(/\[(✅|❌)\]/);
    return match ? match[1] : TASK_STATUS.INCOMPLETE;
  };
  
  /**
   * Extrai a prioridade da tarefa do texto
   * @param {string} text - Texto da tarefa
   * @param {string} defaultPriority - Prioridade padrão
   * @returns {string} Prioridade extraída
   */
  const extractPriority = (text, defaultPriority) => {
    const match = text.match(/\[(🔵|🟠|🔴)\]/);
    if (!match) return defaultPriority;
  
    const iconToPriority = {
      '🔴': 'high',
      '🟠': 'medium',
      '🔵': 'low'
    };
    
    return iconToPriority[match[1]] || defaultPriority;
  };
  
  /**
   * Extrai a data do texto
   * @param {Date | null} text - Texto contendo a data
   * @returns {Date | null} Data extraída ou data atual
   */
  const extractDate = (text) => {
    if (!text) return null;
    if (!text) return new Date();
    const cleanText = text.toString().replace(/[\[\]]/g, '').trim();
    return convertToDate(cleanText);
  };
  
  /**
   * Atualiza a interface do usuário
   * @param {HTMLInputElement | null} input - Elemento de input
   */
  const updateUI = (input, tasks) => {
    if (input) input.value = '';
    saveTasks(tasks);
    renderTasks(tasks);
    updateOccupiedSize(tasks);
    showSnackbar(getText(getLang(), 'notifications.tasksAdded'));
  };