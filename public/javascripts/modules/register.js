import { $, $$ } from './bling';

export function registerFormCheck(e) {
  /**
   * TODO
   * Check email match and password match
   */
}

export function togglePassword(event, button, input) {
  if(button.classList.contains('show')){
    input.type = 'text';
    button.classList.remove('show');
  } else {
    input.type = 'password';
    button.classList.add('show');
  }
}