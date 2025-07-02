export type FilterValue = number | string | Record<string, any>

export type FilterConfig = Record<string, FilterValue | FilterValue[]>

interface BaseFilter<TDefaultValue> {
  isStatic?: boolean
  defaultValue: TDefaultValue
  label: string
}

interface BaseSelectFilter<T extends FilterValue> {
  displayFn: (option: T) => string
  options: T[]
}

interface BaseAutocompleteFilter<T extends FilterValue> extends BaseSelectFilter<T> {
  isLoading: boolean
  onSearch: (search: string) => void
}

export interface SelectFilter<T extends FilterValue> extends BaseFilter<T | null>, BaseSelectFilter<T> {
  type: 'select'
}

export interface AutocompleteFilter<T extends FilterValue> extends BaseFilter<T | null>, BaseAutocompleteFilter<T> {
  type: 'autocomplete'
}

export interface MultiSelectFilter<T extends FilterValue> extends BaseFilter<T[]>, BaseSelectFilter<T> {
  type: 'multi-select'
}

export interface MultiAutocompleteFilter<T extends FilterValue> extends BaseFilter<T[]>, BaseAutocompleteFilter<T> {
  type: 'multi-autocomplete'
}

export interface DateFilter<T extends Date> extends BaseFilter<T | null> {
  type: 'date'
}

export type FilterUnion
  = AutocompleteFilter<FilterValue>
    | DateFilter<Date>
    | MultiAutocompleteFilter<FilterValue>
    | MultiSelectFilter<FilterValue>
    | SelectFilter<FilterValue>

export type FilterDefinition<T>
  = [T] extends [Array<infer U>]
    ? MultiAutocompleteFilter<U extends FilterValue ? U : never> | MultiSelectFilter<U extends FilterValue ? U : never>
    : [T] extends [Date | null]
        ? DateFilter<T extends Date ? T : never>
        : [T] extends any
            ? AutocompleteFilter<T extends FilterValue ? T : never> | SelectFilter<T extends FilterValue ? T : never>
            : never

export type FilterDefinitionWithKey<T> = FilterDefinition<T> & { key: string }
export type FilterWithKey<T extends FilterUnion> = T & { key: string }
