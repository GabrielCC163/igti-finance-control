import React, { useState, useEffect } from 'react';
import ModalReact from './components/ModalReact';

import PeriodFilter from './components/PeriodFilter';
import Resume from './components/Resume';
import Button from './components/Button';
import InputField from './components/InputField';
import Transactions from './components/Transactions';

import moment from 'moment';
import axios from 'axios';
import Loading from './tools/Loading';

const currPeriod = moment().lang('pt-br').format('YYYY-MM');
const currYear = parseInt(moment().format('YYYY'));

const calcResume = (records) => {
	const incomeValue = records.filter(({ type }) => type === '+').reduce((acc, item) => {
		return item.value + acc;
	}, 0);
	const expenseValue = records.filter(({ type }) => type === '-').reduce((acc, item) => {
		return item.value + acc;
	}, 0);

	return { incomeValue, expenseValue };
};

export default function App() {
	const [ period, setPeriod ] = useState(currPeriod);
	const [ disabledPrev, setDisabledPrev ] = useState(false);
	const [ disabledNext, setDisabledNext ] = useState(false);
	const [ transactions, setTransactions ] = useState([]);
	const [ isLoaded, setIsLoaded ] = useState(false);
	const [ income, setIncome ] = useState(0);
	const [ expense, setExpense ] = useState(0);
	const [ filter, setFilter ] = useState('');
	const [ modalIsOpen, setIsOpen ] = useState(false);

	const openModal = () => {
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	useEffect(
		() => {
			setIsLoaded(false);
			fetchData();
		},
		[ period, filter ]
	);

	const fetchData = async () => {
		try {
			const result = await axios.get(`http://localhost:3001/api/transaction?period=${period}&filter=${filter}`);
			let json = result.data;

			const { incomeValue, expenseValue } = calcResume(json);
			setIncome(incomeValue);
			setExpense(expenseValue);
			setTransactions(json);
			setIsLoaded(true);
		} catch (err) {
			console.log(err);
		}
	};

	const handleChangePeriod = (event = null, value = null) => {
		const selectedPeriod = value ? value : event.target.value;

		setPeriod(selectedPeriod);

		if (`${selectedPeriod}-01` === `${parseInt(currYear) - 1}-01-01`) {
			setDisabledPrev(true);
		}
		if (`${selectedPeriod}-01` === `${parseInt(currYear) + 1}-12-01`) {
			setDisabledNext(true);
		}
	};

	const handleClickFilter = (action) => {
		let newPeriod = '';

		if (action === 'prev') {
			newPeriod = moment(`${period}-01`).add(-1, 'months').lang('pt-br').format('YYYY-MM');
			setDisabledNext(false);
		} else {
			newPeriod = moment(`${period}-01`).add(1, 'months').lang('pt-br').format('YYYY-MM');
			setDisabledPrev(false);
		}

		handleChangePeriod(null, newPeriod);
	};

	const handleChangeFilter = (event) => {
		setFilter(event.target.value);
	};

	return (
		<div className="container">
			<div className="center">
				<h1>Bootcamp Full Stack - Desafio Final</h1>
				<h2>Controle Financeiro Pessoal</h2>
			</div>

			<PeriodFilter
				handleChange={handleChangePeriod}
				value={period}
				handleClick={handleClickFilter}
				disabledNext={disabledNext}
				disabledPrev={disabledPrev}
			/>
			<Resume transactions={transactions.length} income={income} expense={expense} balance={income - expense} />
			<div className="actions">
				<Button text={'+ Novo Lançamento'} handleClick={openModal} />
				<InputField placeholder="Filtro" value={filter} handleChange={handleChangeFilter} />

				<ModalReact isOpen={modalIsOpen} onRequestClose={closeModal} edicao={false} />
			</div>

			{!isLoaded ? (
				<div className="loading">
					<Loading type="spinningBubbles" color="#26a69a" />
				</div>
			) : (
				<Transactions transactions={transactions} />
			)}
		</div>
	);
}
