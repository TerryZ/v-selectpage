export function usePagination(props: any, currentPage: any, lang: any): {
    paginationInfo: import("vue").ComputedRef<any>;
    isFirstPage: import("vue").ComputedRef<boolean>;
    isLastPage: import("vue").ComputedRef<boolean>;
    switchPage: (action: any) => void;
    pagingNavigation: (keyCode: any) => void;
};
