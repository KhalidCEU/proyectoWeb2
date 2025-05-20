import express from 'express';
import {
    createUser,
    getUserById,
    updateUser,
    deleteUserById,
    getFavorites,
    addFavorite,
    removeFavorite
} from '../controllers/users';

const usersRouter = express.Router();

// GET
usersRouter.get('/:id', getUserById);
usersRouter.get('/:id/favorites', getFavorites);

// POST
usersRouter.post('/', createUser);
usersRouter.post('/:id/favorites', addFavorite);

// PUT
usersRouter.put('/:id', updateUser);

// DELETE
usersRouter.delete('/:id', deleteUserById);
usersRouter.delete('/:id/favorites/:sneakerId', removeFavorite);

export default usersRouter;
