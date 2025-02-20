import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import {jwtDecode} from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isManager = false
    let isAdmin = false
    let status = "Reader"

    if (token) {
        const decoded = jwtDecode(token)
        const { username, roles } = decoded.UserInfo

        isManager = roles.includes('Writer')
        isAdmin = roles.includes('Admin')

        if (isManager) status = "Writer"
        if (isAdmin) status = "Admin"

        return { username, roles, status, isManager, isAdmin, token }
    }

    return { username: '', roles: [], isManager, isAdmin, status, token }
}
export default useAuth