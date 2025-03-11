import * as THREE from "three";

THREE.ColorManagement.workingColorSpace = THREE.LinearSRGBColorSpace;
// scene
const scene = new THREE.Scene();
// create our sphere
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: "#00ff83",
});
// mesh is combination of geometery and material
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// lights
const light = new THREE.PointLight(0xffffff, 10, 100, 1);
light.position.set(0, 10, 10);
scene.add(light);

// camera
// the thing you will see on screen is what camera looking at
const camera = new THREE.PerspectiveCamera(45, 800 / 600, 0.1, 100);
// fov - field of view how much a camera can see
camera.position.z = 10;
scene.add(camera);

// renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(800, 600);
renderer.render(scene, camera);
