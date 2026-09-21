import type { PaginatedCategoryResponse, SingleCategoryResponse } from "@orgatick/contracts";

import baseApi from "@/lib/apis/base.api";

export interface FetchCategoriesParams {
  page?: number;
  limit?: number;
  search?: string;
  level?: number;
  parentId?: number | null;
}

const CATEGORY_LIMIT = 20;

export async function fetchCategories({
  page = 1,
  limit = CATEGORY_LIMIT,
  search,
  level,
  parentId,
}: FetchCategoriesParams): Promise<PaginatedCategoryResponse> {
  const trimmedSearch = search?.trim();

  const { data } = await baseApi.get<PaginatedCategoryResponse>("/organization/categories", {
    params: {
      page,
      limit,
      ...(trimmedSearch ? { search: trimmedSearch } : {}),
      ...(level != null ? { level } : {}),
      ...(parentId != null ? { parentId } : {}),
    },
  });

  return data;
}

export async function fetchCategoryById(id: number): Promise<SingleCategoryResponse> {
  const { data } = await baseApi.get<SingleCategoryResponse>(`/organization/categories/${id}`);
  return data;
}
