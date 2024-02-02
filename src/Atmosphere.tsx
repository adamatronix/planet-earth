import { useRef } from 'react';
import { BackSide, AdditiveBlending, Mesh } from 'three'

interface AtmosphereProps {
}

const atmosphereShader = {
  'atmosphere': {
    uniforms: {},
    vertexShader: [
      'varying vec3 vNormal;',
      'void main() {',
      'vNormal = normalize( normalMatrix * normal );',
      'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
      '}'
    ].join('\n'),
    fragmentShader: [
      'varying vec3 vNormal;',
      'void main() {',
      'float intensity = pow( 0.99 - dot( vNormal, vec3( 0, 0, 1.0 ) ), 6.0 );',
      'gl_FragColor = vec4( .28, .48, 1.0, 1.0 ) * intensity;',
      '}'
    ].join('\n')
  }
}

export const Atmosphere= ({
  ...props
}: AtmosphereProps) => {
  const ref = useRef<Mesh>(null!)

  return (
    <mesh position={[-.1, .1, 0]} scale={[1.05,1.05,1.05]} {...props} ref={ref}>
      <sphereGeometry args={[2, 64, 64]} />
      <shaderMaterial 
        side={BackSide}
        blending={AdditiveBlending}
        transparent
        vertexShader={atmosphereShader['atmosphere'].vertexShader} 
        fragmentShader={atmosphereShader['atmosphere'].fragmentShader}
      />
    </mesh>
  )
};
