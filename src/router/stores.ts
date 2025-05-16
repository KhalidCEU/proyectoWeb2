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
storesRouter.get('/:storeId', getStoreById);
storesRouter.post('/', createStore);
storesRouter.put('/:storeId', updateStoreById);
storesRouter.delete('/:storeId', deleteStoreById);

export default storesRouter;
