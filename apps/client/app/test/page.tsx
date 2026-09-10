"use client";

import {
  AddressCard,
  AddressForm,
  type AddressFormValues,
  type AddressVariant,
  MapMarker,
  MapRoot as LeafletMap,
  MapTileLayer,
} from "@orgatick/address";
import type { AddressResponse } from "@orgatick/contracts";
import { Button } from "@orgatick/ui/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@orgatick/ui/components/card";
import {
  IconBuilding,
  IconCalendarEvent,
  IconCheck,
  IconCode,
  IconMapPin,
  IconRefresh,
  IconUser,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { addressApi, addressDataLoader } from "@/lib/apis/address.api";

const VARIANTS: { id: AddressVariant; label: string; icon: typeof IconUser }[] = [
  { id: "user", label: "User Address", icon: IconUser },
  { id: "organization", label: "Organization", icon: IconBuilding },
  { id: "event_venue", label: "Event Venue", icon: IconCalendarEvent },
  { id: "generic", label: "Generic", icon: IconMapPin },
];

export default function TestPage() {
  const [variant, setVariant] = useState<AddressVariant>("user");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdAddresses, setCreatedAddresses] = useState<(AddressResponse | AddressFormValues)[]>([]);
  const [lastSubmitted, setLastSubmitted] = useState<AddressFormValues | null>(null);
  const [lastResponse, setLastResponse] = useState<AddressResponse | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<AddressResponse | AddressFormValues | null>(null);

  // Fetch existing addresses on mount
  useEffect(() => {
    async function loadExisting() {
      try {
        const list = await addressApi.getAddresses();
        if (list.length > 0) {
          setCreatedAddresses(list);
          setSelectedAddress(list[0] ?? null);
        }
      } catch {
        // Backend may not be logged in or addresses empty
      }
    }
    loadExisting();
  }, []);

  async function handleFormSubmit(values: AddressFormValues) {
    setIsSubmitting(true);
    setLastSubmitted(values);
    try {
      // POST to backend /addresses
      const result = await addressApi.createAddress(values);
      setLastResponse(result);
      setCreatedAddresses((prev) => [result, ...prev]);
      setSelectedAddress(result);
      toast.success("Address created successfully via API!");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to create address";
      toast.error(message);
      // Fallback: still keep local values for testing visual card/map preview
      setCreatedAddresses((prev) => [values, ...prev]);
      setSelectedAddress(values);
    } finally {
      setIsSubmitting(false);
    }
  }

  const activeLat = selectedAddress?.latitude ?? lastSubmitted?.latitude ?? 24.2741934;
  const activeLng = selectedAddress?.longitude ?? lastSubmitted?.longitude ?? 86.639294784;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Page Header */}
      <header className="border-b border-border bg-card/60 backdrop-blur-sm sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
              <IconMapPin className="size-6 text-primary" />
              Address & Map Integration Testbed
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Testing AddressForm, hierarchy loaders (countries, divisions, cities), and Map components
            </p>
          </div>

          {/* Variant Selector */}
          <div className="flex items-center gap-1.5 p-1 bg-muted/60 rounded-lg border border-border">
            {VARIANTS.map((item) => {
              const Icon = item.icon;
              const isActive = variant === item.id;
              return (
                <Button
                  key={item.id}
                  type="button"
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setVariant(item.id)}
                  className="gap-1.5 text-xs h-8"
                >
                  <Icon className="size-3.5" />
                  {item.label}
                </Button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Column */}
          <div className="lg:col-span-6 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base font-semibold">Create New Address</CardTitle>
                    <CardDescription className="text-xs">
                      Variant: <span className="font-mono text-primary font-medium">{variant}</span>
                    </CardDescription>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-8 gap-1 text-xs"
                    onClick={() => {
                      setLastSubmitted(null);
                      setLastResponse(null);
                      toast.info("Reset test state");
                    }}
                  >
                    <IconRefresh className="size-3.5" />
                    Reset
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <AddressForm
                  key={variant}
                  variant={variant}
                  dataLoader={addressDataLoader}
                  isLoading={isSubmitting}
                  onSubmit={handleFormSubmit}
                  onCancel={() => toast.info("Address form canceled")}
                  submitLabel="Save & Submit to API"
                />
              </CardContent>
            </Card>
          </div>

          {/* Preview & Map Column */}
          <div className="lg:col-span-6 space-y-6">
            {/* Map Preview */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold flex items-center justify-between">
                  <span>Interactive Map Preview</span>
                  <span className="text-xs font-mono font-normal text-muted-foreground">
                    [{activeLat.toFixed(4)}, {activeLng.toFixed(4)}]
                  </span>
                </CardTitle>
                <CardDescription className="text-xs">
                  Coordinates updated from selected address or form submission
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-64 w-full border-t border-border">
                  <LeafletMap center={[activeLat, activeLng]} zoom={14} className="size-full">
                    <MapTileLayer name="Streets" url="" />
                    <MapMarker position={[activeLat, activeLng]} />
                  </LeafletMap>
                </div>
              </CardContent>
            </Card>

            {/* Created Addresses List */}
            {createdAddresses.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold flex items-center gap-2">
                    <IconCheck className="size-4 text-primary" />
                    Address Cards ({createdAddresses.length})
                  </h2>
                  <span className="text-xs text-muted-foreground">Click card to view on map</span>
                </div>
                <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto pr-1">
                  {createdAddresses.map((addr, idx) => {
                    const isSelected =
                      selectedAddress === addr ||
                      ("uuid" in addr &&
                        "uuid" in (selectedAddress || {}) &&
                        addr.uuid === (selectedAddress as AddressResponse)?.uuid);
                    return (
                      <AddressCard
                        key={"uuid" in addr && addr.uuid ? addr.uuid : `local-${idx}`}
                        address={addr}
                        variant={variant}
                        selected={isSelected}
                        onSelect={(a) => setSelectedAddress(a)}
                        className="cursor-pointer hover:border-primary/50 transition-colors"
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* API Inspector */}
            {(lastSubmitted || lastResponse) && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-xs font-semibold flex items-center gap-1.5 uppercase tracking-wider text-muted-foreground">
                    <IconCode className="size-4" />
                    API Inspector (Latest Request / Response)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-xs">
                  {lastSubmitted && (
                    <div>
                      <div className="font-semibold text-muted-foreground mb-1">POST /addresses Payload:</div>
                      <pre className="p-3 bg-muted/60 border border-border rounded-lg overflow-x-auto text-[11px] font-mono leading-relaxed">
                        {JSON.stringify(lastSubmitted, null, 2)}
                      </pre>
                    </div>
                  )}
                  {lastResponse && (
                    <div>
                      <div className="font-semibold text-emerald-500 mb-1">API Response:</div>
                      <pre className="p-3 bg-emerald-950/20 border border-emerald-800/30 text-emerald-300 rounded-lg overflow-x-auto text-[11px] font-mono leading-relaxed">
                        {JSON.stringify(lastResponse, null, 2)}
                      </pre>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
