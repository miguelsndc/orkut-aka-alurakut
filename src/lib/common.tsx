import { css } from 'styled-components';

// ================================================================================================================
// Login Page
// ================================================================================================================

// ================================================================================================================
// Reset Styles
// ================================================================================================================
export const AlurakutStyles = css`
	*::-webkit-scrollbar {
		width: 8px;
	}
	*::-webkit-scrollbar-track {
		background: #f1f1f1;
	}
	*::-webkit-scrollbar-thumb {
		background: #888;
		border-radius: 10px;
	}
	*::-webkit-scrollbar-thumb:hover {
		background: #555;
	}
	a,
	button {
		cursor: pointer;
		transition: 0.3s;
		outline: 0;
		&:hover,
		&:focus {
			opacity: 0.8;
		}
		&:disabled {
			cursor: not-allowed;
			opacity: 0.5;
		}
	}
	input {
		transition: 0.3s;
		outline: 0;
		&:disabled {
			cursor: not-allowed;
			opacity: 0.5;
		}
		&:hover,
		&:focus {
			box-shadow: 0px 0px 5px #33333357;
		}
	}
`;
