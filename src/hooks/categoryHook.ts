import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getAllCategory, getAllSubcategoryByCategory, deleteCategory, createCategory, editCategory } from "@/api/category"

export const useGetCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategory
  })
}

export const useGetSubcategories = (categoryId: string) => {
  return useQuery({
    queryKey: ['subcategories', categoryId],
    queryFn: () => getAllSubcategoryByCategory(categoryId),
    enabled: !!categoryId
  })
}

export const useDeleteCategoryHook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id:string)=>deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    }
  })
}

export const createCategoryHook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    }
  })
}
export const useEditCategoryHook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { name: string } }) =>
      editCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};