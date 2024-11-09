import { createButton } from "../components/button";
import { getText } from "../services/dialogHandler";
import { deleteAllTasks } from "../services/handlers";
import { getComponent, getLang, getTextComponent } from "../utils/helpers";
import { showModal } from './../services/handlers';

const modalContent = getComponent('div',
  getComponent(
    'h3',
    getTextComponent(getText(getLang(), 'app.modalDeleteTasks.title'))
  ),
)

const showModalButton = createButton(
  getText(getLang(), 'actions.deleteTasks'),
  ()=>{showModal(modalContent, 'remove-all-modal', deleteAllTasks)},
  '',
  'btn-remove-all',
);

export const footer = getComponent(
  'footer',
  showModalButton
);