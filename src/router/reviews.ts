import express from 'express';
import {
    getReviewById,
    updateReviewById,
    deleteReviewById
} from '../controllers/reviews';

const reviewsRouter = express.Router();

reviewsRouter.get('/:reviewId', getReviewById);

reviewsRouter.put('/:reviewId', updateReviewById);

reviewsRouter.delete('/:reviewId', deleteReviewById);

export default reviewsRouter;