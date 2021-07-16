import { Addon } from '../types';
import AddonsTable from './AddonsTable';
import React from 'react';

interface Props {
	addons: Addon[];
	email: string;
	errorMessage: string;
	firstName: string;
	handleAddAttendeeClick: () => void;
	handleDeleteClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
	surname: string;
}

const MultiAddonForm: React.FC<Props> = (props: Props) => (
	<>
		<h3>Attendees</h3>
		<AddonsTable addons={props.addons} handleDeleteClick={props.handleDeleteClick} />
		<div className="addonMultiForm" onKeyDown={props.handleKeyDown}>
			<div className="addonMultiFormElement">
				<label htmlFor="attendeeFirstName">First Name</label>
				<input
					className="form-control"
					id="attendeeFirstName"
					name="firstName"
					onChange={props.handleChange}
					value={props.firstName}
				/>
			</div>
			<div className="addonMultiFormElement">
				<label htmlFor="attendeeSurname">Surname</label>
				<input
					className="form-control"
					id="attendeeSurname"
					name="attendeeSurname"
					onChange={props.handleChange}
					value={props.surname}
				/>
			</div>
			<div className="addonMultiFormElement">
				<label htmlFor="attendeeEmail">Email</label>
				<input
					className="form-control"
					id="attendeeEmail"
					name="attendeeEmail"
					onChange={props.handleChange}
					value={props.email}
				/>
			</div>
			<div className="addonMultiFormElement">
				<button className="button" onClick={props.handleAddAttendeeClick}>
					Add Attendee
				</button>
			</div>
		</div>
		<div style={{ color: '#CC0000' }}>{props.errorMessage}</div>
	</>
);

export default MultiAddonForm;
