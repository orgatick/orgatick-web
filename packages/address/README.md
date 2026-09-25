# @orgatick/address

Shared UI components, cascading geographic selectors, and address management hooks for the Orgatick web ecosystem (`client`, `organizer`, `admin`).

## Features

- **Schema & Types**: Uses `@orgatick/contracts` directly (`CreateAddressSchema`, `CreateAddressDto`, `AddressResponse`, etc.).
- **Entity Agnostic**: Supports `user`, `organization`, and `event_venue` variants.
- **Headless Data Fetching**: Decoupled from API client implementations via `AddressDataLoader`.
- **Cascading Selects**: Automatic country ➡️ state/division ➡️ city cascade handling with loading states via `useAddressHierarchy`.
- **Shadcn UI Ready**: Built with `@orgatick/ui` components (`Input`, `Select`, `Button`, `Card`, `Dialog`, `Badge`, `Field`).

---

## Installation

Add to your app's `package.json`:

```json
{
  "dependencies": {
    "@orgatick/address": "workspace:*"
  }
}
```

---

## Usage

### 1. Implementing `AddressDataLoader`
Provide your app's API fetchers:

```typescript
import type { AddressDataLoader } from "@orgatick/address";
import { apiClient } from "@/lib/api-client";

export const addressLoader: AddressDataLoader = {
  loadCountries: async (search?: string) => {
    const res = await apiClient.get("/countries", { params: { search } });
    return res.data;
  },
  loadDivisions: async (countryUuid: string, search?: string) => {
    const res = await apiClient.get("/administrative-divisions", {
      params: { countryUuid, search },
    });
    return res.data;
  },
  loadCities: async (divisionUuid: string, search?: string) => {
    const res = await apiClient.get("/cities", {
      params: { admin1Uuid: divisionUuid, search },
    });
    return res.data;
  },
};
```

---

### 2. User Profile / Checkout Address (`variant="user"`)

```tsx
import { AddressForm } from "@orgatick/address";
import { addressLoader } from "@/services/address.loader";

export function UserAddressSection() {
  const handleSubmit = async (values) => {
    // Call user service / API
    await userService.createAddress(values);
  };

  return (
    <AddressForm
      variant="user"
      dataLoader={addressLoader}
      onSubmit={handleSubmit}
      submitLabel="Save Address"
    />
  );
}
```

---

### 3. Event Venue Location (`variant="event_venue"`)
Includes Venue Name and Latitude/Longitude coordinates:

```tsx
import { AddressForm } from "@orgatick/address";
import { addressLoader } from "@/services/address.loader";

export function VenueSetupForm() {
  return (
    <AddressForm
      variant="event_venue"
      dataLoader={addressLoader}
      onSubmit={async (values) => {
        // values contains venueName, latitude, longitude, addressLine1, countryUuid, etc.
        await eventService.updateVenueAddress(values);
      }}
      submitLabel="Save Venue Location"
    />
  );
}
```

---

### 4. Organization HQ / Branch (`variant="organization"`)

```tsx
import { AddressForm } from "@orgatick/address";
import { addressLoader } from "@/services/address.loader";

export function OrganizationAddressForm() {
  return (
    <AddressForm
      variant="organization"
      dataLoader={addressLoader}
      onSubmit={async (values) => {
        await orgService.addLocation(values);
      }}
    />
  );
}
```

---

### 5. Dialog & Picker Components

- `<AddressDialog />`: Modal popup for adding/editing addresses.
- `<AddressCard />`: Formatted card showing address lines, badges, and action buttons.
- `<AddressPicker />`: Grid/list of addresses with selection state and "+ Add Address" trigger.
