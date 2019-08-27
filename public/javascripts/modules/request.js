import { $ } from './bling';

export function displayAcceptRequestForm(acceptRequestForm){
  acceptRequestForm.classList.remove("hidden");
  acceptRequestForm.scrollIntoView();
}