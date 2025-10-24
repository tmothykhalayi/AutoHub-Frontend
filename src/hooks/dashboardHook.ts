import { adminDashboardFn } from "@/api/dashboard";
import { useQuery } from "@tanstack/react-query";

export const adminDashboardHook =()=>{
    return useQuery({
        queryKey: ['adminDashboard'],
        queryFn: ()=>adminDashboardFn(),
        refetchOnWindowFocus: false,
        retry: false,
    });
}

