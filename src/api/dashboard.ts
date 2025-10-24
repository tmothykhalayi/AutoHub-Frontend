import { getAccessTokenHelper } from "@/lib/authHelper";
import { url } from "./url";

export const adminDashboardFn =async()=>{
    const token =await getAccessTokenHelper()
    const response = await fetch(`${url}/customers/admin/dashboard`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        },
    });
    

    
    return response.json();
}