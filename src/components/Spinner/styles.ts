import styled from 'styled-components';

export const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Spinner = styled.div`
	display: inline-block;
	position: relative;
	width: 80px;
	height: 80px;

	div {
		box-sizing: border-box;
		display: block;
		position: absolute;
		width: 36px;
		height: 36px;
		margin: 8px;
		border: 4px solid ${({ theme }) => theme.primaryElement};
		border-radius: 50%;
		animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
		border-color: ${({ theme }) => theme.primaryElement} transparent transparent
			transparent;
	}

	div:nth-child(1) {
		animation-delay: -0.45s;
	}

	div:nth-child(2) {
		animation-delay: -0.3s;
	}

	div:nth-child(3) {
		animation-delay: -0.15s;
	}

	@keyframes lds-ring {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;
