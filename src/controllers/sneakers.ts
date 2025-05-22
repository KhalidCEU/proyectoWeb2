import { Review } from "../schemas/review";
import { Sneaker } from "../schemas/sneaker";
import { getCurrencyRate } from "./utils/currency";

export const getSneakers = async (req, res) => {
    try {
        const { release_date_after, limit = 20, offset = 0, currency } = req.query;

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
        const parsedLimit = Number(limit);
        if (parsedLimit < 1 || parsedLimit > 100) {
            return res.status(400).json({
                message: 'Limit must be between 1 and 100',
                status: 'failure'
            });
        }

        // Offset validation
        const parsedOffset = Number(offset);
        if (parsedOffset < 0) {
            return res.status(400).json({
                message: 'Offset must be 0 or greater',
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

        const total = await Sneaker.countDocuments(query);

        const sneakers = await Sneaker.find(query)
            .skip(parsedOffset)
            .limit(parsedLimit)
            .select('-__v');

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
            total,
            offset: parsedOffset,
            limit: parsedLimit,
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
    try {
        const { sneakerId } = req.params;

        const sneaker = await Sneaker
            .findOne({ _id: sneakerId })
            .select('-__v');

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
                items: [sneaker],
                message: 'Sneaker data fetched succesfully.',
                status: 'success'
            })

    } catch (error) {
        return res
            .status(500)
            .json({
                message: 'Error getting sneaker',
                status: 'failure'
            });
    }
};

export const createSneaker = async (req, res) => {
    try {
        const sneakerData = req.body;
        const sneaker = await Sneaker.create(sneakerData);

        const sneakerWithoutV = sneaker.toObject();
        delete sneakerWithoutV.__v;

        return res
            .status(201)
            .json({
                items: [sneakerWithoutV],
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
            { new: true, select: '-__v' }
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
                items: [sneaker],
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

        return res.status(204).send();

    } catch (error) {
        return res
            .status(500)
            .json({
                message: 'Error deleting sneaker',
                status: 'failure'
            });
    }
};

export const getSneakerReviews = async (req, res) => {
    const { sneakerId } = req.params;

    try {

        const existingSneaker = await Sneaker.findOne({ _id: sneakerId });

        if (!existingSneaker) {
            return res.status(404).json({
                message: 'Sneaker not found',
                status: 'failure'
            });
        }

        const reviews = await Review.find({ sneakerId }).select('-__v').sort({ date: -1 });

        if (!reviews || reviews.length === 0) {
            return res.status(404).json({
                message: 'No reviews available for this sneaker',
                status: 'failure'
            });
        }

        return res.status(200).json({
            items: reviews,
            message: 'Reviews data fetched successfully',
            status: 'success'
        });

    } catch (error) {

        return res.status(500).json({
            message: 'Error fetching reviews',
            status: 'failure'
        });
    }
};

export const createSneakerReview = async (req, res) => {
    const { sneakerId } = req.params;
    const { rating, comment, userId } = req.body;

    try {
        const existingSneaker = await Sneaker.findOne({ _id: sneakerId });

        if (!existingSneaker) {
            return res.status(404).json({
                    message: 'Sneaker not found',
                    status: 'failure'
            });
        }

        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({
                message: 'Rating must be between 1 and 5',
                status: 'failure'
            });
        }

        const existingReview = await Review.findOne({ sneakerId, userId });

        if (existingReview) {
            return res.status(409).json({
                message: 'You have already reviewed this sneaker',
                status: 'failure'
            });
        }

        const newReview = new Review({
            sneakerId,
            rating,
            userId,
            comment,
            date: new Date()
        });

        await newReview.save();

        const reviewWithoutV = newReview.toObject();
        delete reviewWithoutV.__v;

        return res.status(201).json({
            items: [reviewWithoutV],
            message: 'Review created successfully',
            status: 'success'
        });

    } catch (error) {

        return res.status(500).json({
            message: 'Error creating review',
            status: 'failure'
        });
    }
}

