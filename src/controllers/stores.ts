import { Store } from "../schemas/store";

export const getStores = async (req, res) => {
    const stores = await Store.find();
    if (!stores.length) {
        return res.status(404).json({ message: "No stores found", status: "failure" });
    }
    res.status(200).json({ items: stores, count: stores.length, status: "success" });
};

export const getStoreById = async (req, res) => {
    const { id } = req.params;
    const store = await Store.findOne({ id });
    if (!store) return res.status(404).json({ message: "Store not found", status: "failure" });
    res.status(200).json({ items: store, status: "success" });
};

export const createStore = async (req, res) => {
    try {
        const newStore = new Store(req.body);
        await newStore.save();
        res.status(201).json({ items: newStore, status: "success" });
    } catch (error) {
        res.status(400).json({ message: "Invalid input", status: "failure" });
    }
};

export const updateStoreById = async (req, res) => {
    const { id } = req.params;
    const store = await Store.findOneAndUpdate({ id }, req.body, { new: true });
    if (!store) return res.status(404).json({ message: "Store not found", status: "failure" });
    res.status(200).json({ items: store, status: "success" });
};

export const deleteStoreById = async (req, res) => {
    const { id } = req.params;
    const store = await Store.findOneAndDelete({ id });
    if (!store) return res.status(404).json({ message: "Store not found", status: "failure" });
    res.status(200).json({ message: "Store deleted", status: "success" });
};
