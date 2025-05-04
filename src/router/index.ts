import express from 'express';
import sneakersRouter from './sneakers';

const router = express.Router()

router.use('/sneakers', sneakersRouter);


export default router;