"use client";
import * as React from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import gsap from 'gsap';
import { events } from '../../../public/data/event';
import './styles.css';

type VantaEffect = {
  destroy: () => void;
};

const ThreeScene: React.FC = () => {
  const mountRef = React.useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = React.useState<VantaEffect | null>(null);

  // Use useRef to store Three.js objects
  const cameraRef = React.useRef<THREE.PerspectiveCamera | null>(null);
  const sceneRef = React.useRef<THREE.Scene | null>(null);
  const rendererRef = React.useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = React.useRef<OrbitControls | null>(null);

  const islandObjects = React.useRef<{ object: THREE.Object3D; position: THREE.Vector3 }[]>([]);
  const labelsRef = React.useRef<{ label: HTMLDivElement; island: THREE.Object3D }[]>([]);
  const pins = React.useRef<THREE.Mesh[]>([]);

  // Memoized init function
  const init = React.useCallback(() => {
    // Camera
    cameraRef.current = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    cameraRef.current.position.set(800, 450, 1200);

    // Scene
    sceneRef.current = new THREE.Scene();
    sceneRef.current.background = new THREE.Color(0x0d1b2a);
    sceneRef.current.fog = new THREE.Fog(0x0d1b2a, 500, 900);

    const textureLoader = new THREE.TextureLoader();
    const backgroundTexture = textureLoader.load('galaxy3.jpg');
    sceneRef.current.background = backgroundTexture;

    // Lights
    sceneRef.current.add(new THREE.HemisphereLight(0xf0f5f5, 0xd0dee7, 0.5));
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 5).normalize();
    sceneRef.current.add(directionalLight);

    // Renderer
    rendererRef.current = new THREE.WebGLRenderer({ antialias: true });
    rendererRef.current.setPixelRatio(window.devicePixelRatio);
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    mountRef.current?.appendChild(rendererRef.current.domElement);

    rendererRef.current.toneMapping = THREE.ACESFilmicToneMapping;
    rendererRef.current.toneMappingExposure = 1.2;
    rendererRef.current.outputColorSpace = THREE.SRGBColorSpace;

    // Controls
    controlsRef.current = new OrbitControls(cameraRef.current, rendererRef.current.domElement);
    controlsRef.current.target.set(0, 2, 0);
    controlsRef.current.minDistance = 1;
    controlsRef.current.maxDistance = 500;
    controlsRef.current.maxPolarAngle = Math.PI / 2;
    controlsRef.current.autoRotate = true;
    controlsRef.current.autoRotateSpeed = 0.5;
    controlsRef.current.update();

    addStars();
    loadIslands();

    window.addEventListener('resize', resize);
    window.addEventListener('click', onClick);

    // Start animation loop
    animate();
  }, []);

  // Memoized resize function
  const resize = React.useCallback(() => {
    if (cameraRef.current && rendererRef.current) {
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    }
  }, []);

  // Memoized onClick function
  const onClick = React.useCallback((event: MouseEvent) => {
    if (!cameraRef.current || !controlsRef.current) return;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, cameraRef.current);
    const intersects = raycaster.intersectObjects(islandObjects.current.map((obj) => obj.object), true);

    if (intersects.length > 0) {
      let clickedObject = intersects[0].object;

      while (clickedObject.parent && !islandObjects.current.some((obj) => obj.object === clickedObject)) {
        clickedObject = clickedObject.parent;
      }

      const islandData = islandObjects.current.find((obj) => obj.object === clickedObject);
      if (islandData) {
        console.log('Island clicked:', clickedObject.name);

        const islandCenter = new THREE.Vector3(
          islandData.position.x,
          islandData.position.y,
          islandData.position.z
        );

        const directionToIsland = new THREE.Vector3().subVectors(cameraRef.current.position, islandCenter).normalize();
        const fixedScale = 120;
        const zoomDistance = fixedScale * 2;
        const newCameraPosition = islandCenter.clone().addScaledVector(directionToIsland, zoomDistance);

        controlsRef.current.enabled = false;

        gsap.to(cameraRef.current.position, {
          duration: 2,
          x: newCameraPosition.x,
          y: newCameraPosition.y,
          z: newCameraPosition.z,
          onUpdate: () => {
            cameraRef.current?.lookAt(islandCenter);
          },
          onComplete: () => {
            if (controlsRef.current) controlsRef.current.enabled = true;
          },
        });

        gsap.to(controlsRef.current.target, {
          duration: 2,
          x: islandCenter.x,
          y: islandCenter.y,
          z: islandCenter.z,
        });
      }
    }
  }, []);

  // Add stars to the scene
  const addStars = () => {
    if (!sceneRef.current) return;

    const starGeometry = new THREE.BufferGeometry();
    const starVertices: number[] = [];

    for (let i = 0; i < 20000; i++) {
      const x = (Math.random() - 0.5) * 3000;
      const y = (Math.random() - 0.5) * 3000;
      const z = (Math.random() - 0.5) * 3000;
      starVertices.push(x, y, z);
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));

    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 2.5,
      transparent: true,
      opacity: 0.7,
    });

    const starField = new THREE.Points(starGeometry, starMaterial);
    sceneRef.current.add(starField);
  };

  // Load island models
  const loadIslands = () => {
    if (!sceneRef.current) return;

    const islandModels = [
      'models/floating_island.gltf',
      'models/islanddd.gltf',
      'models/floating_island1/scene.gltf',
      'models/floating_island2/scene.gltf',
      'models/floating_island3/scene.gltf',
      'models/floating_island4/scene.gltf',
      'models/floating_island5/scene.gltf',
      'models/floating_island6/scene.gltf',
      'models/floating_island7/scene.gltf',
      'models/floating_island8/scene.gltf',
      'models/floating_island9/scene.gltf',
      'models/floating_island10/scene.gltf',
    ];

    const loader = new GLTFLoader();

    islandModels.forEach((modelPath, i) => {
      loader.load(
        modelPath,
        (gltf) => {
          const originalIsland = gltf.scene;
          console.log('Island loaded:', modelPath);

          const islandPositions = [
            { x: 0, y: 0, z: 0 },
            { x: -280, y: -40, z: 120 },
            { x: 230, y: -50, z: -150 },
            { x: 220, y: -30, z: 0 },
            { x: -250, y: 60, z: 50 },
            { x: 130, y: -60, z: 100 },
            { x: 160, y: 80, z: -100 },
            { x: -150, y: 90, z: -200 },
            { x: -10, y: -180, z: 100 },
            { x: 40, y: 90, z: -160 },
            { x: -50, y: -80, z: 190 },
            { x: -240, y: 80, z: -150 },
          ];

          const event = events[i];

          const fixedScale = 110;

          const pos = islandPositions[i];
          const island = originalIsland.clone();
          island.position.set(pos.x, pos.y, pos.z);

          const box = new THREE.Box3().setFromObject(island);
          const size = new THREE.Vector3();
          box.getSize(size);

          const maxDimension = Math.max(size.x, size.y, size.z);
          const scaleFactor = fixedScale / maxDimension;
          island.scale.set(scaleFactor, scaleFactor, scaleFactor);

          sceneRef.current?.add(island);
          islandObjects.current.push({ object: island, position: new THREE.Vector3(pos.x, pos.y, pos.z) });

          addPinOnIsland(island);
          addTextLabel(island, event.name);
        },
        undefined,
        (error) => {
          console.error('Error loading island model:', error);
        }
      );
    });
  };

  // Add a pin on the island
  const addPinOnIsland = (island: THREE.Object3D) => {
    if (!sceneRef.current) return;

    const pinHeight = 20;
    const pinRadius = 5;

    const pinGeometry = new THREE.ConeGeometry(pinRadius, pinHeight, 32);
    const pinMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const pin = new THREE.Mesh(pinGeometry, pinMaterial);

    pin.rotation.x = Math.PI;

    const islandBoundingBox = new THREE.Box3().setFromObject(island);
    const centerX = islandBoundingBox.getCenter(new THREE.Vector3()).x;
    const centerY = islandBoundingBox.max.y + pinHeight / 2;
    const centerZ = islandBoundingBox.getCenter(new THREE.Vector3()).z;

    pin.position.set(centerX, centerY, centerZ);
    sceneRef.current.add(pin);

    pins.current.push(pin);
  };

  // Add a text label for the island
  const addTextLabel = (island: THREE.Object3D, text: string) => {
    if (!cameraRef.current) return;

    const islandBoundingBox = new THREE.Box3().setFromObject(island);
    const centerX = islandBoundingBox.getCenter(new THREE.Vector3()).x;
    const centerY = islandBoundingBox.max.y;
    const centerZ = islandBoundingBox.getCenter(new THREE.Vector3()).z;

    const label = document.createElement('div');
    label.className = 'label';
    label.textContent = text;
    label.style.position = 'absolute';
    label.style.color = 'black';
    label.style.fontSize = '16px';
    label.style.fontWeight = 'bold';
    label.style.fontFamily = 'Arial, sans-serif';
    label.style.pointerEvents = 'auto';
    label.style.cursor = 'pointer';
    label.style.marginTop = '2.2em';
    label.style.padding = '5px 10px';
    label.style.borderRadius = '8px';
    label.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    label.style.boxShadow = '0 4px 6px rgba(0,0,0,0.2)';
    label.style.textAlign = 'center';
    label.style.zIndex = '10';

    document.body.appendChild(label);
    labelsRef.current.push({ label, island });

    updateLabelPosition(label, new THREE.Vector3(centerX, centerY, centerZ));

    label.addEventListener('click', (event) => {
      event.stopPropagation();
      const eventData = events.find((e) => e.name === text);
      if (eventData) {
        window.location.href = eventData.Link;
      }
    });
  };

  // Update label position based on camera
  const updateLabelPosition = (label: HTMLDivElement, islandPosition: THREE.Vector3) => {
    if (!cameraRef.current) return;

    const vector = islandPosition.clone();
    vector.project(cameraRef.current);

    const widthHalf = window.innerWidth / 2;
    const heightHalf = window.innerHeight / 2;

    const x = vector.x * widthHalf + widthHalf;
    const y = -(vector.y * heightHalf) + heightHalf;

    label.style.left = `${x}px`;
    label.style.top = `${y}px`;
    label.style.transform = 'translate(-50%, -100%)';
  };

  // Animation loop
  const animate = () => {
    if (!controlsRef.current || !rendererRef.current || !sceneRef.current || !cameraRef.current) return;

    controlsRef.current.update();

    labelsRef.current.forEach(({ label, island }) => {
      const islandBoundingBox = new THREE.Box3().setFromObject(island);
      const centerX = islandBoundingBox.getCenter(new THREE.Vector3()).x;
      const centerY = islandBoundingBox.max.y + 18;
      const centerZ = islandBoundingBox.getCenter(new THREE.Vector3()).z;

      updateLabelPosition(label, new THREE.Vector3(centerX, centerY, centerZ));
    });

    rendererRef.current.render(sceneRef.current, cameraRef.current);
    requestAnimationFrame(animate);
  };

  // Main useEffect
  React.useEffect(() => {
    init();

    const effect = window.VANTA?.CLOUDS2({
      el: ".s-page-1 .s-section-1 .s-section",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      texturePath: "./texture.png",
    });
    setVantaEffect(effect as VantaEffect);

    return () => {
      if (vantaEffect) vantaEffect.destroy();

      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      if (sceneRef.current) {
        sceneRef.current.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.geometry?.dispose();
            object.material?.dispose();
          }
        });
      }

      labelsRef.current.forEach(({ label }) => {
        if (label && document.body.contains(label)) {
          document.body.removeChild(label);
        }
      });
      labelsRef.current = [];

      window.removeEventListener('resize', resize);
      window.removeEventListener('click', onClick);
    };
  }, [init, onClick, resize, vantaEffect]);

  return (
    <div className="s-page-1">
      <div className="s-section-1">
        <div className="s-section" ref={mountRef}></div>
      </div>
      <div id="info"></div>
    </div>
  );
};

export default ThreeScene;