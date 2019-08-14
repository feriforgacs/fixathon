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

export function hideProfileDropdown(e){
  const profileLink = $('#profile__link');
  const profileDropdown = $('#profile__dropdown');

  if(profileLink.contains(e.target) || profileDropdown.contains(e.targe)){
    return;
  }

  profileLink.classList.remove('dropdown-visible');
  $('body').classList.remove('profile-dropdown--visible');
}