import React from 'react';
import {DoubleSide, Mesh} from 'three'
import { Overlay } from './Overlay';

interface EarthProps {
}

export const Earth = React.forwardRef<Mesh, EarthProps>(({
  ...props
}, ref) => {
  return (
    <mesh position={[0, 0, 0]} castShadow receiveShadow {...props} ref={ref}>
      <sphereGeometry args={[2, 64, 64]} attach="geometry" />
      <meshLambertMaterial color='white' attach="material" side={DoubleSide}/>
      <Overlay />
    </mesh>
  )
});
