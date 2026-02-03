let index = 0;
const content = document.querySelector('.content');

window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' && content.style.display === 'none' || content.style.display === '') {
    content.style.display = 'flex';
    content.style.animation = 'slideIn 1s ease-in';

    index++;
  }
  else if (e.key === 'ArrowLeft' && index === 1) {
    content.style.animation = 'slideOut 1s ease-in';

    content.addEventListener('animationend', () => {
      content.style.display = 'none';
    }, {once: true})

    index--;
  }
})