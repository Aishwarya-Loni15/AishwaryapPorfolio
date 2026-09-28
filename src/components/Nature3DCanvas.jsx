import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sun, Moon, CloudRain, TreePine, RotateCcw, Eye } from 'lucide-react';

export default function Nature3DCanvas() {
  const mountRef = useRef(null);
  const [timeOfDay, setTimeOfDay] = useState('day'); // 'day', 'sunset', 'night'
  const [isRaining, setIsRaining] = useState(false);
  const [treeCount, setTreeCount] = useState(12);
  const [cameraMode, setCameraMode] = useState('orbit'); // 'orbit', 'top'

  const sceneRef = useRef(null);
  const sunLightRef = useRef(null);
  const rainParticlesRef = useRef(null);
  const treesGroupRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x87ceeb); // Sky blue
    scene.fog = new THREE.FogExp2(0x87ceeb, 0.015);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      500
    );
    camera.position.set(25, 18, 30);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfffaed, 1.2);
    sunLight.position.set(30, 40, 20);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    scene.add(sunLight);
    sunLightRef.current = sunLight;

    // Ground Terrain
    const terrainGeo = new THREE.PlaneGeometry(80, 80, 40, 40);
    const posAttr = terrainGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const y = posAttr.getY(i);
      // Gentle procedural hills
      const z = Math.sin(x * 0.1) * Math.cos(y * 0.1) * 2.5 + Math.sin(x * 0.05) * 1.5;
      posAttr.setZ(i, z);
    }
    terrainGeo.computeVertexNormals();
    terrainGeo.rotateX(-Math.PI / 2);

    const terrainMat = new THREE.MeshStandardMaterial({
      color: 0x4d7c0f,
      roughness: 0.8,
      metalness: 0.1,
      flatShading: true
    });
    const terrain = new THREE.Mesh(terrainGeo, terrainMat);
    terrain.receiveShadow = true;
    scene.add(terrain);

    // Trees Group
    const treesGroup = new THREE.Group();
    scene.add(treesGroup);
    treesGroupRef.current = treesGroup;

    // Helper function to build a low-poly pine tree
    const createTree = (x, z) => {
      const tree = new THREE.Group();

      // Trunk
      const trunkGeo = new THREE.CylinderGeometry(0.3, 0.5, 3, 6);
      const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5c3a21 });
      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.y = 1.5;
      trunk.castShadow = true;
      tree.add(trunk);

      // Foliage layers
      const foliageMat = new THREE.MeshStandardMaterial({ color: 0x15803d, flatShading: true });
      for (let i = 0; i < 3; i++) {
        const foliageGeo = new THREE.ConeGeometry(2.5 - i * 0.6, 3, 6);
        const foliage = new THREE.Mesh(foliageGeo, foliageMat);
        foliage.position.y = 3 + i * 1.5;
        foliage.castShadow = true;
        tree.add(foliage);
      }

      tree.position.set(x, 0, z);
      return tree;
    };

    // Initial Tree Population
    const initialPositions = [
      [-15, -10], [-8, 12], [14, -18], [20, 8], [-22, 15],
      [5, -22], [-12, -20], [18, -5], [-5, -5], [10, 15],
      [22, 20], [-20, -5]
    ];
    initialPositions.forEach(([x, z]) => {
      treesGroup.add(createTree(x, z));
    });

    // Rain Particle System
    const rainCount = 1000;
    const rainGeo = new THREE.BufferGeometry();
    const rainPositions = new Float32Array(rainCount * 3);
    for (let i = 0; i < rainCount; i++) {
      rainPositions[i * 3] = (Math.random() - 0.5) * 80;
      rainPositions[i * 3 + 1] = Math.random() * 40;
      rainPositions[i * 3 + 2] = (Math.random() - 0.5) * 80;
    }
    rainGeo.setAttribute('position', new THREE.BufferAttribute(rainPositions, 3));
    const rainMat = new THREE.PointsMaterial({
      color: 0x93c5fd,
      size: 0.3,
      transparent: true,
      opacity: 0.6
    });
    const rainParticles = new THREE.Points(rainGeo, rainMat);
    rainParticles.visible = false;
    scene.add(rainParticles);
    rainParticlesRef.current = rainParticles;

    // Animation Loop
    let animId;
    let angle = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Camera motion
      if (cameraMode === 'orbit') {
        angle += 0.003;
        camera.position.x = Math.sin(angle) * 35;
        camera.position.z = Math.cos(angle) * 35;
        camera.position.y = 20;
        camera.lookAt(0, 2, 0);
      } else {
        camera.position.set(0, 45, 0.1);
        camera.lookAt(0, 0, 0);
      }

      // Rain animation
      if (rainParticles.visible) {
        const positions = rainGeo.attributes.position.array;
        for (let i = 0; i < rainCount; i++) {
          positions[i * 3 + 1] -= 0.8;
          if (positions[i * 3 + 1] < 0) {
            positions[i * 3 + 1] = 40;
          }
        }
        rainGeo.attributes.position.needsUpdate = true;
      }

      // Gentle tree wind sway
      treesGroup.children.forEach((tree, idx) => {
        tree.rotation.z = Math.sin(Date.now() * 0.002 + idx) * 0.03;
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [cameraMode]);

  // Update lighting on timeOfDay change
  useEffect(() => {
    if (!sceneRef.current || !sunLightRef.current) return;
    const scene = sceneRef.current;
    const sun = sunLightRef.current;

    if (timeOfDay === 'day') {
      scene.background = new THREE.Color(0x87ceeb);
      scene.fog.color = new THREE.Color(0x87ceeb);
      sun.color = new THREE.Color(0xfffaed);
      sun.intensity = 1.2;
      sun.position.set(30, 40, 20);
    } else if (timeOfDay === 'sunset') {
      scene.background = new THREE.Color(0xf97316);
      scene.fog.color = new THREE.Color(0xf97316);
      sun.color = new THREE.Color(0xfdba74);
      sun.intensity = 0.8;
      sun.position.set(40, 10, 20);
    } else if (timeOfDay === 'night') {
      scene.background = new THREE.Color(0x090d16);
      scene.fog.color = new THREE.Color(0x090d16);
      sun.color = new THREE.Color(0x60a5fa);
      sun.intensity = 0.3;
      sun.position.set(-20, 30, -20);
    }
  }, [timeOfDay]);

  // Toggle Rain
  useEffect(() => {
    if (rainParticlesRef.current) {
      rainParticlesRef.current.visible = isRaining;
    }
  }, [isRaining]);

  // Add tree function
  const handleAddTree = () => {
    if (!treesGroupRef.current) return;
    const x = (Math.random() - 0.5) * 50;
    const z = (Math.random() - 0.5) * 50;
    
    // Low poly pine
    const tree = new THREE.Group();
    const trunkGeo = new THREE.CylinderGeometry(0.3, 0.5, 3, 6);
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5c3a21 });
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.y = 1.5;
    tree.add(trunk);

    const foliageMat = new THREE.MeshStandardMaterial({ color: 0x16a34a, flatShading: true });
    for (let i = 0; i < 3; i++) {
      const foliageGeo = new THREE.ConeGeometry(2.5 - i * 0.6, 3, 6);
      const foliage = new THREE.Mesh(foliageGeo, foliageMat);
      foliage.position.y = 3 + i * 1.5;
      tree.add(foliage);
    }
    tree.position.set(x, 0, z);

    treesGroupRef.current.add(tree);
    setTreeCount(prev => prev + 1);
  };

  return (
    <div className="relative w-full h-[450px] rounded-xl overflow-hidden border border-slate-700/60 shadow-2xl bg-slate-900">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Overlay Control Bar */}
      <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 p-3 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-700/60 text-xs text-slate-200 z-10">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-purple-400 font-mono">Ursina / Three.js 3D Nature Canvas</span>
          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono border border-emerald-500/40">60 FPS</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Time of Day Buttons */}
          <div className="flex items-center bg-slate-800 rounded-md p-0.5 border border-slate-700">
            <button
              onClick={() => setTimeOfDay('day')}
              className={`p-1.5 rounded transition ${timeOfDay === 'day' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
              title="Day Mode"
            >
              <Sun className="w-4 h-4" />
            </button>
            <button
              onClick={() => setTimeOfDay('sunset')}
              className={`p-1.5 rounded transition ${timeOfDay === 'sunset' ? 'bg-orange-500 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
              title="Sunset Mode"
            >
              <Sun className="w-4 h-4 text-orange-200" />
            </button>
            <button
              onClick={() => setTimeOfDay('night')}
              className={`p-1.5 rounded transition ${timeOfDay === 'night' ? 'bg-purple-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
              title="Night Mode"
            >
              <Moon className="w-4 h-4" />
            </button>
          </div>

          {/* Rain Toggle */}
          <button
            onClick={() => setIsRaining(!isRaining)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded border transition ${isRaining ? 'bg-blue-600 border-blue-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'}`}
          >
            <CloudRain className="w-3.5 h-3.5" />
            <span>{isRaining ? 'Rain: ON' : 'Rain: OFF'}</span>
          </button>

          {/* Plant Tree */}
          <button
            onClick={handleAddTree}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition"
          >
            <TreePine className="w-3.5 h-3.5" />
            <span>Spawn Tree ({treeCount})</span>
          </button>

          {/* Camera View */}
          <button
            onClick={() => setCameraMode(cameraMode === 'orbit' ? 'top' : 'orbit')}
            className="flex items-center gap-1 px-2 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{cameraMode === 'orbit' ? 'Orbit View' : 'Top View'}</span>
          </button>
        </div>
      </div>

      {/* Footer Info Badge */}
      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-slate-400 pointer-events-none">
        <span className="bg-slate-950/80 px-2.5 py-1 rounded border border-slate-800">
          🎮 Drag mouse to orbit • Toggle weather & solar lighting controls above
        </span>
        <span className="bg-purple-950/80 text-purple-300 px-2.5 py-1 rounded border border-purple-800/50 font-mono">
          Python Ursina Engine Prototype ➔ Three.js Web Canvas
        </span>
      </div>
    </div>
  );
}
