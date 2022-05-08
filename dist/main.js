
import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls';
//import { GLTFLoader } from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from "https://unpkg.com/three@0.127.0/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "https://unpkg.com/three@0.127.0/examples/jsm/loaders/MTLLoader";
import { DDSLoader } from "https://unpkg.com/three@0.127.0/examples/jsm/loaders/DDSLoader";

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer(/*{
  canvas: document.querySelector('#bg'),
}*/);
document.body.appendChild( renderer.domElement );
//renderer.outputEncoding = THREE.sRGBEncoding;

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const pointLight2 = new THREE.PointLight(0xffffff);
pointLight2.position.set(-5, -5, -5);

//const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight,pointLight2);
//scene.add(ambientLight);

// Helpers

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper)
//scene.add(gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

// Background

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
const testTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// instantiate a loader

// load a resource
/*
newloader.load(
	// resource URL
	'models/Sturm.obj',
	// called when resource is loaded
	function ( object ) {
		scene.add( object );

	},
	// called when loading is in progresses
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);
*/

/*const diffuseTexture = new THREE.TextureLoader().load('./models/SturmPistol_Diffuse.jpg');
const normalTexture = new THREE.TextureLoader().load('./models/SturmPistol_Normal.jpg');*/
var manager = new THREE.LoadingManager();
manager.addHandler( /\.dds$/i, new DDSLoader() );

var mtlLoader = new MTLLoader(manager);
//var sturmObject = undefined;
//mtlLoader.setBaseUrl('models/Sturm/');
mtlLoader.setPath('models/Sturm/');
var url = 'Sturm.mtl';
mtlLoader.load(url, function(materials) {
    materials.preload();
    var objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('models/Sturm/');
    objLoader.load("Sturm.obj", function(object)
    {    
        //sturmObject = object;
        //sturmObject.rotate(90);

        //object.scale.set(10,10,10);
        scene.add(object);
        //scene.add( sturmObject );
    });
});

const mtlLoader2 = new MTLLoader();
var DMTObject = undefined;
mtlLoader2.load("models/DMT.mtl", function(materials)
{
    materials.preload();
    var objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath( 'models/');
    objLoader.load("DMT.obj", function(object)
    {    
        DMTObject = object;
        DMTObject.translateX(1.5);
        DMTObject.translateY(0.05);
        DMTObject.rotateY(-29.84);
        scene.add( DMTObject );
    });
});

/*
const loader = new GLTFLoader();
loader.load(
    'models/SturmNewTest.gltf',
    function (gltf) {
        scene.add(gltf.scene)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)
*/
function animate() {
  requestAnimationFrame(animate);


  controls.update();

  renderer.render(scene, camera);
}

animate();
