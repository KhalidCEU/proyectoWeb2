import { Store } from "../schemas/store";

export const getStores = async (req, res) => {
    try {
        const stores = await Store.find();

        if (!stores.length) {
            return res.status(404).json({ message: "No stores found", status: "failure" });
        }

        return res.status(200).json({
            items: stores, count: stores.length, message: 'Stores data fetched successfully', status: "success"
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

        const store = await Store.findOne({ _id: storeId });

        if (!store) {
            return res
                .status(404)
                .json({
                    message: 'Store not found',
                    status: 'failure'
            })
        }

        return res.status(200).json({
                items: store,
                status: "success"
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching stores',
            status: 'failure'
        });
    }

};

export const createStore = async (req, res) => {
    try {
        const storeData = req.body;
        const store = await Store.insertOne(storeData);

        const address = storeData.address;

        if (address.length < 10 || address.length > 100) {
            return res
                .status(400)
                .json({
                    message: 'Invalid input data',
                    status: 'failure'
                });
        }

        return res
            .status(201)
            .json({
                items: store,
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

        if (updateData.address) {
            if (updateData.address.length < 10 || updateData.address.length > 100) {
                return res.status(400).json({
                    message: 'Invalid input data',
                    status: 'failure'
                });
            }
        }

        const updatedStore = await Store.findByIdAndUpdate(
            storeId,
            updateData,
            { new: true }
        );

        if (!updatedStore) {
            return res.status(404).json({
                message: "Store not found",
                status: "failure"
            });
        }

        return res.status(200).json({
            items: updatedStore,
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

        const deleted = await Store.findByIdAndDelete(storeId);

        if (!deleted) {
            return res.status(404).json({
                message: "Store not found",
                status: "failure"
            });
        }

        return res.status(200).json({
            items: deleted,
            message: 'Store deleted successfully',
            status: 'success'
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Error deleting store',
            status: 'failure'
        });
    }
};
