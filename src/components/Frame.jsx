

import { useState, useRef } from "react";
import { useGLTF, MeshPortalMaterial, MeshRefractionMaterial, MeshDistortMaterial, useCursor } from "@react-three/drei";
import { useLoader, useFrame } from "@react-three/fiber";
import { RGBELoader } from "three/addons/loaders/RGBELoader";
import * as THREE from 'three'
import aerodynamicsHdr from '../assets/aerodynamics_workshop_1k.hdr';
import frameGltf from '../assets/Frame.gltf';


const Frame = (props) => {
  const { nodes, materials } = useGLTF(frameGltf);
  const [isHovered, setIsHovered] = useState(false);
  const frameGroup = useRef(null);
  const distortref = useRef()
  const [hovered, hover] = useState(false)
  useCursor(hovered)

  const textureframe = useLoader(RGBELoader, aerodynamicsHdr)
  const { texture } = props;

  useFrame((state) => {
    if (distortref.current) {
      distortref.current.distort = THREE.MathUtils.lerp(distortref.current.distort, hovered ? 0.4 : 0, hovered ? 0.05 : 0.01)
    }

    if (frameGroup.current) {
      const targetX = isHovered ? (state.pointer.y * 0.3) : 0;
      const targetY = isHovered ? (-state.pointer.x * 0.5) : 0;
      frameGroup.current.rotation.x = THREE.MathUtils.lerp(frameGroup.current.rotation.x, targetX, 0.08);
      frameGroup.current.rotation.y = THREE.MathUtils.lerp(frameGroup.current.rotation.y, targetY, 0.08);
    }
  })


  if (!nodes || !materials) {
    return null; 
  }

  const handlePointerOver = () => {
    setIsHovered(true);
  };

  const handlePointerOut = () => {
    setIsHovered(false);
  };


  return (
     <group {...props} dispose={null} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut} ref={frameGroup}>
      <group
        position={[0.001, 0.005, 2]}
        rotation={[Math.PI/2, 0, 0]}
        scale={[0.4, 0.02, 0.7]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh.geometry}
          material={materials.FRAME}
        >
          <MeshRefractionMaterial envMap={textureframe} ior={2.4} toneMapped={true} color={'#1232ff'} />
        </mesh>         
          
        <mesh
          onPointerOver={() => hover(true)} onPointerOut={() => hover(false)}
          geometry={nodes.Mesh_1.geometry}
          material={materials.FACE}
        >
          <MeshPortalMaterial  side={THREE.DoubleSide}>
          <mesh rotation={[4.6, 3.2,0]} scale={[1, 0.7, 1]}>
          <ambientLight/>
            <sphereGeometry args={[8, 64, 64]} />
            <MeshDistortMaterial ref={distortref}   speed={2} map={texture} />
          </mesh> 
          </MeshPortalMaterial>
          </mesh>
      </group>
    </group>
  );
};

useGLTF.preload(frameGltf);
export default Frame;