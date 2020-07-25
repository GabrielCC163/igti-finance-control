import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const customStyles = {
	content: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		border: '1px solid rgb(204, 204, 204)',
		background: 'rgb(255, 255, 255)',
		overflow: 'auto',
		borderRadius: '4px',
		outline: 'none',
		padding: '20px',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)'
	},
	overlay: {
		zIndex: 10
	}
};

export default function ModalDetail({ isOpen, onRequestClose, edicao, handleSubmit, id }) {
	const [ transaction, setTransaction ] = useState([]);
	const [ type, setType ] = useState('');
	const [ description, setDescription ] = useState('');
	const [ category, setCategory ] = useState('');
	const [ value, setValue ] = useState(0);

	const handleChangeType = (event) => {
		setType(event.target.value);
	};
	const handleChangeDescription = (event) => {
		setDescription(event.target.value);
	};
	const handleChangeCategory = (event) => {
		setCategory(event.target.value);
	};
	const handleChangeValue = (event) => {
		setValue(event.target.value);
	};

	const afterOpenModal = async () => {
		const tr = await axios.get(`http://localhost:3001/api/transaction/${id}`);
		const json = tr.data;
		setType(json.type);
		setDescription(json.description);
		setCategory(json.category);
		setValue(json.value);
	};

	return (
		<Modal
			onAfterOpen={afterOpenModal}
			ariaHideApp={false}
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			style={customStyles}
			contentLabel=""
		>
			<div>
				<div
					style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
					className="modal_container"
				>
					<h3 style={{ marginRight: '10px', fontWeight: 'bold' }}>
						{edicao ? 'Edição' : 'Inclusão'} de lançamento
					</h3>
					<button className="waves-effect waves-light btn red darken-4" onClick={onRequestClose}>
						X
					</button>
				</div>

				<form onSubmit={handleSubmit}>
					<div
						style={{
							border: '1px solid lightgrey',
							borderRadius: '4px',
							padding: '10px',
							marginBottom: '10px'
						}}
					>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								marginBottom: '30px'
							}}
						>
							<label style={{ marginRight: '10px', marginLeft: '10px', padding: '20px' }}>
								<input
									type="radio"
									name="expense-earning"
									value="-"
									checked={type === '-' ? true : false}
									disabled={edicao ? true : false}
									onChange={handleChangeType}
								/>
								<span className="modal_type_expense">Despesa</span>
							</label>
							<label style={{ marginRight: '10px', marginLeft: '10px', padding: '20px' }}>
								<input
									type="radio"
									name="expense-earning"
									value="+"
									checked={type === '+' ? true : false}
									disabled={edicao ? true : false}
									onChange={handleChangeType}
								/>
								<span className="modal_type_earning">Receita</span>
							</label>
						</div>
						<div className="input-field">
							<input
								type="text"
								id="inputDescription"
								value={description}
								required
								onChange={handleChangeDescription}
							/>
							<label htmlFor="inputDescription" className="active">
								Descrição:
							</label>
						</div>
						<div className="input-field">
							<input
								type="text"
								id="inputCategory"
								value={category}
								required
								onChange={handleChangeCategory}
							/>
							<label htmlFor="inputCategory" className="active">
								Categoria:
							</label>
						</div>
						<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
							<div style={{ marginRight: '10px' }} className="input-field">
								<input
									type="number"
									id="inputValue"
									min="0"
									step="0.01"
									value={value}
									required
									onChange={handleChangeValue}
								/>
								<label htmlFor="inputValue" className="active">
									Valor:
								</label>
							</div>
							<input className="browser-default" type="date" placeholder="Data" required />
						</div>
					</div>
					<input className="waves-effect waves-light btn" type="submit" value="Salvar" disabled={false} />
				</form>
			</div>
		</Modal>
	);
}
