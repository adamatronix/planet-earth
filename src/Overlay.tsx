import { useTexture } from '@react-three/drei';
import earthMap from './assets/earth-map.png';

interface OverlayProps {
}

export const Overlay = ({
  ...props
}: OverlayProps) => {
  const texture1 = useTexture(earthMap)

  return (
    <mesh castShadow receiveShadow position={[0, 0, 0]} {...props}>
      <sphereGeometry args={[2.003, 64, 64]} />
      <meshBasicMaterial map={texture1} transparent />
    </mesh>
  )
};
