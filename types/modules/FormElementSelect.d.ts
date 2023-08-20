declare namespace _default {
    let name: string;
    namespace props {
        namespace selected {
            export let type: ObjectConstructor;
            let _default: any;
            export { _default as default };
        }
        namespace disabled {
            let type_1: BooleanConstructor;
            export { type_1 as type };
            let _default_1: boolean;
            export { _default_1 as default };
        }
        namespace lang {
            let type_2: ObjectConstructor;
            export { type_2 as type };
            let _default_2: any;
            export { _default_2 as default };
        }
        namespace renderCell {
            let type_3: FunctionConstructor;
            export { type_3 as type };
            let _default_3: any;
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
