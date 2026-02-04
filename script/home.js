document.addEventListener('DOMContentLoaded', function () {
  let index = 0;
  const content = document.querySelector('.content');
  const viewPoint = document.querySelector('.view-point');
  let isContentActive = false;

  const sections = document.querySelectorAll('.section');
  const tocItems = document.querySelectorAll('.toc-item');

  function updateActiveSlide(newIndex) {
    sections.forEach((sec, idx) => {
      if (idx === newIndex) {
        sec.classList.add('active');
      } else {
        sec.classList.remove('active');
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
      if (!isContentActive) {
        activatePresentation();
      }
      goToSlide(idx);
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      if (!isContentActive) {
        activatePresentation();
        goToSlide(0);
      } else {
        if (index < 6) {
          goToSlide(index + 1);
        }
      }
    }
    else if (e.key === 'ArrowLeft') {
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
  }, { passive: true });
});