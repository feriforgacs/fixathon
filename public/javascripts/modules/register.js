import { $ } from './bling';

export function registerFormCheck(e) {
  e.preventDefault();
  let error = 0;
  let errorMessage = "";
  /**
   * Check email match and password match
   */
  if($("#email").value !== $("#email-confirm").value){
    errorMessage += "Please, check your email addresses. They don't match.<br />";
    error++;
  }

  if($("#password").value !== $("#password-confirm").value){
    errorMessage += "Please, check your passwords. They don't match.<br />";
    error++;
  }

  if(error){
    // add error message to result div
    $("#form-register .form--error").innerHTML = "";
    $("#form-register .form--error").innerHTML = errorMessage;

    // display result div
    $("#form-register .form--error").classList.remove("hidden");

    return false;
  } else {
    $("#form-register .form--error").classList.add("hidden");
    // display spin icon
    $("#form-register .button--primary i").classList.remove("hidden");
    $('#form-register').submit();
  }
}

export function togglePassword(event, button, input) {
  if(button.classList.contains('show')){
    input.type = 'text';
    button.classList.remove('show');
    button.classList.add('hide');
  } else {
    input.type = 'password';
    button.classList.add('show');
    button.classList.remove('hide');
  }
}