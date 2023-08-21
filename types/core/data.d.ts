export function selectPageProps(): {
    /**
     * binding selected item keys, it must be match 'keyProp' option value
     */
    modelValue: {
        type: ArrayConstructor;
        default: any;
    };
    placeholder: {
        type: StringConstructor;
        default: string;
    };
    /** multiple selection */
    multiple: {
        type: BooleanConstructor;
        default: boolean;
    };
    language: {
        type: StringConstructor;
        default: string;
    };
    /**
     * specify property to be key field, the value will return by v-model
     */
    keyProp: {
        type: StringConstructor;
        default: string;
    };
    /**
     * specify property to display in data row
     */
    labelProp: {
        type: (FunctionConstructor | StringConstructor)[];
        default: string;
    };
    pageSize: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * maximum number of selection, set 0 to unlimited
     * depend on `multiple` prop set to true
     */
    max: {
        type: NumberConstructor;
        default: number;
        validator: (val: any) => boolean;
    };
    /**
     * pagination bar
     */
    pagination: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * text written from right to left
     */
    rtl: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * the width of drop down menu
     */
    width: {
        type: (StringConstructor | NumberConstructor)[];
        default: any;
    };
    /** debounce delay when typing, in milliseconds */
    debounce: {
        type: NumberConstructor;
        default: number;
    };
};
export function selectPageEmits(): string[];
export function useData(props: any, emit: any): {
    selected: import("vue").Ref<any[]>;
    query: import("vue").Ref<string>;
    message: import("vue").Ref<string>;
    currentPage: import("vue").Ref<number>;
    totalRows: import("vue").Ref<number>;
    lang: {
        next: string;
        prev: string;
        first: string;
        last: string;
        pageInfo: string;
        notFound: string;
        clear: string;
        clearAll: string;
        maxSelected: string;
        placeholder: string;
        selectedCount: string;
        search: string;
    };
    list: import("vue").Ref<any[]>;
    renderCell: (row: any) => any;
    isDataEmpty: () => boolean;
    isItemSelected: (row: any) => boolean;
    selectedCount: import("vue").ComputedRef<number>;
    selectItem: (row: any) => void;
    removeAll: () => void;
    removeItem: (row: any) => void;
    fetchData: () => void;
};
export function useInject(): {
    keyProp: any;
    renderCell: any;
    rtl: any;
    isItemSelected: any;
    pageSize: any;
    language: any;
    debounce: any;
    multiple: any;
    loading: any;
    selectedCount: any;
    removeAll: any;
    removeItem: any;
};
