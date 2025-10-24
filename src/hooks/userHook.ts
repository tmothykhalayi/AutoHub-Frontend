import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getProductsByUserId, getUserByIdFn, getUserDetailsRoleBasedQuery, getUsersFn, updateUserFn } from "@/api/users"
import type { allUserQuery, ApiResponse, updateSettingProfileType } from "@/util/types"
import toast from "react-hot-toast"

export const userByIdHook = (id: string, params: Record<string, boolean> = {}) => {
  return useQuery({
    queryKey: ['user', id, params],
    queryFn: () => getUserByIdFn(id, params),
  })
}

export const useUsers = (params: allUserQuery = {}) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => getUsersFn(params),
  })
}

export const useUpdateUserHook = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<null>, Error, updateSettingProfileType>({
    mutationKey: ['update-user'],
    mutationFn: (data: updateSettingProfileType) => updateUserFn(data),
    onSuccess: (data) => {
      if (data.status === 'success') {
        toast.success('User updated successfully!')
        // Optionally refetch users if you're showing a list
        queryClient.invalidateQueries({ queryKey: ['users'] })
      } else {
        toast.error(data.message || 'Failed to update user.')
      }
    },
    onError: (error) => {
      console.error('update user error', error.message)
      toast.error(error.message || 'Something went wrong while updating the user.')
    }
  })
}

export const productsByUserIdHook = (id: string) => {
  return useQuery({
    queryKey: ['user', id, 'products'],
    queryFn: () => getProductsByUserId(id),
  })
}

export const useUserDetails = (id: string, role: allUserQuery) => {
  return useQuery({
    queryKey: ['user-details', id, role],
    queryFn: () => getUserDetailsRoleBasedQuery(id, role),
    enabled: !!id && Object.keys(role).length === 1,
  })
}
