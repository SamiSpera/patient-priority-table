import React, { useState, useRef, useEffect } from 'react'
import PrioritySelector from './PrioritySelector'
import { motion, useMotionValue, motionValue } from 'framer-motion'
import { ReactComponent as Draggable } from './draggable.svg'
import styled from 'styled-components'

const Row = ({ patient, setPosition, moveItem, i, onMove, patients }) => {
	const [isDragging, setDragging] = useState(false)
	const ref = useRef(null)
	const dragOriginY = useMotionValue(0)
	const [priority, setPriority] = useState(patient.priority.priority)

	useEffect(() => {
    setPosition(i, {
      height: ref.current.offsetHeight,
      top: ref.current.offsetTop
    })
	})

	return ( 
		<RowDiv
			ref={ref}
			initial={false}
			animate={isDragging ? onTop : flat}
			drag='y'
      dragOriginY={dragOriginY}
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={1}
      onDragStart={() => setDragging(true)}
      onDragEnd={() => { setDragging(false); onMove(i)}}
      onDrag={(e, { point }) => moveItem(i, point.y)}
      positionTransition={({ delta }) => {
        if (isDragging) {
          // If dragging, "undo" the items movement within the list
          // by manipulating its dragOriginY. This will keep the item under the cursor,
          // even though it's jumping around the DOM.
          dragOriginY.set(dragOriginY.get() + delta.y)
        }
        // If `positionTransition` is a function and returns `false`, it's telling
        // Motion not to animate from its old position into its new one. If we're
        // dragging, we don't want any animation to occur.
        return !isDragging
      }}
		>
			<Draggable
				width='12px'
			/>
			<PrioritySelector
				value={priority}
				setValue={setPriority}
			/>
			<span>{patient.name}</span>
		</RowDiv>
	 );
}
 
export default Row;

const RowDiv = styled(motion.div)`
	height: 50px;
	display: flex;
	align-items: center;
`

const onTop = { zIndex: 1 }
const flat = {
  zIndex: 0,
  transition: { delay: 0.3 }
}