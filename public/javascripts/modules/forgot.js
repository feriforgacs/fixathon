import { $ } from './bling';

export function forgotFormCheck(e) {
  e.preventDefault();
  let error = 0;
  let errorMessage = "";
  
  // display spin icon
  $("#form-forgot .button--primary i").classList.remove("hidden");
  $('#form-forgot').submit();
}