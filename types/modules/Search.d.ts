declare namespace _default {
    namespace props {
        namespace modelValue {
            export let type: StringConstructor;
            let _default: string;
            export { _default as default };
        }
    }
    let emits: string[];
    function setup(props: any, { emit, expose }: {
        emit: any;
        expose: any;
    }): () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
}
export default _default;
