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
const map = document.querySelector('.app');

const sliderImg = document.querySelector('.slider');
const imgCon = document.querySelector('.img-con');
const s3Pic = document.querySelector('.s3Pic');

let state = '';

/* navigator buttons active state */

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
      map.style.display = 'none';
      imgCon.style.display = 'none';
      s3Pic.style.display = 'none';
      break;
    
    case 's2':
      s2.style.display = 'grid';
      imgCon.style.display = 'flex';

      s1.style.display = 'none';
      s3.style.display = 'none';
      s4.style.display = 'none';
      map.style.display = 'none';
      s3Pic.style.display = 'none';
      break;

    case 's3':
      s3.style.display = 'grid';

      s1.style.display = 'none';
      s2.style.display = 'none';
      s4.style.display = 'none';
      map.style.display = 'none';
      imgCon.style.display = 'none';
      s3Pic.style.display = 'flex';
      break;

    case 's4':
      s4.style.display = 'flex';
      s4.style.pointerEvents = 'all';
      map.style.display = 'flex'; 

      s1.style.display = 'none';
      s2.style.display = 'none';
      s3.style.display = 'none';
      imgCon.style.display = 'none';
      s3Pic.style.display = 'none';
      break;
  }
}

function addFocus(slide) {
  if (slide === 2) {
    nd2.classList.remove('active-nd');
    nd3.classList.remove('active-nd');

    nd1.classList.add('active-nd');
 
    indexS2 = 0;
    switchContentS2();
  }
  else if (slide === 3) {
    usa.classList.remove('active-nd');

    france.classList.add('active-des');

    picF.classList.add('focus');
    picF.classList.remove('blur');

    picU.classList.add('blur');
    picU.classList.remove('focus');
    
    indexS3 = 0;
    switchContentS3();
  }
}

function resetFocus(slide) {
  if (slide === 1) {
    date2.style.opacity = '0';
    sliderImg.style.transform = 'translateX(0)';

    nd2.classList.add('not-active-nd');
    nd3.classList.add('not-active-nd');
  } 
  else if (slide === 2) {
     date2.style.opacity = '0';
  }
  else if (slide === 3) {
    sliderImg.style.transform = 'translateX(0)';

    nd2.classList.add('not-active-nd');
    nd3.classList.add('not-active-nd');
  }
  else if (slide === 4) {
    date2.style.opacity = '0';
    sliderImg.style.transform = 'translateX(0)';

    nd2.classList.add('not-active-nd');
    nd3.classList.add('not-active-nd');
  }
}

btnStart.addEventListener('click', () => {
  state = 's1';
  indexS = 0;
  switchSlide();
  resetFocus(1);
})

btn2.addEventListener('click', () => {
  state = 's2';
  indexS = 1;
  switchSlide();
  addFocus(2);
  resetFocus(2);
})

btn3.addEventListener('click', () => {
  state = 's3';
  indexS = 2;
  switchSlide();
  addFocus(3);
  resetFocus(3);
})

btn4.addEventListener('click', () => {
  state = 's4';
  indexS = 3;
  switchSlide();
  resetFocus(4);
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
    sliderImg.style.transform = 'translateX(-600px)';
  }
  else {
    sliderImg.style.transform = 'translateX(-1200px)';
  }
}

function switchContentS2() {
  switch(indexS2) {
    case 0: 
    nd1.classList.add('active-nd');
    nd1.classList.remove('not-active-nd');
    
    nd2.classList.remove('active-nd');
    nd2.classList.add('not-active-nd');

    nd3.classList.remove('active-nd');
    nd3.classList.add('not-active-nd');

    moveImg(0);
    break;

  case 1: 
    nd2.classList.add('active-nd');
    nd2.classList.remove('not-active-nd');

    nd1.classList.remove('active-nd');
    nd1.classList.add('not-active-nd');

    nd3.classList.remove('active-nd');
    nd3.classList.add('not-active-nd');

    moveImg(1);
    break;

  case 2: 
    nd3.classList.add('active-nd');
    nd3.classList.remove('not-active-nd');

    nd2.classList.remove('active-nd');
    nd2.classList.add('not-active-nd');

    nd1.classList.remove('active-nd');
    nd1.classList.add('not-active-nd');

    moveImg(2);
    break;
  }
}

function switchContentS3() {
  switch(indexS3) {
    case 0:
      france.classList.add('active-des');
      france.classList.remove('not-active-nd');

      usa.classList.remove('active-des2');
      usa.classList.add('not-active-nd');

      date1.style.opacity = '1';
      date2.style.opacity = '0';

      picF.classList.add('focus');
      picF.classList.remove('blur');

      picU.classList.add('blur');
      picU.classList.remove('focus');
      break;
    case 1:
      usa.classList.add('active-des2');
      usa.classList.remove('not-active-nd');

      france.classList.remove('active-des');
      france.classList.add('not-active-nd');

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

  if (e.key === 'ArrowDown' && indexS < 3) {
    indexS++;
    changeSlide();
  }
  else if (e.key === 'ArrowUp' && indexS > 0) {
    indexS--;
    changeSlide();
  }
})

let indexS = 0;

function changeSlide() {
  switch(indexS) {
    case 1:
      state = 's2';
      switchSlide();
      addFocus(2);
      resetFocus(2);

      btn2.classList.add('active');
      
      btnStart.classList.remove('active');
      btn3.classList.remove('active');
      btn4.classList.remove('active');
      break;

    case 2:
      state = 's3';
      switchSlide();
      addFocus(3);
      resetFocus(3);

      btn3.classList.add('active');
      
      btnStart.classList.remove('active');
      btn2.classList.remove('active');
      btn4.classList.remove('active');
      break;

    case 3:
      state = 's4';
      switchSlide();
      resetFocus(4);

      btn4.classList.add('active');
      
      btnStart.classList.remove('active');
      btn3.classList.remove('active');
      btn2.classList.remove('active');
      break;

    case 0:
      state = 's1';
      switchSlide();
      resetFocus(1);

      btnStart.classList.add('active');
      
      btn2.classList.remove('active');
      btn3.classList.remove('active');
      btn4.classList.remove('active');
      break;
  }
}

/* default start */

btnStart.classList.add('active');
nd1.classList.add('active-nd');
france.classList.add('active-des');