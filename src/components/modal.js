/**
 * @import { ElementConfig } from '../utils/types.js'
 */
import { closeModal } from '../services/handlers.js'
import { getComponent } from '../utils/helpers.js'
import { createButton } from './button.js'

/**
 * Retorna um objeto que representa um elemento de interface do usuário do tipo "modal".
 *
 * @param {ElementConfig} content - O conteúdo a ser exibido no modal.
 * @param {Function} confirmeHandler - A função a ser executada quando o usuário confirmar a ação.
 * @returns {ElementConfig} - Um objeto que representa o modal.
 */
export const getModal = (content, confirmeHandler) => {
  const confirmeModalButton = createButton('OK', confirmeHandler, '', '', 'Confirmar')

  const closeModalButton = createButton('Cancelar', closeModal, '', '', 'Fechar')
  if(closeModalButton.props) closeModalButton.props.formmethod = 'dialog'

  const form = getComponent('form', confirmeModalButton, closeModalButton)
  if(form.props) form.props.method = 'dialog'

  const closeButton = createButton('X', closeModal, '', 'close', 'Fechar')
  if(content.props) content.props.class = 'modal-content'
  const modal = getComponent('dialog', closeButton, content, form)

  return modal
}