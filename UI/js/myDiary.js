const settings = document.querySelector('.settings');
const dropDown = document.querySelector('.drop-down');
settings.addEventListener('click',()=>{
    dropDown.classList.toggle('hide');
    dropDown.classList.toggle('small-height');
});
