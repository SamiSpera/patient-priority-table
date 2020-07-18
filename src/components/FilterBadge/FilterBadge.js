import React, { useEffect, useRef, useState } from 'react'
// import Chevron from '../../assets/chevron.svg'
import { AnimatePresence, motion } from 'framer-motion'
import { without } from 'lodash'
import styled from 'styled-components'

const FilterBadge = (props) => {
  props = {
    ...{
      title: undefined,
      options: undefined,
      primaryColor: undefined,
      secondaryColor: undefined,
      isDefault: undefined
    }, ...props
	}
	
	// console.log(props.options, 'options zipped')
	useEffect(() => {
		console.log(props.value, 'props.value')
	}, [props.value])

	const [isOpen, setIsOpen] = useState(false)

  const onChangeListener = (value) => {
		console.log('onChangeListener called')
    return (e) => {
      if (e.target.checked && !props.value.includes(value))
        props.setValue([...props.value, value])
      else
        props.setValue(without(props.value, value))
    }
	}

  const handleClick = () => {
		// console.log('handleClick called')
    setIsOpen(!isOpen)
  }

  // Close filter if user clicks outside of it
  const node = useRef(null)

  useEffect(() => {
		console.log('node.current useEffect called')
    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [node.current])

  const handleOutsideClick = (e) => {
		console.log('handleClick outside called')
    if (node.current.contains(e.target)) {
      return
    }
    setIsOpen(false)
  }

  return (
    <Div
      boxShadow={isOpen ? '-1px 1px 10px rgba(0, 0, 0, .2)' : 'none'}
      ref={node}
    >
      <Badge
        bgColor={props.primaryColor}
        onClick={handleClick}
        borderRadius={isOpen ? '3px 3px 0 0' : '3px'}
        borderBottom={isOpen ? 0 : '1px solid var(--blueDocspera)'}
      >
        <Title>{props.title}</Title>
        {/* <motion.img
          src={Chevron}
          alt='chevron'
          initial={false}
          animate={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
        /> */}
      </Badge>
      <AnimatePresence initial={false}>
        {isOpen && (
          <Options
            key='options'
            initial='collapsed'
            animate='open'
            exit='collapsed'
            variants={{
              open: { height: 'auto' },
              collapsed: {
                height: 0,
                transition: {
                  staggerDirection: -1,
                  duration: .01
                }
              }
            }}
            transition={{
              staggerChildren: .05
            }}
          >
            {Object.keys(props.options).map((key, idx) => {
              let checked = props.value.includes(key)
              return (
                <Option
                  key={`${key}-${idx}`}
                  variants={{
                    open: { opacity: 1 },
                    collapsed: {
                      opacity: 0,
                      transition: {
                        staggerDirection: -1,
                        duration: .01
                      }
                    }
                  }}
                >
                  <Label>
                    <Input
                      type='checkbox'
                      checked={checked}
                      onChange={onChangeListener(key)}
                    />
                    <Span
                      checked={checked}
                      backgroundColor={checked ? props.secondaryColor : 'white'}
                      border={`2px solid ${props.secondaryColor}`}
                    />
                    {props.options[key]}
                  </Label>
                </Option>
              )
            })}
          </Options>
        )}
      </AnimatePresence>
    </Div>
  )
}

const Div = styled.div`
	width: fit-content;
	box-shadow: ${props => props.boxShadow};
`

const Badge = styled.div`
	border-radius: ${props => props.borderRadius};
	background-color: ${props => props.bgColor};
	border: 1px solid var(--blueDocspera);
	border-bottom: ${props => props.borderBottom};
	display: flex;
	justify-content: space-between;
	width: 100%;
	box-sizing: border-box;
	padding-right: 10px;
	cursor: pointer;
	img {
		width: 14px;
	}
`

const Title = styled.div`
	color: white;
	font-weight: 500;
	font-size: 16px;
	padding: 5px 10px 6px 10px;
	letter-spacing: .6px;
	user-select: none;
`

const Options = styled(motion.div)`
	background-color: white;
	display: block;
	padding: 2px 0;
	border: 1px solid var(--blueDocspera);
	box-sizing: border-box;
	border-radius: 0 0 3px 3px;
`

const Option = styled(motion.div)`
	padding: 5px;
	position: relative;
	display: block;
	background-color: white;
	cursor: pointer;
`

const Label = styled.label`
	position: relative;
	padding-left: 25px;
	padding-right: 5px;
	user-select: none;
	cursor: pointer;
`

const Span = styled.span`
	background-color: ${props => props.backgroundColor};
	border: ${props => props.border};
	position: absolute;
	top: 0;
	left: 0;
	height: 15px;
	width: 15px;
	border-radius: 3px;

	&:after {
		content: '';
		position: absolute;
		left: 4px;
		top: 0px;
		width: 4px;
		height: 9px;
		border: solid white;
		border-width: 0 3px 3px 0;
		-webkit-transform: rotate(45deg);
		-ms-transform: rotate(45deg);
		transform: rotate(45deg);
	}
`

const Input = styled.input`
	position: absolute;
	opacity: 0;
	height: 0;
	width: 0;
`

export default FilterBadge