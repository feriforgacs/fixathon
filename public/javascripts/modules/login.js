import { $ } from './bling';

export function loginFormCheck(e) {
  e.preventDefault();
  let error = 0;
  let errorMessage = "";
  
  // display spin icon
  $("#form-login .button--primary i").classList.remove("hidden");
  $('#form-login').submit();
}