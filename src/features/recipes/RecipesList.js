import { useGetRecipesQuery, useGetManageRecipesQuery } from './recipesApiSlice'
import Recipe from "./Recipe"
import useAuth from "../../hooks/useAuth"
import useTitle from "../../hooks/useTitle"
import PulseLoader from 'react-spinners/PulseLoader'

const RecipesList = () => {
    useTitle('RecipeStar: Recipes List')
    const { isManager, isAdmin } = useAuth()
    const manageRecipes = useGetManageRecipesQuery(undefined, {
        skip: !(isManager || isAdmin),
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })
    
    const allRecipes = useGetRecipesQuery(undefined, {
        skip: (isManager || isAdmin),
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })
    const {
        data: recipes,
        isLoading,
        isSuccess,
        isError,
        error
    } = (isManager || isAdmin) ? manageRecipes : allRecipes

    let content

    if (isLoading) content = <PulseLoader color={"#FFF"} />

    if (isError) content = <p className="errmsg">{error?.data?.message}</p>

    if (isSuccess) {
        const { ids } = recipes
        const tableContent = ids?.length && ids.map(recipeId => (
            <Recipe key={recipeId} recipeId={recipeId} />
        ))

        content = (
            <table className="table table--recipes">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th recipe__title">Title</th>
                        <th scope="col" className="table__th recipe__author">Author</th>
                        <th scope="col" className="table__th recipe__cookingTime">Time</th>
                        <th scope="col" className="table__th recipe__created">Created</th>
                        <th scope="col" className="table__th recipe__edit">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        )
    }

    return content
}
export default RecipesList