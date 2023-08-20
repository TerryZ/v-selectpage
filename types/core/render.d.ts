export function useRender(props: any, emit: any): {
    selected: import("vue").Ref<any[]>;
    query: import("vue").Ref<string>;
    message: import("vue").Ref<string>;
    currentPage: import("vue").Ref<number>;
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
    renderCell: (row: any) => any;
    removeAll: () => void;
    removeItem: (row: any) => void;
    setSearchFocus: () => void;
    renderSearch: () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
    renderMessage: () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
    renderList: () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
    renderTable: () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
    renderPagination: () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
    renderContainer: (children: any) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
};
export function useDropdown(props: any): {
    visible: import("vue").Ref<boolean>;
    dropdownRef: import("vue").Ref<any>;
    renderDropdown: (customProps: any, trigger: any, contents: any) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
    closeDropdown: () => void;
    adjustDropdown: () => void;
};
