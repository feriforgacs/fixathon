import { $ } from './bling';

export function forgotFormCheck(e) {
  e.preventDefault();
  let error = 0;
  let errorMessage = "";
  
  // display spin icon
  $("#form-forgot .button--primary i").classList.remove("hidden");
  $('#form-forgot').submit();
}

export function resetFormCheck(e) {
  e.preventDefault();
  let error = 0;
  let errorMessage = "";

  if($("#password").value !== $("#password-confirm").value){
    errorMessage += "Please, check your passwords. They don't match.<br />";
    error++;
  }

  if(error){
    // add error message to result div
    $("#form-reset .form--error").innerHTML = "";
    $("#form-reset .form--error").innerHTML = errorMessage;

    // display result div
    $("#form-reset .form--error").classList.remove("hidden");

    return false;
  } else {
    $("#form-reset .form--error").classList.add("hidden");
    // display spin icon
    $("#form-reset .button--primary i").classList.remove("hidden");
    $('#form-reset').submit();
  }
}