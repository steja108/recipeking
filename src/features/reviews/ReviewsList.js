import React from 'react';
import { useGetReviewsQuery, useDeleteReviewMutation } from './reviewsApiSlice';
import useAuth from '../../hooks/useAuth';
import { formatDistanceToNow } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faTrash } from '@fortawesome/free-solid-svg-icons';
import './Reviews.css';

const ReviewsList = ({ recipeId }) => {
    const { data: reviews, isLoading, isError, error } = useGetReviewsQuery(recipeId);
    const [deleteReview] = useDeleteReviewMutation();
    const { username, isAdmin } = useAuth();

    const handleDeleteReview = async (reviewId) => {
        try {
            await deleteReview({ recipeId, reviewId }).unwrap();
        } catch (err) {
            console.error('Failed to delete review:', err);
        }
    };

    const renderStars = (rating) => {
        return Array(5).fill().map((_, i) => (
            <FontAwesomeIcon 
                key={i} 
                icon={faStar} 
                className={i < rating ? "star filled" : "star"} 
            />
        ));
    };

    if (isLoading) return <div className="loading">Loading reviews...</div>;
    if (isError) return <div className="error">Error: {error?.data?.message || "Failed to load reviews"}</div>;
    if (!reviews?.length) return <div className="no-reviews">No reviews yet. Be the first to review!</div>;

    return (
        <div className="reviews-list">
            <h3 className="reviews-heading">Customer Reviews</h3>
            {reviews.map(review => (
                <div key={review._id} className="review-card">
                    <div className="review-header">
                        <div className="reviewer-info">
                            <span className="reviewer-name">{review.user.username}</span>
                            <span className="review-date">
                                {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
                            </span>
                        </div>
                        <div className="review-rating">
                            {renderStars(review.rating)}
                        </div>
                    </div>
                    <p className="review-comment">{review.comment}</p>
                    
                    {(username === review.user.username || isAdmin) && (
                        <button 
                            className="delete-review-btn"
                            onClick={() => handleDeleteReview(review._id)}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ReviewsList;