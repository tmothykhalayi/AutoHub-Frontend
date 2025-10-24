import { getVendorDashboard } from "@/api/vendor"
import { useQuery } from "@tanstack/react-query"

export const useGetVendorDashboard = (id: string) => {
  return useQuery({
    queryKey: ['vendor-dashboard', id],
    queryFn: () => getVendorDashboard(id),
    enabled: !!id
  })
}
