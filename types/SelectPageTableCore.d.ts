declare const _default: import("vue").DefineComponent<{
    /**
     * table column settings
     */
    columns: {
        type: ArrayConstructor;
        default: any;
    };
    modelValue: {
        type: ArrayConstructor;
        default: any;
    };
    placeholder: {
        type: StringConstructor;
        default: string;
    };
    multiple: {
        type: BooleanConstructor;
        default: boolean;
    };
    language: {
        type: StringConstructor;
        default: string;
    };
    keyProp: {
        type: StringConstructor;
        default: string;
    };
    labelProp: {
        type: (FunctionConstructor | StringConstructor)[];
        default: string;
    };
    pageSize: {
        type: NumberConstructor;
        default: number;
    };
    totalRows: {
        type: NumberConstructor;
        default: number;
    };
    max: {
        type: NumberConstructor;
        default: number;
        validator: (val: any) => boolean;
    };
    pagination: {
        type: BooleanConstructor;
        default: boolean;
    };
    rtl: {
        type: BooleanConstructor;
        default: boolean;
    };
    width: {
        type: (StringConstructor | NumberConstructor)[];
        default: any;
    };
    debounce: {
        type: NumberConstructor;
        default: number;
    };
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, any, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[], string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * table column settings
     */
    columns: {
        type: ArrayConstructor;
        default: any;
    };
    modelValue: {
        type: ArrayConstructor;
        default: any;
    };
    placeholder: {
        type: StringConstructor;
        default: string;
    };
    multiple: {
        type: BooleanConstructor;
        default: boolean;
    };
    language: {
        type: StringConstructor;
        default: string;
    };
    keyProp: {
        type: StringConstructor;
        default: string;
    };
    labelProp: {
        type: (FunctionConstructor | StringConstructor)[];
        default: string;
    };
    pageSize: {
        type: NumberConstructor;
        default: number;
    };
    totalRows: {
        type: NumberConstructor;
        default: number;
    };
    max: {
        type: NumberConstructor;
        default: number;
        validator: (val: any) => boolean;
    };
    pagination: {
        type: BooleanConstructor;
        default: boolean;
    };
    rtl: {
        type: BooleanConstructor;
        default: boolean;
    };
    width: {
        type: (StringConstructor | NumberConstructor)[];
        default: any;
    };
    debounce: {
        type: NumberConstructor;
        default: number;
    };
}>> & {
    [x: `on${Capitalize<string>}`]: (...args: any[]) => any;
}, {
    max: number;
    rtl: boolean;
    width: string | number;
    columns: unknown[];
    multiple: boolean;
    placeholder: string;
    keyProp: string;
    pageSize: number;
    debounce: number;
    language: string;
    modelValue: unknown[];
    labelProp: string | Function;
    totalRows: number;
    pagination: boolean;
}, {}>;
export default _default;
