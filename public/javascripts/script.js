import { $, $$ } from './modules/bling';
import { registerFormCheck, togglePassword } from './modules/register';

const registerForm = $('#form-register');
if(registerForm){
  registerForm.on('submit', registerFormCheck);
}

const showPassword = $('#showpassword');
const showPasswordConfirm = $('#showpassword-confirm');

showPassword.on('click', (e) => togglePassword(e, showPassword, $('#password')));
showPasswordConfirm.on('click', (e) => togglePassword(e, showPasswordConfirm, $('#password-confirm')));