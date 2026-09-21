"use client";

import { useEffect, useState } from "react";
import { IconLoader } from "@tabler/icons-react";
import type { CategoryResponse } from "@orgatick/contracts";

import { Badge } from "@orgatick/ui/components/badge";

import { fetchCategoryById } from "@/lib/categories.api";

export function useCategoryName(categoryId: number | undefined | null) {
  const [category, setCategory] = useState<CategoryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (categoryId == null) {
      setCategory(null);
      return;
    }

    let isCancelled = false;
    setIsLoading(true);

    fetchCategoryById(Number(categoryId))
      .then((response) => {
        if (!isCancelled) setCategory(response.data);
      })
      .catch(() => {
        if (!isCancelled) setCategory(null);
      })
      .finally(() => {
        if (!isCancelled) setIsLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [categoryId]);

  return { category, isLoading };
}

export function CategoryNames({
  categoryId,
  subCategoryId,
}: {
  categoryId?: number | null;
  subCategoryId?: number | null;
}) {
  const { category: parent, isLoading: isLoadingParent } = useCategoryName(categoryId ?? null);
  const { category: child, isLoading: isLoadingChild } = useCategoryName(subCategoryId ?? null);

  if (isLoadingParent || isLoadingChild) {
    return (
      <span className="flex items-center gap-2 text-muted-foreground">
        <IconLoader className="size-4 animate-spin" />
        Fetching categories...
      </span>
    );
  }

  return (
    <span className="flex flex-wrap items-center gap-2">
      {parent && <Badge variant="secondary">{parent.name}</Badge>}
      {child && <Badge variant="outline">{child.name}</Badge>}
    </span>
  );
}
