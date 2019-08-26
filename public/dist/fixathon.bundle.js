/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// based on https://gist.github.com/paulirish/12fb951a8b893a454b32

var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

Node.prototype.on = window.on = function (name, fn) {
  this.addEventListener(name, fn);
};

NodeList.prototype.__proto__ = Array.prototype; // eslint-disable-line

NodeList.prototype.on = NodeList.prototype.addEventListener = function (name, fn) {
  this.forEach(function (elem) {
    elem.on(name, fn);
  });
};

exports.$ = $;
exports.$$ = $$;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forgotFormCheck = forgotFormCheck;
exports.resetFormCheck = resetFormCheck;

var _bling = __webpack_require__(0);

function forgotFormCheck(e) {
  e.preventDefault();
  var error = 0;
  var errorMessage = "";

  // display spin icon
  (0, _bling.$)("#form-forgot .button--primary i").classList.remove("hidden");
  (0, _bling.$)('#form-forgot').submit();
}

function resetFormCheck(e) {
  e.preventDefault();
  var error = 0;
  var errorMessage = "";

  if ((0, _bling.$)("#password").value !== (0, _bling.$)("#password-confirm").value) {
    errorMessage += "Please, check your passwords. They don't match.<br />";
    error++;
  }

  if (error) {
    // add error message to result div
    (0, _bling.$)("#form-reset .form--error").innerHTML = "";
    (0, _bling.$)("#form-reset .form--error").innerHTML = errorMessage;

    // display result div
    (0, _bling.$)("#form-reset .form--error").classList.remove("hidden");

    return false;
  } else {
    (0, _bling.$)("#form-reset .form--error").classList.add("hidden");
    // display spin icon
    (0, _bling.$)("#form-reset .button--primary i").classList.remove("hidden");
    (0, _bling.$)('#form-reset').submit();
  }
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.itemPhotoPreview = itemPhotoPreview;
exports.charCounter = charCounter;
exports.displaySpin = displaySpin;

var _bling = __webpack_require__(0);

function itemPhotoPreview(event) {
  var itemPhotoLabel = (0, _bling.$)("#itemPhoto__label");
  var previewContainer = (0, _bling.$)("#itemPhoto__preview");
  var previewImage = (0, _bling.$)("#itemPhoto__preview img");
  var itemPhoto = (0, _bling.$)("#itemPhoto");

  itemPhotoLabel.innerHTML = '<span aria-label="Framed Picture">🖼️ </span>Select another image... ';

  if (event.target.files[0].size > 1048576) {
    itemPhoto.value = "";
    alert("The selected file is bigger than 1MB. Please, choose another one.");
    return;
  }

  previewImage.src = URL.createObjectURL(event.target.files[0]);
  previewContainer.classList.remove("hidden");
}

function charCounter(maxChars, inputField, charCounter) {
  var valueLength = inputField.value.length;
  var remaining = maxChars - valueLength;
  charCounter.innerHTML = remaining + " chars remaining";
}

function displaySpin(button) {
  var spinIcon = button.querySelector("i");
  spinIcon.classList.remove("hidden");
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginFormCheck = loginFormCheck;

var _bling = __webpack_require__(0);

function loginFormCheck(e) {
  e.preventDefault();
  var error = 0;
  var errorMessage = "";

  // display spin icon
  (0, _bling.$)("#form-login .button--primary i").classList.remove("hidden");
  (0, _bling.$)('#form-login').submit();
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.profileDropdownToggle = profileDropdownToggle;
exports.profileDropdownHide = profileDropdownHide;
exports.categoryDropdownToggle = categoryDropdownToggle;
exports.categoryDropdownHide = categoryDropdownHide;

var _bling = __webpack_require__(0);

function profileDropdownToggle(e) {
  if ((0, _bling.$)('#profile__link').classList.contains('dropdown-visible')) {
    // hide dropdown
    (0, _bling.$)('#profile__link').classList.remove('dropdown-visible');
    (0, _bling.$)('body').classList.remove('profile-dropdown--visible');
  } else {
    // display dropdown
    (0, _bling.$)('#profile__link').classList.add('dropdown-visible');
    (0, _bling.$)('body').classList.add('profile-dropdown--visible');
  }
}

function profileDropdownHide(e) {
  var profileLink = (0, _bling.$)('#profile__link');
  var profileDropdown = (0, _bling.$)('#profile__dropdown');

  if (profileLink.contains(e.target) || profileDropdown.contains(e.target)) {
    return;
  }

  profileLink.classList.remove('dropdown-visible');
  (0, _bling.$)('body').classList.remove('profile-dropdown--visible');
}

function categoryDropdownToggle(e) {
  e.preventDefault();
  if ((0, _bling.$)('#category').classList.contains('dropdown-visible')) {
    // hide dropdown
    (0, _bling.$)('#category').classList.remove('dropdown-visible');
    (0, _bling.$)('body').classList.remove('categories-dropdown--visible');
  } else {
    // display dropdown
    (0, _bling.$)('#category').classList.add('dropdown-visible');
    (0, _bling.$)('body').classList.add('categories-dropdown--visible');
  }
}

function categoryDropdownHide(e) {
  var categoryLink = (0, _bling.$)('#category');
  var categoryDropdown = (0, _bling.$)('#categories-dropdown');

  if (categoryLink.contains(e.target) || categoryDropdown.contains(e.target)) {
    return;
  }

  categoryLink.classList.remove('dropdown-visible');
  (0, _bling.$)('body').classList.remove('categories-dropdown--visible');
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerFormCheck = registerFormCheck;
exports.togglePassword = togglePassword;

var _bling = __webpack_require__(0);

function registerFormCheck(e) {
  e.preventDefault();
  var error = 0;
  var errorMessage = "";
  /**
   * Check email match and password match
   */
  if ((0, _bling.$)("#email").value !== (0, _bling.$)("#email-confirm").value) {
    errorMessage += "Please, check your email addresses. They don't match.<br />";
    error++;
  }

  if ((0, _bling.$)("#password").value !== (0, _bling.$)("#password-confirm").value) {
    errorMessage += "Please, check your passwords. They don't match.<br />";
    error++;
  }

  if (error) {
    // add error message to result div
    (0, _bling.$)("#form-register .form--error").innerHTML = "";
    (0, _bling.$)("#form-register .form--error").innerHTML = errorMessage;

    // display result div
    (0, _bling.$)("#form-register .form--error").classList.remove("hidden");

    return false;
  } else {
    (0, _bling.$)("#form-register .form--error").classList.add("hidden");
    // display spin icon
    (0, _bling.$)("#form-register .button--primary i").classList.remove("hidden");
    (0, _bling.$)('#form-register').submit();
  }
}

function togglePassword(event, button, input) {
  if (button.classList.contains('show')) {
    input.type = 'text';
    button.classList.remove('show');
    button.classList.add('hide');
  } else {
    input.type = 'password';
    button.classList.add('show');
    button.classList.remove('hide');
  }
}

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(6);

var _bling = __webpack_require__(0);

var _register = __webpack_require__(5);

var _login = __webpack_require__(3);

var _forgot = __webpack_require__(1);

var _navigation = __webpack_require__(4);

var _itemEdit = __webpack_require__(2);

/**
 * Registration form
 */
var registerForm = (0, _bling.$)('#form-register');
if (registerForm) {
  registerForm.on('submit', _register.registerFormCheck);
}

var showPassword = (0, _bling.$)('#showpassword');
var showPasswordConfirm = (0, _bling.$)('#showpassword-confirm');

if (showPassword) {
  showPassword.on('click', function (e) {
    return (0, _register.togglePassword)(e, showPassword, (0, _bling.$)('#password'));
  });
}

if (showPasswordConfirm) {
  showPasswordConfirm.on('click', function (e) {
    return (0, _register.togglePassword)(e, showPasswordConfirm, (0, _bling.$)('#password-confirm'));
  });
}
/**
 * END Registration Form
 */

/**
 * Login Form
 */
var loginForm = (0, _bling.$)('#form-login');
if (loginForm) {
  loginForm.on('submit', _login.loginFormCheck);
}
/**
 * END Login Form
 */

/**
 * Forgot Form
 */
var forgotForm = (0, _bling.$)('#form-forgot');
if (forgotForm) {
  forgotForm.on('submit', _forgot.forgotFormCheck);
}
/**
 * END Forgot Form
 */

/**
 * Reset Form
 */
var resetForm = (0, _bling.$)('#form-reset');
if (resetForm) {
  resetForm.on('submit', _forgot.resetFormCheck);
}
/**
 * END Reset Form
 */

/**
 * Profile navigation dropdown
 */
var profileNavigationItem = (0, _bling.$)('#profile__link');
if (profileNavigationItem) {
  profileNavigationItem.on('click', function (e) {
    return (0, _navigation.profileDropdownToggle)(e);
  });
  (0, _bling.$)('body').on('click', function (e) {
    return (0, _navigation.profileDropdownHide)(e);
  });
}
/**
 * END Profile navigation dropdown
 */

/**
 * Category navigation dropdown
 */
var categoryNavigationItem = (0, _bling.$)('#category');
if (categoryNavigationItem) {
  categoryNavigationItem.on('click', function (e) {
    return (0, _navigation.categoryDropdownToggle)(e);
  });
  (0, _bling.$)('body').on('click', function (e) {
    return (0, _navigation.categoryDropdownHide)(e);
  });
}
/**
 * END Category navigation dropdown
 */

/**
 * Item create, edit form
 */
// image preview
var itemPhotoField = (0, _bling.$)("#itemPhoto");
if (itemPhotoField) {
  itemPhotoField.on("change", function (e) {
    return (0, _itemEdit.itemPhotoPreview)(e);
  });
}

// character counter - item name
var itemName = (0, _bling.$)("#itemName");
if (itemName) {
  var itemNameCounter = (0, _bling.$)("#itemNameCounter");
  itemName.on("keyup", function (e) {
    return (0, _itemEdit.charCounter)(100, itemName, itemNameCounter);
  });
}

// character counter - item description
var itemDescription = (0, _bling.$)("#itemDescription");
if (itemDescription) {
  var itemDescriptionCounter = (0, _bling.$)("#itemDescriptionCounter");
  itemDescription.on("keyup", function (e) {
    return (0, _itemEdit.charCounter)(1000, itemDescription, itemDescriptionCounter);
  });
}

// character counter - item location
var itemLocation = (0, _bling.$)("#itemLocation");
if (itemLocation) {
  var itemLocationCounter = (0, _bling.$)("#itemLocationCounter");
  itemLocation.on("keyup", function (e) {
    return (0, _itemEdit.charCounter)(100, itemLocation, itemLocationCounter);
  });
}

// submit button loading animation
var itemSaveBtn = (0, _bling.$)("#saveItem");
var itemEditForm = (0, _bling.$)("#itemEditForm");
if (itemSaveBtn && itemEditForm) {
  itemEditForm.on("submit", function (e) {
    // check item photo field
    if (!itemPhotoField.value) {
      e.preventDefault();
      alert("Please, select an image for your item.");
      return;
    }

    (0, _itemEdit.displaySpin)(itemSaveBtn);
  });
}
/**
 * END Item create, edit form
 */

/**
 * Account update form
 */
var accountBio = (0, _bling.$)("#userBio");
if (accountBio) {
  var accountBioCounter = (0, _bling.$)("#userBioCounter");
  accountBio.on("keyup", function (e) {
    return (0, _itemEdit.charCounter)(100, accountBio, accountBioCounter);
  });
}

var accountContact = (0, _bling.$)("#userContact");
if (accountContact) {
  var accountContactCounter = (0, _bling.$)("#userContactCounter");
  accountContact.on("keyup", function (e) {
    return (0, _itemEdit.charCounter)(100, accountContact, accountContactCounter);
  });
}

var accountForm = (0, _bling.$)("#form-account");
var accountSaveBtn = (0, _bling.$)("#saveAccount");
if (accountForm) {
  accountForm.on("submit", function () {
    return (0, _itemEdit.displaySpin)(accountSaveBtn);
  });
}

/**
 * END Account update form
 */

/***/ })
/******/ ]);
//# sourceMappingURL=fixathon.bundle.js.map