import './styles.css';
import Main from './components/Main';

import React from 'react';
import { render } from 'react-dom';

const init = () => {
	document.removeEventListener('load', init);
	const addonsForm = document.getElementById('addonsForm');
	if (addonsForm) render(<Main />, addonsForm);
};

window.addEventListener('load', init);
