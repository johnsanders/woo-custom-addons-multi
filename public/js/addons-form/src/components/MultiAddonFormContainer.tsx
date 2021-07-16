import { Addon } from '../types';
import MultiAddonForm from './MultiAddonForm';
import React from 'react';
import { v4 as uuid } from 'uuid';

interface Props {
	addons: Addon[];
	errorMessage: string;
	handleAddAddon: (addon: Addon) => void;
	handleDeleteAddon: (index: number) => void;
	resetErrorMessage: () => void;
	setErrorMessage: (errorMessage: string) => void;
	setQuantity: (quantity: number) => void;
	quantity: number;
}

const MultiAddonFormContainer: React.FC<Props> = (props: Props) => {
	const [firstName, setFirstName] = React.useState('');
	const [surname, setSurname] = React.useState('');
	const [email, setEmail] = React.useState('');
	const stateUpdaters = {
		attendeeEmail: setEmail,
		attendeeFirstName: setFirstName,
		attendeeSurname: setSurname,
	};
	const { addons, handleAddAddon, setErrorMessage } = props;
	const handleAddToCartClick = React.useCallback(
		(e: Event) => {
			if (addons.length > 0) return;
			if (firstName && surname && email) {
				handleAddAddon({ email, firstName, id: uuid(), surname });
				return;
			}
			setErrorMessage('You must enter at least one attendee to add this course to your cart.');
			e.preventDefault();
		},
		[handleAddAddon, setErrorMessage, addons, email, firstName, surname],
	);
	React.useEffect(() => {
		const addToCartButton = document.querySelector('button[name="add-to-cart"');
		if (!addToCartButton) throw new Error('Cannot find Add to Cart button');
		addToCartButton?.addEventListener('click', handleAddToCartClick);
		return () => addToCartButton.removeEventListener('click', handleAddToCartClick);
	}, [handleAddToCartClick]);
	const handleAddAttendeeClick = (): void => {
		if (firstName && surname && email) {
			const newQuantity = props.addons.length + 1;
			props.setQuantity(newQuantity);
			props.handleAddAddon({ email, firstName, id: uuid(), surname });
			setFirstName('');
			setSurname('');
			setEmail('');
		}
	};
	const handleDeleteClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		const index = e.currentTarget.dataset.index;
		if (index === undefined) throw new Error('Cannot get index to delete');
		const newQuantity = props.addons.length - 1;
		props.setQuantity(newQuantity);
		props.handleDeleteAddon(parseInt(index));
	};
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (props.errorMessage) props.resetErrorMessage();
		const updater = stateUpdaters[e.target.id];
		if (!updater) throw new Error('Cannot find state updater');
		updater(e.target.value);
	};
	const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'Enter') {
			handleAddAttendeeClick();
			e.preventDefault();
		}
	};
	return (
		<MultiAddonForm
			addons={props.addons}
			email={email}
			errorMessage={props.errorMessage}
			firstName={firstName}
			handleAddAttendeeClick={handleAddAttendeeClick}
			handleChange={handleChange}
			handleDeleteClick={handleDeleteClick}
			handleKeyDown={handleKeyDown}
			surname={surname}
		/>
	);
};

export default MultiAddonFormContainer;
