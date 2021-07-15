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
	return (
		<MultiAddonForm
			addons={props.addons}
			email={email}
			errorMessage={props.errorMessage}
			firstName={firstName}
			handleAddAttendeeClick={handleAddAttendeeClick}
			handleChange={handleChange}
			handleDeleteClick={handleDeleteClick}
			surname={surname}
		/>
	);
};

export default MultiAddonFormContainer;
