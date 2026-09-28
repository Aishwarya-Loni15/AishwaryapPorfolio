import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeCanvas({ isDark = true }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create particle wave geometry
    const particleCount = 1200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const originalY = new Float32Array(particleCount);

    const purpleColor = new THREE.Color(isDark ? 0xa855f7 : 0x9333ea);
    const cyanColor = new THREE.Color(isDark ? 0x06b6d4 : 0x0891b2);

    let index = 0;
    const gridWidth = 40;
    const gridDepth = 30;

    for (let x = 0; x < gridWidth; x++) {
      for (let z = 0; z < gridDepth; z++) {
        const posX = (x - gridWidth / 2) * 1.6;
        const posZ = (z - gridDepth / 2) * 1.6;
        const posY = Math.sin(x * 0.3) * Math.cos(z * 0.3) * 2;

        positions[index * 3] = posX;
        positions[index * 3 + 1] = posY;
        positions[index * 3 + 2] = posZ;
        originalY[index] = posY;

        // Gradient color transition
        const mixRatio = (x / gridWidth + z / gridDepth) / 2;
        const color = purpleColor.clone().lerp(cyanColor, mixRatio);
        colors[index * 3] = color.r;
        colors[index * 3 + 1] = color.g;
        colors[index * 3 + 2] = color.b;

        index++;
      }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle texture canvas
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 16, 16);
    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 0.8,
      vertexColors: true,
      map: texture,
      transparent: true,
      opacity: isDark ? 0.75 : 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(geometry, material);
    particles.rotation.x = 0.5;
    scene.add(particles);

    // Mouse interactive tilt
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (event.clientX - windowHalfX) * 0.001;
      mouseY = (event.clientY - windowHalfY) * 0.001;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Window resize listener
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let clock = new THREE.Clock();
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      particles.rotation.y = elapsedTime * 0.08 + targetX;
      particles.rotation.x = 0.4 + targetY;

      // Dynamic wave displacement
      const posAttr = geometry.attributes.position;
      const array = posAttr.array;

      for (let i = 0; i < particleCount; i++) {
        const x = array[i * 3];
        const z = array[i * 3 + 2];
        array[i * 3 + 1] = originalY[i] + Math.sin(elapsedTime * 2 + x * 0.4 + z * 0.3) * 1.2;
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      texture.dispose();
    };
  }, [isDark]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-80"
      aria-hidden="true"
    />
  );
}
