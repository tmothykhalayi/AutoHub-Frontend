import { getCounties } from "@/api/location"
import { useQuery } from "@tanstack/react-query"

export const useCountyQuery = () => {
  return useQuery({
    queryKey: ['location'],
    queryFn: getCounties
  })
}