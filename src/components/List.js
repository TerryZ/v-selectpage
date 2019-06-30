import view from '../mixins/view';
export default {
    name: "SelectPageList",
    mixins: [view],
    render(h){
        return h('ul', {
            class: 'sp-results',
            on: {
                mouseleave: () => this.highlight(-1)
            }
        }, this.list.map((val, index) => {
            return h('li', {
                class: this.rowClass(val, index),
                key: index,
                attrs: {
                    title: val[this.showField] || ''
                },
                domProps: {
                    innerHTML: this.renderCell(val)
                },
                on: {
                    click: e=>{
                        e.stopPropagation();
                        this.rowClick(val);
                    },
                    mouseenter: ()=> this.highlight(this.inPicked(val) ? -1 : index)
                }
            });
        }));
    }
}