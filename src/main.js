// src/main.js
// Importa o arquivo CSS principal para aplicar estilos globais à aplicação
import './assets/styles/main.css';

// Importa funções e módulos utilitários e páginas para a estrutura da aplicação
import { renderElement } from './utils/renderElement.js';// Renderiza elementos no DOM
import { home } from './pages/home.js';// Página inicial da aplicação
import { renderTasks } from './layout/tasks.js';// Renderiza tarefas
import { showSnackbar } from './utils/showSnackbar.js';// Exibe notificações
import { getText } from './services/dialogHandler.js';// Obtém texto de um diálogo
import { getLang } from './utils/helpers.js';// Obtém a linguagem atual
import { currentTheme, tasks } from './services/storageHandle.js';// Obtém tarefas do armazenamento local

/**
 * @function main
 * @description Função principal para inicializar a aplicação. Configura o tema, renderiza a página inicial, carrega tarefas e exibe notificações.
 */
const main = () => {
  try {
    // Seleciona o elemento principal da aplicação no DOM
    const app = document.getElementById('app');
        
    // Obtém o tema atual da aplicação do armazenamento local
    document.documentElement.setAttribute('data-theme', currentTheme);
  
    // Lança um erro se o elemento 'app' não for encontrado no DOM
    if (!app) throw new Error('Elemento com o ID "app" não encontrado.');
      
    // Renderiza a página inicial e o layout de tarefas dentro do elemento 'app'
    renderElement(home, true, app);
    renderTasks(tasks);

    // Exibe uma mensagem de sucesso indicando que a aplicação foi iniciada
    showSnackbar(getText(getLang(), 'notifications.appStarted'));
  } catch (error) {
    // Em caso de erro, exibe a mensagem de erro no console e mostra um alerta de erro ao usuário
    console.error(error);
    showSnackbar(getText(getLang(), 'notifications.startError', error.message));
  }
}

// Aguarda o carregamento completo do DOM para inicializar a aplicação
document.addEventListener('DOMContentLoaded', main);