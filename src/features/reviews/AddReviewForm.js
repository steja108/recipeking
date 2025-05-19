import React, { useState } from 'react';
import { useAddReviewMutation } from './reviewsApiSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './Reviews.css';

const AddReviewForm = ({ recipeId }) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');
    const [addReview, { isLoading }] = useAddReviewMutation();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (rating === 0) {
            setError('Please select a rating');
            return;
        }

        if (comment.trim() === '') {
            setError('Please enter a comment');
            return;
        }

        try {
            await addReview({ 
                recipeId, 
                reviewData: { rating, comment } 
            }).unwrap();
            
            // Reset form after successful submission
            setRating(0);
            setComment('');
            setSuccess('Your review has been added!');
            
            // Clear success message after 3 seconds
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err?.data?.message || 'Failed to add review. Please try again.');
        }
    };

    const handleStarClick = (selectedRating) => {
        setRating(selectedRating);
    };

    const handleStarHover = (hoveredRating) => {
        setHoverRating(hoveredRating);
    };

    const handleStarLeave = () => {
        setHoverRating(0);
    };

    return (
        <div className="add-review-container">
            <h3 className="add-review-heading">Write a Review</h3>
            
            {error && <div className="review-error">{error}</div>}
            {success && <div className="review-success">{success}</div>}
            
            <form onSubmit={handleSubmit} className="review-form">
                <div className="rating-stars">
                    {[1, 2, 3, 4, 5].map(star => (
                        <FontAwesomeIcon
                            key={star}
                            icon={faStar}
                            className={`star-select ${star <= (hoverRating || rating) ? 'filled' : ''}`}
                            onClick={() => handleStarClick(star)}
                            onMouseEnter={() => handleStarHover(star)}
                            onMouseLeave={handleStarLeave}
                        />
                    ))}
                    <span className="rating-text">
                        {rating ? `${rating} ${rating === 1 ? 'Star' : 'Stars'}` : 'Select Rating'}
                    </span>
                </div>
                
                <textarea
                    className="review-textarea"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your thoughts about this recipe..."
                    rows={4}
                    required
                />
                
                <button 
                    type="submit" 
                    className="submit-review-btn"
                    disabled={isLoading}
                >
                    {isLoading ? 'Submitting...' : 'Submit Review'}
                </button>
            </form>
        </div>
    );
};

export default AddReviewForm;