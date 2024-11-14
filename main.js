import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({antialias: true, canvas});
  const fov = 75;
  const aspect = 2;
  const near = 0.1;
  const far = 5;
  const camera = new THREE.PerspectiveCamera(fov,aspect,near,far);
  camera.position.z = 2;
  camera.position.x = 3;
  camera.position.y = 3;
  const scene = new THREE.Scene();
  const material = new THREE.LineBasicMaterial({color:0xffffff});
  for (let i = 0; i < 125; i++) {
    const points = [];
    const x = Math.random() * 6;
    const y = Math.random() * 6;
    points.push(new THREE.Vector3(x,y,0));
    points.push(new THREE.Vector3(x,y,-100));
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry,material);
    scene.add(line);
  }
  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width,height,false);
    }
    return needResize;
  }
  function render(time) {
    time *= 0.001;
    camera.position.z -= time;
    if (camera.position.z < -100) {
	document.getElementById('links').style.display = "block";
    }
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
    renderer.render(scene,camera);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
