const forgotPswdBtn = document.querySelector('.forgot-pswd');
const resetPswdModal = document.querySelector('.modal');
const getLinkBtn = document.querySelector('.btn-ok');
const getLinkNotif = document.querySelector('small');
const cancelBtn = document.querySelector('.btn-cancel');
forgotPswdBtn.addEventListener('click', () => {
  resetPswdModal.classList.toggle('hide');
});
getLinkBtn.addEventListener('click', () => {
  resetPswdModal.classList.toggle('hide');
  getLinkNotif.classList.toggle('hide');
});
cancelBtn.addEventListener('click', () => {
  resetPswdModal.classList.toggle('hide');
  getLinkNotif.classList.add('hide');
});
