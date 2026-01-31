gsap.registerPlugin();

const buttons = document.querySelectorAll('.btn');
const sections = document.querySelectorAll('.section');
const timelineItems = document.querySelectorAll('.timeline-item');
const s2Descriptions = document.querySelectorAll('.nd');
const s2Slider = document.querySelector('.slider');
const timelineImages = document.querySelectorAll('.s3Pic .pic');
const SECTION_IDS = ['s1', 's2', 's3', 's4'];

let currentSectionIndex = 0;
let s2SubIndex = 0;
let s3SubIndex = 0;

/* --- Animations --- */

function animateSectionIn(index) {
  const section = sections[index];
  const elements = section.querySelectorAll('.title, .text-box, .static-box, .description, .timeline-container, .visual-content');

  gsap.fromTo(elements,
    { opacity: 0, y: 50, filter: 'blur(10px)' },
    { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, stagger: 0.1, ease: 'power3.out' }
  );

  if (index === 0) {
    gsap.fromTo('.icon', { rotate: 0 }, { rotate: 360, duration: 20, repeat: -1, ease: 'linear' });
  }
}

function updateSectionDisplay() {
  sections.forEach((sec, index) => {
    if (index === currentSectionIndex) {
      sec.style.display = 'grid';
      sec.classList.add('active-section');
      // Trigger entrance animation
      animateSectionIn(index);
    } else {
      sec.style.display = 'none';
      sec.classList.remove('active-section');
    }
  });

  buttons.forEach((btn, index) => {
    if (index === currentSectionIndex) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

function handleSection2Nav(index) {
  s2SubIndex = index;
  if (s2SubIndex < 0) s2SubIndex = 0;
  if (s2SubIndex > 2) s2SubIndex = 2;

  s2Descriptions.forEach((item, i) => {
    if (i === s2SubIndex) {
      item.classList.add('active-nd');
      gsap.to(item, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.4 });
    } else {
      item.classList.remove('active-nd');
      gsap.to(item, { opacity: 0.4, scale: 0.95, filter: 'blur(2px)', duration: 0.4 });
    }
  });

  const translateValue = -(s2SubIndex * 100);
  gsap.to(s2Slider, { xPercent: translateValue, duration: 0.6, ease: 'power2.inOut' });
}

function handleSection3Nav(index) {
  s3SubIndex = index;
  // Ensure we stay within bounds (0 or 1)
  if (s3SubIndex < 0) s3SubIndex = 0;
  if (s3SubIndex > 1) s3SubIndex = 1;

  timelineItems.forEach((item, i) => {
    if (i === s3SubIndex) {
      item.classList.add('active-timeline');
      gsap.to(item, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.5 });
    } else {
      item.classList.remove('active-timeline');
      gsap.to(item, { opacity: 0.3, scale: 0.95, filter: 'blur(3px)', duration: 0.5 });
    }
  });

  const francePic = document.querySelector('.pic.france');
  const usaPic = document.querySelector('.pic.usa');

  if (s3SubIndex === 0) {
    gsap.to(francePic, { opacity: 1, scale: 1, zIndex: 10, filter: 'blur(0px) brightness(1)', duration: 0.6 });
    gsap.to(usaPic, { opacity: 0.3, scale: 0.8, zIndex: 1, filter: 'blur(5px) brightness(0.4)', duration: 0.6 });
  } else {
    gsap.to(francePic, { opacity: 0.3, scale: 0.8, zIndex: 1, filter: 'blur(5px) brightness(0.4)', duration: 0.6 });
    gsap.to(usaPic, { opacity: 1, scale: 1, zIndex: 10, filter: 'blur(0px) brightness(1)', duration: 0.6 });
  }
}

/* --- Input Handling --- */

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown') {
    if (currentSectionIndex < sections.length - 1) {
      currentSectionIndex++;
      updateSectionDisplay();
    }
  } else if (e.key === 'ArrowUp') {
    if (currentSectionIndex > 0) {
      currentSectionIndex--;
      updateSectionDisplay();
    }
  } else if (e.key === 'ArrowRight') {
    if (currentSectionIndex === 1) handleSection2Nav(s2SubIndex + 1);
    if (currentSectionIndex === 2) handleSection3Nav(s3SubIndex + 1);
  } else if (e.key === 'ArrowLeft') {
    if (currentSectionIndex === 1) handleSection2Nav(s2SubIndex - 1);
    if (currentSectionIndex === 2) handleSection3Nav(s3SubIndex - 1);
  }
});

/* Click Handlers for Interactive Focus */

// Section 2: Click on text to navigate
s2Descriptions.forEach((desc, index) => {
  desc.addEventListener('click', () => {
    handleSection2Nav(index);
  });
});

// Section 3: Click on timeline text items
timelineItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    handleSection3Nav(index);
  });
});

// Section 3: Click on images
timelineImages.forEach((img, index) => {
  img.addEventListener('click', () => {
    handleSection3Nav(index);
  });
});

buttons.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    currentSectionIndex = index;
    updateSectionDisplay();
  });
});

// Init
updateSectionDisplay();
handleSection3Nav(0);
handleSection2Nav(0);