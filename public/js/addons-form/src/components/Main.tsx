import { Addon } from '../types';
import MultiAddonForm from './MultiAddonFormContainer';
import React from 'react';

const Main: React.FC = () => {
	const seatsDataElRef = React.useRef<HTMLInputElement>();
	const quantityElRef = React.useRef<HTMLInputElement>();
	const quantityDisplayElRef = React.useRef<HTMLSpanElement>();
	const [quantity, setQuantity] = React.useState(1);
	const [addons, setAddons] = React.useState<Addon[]>([]);
	const handleAddAddon = (addon: Addon): void => setAddons([...addons, addon]);
	const handleDeleteAddon = (index: number): void =>
		setAddons(addons.filter((_addon, i) => i !== index));
	React.useEffect(() => {
		const priceElement = document.querySelector('.price');
		if (priceElement) priceElement.innerHTML += '<span id="quantityMultiplier"></span>';
		const quantityDisplayEl = document.getElementById('quantityMultiplier');
		if (!quantityDisplayEl) throw new Error('Cannot find quantity display element');
		quantityDisplayElRef.current = quantityDisplayEl;
	});
	React.useEffect(() => {
		const quantityEl = document.querySelector('input[name="quantity"]');
		if (!quantityEl) throw new Error('Cannot find quantity input');
		quantityElRef.current = quantityEl as HTMLInputElement;
		const seatsDataEl = document.getElementById('seatsdata');
		if (!seatsDataEl) throw new Error('Cannot find seatsData input');
		seatsDataElRef.current = seatsDataEl as HTMLInputElement;
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
		<MultiAddonForm
			addons={addons}
			handleAddAddon={handleAddAddon}
			handleDeleteAddon={handleDeleteAddon}
			quantity={quantity}
			setQuantity={setQuantity}
		/>
	);
};
export default Main;
