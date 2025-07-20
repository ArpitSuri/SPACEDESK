// src/App.js
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import '../App.css';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

const GlobleWitheSatellite = () => {
    const mountRef = useRef(null);
    const [hoveredSatellite, setHoveredSatellite] = useState(null);
    const [satellites, setSatellites] = useState([]);

    // Mock satellite data
    useEffect(() => {
        const mockData = [
            {
                "name": "ISS",
                "norad_id": 25544,
                "agency": "NASA",
                "color": "#FF5733",
                "path": [
                    { "timestamp": "t0", "lat": 0, "lon": 0, "alt": 408 },
                    { "timestamp": "t1", "lat": 5, "lon": 15, "alt": 408 },
                    { "timestamp": "t2", "lat": 10, "lon": 30, "alt": 408 },
                    { "timestamp": "t3", "lat": 15, "lon": 45, "alt": 408 },
                    { "timestamp": "t4", "lat": 20, "lon": 60, "alt": 408 },
                    { "timestamp": "t5", "lat": 25, "lon": 75, "alt": 408 },
                    { "timestamp": "t6", "lat": 30, "lon": 90, "alt": 408 },
                    { "timestamp": "t7", "lat": 35, "lon": 105, "alt": 408 },
                    { "timestamp": "t8", "lat": 40, "lon": 120, "alt": 408 },
                    { "timestamp": "t9", "lat": 45, "lon": 135, "alt": 408 },
                    { "timestamp": "t10", "lat": 50, "lon": 150, "alt": 408 },
                    { "timestamp": "t11", "lat": 45, "lon": 165, "alt": 408 },
                    { "timestamp": "t12", "lat": 40, "lon": -180, "alt": 408 },
                    { "timestamp": "t13", "lat": 35, "lon": -165, "alt": 408 },
                    { "timestamp": "t14", "lat": 30, "lon": -150, "alt": 408 },
                    { "timestamp": "t15", "lat": 25, "lon": -135, "alt": 408 },
                    { "timestamp": "t16", "lat": 20, "lon": -120, "alt": 408 },
                    { "timestamp": "t17", "lat": 15, "lon": -105, "alt": 408 },
                    { "timestamp": "t18", "lat": 10, "lon": -90, "alt": 408 },
                    { "timestamp": "t19", "lat": 5, "lon": -75, "alt": 408 }
                ]
            },
            {
                "name": "Starlink-1001",
                "norad_id": 45001,
                "agency": "SpaceX",
                "color": "#1E90FF",
                "path": [
                    { "timestamp": "t0", "lat": 10, "lon": 5, "alt": 550 },
                    { "timestamp": "t1", "lat": 15, "lon": 20, "alt": 550 },
                    { "timestamp": "t2", "lat": 20, "lon": 35, "alt": 550 },
                    { "timestamp": "t3", "lat": 25, "lon": 50, "alt": 550 },
                    { "timestamp": "t4", "lat": 30, "lon": 65, "alt": 550 },
                    { "timestamp": "t5", "lat": 35, "lon": 80, "alt": 550 },
                    { "timestamp": "t6", "lat": 40, "lon": 95, "alt": 550 },
                    { "timestamp": "t7", "lat": 45, "lon": 110, "alt": 550 },
                    { "timestamp": "t8", "lat": 50, "lon": 125, "alt": 550 },
                    { "timestamp": "t9", "lat": 55, "lon": 140, "alt": 550 },
                    { "timestamp": "t10", "lat": 60, "lon": 155, "alt": 550 },
                    { "timestamp": "t11", "lat": 55, "lon": 170, "alt": 550 },
                    { "timestamp": "t12", "lat": 50, "lon": -175, "alt": 550 },
                    { "timestamp": "t13", "lat": 45, "lon": -160, "alt": 550 },
                    { "timestamp": "t14", "lat": 40, "lon": -145, "alt": 550 },
                    { "timestamp": "t15", "lat": 35, "lon": -130, "alt": 550 },
                    { "timestamp": "t16", "lat": 30, "lon": -115, "alt": 550 },
                    { "timestamp": "t17", "lat": 25, "lon": -100, "alt": 550 },
                    { "timestamp": "t18", "lat": 20, "lon": -85, "alt": 550 },
                    { "timestamp": "t19", "lat": 15, "lon": -70, "alt": 550 }
                ]
            },
            {
                "name": "Terra",
                "norad_id": 25994,
                "agency": "NASA",
                "color": "#32CD32",
                "path": [
                    { "timestamp": "t0", "lat": -10, "lon": 10, "alt": 705 },
                    { "timestamp": "t1", "lat": -5, "lon": 25, "alt": 705 },
                    { "timestamp": "t2", "lat": 0, "lon": 40, "alt": 705 },
                    { "timestamp": "t3", "lat": 5, "lon": 55, "alt": 705 },
                    { "timestamp": "t4", "lat": 10, "lon": 70, "alt": 705 },
                    { "timestamp": "t5", "lat": 15, "lon": 85, "alt": 705 },
                    { "timestamp": "t6", "lat": 20, "lon": 100, "alt": 705 },
                    { "timestamp": "t7", "lat": 25, "lon": 115, "alt": 705 },
                    { "timestamp": "t8", "lat": 30, "lon": 130, "alt": 705 },
                    { "timestamp": "t9", "lat": 35, "lon": 145, "alt": 705 },
                    { "timestamp": "t10", "lat": 40, "lon": 160, "alt": 705 },
                    { "timestamp": "t11", "lat": 35, "lon": 175, "alt": 705 },
                    { "timestamp": "t12", "lat": 30, "lon": -170, "alt": 705 },
                    { "timestamp": "t13", "lat": 25, "lon": -155, "alt": 705 },
                    { "timestamp": "t14", "lat": 20, "lon": -140, "alt": 705 },
                    { "timestamp": "t15", "lat": 15, "lon": -125, "alt": 705 },
                    { "timestamp": "t16", "lat": 10, "lon": -110, "alt": 705 },
                    { "timestamp": "t17", "lat": 5, "lon": -95, "alt": 705 },
                    { "timestamp": "t18", "lat": 0, "lon": -80, "alt": 705 },
                    { "timestamp": "t19", "lat": -5, "lon": -65, "alt": 705 }
                ]
            },
            {
                "name": "Sentinel-2A",
                "norad_id": 40697,
                "agency": "ESA",
                "color": "#FF1493",
                "path": [
                    { "timestamp": "t0", "lat": -20, "lon": -10, "alt": 786 },
                    { "timestamp": "t1", "lat": -15, "lon": 5, "alt": 786 },
                    { "timestamp": "t2", "lat": -10, "lon": 20, "alt": 786 },
                    { "timestamp": "t3", "lat": -5, "lon": 35, "alt": 786 },
                    { "timestamp": "t4", "lat": 0, "lon": 50, "alt": 786 },
                    { "timestamp": "t5", "lat": 5, "lon": 65, "alt": 786 },
                    { "timestamp": "t6", "lat": 10, "lon": 80, "alt": 786 },
                    { "timestamp": "t7", "lat": 15, "lon": 95, "alt": 786 },
                    { "timestamp": "t8", "lat": 20, "lon": 110, "alt": 786 },
                    { "timestamp": "t9", "lat": 25, "lon": 125, "alt": 786 },
                    { "timestamp": "t10", "lat": 30, "lon": 140, "alt": 786 },
                    { "timestamp": "t11", "lat": 25, "lon": 155, "alt": 786 },
                    { "timestamp": "t12", "lat": 20, "lon": -160, "alt": 786 },
                    { "timestamp": "t13", "lat": 15, "lon": -145, "alt": 786 },
                    { "timestamp": "t14", "lat": 10, "lon": -130, "alt": 786 },
                    { "timestamp": "t15", "lat": 5, "lon": -115, "alt": 786 },
                    { "timestamp": "t16", "lat": 0, "lon": -100, "alt": 786 },
                    { "timestamp": "t17", "lat": -5, "lon": -85, "alt": 786 },
                    { "timestamp": "t18", "lat": -10, "lon": -70, "alt": 786 },
                    { "timestamp": "t19", "lat": -15, "lon": -55, "alt": 786 }
                ]
            },
              {
    "name": "Landsat-8",
    "norad_id": 39084,
    "agency": "USGS/NASA",
    "color": "#8A2BE2",
    "path": [
      { "timestamp": "t0", "lat": -15, "lon": 10, "alt": 705 },
      { "timestamp": "t1", "lat": -10, "lon": 25, "alt": 705 },
      { "timestamp": "t2", "lat": -5, "lon": 40, "alt": 705 },
      { "timestamp": "t3", "lat": 0, "lon": 55, "alt": 705 },
      { "timestamp": "t4", "lat": 5, "lon": 70, "alt": 705 },
      { "timestamp": "t5", "lat": 10, "lon": 85, "alt": 705 },
      { "timestamp": "t6", "lat": 15, "lon": 100, "alt": 705 },
      { "timestamp": "t7", "lat": 20, "lon": 115, "alt": 705 },
      { "timestamp": "t8", "lat": 25, "lon": 130, "alt": 705 },
      { "timestamp": "t9", "lat": 30, "lon": 145, "alt": 705 },
      { "timestamp": "t10", "lat": 25, "lon": 160, "alt": 705 },
      { "timestamp": "t11", "lat": 20, "lon": -175, "alt": 705 },
      { "timestamp": "t12", "lat": 15, "lon": -160, "alt": 705 },
      { "timestamp": "t13", "lat": 10, "lon": -145, "alt": 705 },
      { "timestamp": "t14", "lat": 5, "lon": -130, "alt": 705 },
      { "timestamp": "t15", "lat": 0, "lon": -115, "alt": 705 },
      { "timestamp": "t16", "lat": -5, "lon": -100, "alt": 705 },
      { "timestamp": "t17", "lat": -10, "lon": -85, "alt": 705 },
      { "timestamp": "t18", "lat": -15, "lon": -70, "alt": 705 },
      { "timestamp": "t19", "lat": -20, "lon": -55, "alt": 705 }
    ]
  },
  {
    "name": "Hubble",
    "norad_id": 20580,
    "agency": "NASA/ESA",
    "color": "#FFD700",
    "path": [
      { "timestamp": "t0", "lat": 0, "lon": 0, "alt": 540 },
      { "timestamp": "t1", "lat": 5, "lon": 20, "alt": 540 },
      { "timestamp": "t2", "lat": 10, "lon": 40, "alt": 540 },
      { "timestamp": "t3", "lat": 15, "lon": 60, "alt": 540 },
      { "timestamp": "t4", "lat": 20, "lon": 80, "alt": 540 },
      { "timestamp": "t5", "lat": 25, "lon": 100, "alt": 540 },
      { "timestamp": "t6", "lat": 30, "lon": 120, "alt": 540 },
      { "timestamp": "t7", "lat": 35, "lon": 140, "alt": 540 },
      { "timestamp": "t8", "lat": 30, "lon": 160, "alt": 540 },
      { "timestamp": "t9", "lat": 25, "lon": -180, "alt": 540 },
      { "timestamp": "t10", "lat": 20, "lon": -160, "alt": 540 },
      { "timestamp": "t11", "lat": 15, "lon": -140, "alt": 540 },
      { "timestamp": "t12", "lat": 10, "lon": -120, "alt": 540 },
      { "timestamp": "t13", "lat": 5, "lon": -100, "alt": 540 },
      { "timestamp": "t14", "lat": 0, "lon": -80, "alt": 540 },
      { "timestamp": "t15", "lat": -5, "lon": -60, "alt": 540 },
      { "timestamp": "t16", "lat": -10, "lon": -40, "alt": 540 },
      { "timestamp": "t17", "lat": -15, "lon": -20, "alt": 540 },
      { "timestamp": "t18", "lat": -10, "lon": 0, "alt": 540 },
      { "timestamp": "t19", "lat": -5, "lon": 20, "alt": 540 }
    ]
  },
  {
    "name": "Envisat",
    "norad_id": 27386,
    "agency": "ESA",
    "color": "#DC143C",
    "path": [
      { "timestamp": "t0", "lat": -30, "lon": 0, "alt": 790 },
      { "timestamp": "t1", "lat": -25, "lon": 15, "alt": 790 },
      { "timestamp": "t2", "lat": -20, "lon": 30, "alt": 790 },
      { "timestamp": "t3", "lat": -15, "lon": 45, "alt": 790 },
      { "timestamp": "t4", "lat": -10, "lon": 60, "alt": 790 },
      { "timestamp": "t5", "lat": -5, "lon": 75, "alt": 790 },
      { "timestamp": "t6", "lat": 0, "lon": 90, "alt": 790 },
      { "timestamp": "t7", "lat": 5, "lon": 105, "alt": 790 },
      { "timestamp": "t8", "lat": 10, "lon": 120, "alt": 790 },
      { "timestamp": "t9", "lat": 15, "lon": 135, "alt": 790 },
      { "timestamp": "t10", "lat": 20, "lon": 150, "alt": 790 },
      { "timestamp": "t11", "lat": 15, "lon": -165, "alt": 790 },
      { "timestamp": "t12", "lat": 10, "lon": -150, "alt": 790 },
      { "timestamp": "t13", "lat": 5, "lon": -135, "alt": 790 },
      { "timestamp": "t14", "lat": 0, "lon": -120, "alt": 790 },
      { "timestamp": "t15", "lat": -5, "lon": -105, "alt": 790 },
      { "timestamp": "t16", "lat": -10, "lon": -90, "alt": 790 },
      { "timestamp": "t17", "lat": -15, "lon": -75, "alt": 790 },
      { "timestamp": "t18", "lat": -20, "lon": -60, "alt": 790 },
      { "timestamp": "t19", "lat": -25, "lon": -45, "alt": 790 }
    ]
  },
  {
    "name": "Cartosat-2",
    "norad_id": 29710,
    "agency": "ISRO",
    "color": "#00CED1",
    "path": [
      { "timestamp": "t0", "lat": 5, "lon": 10, "alt": 630 },
      { "timestamp": "t1", "lat": 10, "lon": 25, "alt": 630 },
      { "timestamp": "t2", "lat": 15, "lon": 40, "alt": 630 },
      { "timestamp": "t3", "lat": 20, "lon": 55, "alt": 630 },
      { "timestamp": "t4", "lat": 25, "lon": 70, "alt": 630 },
      { "timestamp": "t5", "lat": 30, "lon": 85, "alt": 630 },
      { "timestamp": "t6", "lat": 35, "lon": 100, "alt": 630 },
      { "timestamp": "t7", "lat": 40, "lon": 115, "alt": 630 },
      { "timestamp": "t8", "lat": 35, "lon": 130, "alt": 630 },
      { "timestamp": "t9", "lat": 30, "lon": 145, "alt": 630 },
      { "timestamp": "t10", "lat": 25, "lon": 160, "alt": 630 },
      { "timestamp": "t11", "lat": 20, "lon": -175, "alt": 630 },
      { "timestamp": "t12", "lat": 15, "lon": -160, "alt": 630 },
      { "timestamp": "t13", "lat": 10, "lon": -145, "alt": 630 },
      { "timestamp": "t14", "lat": 5, "lon": -130, "alt": 630 },
      { "timestamp": "t15", "lat": 0, "lon": -115, "alt": 630 },
      { "timestamp": "t16", "lat": -5, "lon": -100, "alt": 630 },
      { "timestamp": "t17", "lat": -10, "lon": -85, "alt": 630 },
      { "timestamp": "t18", "lat": -15, "lon": -70, "alt": 630 },
      { "timestamp": "t19", "lat": -20, "lon": -55, "alt": 630 }
    ]
  },
  {
    "name": "NOAA-20",
    "norad_id": 43013,
    "agency": "NOAA",
    "color": "#228B22",
    "path": [
      { "timestamp": "t0", "lat": -10, "lon": 0, "alt": 824 },
      { "timestamp": "t1", "lat": -5, "lon": 18, "alt": 824 },
      { "timestamp": "t2", "lat": 0, "lon": 36, "alt": 824 },
      { "timestamp": "t3", "lat": 5, "lon": 54, "alt": 824 },
      { "timestamp": "t4", "lat": 10, "lon": 72, "alt": 824 },
      { "timestamp": "t5", "lat": 15, "lon": 90, "alt": 824 },
      { "timestamp": "t6", "lat": 20, "lon": 108, "alt": 824 },
      { "timestamp": "t7", "lat": 25, "lon": 126, "alt": 824 },
      { "timestamp": "t8", "lat": 30, "lon": 144, "alt": 824 },
      { "timestamp": "t9", "lat": 35, "lon": 162, "alt": 824 },
      { "timestamp": "t10", "lat": 30, "lon": -176, "alt": 824 },
      { "timestamp": "t11", "lat": 25, "lon": -158, "alt": 824 },
      { "timestamp": "t12", "lat": 20, "lon": -140, "alt": 824 },
      { "timestamp": "t13", "lat": 15, "lon": -122, "alt": 824 },
      { "timestamp": "t14", "lat": 10, "lon": -104, "alt": 824 },
      { "timestamp": "t15", "lat": 5, "lon": -86, "alt": 824 },
      { "timestamp": "t16", "lat": 0, "lon": -68, "alt": 824 },
      { "timestamp": "t17", "lat": -5, "lon": -50, "alt": 824 },
      { "timestamp": "t18", "lat": -10, "lon": -32, "alt": 824 },
      { "timestamp": "t19", "lat": -15, "lon": -14, "alt": 824 }
    ]
  },
  {
    "name": "Tiangong",
    "norad_id": 48274,
    "agency": "CNSA",
    "color": "#FF8C00",
    "path": [
      { "timestamp": "t0", "lat": 0, "lon": 10, "alt": 390 },
      { "timestamp": "t1", "lat": 5, "lon": 30, "alt": 390 },
      { "timestamp": "t2", "lat": 10, "lon": 50, "alt": 390 },
      { "timestamp": "t3", "lat": 15, "lon": 70, "alt": 390 },
      { "timestamp": "t4", "lat": 20, "lon": 90, "alt": 390 },
      { "timestamp": "t5", "lat": 25, "lon": 110, "alt": 390 },
      { "timestamp": "t6", "lat": 30, "lon": 130, "alt": 390 },
      { "timestamp": "t7", "lat": 35, "lon": 150, "alt": 390 },
      { "timestamp": "t8", "lat": 30, "lon": -170, "alt": 390 },
      { "timestamp": "t9", "lat": 25, "lon": -150, "alt": 390 },
      { "timestamp": "t10", "lat": 20, "lon": -130, "alt": 390 },
      { "timestamp": "t11", "lat": 15, "lon": -110, "alt": 390 },
      { "timestamp": "t12", "lat": 10, "lon": -90, "alt": 390 },
      { "timestamp": "t13", "lat": 5, "lon": -70, "alt": 390 },
      { "timestamp": "t14", "lat": 0, "lon": -50, "alt": 390 },
      { "timestamp": "t15", "lat": -5, "lon": -30, "alt": 390 },
      { "timestamp": "t16", "lat": -10, "lon": -10, "alt": 390 },
      { "timestamp": "t17", "lat": -15, "lon": 10, "alt": 390 },
      { "timestamp": "t18", "lat": -10, "lon": 30, "alt": 390 },
      { "timestamp": "t19", "lat": -5, "lon": 50, "alt": 390 }
    ]
  }
        ];
        setSatellites(mockData);
    }, []);


    useEffect(() => {
        if (!mountRef.current || satellites.length === 0) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        mountRef.current.appendChild(renderer.domElement);

        const EARTH_RADIUS = 20;
        const EARTH_ROTATION_SPEED = 0.0005;
        camera.position.z = 40;

        const earthGeometry = new THREE.SphereGeometry(EARTH_RADIUS, 128 , 128);
        const earthTexture = new THREE.TextureLoader().load('https://threejs.org/examples/textures/land_ocean_ice_cloud_2048.jpg');
        const earthMaterial = new THREE.MeshPhongMaterial({ map: earthTexture, shininess: 10 });
        const earth = new THREE.Mesh(earthGeometry, earthMaterial);
        scene.add(earth);

        const cloudGeometry = new THREE.SphereGeometry(EARTH_RADIUS + 0.05, 64, 64);
        const cloudTexture = new THREE.TextureLoader().load('https://threejs.org/examples/textures/planets/earth_clouds_1024.png');
        const cloudMaterial = new THREE.MeshPhongMaterial({ map: cloudTexture, transparent: true, opacity: 0.4 });
        const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
        scene.add(clouds);

        const starGeometry = new THREE.BufferGeometry();
        const starVertices = [];
        for (let i = 0; i < 5000; i++) {
            const theta = 2 * Math.PI * Math.random();
            const phi = Math.acos(2 * Math.random() - 1);
            const radius = 500 * Math.random() + 50;
            starVertices.push(
                radius * Math.sin(phi) * Math.cos(theta),
                radius * Math.sin(phi) * Math.sin(theta),
                radius * Math.cos(phi)
            );
        }
        starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
        const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.7, sizeAttenuation: false });
        const stars = new THREE.Points(starGeometry, starMaterial);
        scene.add(stars);

        const ambientLight = new THREE.AmbientLight(0x888888);
        scene.add(ambientLight);
        const sunLight = new THREE.DirectionalLight(0xffffff, 1.2);
        sunLight.position.set(5, 3, 5);
        scene.add(sunLight);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.rotateSpeed = 0.5;

        const geoTo3D = (lat, lon, alt) => {
            const rad = (EARTH_RADIUS+0.2) + alt / 1000;
            const latRad = THREE.MathUtils.degToRad(lat);
            const lonRad = THREE.MathUtils.degToRad(lon);
            return new THREE.Vector3(
                rad * Math.cos(latRad) * Math.cos(lonRad),
                rad * Math.sin(latRad),
                rad * Math.cos(latRad) * Math.sin(lonRad)
            );
        };

        

        const satelliteObjects = [];

        satellites.forEach(satellite => {
            const orbitPoints = satellite.path.map(p => geoTo3D(p.lat, p.lon, p.alt));

            const orbitGeometry = new THREE.BufferGeometry().setFromPoints(orbitPoints);
            const orbitMaterial = new THREE.LineBasicMaterial({
                color: satellite.color || 0x00ff00,
                transparent: true,
                opacity: 1
            });
            const orbit = new THREE.Line(orbitGeometry, orbitMaterial);
            scene.add(orbit);

            const satGeometry = new THREE.SphereGeometry(0.2, 16, 16);
            const satMaterial = new THREE.MeshPhongMaterial({
                color: satellite.color || 0xff0000,
                emissive: satellite.color || 0xff0000,
                emissiveIntensity: 0.5
            });
            const satMarker = new THREE.Mesh(satGeometry, satMaterial);
            const initialPoint = satellite.path[0];
            satMarker.position.copy(geoTo3D(initialPoint.lat, initialPoint.lon, initialPoint.alt));

            const glowGeometry = new THREE.SphereGeometry(0.2, 32, 32);
            const glowMaterial = new THREE.MeshBasicMaterial({ color: satellite.color || 0xff0000, transparent: true, opacity: 0.3 });
            const glow = new THREE.Mesh(glowGeometry, glowMaterial);
            satMarker.add(glow);
            scene.add(satMarker);

            satelliteObjects.push({
                name: satellite.name,
                norad_id: satellite.norad_id,
                agency: satellite.agency,
                marker: satMarker,
                path: satellite.path,
                currentIndex: 0,
                orbit: orbit,
                object: satMarker
            });
        });

        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        const handleMouseMove = (event) => {
            const bounds = mountRef.current.getBoundingClientRect();
            mouse.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
            mouse.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(satelliteObjects.map(s => s.object), true);

            if (intersects.length > 0) {
                const satObject = satelliteObjects.find(s => intersects[0].object === s.object);
                if (satObject) {
                    setHoveredSatellite({
                        name: satObject.name,
                        norad_id: satObject.norad_id,
                        agency: satObject.agency,
                        position: satObject.path[satObject.currentIndex]
                    });
                    satObject.object.material.emissiveIntensity = 1;
                    satObject.object.scale.set(1.5, 1.5, 1.5);
                }
            } else {
                setHoveredSatellite(null);
                satelliteObjects.forEach(s => {
                    s.object.material.emissiveIntensity = 0.5;
                    s.object.scale.set(1, 1, 1);
                });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        let animationFrameId;
        let frameCount = 0;

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            earth.rotation.y += EARTH_ROTATION_SPEED;
            clouds.rotation.y += EARTH_ROTATION_SPEED * 1.1;

            if (frameCount % 20 === 0) {
                satelliteObjects.forEach(sat => {
                    sat.currentIndex = (sat.currentIndex + 1) % sat.path.length;
                    const point = sat.path[sat.currentIndex];
                    sat.object.position.copy(geoTo3D(point.lat, point.lon, point.alt));
                });
            }
            frameCount++;

            controls.update();
            renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
            camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
            if (mountRef.current && renderer?.domElement?.parentNode === mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
        };
    }, [satellites]);




    return (
        <div className="flex flex-col h-screen bg-black text-white">
            <header className="p-4 bg-black">
                <h1 className="text-2xl font-bold text-center">Earth Satellite Tracker</h1>
            </header>

            <div className="flex flex-1 overflow-hidden">
                <div
                    ref={mountRef}
                    className="flex-grow relative"
                />
                

                <div className="w-80 bg-black  overflow-y-auto">
                    <div className="p-4">
                        <div className=" p-3 bg-gray-900 rounded-lg">
                            <h3 className="font-semibold mb-2">Controls</h3>
                            <ul className="text-sm space-y-1">
                                <li>• Left click + drag: Rotate Earth</li>
                                <li>• Right click + drag: Pan view</li>
                                <li>• Scroll: Zoom in/out</li>
                            </ul>
                        </div>
                        <h3 className="text-lg font-semibold mt-6 mb-3">Tracked Satellites</h3>
                        <div className="space-y-3">
                            {satellites.map(satellite => (
                                <div
                                    key={satellite.norad_id}
                                    className="bg-gray-900 rounded-lg p-3 cursor-pointer hover:bg-gray-600 transition-colors"
                                    onMouseEnter={() => {
                                        const satObj = satelliteObjects?.find(s => s.name === satellite.name);
                                        if (satObj) {
                                            setHoveredSatellite({
                                                name: satObj.name,
                                                norad_id: satObj.norad_id,
                                                agency: satObj.agency,
                                                position: satObj.path[satObj.currentIndex]
                                            });
                                        }
                                    }}
                                >
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: satellite.color }}></div>
                                        <span className="font-medium">{satellite.name}</span>
                                        <span className="ml-auto text-gray-400 text-sm">{satellite.agency}</span>
                                    </div>
                                </div>
                            ))}
                        </div>


                    </div>
                </div>
            </div>

            <footer className="p-3 bg-black  text-center text-sm text-gray-400">
                Earth Satellite Visualization | Real-time satellite tracking simulation
            </footer>
        </div>
    );
};

export default GlobleWitheSatellite;