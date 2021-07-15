import { Addon } from '../types';
import React from 'react';

interface Props {
	addons: Addon[];
	email: string;
	firstName: string;
	handleAddAttendeeClick: () => void;
	handleDeleteClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	surname: string;
}

const MultiAddonForm: React.FC<Props> = (props: Props) => (
	<div>
		<h3>Attendees</h3>
		<table>
			<thead>
				<tr>
					<th style={{ width: '10%' }} />
					<th style={{ width: '30%' }}>First Name</th>
					<th style={{ width: '30%' }}>Surname</th>
					<th style={{ width: '15%' }}>Email</th>
					<th style={{ width: '15%' }} />
				</tr>
			</thead>
			<tbody>
				{props.addons.length === 0 ? (
					<tr>
						<td colSpan={5} style={{ textAlign: 'center' }}>
							No attendees added yet.
						</td>
					</tr>
				) : (
					props.addons.map((addon, i) => (
						<tr key={addon.id}>
							<td>{(i + 1).toString()}</td>
							<td>{addon.firstName}</td>
							<td>{addon.surname}</td>
							<td>{addon.email}</td>
							<td>
								<a
									className="button"
									data-index={i.toString()}
									onClick={props.handleDeleteClick}
									style={{ padding: '0.5em' }}
								>
									&times;
								</a>
							</td>
						</tr>
					))
				)}
			</tbody>
		</table>
		<div>
			<div className="addonMultiForm">
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
		</div>
	</div>
);

export default MultiAddonForm;
