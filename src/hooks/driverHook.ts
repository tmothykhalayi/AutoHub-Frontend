// src/hooks/useCreateDriver.ts

import { AssignmentStatus, createDriver, getDriverDashboard, getDriverOrders, updateDriverOrderItem, type CreateDriverDto } from '@/api/driver';
import type { AssignmentUpdate } from '@/util/types';
import { useMutation } from '@tanstack/react-query';

export const useCreateDriver = () => {
  return useMutation({
    mutationFn: (driverData: CreateDriverDto) => createDriver(driverData),
    onSuccess: (data) => {
      console.log('Driver created successfully:', data);
      // You can add additional logic here (e.g., showing a toast, redirecting)
    },
    onError: (error) => {
      console.error('Error creating driver:', error);
      // Handle error (e.g., show an error message)
    },
  });
};

import { useQuery } from '@tanstack/react-query';

export const useGetDriverOrders = (status?:AssignmentStatus) => {
  return useQuery({
    queryKey: ['driver-orders'],
    queryFn: ()=>getDriverOrders(status),
  });
};


export const useGetDriverDashboard = (id:string) => {
  return useQuery({
    queryKey: ['driver-dashboard',id],
    queryFn:()=> getDriverDashboard(id),
    enabled: !!id
  })
}

export const useUpdateDriverOrderItem = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: AssignmentUpdate[] }) => updateDriverOrderItem(id, data),
    onSuccess: (data) => {
      console.log('Order item updated successfully:', data);
      // Additional success logic can be added here
    },
    onError: (error) => {
      console.error('Error updating order item:', error);
      // Handle error (e.g., show an error message)
    },
  });
}