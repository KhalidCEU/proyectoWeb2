import { Review } from "../schemas/review";

export const getReviewById = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const review = await Review.findById(reviewId);

        if (!review) {
            return res.status(404).json({
                message: 'Review not found', status: "failure"
            });
        }

        return res.status(200).json({
            items: review,
            message: "Review successfully updated",
            status: "success"
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Error getting review',
            status: 'failure'
        });
    }
}

export const updateReviewById = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const updatedReview = await Review.findByIdAndUpdate(
            reviewId,
            req.body,
            { new: true }
        );

        if (!updatedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }

        return res.status(200).json({
            items: updatedReview,
            message: "Store successfully updated",
            status: "success"
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Error updating review',
            status: 'failure'
        });
    }
}

export const deleteReviewById = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const deletedReview = await Review.findByIdAndDelete(reviewId);

        if (!deletedReview) {
            return res.status(404).json({
                message: 'Review not found',
                status: 'failure'
            });
        }

        return res.status(204).send();

    } catch (error) {
        return res.status(500).json({
            message: 'Error deleting review',
            status: 'failure'
        });
    }
}
