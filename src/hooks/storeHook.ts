import { createStore, getAdminStore, getStore, getStoreById, getStoreOrders, updateStore } from "@/api/store"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useCreateStoreHook = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, unknown>({
    mutationKey: ['store'],
    mutationFn: (store) => createStore(store),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stores'] });
    },
  })
}

export const useCheckAppliedHook = (id: string) => {
  return useQuery({
    queryKey: ['store', id],
    queryFn: () => getStore(id),
    enabled: !!id
  });
};



export const useAdminShopsdHook = () => {
  return useQuery({
    queryKey: ['store'],
    queryFn: () => getAdminStore(),
  });
};
export const useStoreOrderQuery = (id: string) => {
  return useQuery({
    queryKey: ['store', id],
    queryFn: () => getStoreOrders(id),
  });
};

export const useUpdateStoreHook = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, unknown>({
    mutationFn: (data) => updateStore(data),
    mutationKey: ['store'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stores'] });
    },
  })
}

export const useGetStoreByIdHook = (id: string) => {
  return useQuery({
    queryKey: ['store', id],
    queryFn: () => getStoreById(id),
    enabled: !!id
  });
}
