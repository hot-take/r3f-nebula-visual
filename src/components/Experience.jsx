import { useTexture } from "@react-three/drei";
import Frame from './Frame';



export function Experience(props) {

  const texture1 = useTexture("src/assets/bg1.jpg")
  const texture2 = useTexture("src/assets/bg2.jpg")
  const texture3 = useTexture("src/assets/bg3.jpg")
  
 
  return (
   
    <group {...props} dispose={null}>
      
          <Frame  position={[-7, 0, 0]} texture={texture1} />  
        <Frame position={[0, 0, 0]} texture={texture2} />
        <Frame position={[7, 0, 0]} texture={texture3} />
        
     
    </group>
  );
}

export default Experience;
