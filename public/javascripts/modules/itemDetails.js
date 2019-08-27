import { $ } from './bling';

export function displayRequestForm(itemRequestForm){
  itemRequestForm.classList.remove("hidden");
  itemRequestForm.scrollIntoView();
}