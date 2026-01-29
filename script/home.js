const start = document.querySelector('.title');
window.addEventListener('scroll', () => {
  start.style.opacity = Math.max(0, 1 - window.scrollY / 500);
});
