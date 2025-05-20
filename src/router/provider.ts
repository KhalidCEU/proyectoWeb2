import express from 'express';
import {
    getProviders,
    getProviderById,
    createProvider,
    updateProviderById,
    deleteProviderById
} from '../controllers/provider';

const providersRouter = express.Router();

// GET
providersRouter.get('/', getProviders);
providersRouter.get('/:id', getProviderById);

// POST
providersRouter.post('/', createProvider);

// PUT
providersRouter.put('/:id', updateProviderById);

// DELETE
providersRouter.delete('/:id', deleteProviderById);

export default providersRouter;
