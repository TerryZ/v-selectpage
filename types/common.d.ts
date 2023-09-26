import { AllowedComponentProps, ComponentCustomProps, VNodeProps } from 'vue'

export declare interface ComponentProps extends AllowedComponentProps, ComponentCustomProps, VNodeProps {}

type SelectPageKey = string | number

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
