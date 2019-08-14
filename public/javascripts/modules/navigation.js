import { $ } from './bling';

export function profileDropdownToggle(e) {
  if($('#profile__link').classList.contains('dropdown-visible')){
    // hide dropdown
    $('#profile__link').classList.remove('dropdown-visible');
    $('body').classList.remove('profile-dropdown--visible');
  } else {
    // display dropdown
    $('#profile__link').classList.add('dropdown-visible');
    $('body').classList.add('profile-dropdown--visible');
  }
}

export function profileDropdownHide(e) {
  const profileLink = $('#profile__link');
  const profileDropdown = $('#profile__dropdown');

  if(profileLink.contains(e.target) || profileDropdown.contains(e.target)){
    return;
  }

  profileLink.classList.remove('dropdown-visible');
  $('body').classList.remove('profile-dropdown--visible');
}

export function categoryDropdownToggle(e) {
  e.preventDefault();
  if($('#category').classList.contains('dropdown-visible')){
    // hide dropdown
    $('#category').classList.remove('dropdown-visible');
    $('body').classList.remove('categories-dropdown--visible');
  } else {
    // display dropdown
    $('#category').classList.add('dropdown-visible');
    $('body').classList.add('categories-dropdown--visible');
  }
}

export function categoryDropdownHide(e) {
  const categoryLink = $('#category');
  const categoryDropdown = $('#categories-dropdown');

  if(categoryLink.contains(e.target) || categoryDropdown.contains(e.target)){
    return;
  }

  categoryLink.classList.remove('dropdown-visible');
  $('body').classList.remove('categories-dropdown--visible');
}