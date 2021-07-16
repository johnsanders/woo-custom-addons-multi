import { Addon } from '../types';
import MultiAddonFormContainer from './MultiAddonFormContainer';
import React from 'react';

const Main: React.FC = () => {
	const seatsDataElRef = React.useRef<HTMLInputElement>();
	const quantityElRef = React.useRef<HTMLInputElement>();
	const quantityDisplayElRef = React.useRef<HTMLSpanElement>();
	const [addons, setAddons] = React.useState<Addon[]>([]);
	const [errorMessage, setErrorMessage] = React.useState('');
	const [quantity, setQuantity] = React.useState(1);
	const handleAddAddon = (addon: Addon): void => setAddons([...addons, addon]);
	const handleDeleteAddon = (index: number): void =>
		setAddons(addons.filter((_addon, i) => i !== index));
	const resetErrorMessage = () => setErrorMessage('');
	React.useEffect(() => {
		const quantityEl = document.querySelector('input[name="quantity"]');
		if (!quantityEl) throw new Error('Cannot find quantity input');
		quantityElRef.current = quantityEl as HTMLInputElement;
		const seatsDataEl = document.getElementById('seatsdata');
		if (!seatsDataEl) throw new Error('Cannot find seatsData input');
		seatsDataElRef.current = seatsDataEl as HTMLInputElement;
		const quantityDisplayEl = document.getElementById('priceSuffix');
		if (!quantityDisplayEl) throw new Error('Cannot find quantity display element');
		quantityDisplayElRef.current = quantityDisplayEl;
	}, []);
	React.useEffect(() => {
		if (!quantityElRef.current) throw new Error('Cannot set quantity');
		quantityElRef.current.value = quantity.toString();
		if (!quantityDisplayElRef.current) throw new Error('Cannot set quantity display');
		quantityDisplayElRef.current.innerHTML =
			quantity <= 1 ? '' : ` (&times;${quantity.toString()})`;
	}, [quantity]);
	React.useEffect(() => {
		if (!seatsDataElRef.current) throw new Error('seatsDataElRef is undefined');
		seatsDataElRef.current.value = JSON.stringify(addons);
	}, [addons]);
	return (
		<MultiAddonFormContainer
			addons={addons}
			errorMessage={errorMessage}
			handleAddAddon={handleAddAddon}
			handleDeleteAddon={handleDeleteAddon}
			quantity={quantity}
			resetErrorMessage={resetErrorMessage}
			setErrorMessage={setErrorMessage}
			setQuantity={setQuantity}
		/>
	);
};
export default Main;
