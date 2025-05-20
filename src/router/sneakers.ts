import express from 'express';
import {
    getSneakers,
    getSneakerById,
    createSneaker,
    updateSneakerById,
    deleteSneakerById,
    getSneakerReviews,
    createSneakerReview
} from '../controllers/sneakers';

const sneakersRouter = express.Router();

// GET
sneakersRouter.get('/', getSneakers);
sneakersRouter.get('/:sneakerId', getSneakerById);

sneakersRouter.get('/:sneakerId/reviews', getSneakerReviews);

// POST
sneakersRouter.post('/', createSneaker);
sneakersRouter.post('/:sneakerId/reviews', createSneakerReview);

// PUT
sneakersRouter.put('/:sneakerId', updateSneakerById);

// DELETE
sneakersRouter.delete('/:sneakerId', deleteSneakerById);

export default sneakersRouter;