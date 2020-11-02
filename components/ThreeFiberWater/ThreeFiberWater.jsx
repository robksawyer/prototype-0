/**
 * @file ThreeFiberWater.js
 */
import React, { useRef, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useFrame } from 'react-three-fiber'
import {
  PlaneBufferGeometry,
  TextureLoader,
  RepeatWrapping,
  Vector3,
} from 'three'
import { Water } from 'three/examples/jsm/objects/Water'

import styles from './ThreeFiberWater.module.css'

function Planes({
  backgroundColor = 'white',
  waterColor = 'lightblue',
  sunColor = '#ffffff',
}) {
  const water = useMemo(() => {
    return new Water(new PlaneBufferGeometry(1000, 800, 1000), {
      textureWidth: 1024,
      textureHeight: 1024,
      waterNormals: new TextureLoader().load(
        '/3d/waternormals.jpg',
        (texture) => {
          texture.wrapS = texture.wrapT = RepeatWrapping
        }
      ),
      alpha: 1.0,
      sunDirection: new Vector3(),
      sunColor,
      waterColor,
      distortionScale: 30.0,
      fog: false,
      time: 0.0,
      receiveShadow: true,
    })
  }, [])

  const ref = useRef()
  // const val = Math.random() * 10
  useFrame((state, delta) => {
    const { clock } = state

    // water.material.uniforms['sunDirection'].value = new Vector3(
    //   Math.sin(clock.getElapsedTime()),
    //   Math.cos((clock.getElapsedTime() * Math.PI) / 2),
    //   Math.sin(clock.getElapsedTime() * val)
    // )
    water.material.uniforms['time'].value += 1.0 / 60.0 //delta * 0.5
  })

  return (
    <>
      <mesh position={[0, 0, -500]}>
        <planeBufferGeometry args={[10000, 10000]} />
        <meshStandardMaterial color={backgroundColor} />
      </mesh>
      <primitive
        ref={ref}
        object={water}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -50, 0]}
      />
    </>
  )
}

const ThreeFiberWater = (props) => {
  const {
    tagName: Tag,
    className,
    variant,
    children,
    backgroundColor,
    waterColor,
    sunColor,
  } = props
  return (
    <Planes
      backgroundColor={backgroundColor}
      waterColor={waterColor}
      sunColor={sunColor}
    />
  )
}

ThreeFiberWater.propTypes = {
  tagName: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
  children: PropTypes.node,
  backgroundColor: PropTypes.string,
  sunColor: PropTypes.string,
  waterColor: PropTypes.string,
}

ThreeFiberWater.defaultProps = {
  tagName: 'div',
  className: '',
  variant: 'default',
  children: '',
  backgroundColor: 'floralwhite',
  sunColor: '#ffffff',
  waterColor: '#41709c',
}

export default ThreeFiberWater
