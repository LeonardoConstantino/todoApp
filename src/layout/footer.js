import { createButton } from "../components/button";
import { getText } from "../services/dialogHandler";
import { deleteAllTasks } from "../services/handlers";
import { getComponent, getLang } from "../utils/helpers";

const btnRemoveAll = createButton(
  getText(getLang(), 'actions.deleteTasks'),
  deleteAllTasks,
  '',
  'btn-remove-all',
)

export const footer = getComponent(
  'footer',
  btnRemoveAll
);