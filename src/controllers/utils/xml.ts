
export const cleanReviewForXml = (review) => {
    return {
        _id: review._id?.toString(),
        sneakerId: review.sneakerId?.toString(),
        userId: review.userId?.toString(),
        rating: review.rating,
        comment: review.comment,
        date: review.date instanceof Date ? review.date.toISOString() : review.date
    };
}

