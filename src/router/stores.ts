import express from 'express';
import {
    getStores,
    getStoreById,
    createStore,
    updateStoreById,
    deleteStoreById
} from '../controllers/stores';

const storesRouter = express.Router();

storesRouter.get('/', getStores);
storesRouter.get('/:id', getStoreById);
storesRouter.post('/', createStore);
storesRouter.put('/:id', updateStoreById);
storesRouter.delete('/:id', deleteStoreById);

export default storesRouter;
