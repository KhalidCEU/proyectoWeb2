import express from 'express';
import sneakersRouter from './sneakers';
import storesRouter from './stores';
import providersRouter from './provider';
import usersRouter from './users';

const router = express.Router()

router.use('/sneakers', sneakersRouter);
router.use('/stores', storesRouter);
router.use('/providers', providersRouter);
router.use('/users', usersRouter);

export default router;