"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Define major cities/countries for connections
const LOCATIONS = {
  INDIA: { lat: 20.5937, lng: 78.9629, name: "India" },
  USA_SF: { lat: 37.7749, lng: -122.4194, name: "San Francisco" },
  USA_NY: { lat: 40.7128, lng: -74.006, name: "New York" },
  UK: { lat: 51.5074, lng: -0.1278, name: "London" },
  JAPAN: { lat: 35.6762, lng: 139.6503, name: "Tokyo" },
  AUSTRALIA: { lat: -33.8688, lng: 151.2093, name: "Sydney" },
  CHINA: { lat: 31.2304, lng: 121.4737, name: "Shanghai" },
  SINGAPORE: { lat: 1.3521, lng: 103.8198, name: "Singapore" },
  UAE: { lat: 25.2048, lng: 55.2708, name: "Dubai" },
  GERMANY: { lat: 52.52, lng: 13.405, name: "Berlin" },
  BRAZIL: { lat: -23.5505, lng: -46.6333, name: "São Paulo" },
  CANADA: { lat: 43.6532, lng: -79.3832, name: "Toronto" },
  FRANCE: { lat: 48.8566, lng: 2.3522, name: "Paris" },
  RUSSIA: { lat: 55.7558, lng: 37.6173, name: "Moscow" },
  SOUTHAFRICA: { lat: -33.9249, lng: 18.4241, name: "Cape Town" },
};

const GlobeBackground = () => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(new THREE.Scene());
  const controlsRef = useRef(null);
  const arcsRef = useRef([]);
  const markersRef = useRef([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scene = sceneRef.current;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(-10, 5, 15);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      logarithmicDepthBuffer: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000014, 1);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.3;
    controlsRef.current = controls;

    // Add stars background
    const starGeometry = new THREE.BufferGeometry();
    const starVertices = [];
    for (let i = 0; i < 10000; i++) {
      starVertices.push((Math.random() - 0.5) * 2000, (Math.random() - 0.5) * 2000, (Math.random() - 0.5) * 2000);
    }
    starGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 }));
    scene.add(stars);

    // Globe setup
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(5, 128, 128),
      new THREE.MeshPhongMaterial({ color: 0x0066ff, emissive: 0x000033, transparent: true, opacity: 0.9 })
    );
    scene.add(sphere);

    // Create location markers
    const latLngToVector3 = (lat, lng, radius) => {
      const phi = THREE.MathUtils.degToRad(90 - lat);
      const theta = THREE.MathUtils.degToRad(lng + 180);
      return new THREE.Vector3(radius * Math.sin(phi) * Math.cos(theta), radius * Math.cos(phi), radius * Math.sin(phi) * Math.sin(theta));
    };

    Object.values(LOCATIONS).forEach((location) => {
      const marker = new THREE.Mesh(
        new THREE.SphereGeometry(0.05, 16, 16),
        new THREE.MeshPhongMaterial({ color: location.name === "India" ? 0xff1493 : 0x4a9eff, emissive: 0x4a9eff })
      );
      marker.position.copy(latLngToVector3(location.lat, location.lng, 5.2));
      scene.add(marker);
      markersRef.current.push(marker);
    });

    // Lighting setup
    scene.add(new THREE.AmbientLight(0x404040, 2));
    const directionalLight = new THREE.DirectionalLight(0x4a9eff, 3);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      stars.rotation.y += 0.0001;
      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      controls.dispose();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 w-full h-screen bg-[#000014]" />;
};

export default GlobeBackground;
