declare namespace _default {
    namespace props {
        namespace dropdownVisible {
            export let type: BooleanConstructor;
            let _default: boolean;
            export { _default as default };
        }
        namespace disabled {
            let type_1: BooleanConstructor;
            export { type_1 as type };
            let _default_1: boolean;
            export { _default_1 as default };
        }
        namespace placeholder {
            let type_2: StringConstructor;
            export { type_2 as type };
            let _default_2: string;
            export { _default_2 as default };
        }
        namespace lang {
            let type_3: ObjectConstructor;
            export { type_3 as type };
            let _default_3: any;
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
