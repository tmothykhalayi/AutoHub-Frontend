

import { createPickupStation, deletePickupStation, getPickupStations, getPickupStationsOrders, pickOrderById, pickupDashboard, updateOrderItemsStatus, updatePickupStation } from '@/api/pickstation';
import type { UpdateOrderItem } from '@/util/types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const usePickupStationsQuery = (search?: string) => {
  return useQuery({
    queryKey: ['pickupStations', search],
    queryFn: () => getPickupStations(search),
  });
};

export const useCreatePickupStation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPickupStation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pickupStations'] });
    }
  });
};

export const useUpdatePickupStation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: any }) =>
      updatePickupStation(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pickupStations'] });
    }
  });
};

export const useDeletePickupStation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePickupStation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pickupStations'] });
    }
  });
};

export const useGetPickUpStations = (id:string)=>{
  return useQuery({
    queryKey:['pickupstation-details',id],
    queryFn:()=>getPickupStationsOrders(id)
  })
}

export const useGetPickupDashboardStat=(id:string)=>{
  return useQuery({
    queryKey:['dashboard-pickupStation',id],
    queryFn:()=>pickupDashboard(id)
  })
}

export const usePickOrderId =(id:string)=>{
  return useQuery({
    queryKey:['order-pickup'],
    queryFn:()=>pickOrderById(id)
  })
}

export const useUpdateOrderItemsStatus = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateOrderItem[] }) =>
      updateOrderItemsStatus(id, data),
    onSuccess: (data) => {
      console.log('Order items updated successfully', data);
      toast.success('Order items updated');
    },
    onError: (error) => {
      console.error('Error updating order items:', error);
    }
  });
};