import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  getOrdersFn,
  getOrderByIdFn,
  createOrderFn,
  updateOrderFn,
  deleteOrderFn,
  getOrdersByUserIdFn,
  updateOrderItemFn
} from "@/api/orders"
import type { ApiResponse } from "@/util/types"
import toast from "react-hot-toast"
import type { OrderStatus } from "@/routes/dashboard/orders/current"

// Get all orders with optional filters
export const useOrders = (params: Record<string, any> = {}) => {
  return useQuery({
    queryKey: ['orders', params],
    queryFn: () => getOrdersFn(params),
  })
}

// Get single order by ID
export const useOrderById = (id: string, params: Record<string, any> = {}) => {
  return useQuery({
    queryKey: ['order', id, params],
    queryFn: () => getOrderByIdFn(id, params),
    enabled: !!id, // Only fetch if ID exists
  })
}



// Create new order
export const useCreateOrder = () => {
  const queryClient = useQueryClient()

  return useMutation<ApiResponse<any>, Error, any>({
    mutationKey: ['create-order'],
    mutationFn: (data) => createOrderFn(data),
    onSuccess: (data) => {
      if (data.status === 'success') {
        toast.success('Order created successfully!')
        queryClient.invalidateQueries({ queryKey: ['orders'] })
      } else {
        toast.error(data.message || 'Failed to create order.')
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Something went wrong while creating the order.')
    }
  })
}

// Update order
export const useUpdateOrder = () => {
  const queryClient = useQueryClient()

  return useMutation<ApiResponse<any>, Error, any>({
    mutationKey: ['update-order'],
    mutationFn: (data) => updateOrderFn(data),
    onSuccess: (data) => {
      if (data.status === 'success') {
        toast.success('Order updated successfully!')
        queryClient.invalidateQueries({ queryKey: ['orders'] })
      } else {
        toast.error(data.message || 'Failed to update order.')
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Something went wrong while updating the order.')
    }
  })
}

// Delete order
export const useDeleteOrder = () => {
  const queryClient = useQueryClient()

  return useMutation<ApiResponse<any>, Error, string>({
    mutationKey: ['delete-order'],
    mutationFn: (id) => deleteOrderFn(id),
    onSuccess: (data, id) => {
      if (data.status === 'success') {
        toast.success('Order deleted successfully!')
        queryClient.invalidateQueries({ queryKey: ['orders'] })
        queryClient.removeQueries({ queryKey: ['order', id] })
      } else {
        toast.error(data.message || 'Failed to delete order.')
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Something went wrong while deleting the order.')
    }
  })
}

// Get orders by user ID
export const useOrdersByUserId = (userId: string, params: Record<string, any> = {}) => {
  return useQuery({
    queryKey: ['user', userId, 'orders', params],
    queryFn: () => getOrdersByUserIdFn(userId, params),
    enabled: !!userId, // Only fetch if userId exists
  })
}

// check if id is available before sending the request
export const useUpdateOrderItem = () => {
  return useMutation({
    mutationFn: ({ id, itemStatus }: { id: string; itemStatus: OrderStatus }) =>
      updateOrderItemFn(id, { itemStatus:itemStatus }),
    onError: (error) => {
      console.error('Mutation error:', error);
    }
  });
};