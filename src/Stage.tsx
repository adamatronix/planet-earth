import React, { useRef } from 'react';
import styled from 'styled-components';
import { Canvas, Mesh } from '@react-three/fiber'
import { Atmosphere } from './Atmosphere';
import { Earth } from './Earth';
import { Overlay } from './Overlay';

interface StageProps {
  children?: React.ReactNode
}

interface MousePos {
  x: number,
  y: number
}


const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

export const Stage = ({
  children,
  ...props
}: StageProps) => {
  const EarthObject = useRef<Mesh>(null);
  const isDragging = useRef<boolean>(false);
  const previousMousePosition = useRef<MousePos>({x: 0, y: 0});

  const onMouseDown = () => {
    isDragging.current = true;
  }

  const onMouseUp = () => {
    isDragging.current = false;
  }

  const onMouseMove = (e:React.MouseEvent) => {
    const deltaMove = {
      x: e.clientX - previousMousePosition.current.x
    };

    if (isDragging.current) {
      console.log(EarthObject.current.rotation);
      EarthObject.current.rotation.y += deltaMove.x * .004;
    }

    previousMousePosition.current = {
      x: e.clientX,
      y: e.clientY
    };
  }

  return (
    <Wrapper onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseMove={onMouseMove}>
      <Canvas shadows {...props}>
        { children || null }
        <Atmosphere />
        <Earth ref={EarthObject}/>
        <directionalLight position={[-150, 150, -50]} color="#5a54ff" intensity={0.25}/>
        <directionalLight position={[-400, 200, 150]} color="#4158f6" intensity={0.15}/>
        <directionalLight position={[100, 250, -100]} color="#803bff" intensity={0.7}/>
      </Canvas>
    </Wrapper>
  );
};