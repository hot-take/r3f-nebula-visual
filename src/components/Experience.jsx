import { useTexture } from "@react-three/drei";
import Frame from './Frame';
import bg1 from '../assets/bg1.jpg';
import bg2 from '../assets/bg2.jpg';
import bg3 from '../assets/bg3.jpg';



export function Experience(props) {

  const texture1 = useTexture(bg1)
  const texture2 = useTexture(bg2)
  const texture3 = useTexture(bg3)
  
 
  return (
   
    <group {...props} dispose={null}>
      
          <Frame  position={[-7, 0, 0]} texture={texture1} />  
        <Frame position={[0, 0, 0]} texture={texture2} />
        <Frame position={[7, 0, 0]} texture={texture3} />
        
     
    </group>
  );
}

export default Experience;
