// src/utils/helpers.js
/**
 * @import { Task } from './types.js'
 */

import { getText } from '../services/dialogHandler';
import { currentLanguage } from '../services/storageHandle.js';
import { storageUtil } from './storageUtil';

/**
 * Capitaliza a primeira letra de uma string.
 * @param {string} str - A string a ser capitalizada.
 * @returns {string} - A string com a primeira letra em maiúsculo.
 */
export const capitalizeFirstLetter = (str) => {
  // Verifica se o argumento fornecido é uma string não vazia
  if (typeof str !== 'string' || str.length === 0) {
    return '';
  }
  // Converte a primeira letra para maiúsculo e junta com o restante da string
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * @function calculateLocalStorageSize
 * @description Calcula o tamanho de um item para ser armazenado no localStorage e o formata em bytes, KB ou MB.
 * @param {object | Array<*> | string | number | boolean} item - O item a ser calculado, que será convertido para string e medido.
 * @returns {string} - O tamanho do item formatado como string, em bytes, KB ou MB.
 */
export const calculateLocalStorageSize = (item) => {
  if (item === null || item === undefined) {
    return '0 bytes';
  }
  const localStorageItem = JSON.stringify(item);
  const bytes = new Blob([localStorageItem]).size;

  if (bytes < 1024) {
    return `${bytes.toLocaleString()} bytes`;
  } else if (bytes < 1024 * 1024) {
    const kilobytes = bytes / 1024;
    return `${kilobytes.toFixed(2)} KB`;
  } else {
    const megabytes = bytes / (1024 * 1024);
    return `${megabytes.toFixed(2)} MB`;
  }
};

/**
 * Cria um componente genérico com filhos.
 * @param {string} type - O tipo do elemento a ser criado.
 * @param {...Object} children - Os componentes filhos a serem incluídos no elemento.
 * @returns {Object} As configurações para criar um componente genérico.
 */
export const getComponent = (type, ...children) => {
  return {
    type: type,
    props: {
      children: [...children],
    },
  };
};

/**
 * Cria um componente de texto.
 * @param {string} text - O texto a ser exibido.
 * @returns {Object} As configurações para criar um componente de texto.
 */
export const getTextComponent = (text) => {
  return {
    type: null,
    props: {
      nodeValue: text,
    },
  };
};

/**
 * Cria um componente de texto.
 * @param {string} text - O texto a ser exibido.
 * @returns {Object} As configurações para criar um componente de texto.
 */
export const getTextSpan = (text) => {
  return getComponent('span', getTextComponent(text));
};

/**
 * Atualiza as estatísticas de tarefas.
 * @param {Array<Task>} tasks - Um array de tarefas.
 * @param {boolean} [isAppending=false] - Indica se as estatísticas devem ser anexadas ao elemento HTML.
 * @returns {string | undefined} - Uma string contendo as estatísticas de tarefas.
 */
export const updateStats = (tasks, isAppending = false) => {
  const total = tasks.length || 0;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;

  /** @type {HTMLElement | null} */
  const divStats = document.querySelector('#stats');

  const lastCompletedTask = getLastCompletedTask(tasks);

  const content = getText(
    getLang(),
    'notifications.summary',
    total,
    pending,
    completed
  );

  if (divStats) {
    divStats.innerHTML = content;
    divStats.title = getText(
      getLang(),
      'infos.lastCompletedTask',
      lastCompletedTask
    );
  }

  if (!isAppending) {
    return content;
  }
};

/**
 * Atualiza o tamanho ocupado no armazenamento local.
 * @param {Array<Task>} tasks - Um array de tarefas.
 * @returns {void}
 */
export const updateOccupiedSize = (tasks) => {
  const divSizeInfo = document.querySelector('div #sizeInfo');
  if (divSizeInfo) {
    divSizeInfo.innerHTML = getText(
      getLang(),
      'notifications.storageUsage',
      calculateLocalStorageSize(tasks)
    );
  }
};

/**
 * Salva as tarefas no armazenamento local.
 * @param {Array<Task>} tasks - Um array de tarefas.
 * @returns {void}
 */
export const saveTasks = (tasks) => {
  storageUtil.setItem('tasks', tasks);
  updateStats(tasks, true);
};

/**
 * Formata uma data para a localidade 'pt-BR'.
 * @param {Date} date - A data a ser formatada.
 * @returns {string} - A data formatada como uma string no formato 'pt-BR'.
 */
export const formatDate = (date) => {
  return new Date(date).toLocaleString(getLang());
};

/**
 * Converte uma string de data no formato 'dd/MM/yyyy HH:mm:ss' para um objeto Date.
 * @param {string} stringDate - A string de data no formato 'dd/MM/yyyy HH:mm:ss'.
 * @returns {Date | null} - Um objeto Date representando a data fornecida ou null se a conversão falhar.
 */
export const convertToDate = (stringDate) => {
  if (!stringDate) return null;

  // Usando match para pegar os números
  const match = stringDate.replace(/,/g, '').match(/\d+/g);
  
  // Se match for null, significa que não encontrou números para desestruturar
  if (!match) return null;

  // Desestruturando os valores
  const [day, month, year, hours, minutes, seconds] = match;

  // Criando o objeto Date com os valores desestruturados
  const date = new Date(+year, +month - 1, +day, +hours, +minutes, +seconds);

  return date;
};


/**
 * Calcula a diferença de tempo entre duas datas.
 * @param {number} start - A data de início em milissegundos.
 * @param {number} end - A data de término em milissegundos.
 * @returns {string} - Uma string que representa a diferença de tempo em dias, horas ou minutos.
 */
export const getTimeDiff = (start, end) => {
  const diff = end - start;
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} dia(s)`;
  if (hours > 0) return `${hours} hora(s)`;
  return `${minutes} minuto(s)`;
};

/**
 * Retorna o idioma do navegador ou o idioma atual da aplicação armazenado no armazenamento local.
 * @returns {string} - O código de idioma em minúsculas.
 */
export const getLang = () => {
  const lang = currentLanguage || navigator.language || 'pt-br';
  return lang.toLowerCase();
};

/**
 * Retorna a última tarefa concluída da lista de tarefas.
 * @param {Array<Task>} tasks - Um array de tarefas.
 * @returns {Task|undefined} - A última tarefa concluída, ou undefined se não houver nenhuma tarefa concluída.
 */
export const getLastCompletedTask = (tasks) => {
  const lastCompletedTask = tasks
    .filter((task) => task.completed)
    .sort((a, b) => +new Date(b.completedAt) - +new Date(a.completedAt))[0];
  return lastCompletedTask;
};
