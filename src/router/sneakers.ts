import express from 'express';
import {
    getSneakers,
    getSneakerById,
    createSneaker,
    updateSneakerById,
    deleteSneakerById
} from '../controllers/sneakers';

const sneakersRouter = express.Router();

sneakersRouter.get('/', getSneakers);
sneakersRouter.get('/:sneakerId', getSneakerById);

sneakersRouter.post('/', createSneaker);

sneakersRouter.put('/:sneakerId', updateSneakerById);

// DELETE
sneakersRouter.delete('/:sneakerId', deleteSneakerById);

export default sneakersRouter;