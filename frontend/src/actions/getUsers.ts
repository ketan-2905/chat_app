import API from "../../lib/axios"
import { AuthUser } from "../../lib/types";

export default async function getUsers(userIds: string[]):Promise<AuthUser[] | undefined>{
try {
    let queryString = '';
    userIds.map(userId => queryString = queryString+`ids=${userId}&`)
    queryString = queryString.slice(0, queryString.length-1)
    console.log(`/user/getUsers?${queryString}`);
    const user = await API.get(`/user/getUsers?${queryString}`).then(data => data)
    console.log(user.data);
    return user.data
} catch (error) {
    console.error(error)
}
}