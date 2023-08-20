/** list item manager */
export function useItemSelection(props: any, emit: any): {
    selected: import("vue").Ref<any[]>;
    selectedCount: import("vue").ComputedRef<number>;
    isItemSelected: (row: any) => boolean;
    selectItem: (row: any) => void;
    removeItem: (row: any) => void;
    removeAll: () => void;
    setSelected: (data: any, updateVModel?: boolean) => void;
    isKeysEqualToSelected: (keys: any) => any;
};
export function useListItemHighlight(props: any, emit: any, list: any): {
    highlightIndex: import("vue").Ref<number>;
    setItemHighlight: (index: any) => void;
    highlightNavigation: (keyCode: any) => void;
    isSomeRowHighlight: () => boolean;
};
export function isOperationKey(keyCode: any): any;
export function listProps(): {
    list: {
        type: ArrayConstructor;
        default: any;
    };
    highlightIndex: {
        type: NumberConstructor;
        default: number;
    };
};
export function listEmits(): string[];
