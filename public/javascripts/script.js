import '../sass/style.scss';

import { $, $$ } from './modules/bling';
import { registerFormCheck, togglePassword } from './modules/register';
import { loginFormCheck } from './modules/login';
import { forgotFormCheck, resetFormCheck } from './modules/forgot';
import { profileDropdownToggle, profileDropdownHide, categoryDropdownToggle, categoryDropdownHide } from './modules/navigation';
import { itemPhotoPreview, charCounter, displaySpin } from './modules/itemEdit';
import { displayRequestForm } from './modules/itemDetails';

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

/**
 * Item create, edit form
 */
// image preview
const itemPhotoField = $("#itemPhoto");
if(itemPhotoField){
  itemPhotoField.on("change", (e) => itemPhotoPreview(e));
}

// character counter - item name
const itemName = $("#itemName");
if(itemName){
  const itemNameCounter = $("#itemNameCounter");
  itemName.on("keyup", () => charCounter(100, itemName, itemNameCounter));
}

// character counter - item description
const itemDescription = $("#itemDescription");
if(itemDescription){
  const itemDescriptionCounter = $("#itemDescriptionCounter");
  itemDescription.on("keyup", (e) => charCounter(1000, itemDescription, itemDescriptionCounter));
}

// character counter - item location
const itemLocation = $("#itemLocation");
if(itemLocation){
  const itemLocationCounter = $("#itemLocationCounter");
  itemLocation.on("keyup", () => charCounter(100, itemLocation, itemLocationCounter));
}

// submit button loading animation
const itemSaveBtn = $("#saveItem");
const itemEditForm = $("#itemEditForm");
if(itemSaveBtn && itemEditForm){
  itemEditForm.on("submit", (e) => {
    // check item photo field
    if(!itemPhotoField.value){
      e.preventDefault();
      alert("Please, select an image for your item.");
      return;
    }

    displaySpin(itemSaveBtn)
  });
}
/**
 * END Item create, edit form
 */

/**
 * Account update form
 */
const accountBio = $("#userBio");
if(accountBio){
  const accountBioCounter = $("#userBioCounter");
  accountBio.on("keyup", () => charCounter(100, accountBio, accountBioCounter));
}

const accountContact = $("#userContact");
if(accountContact){
  const accountContactCounter = $("#userContactCounter");
  accountContact.on("keyup", () => charCounter(100, accountContact, accountContactCounter));
}

const accountForm = $("#form-account");
const accountSaveBtn = $("#saveAccount");
if(accountForm){
  accountForm.on("submit", () => displaySpin(accountSaveBtn));
}

/**
 * END Account update form
 */

/**
 * Item request form
 */
const itemRequestButton = $("#item-request-button");
if(itemRequestButton){
  const itemRequestForm = $("#itemRequestForm");
  itemRequestButton.on("click", () => displayRequestForm(itemRequestForm));
}

const itemRequestMessage = $("#itemRequestMessage");
if(itemRequestMessage){
  const itemRequestMessageCounter = $("#itemRequestMessageCounter");
  itemRequestMessage.on("keyup", () => charCounter(500, itemRequestMessage, itemRequestMessageCounter));
}

/**
 * END Item request form
 */