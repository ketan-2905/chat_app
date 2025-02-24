import API from "../../lib/axios"
import { AuthUser } from "../../lib/types"

export default async function getUser(userId: string): Promise<AuthUser|undefined> {
try {
    const user = await API.get(`/user/getUser/${userId}`).then(data => data)
    return user.data
} catch (error) {
    console.error(error)
}
}

