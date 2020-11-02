/**
 * @file ThreeFiberLightRay.js
 *
 * @see https://tympanus.net/codrops/2019/11/13/high-speed-light-trails-in-three-js/
 */
import * as React from 'react'
import PropTypes from 'prop-types'
import { shaderMaterial } from '@react-three/drei'

import styles from './ThreeFiberLightRay.module.css'

import vertex from './shaders/road/road.vert'
import fragment from './shaders/road/road.frag'

const RoadMaterial = shaderMaterial({}, vertex, fragment)
extend(RoadMaterial)

const ThreeFiberLightRay = (props) => {
  const { tagName: Tag, className, variant, children } = props

  return (
    <mesh>
      <planeBufferGeometry />
      <roadMaterial />
    </mesh>
  )
}

ThreeFiberLightRay.propTypes = {
  tagName: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
  children: PropTypes.node,
}

ThreeFiberLightRay.defaultProps = {
  tagName: 'div',
  className: '',
  variant: 'default',
  children: '',
}

export default ThreeFiberLightRay
