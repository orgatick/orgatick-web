"use client";

import { useEffect, useState } from "react";
import { IconChevronRight, IconClock, IconHelpCircle, IconList, IconMail, IconSearch } from "@tabler/icons-react";
import { Badge } from "@orgatick/ui/components/badge";
import { Card, CardContent } from "@orgatick/ui/components/card";
import { Input } from "@orgatick/ui/components/input";
import { cn } from "@orgatick/ui/lib/utils";

interface SectionItem {
  id: string;
  title: string;
  number: string;
}

interface LegalSidebarProps {
  sections: SectionItem[];
  readTime: string;
  effectiveDate: string;
}

export function LegalSidebar({ sections, readTime, effectiveDate }: LegalSidebarProps) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id || "");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const item = sections[i];
        if (!item) continue;
        const element = document.getElementById(item.id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveId(item.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const filteredSections = searchQuery.trim()
    ? sections.filter(
        (s) => s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.number.includes(searchQuery),
      )
    : sections;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <aside aria-label="Table of Contents" className="hidden lg:block sticky top-24 self-start space-y-6">
      {/* Table of Contents Card */}
      <Card className="border-border/70 bg-card/95 backdrop-blur-sm shadow-xs overflow-hidden">
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-foreground font-semibold text-sm">
              <IconList className="size-4 text-primary" />
              <span>On This Page</span>
            </div>
            <Badge variant="secondary" className="text-[10px] font-mono px-2 py-0.5">
              {sections.length} Sections
            </Badge>
          </div>

          {/* Quick Search in TOC */}
          <div className="relative">
            <IconSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter clauses..."
              className="h-8 pl-8 text-xs bg-muted/30 focus-visible:ring-1"
            />
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 max-h-[380px] overflow-y-auto no-scrollbar pr-1">
            {filteredSections.length === 0 ? (
              <p className="text-xs text-muted-foreground py-2 text-center">
                No clauses match &ldquo;{searchQuery}&rdquo;
              </p>
            ) : (
              filteredSections.map((section) => {
                const isActive = activeId === section.id;
                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => scrollToSection(section.id)}
                    className={cn(
                      "w-full text-left flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-xs transition-all duration-200",
                      isActive
                        ? "bg-primary/10 text-primary font-semibold border-l-2 border-primary pl-2.5"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                    )}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="font-mono text-[10px] opacity-70 shrink-0">{section.number}</span>
                      <span className="truncate">{section.title}</span>
                    </div>
                    {isActive && <IconChevronRight className="size-3 shrink-0 text-primary" />}
                  </button>
                );
              })
            )}
          </nav>
        </CardContent>
      </Card>

      {/* Meta Stats Card */}
      <Card className="border-border/60 bg-muted/20 shadow-xs">
        <CardContent className="p-4 space-y-2.5 text-xs text-muted-foreground">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <IconClock className="size-3.5 text-primary" />
              Reading Time
            </span>
            <span className="font-mono font-medium text-foreground">{readTime}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Last Reviewed</span>
            <span className="font-mono font-medium text-foreground">{effectiveDate}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Enforcement</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
              <span className="size-1.5 rounded-full bg-emerald-500 inline-block" />
              Active
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Support Card */}
      <Card className="border-primary/20 bg-linear-to-br from-primary/5 via-card to-secondary/5 shadow-xs">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-2 text-foreground font-semibold text-xs">
            <IconHelpCircle className="size-4 text-primary" />
            <span>Need Clarification?</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Our legal and support specialists are here to answer questions.
          </p>
          <a
            href="mailto:support@orgatick.in"
            className="flex items-center justify-center gap-1.5 w-full rounded-xl bg-primary px-3 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-xs"
          >
            <IconMail className="size-3.5" />
            <span>support@orgatick.in</span>
          </a>
        </CardContent>
      </Card>
    </aside>
  );
}
