import React from 'react';
import Transaction from './Transaction';

export default function Transactions({ transactions }) {
	return (
		<div className="section_transactions">
			<ul>
				{transactions.map(({ id, day, type, category, description, value }, index) => {
					return (
						<Transaction
							key={id}
							id={id}
							day={day}
							type={type}
							category={category}
							description={description}
							value={value}
						/>
					);
				})}
			</ul>
		</div>
	);
}
