# Estrutura do Projeto
A estrutura de arquivos do projeto é organizada em pastas para facilitar a manutenção e a expansão. Abaixo está uma descrição das principais seções:

## 📂 src
Contém todos os arquivos-fonte da aplicação.

- **📂assets:** Armazena os recursos visuais e arquivos de estilo.

    - **images**: Imagens e ícones, como favicon.ico, image.png, e representacao.png.
    - **styles**: Arquivos CSS organizados em subpastas:
        - **base**: Inclui estilos globais como _reset.css e _typography.css.
        - **components**: Estilização específica para componentes reutilizáveis, como botões (_buttons.css), dropdowns (_dropdown.css), modais (_modal.css), snackbar (_snackbar.css) e textarea (_textarea.css).
        - **layout**: Estilos de layout para o cabeçalho, rodapé, contêiner principal e lista de tarefas.
        - **pages**: Estilos específicos para páginas, incluindo pages_home.css para a página inicial.
        - **themes**: Inclui temas, como themes_dark.css para o modo escuro e themes_print.css para impressão.
        - **utils**: Utilitários CSS, como variáveis e helpers para serem usados em todo o projeto.
    - **main.css**: Importa todos os estilos principais.
- **📂components**: Componentes da interface de usuário, como botões, inputs de rádio, modais e snackbar, todos escritos em JavaScript.

- **📂layout**: Gerencia o layout global da aplicação com componentes como o cabeçalho (header.js), rodapé (footer.js) e a área de tarefas (tasks.js).

- **📂pages**: Contém páginas da aplicação. O home.js representa a página principal.

- **📂services**: Contém lógica de serviços para lidar com eventos de diálogo (dialogHandler.js), manipuladores gerais (handlers.js) e manipulação de armazenamento local (storageHandle.js).

- **📂utils**: Utilitários auxiliares que suportam a lógica principal do aplicativo.

    - **constants.js**: Define constantes globais.
    - **helpers.js**: Funções auxiliares gerais.
    - **renderElement.js**: Função para renderização de elementos dinâmicos.
    - **showSnackbar.js**: Função para exibir mensagens do tipo snackbar.
    - **storageUtil.js**: Funções de utilitários para armazenamento.
    - **types.js**: Tipos e interfaces utilizados no código.
    - **main.js**: Ponto de entrada principal da aplicação que inicializa e carrega todos os módulos.

## Arquivos Principais na Raiz
- **index.html**: Página HTML principal que carrega a aplicação.
- **LICENSE.txt**: Arquivo de licença do projeto.
- **package.json** e **package-lock.json**: Gerenciamento de dependências.
- **README.md**: Descrição do projeto.
- **vite.config.js**: Configuração do Vite para desenvolvimento local.

```
📦todoApp
 ┣ 📂src
 ┃ ┣ 📂assets
 ┃ ┃ ┣ 📂images
 ┃ ┃ ┃ ┣ 📜favicon.ico
 ┃ ┃ ┃ ┣ 📜image.png
 ┃ ┃ ┃ ┗ 📜representacao.png
 ┃ ┃ ┗ 📂styles
 ┃ ┃ ┃ ┣ 📂base
 ┃ ┃ ┃ ┃ ┣ 📜_reset.css
 ┃ ┃ ┃ ┃ ┗ 📜_typography.css
 ┃ ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┃ ┣ 📜_buttons.css
 ┃ ┃ ┃ ┃ ┣ 📜_dropdown.css
 ┃ ┃ ┃ ┃ ┣ 📜_modal.css
 ┃ ┃ ┃ ┃ ┣ 📜_snackbar.css
 ┃ ┃ ┃ ┃ ┗ 📜_textarea.css
 ┃ ┃ ┃ ┣ 📂layout
 ┃ ┃ ┃ ┃ ┣ 📜layout_container.css
 ┃ ┃ ┃ ┃ ┣ 📜layout_footer.css
 ┃ ┃ ┃ ┃ ┣ 📜layout_header.css
 ┃ ┃ ┃ ┃ ┗ 📜layout_task.css
 ┃ ┃ ┃ ┣ 📂pages
 ┃ ┃ ┃ ┃ ┗ 📜pages_home.css
 ┃ ┃ ┃ ┣ 📂themes
 ┃ ┃ ┃ ┃ ┣ 📜themes_dark.css
 ┃ ┃ ┃ ┃ ┗ 📜themes_print.css
 ┃ ┃ ┃ ┣ 📂utils
 ┃ ┃ ┃ ┃ ┣ 📜utils_helpers.css
 ┃ ┃ ┃ ┃ ┗ 📜utils_variables.css
 ┃ ┃ ┃ ┗ 📜main.css
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📜button.js
 ┃ ┃ ┣ 📜inputRadio.js
 ┃ ┃ ┣ 📜modal.js
 ┃ ┃ ┗ 📜snackbar.js
 ┃ ┣ 📂layout
 ┃ ┃ ┣ 📜footer.js
 ┃ ┃ ┣ 📜header.js
 ┃ ┃ ┗ 📜tasks.js
 ┃ ┣ 📂pages
 ┃ ┃ ┗ 📜home.js
 ┃ ┣ 📂services
 ┃ ┃ ┣ 📜dialogHandler.js
 ┃ ┃ ┣ 📜handlers.js
 ┃ ┃ ┗ 📜storageHandle.js
 ┃ ┣ 📂utils
 ┃ ┃ ┣ 📜constants.js
 ┃ ┃ ┣ 📜helpers.js
 ┃ ┃ ┣ 📜renderElement.js
 ┃ ┃ ┣ 📜showSnackbar.js
 ┃ ┃ ┣ 📜storageUtil.js
 ┃ ┃ ┗ 📜types.js
 ┃ ┗ 📜main.js
 ┣ 📜.gitignore
 ┣ 📜estrutura.md
 ┣ 📜index.html
 ┣ 📜LICENSE.txt
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┣ 📜README.md
 ┗ 📜vite.config.js
```