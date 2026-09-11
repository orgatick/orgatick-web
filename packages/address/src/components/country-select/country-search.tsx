



'use client'

import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList
} from '@orgatick/ui/components/autocomplete'

const items = [
  { id: 'feature', value: 'Feature' },
  { id: 'fix', value: 'Fix' },
  { id: 'bug', value: 'Bug' },
  { id: 'docs', value: 'Docs' },
  { id: 'internal', value: 'Internal' },
  { id: 'mobile', value: 'Mobile' },
  { id: 'accordion', value: 'Accordion' },
  { id: 'alert-dialog', value: 'Alert Dialog' },
  { id: 'autocomplete', value: 'Autocomplete' },
  { id: 'avatar', value: 'Avatar' },
  { id: 'checkbox', value: 'Checkbox' },
  { id: 'checkbox-group', value: 'Checkbox Group' },
  { id: 'collapsible', value: 'Collapsible' },
  { id: 'combobox', value: 'Combobox' },
  { id: 'context-menu', value: 'Context Menu' },
  { id: 'dialog', value: 'Dialog' },
  { id: 'field', value: 'Field' },
  { id: 'fieldset', value: 'Fieldset' },
  { id: 'filterable-menu', value: 'Filterable Menu' },
  { id: 'form', value: 'Form' },
  { id: 'input', value: 'Input' },
  { id: 'menu', value: 'Menu' },
  { id: 'menubar', value: 'Menubar' },
  { id: 'meter', value: 'Meter' },
  { id: 'navigation-menu', value: 'Navigation Menu' },
  { id: 'number-field', value: 'Number Field' },
  { id: 'popover', value: 'Popover' },
  { id: 'preview-card', value: 'Preview Card' },
  { id: 'progress', value: 'Progress' },
  { id: 'radio', value: 'Radio' },
  { id: 'scroll-area', value: 'Scroll Area' },
  { id: 'select', value: 'Select' },
  { id: 'separator', value: 'Separator' },
  { id: 'slider', value: 'Slider' },
  { id: 'switch', value: 'Switch' },
  { id: 'tabs', value: 'Tabs' },
  { id: 'toast', value: 'Toast' },
  { id: 'toggle', value: 'Toggle' },
  { id: 'toggle-group', value: 'Toggle Group' },
  { id: 'toolbar', value: 'Toolbar' },
  { id: 'tooltip', value: 'Tooltip' }
]

export const CountrySelector = () => {
  return (
    <div className='w-full max-w-xs'>
      <Autocomplete items={items}>
        <AutocompleteInput placeholder='Search items' />
        <AutocompleteContent>
          <AutocompleteEmpty>No items found.</AutocompleteEmpty>
          <AutocompleteList>
            {item => (
              <AutocompleteItem key={item.id} value={item.value}>
                {item.value}
              </AutocompleteItem>
            )}
          </AutocompleteList>
        </AutocompleteContent>
      </Autocomplete>
    </div>
  )
}
