/**
 * @file MainScene.js
 */
import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { useTweaks } from 'use-tweaks'
import useErrorBoundary from 'use-error-boundary'
import { useInView } from 'react-intersection-observer'
import useMobileDetect from 'use-mobile-detect-hook'
import {
  extend,
  Canvas,
  useFrame,
  useThree,
  useLoader,
} from 'react-three-fiber'
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
} from '@react-three/postprocessing'
import {
  MathUtils,
  PlaneBufferGeometry,
  TextureLoader,
  RepeatWrapping,
  Vector3,
  BoxHelper,
  SpotLightHelper,
  PointLightHelper,
  Color,
} from 'three'
import {
  useHelper,
  OrbitControls,
  softShadows,
  useSubdivision,
  shaderMaterial,
} from '@react-three/drei'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { VertexNormalsHelper } from 'three/examples/jsm/helpers/VertexNormalsHelper'
import { FaceNormalsHelper } from 'three/examples/jsm/helpers/FaceNormalsHelper'
import { gsap } from 'gsap'

import { glsl } from 'glslify'

import { easeInOutCubic } from '../../utils/easing'

import styles from './MainScene.module.css'

import ThreeFiberWater from '../ThreeFiberWater'
import ShaderGeometry from '../ShaderGeometry'

// Inject soft shadow shader
// softShadows({
//   frustrum: 3.75, // Frustrum width (default: 3.75)
//   size: 0.005, // World size (default: 0.005)
//   near: 9.5, // Near plane (default: 9.5)
//   samples: 17, // Samples (default: 17)
//   rings: 11, // Rings (default: 11)
// })

// Effects for the main scene
const Effects = () => {
  return <EffectComposer></EffectComposer>
}

const Scene = () => {
  const [hover, setHover] = useState(false)
  const mesh = useSubdivision(Math.PI / 2)
  const { scene } = useThree()
  const group = useRef()
  const floor = useRef()

  const spotLight = useRef()
  const pointLight = useRef()

  useEffect(() => {
    gsap.to(floor.current.position, {
      z: 1.5,
      // x: -2,
      // y: 2,
      duration: 4,
    })
  }, [])

  useFrame(({ clock, mouse }) => {
    mesh.current.rotation.x = (Math.sin(clock.elapsedTime) * Math.PI) / 4
    mesh.current.rotation.y = (Math.sin(clock.elapsedTime) * Math.PI) / 4
    mesh.current.rotation.z = (Math.sin(clock.elapsedTime) * Math.PI) / 1.5
    mesh.current.position.x = Math.sin(clock.elapsedTime)
    mesh.current.position.z = Math.sin(clock.elapsedTime)

    // mesh1.current.rotation.z = (Math.sin(clock.elapsedTime) * Math.PI) / 1.5
    // mesh1.current.position.x = Math.sin(clock.elapsedTime)
    // mesh1.current.position.z = Math.sin(clock.elapsedTime)

    group.current.rotation.y += 0.02
  })

  useEffect(() => void (spotLight.current.target = mesh.current), [scene])
  useHelper(spotLight, SpotLightHelper, 'teal')
  useHelper(pointLight, PointLightHelper, 0.5, 'hotpink')
  // useHelper(mesh, BoxHelper, '#272740')
  // useHelper(mesh, VertexNormalsHelper, 1, '#272740')
  // useHelper(mesh, FaceNormalsHelper, 0.5, '#272740')

  return (
    <>
      {/* Lights */}
      <pointLight position={[-10, 0, -20]} color="lightblue" intensity={2.5} />
      <group ref={group}>
        <pointLight
          ref={pointLight}
          color="red"
          position={[4, 4, 0]}
          intensity={5}
        />
      </group>
      <spotLight
        castShadow
        position={[2, 5, 2]}
        ref={spotLight}
        angle={0.5}
        distance={20}
      />
      <group ref={floor} position={[0, 0, 0]}>
        <mesh
          ref={mesh}
          position={[0, 2, 0]}
          castShadow
          onPointerOver={(event) => setHover(true)}
          onPointerOut={(event) => setHover(false)}
        >
          <boxGeometry />
          <meshStandardMaterial color={hover ? '#ff00ff' : 'blue'} wireframe />
        </mesh>
        <ShaderGeometry />
        <mesh rotation-x={-Math.PI / 2} receiveShadow>
          <planeBufferGeometry args={[100, 100]} />
          <shadowMaterial opacity={0.5} />
        </mesh>
        {/* <ThreeFiberWater
          backgroundColor="black"
          waterColor="#555555"
          sunColor="#FF5733"
        /> */}
      </group>
      {/* <gridHelper args={[40, 100, 100]} /> */}
    </>
  )
}

const MainScene = (props) => {
  const { tagName: Tag, className, variant, children } = props

  return (
    <Tag
      colorManagement
      shadowMap
      onCreated={({ gl }) => {
        // gl.antialiased = true
      }}
      camera={{ position: [-5, 5, 5] }}
      className={`${styles.main_scene} ${
        styles[`main_scene__${variant}`]
      } ${className}`}
      style={{
        width: '100vw',
        height: 'calc(100vh - 50px)',
        background: 'floralwhite',
      }}
    >
      <fog attach="fog" args={['floralwhite', 0, 20]} />
      <Scene />
      {/* <Effects /> */}
      <OrbitControls />
    </Tag>
  )
}

MainScene.propTypes = {
  tagName: PropTypes.object,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
}

MainScene.defaultProps = {
  tagName: Canvas,
  className: '',
  variant: 'default',
}

export default MainScene
