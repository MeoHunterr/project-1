document.addEventListener('DOMContentLoaded', function () {
  let index = 0;
  let indexs = -1;
  let key = true;
  const content = document.querySelector('.content');
  const viewPoint = document.querySelector('.view-point');
  let isContentActive = false;

  const sections = document.querySelectorAll('.section');
  const tocItems = document.querySelectorAll('.toc-item');

  const sub = document.querySelector('.sub-sec');
  const sub1 = document.querySelector('.sub.sub1');
  const sub2 = document.querySelector('.sub.sub2');
  const sub3 = document.querySelector('.sub.sub3');

  const l1 = document.querySelector('#l1');
  const l2 = document.querySelector('#l2');
  const l3 = document.querySelector('#l3');

  function removeDisplaySub() {
    sub.style.display = 'none';
  }

  function switchContent() {
    sub.removeEventListener('animationend', removeDisplaySub);
    switch(indexs) {
      case 0:
      sub.style.animation = 'fadeOut 1s';
      sub.addEventListener('animationend', removeDisplaySub)

      l1.classList.remove('active-content');
      l2.classList.remove('active-content');
      l3.classList.remove('active-content');
      break;

      case 1:
        sub.style.display = 'flex';
        sub.style.animation = 'fadeIn 1s';
        sub1.style.display = 'flex';
        l1.classList.add('active-content');

        sub2.style.display = 'none';
        sub3.style.display = 'none';
        l2.classList.remove('active-content');
        l3.classList.remove('active-content');
        break;

      case 2:
        sub.style.display = 'flex';
        sub2.style.display = 'block';
        l2.classList.add('active-content');

        sub1.style.display = 'none';
        sub3.style.display = 'none';
        l1.classList.remove('active-content');
        l3.classList.remove('active-content');
        break;

      case 3:
        sub.style.display = 'flex';
        sub3.style.display = 'flex';
        l3.classList.add('active-content');

        sub1.style.display = 'none';
        sub2.style.display = 'none';
        l1.classList.remove('active-content');
        l2.classList.remove('active-content');
        break;
    }
  }

  function updateActiveSlide(newIndex) {
    if (newIndex === 2) {
      key = false;
      sub.removeEventListener('animationend', removeDisplaySub);
    }
    sections.forEach((sec, idx) => {
      if (idx === newIndex) {
        sec.classList.add('active');
      }
    });

    tocItems.forEach((item, idx) => {
      if (idx === newIndex) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  function activatePresentation() {
    content.style.display = 'block';
    content.style.animation = 'slideIn 1s ease-in';
    isContentActive = true;
  }

  function goToSlide(newIndex) {
    index = newIndex;
    viewPoint.style.transform = `translateX(-${index * 100}vw)`;
    updateActiveSlide(index);
  }

  tocItems.forEach((item, idx) => {
    item.addEventListener('click', () => {
      key = true;
      indexs = -1;
      sub.style.display = 'none';
      if (!isContentActive) {
        activatePresentation();
      }
      goToSlide(idx);
    });
  });

  window.addEventListener('keydown', (e) => {
    console.log(indexs);
    console.log(key);
    if (e.key === 'ArrowLeft' && (indexs === 0 || indexs === -1) && !key) {

      key = true;
      indexs = -1;
      sub.style.animation = 'fadeOut 1s';
      sub.addEventListener('animationend', removeDisplaySub)

      if (index > 0) {
        goToSlide(index-1);
          
        } else {
          content.style.animation = 'slideOut 1s ease-in';
          content.addEventListener('animationend', () => {
            content.style.display = 'none';
            isContentActive = false;
            sections.forEach(sec => sec.classList.remove('active'));
            tocItems.forEach(item => item.classList.remove('active'));
          }, { once: true });
        }
    }
    else if (e.key === 'ArrowLeft' && key && index >= 0) {
      if (isContentActive) {
        if (index > 0) {
          goToSlide(index - 1);
        } else {
          content.style.animation = 'slideOut 1s ease-in';
          content.addEventListener('animationend', () => {
            content.style.display = 'none';
            isContentActive = false;
            sections.forEach(sec => sec.classList.remove('active'));
            tocItems.forEach(item => item.classList.remove('active'));
          }, { once: true });
        }
      }
    }
    if (e.key === 'ArrowRight' && key && index < 4) {
      if (!isContentActive) {
        activatePresentation();
        goToSlide(0);
      } else {
        if (index < 6) {
          goToSlide(index + 1);
        }
      }
    }
    
    if (e.key === 'ArrowRight' && indexs < 3 && !key) {
      indexs++;
      switchContent();
    }
    else if (e.key === 'ArrowLeft' && indexs > 0 && !key) {
      indexs--;
      switchContent();
    }

    else if (e.key === 'ArrowRight' && indexs === 3) {
      l1.classList.remove('active-content');
      l2.classList.remove('active-content');
      l3.classList.remove('active-content');

      key = true;
      indexs = 0;
      switchContent();
      
      sub.style.animation = 'fadeOut 0.5s';
      sub.addEventListener('animationend', removeDisplaySub)

      if (!isContentActive) {
        activatePresentation();
        goToSlide(0);
      } else {
        if (index < 6) {
          goToSlide(index + 1);
        }
      }
    }
    console.log(indexs)
  }, { passive: true });
});

function next() {
  if (!isContentActive) {
        activatePresentation();
        goToSlide(0);
      } else {
        if (index < 6) {
          goToSlide(index + 1);
        }
      }
}
