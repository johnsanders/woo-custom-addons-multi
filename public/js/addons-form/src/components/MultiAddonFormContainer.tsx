import { Addon } from '../types';
import MultiAddonForm from './MultiAddonForm';
import React from 'react';
import { v4 as uuid } from 'uuid';
import { validate } from 'email-validator';
interface Props {
	addons: Addon[];
	errorMessage: string;
	handleAddAddon: (addon: Addon) => void;
	handleDeleteAddon: (index: number) => void;
	resetErrorMessage: () => void;
	setErrorMessage: (errorMessage: string) => void;
}

const MultiAddonFormContainer: React.FC<Props> = (props: Props) => {
	const finalAddonAddedRef = React.useRef(false);
	const [firstName, setFirstName] = React.useState('');
	const [surname, setSurname] = React.useState('');
	const [email, setEmail] = React.useState('');
	const stateUpdaters = {
		attendeeEmail: setEmail,
		attendeeFirstName: setFirstName,
		attendeeSurname: setSurname,
	};
	const clearInputs = React.useCallback(() => {
		setFirstName('');
		setSurname('');
		setEmail('');
	}, [setFirstName, setSurname, setEmail]);
	const { addons, handleAddAddon, setErrorMessage } = props;
	const validateInput = React.useCallback(() => {
		console.log(validate(email));
		if (addons.find((addon) => addon.email === email)) {
			setErrorMessage('An attendee with that email address has already been added.');
			return false;
		}
		if (!validate(email)) {
			setErrorMessage('That does not appear to be a valid email address.');
			return false;
		}
		return true;
	}, [addons, email, setErrorMessage]);
	const handleAddToCartClick = React.useCallback(
		(e: Event) => {
			if (finalAddonAddedRef.current) return;
			if (firstName && surname && email) {
				e.preventDefault();
				if (!validateInput()) return;
				finalAddonAddedRef.current = true;
				const button = e.currentTarget as HTMLButtonElement;
				handleAddAddon({ email, firstName, id: uuid(), surname });
				clearInputs();
				setTimeout(() => button.click(), 100);
				return;
			}
			if (addons.length === 0) {
				setErrorMessage('You must enter at least one attendee to add this course to your cart.');
				e.preventDefault();
			}
		},
		[
			addons,
			clearInputs,
			handleAddAddon,
			setErrorMessage,
			email,
			firstName,
			surname,
			validateInput,
		],
	);
	React.useEffect(() => {
		const addToCartButton = document.querySelector('button[name="add-to-cart"');
		if (!addToCartButton) throw new Error('Cannot find Add to Cart button');
		addToCartButton?.addEventListener('click', handleAddToCartClick);
		return () => addToCartButton.removeEventListener('click', handleAddToCartClick);
	}, [handleAddToCartClick]);
	const handleAddAttendeeClick = (): void => {
		if (!validateInput()) return;
		if (firstName && surname && email) {
			props.handleAddAddon({ email, firstName, id: uuid(), surname });
			clearInputs();
		}
	};
	const handleDeleteClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		const index = e.currentTarget.dataset.index;
		if (index === undefined) throw new Error('Cannot get index to delete');
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
			e.preventDefault();
			handleAddAttendeeClick();
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
