import express from 'express';
import sneakersRouter from './sneakers';
import storesRouter from './stores';
import providersRouter from './provider';

const router = express.Router()

router.use('/sneakers', sneakersRouter);
router.use('/stores', storesRouter);
router.use('/providers', providersRouter);


export default router;