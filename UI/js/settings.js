/* eslint-disable no-plusplus */

const settings = document.querySelector('.settings');
const dropDown = document.querySelector('.drop-down');
const content = document.querySelector('.content');
let settingsBtnCounter = 0;


const moveContentBackwards = () => {
  content.style.position = 'relative';
  content.style.zIndex = '-1';
};
const moveContentFrontwards = () => {
  content.style.position = 'relative';
  content.style.zIndex = '1';
};

settings.addEventListener('click', () => {
  settingsBtnCounter++;
  dropDown.classList.toggle('hide');
  dropDown.classList.toggle('small-height');
  if (settingsBtnCounter % 2 !== 0) {
    moveContentBackwards();
  } else {
    moveContentFrontwards();
  }
});

