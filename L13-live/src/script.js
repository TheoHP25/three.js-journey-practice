import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import GUI from 'lil-gui';

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load('textures/matcaps/8.png');
matcapTexture.colorSpace = THREE.SRGBColorSpace;

/**
 * Fonts
 */
const fontLoader = new FontLoader();

fontLoader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
    // Material
    const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });

    // Text
    const textGeometry = new TextGeometry("(Debut Avril, petit soucis avec l'animation..)", {
        font: font,
        size: 0.4,
        depth: 0.2,
        curveSegments: 25,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 6
    });

    const textGeometry2 = new TextGeometry('Aspiring Creative Developer', {
        font: font,
        size: 1,
        depth: 0.2,
        curveSegments: 25,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 6
    });

    textGeometry.center();

    const text = new THREE.Mesh(textGeometry, material);
    text.rotation.y = -0.75;
    text.position.set(0, 2, -9);
    scene.add(text);

    const text2 = new THREE.Mesh(textGeometry2, material);
    text2.position.set(0, -2, -9);
    text2.rotation.y = -1;
    scene.add(text2);

    // Donuts
    const donutGeometry = new THREE.RingGeometry(0.6, 0.5, 32, 64);

    for (let i = 0; i < 200; i++) {
        const donut = new THREE.Mesh(donutGeometry, material);
        donut.position.x = (Math.random() - 0.5) * 30;
        donut.position.y = (Math.random() - 0.5) * 30;
        donut.position.z = (Math.random() - 0.5) * 30;
        donut.rotation.x = Math.random() * Math.PI;
        donut.rotation.y = Math.random() * Math.PI;
        const scale = Math.random();
        donut.scale.set(scale, scale, scale);

        scene.add(donut);
    }
});

/**
 * Load GLB Model
 */
const loader = new GLTFLoader();
let mixer = null; // Pour gérer les animations
let model = null; // Déclarer ici pour y accéder dans la fonction tick
let modelLoaded = false; // Variable pour suivre l'état du chargement

loader.load('animationDuNom.glb', (gltf) => {
    model = gltf.scene; // Assigner le modèle à la variable
    model.scale.set(2, 3, 3);
    model.position.set(0, 0, -10); // Ajuste la position si besoin
    model.rotation.y = 4;
    model.updateMatrixWorld();
    scene.add(model);

    console.log("Animations dans le modèle :", gltf.animations);

    // Logguer les objets du modèle pour vérifier s'ils contiennent des morph targets
    model.traverse((child) => {
        if (child.isMesh) {
            console.log(`Objet: ${child.name}`, child.morphTargetInfluences);
        }
    });

    if (gltf.animations.length > 0) {
        // Créer le mixer pour animer le modèle
        mixer = new THREE.AnimationMixer(model);

        // Créer l'action pour chaque animation présente
        gltf.animations.forEach((clip, index) => {
            const action = mixer.clipAction(clip);
            action.play();
            action.setLoop(THREE.LoopRepeat, Infinity);
            action.timeScale = 1; // Augmenter la vitesse de l'animation
            console.log(`Animation ${index + 1} lancée !`);

            // Log les pistes de l'animation pour mieux comprendre
            console.log(`Pistes de l'animation ${index + 1} :`, clip.tracks);
        });
    } else {
        console.log("Aucune animation trouvée.");
    }

    modelLoaded = true; // Indiquer que le modèle est chargé
}, undefined, (error) => {
    console.error('Erreur lors du chargement du GLB', error);
});

/**
 * Lumières
 */
const directionalLight = new THREE.DirectionalLight(0xffffff, 50);
directionalLight.position.set(-2, -1, 6).normalize();
scene.add(directionalLight);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(70, sizes.width / sizes.height, 0.1, 100);
camera.position.set(-10, -1, 10);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 0, 0); // Regardez l'origine de la scène
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialiasing: true
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Vérifier si le modèle est chargé et si mixer existe
    if (modelLoaded && mixer) {
        mixer.update(clock.getDelta()); // Mettre à jour l'animation seulement si le modèle est chargé et le mixer existe

        // Appliquer manuellement les influences des morph targets
        model.traverse((child) => {
            if (child.isMesh) {
                // Appliquer les influences des morph targets
                for (let i = 0; i < child.morphTargetInfluences.length; i++) {
                    // Appliquer une valeur d'influence pour chaque morph target
                    child.morphTargetInfluences[i] = Math.sin(elapsedTime + i); // Exemple de changement
                }
            }
        });
    } else {
        console.log("Le modèle ou le mixer n'est pas encore prêt.");
    }

    controls.update();

    // Rendu
    renderer.render(scene, camera);

    // Appel de tick à chaque frame
    window.requestAnimationFrame(tick);
};

tick();
