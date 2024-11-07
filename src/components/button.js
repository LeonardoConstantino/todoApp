/**
 * @import { ElementConfig } from '../utils/types.js'
 */
import { getTextComponent, getComponent } from '../utils/helpers'
/**
 * Cria uma representação de um botão com texto, ícone, evento de clique, classe CSS e título.
 *
 * @param {string} text - O texto a ser exibido no botão.
 * @param {Function} [onClick] - A função a ser chamada quando o botão for clicado.
 * @param {string} [iconUrl] - O URL do ícone a ser exibido no botão.
 * @param {string} [className=''] - Classes CSS adicionais a serem aplicadas ao botão.
 * @param {string} [title=''] - O título (tooltip) do botão.
 * @returns {ElementConfig} Uma representação do botão como um objeto.
 *
 * @example
 * const button = createButton('Click Me', () => alert('Button Clicked'), 'icon.png', 'btn-class', 'Tooltip text');
 * console.log(button);
 * // Exemplo de saída:
 * // {
 * //   type: 'button',
 * //   props: {
 * //     title: 'Tooltip text',
 * //     children: [
 * //       { type: 'span', props: { children: ['Click Me'] } },
 * //       { type: 'i', props: { style: 'background-image: url(icon.png)' } }
 * //     ],
 * //     onClick: [Function],
 * //     class: 'btn-class'
 * //   }
 * // }
 */
export const createButton = (
  text,
  onClick,
  iconUrl,
  className = '',
  title = ''
) => {
  // Cria a representação do ícone.
  const icon = {
    type: 'i',
    props: {
      style: `background-image: url("${iconUrl}")`,
    },
  }

  // Cria a representação do botão com um span filho contendo o texto.
  const button = {
    type: 'button',
    props: {
      children: [getComponent('span', getTextComponent(text))],
    },
  }

  // Adiciona o evento onClick se for fornecido.
  if (onClick) button.props['onClick'] = onClick

  // Adiciona o ícone como filho se a URL do ícone for fornecida.
  if (iconUrl) button.props.children.push(icon)

  // Adiciona classes CSS adicionais se fornecidas.
  if (className) button.props['class'] = className

  // Adiciona o título (tooltip) do botão.
  if (title) button.props['title'] = title

  // Retorna a representação do botão.
  return button
}
