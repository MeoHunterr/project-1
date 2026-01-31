gsap.registerPlugin();

const canvas = document.querySelector('#three-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xFCA311, 2, 50);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

const composer = new THREE.EffectComposer(renderer);
const renderPass = new THREE.RenderPass(scene, camera);
composer.addPass(renderPass);

const bloomPass = new THREE.UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5,
  0.4,
  0.85
);
bloomPass.strength = 1.2;
bloomPass.radius = 0.5;
bloomPass.threshold = 0.1;
composer.addPass(bloomPass);

const drumGroup = new THREE.Group();

const drumGeometry = new THREE.CylinderGeometry(2.5, 2, 2, 64);
const drumMaterial = new THREE.MeshStandardMaterial({
  color: 0xcd7f32,
  metalness: 0.9,
  roughness: 0.1,
  emissive: 0x331100,
  emissiveIntensity: 0.2
});
const drum = new THREE.Mesh(drumGeometry, drumMaterial);
drumGroup.add(drum);

const faceGeometry = new THREE.RingGeometry(0, 2.5, 64);
const faceMaterial = new THREE.MeshStandardMaterial({
  color: 0xffd700,
  metalness: 1.0,
  roughness: 0.1,
  side: THREE.DoubleSide
});
const face = new THREE.Mesh(faceGeometry, faceMaterial);
face.rotation.x = -Math.PI / 2;
face.position.y = 1.01;
drumGroup.add(face);

scene.add(drumGroup);

const particlesCount = 4000;
const posArray = new Float32Array(particlesCount * 3);
const originalPos = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
  posArray[i] = (Math.random() - 0.5) * 30;
  originalPos[i] = posArray[i];
}

const particlesGeometry = new THREE.BufferGeometry();
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
  size: 0.15,
  color: 0xFCA311,
  transparent: true,
  opacity: 0.9,
  blending: THREE.AdditiveBlending
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

const buttons = document.querySelectorAll('.btn');
const sections = document.querySelectorAll('.section');
const timelineItems = document.querySelectorAll('.timeline-item');
const s2Descriptions = document.querySelectorAll('.nd');
const s2Slider = document.querySelector('.slider');
const timelineImages = document.querySelectorAll('.s3Pic .pic');

let currentSectionIndex = 0;
let s2SubIndex = 0;
let s3SubIndex = 0;

camera.position.z = 8;
camera.position.y = 0;
drumGroup.position.x = 0;

const mouse = new THREE.Vector2();
const targetMouse = new THREE.Vector2();

window.addEventListener('mousemove', (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

  targetMouse.x = (e.clientX / window.innerWidth - 0.5) * 5;
  targetMouse.y = (e.clientY / window.innerHeight - 0.5) * 5;

  gsap.to('.visual-content img', { x: mouse.x * 20, y: -mouse.y * 20, duration: 0.5 });
});

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const elapsedTime = clock.getElapsedTime();

  drumGroup.rotation.y += 0.005;
  drumGroup.rotation.x = Math.sin(elapsedTime * 0.5) * 0.1;

  const positions = particlesGeometry.attributes.position.array;
  for (let i = 0; i < particlesCount; i++) {
    const i3 = i * 3;
    const x = originalPos[i3];
    const y = originalPos[i3 + 1];
    const z = originalPos[i3 + 2];

    const dx = x - targetMouse.x * 4;
    const dy = y - -targetMouse.y * 4;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 3) {
      const force = (3 - dist) * 2;
      positions[i3] += dx * force * 0.05;
      positions[i3 + 1] += dy * force * 0.05;
    } else {
      positions[i3] += (originalPos[i3] - positions[i3]) * 0.05;
      positions[i3 + 1] += (originalPos[i3 + 1] - positions[i3 + 1]) * 0.05;
    }

    positions[i3 + 1] += Math.sin(elapsedTime + x) * 0.01;
  }
  particlesGeometry.attributes.position.needsUpdate = true;

  composer.render();
}
animate();

function animateSectionIn(index) {
  const section = sections[index];
  const elements = section.querySelectorAll('.title h1, .hero-title .line, .text-box, .static-box, .description, .timeline-item, .visual-content');

  gsap.fromTo(elements,
    { opacity: 0, y: 30, filter: 'blur(15px)' },
    { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, stagger: 0.1, ease: 'power2.out' }
  );

  if (index === 0) {
    gsap.to(camera.position, { z: 8, x: 0, y: 0, duration: 1.5, ease: 'power2.inOut' });
    gsap.to(drumGroup.position, { x: 0, scale: 1, duration: 1.5 });
    gsap.to(particlesMaterial.color, { r: 1, g: 0.6, b: 0, duration: 1 });
    bloomPass.strength = 1.2;
  }
  else if (index === 1) {
    gsap.to(camera.position, { z: 4, x: -2, duration: 0.5, ease: 'power1.in' })
      .then(() => gsap.to(camera.position, { z: 7, x: 0, y: 0, duration: 1, ease: 'back.out(1.2)' }));

    gsap.to(drumGroup.position, { x: 4, z: -2, duration: 1.5 });
    gsap.to(particlesMaterial.color, { r: 0, g: 0.5, b: 1, duration: 1 });
    bloomPass.strength = 1.5;
  }
  else if (index === 2) {
    gsap.to(camera.position, { z: 6, duration: 0.2, ease: 'power1.out' })
      .then(() => gsap.to(camera.position, { z: 8, duration: 1.5, ease: 'elastic.out(1, 0.3)' }));

    gsap.to(drumGroup.position, { x: -4, duration: 1.5 });
    gsap.to(particlesMaterial.color, { r: 1, g: 0.1, b: 0.1, duration: 0.5 });
    bloomPass.strength = 2.5;
  }
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
    index === currentSectionIndex ? btn.classList.add('active') : btn.classList.remove('active');
  });
}

function handleSection2Nav(index) {
  s2SubIndex = Math.max(0, Math.min(index, 2));
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
  s3SubIndex = Math.max(0, Math.min(index, 1));
  timelineItems.forEach((item, i) => {
    if (i === s3SubIndex) {
      item.classList.add('active-timeline');
      gsap.to(item, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.6, x: 20 });
    } else {
      item.classList.remove('active-timeline');
      gsap.to(item, { opacity: 0.2, scale: 0.9, filter: 'blur(6px)', duration: 0.6, x: 0 });
    }
  });

  const tl = gsap.timeline();

  const pics = document.querySelectorAll('.s3Pic .pic');
  if (pics.length >= 2) {
    if (s3SubIndex === 0) {
      tl.to(pics[0], { opacity: 1, scale: 1.1, zIndex: 10, filter: 'blur(0px) brightness(1.2)', xPercent: 0, duration: 0.7 })
        .to(pics[1], { opacity: 0.2, scale: 0.8, zIndex: 1, filter: 'blur(10px) brightness(0.3)', xPercent: 20, duration: 0.7 }, 0);
    } else {
      tl.to(pics[0], { opacity: 0.2, scale: 0.8, zIndex: 1, filter: 'blur(10px) brightness(0.3)', xPercent: -20, duration: 0.7 })
        .to(pics[1], { opacity: 1, scale: 1.1, zIndex: 10, filter: 'blur(0px) brightness(1.2)', xPercent: 0, duration: 0.7 }, 0);
    }
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown' && currentSectionIndex < sections.length - 1) {
    currentSectionIndex++;
    updateSectionDisplay();
  } else if (e.key === 'ArrowUp' && currentSectionIndex > 0) {
    currentSectionIndex--;
    updateSectionDisplay();
  } else if (e.key === 'ArrowRight') {
    if (currentSectionIndex === 1) handleSection2Nav(s2SubIndex + 1);
    if (currentSectionIndex === 2) handleSection3Nav(s3SubIndex + 1);
  } else if (e.key === 'ArrowLeft') {
    if (currentSectionIndex === 1) handleSection2Nav(s2SubIndex - 1);
    if (currentSectionIndex === 2) handleSection3Nav(s3SubIndex - 1);
  }
});

s2Descriptions.forEach((desc, index) => desc.addEventListener('click', () => handleSection2Nav(index)));
timelineItems.forEach((item, index) => item.addEventListener('click', () => handleSection3Nav(index)));
timelineImages.forEach((img, index) => img.addEventListener('click', () => handleSection3Nav(index)));

buttons.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    currentSectionIndex = index;
    updateSectionDisplay();
  });
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
});

updateSectionDisplay();
handleSection3Nav(0);
handleSection2Nav(0);