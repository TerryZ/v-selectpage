export function useLanguage(lang: any): {
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
export function useDebounce(time?: number): (callback: any) => void;
export function isMultiple(attrs: any): any;
export function isHighlightOperation(keyCode: any): any;
export function isPagingOperation(keyCode: any): any;
export function isSelectOperation(keyCode: any): boolean;
export function isEscapeOperation(keyCode: any): boolean;
