// // components/TimelineScene.js
// import { useEffect, useRef, useState } from 'react';
// import * as THREE from 'three';

// const TimelineScene = () => {
//   const mountRef = useRef(null);
//   const [currentTerrain, setCurrentTerrain] = useState(0); // Keep track of the current terrain
//   const terrains = [
//     { color: 0x00ff00, name: "Forest" },
//     { color: 0x0000ff, name: "Ocean" },
//     { color: 0xff0000, name: "Desert" },
//     { color: 0xffff00, name: "Mountain" },
//   ];

//   useEffect(() => {
//     const mount = mountRef.current;
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     mount.appendChild(renderer.domElement);

//     const terrainGroup = new THREE.Group();
//     scene.add(terrainGroup);

//     const planeGeometry = new THREE.PlaneGeometry(1000, 1000);
//     let terrainMaterials = terrains.map((terrain, index) => {
//       const material = new THREE.MeshBasicMaterial({ color: terrain.color });
//       const plane = new THREE.Mesh(planeGeometry, material);
//       plane.position.set(0, 0, -index * 1000); // Stack terrains at different Z positions
//       terrainGroup.add(plane);
//       return plane;
//     });

//     camera.position.set(0, 100, 500); // Start with a good view of the terrain
//     camera.lookAt(new THREE.Vector3(0, 0, 0));

//     // Add a basic light to the scene
//     const light = new THREE.AmbientLight(0x404040, 2); // Ambient light
//     scene.add(light);

//     let clock = new THREE.Clock();
//     let delta = 0;
//     const moveSpeed = 0.1;
    
//     const animate = () => {
//       requestAnimationFrame(animate);
//       delta = clock.getDelta();
      
//       // Move the camera based on the timeline
//       if (currentTerrain < terrains.length - 1) {
//         camera.position.z -= moveSpeed;
//       } else {
//         camera.position.z = terrains[currentTerrain].position.z;
//       }

//       if (camera.position.z <= -currentTerrain * 1000) {
//         setCurrentTerrain(currentTerrain + 1);
//       }

//       renderer.render(scene, camera);
//     };

//     animate();

//     // Handle window resizing
//     const handleResize = () => {
//       const width = window.innerWidth;
//       const height = window.innerHeight;
//       renderer.setSize(width, height);
//       camera.aspect = width / height;
//       camera.updateProjectionMatrix();
//     };

//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//       mount.removeChild(renderer.domElement);
//     };
//   }, [currentTerrain]);

//   return (
//     <div>
//       <h2>3D Timeline</h2>
//       <div ref={mountRef} />
//     </div>
//   );
// };

// export default TimelineScene;
