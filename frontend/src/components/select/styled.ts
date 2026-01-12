import styled from 'styled-components'

export const SelectWrapper = styled.div`
	position: relative;
	width: 100%;
`

export const SelectButton = styled.button`
	width: 100%;
	padding: 10px 12px;
	border-radius: 8px;
	border: 1px solid #cfd4dc;
	background: #fff;
	font-size: 14px;
	text-align: left;
	cursor: pointer;

	display: flex;
	align-items: center;
	justify-content: space-between;

	&:after {
		content: '▾';
		font-size: 12px;
		color: #666;
	}

	&:hover {
		border-color: #5b8cff;
	}

	&:focus {
		outline: none;
		border-color: #5b8cff;
		box-shadow: 0 0 0 2px rgba(91, 140, 255, 0.15);
	}
`

export const Dropdown = styled.div`
	position: absolute;
	top: calc(100% + 6px);
	left: 0;
	right: 0;
	background: #fff;
	border-radius: 10px;
	border: 1px solid #e5e7eb;
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
	z-index: 20;
	overflow: hidden;
`

export const DropdownItem = styled.div`
	padding: 10px 12px;
	font-size: 14px;
	cursor: pointer;
	transition: background 0.15s ease;

	&:hover {
		background: #f3f6ff;
	}

	&:active {
		background: #e8edff;
	}
`
