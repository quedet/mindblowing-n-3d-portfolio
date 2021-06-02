import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );

camera.position.setZ(30);

renderer.render( scene, camera );

const pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.set(5, 5, 5);
const ambienLight = new THREE.AmbientLight(0xFFFFFF);

scene.add(pointLight, ambienLight);

// const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// const material = new THREE.MeshBasicMaterial({ color: 0xFF6347, wireframe: true });
// const torus = new THREE.Mesh( geometry, material );

// scene.add(torus);



const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);

scene.add(lightHelper, gridHelper);

const controls = new OrbitControls( camera, renderer.domElement);

function addStar () {
  const geometry = new THREE.SphereGeometry(0.25);
  const material = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });

  const star = new THREE.Mesh( geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);

  scene.add(star);
}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('space-universe-stars.jpg')
scene.background = spaceTexture;


const moonTexture = new THREE.TextureLoader().load('earth-diffuse.jpg')

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(8, 100, 100),
  new THREE.MeshStandardMaterial( {
    map: moonTexture
  })
)

scene.add(moon)


function animate () {
  requestAnimationFrame(animate);

  moon.rotation.x += 0.01;
  moon.rotation.y += 0.009;
  // moon.rotation.z += 0.01;

  controls.update();
  renderer.render( scene, camera);
}

animate();

