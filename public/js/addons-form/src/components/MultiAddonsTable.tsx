import { Addon } from '../types';
import React from 'react';

interface Props {
	addons: Addon[];
	handleDeleteClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const AddonsTable: React.FC<Props> = (props: Props) => (
	<table>
		<thead>
			<tr>
				<th style={{ width: '10%' }} />
				<th style={{ width: '30%' }}>First Name</th>
				<th style={{ width: '30%' }}>Surname</th>
				<th style={{ width: '18%' }}>Email</th>
				<th style={{ width: '12%' }} />
			</tr>
		</thead>
		<tbody>
			{props.addons.length === 0 ? (
				<tr>
					<td colSpan={5} style={{ textAlign: 'center' }}>
						No attendees added yet. Use the form below to add your first attendee.
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
);

export default AddonsTable;
