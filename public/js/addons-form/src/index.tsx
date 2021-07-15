import './styles.css';
import Main from './components/Main';

import React from 'react';
import { render } from 'react-dom';

const init = () => {
	document.removeEventListener('load', init);
	render(<Main />, document.getElementById('addonsForm'));
};

window.addEventListener('load', init);
