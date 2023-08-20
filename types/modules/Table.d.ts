declare namespace _default {
    let name: string;
    let props: {
        columns: {
            type: ArrayConstructor;
            default: any;
        };
        list: {
            type: ArrayConstructor;
            default: any;
        };
        highlightIndex: {
            type: NumberConstructor;
            default: number;
        };
    };
    let emits: string[];
    function setup(props: any, { emit }: {
        emit: any;
    }): () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
}
export default _default;
