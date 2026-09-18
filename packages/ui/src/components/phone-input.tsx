import * as React from "react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import { Input } from "@orgatick/ui/components/input";
import { cn } from "@orgatick/ui/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@orgatick/ui/components/popover";
import { Button } from "@orgatick/ui/components/button";
import { IconCheck, IconSelector } from "@tabler/icons-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@orgatick/ui/components/command";
import { ScrollArea } from "@orgatick/ui/components/scroll-area";

type PhoneInputProps = Omit<React.ComponentProps<"input">, "onChange" | "value" | "ref"> &
  Omit<RPNInput.Props<typeof RPNInput.default>, "onChange"> & {
    onChange?: (value: RPNInput.Value) => void;
  };

const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps> = React.forwardRef<
  React.ComponentRef<typeof RPNInput.default>,
  PhoneInputProps
>(({ className, onChange, value, ...props }, ref) => {
  return (
    <RPNInput.default
      ref={ref}
      className={cn(
        "flex h-full min-h-8 w-full items-stretch overflow-hidden rounded-lg border border-input bg-background transition-colors focus-within:border-ring focus-within:ring-4 focus-within:ring-ring/20 has-[input[aria-invalid=true]]:border-destructive has-[input[aria-invalid=true]]:ring-4 has-[input[aria-invalid=true]]:ring-destructive/20 dark:bg-input/30",
        className,
      )}
      flagComponent={FlagComponent}
      countrySelectComponent={CountrySelect}
      inputComponent={InputComponent}
      smartCaret={false}
      defaultCountry="IN"
      value={value || undefined}
      /**
       * Handles the onChange event.
       *
       * react-phone-number-input might trigger the onChange event as undefined
       * when a valid phone number is not entered. To prevent this,
       * the value is coerced to an empty string.
       *
       * @param {E164Number | undefined} value - The entered value
       */
      onChange={(value) => onChange?.(value || ("" as RPNInput.Value))}
      {...props}
    />
  );
});
PhoneInput.displayName = "PhoneInput";

const InputComponent = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, ...props }, ref) => (
    <Input
      className={cn(
        "h-full rounded-none border-0 bg-transparent py-0 shadow-none transition-none focus-visible:border-transparent focus-visible:ring-0 dark:bg-transparent",
        className,
      )}
      {...props}
      ref={ref}
    />
  ),
);
InputComponent.displayName = "InputComponent";

type CountryEntry = { label: string; value: RPNInput.Country | undefined };

type CountrySelectProps = {
  disabled?: boolean;
  value: RPNInput.Country;
  options: CountryEntry[];
  onChange: (country: RPNInput.Country) => void;
};

const CountrySelect = ({ disabled, value: selectedCountry, options: countryList, onChange }: CountrySelectProps) => {
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  const scrollToTop = () => {
    window.setTimeout(() => {
      const viewportElement = scrollAreaRef.current?.querySelector("[data-slot='scroll-area-viewport']");
      if (viewportElement) {
        viewportElement.scrollTop = 0;
      }
    }, 0);
  };

  return (
    <Popover
      open={isOpen}
      modal
      onOpenChange={(open) => {
        setIsOpen(open);
        if (open) {
          setSearchValue("");
          scrollToTop();
        }
      }}
    >
      <PopoverTrigger
        disabled={disabled}
        render={
          <Button
            type="button"
            variant="ghost"
            className="h-full rounded-none border-r border-input px-3 shadow-none focus-visible:border-transparent focus-visible:ring-0"
          >
            <FlagComponent country={selectedCountry} countryName={selectedCountry} />
            <IconSelector
              className={cn(
                "-mr-2 size-4 shrink-0 opacity-50 transition-transform group-aria-expanded/button:rotate-180",
                disabled && "hidden",
              )}
            />
          </Button>
        }
      />
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput
            value={searchValue}
            onValueChange={(value) => {
              setSearchValue(value);
              scrollToTop();
            }}
            placeholder="Search country..."
          />
          <CommandList>
            <ScrollArea ref={scrollAreaRef} className="h-72">
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {countryList.map(({ value, label }) =>
                  value ? (
                    <CountrySelectOption
                      key={value}
                      country={value}
                      countryName={label}
                      selectedCountry={selectedCountry}
                      onChange={onChange}
                      onSelectComplete={() => setIsOpen(false)}
                    />
                  ) : null,
                )}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

interface CountrySelectOptionProps extends RPNInput.FlagProps {
  selectedCountry: RPNInput.Country;
  onChange: (country: RPNInput.Country) => void;
  onSelectComplete: () => void;
}

const CountrySelectOption = ({
  country,
  countryName,
  selectedCountry,
  onChange,
  onSelectComplete,
}: CountrySelectOptionProps) => {
  const handleSelect = () => {
    onChange(country);
    onSelectComplete();
  };

  return (
    <CommandItem
      className="gap-2 rounded-md px-2 py-2 cursor-pointer data-[selected=true]:shadow-accent hover:bg-accent/50"
      onSelect={handleSelect}
    >
      <FlagComponent country={country} countryName={countryName} />
      <span className="min-w-0 flex-1 truncate text-sm">{countryName}</span>
      <span className="shrink-0 rounded border border-border bg-muted px-1.5 py-0.5 text-[0.65rem] font-semibold tracking-wider text-muted-foreground">
        {`+${RPNInput.getCountryCallingCode(country)}`}
      </span>
      <IconCheck
        className={cn(
          "size-4 shrink-0 text-accent-foreground transition-all",
          country === selectedCountry ? "opacity-100 scale-100" : "opacity-0 scale-75",
        )}
      />
    </CommandItem>
  );
};

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country];

  return (
    <span className="flex h-4 w-6 shrink-0 items-center justify-center overflow-hidden rounded-[3px] [&_svg:not([class*='size-'])]:h-full [&_svg:not([class*='size-'])]:w-full">
      {Flag && <Flag title={countryName} />}
    </span>
  );
};

export { PhoneInput };
