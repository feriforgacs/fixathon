import '../sass/style.scss';

import { $, $$ } from './modules/bling';
import { registerFormCheck, togglePassword } from './modules/register';

/**
 * Registration form
 */
const registerForm = $('#form-register');
if(registerForm){
  registerForm.on('submit', registerFormCheck);
}

const showPassword = $('#showpassword');
const showPasswordConfirm = $('#showpassword-confirm');

if(showPassword){
  showPassword.on('click', (e) => togglePassword(e, showPassword, $('#password')));
}

if(showPasswordConfirm){
  showPasswordConfirm.on('click', (e) => togglePassword(e, showPasswordConfirm, $('#password-confirm')));
}
/**
 * END Registration Form
 */