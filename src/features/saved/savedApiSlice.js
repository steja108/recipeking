// features/saved/savedApiSlice.js
import { apiSlice } from "../../app/api/apiSlice";

export const savedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getSavedRecipes: builder.query({
            query: () => '/users/saved-recipes',
            providesTags: ['SavedRecipes']
        }),
        
        // For toggling saved recipes
        toggleSavedRecipe: builder.mutation({
            query: (recipeId) => ({
                url: '/users/save-recipe',
                method: 'PATCH',
                body: { recipeId }
            }),
            invalidatesTags: ['SavedRecipes']
        })
    })
});

export const { 
    useGetSavedRecipesQuery,
    useToggleSavedRecipeMutation 
} = savedApiSlice;