import express from 'express';
import sneakersRouter from './sneakers';
import storesRouter from './stores';
import usersRouter from './users';
import reviewsRouter from './reviews';

const router = express.Router()

router.use('/sneakers', sneakersRouter);
router.use('/stores', storesRouter);
router.use('/users', usersRouter);
router.use('/reviews', reviewsRouter);

export default router;