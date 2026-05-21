import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function HoloScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 1.1, 5.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x16f4ff, wireframe: true, transparent: true, opacity: 0.55 });
    const coreMaterial = new THREE.MeshStandardMaterial({ color: 0xff2fd6, emissive: 0x401040, metalness: 0.6, roughness: 0.18 });
    const body = new THREE.Mesh(new THREE.IcosahedronGeometry(1.05, 2), coreMaterial);
    group.add(body);

    for (let i = 0; i < 5; i += 1) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(1.45 + i * 0.22, 0.008, 16, 120), ringMaterial);
      ring.rotation.x = Math.PI / 2 + i * 0.18;
      ring.rotation.y = i * 0.35;
      group.add(ring);
    }

    const points = new THREE.BufferGeometry();
    const vertices = [];
    for (let i = 0; i < 900; i += 1) {
      vertices.push((Math.random() - 0.5) * 9, (Math.random() - 0.5) * 5, (Math.random() - 0.5) * 7);
    }
    points.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    const particleSystem = new THREE.Points(points, new THREE.PointsMaterial({ color: 0xc8ff3d, size: 0.014, transparent: true, opacity: 0.8 }));
    scene.add(particleSystem);

    scene.add(new THREE.PointLight(0x16f4ff, 35, 10));
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));

    let frame;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      group.rotation.y += 0.007;
      group.rotation.x = Math.sin(Date.now() / 1800) * 0.08;
      particleSystem.rotation.y -= 0.0015;
      renderer.render(scene, camera);
    };
    animate();

    const resize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="holo-scene" aria-label="AI digital twin hologram" />;
}
