import { useState, useRef, Suspense } from 'react'
import { Canvas } from "@react-three/fiber"
import { Cloud, OrbitControls, Stars } from "@react-three/drei"
import Experience from './components/Experience'
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing'
import { gsap } from 'gsap'



function App() {
  const controlsRef = useRef();
  const [controlsEnabled, setControlsEnabled] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const handleReset = () => {
    if (controlsRef.current && !isResetting) {
      const controls = controlsRef.current;
      const camera = controls.object;
      
      setIsResetting(true);
      // Disable controls during animation to prevent user interference
      controls.enabled = false;
      
      // Smoothly animate camera position back to default
      gsap.to(camera.position, {
        x: 0,
        y: 0,
        z: 16,
        duration: 1.2,
        ease: "power3.out",
        onUpdate: () => {
          controls.update();
        }
      });
      
      // Smoothly animate controls target back to center
      gsap.to(controls.target, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1.2,
        ease: "power3.out",
        onComplete: () => {
          // Restore controls enabled state to what the user chose
          controls.enabled = controlsEnabled;
          setIsResetting(false);
        }
      });
    }
  };
 
  return (
    
    <>
    <div className="canvas-container">
      <div className="controls-panel">
        <button 
          className="control-btn reset-btn" 
          onClick={handleReset}
          disabled={isResetting}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
            <path d="M16 3h5v5" />
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
            <path d="M8 21H3v-5" />
          </svg>
          Reset Viewport
        </button>
        <button 
          className={`control-btn lock-btn ${!controlsEnabled ? 'locked' : ''}`} 
          onClick={() => setControlsEnabled(!controlsEnabled)}
          disabled={isResetting}
        >
          {controlsEnabled ? (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Lock Viewport
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 9.9-1" />
              </svg>
              Unlock Viewport
            </>
          )}
        </button>
      </div>
      
        
     <Canvas camera={{ position: [0, 0, 16], fov: 55 }}>
     
   
  
      <ambientLight intensity={0.8} />
      <pointLight intensity={2} position={[0, 0, -1000]} />
      <Suspense fallback={null}>
    
            <Cloud
                position={[0,7,-20]}
                speed={0.1}
                opacity={1}
                width={8}
                depth={0.2}
                color={"#FFFFFF"}
                segments={20}
                texture='src/assets/nebula.png'
            />
            {/* <Cloud
                position={[0,7,-25]}
                speed={0.1}
                opacity={0.2}
                width={6}
                depth={1}
                color={"#FFFFFF"}
                texture='src/assets/nebula2.png'
            /> */}
            <Cloud
                position={[0,7,-25]}
                speed={0.1}
                opacity={1}
                width={6}
                depth={1}
                color={"#FFFFFF"}
                texture='src/assets/nebula3.png'
            />
              <Cloud
                position={[6,-4,-20]}
                speed={0.4}
                opacity={1}
                width={8}
                depth={0.2}
                color={"#FFFFFF"}
                segments={90}
                texture='src/assets/nebula.png'
            />
            <Cloud
                position={[6,-4,-25]}
                speed={0.4}
                opacity={1}
                width={6}
                depth={1}
                segments={10}
                color={"#FFFFFF"}
                texture='src/assets/nebula2.png'
            />
            <Cloud
                position={[6,-4,-25]}
                speed={.4}
                opacity={1}
                width={6}
                depth={1}
                segments={100}
                color={"#FFFFFF"}
                texture='src/assets/nebula3.png'
            />
              
          
   
      <Stars radius={100} depth={500} count={1000} factor={2}  fade={true} speed={1.5} />
      
       <EffectComposer>
      <Bloom
       intensity={1} 
       luminanceThreshold={0.2} 
       luminanceSmoothing={0.45} 
       mipmapBlur={true} 
      />
        <Vignette eskil={false} offset={0.1} darkness={1} />
       </EffectComposer>
       <Experience />
      </Suspense>
      {/* <Rig/> */}
      <OrbitControls ref={controlsRef} enabled={controlsEnabled} />
    </Canvas>

    </div>   
    </>
    
  
  )
}

export default App
