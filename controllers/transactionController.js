const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const TransactionModel = require('../models/TransactionModel');

const validatePeriod = (period) => {
	if (typeof period === 'string' && period.length === 7) {
		const part1 = period.split('-')[0];
		const part2 = period.split('-')[1];
		if (part2) {
			if (part1.length === 4 && part2.length === 2) {
				return true;
			}
		}
	}

	return false;
};

const find = async (req, res) => {
	const { period, filter } = req.query;

	if (!period || !validatePeriod(period)) {
		return res
			.status(400)
			.send({ message: 'É necessário informar o parâmetro "period", cujo valor deve estar no formato yyyy-mm' });
	}

	const condition = filter
		? { description: { $regex: new RegExp(filter), $options: 'i', yearMonth: period } }
		: { yearMonth: period };

	try {
		const transactions = await TransactionModel.find(condition).sort({ day: 1, category: 1, description: 1 });

		if (transactions.length === 0) {
			return res.status(400).send({ message: `Nenhuma transação encontrada para o período ${period};` });
		}

		return res.send(transactions);
	} catch (error) {
		return res.status(500).send({ error: `Erro ao buscar as transações do período ${period}.` });
	}
};

module.exports = { find };
