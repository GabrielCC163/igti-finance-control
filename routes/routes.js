const express = require('express');
const transactionController = require('../controllers/transactionController');

const transactionRouter = express.Router();

transactionRouter.get('/', transactionController.find);
//transactionRouter.post('/', transactionController.create);
//transactionRouter.put('/:id', transactionController.update);
//transactionRouter.delete('/:id', transactionController.remove);

module.exports = transactionRouter;
