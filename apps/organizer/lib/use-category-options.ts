"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CategoryResponse, PaginationMeta } from "@orgatick/contracts";

import { fetchCategories } from "@/lib/categories.api";
import { useDebouncedValue } from "@/lib/use-debounced-value";

interface UseCategoryOptionsParams {
  level: number;
  parentId?: number | null;
  query?: string;
  debounceDelay?: number;
}

interface UseCategoryOptionsReturn {
  items: CategoryResponse[];
  meta: PaginationMeta | null;
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
}

const SEARCH_DELAY = 350;

export function useCategoryOptions({
  level,
  parentId,
  query = "",
  debounceDelay = SEARCH_DELAY,
}: UseCategoryOptionsParams): UseCategoryOptionsReturn {
  const debouncedQuery = useDebouncedValue(query, debounceDelay);
  const [items, setItems] = useState<CategoryResponse[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetKey = `${level}|${parentId ?? ""}|${debouncedQuery}`;
  const resetKeyRef = useRef(resetKey);
  resetKeyRef.current = resetKey;

  useEffect(() => {
    let isCancelled = false;
    const key = resetKeyRef.current;

    setIsLoading(true);
    setError(null);

    fetchCategories({
      page: 1,
      search: debouncedQuery,
      level,
      parentId,
    })
      .then((response) => {
        if (!isCancelled && resetKeyRef.current === key) {
          setItems(response.data.items);
          setMeta(response.data.meta);
        }
      })
      .catch(() => {
        if (!isCancelled && resetKeyRef.current === key) {
          setItems([]);
          setMeta(null);
          setError("Failed to load categories");
        }
      })
      .finally(() => {
        if (!isCancelled && resetKeyRef.current === key) {
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [level, parentId, debouncedQuery]);

  const loadMore = useCallback(() => {
    if (isLoading || isLoadingMore || !meta) return;

    const nextPage = meta.page + 1;
    if (nextPage > meta.totalPages) return;

    const key = resetKeyRef.current;
    setIsLoadingMore(true);

    fetchCategories({
      page: nextPage,
      search: debouncedQuery,
      level,
      parentId,
    })
      .then((response) => {
        if (resetKeyRef.current !== key) return;
        setItems((previous) => {
          const seen = new Set(previous.map((item) => String(item.id)));
          return [...previous, ...response.data.items.filter((item) => !seen.has(String(item.id)))];
        });
        setMeta(response.data.meta);
      })
      .catch(() => {
        if (resetKeyRef.current === key) {
          setError("Failed to load more categories");
        }
      })
      .finally(() => {
        if (resetKeyRef.current === key) {
          setIsLoadingMore(false);
        }
      });
  }, [debouncedQuery, isLoading, isLoadingMore, level, meta, parentId]);

  const hasMore = Boolean(meta && meta.page < meta.totalPages);

  return { items, meta, isLoading, isLoadingMore, error, hasMore, loadMore };
}
