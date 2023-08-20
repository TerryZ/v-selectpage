declare namespace _default {
    namespace props {
        namespace columns {
            export let type: ObjectConstructor;
            let _default: any;
            export { _default as default };
        }
        namespace row {
            let type_1: ObjectConstructor;
            export { type_1 as type };
            let _default_1: any;
            export { _default_1 as default };
        }
        namespace isHover {
            let type_2: BooleanConstructor;
            export { type_2 as type };
            let _default_2: boolean;
            export { _default_2 as default };
        }
        namespace isSelected {
            let type_3: BooleanConstructor;
            export { type_3 as type };
            let _default_3: boolean;
            export { _default_3 as default };
        }
    }
    let emits: string[];
    function setup(props: any, { emit }: {
        emit: any;
    }): () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
}
export default _default;
