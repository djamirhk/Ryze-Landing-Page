
import * as THREE from 'https://cdn.skypack.dev/three@0.152.2';
import { GLTFLoader } from 'https://cdn.skypack.dev/three/examples/jsm/loaders/GLTFLoader';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('boltCanvas'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
camera.position.z = 3;

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const loader = new GLTFLoader();
loader.load('bolt.glb', function(gltf) {
  const bolt = gltf.scene;
  bolt.scale.set(1.5, 1.5, 1.5);
  scene.add(bolt);

  let targetX = 0;
  let currentX = 0;

  window.addEventListener('touchmove', (e) => {
    targetX = (e.touches[0].clientX / window.innerWidth - 0.5) * 2;
  });

  function animate() {
    requestAnimationFrame(animate);
    currentX += (targetX - currentX) * 0.05;
    bolt.rotation.y = currentX;
    renderer.render(scene, camera);
  }

  animate();
});
