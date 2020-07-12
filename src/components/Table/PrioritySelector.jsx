import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components'

const Div = styled.div`
	display: flex;
	position: relative;
	width: 80px;
`

const Tag = styled.div`
	background-color: ${props => props.bgColor};
	width: 50px;
	height: 23px;
	border-radius: 3px 0 0 3px;
	margin: 3px 2px 3px 3px;
	display: flex;
	justify-content: center;
	align-items: center;

	span {
		user-select: none;
		display: block;
		text-align: center;
		color: white;
		padding: 0 5px;
		font-weight: 500;
	}
`

const Button = styled.button`
	background-color: ${props => props.bgColor};
	width: 18px;
	height: 23px;
	margin: 3px 0;
	border-radius: 0 3px 3px 0;
	border: 0;
	padding: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;

	&:focus {
		outline: none;
	}
`

const Arrow = styled.div`
	width: 0;
	height: 0;
	border-top: ${props => props.borderTop};
	border-right: ${props => props.borderRight};
	border-bottom: ${props => props.borderBottom};
	border-left: ${props => props.borderLeft};
`

const Options = styled(motion.div)`
	margin-top: 3px;
	position: absolute;
	left: 73px;
`

const Option = styled(motion.div)`
	background-color: ${props => props.bgColor};
	border: 0;
	border-radius: 3px;
	height: 23px;
	margin-bottom: 2px;
	margin-left: 2px;
	width: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	
	span {
		user-select: none;
		color: white;
		font-weight: 500;
		padding: 0;
	}
`

const PrioritySelector = (props) => {
	const [isOpen, setOpen] = useState(false);
	const [inputState, setInputState] = useState(props.value);

	const handleArrowClick = () => {
		setOpen(!isOpen);
	}


	let optionValue;
	const findOptionValue = (option) => {
		if(option === 'high') {
			optionValue = .9
		}
		if(option === 'med') {
			optionValue = .5
		}
		if(option === 'low') {
			optionValue = .09
		}
	}

	const handleOptionClick = (e) => {
		if(e.target.dataset.value === 'high') {
			setInputState(.9);
		}
		if(e.target.dataset.value === 'med') {
			setInputState(.5);
		}
		if(e.target.dataset.value === 'low') {
			setInputState(.09);
		}
		setOpen(!isOpen);
	}

	React.useEffect(() => {
		props.setValue(inputState)
	}, [inputState])

	let bgColor;
	let content;
	let options;
	switch(true) {
		case (inputState === null):
			content = 'N / A'
			bgColor = 'var(--purpleLightGray)'
			options =['high', 'med', 'low']
			break
		case (inputState >= .9):
			content = 'High'
			bgColor = 'var(--red)'
			options = ['med', 'low']
			break
		case (inputState < .9 && inputState >= .1):
			content = 'Med'
			bgColor = 'var(--lavender)'
			options =['high', 'low']
			break
		case (inputState < .1):
			content = 'Low'
			bgColor = 'var(--blueSky)'
			options = ['high', 'med']
			break
		default:
			content = 'N / A'
			bgColor = 'var(--purpleLightGray)'
			options =['high', 'med', 'low']
			break
	}

		// Close dropdown if user clicks outside of it
		const node = useRef(null);

		useEffect(() => {
			document.addEventListener('mousedown', handleOutsideClick);
			return () => {
				document.removeEventListener('mousedown', handleOutsideClick);
			}
		},[node.current]);
	
		const handleOutsideClick = (e) => {
			if(node.current) {
				if(node.current.contains(e.target)) {
					return;
				}
			}
			setOpen(false);
		}

	return(
		<Div ref={node}>
			<Tag
				bgColor={bgColor}
				>
				<span>{content}</span>
			</Tag>
			<Button
				onClick={handleArrowClick}
				bgColor={bgColor}
			>
				<Arrow 
					borderTop={isOpen ? '4px solid transparent' : '5px solid white'}
					borderRight={!isOpen && '4px solid transparent'}
					borderBottom={isOpen && '4px solid transparent'}
					borderLeft={isOpen ? '5px solid white' : '4px solid transparent'}
				/>
			</Button>
			<AnimatePresence initial={false}>
				{isOpen && (
					<Options
						key='priority-options'
						initial='collapsed'
						animate='open'
						exit='collapsed'
						variants={{
							open: {width: 'auto'},
							collapsed: {width: 0}
						}}
						transition={{
							duration: .2,
							staggerChildren: .05
						}}
					>
							{options.map((option, idx) => {
								let optionBg;
								let optionContent;
								switch(option){
									case 'high':
										optionBg = 'var(--red)'
										optionContent = 'High'
										break
									case 'med':
										optionBg ='var(--lavender)'
										optionContent = 'Med'
										break
									case 'low':
										optionBg = 'var(--blueSky)'
										optionContent= 'Low'
										break
								}

								return (
									<Option
										key={`${option}-${idx}`}
										bgColor={optionBg}
										onClick={handleOptionClick}
										data-value={option}
									>
										<span
											onClick={handleOptionClick}
											data-value={option}
										>{optionContent}</span>
									</Option>
								)
							})}
					</Options>
				)}
			</AnimatePresence>
		</Div>
	)
}

export default PrioritySelector;