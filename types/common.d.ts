import { AllowedComponentProps, ComponentCustomProps, VNodeProps } from 'vue'

export declare interface ComponentProps extends AllowedComponentProps, ComponentCustomProps, VNodeProps {}

export declare type SelectPageKey = string | number

export declare interface BaseProps extends ComponentProps {
  /**
   * Binds the key value of the selected item to match the contents
   * of the field specified by `keyProp`
   */
  modelValue?: SelectPageKey[]
  /**
   * The placeholder text content displayed when no item is selected.
   * If this parameter is not set, the component will use the placeholder
   * set in i18n by default
   *
   * This prop only work on `Selector mode`
   */
  placeholder?: string
  /**
   * Multiple selection mode
   *
   * @default false
   */
  multiple?: boolean
  /**
   * The language used by the component
   *
   * @default `en`
   */
  language?: string
  /**
   * Specify a property as a key value field that will be used as
   * the basis field for `v-model/modelValue` and data matching
   *
   * @default `id`
   */
  keyProp?: string
  /**
   * Specify a data property or a function to process the text content
   * displayed by the list item
   *
   * @default `name`
   */
  labelProp?: string | Function
  /**
   * The number of records per page is displayed, and when the paging
   * bar is turned off, a fixed `0` is applied
   *
   * @default 10
   */
  pageSize?: number
  /**
   * Maximum number of items that can be selected, set to `0` for no limit
   *
   * This option relies on the `multiple` prop being set to `true`
   *
   * @default 0
   */
  max?: number
  /**
   * Data list using pagination bar
   *
   * @default true
   */
  pagination?: boolean
  /**
   * Text rendering direction from right to left
   *
   * @default false
   */
  rtl?: boolean
  /**
   * Specifies the width of the content container
   * specifying content in number format automatically uses pixels in px units
   * content in string format is applied directly
   */
  width?: string | number
  /**
   * Debounce delay when typing, in milliseconds
   *
   * @default 300
   */
  debounce?: number
}
export declare interface DropdownProps extends BaseProps {
  /**
   * Component disabled states, only work on `Selector mode`
   *
   * @default false
   */
  disabled?: boolean
  /**
   * Add custom class to trigger container, work on `Selector mode`
   */
  customTriggerClass?: string
  /**
   * Add custom class to dropdown container, work on `Selector mode`
   */
  customContainerClass?: string
}

export declare interface PageParameters {
  /** search keyword */
  search: string
  /** current page number */
  pageNumber: number
  /** the number of records per page */
  pageSize: number
}
export declare type FetchDataCallback = (
  // data list
  dataList: Record<string, unknown>[],
  // total number of records
  resultCount: number
) => void
export declare type FetchSelectedDataCallback = (
  dataList: Record<string, unknown>[]
) => void

export declare type EmitUpdateModelValue = (
  event: "update:modelValue",
  keys: SelectPageKey[]
) => void
export declare type EmitFetchData = (
  event: "fetch-data",
  data: PageParameters,
  callback: FetchDataCallback
) => void
export declare type EmitFetchSelectedData = (
  event: "fetch-selected-data",
  keys: SelectPageKey[],
  callback: FetchSelectedDataCallback
) => void
export declare type EmitSelectionChange = (event: "selection-change", items: Record<string, unknown>[]) => void
export declare type EmitRemove = (event: 'remove', items: Record<string, unknown>[]) => void
export declare type EmitAdjustDropdown = (event: 'adjust-dropdown') => void
export declare type EmitCloseDropdown = (event: 'close-dropdown') => void
export declare type EmitVisibleChange = (event: 'visible-change', visible: boolean) => void

export declare type BaseEmits = EmitUpdateModelValue
  & EmitFetchData
  & EmitFetchSelectedData
  & EmitSelectionChange
  & EmitRemove
export declare type CoreEmits = BaseEmits & EmitAdjustDropdown & EmitCloseDropdown
export declare type DropdownEmits = BaseEmits & EmitVisibleChange
