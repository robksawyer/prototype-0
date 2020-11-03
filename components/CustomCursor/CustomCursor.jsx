/**
 * @file CustomCursor.js
 * Handles replacing the global app cursor
 */
import React, { Fragment, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

import styles from './CustomCursor.module.css'
import { useCustomCursor } from '../../hooks/useCustomCursor'

const CustomCursor = (props) => {
  const {
    tagName: Tag,
    className,
    variant,
    children,
    cursorColorInner = 'rgba(220, 90, 90, 1)',
    cursorColorOuter = 'rgba(220, 90, 90, 0.4)',
    innerSize = 8,
    outerSize = 8,
    outerScale = 5,
    innerScale = 0.7,
  } = props

  const cursorOuterRef = useRef()
  const cursorInnerRef = useRef()

  const { isActiveClickable, isActive, isVisible } = useCustomCursor({
    innerRef: cursorInnerRef,
    outerRef: cursorOuterRef,
  })

  useEffect(() => {
    if (isActive) {
      cursorInnerRef.current.style.transform = `scale(${innerScale})`
      cursorOuterRef.current.style.transform = `scale(${outerScale})`
    } else {
      cursorInnerRef.current.style.transform = 'scale(1)'
      cursorOuterRef.current.style.transform = 'scale(1)'
    }
  }, [innerScale, outerScale, isActive])

  useEffect(() => {
    if (isActiveClickable) {
      cursorInnerRef.current.style.transform = `scale(${innerScale * 1.3})`
      cursorOuterRef.current.style.transform = `scale(${outerScale * 1.4})`
    }
  }, [innerScale, outerScale, isActiveClickable])

  useEffect(() => {
    if (isVisible) {
      cursorInnerRef.current.style.opacity = 1
      cursorOuterRef.current.style.opacity = 1
    } else {
      cursorInnerRef.current.style.opacity = 0
      cursorOuterRef.current.style.opacity = 0
    }
  }, [isVisible])

  const styles = {
    cursor: {
      zIndex: 999,
      position: 'fixed',
      opacity: 1,
      pointerEvents: 'none',
      transition: 'opacity 0.15s ease-in-out, transform 0.15s ease-in-out',
    },
    cursorInner: {
      position: 'fixed',
      borderRadius: '50%',
      width: innerSize,
      height: innerSize,
      pointerEvents: 'none',
      backgroundColor: cursorColorInner,
      transition: 'opacity 0.15s ease-in-out, transform 0.25s ease-in-out',
    },
    cursorOuter: {
      position: 'fixed',
      borderRadius: '50%',
      pointerEvents: 'none',
      width: outerSize,
      height: outerSize,
      backgroundColor: cursorColorOuter,
      transition: 'opacity 0.15s ease-in-out, transform 0.15s ease-in-out',
    },
  }

  return (
    <Fragment>
      <div ref={cursorOuterRef} style={styles.cursorOuter} />
      <div ref={cursorInnerRef} style={styles.cursorInner} />
      <style jsx global>{`
        /* play with vars for different effets */
        :root {
          --color-cursor: 220, 90, 90;
          --cursor-outline-shade: 0.3;
          --cursor-size: 10px;
          --cursor-outline-size: 12px;
        }

        html,
        body {
          cursor: none;
        }

        html *,
        body * {
          cursor: none;
        }

        #cursor-dot,
        #cursor-dot-outline {
          z-index: 999;
          pointer-events: none;
          position: absolute;
          top: 50%;
          left: 50%;
          border-radius: 50%;
          opacity: 0;
          transform: translate(-50%, -50%);
          transition: opacity 0.15s ease-in-out, transform 0.15s ease-in-out;
        }

        #cursor-dot {
          width: var(--cursor-size);
          height: var(--cursor-size);
          background-color: rgba(var(--color-cursor), 1);
        }

        #cursor-dot-outline {
          width: var(--cursor-outline-size);
          height: var(--cursor-outline-size);
          background-color: rgba(
            var(--color-cursor),
            var(--cursor-outline-shade)
          );
        }
      `}</style>
    </Fragment>
  )
}

CustomCursor.propTypes = {
  tagName: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
  children: PropTypes.node,
  cursorColorInner: PropTypes.string,
  cursorColorOuter: PropTypes.string,
  innerSize: PropTypes.number,
  outerSize: PropTypes.number,
  outerScale: PropTypes.number,
  innerScale: PropTypes.number,
}

export default CustomCursor
