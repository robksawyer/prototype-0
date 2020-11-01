/**
 * @file MainScene.js
 */
import * as React from 'react'
import * as THREE from 'three'
import { Canvas } from 'react-three-fiber'
import { useTweaks } from "use-tweaks";
import PropTypes from 'prop-types'

import styles from './MainScene.module.css'

const MainScene = (props) => {
  const {
    tagName: Tag,
    className,
    variant,
    children,
  } = props

  return (
    <Tag className={`${styles.main_scene} ${styles[`main_scene__${variant}`]} ${className}`}>
      {children}
    </Tag>
  )
}

MainScene.propTypes = {
  tagName: PropTypes.object,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
  children: PropTypes.node,
}

MainScene.defaultProps = {
  tagName: Canvas,
  className: '',
  variant: 'default',
  children: '',
}

export default MainScene
