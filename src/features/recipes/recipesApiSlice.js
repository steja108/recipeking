import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const recipesAdapter = createEntityAdapter({
    selectId: (recipe) => recipe._id, 
    sortComparer: (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
})

const initialState = recipesAdapter.getInitialState()

export const recipesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getRecipes: builder.query({
            query: () => '/api/recipes',
            transformResponse: responseData => {
                return recipesAdapter.setAll(initialState, responseData);
            },
            providesTags: (result) => {
              // Safe handling of possible undefined result
              if (result?.ids) {
                return [
                  { type: 'Recipe', id: 'LIST' },
                  ...result.ids.map(id => ({ type: 'Recipe', id }))
                ]
              }
              // Always return at least the LIST tag
              return [{ type: 'Recipe', id: 'LIST' }];
            }
          }),
          getRecipe: builder.query({
            query: (id) => `/api/recipes/${id}`,
            providesTags: (result, error, id) => [{ type: 'Recipe', id }],
          }),
        addNewRecipe: builder.mutation({
            query: recipeData => ({
                url: '/api/recipes',
                method: 'POST',
                body: {
                    ...recipeData,
                }
            }),
            invalidatesTags: [{ type: 'Recipe', id: "LIST" }],
            
        }),
        getManageRecipes: builder.query({
            query: () => '/api/recipes/manage',
            transformResponse: responseData => {
                return recipesAdapter.setAll(initialState, responseData);
            },
            providesTags: (result) => {
                if (result?.ids) {
                    return [
                        { type: 'Recipe', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Recipe', id }))
                    ]
                }
                return [{ type: 'Recipe', id: 'LIST' }];
            }
        }),
        updateRecipe: builder.mutation({
            query: ({ id, ...recipeData }) => ({ // Destructure id separately
                url: `/api/recipes/${id}`,
                method: 'PATCH',
                body: recipeData
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Recipe', id: arg.id }
            ]
        }),
        deleteRecipe: builder.mutation({
            query: ({ id }) => ({
                url: `/api/recipes/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Recipe', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetRecipesQuery,
    useGetRecipeQuery,
    useGetManageRecipesQuery,
    useAddNewRecipeMutation,
    useUpdateRecipeMutation,
    useDeleteRecipeMutation,
} = recipesApiSlice

// Selectors
export const selectRecipesResult = recipesApiSlice.endpoints.getRecipes.select()
const selectRecipesData = createSelector(
    selectRecipesResult,
    recipesResult => recipesResult.data
)
export const { selectAll: selectAllRecipes, selectById: selectRecipeById } = 
    recipesAdapter.getSelectors(state => selectRecipesData(state) ?? initialState)