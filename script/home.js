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

/* navigator buttons active state */

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
      s2.style.display = 'none';
      s3.style.display = 'none';
      imgCon.style.display = 'none';
      s3Pic.style.display = 'none';
      break;
  }
}

function addfocus(slide) {
  if (slide === 2) {
    nd2.classList.remove('active-nd');
    nd3.classList.remove('active-nd');

    nd1.style.animation = 'highlight 0.3s';
    nd1.classList.add('active-nd');

    nd1.addEventListener('animationend', () => {
      indexS2 = 0;
      switchContentS2();
    }, {once: true})
  }
  else if (slide === 3) {
    usa.classList.remove('active-nd');

    france.style.animation = 'highlight 0.3s';
    france.classList.add('active-nd');

    picF.classList.add('focus');
    picF.classList.remove('blur');

    picU.classList.add('blur');
    picU.classList.remove('focus');

    france.addEventListener('animationend', () => {
      indexS3 = 0;
      switchContentS3();
    }, {once: true})
  }
}

function resetImg(slide) {
  if (slide === 1) {
    date2.style.opacity = '0';
    sliderImg.style.transform = 'translateX(0)';
  } 
  else if (slide === 2) {
     date2.style.opacity = '0';
  }
  else {
    sliderImg.style.transform = 'translateX(0)';
  }
}

btnStart.addEventListener('click', () => {
  state = 's1';
  switchSlide();
  resetImg(1);
})

btn2.addEventListener('click', () => {
  state = 's2';
  switchSlide();
  addfocus(2);
  resetImg(2);
})

btn3.addEventListener('click', () => {
  state = 's3';
  switchSlide();
  addfocus(3);
  resetImg(3);
})

btn4.addEventListener('click', () => {
  state = 's4';
  switchSlide();
  resetImg(1);
})

/* highlight for silde 2 */

const nd1 = document.querySelector('.nd.nd-1');
const nd2 = document.querySelector('.nd.nd-2');
const nd3 = document.querySelector('.nd.nd-3'); 

let indexS2 = 0;

function moveImg(index) {
  if (index === 0) {
    sliderImg.style.transform = 'translateX(0)';
  }
  else if (index === 1) {
    sliderImg.style.transform = 'translateX(-400px)';
  }
  else {
    sliderImg.style.transform = 'translateX(-800px)';
  }
}

function switchContentS2() {
  switch(indexS2) {
    case 0: 
    nd1.classList.add('active-nd');

    nd2.classList.remove('active-nd');
    nd3.classList.remove('active-nd');

    moveImg(0);
    break;

  case 1: 
    nd2.classList.add('active-nd');

    nd1.classList.remove('active-nd');
    nd3.classList.remove('active-nd');

    moveImg(1);
    break;

  case 2: 
    nd3.classList.add('active-nd');

    nd1.classList.remove('active-nd');
    nd2.classList.remove('active-nd');

    moveImg(2);
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

      picF.classList.add('focus');
      picF.classList.remove('blur');

      picU.classList.add('blur');
      picU.classList.remove('focus');
      break;
    case 1:
      usa.classList.add('active-nd');

      france.classList.remove('active-nd');

      date1.style.opacity = '0';
      date2.style.opacity = '1';

      picU.classList.add('focus');
      picU.classList.remove('blur');

      picF.classList.add('blur');
      picF.classList.remove('focus');
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