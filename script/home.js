gsap.registerPlugin();

const buttons = document.querySelectorAll('.btn');
const sections = document.querySelectorAll('.section');
const timelineItems = document.querySelectorAll('.timeline-item');
const s2Descriptions = document.querySelectorAll('.nd');
const s2Slider = document.querySelector('.slider');
const timelineImages = document.querySelectorAll('.s3Pic .pic');
const bgMesh = document.querySelector('.bg-mesh');

let currentSectionIndex = 0;
let s2SubIndex = 0;
let s3SubIndex = 0;

/* --- Animations --- */

function animateSectionIn(index) {
  const section = sections[index];
  const elements = section.querySelectorAll('.title h1, .text-box, .static-box, .description, .timeline-item, .visual-content');
  const video = section.querySelector('.video-bg');

  gsap.fromTo(elements,
    { opacity: 0, y: 30, filter: 'blur(15px)' },
    { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, stagger: 0.15, ease: 'expo.out' }
  );

  if (video) {
    gsap.fromTo(video, { opacity: 0 }, { opacity: 0.15, duration: 2 });
  }
  const colors = [
    'radial-gradient(at 0% 0%, hsla(253,16%,15%,1) 0, transparent 50%)',
    'radial-gradient(at 100% 0%, hsla(225,39%,15%,1) 0, transparent 50%)',
    'radial-gradient(at 50% 100%, hsla(339,49%,15%,1) 0, transparent 50%)',
    'radial-gradient(at 0% 100%, hsla(200,30%,15%,1) 0, transparent 50%)'
  ];

  gsap.to(bgMesh, {
    backgroundImage: colors[index % colors.length],
    duration: 2,
    ease: 'power2.inOut'
  });
}

function updateSectionDisplay() {
  sections.forEach((sec, index) => {
    if (index === currentSectionIndex) {
      sec.style.display = 'grid';
      sec.classList.add('active-section');
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
      gsap.to(item, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.5, borderLeftWidth: '8px' });
    } else {
      item.classList.remove('active-nd');
      gsap.to(item, { opacity: 0.3, scale: 0.95, filter: 'blur(4px)', duration: 0.5, borderLeftWidth: '4px' });
    }
  });

  const translateValue = -(s2SubIndex * 100);
  gsap.to(s2Slider, { xPercent: translateValue, duration: 0.8, ease: 'expo.inOut' });
}

function handleSection3Nav(index) {
  s3SubIndex = index;
  if (s3SubIndex < 0) s3SubIndex = 0;
  if (s3SubIndex > 1) s3SubIndex = 1;

  timelineItems.forEach((item, i) => {
    if (i === s3SubIndex) {
      item.classList.add('active-timeline');
      gsap.to(item, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.6, x: 20 });
    } else {
      item.classList.remove('active-timeline');
      gsap.to(item, { opacity: 0.2, scale: 0.9, filter: 'blur(6px)', duration: 0.6, x: 0 });
    }
  });

  const francePic = document.querySelector('.pic.france');
  const usaPic = document.querySelector('.pic.usa');

  const tl = gsap.timeline();
  if (s3SubIndex === 0) {
    tl.to(francePic, { opacity: 1, scale: 1.1, zIndex: 10, filter: 'blur(0px) brightness(1.2)', xPercent: 0, duration: 0.7, ease: 'back.out(1.7)' })
      .to(usaPic, { opacity: 0.2, scale: 0.8, zIndex: 1, filter: 'blur(10px) brightness(0.3)', xPercent: 20, duration: 0.7, ease: 'power2.inOut' }, 0);
  } else {
    tl.to(francePic, { opacity: 0.2, scale: 0.8, zIndex: 1, filter: 'blur(10px) brightness(0.3)', xPercent: -20, duration: 0.7, ease: 'power2.inOut' })
      .to(usaPic, { opacity: 1, scale: 1.1, zIndex: 10, filter: 'blur(0px) brightness(1.2)', xPercent: 0, duration: 0.7, ease: 'back.out(1.7)' }, 0);
  }
}

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

s2Descriptions.forEach((desc, index) => {
  desc.addEventListener('click', () => handleSection2Nav(index));
});

timelineItems.forEach((item, index) => {
  item.addEventListener('click', () => handleSection3Nav(index));
});

timelineImages.forEach((img, index) => {
  img.addEventListener('click', () => handleSection3Nav(index));
});

buttons.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    currentSectionIndex = index;
    updateSectionDisplay();
  });
});

window.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  gsap.to('.visual-content img', { x: x, y: y, duration: 1, ease: 'power1.out' });
});

updateSectionDisplay();
handleSection3Nav(0);
handleSection2Nav(0);