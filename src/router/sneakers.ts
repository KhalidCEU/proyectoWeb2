import express from 'express';
import {
    getSneakers,
    getSneakerById,
    createSneaker,
    updateSneakerById,
    deleteSneakerById
} from '../controllers/sneakers';

const sneakersRouter = express.Router();

// GET
sneakersRouter.get('/', getSneakers);
sneakersRouter.get('/:sneakerId', getSneakerById);

// POST
sneakersRouter.post('/', createSneaker);

// PUT
sneakersRouter.put('/:sneakerId', updateSneakerById);

// DELETE
sneakersRouter.delete('/:sneakerId', deleteSneakerById);

export default sneakersRouter;