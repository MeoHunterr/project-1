const btn = document.querySelectorAll('.btn');
const btnStart = document.querySelector('.btn.btn1');
const btn2 = document.querySelector('.btn.btn2');
const btn3 = document.querySelector('.btn.btn3');
const btn4 = document.querySelector('.btn.btn4');

/* Slides */

const s1 = document.querySelector('.section.section-1');
const s2 = document.querySelector('.section.section-2');
const s3 = document.querySelector('.section.section-3');
const s4 = document.querySelector('.section.section-4');

const sliderImg = document.querySelector('.slider');
const imgCon = document.querySelector('.img-con');
const s3Pic = document.querySelector('.s3Pic');

let state = '';

btnStart.classList.add('active');

btn.forEach(button => {
  button.onclick = (e) => {
    btn.forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
  }
});

function switchSlide() {
  switch(state) {
    case 's1':
      s1.style.display = 'grid';

      s2.style.display = 'none';
      s3.style.display = 'none';
      s4.style.display = 'none';
      imgCon.style.display = 'none';
      s3Pic.style.display = 'none';
      break;
    
    case 's2':
      s2.style.display = 'grid';
      imgCon.style.display = 'flex';

      s1.style.display = 'none';
      s3.style.display = 'none';
      s4.style.display = 'none';
      s3Pic.style.display = 'none';
      break;

    case 's3':
      s3.style.display = 'grid';

      s1.style.display = 'none';
      s2.style.display = 'none';
      s4.style.display = 'none';
      imgCon.style.display = 'none';
      s3Pic.style.display = 'flex';
      break;

    case 's4':
      s4.style.display = 'grid';

      s1.style.display = 'none';
      s3.style.display = 'none';
      s3.style.display = 'none';
      imgCon.style.display = 'none';
      s3Pic.style.display = 'none';
      break;
  }
}

btnStart.addEventListener('click', () => {
  state = 's1';
  switchSlide();
})

btn2.addEventListener('click', () => {
  state = 's2';
  switchSlide();

  nd2.classList.remove('active-nd');
  nd3.classList.remove('active-nd');

  nd1.style.animation = 'highlight 0.3s';
  nd1.classList.add('active-nd');

  nd1.addEventListener('animationend', () => {
    indexS2 = 0;
    switchContentS2();
  }, {once: true})
})

btn3.addEventListener('click', () => {
  state = 's3';
  switchSlide();

  usa.classList.remove('active-nd');

  france.style.animation = 'highlight 0.3s';
  france.classList.add('active-nd');

  france.addEventListener('animationend', () => {
    indexS3 = 0;
    switchContentS3();
  }, {once: true})
})

btn4.addEventListener('click', () => {
  state = 's4';
  switchSlide();
})

/* highlight for silde 2 */

const nd1 = document.querySelector('.nd.nd-1');
const nd2 = document.querySelector('.nd.nd-2');
const nd3 = document.querySelector('.nd.nd-3'); 

let indexS2 = 0;

function switchContentS2() {
  switch(indexS2) {
    case 0: 
    nd1.classList.add('active-nd');

    nd2.classList.remove('active-nd');
    nd3.classList.remove('active-nd');

    sliderImg.style.transform = 'translateX(0)'
    break;

  case 1: 
    nd2.classList.add('active-nd');

    nd1.classList.remove('active-nd');
    nd3.classList.remove('active-nd');

    sliderImg.style.transform = 'translateX(-400px)'
    break;

  case 2: 
    nd3.classList.add('active-nd');

    nd1.classList.remove('active-nd');
    nd2.classList.remove('active-nd');

    sliderImg.style.transform = 'translateX(-800px)'
    break;
  }
}

function switchContentS3() {
  switch(indexS3) {
    case 0:
      france.classList.add('active-nd');

      usa.classList.remove('active-nd');

      date1.style.opacity = '1';
      date2.style.opacity = '0';

      picF.style.filter ='brightness(100%)';
      picF.style.scale = '1.1';
      picF.style.zIndex = '6000';

      picU.style.filter = 'brightness(50%)';
      picU.style.scale = '0.9';
      picU.style.zIndex = '5000';
      break;
    case 1:
      usa.classList.add('active-nd');

      france.classList.remove('active-nd');

      date1.style.opacity = '0';
      date2.style.opacity = '1';

      picU.style.filter ='brightness(100%)';
      picU.style.scale = '1.1';
      picU.style.zIndex = '6000';

      picF.style.filter = 'brightness(50%)';
      picF.style.scale = '0.9';
      picF.style.zIndex = '5000';
      break;
  }
}

/* highlight for slide 3 */

const france = document.querySelector('.text.france');
const usa = document.querySelector('.text.usa');

const date1 = document.querySelector('.date.date-1');
const date2 = document.querySelector('.date.date-2');

const picF = document.querySelector('.pic.france');
const picU = document.querySelector('.pic.usa');

let indexS3 = 0;

window.addEventListener('keydown', function(e) {

  /* silde 2 */

  if (state === 's2' && e.key === 'ArrowRight' && indexS2 < 2) {
    indexS2++;
    switchContentS2();
  }
  else if (state === 's2' && e.key === 'ArrowLeft' && indexS2 > 0) {
    indexS2--;
    switchContentS2();
  }

  /* slide 3 */
  if (state === 's3' && e.key === 'ArrowRight' && indexS3 < 1) {
    indexS3++;
    switchContentS3();
  }
  else if (state === 's3' && e.key === 'ArrowLeft' && indexS3 >0) {
    indexS3--;
    switchContentS3();
  }
})