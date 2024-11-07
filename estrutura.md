# Explicação da Estrutura

| pasta/arquivo | conteúdo |
|:---:|:---|
| components/ | Contém componentes reutilizáveis que podem ser usados em várias partes da aplicação. |
| layout/ | Contém componentes relacionados ao layout, como navegação, cabeçalhos, rodapés, etc. |
| pages/ | Contém scripts específicos de páginas, representando as diferentes páginas da aplicação. |
| services/ | Contém serviços para lidar com lógica de negócios, como chamadas de API e autenticação. |
| utils/ | Contém funções utilitárias, constantes e validadores que podem ser usados em toda a aplicação. |
| assets/ | Contém recursos estáticos como imagens, estilos e fontes. |
| index.html | O ponto de entrada principal da aplicação. |
| main.js | O arquivo JavaScript principal que importa e inicializa os módulos necessários. |

```
📦todoApp
 ┣ 📂src
 ┃ ┣ 📂assets
 ┃ ┃ ┣ 📂fonts
 ┃ ┃ ┣ 📂images
 ┃ ┃ ┃ ┣ 📜favicon.ico
 ┃ ┃ ┃ ┣ 📜image.png
 ┃ ┃ ┃ ┗ 📜representacao.png
 ┃ ┃ ┗ 📂styles
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📜button.js
 ┃ ┃ ┣ 📜carousel.js
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
 ┣ 📜todoApp.html
 ┗ 📜vite.config.js
```

## Estrutura da pasta styles

| pasta/arquivo | conteúdo |
|:---:|:---|
| Base | A pasta base/ contém estilos básicos e padrões para o projeto. Aqui você pode encontrar um arquivo _reset.css e possivelmente uma folha de estilo como _base.css, que cuida de estilos para toda a aplicação.|
|Layout| Na pasta layout/ estão os estilos para o layout da aplicação. Isso inclui folhas de estilo padrão como _header.css, _footer.css, _sidebar.css, bem como estilos relacionados ao layout, como grades e contêineres.|
|Components|A pasta components/ é dedicada aos componentes que podem ser reutilizados nas páginas. Exemplos de componentes incluem buttons.css, modals.css, cards.css. É importante notar a diferença entre Components e Layout. Enquanto o Layout trata dos layouts globais da página, a pasta Components lida com componentes menores e reutilizáveis.|
|Pages|A pasta pages/ contém estilos específicos para páginas individuais. Por exemplo, você pode encontrar um arquivo de estilo como _home.css ou _login.css|
|Themes|Para aplicações maiores que requerem suporte a vários temas, a estrutura reserva uma pasta para esses temas. Aqui você pode incluir estilos para diferentes temas utilizados na aplicação.|
|Abstract|A pasta abstract/ lida com todas as ferramentas e utilitários do SASS que podem ser utilizados em todo o projeto. Isso inclui arquivos como _variables.css, _mixins.css, _functions.css, entre outros.|
|Vendors|Na pasta vendors/ estão contidos conteúdos externos, como CSS de bibliotecas ou frameworks externos, por exemplo, Normalize, Bootstrap, JQueryUI, etc. Os arquivos de inclusão desses estilos podem ser nomeados como _normalize.css, _bootstrap.css, etc.|
|main.css|O ficheiro principal (normalmente chamado de main.css) também sendo o único ficheiro que não possui underscore.|

No main.css não deve conter nada além de imports de outros ficheiros — Isto pois, é importante preservarmos a legibilidade no ficheiro principal.

#### Para preservar a legibilidade, o arquivo principal deve respeitar estas diretrizes:

- Um arquivo por @import;
- Um @import por linha;
- Sem nova linha entre dois @imports da mesma pasta;
- Uma nova linha após o último @import de uma pasta;

```
📂styles
┣ 📂base
┃ ┣ 📜_reset.css
┃ ┗ 📜_typography.css
┣ 📂components
┃ ┣ 📜_buttons.css
┃ ┣ 📜_checkbox.css
┃ ┣ 📜_dropdown.css
┃ ┣ 📜_modal.css
┃ ┣ 📜_snackbar.css
┃ ┗ 📜_textarea.css
┣ 📂layout
┃ ┣ 📜layout_container.css
┃ ┣ 📜layout_footer.css
┃ ┣ 📜layout_header.css
┃ ┗ 📜layout_task.css
┣ 📂pages
┃ ┗ 📜pages_home.css
┣ 📂themes
┃ ┣ 📜themes_dark.css
┃ ┗ 📜themes_print.css
┣ 📂utils
┃ ┣ 📜utils_animation.css
┃ ┣ 📜utils_helpers.css
┃ ┗ 📜utils_variables.css
┗ 📜main.css
```