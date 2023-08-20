declare namespace _default {
    let name: string;
    namespace props {
        namespace size {
            export let type: StringConstructor;
            let _default: string;
            export { _default as default };
        }
        namespace disabled {
            let type_1: BooleanConstructor;
            export { type_1 as type };
            let _default_1: boolean;
            export { _default_1 as default };
        }
        namespace bgColor {
            let type_2: StringConstructor;
            export { type_2 as type };
            let _default_2: string;
            export { _default_2 as default };
        }
        namespace hoverBgColor {
            let type_3: StringConstructor;
            export { type_3 as type };
            let _default_3: string;
            export { _default_3 as default };
        }
    }
    function setup(props: any, { slots }: {
        slots: any;
    }): () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
}
export default _default;
