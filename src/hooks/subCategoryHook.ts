import { getAllCategory } from "@/api/category"
import { createSubFn } from "@/api/subcategory"
import type { createSubcategory } from "@/util/types"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useGetCategoryHook = () => {
  return useQuery({
    queryKey: ['subcat'],
    queryFn: getAllCategory
  })
}

// useQuery({
//     queryKey: ['categories', category.id],
//     queryFn: () => getAllSubcategoryByCategory(category.id),
//   });

export const useCreateHookSubcategory = () => {
  return useMutation({
    mutationFn:(data:createSubcategory)=> createSubFn(data)
  })
}