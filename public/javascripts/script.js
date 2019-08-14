import '../sass/style.scss';

import { $, $$ } from './modules/bling';
import { registerFormCheck, togglePassword } from './modules/register';
import { loginFormCheck } from './modules/login';
import { forgotFormCheck, resetFormCheck } from './modules/forgot';
import { profileDropdownToggle, profileDropdownHide, categoryDropdownToggle, categoryDropdownHide } from './modules/navigation';

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

/**
 * Login Form
 */
const loginForm = $('#form-login');
if(loginForm){
  loginForm.on('submit', loginFormCheck);
}
/**
 * END Login Form
 */

/**
 * Forgot Form
 */
const forgotForm = $('#form-forgot');
if(forgotForm){
  forgotForm.on('submit', forgotFormCheck);
}
/**
 * END Forgot Form
 */

/**
 * Reset Form
 */
const resetForm = $('#form-reset');
if(resetForm){
  resetForm.on('submit', resetFormCheck);
}
/**
 * END Reset Form
 */

/**
 * Profile navigation dropdown
 */
const profileNavigationItem = $('#profile__link');
if(profileNavigationItem){
  profileNavigationItem.on('click', (e) => profileDropdownToggle(e));
  $('body').on('click', (e) => profileDropdownHide(e));
}
/**
 * END Profile navigation dropdown
 */

/**
 * Category navigation dropdown
 */
const categoryNavigationItem = $('#category');
if(categoryNavigationItem){
  categoryNavigationItem.on('click', (e) => categoryDropdownToggle(e));
  $('body').on('click', (e) => categoryDropdownHide(e));
}
/**
 * END Category navigation dropdown
 */