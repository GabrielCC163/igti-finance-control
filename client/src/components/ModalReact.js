import React from 'react';
import Modal from 'react-modal';

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

export default function ModalDetail({ isOpen, onRequestClose, edicao }) {
	return (
		<Modal
			ariaHideApp={false}
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			style={customStyles}
			contentLabel="Example Modal"
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

				<form>
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
								<input type="radio" name="expense-earning" value="-" checked />
								<span style={{ color: 'rgb(192, 57, 43)', fontSize: '1.2rem', fontWeight: 'bold' }}>
									Despesa
								</span>
							</label>
							<label style={{ marginRight: '10px', marginLeft: '10px', padding: '20px' }}>
								<input type="radio" name="expense-earning" value="+" />
								<span style={{ color: 'rgb(39, 174, 96)', fontSize: '1.2rem', fontWeight: 'bold' }}>
									Receita
								</span>
							</label>
						</div>
						<div className="input-field">
							<input type="text" id="inputDescription" required />
							<label htmlFor="inputDescription" className="active">
								Descrição:
							</label>
						</div>
						<div className="input-field">
							<input type="text" id="inputCategory" required />
							<label htmlFor="inputCategory" className="active">
								Categoria:
							</label>
						</div>
						<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
							<div style={{ marginRight: '10px' }} className="input-field">
								<input type="number" id="inputValue" min="0" step="0.01" required />
								<label htmlFor="inputValue" className="active">
									Valor:
								</label>
							</div>
							<input className="browser-default" type="date" placeholder="Data" required />
						</div>
					</div>
					<input className="waves-effect waves-light btn" type="submit" value="Salvar" disabled />
				</form>
			</div>
		</Modal>
	);
}
