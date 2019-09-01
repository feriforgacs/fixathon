export function toggleMobileNavigation(){
  const body = document.querySelector('body');
  if(body.classList.contains('mobile-navigation-visible')){
    // hide mobile nav
    body.classList.remove('mobile-navigation-visible');
  } else {
    // display mobile nav
    body.classList.add('mobile-navigation-visible');
  }
}