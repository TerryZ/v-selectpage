export default {
    name: "SelectPageTag",
    props: {
        picked: Array,
        disabled: Boolean,
        placeholder: String
    },
    inject: ['renderCell'],
    render(h){
        const tags = [];
        if(this.picked.length){
            this.picked.forEach((val, index) => {
                const tag = [];
                // tag content
                tag.push(h('span',{
                    domProps:{
                        innerHTML: this.renderCell(val)
                    }
                }));
                // close button in the tag
                if(!this.disabled) {
                    tag.push(h('span', {
                        on: {
                            click: e=>{
								e.stopPropagation();
								this.remove(index);
                            }
                        }
                    }, [h('i', {class:'sp-iconfont sp-icon-close'})]));
                }
                tags.push(h('span', {class: 'sp-selected-tag',key: index}, tag));
            });
        }else{
            // display placeholder message when there is no tag
            tags.push(h('span', {class: 'sp-placeholder'}, this.placeholder));
        }
        return h('div', {class: 'sp-base sp-inputs'}, tags);
    },
    methods: {
        remove(index){
            this.$emit('remove', index);
        }
    }
}