import { User } from "../schemas/users";
import { Sneaker } from "../schemas/sneaker";


export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id).select('-__v');;

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                status: 'failure'
            });
        }

        return res.status(200).json({
            items: user,
            message: 'User data fetched succesfully.',
            status: 'success'
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Error getting user',
            status: 'failure'
        });
    }
};


export const createUser = async (req, res) => {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                message: 'Invalid input data',
                status: 'failure'
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: 'Email already exists',
                status: 'failure'
            });
        }

        const newUser = await User.insertOne({ name, email });

        return res.status(201).json({
            items: newUser,
            message: 'User created successfully',
            status: 'success'
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Error creating user',
            status: 'failure'
        });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        if (!updateData.name || !updateData.email) {
            return res.status(400).json({
                message: 'Invalid input data',
                status: 'failure'
            });
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            updateData,
            { new: true, select: '-__v' }
        );

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found",
                status: "failure"
            });
        }

        return res.status(200).json({
            items: updatedUser,
            message: "User successfully updated",
            status: "success"
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Error updating user',
            status: 'failure'
        });
    }
};


export const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                status: "failure"
            });
        }

        return res.status(204).send();

    } catch (error) {
        return res.status(500).json({
            message: 'Error deleting user',
            status: 'failure'
        });
    }
};

export const getFavorites = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).populate("favorites");

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                status: "failure"
            });
        }

        if (user.favorites.length == 0) {
            return res.status(404).json({
                message: "No favorites available",
                status: "failure"
            });
        }

        return res.status(200).json({
            items: user.favorites,
            message: "Favorites data fetched succesfully.",
            status: "success"
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching favorites',
            status: 'failure'
        });
    }
};


export const addFavorite = async (req, res) => {
    try {
        const { id } = req.params;
        const { sneakerId } = req.body;

        const user = await User.findById(id);
        const sneaker = await Sneaker.findById(sneakerId);

        if (!user || !sneaker) {
            return res.status(404).json({
                message: "User or sneaker not found",
                status: "failure"
            });
        }

        if (!user.favorites.includes(sneakerId)) {
            user.favorites.push(sneakerId);
            await user.save();
        }

        return res.status(201).json({
            items: user.favorites,
            message: "Sneaker added to favorites",
            status: "success"
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Error adding favorite',
            status: 'failure'
        });
    }
};


export const removeFavorite = async (req, res) => {
    try {
        const { id, sneakerId } = req.params;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                status: "failure"
            });
        }

        const index = user.favorites.findIndex(
            (fav) => fav.toString() === sneakerId
        );

        if (index === -1) {
            return res.status(404).json({
              message: "Sneaker not found in favorites",
              status: "failure"
            });
        }

        user.favorites.splice(index, 1);
        await user.save();

        return res.status(204).send();

    } catch (error) {
        return res.status(500).json({
            message: 'Error removing favorite',
            status: 'failure'
        });
    }
};
