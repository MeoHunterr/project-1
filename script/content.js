let index = 0;
const vp = document.querySelector('.view-point');

window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' && index < 6) {
    index++;

    vp.style.transform = `translateX(-${index*100}vw)`;
  }
  else if (e.key === 'ArrowLeft' && index > 0) {
    index--;

    vp.style.transform = `translateX(-${index*100}vw)`;
  }
})