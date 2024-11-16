import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {TextGeometry} from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({antialias: true, canvas});
  const fov = 75;
  const aspect = 2;
  const near = 0.1;
  const far = 15;
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
  const loader = new FontLoader();
  loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

	const geometry = new TextGeometry( "Yousof's Webpage", {
		font: font,
		size: 2,
		depth: 5,
		curveSegments: 12,
		bevelEnabled: false,
	} );
	geometry.center();
	const normMaterial = new THREE.MeshNormalMaterial();
        const wordMesh = new THREE.Mesh(geometry,normMaterial);
	wordMesh.position.z = -120;
        wordMesh.position.x = 3;
	wordMesh.position.y = 3;
        scene.add(wordMesh);
} );
  
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
    if (camera.position.z > -105) {
      camera.position.z -= time;
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

