import * as THREE from "three";
import "./style.css";
import { gsap } from "gsap/gsap-core";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

THREE.ColorManagement.workingColorSpace = THREE.LinearSRGBColorSpace;
// scene
const scene = new THREE.Scene();
// create our sphere
const geometry = new THREE.SphereGeometry(2, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: "#00ff83",
});
// mesh is combination of geometery and material
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// lights
const light = new THREE.PointLight(0xffffff, 10, 100, 1);
light.position.set(0, 10, 10);
light.intensity = 20;
scene.add(light);

// camera
// the thing you will see on screen is what camera looking at
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100
);
// fov - field of view how much a camera can see
camera.position.z = 10;
scene.add(camera);

// renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);

// resizing
window.addEventListener("resize", () => {
  // update sizes
  console.log(window.innerWidth);
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // update camera
  camera.updateProjectionMatrix();
  camera.aspect = sizes.width / sizes.height;
  renderer.setSize(sizes.width, sizes.height);
});

// controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
// controls.autoRotateSpeed = 6;

const loop = () => {
  // mesh.position.x += 0.1;
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};
loop();

// timeline magic
// allows to sync multiple animations together
const tl = gsap.timeline({ defaults: { duration: 1 } });
tl.fromTo(mesh.scale, { z: 0, y: 0, x: 0 }, { z: 1, y: 1, x: 1 });
if (document.querySelector("nav")) {
  if (document.querySelector(".title")) {
    tl.fromTo(".title", { opacity: 0 }, { opacity: 1 });
  }
}
tl.fromTo(".title", { opacity: 0 }, { opacity: 1 });

// mouse animation color
let mouseDown = false;
let rgb = [];
window.addEventListener("mousedown", () => (mouseDown = true));
window.addEventListener("mouseup", () => (mouseDown = false));

window.addEventListener("mousemove", (e) => {
  if (mouseDown) {
    rgb = [
      Math.round((e.pageX / sizes.width) * 255),
      Math.round((e.pageY / sizes.width) * 255),
      150,
    ];
    // animate
    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`);
    new THREE.Color();
    gsap.to(mesh.material.color, {
      r: newColor.r,
      g: newColor.g,
      b: newColor.b,
    });
  }
});
