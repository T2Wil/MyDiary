const settings = document.querySelector('.settings');
const dropDown = document.querySelector('.drop-down');
const header = document.querySelector('header');
const headerNav = document.querySelector('header .nav');
let settingsBtnCounter = 0;

settings.addEventListener('click',()=>{
    settingsBtnCounter ++;
    dropDown.classList.toggle('hide');
    dropDown.classList.toggle('small-height');
    if(settingsBtnCounter % 2 !== 0 ){
        changeHeaderHeight();
        console.log('inside');
    }
    else{
        header.style = '';
        headerNav.style = '';
    }
});

const changeHeaderHeight = () =>{
    header.style.height = '21%';
    headerNav.style.position = ' relative';
    headerNav.style.bottom = ' 2rem';
}
