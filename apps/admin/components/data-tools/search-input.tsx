"use client";

import { Button } from "@orgatick/ui/components/button";
import { Input } from "@orgatick/ui/components/input";
import { IconSearch } from "@tabler/icons-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, type KeyboardEvent } from "react";

interface SearchInputProps {
  placeholder?: string;
  param?: string;
  className?: string;
}

export function SearchInput({ placeholder = "Search...", param = "search", className }: SearchInputProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get(param) ?? "");

  const apply = () => {
    const params = new URLSearchParams(searchParams.toString());
    const trimmed = value.trim();
    if (trimmed) {
      params.set(param, trimmed);
    } else {
      params.delete(param);
    }
    params.delete("page");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      apply();
    }
  };

  return (
    <div className={`relative ${className ?? ""}`}>
      <IconSearch className="pointer-events-none absolute start-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="ps-8 pe-16"
        aria-label={placeholder}
      />
      <Button
        type="button"
        size="sm"
        variant="ghost"
        className="absolute end-1 top-1/2 -translate-y-1/2"
        onClick={apply}
      >
        Search
      </Button>
    </div>
  );
}
