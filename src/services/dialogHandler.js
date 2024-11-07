import { getTimeDiff } from "../utils/helpers";

/**
 * @description Objeto contendo os textos localizados para o aplicativo, organizados por idioma.
 * Cada idioma possui uma estrutura de objetos aninhados que representam os diferentes contextos e mensagens do aplicativo.
 * Esses textos são utilizados pela função `getText` para obter os textos localizados.
 */
const texts = {
  'pt-br': {
    app: {
      title: '📋 Lista de Tarefas',
      modalLang: {
        title: 'Escolha uma nova lingua.',
      },
      modalDeleteTasks: {
        title: 'Tem certeza de que deseja remover todas as tarefas?',
      },
      'pt-br': 'Português 🇧🇷',
      'en-us': 'English 🇺🇸',
      'es-es': 'Español 🇪🇸',
    },
    notifications: {
      appStarted: '🚀 O aplicativo iniciado com sucesso!',
      startError: (message) =>
        `❌ Ocorreu um erro ao iniciar o aplicativo. ${message}`,
      themeToggled: (currentTheme) => `🌓 Alternar Tema para ${currentTheme}`,
      themeChanged: (newTheme) => `Tema alterado para ${newTheme} 🌓`,
      priorityUpdated: (priority) => `🔄 Prioridade alterada para ${priority}`,
      tasksAdded: '✅ Tarefa(s) adicionada(s) com sucesso!',
      filtersApplied: '🎯 Filtros aplicados com sucesso!',
      taskStatusChanged: (task) =>
        `Tarefa "${task.title}" ${task.completed ? 'concluída' : 'pendente'}!`,
      taskNotFound: '⚠️ Tarefa não encontrada!',
      taskDeleted: (deletedTask) =>
        `🗑️ Tarefa "${deletedTask.title}" excluída com sucesso!`,
      allTasksDeleted: '🗑️ Todas as tarefas excluídas com sucesso!',
      storageUsage: (usage) => `🗂️ ~${usage} / ~10 MB`,
      summary: (total, pending, completed) =>
        `Total: ${total} | Pendentes: ${pending} | Concluídas: ${completed} 📊`,
      languageSelected: (newLanguage) =>
        `🌐 ${newLanguage} Selecionado com sucesso! Clique em OK para aplicar!`,
    },
    placeholders: {
      taskInput: '📝 Digite suas tarefas (uma por linha)',
    },
    priorities: {
      low: 'Baixa 🔵',
      medium: 'Média 🟠',
      high: 'Alta 🔴',
    },
    actions: {
      addTasks: '➕ Adicionar Tarefas',
      deleteTasks: '🗑️ Remover Tarefas',
      toggleTheme: '🌓 Alternar Tema',
      deleteTaskConfirm: (title) => `Excluir tarefa "${title}" 🗑️`,
      deleteAllTasksConfirm: (count) =>
        `Excluir todas as tarefas (${count}) 🔄🗑️`,
      changeLanguage: '🌐 Mudar Idioma',
      toggleLanguage: '🌐 Mudar Idioma! Português, English e Español',
    },
    filters: {
      status: {
        all: 'Todos 📋',
        completed: 'Concluídas ✅',
        pending: 'Pendentes ⏳',
      },
      priority: {
        all: 'Todos 📋',
        low: 'Baixa 🔵',
        medium: 'Média 🟠',
        high: 'Alta 🔴',
      },
    },
    taskDetails: {
      created: (createdAt) => `⏱️ Criada: ${createdAt}`,
      completed: (completedAt) => `⏱️ Concluída: ${completedAt}`,
      timeSpent: (time) => `⏱️ Tempo: ${time}`,
    },
    labels: {
      taskList: '📋 Lista de Tarefas',
      delete: 'Excluir 🗑️',
    },
    infos: {
      sizeInfo: 'Os tamanhos são aproximados e podem variar. 🗂️',
      lastCompletedTask: (lastCompletedTask) => lastCompletedTask.completed?`⏱️ Última tarefa concluída: ${lastCompletedTask.title} a ${getTimeDiff(+new Date(lastCompletedTask.completedAt), +new Date())}`: 'Nenhuma tarefa concluída',
      selectInfo: (objectOptions) => `📋 Selecione entre as seguintes opções: ${Object.values(objectOptions).join(', ')}`,
    }
  },
  'en-us': {
    app: {
      title: '📋 Task List',
      modalLang: {
        title: 'Choose a new language.',
      },
      modalDeleteTasks: {
        title: 'Are you sure you want to remove all tasks?',
      },
      'pt-br': 'Portuguese 🇧🇷',
      'en-us': 'English 🇺🇸',
      'es-es': 'Spanish 🇪🇸',
    },
    notifications: {
      appStarted: '🚀 Application started successfully!',
      startError: (message) =>
        `❌ An error occurred while starting the application. ${message}`,
      themeToggled: (currentTheme) => `🌓 Toggle Theme to ${currentTheme}`,
      themeChanged: (newTheme) => `Theme changed to ${newTheme} 🌓`,
      priorityUpdated: (priority) => `🔄 Priority updated to ${priority}`,
      tasksAdded: '✅ Task(s) added successfully!',
      filtersApplied: '🎯 Filters applied successfully!',
      taskStatusChanged: (task) =>
        `Task "${task.title}" ${task.completed ? 'completed' : 'pending'}!`,
      taskNotFound: '⚠️ Task not found!',
      taskDeleted: (deletedTask) =>
        `🗑️ Task "${deletedTask.title}" deleted successfully!`,
      allTasksDeleted: '🗑️ All tasks deleted successfully!',
      storageUsage: (usage) => `🗂️ ~${usage} / ~10 MB`,
      summary: (total, pending, completed) =>
        `Total: ${total} | Pending: ${pending} | Completed: ${completed} 📊`,
      languageChanged: (newLanguage) => `Language changed to ${newLanguage} 🌐`,
      languageSelected: (newLanguage) => `🌐 ${newLanguage} Language selected successfully! Click OK to apply!`,
    },
    placeholders: {
      taskInput: '📝 Enter your tasks (one per line)',
    },
    priorities: {
      low: 'Low 🔵',
      medium: 'Medium 🟠',
      high: 'High 🔴',
    },
    actions: {
      addTasks: '➕ Add Tasks',
      deleteTasks: '🗑️ Remove Tasks',
      toggleTheme: '🌓 Toggle Theme',
      deleteTaskConfirm: (title) => `Delete task "${title}" 🗑️`,
      deleteAllTasksConfirm: (count) => `Delete all tasks (${count}) 🔄🗑️`,
      changeLanguage: '🌐 Change Language',
      toggleLanguage: '🌐 Choose between Portuguese, English and Spanish',
    },
    filters: {
      status: {
        all: 'All 📋',
        completed: 'Completed ✅',
        pending: 'Pending ⏳',
      },
      priority: {
        all: 'All 📋',
        low: 'Low 🔵',
        medium: 'Medium 🟠',
        high: 'High 🔴',
      },
    },
    taskDetails: {
      created: (createdAt) => `⏱️ Created: ${createdAt}`,
      completed: (completedAt) => `⏱️ Completed: ${completedAt}`,
      timeSpent: (time) => `⏱️ Time: ${time}`,
    },
    labels: {
      taskList: '📋 Task List',
      delete: 'Delete 🗑️',
    },infos: {
      sizeInfo: 'The sizes are approximate and may vary. 🗂️',
      lastCompletedTask: (lastCompletedTask) => lastCompletedTask.completed?`⏱️ Last completed task: ${lastCompletedTask.title} at ${getTimeDiff(+new Date(lastCompletedTask.completedAt), +new Date())}`: 'No tasks completed',
      selectInfo: (objectOptions) => `📋 Select between the following options: ${Object.values(objectOptions)}`
    }
  },
  'es-es': {
    app: {
      title: '📋 Lista de Tareas',
      modalLang: {
        title: 'Elige un nuevo idioma.',
      },
      modalDeleteTasks: {
        title: '¿Estás seguro de querer eliminar todas las tareas?',
      },
      'pt-br': 'Portugués 🇧🇷',
      'en-us': 'Inglés 🇺🇸',
      'es-es': 'Español 🇪🇸',
    },
    notifications: {
      appStarted: '🚀 ¡Aplicación iniciada con éxito!',
      startError: (message) =>
        `❌ Ocurrió un error al iniciar la aplicación. ${message}`,
      themeToggled: (currentTheme) => `🌓 Cambiar Tema a ${currentTheme}`,
      themeChanged: (newTheme) => `Tema cambiado a ${newTheme} 🌓`,
      priorityUpdated: (priority) => `🔄 Prioridad cambiada a ${priority}`,
      tasksAdded: '✅ ¡Tarea(s) añadida(s) con éxito!',
      filtersApplied: '🎯 ¡Filtros aplicados con éxito!',
      taskStatusChanged: (task) =>
        `Tarea "${task.title}" ${task.completed ? 'completada' : 'pendiente'}!`,
      taskNotFound: '⚠️ ¡Tarea no encontrada!',
      taskDeleted: (deletedTask) =>
        `🗑️ Tarea "${deletedTask.title}" eliminada con éxito!`,
      allTasksDeleted: '🗑️ ¡Todas las tareas eliminadas con éxito!',
      storageUsage: (usage) => `🗂️ ~${usage} / ~10 MB`,
      summary: (total, pending, completed) =>
        `Total: ${total} | Pendientes: ${pending} | Completadas: ${completed} 📊`,
      languageChanged: (newLanguage) => `Idioma cambiado a ${newLanguage} 🌐`,
      languageSelected: (newLanguage) => `🌐 ${newLanguage} Idioma seleccionado con éxito! Click OK para aplicar!`,
    },
    placeholders: {
      taskInput: '📝 Escribe tus tareas (una por línea)',
    },
    priorities: {
      low: 'Baja 🔵',
      medium: 'Media 🟠',
      high: 'Alta 🔴',
    },
    actions: {
      addTasks: '➕ Añadir Tareas',
      deleteTasks: '🗑️ Eliminar Tareas',
      toggleTheme: '🌓 Cambiar Tema',
      deleteTaskConfirm: (title) => `Eliminar tarea "${title}" 🗑️`,
      deleteAllTasksConfirm: (count) =>
        `Eliminar todas las tareas (${count}) 🔄🗑️`,
      changeLanguage: '🌐 Cambiar Idioma',
      toggleLanguage: '🌐 Elije entre Portugués, Inglés y Español',
    },
    filters: {
      status: {
        all: 'Todas 📋',
        completed: 'Completadas ✅',
        pending: 'Pendientes ⏳',
      },
      priority: {
        all: 'Todas 📋',
        low: 'Baja 🔵',
        medium: 'Media 🟠',
        high: 'Alta 🔴',
      },
    },
    taskDetails: {
      created: (createdAt) => `⏱️ Creada: ${createdAt}`,
      completed: (completedAt) => `⏱️ Completada: ${completedAt}`,
      timeSpent: (time) => `⏱️ Tiempo: ${time}`,
    },
    labels: {
      taskList: '📋 Lista de Tareas',
      delete: 'Eliminar 🗑️',
    },
    infos: {
      sizeInfo: 'Los tamaños son aproximados y pueden variar. 🗂️',
      lastCompletedTask: (lastCompletedTask) => lastCompletedTask.completed?`⏱️ Última tarea completada: ${lastCompletedTask.title} hace ${getTimeDiff(+new Date(lastCompletedTask.completedAt), +new Date())}`: 'No se ha completado ninguna tarea',
      selectInfo: (objectOptions) => `📋 Selecciona entre las siguientes opciones: ${Object.values(objectOptions)}`
    }
  },
};

/**
 * @function getText
 * @description Busca um texto localizado com base no idioma e no caminho fornecido.
 * Suporta parâmetros adicionais para formatar o texto ou executar funções de retorno.
 * @param {string} lang - O código de idioma a ser utilizado (ex.: 'pt', 'en').
 * @param {string} path - O caminho para o texto, onde cada nível é separado por um ponto (ex.: 'menu.home').
 * @param {...any} args - Argumentos opcionais para formatar o texto ou como parâmetros para funções.
 * @returns {string} - Retorna o texto localizado ou uma mensagem de erro caso o texto ou idioma não seja encontrado.
 * @throws {Error} - Lança um erro se o idioma ou o caminho estiverem ausentes, ou se o caminho for inválido.
 */
export const getText = (lang, path, ...args) => {
  try {
    // Validações iniciais
    if (!lang || !path) {
      throw new Error('Idioma e caminho são obrigatórios');
    }

    if (!texts[lang]) {
      return `Idioma "${lang}" não disponível`;
    }

    // Obtém o texto usando reduce para melhor performance e legibilidade
    const value = path.split('.').reduce((obj, key) => {
      if (typeof obj === 'string' || typeof obj === 'function') {
        throw new Error(`Caminho inválido: "${path}"`);
      }
      if (!obj[key]) {
        throw new Error(`Chave "${key}" não encontrada`);
      }
      return obj[key];
    }, texts[lang]);

    // Processa o valor final
    if (typeof value === 'function') {
      return value(...args);
    }

    if (typeof value === 'string') {
      return value;
    }

    if (typeof value === 'object') {
      return value;
    }

    throw new Error('Valor encontrado não é um texto ou função');
  } catch (error) {
    console.warn(`Erro ao obter texto:`, error.message, {
      lang,
      path,
      args,
    });
    return `Texto não encontrado para "${path}" no idioma "${lang}"`;
  }
};
