/**
 * @import { Task } from '../utils/types.js'
 */
import { APP_PREFIX } from '../utils/constants.js';
import { storageUtil } from '../utils/storageUtil';

/**
 * Define o prefixo da aplicação para o armazenamento local.
 * Isso ajuda a organizar os dados da aplicação no armazenamento local.
 */
storageUtil.setAppPrefix(APP_PREFIX);

/**
 * Recupera a lista de tarefas armazenada no armazenamento local.
 * A lista de tarefas é recuperada do armazenamento local com a chave 'tasks'.
 * Caso não exista nenhuma lista de tarefas armazenada, uma lista vazia é retornada.
 * Método dinâmico.
 * @returns {Array<Task>} - A lista de tarefas armazenada no armazenamento local.
 */
export const getTasks = () => storageUtil.getItem('tasks') || [];

/**
 * Recupera o tema atual da aplicação armazenado no armazenamento local.
 * Caso não exista nenhum tema armazenado, o tema padrão 'light' é retornado.
 * @type {string} - O tema atual da aplicação armazenado no armazenamento local.
 */
export const currentTheme = storageUtil.getItem('theme') || 'light';

/**
 * Recupera o idioma atual da aplicação armazenado no armazenamento local.
 * Caso não exista nenhum idioma armazenado, o idioma padrão 'pt-BR' é retornado.
 * @type {string} - O idioma atual da aplicação armazenado no armazenamento local.
 */
export const currentLanguage = storageUtil.getItem('language');
