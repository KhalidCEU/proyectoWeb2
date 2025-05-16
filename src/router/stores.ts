import express from 'express';
import {
    getStores,
    getStoreById,
    createStore,
    updateStoreById,
    deleteStoreById
} from '../controllers/stores';

const storesRouter = express.Router();

// GET
storesRouter.get('/', getStores);
storesRouter.get('/:storeId', getStoreById);

// POST
storesRouter.post('/', createStore);

// PUT
storesRouter.put('/:storeId', updateStoreById);

// DELETE
storesRouter.delete('/:storeId', deleteStoreById);

export default storesRouter;
