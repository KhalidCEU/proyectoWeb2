import { Sneaker } from "../schemas/sneaker";
import { getCurrencyRate } from "./utils/currency";

export const getSneakers = async (req, res) => {
    try {
        const { release_date_after, limit = 20, currency } = req.query;

        let query = {};

        // Release date query param handling
        if (release_date_after) {
            const date = new Date(release_date_after);

            if (isNaN(date.getTime())) {
                return res.status(400).json({
                    message: 'Invalid release date format',
                    status: 'failure'
                });
            }
            query = { ...query, release_date: { $gte: date } };
        }

        // Limit validation
        if (limit && (limit < 1 || limit > 100)) {
            return res.status(400).json({
                message: 'Limit must be between 1 and 100',
                status: 'failure'
            });
        }

        let currencyRate = 1;

        // Currency conversion handling
        if (currency) {
            try {
                currencyRate = await getCurrencyRate(currency);
            } catch (error) {
                return res.status(400).json({
                    message: 'Invalid currency',
                    status: 'failure'
                });
            }
        }

        const sneakers = await Sneaker.find(query).limit(Number(limit));

        if (!sneakers || sneakers.length === 0) {
            return res.status(404).json({
                message: 'No sneakers found',
                status: 'failure'
            });
        }

        const convertedSneakers = sneakers.map((sneaker) => ({
            ...sneaker.toObject(),
            retail_price: Math.round(sneaker.retail_price * currencyRate * 100) / 100,
            sales_price: Math.round(sneaker.sales_price * currencyRate * 100) / 100
        }));

        return res.status(200).json({
            items: convertedSneakers,
            count: convertedSneakers.length,
            message: 'Sneakers data fetched successfully',
            status: 'success'
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching sneakers',
            status: 'failure'
        });
    }
};


export const getSneakerById = async (req, res) => {
    const { sneakerId } = req.params;

    const sneaker = await Sneaker.findOne({ _id: sneakerId });

    if (!sneaker) {
        return res
            .status(404)
            .json({
                message: 'Sneaker not found',
                status: 'failure'
            });
    }

    return res
        .status(200)
        .json({
            items: sneaker,
            message: 'Sneaker data fetched succesfully.',
            status: 'success'
        })
};

export const createSneaker = async (req, res) => {
    try {
        const sneakerData = req.body;
        const sneaker = await Sneaker.insertOne(sneakerData);

        return res
            .status(201)
            .json({
                items: sneaker,
                message: 'Sneaker created successfully',
                status: 'success'
            });

    } catch (error) {
        return res
            .status(500)
            .json({
                message: 'Error creating sneaker',
                status: 'failure'
            });
    }
};

export const updateSneakerById = async (req, res) => {
    try {
        const { sneakerId } = req.params;
        const updateData = req.body;

        const sneaker = await Sneaker.findByIdAndUpdate(
            sneakerId,
            updateData,
            { new: true }
        );

        if (!sneaker) {
            return res
                .status(404)
                .json({
                    message: 'Sneaker not found',
                    status: 'failure'
                });
        }

        return res
            .status(200)
            .json({
                items: sneaker,
                message: 'Sneaker updated successfully',
                status: 'success'
            });

    } catch (error) {
        return res
            .status(500)
            .json({
                message: 'Error updating sneaker',
                status: 'failure'
            });
    }
};

export const deleteSneakerById = async (req, res) => {
    try {
        const { sneakerId } = req.params;

        const sneaker = await Sneaker.findByIdAndDelete(sneakerId);

        if (!sneaker) {
            return res
                .status(404)
                .json({
                    message: 'Sneaker not found',
                    status: 'failure'
                });
        }

        return res
            .status(200)
            .json({
                items: sneaker,
                message: 'Sneaker deleted successfully',
                status: 'success'
            });

    } catch (error) {
        return res
            .status(500)
            .json({
                message: 'Error deleting sneaker',
                status: 'failure'
            });
    }
};