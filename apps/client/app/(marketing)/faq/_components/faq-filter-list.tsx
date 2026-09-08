"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@orgatick/ui/components/card";
import { Input } from "@orgatick/ui/components/input";
import { IconChevronDown, IconSearch } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { ALL_FAQS, FAQ_CATEGORIES } from "./faq-constants";

export function FaqFilterList() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndices, setOpenIndices] = useState<Record<number, boolean>>({ 0: true, 1: true });

  const filteredFaqs = useMemo(() => {
    return ALL_FAQS.filter((faq) => {
      const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        faq.q.toLowerCase().includes(query) ||
        faq.a.toLowerCase().includes(query) ||
        faq.categoryLabel.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const toggleAccordion = (idx: number) => {
    setOpenIndices((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Search Bar */}
        <div className="relative">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions by keyword (e.g. offline, refund, WhatsApp)..."
            className="pl-10 h-12 text-sm rounded-xl border-border/80 bg-card shadow-xs"
          />
          <IconSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 size-4.5 text-muted-foreground" />
        </div>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {FAQ_CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                    : "border border-border/70 bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Filtered FAQs List */}
        <div className="space-y-3.5">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-border/80 rounded-2xl p-8 space-y-2">
              <p className="text-sm font-semibold text-foreground">No questions found</p>
              <p className="text-xs text-muted-foreground">
                Try searching with different keywords or switch back to &ldquo;All Questions&rdquo;.
              </p>
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndices[idx] ?? false;
              return (
                <Card
                  key={faq.q}
                  className="border-border/70 bg-card rounded-2xl shadow-xs transition-colors overflow-hidden"
                >
                  <CardHeader className="p-5 sm:p-6 cursor-pointer select-none" onClick={() => toggleAccordion(idx)}>
                    <div className="flex items-center justify-between gap-4">
                      <CardTitle className="text-base sm:text-lg font-bold text-foreground flex items-start gap-3">
                        <span className="font-mono text-xs sm:text-sm text-primary font-semibold shrink-0 mt-0.5">
                          0{idx + 1}.
                        </span>
                        <span>{faq.q}</span>
                      </CardTitle>
                      <IconChevronDown
                        className={`size-5 text-muted-foreground shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </CardHeader>

                  {isOpen && (
                    <CardContent className="p-0 px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
                      <p className="pl-6 sm:pl-7 text-xs sm:text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                    </CardContent>
                  )}
                </Card>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
