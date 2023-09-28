import { BaseProps, DropdownProps,CoreEmits, DropdownEmits } from './common'

declare interface ISelectPageListCore {
  new (): {
    $props: BaseProps
    $emit: CoreEmits
  }
}

declare interface ISelectPageList {
  new (): {
    $props: DropdownProps
    $emit: DropdownEmits
  }
}

export declare const SelectPageListCore: ISelectPageListCore
export declare const SelectPageList: ISelectPageList
