import { BaseProps, DropdownProps,CoreEmits, DropdownEmits } from './common'

export declare interface SelectPageTableColumn {
  /** title text */
  title: string
  /** data property or data processing function */
  data: string | Function
  /** column width */
  width?: number | string
}

declare interface TableProps {
  /**
   * Tabular data column setting model
   */
  columns?: SelectPageTableColumn[]
}

declare interface ISelectPageTableCore {
  new (): {
    $props: BaseProps & TableProps
    $emit: CoreEmits
  }
}

declare interface ISelectPageTable {
  new (): {
    $props: DropdownProps & TableProps
    $emit: DropdownEmits
  }
}

export declare const SelectPageTableCore: ISelectPageTableCore
export declare const SelectPageTable: ISelectPageTable
