/**
 * @typedef {Object} Task - Representa uma tarefa.
 * @property {number} id - O ID da tarefa.
 * @property {string} title - O título da tarefa.
 * @property {string} priority - A prioridade da tarefa.
 * @property {boolean} completed - Indica se a tarefa foi concluída.
 * @property {Date} createdAt - A data de criação da tarefa.
 * @property {Date} completedAt - A data de conclusão da tarefa.
 */

/**
 * @typedef {Object} ElementConfig - Configuração do elemento
 * @property {string} type - Tipo do elemento (ex: 'div', 'span', 'p', etc.)
 * @property {Object} [props] - Propriedades do elemento (ex: { id: 'myId', class: 'myClass' })
 * @property {string} [props.nodeValue] - Valor do nó de texto (ex: 'Texto do nó')
 * @property {Array<ElementConfig>} [props.children] - Filhos do elemento.
 */

/**
 * Exporta os types para uso em outros arquivos
 * @typedef {object} Types
 * @property {Task} TASKS - Tipos de jogos disponíveis.
 * @property {ElementConfig} ELEMENTCONFIG - Tipos de cores.
 */
module.exports = Types