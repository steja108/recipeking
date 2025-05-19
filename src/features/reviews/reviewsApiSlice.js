import { apiSlice } from "../../app/api/apiSlice";

export const reviewsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getReviews: builder.query({
            query: (recipeId) => `/api/recipes/${recipeId}/reviews`,
            providesTags: (result, error, arg) => {
                return [{ type: 'Review', id: arg }];
            }
        }),
        
        addReview: builder.mutation({
            query: ({ recipeId, reviewData }) => ({
                url: `/api/recipes/${recipeId}/reviews`,
                method: 'POST',
                body: reviewData
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Review', id: arg.recipeId },
                { type: 'Recipe', id: arg.recipeId }
            ]
        }),
        
        deleteReview: builder.mutation({
            query: ({ recipeId, reviewId }) => ({
                url: `/api/recipes/${recipeId}/reviews/${reviewId}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Review', id: arg.recipeId },
                { type: 'Recipe', id: arg.recipeId }
            ]
        })
    })
});

export const {
    useGetReviewsQuery,
    useAddReviewMutation,
    useDeleteReviewMutation
} = reviewsApiSlice;