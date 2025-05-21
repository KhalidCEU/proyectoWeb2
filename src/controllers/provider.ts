import { Provider } from "../schemas/provider";

export const getProviders = async (req, res) => {
    try {
        const providers = await Provider.find().select('-__v');

        if (!providers || providers.length === 0) {
            return res.status(404).json({
                message: 'No providers found',
                status: 'failure'
            });
        }

        return res.status(200).json({
            items: providers,
            count: providers.length,
            message: 'Providers data fetched successfully',
            status: 'success'
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching providers',
            status: 'failure'
        });
    }
};

export const getProviderById = async (req, res) => {
    const { id } = req.params;

    try {
        const provider = await Provider
            .findById(id)
            .select('-__v');

        if (!provider) {
            return res.status(404).json({
                message: 'Provider not found',
                status: 'failure'
            });
        }

        return res.status(200).json({
            items: provider,
            message: 'Provider data fetched successfully',
            status: 'success'
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching provider',
            status: 'failure'
        });
    }
};

export const createProvider = async (req, res) => {
    try {
        const providerData = req.body;

        if (!providerData.name || !providerData.contact_email) {
            return res.status(400).json({
                message: 'Invalid input data',
                status: 'failure'
            });
        }

        const provider = await Provider.insertOne(providerData);

        return res.status(201).json({
            items: provider,
            message: 'Provider created successfully',
            status: 'success'
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Error creating provider',
            status: 'failure'
        });
    }
};

export const updateProviderById = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const provider = await Provider.findByIdAndUpdate(
            id,
            updateData,
            { new: true, select: '-__v'}
        );

        if (!provider) {
            return res.status(404).json({
                message: 'Provider not found',
                status: 'failure'
            });
        }

        if (!updateData.name || !updateData.contact_email) {
            return res.status(400).json({
                message: 'Invalid input data',
                status: 'failure'
            });
        }

        return res.status(200).json({
            items: provider,
            message: 'Provider updated successfully',
            status: 'success'
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Error updating provider',
            status: 'failure'
        });
    }
};

export const deleteProviderById = async (req, res) => {
    const { id } = req.params;

    try {
        const provider = await Provider.findByIdAndDelete(id);

        if (!provider) {
            return res.status(404).json({
                message: 'Provider not found',
                status: 'failure'
            });
        }

        return res.status(204).send();

    } catch (error) {
        return res.status(500).json({
            message: 'Error deleting provider',
            status: 'failure'
        });
    }
};
