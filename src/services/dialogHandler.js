/**
 * @description Objeto contendo as prioridades disponíveis para as tarefas, com seus respectivos rótulos localizados em português.
 * As prioridades disponíveis são: baixa (🔵), média (🟠) e alta (🔴).
 */
const priorities = {
  low: 'Baixa 🔵',
  medium: 'Média 🟠',
  high: 'Alta 🔴',
};

/**
 * @description Objeto contendo os textos localizados para o aplicativo, organizados por idioma.
 * Cada idioma possui uma estrutura de objetos aninhados que representam os diferentes contextos e mensagens do aplicativo.
 * Esses textos são utilizados pela função `getText` para obter os textos localizados.
 */
const texts = {
  'pt-br': {
    app: {
      title: '📋 Lista de Tarefas',
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
    },
    placeholders: {
      taskInput: '📝 Digite suas tarefas (uma por linha)',
    },
    priorities: { ...priorities },
    actions: {
      addTasks: '➕ Adicionar Tarefas',
      deleteTasks: '🗑️ Remover Tarefas',
      toggleTheme: '🌓 Alternar Tema',
      deleteTaskConfirm: (title) => `Excluir tarefa "${title}" 🗑️`,
      deleteAllTasksConfirm: (count) =>
        `Excluir todas as tarefas (${count}) 🔄🗑️`,
    },
    filters: {
      status: {
        all: 'Todos 📋',
        completed: 'Concluídas ✅',
        pending: 'Pendentes ⏳',
      },
      priority: {
        all: 'Todos 📋',
        ...priorities,
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
