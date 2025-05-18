import express from 'express';
import {
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    getFavorites,
    addFavorite,
    removeFavorite
} from '../controllers/users';

const usersRouter = express.Router();

// POST /users
usersRouter.post('/', createUser);

// GET /users/:id
usersRouter.get('/:id', getUserById);

// PUT /users/:id
usersRouter.put('/:id', updateUser);

// DELETE /users/:id
usersRouter.delete('/:id', deleteUser);

// GET /users/:id/favorites
usersRouter.get('/:id/favorites', getFavorites);

// POST /users/:id/favorites
usersRouter.post('/:id/favorites', addFavorite);

// DELETE /users/:id/favorites/:sneakerId
usersRouter.delete('/:id/favorites/:sneakerId', removeFavorite);

export default usersRouter;
