import express from 'express';
import sneakersRouter from './sneakers';
import storesRouter from './stores';

const router = express.Router()

router.use('/sneakers', sneakersRouter);
router.use('/stores', storesRouter);


export default router;