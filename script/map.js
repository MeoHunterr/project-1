const db = document.querySelector('.path.db');
const qt = document.querySelector('.path.qt');

const slide = document.querySelector('.section-4');

const b1 = document.querySelector('.btn.btn1');
const b2 = document.querySelector('.btn.btn2');
const b3 = document.querySelector('.btn.btn3');

b1.addEventListener('click', () => {
  close();
  index = 0;
})

b2.addEventListener('click', () => {
  close();
  index = 0;
})

b3.addEventListener('click', () => {
  close();
  index = 0;
})

// Zoom + Hien nd

const svg = document.getElementById('map');
const info = document.getElementById('info');
const infoTitle = document.getElementById('info-title');
const resetBtn = document.getElementById('reset');

const originalViewBox = svg.getAttribute('viewBox');
const path = document.querySelectorAll('.path');

path.forEach(path => {
  path.addEventListener('click', (e) => {
    console.log(path);
    e.target.classList.add('active');

    const box = path.getBBox();
    const zoom = 1.8;

    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;

    const currentViewBox = svg
      .getAttribute('viewBox')
      .split(' ')
      .map(Number);

    const targetViewBox = [
      cx - (box.width * zoom) / 2,
      cy - (box.height * zoom) / 2,
      box.width * zoom,
      box.height * zoom
    ];

    animateViewBox(svg, currentViewBox, targetViewBox, 600);

    info.classList.add('show');
    resetBtn.classList.add('show');
    infoTitle.textContent = path.getAttribute('name');
  });
});


// Nút reset
resetBtn.addEventListener('click', close)

function close() {
  document.querySelectorAll('.path')
    .forEach(p => p.classList.remove('active'));

  const current = svg
    .getAttribute('viewBox')
    .split(' ')
    .map(Number);

  const original = originalViewBox
    .split(' ')
    .map(Number);

  animateViewBox(svg, current, original, 500);

  info.classList.remove('show');
}

function animateViewBox(svg, from, to, duration = 500) {
  const start = performance.now();

  function frame(now) {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);

    const current = from.map((v, i) =>
      v + (to[i] - v) * ease
    );

    svg.setAttribute('viewBox', current.join(' '));

    if (progress < 1) {
      requestAnimationFrame(frame);
    }
  }

  requestAnimationFrame(frame);
}

let index = 0;

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    close();
  }

  if (e.key === 'ArrowRight' && slide.style.display === 'flex' && index < 2) {
    index++;
    tFocus();
  }
  else if (e.key === 'ArrowLeft' && slide.style.display === 'flex' && index > 0) {
    index--
    tFocus();
  }
})

function tFocus() {
  switch(index) {
    case 1:
      db.classList.add('active');

      const box = db.getBBox();
      const zoom = 1.8;

      const cx = box.x + box.width / 2;
      const cy = box.y + box.height / 2;

      const currentViewBox = svg
        .getAttribute('viewBox')
        .split(' ')
        .map(Number);

      const targetViewBox = [
        cx - (box.width * zoom) / 2,
        cy - (box.height * zoom) / 2,
        box.width * zoom,
        box.height * zoom
      ];

      animateViewBox(svg, currentViewBox, targetViewBox, 600);

      info.classList.add('show');
      resetBtn.classList.add('show');
      infoTitle.textContent = db.getAttribute('name');
      break;

    case 2:
      qt.classList.add('active');

      const box1 = qt.getBBox();
      const zoom1 = 1.8;

      const cx1 = box1.x + box1.width / 2;
      const cy1 = box1.y + box1.height / 2;

      const currentViewBox1 = svg
        .getAttribute('viewBox')
        .split(' ')
        .map(Number);

      const targetViewBox1 = [
        cx1 - (box1.width * zoom1) / 2,
        cy1 - (box1.height * zoom1) / 2,
        box1.width * zoom1,
        box1.height * zoom1
      ];

      animateViewBox(svg, currentViewBox1, targetViewBox1, 600);

      info.classList.add('show');
      resetBtn.classList.add('show');
      infoTitle.textContent = qt.getAttribute('name');
  }
}