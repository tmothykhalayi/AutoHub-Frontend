// hooks/useGetCustomerOrders.ts
import { getCustomerDashboardStat, getCustomerOrderId, getOrderbyCustomerId } from '@/api/customer'
import { useQuery } from '@tanstack/react-query'

export const useGetCustomerOrders = (id: string) => {
  return useQuery({
    queryKey: ['customer-orders', id],
    queryFn: () => getOrderbyCustomerId(id),
    enabled: !!id,
    refetchInterval: 1000 * 60 * 5,
  })
}


export const useGetCustomerDashboardStat = (id: string) => {
  return useQuery({
    queryKey: ['customer-dashboard-stat', id],
    queryFn: () => getCustomerDashboardStat(id),
    enabled: !!id,
    refetchInterval: 1000 * 60 * 5,
  })
}


export const useGetCustomerOrderId = (orderId: string) => {
  return useQuery({
    queryKey: ['customer-order-id', orderId],
    queryFn: () => getCustomerOrderId(orderId),
    enabled: !!orderId,
    refetchInterval: 1000 * 60 * 5,
  })
}