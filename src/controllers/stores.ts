import { Store } from "../schemas/store";

export const getStores = async (req, res) => {
    try {
        const stores = await Store.find().select('-__v');

        if (!stores.length) {
            return res.status(404).json({ message: "No stores found", status: "failure" });
        }

        return res.status(200).json({
            items: stores, count: stores.length, status: "success"
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching stores',
            status: 'failure'
        });
    }
};

export const getStoreById = async (req, res) => {
    try {
        const { storeId } = req.params;

        const store = await Store.findOne({ _id: storeId }).select('-__v');

        if (!store) {
            return res
                .status(404)
                .json({
                    message: 'Store not found',
                    status: 'failure'
            })
        }

        return res.status(200).json({
                items: [store],
                message: "Store data fetched succesfully",
                status: "success"
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Error getting store',
            status: 'failure'
        });
    }
};

export const createStore = async (req, res) => {
    try {
        const { address } = req.body;

        if (!address || address.length < 10 || address.length > 100) {
            return res.status(400).json({
                message: 'Invalid input data',
                status: 'failure'
            });
        }

        const store = new Store({ address });
        await store.save();

        return res.status(201).json({
            items: [store],
            message: 'Store created successfully',
            status: 'success'
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Error creating store',
            status: 'failure'
        });
    }
};

export const updateStoreById = async (req, res) => {
    try {
        const { storeId } = req.params;
        const updateData = req.body;

        const address = updateData.address;

        if (!address || address.length < 10 || address.length > 100) {
            return res.status(400).json({
                message: 'Invalid input data',
                status: 'failure'
            });
        }

        const updatedStore = await Store.findOneAndUpdate(
            { _id: storeId },
            updateData,
            { new: true, select: '-__v' }
        );

        if (!updatedStore) {
            return res.status(404).json({
                message: "Store not found",
                status: "failure"
            });
        }

        return res.status(200).json({
            items: [updatedStore],
            message: "Store successfully updated",
            status: "success"
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Error updating store',
            status: 'failure'
        });
    }
};

export const deleteStoreById = async (req, res) => {
    try {
        const { storeId } = req.params;

        const store = await Store.findOneAndDelete({ _id: storeId });

        if (!store) {
            return res.status(404).json({
                message: "Store not found",
                status: "failure"
            });
        }

        return res.status(204).send();

    } catch (error) {
        return res.status(500).json({
            message: 'Error deleting store',
            status: 'failure'
        });
    }
};
