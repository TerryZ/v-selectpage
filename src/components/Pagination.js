const FIRST = 1;
export default {
    name: "SelectPagePagination",
    render(h){
        const list = [];
        /**
         * page number generator
         * @param classes
         * @param title
         * @param action
         * @returns VNode
         */
        const genItem = (classes, title, action) => {
            return h('li',{
                class: classes,
                attrs:{
                    title: title
                }
            },[
                h('a',{
                    attrs:{href:'javascript:void(0);'},
                    on:{click:()=>this.switchPage(action)}
                }, [h('i',{class:`sp-iconfont sp-icon-${action}`})])
            ]);
        };
        list.push(genItem({'sp-disabled':this.value === FIRST},this.i18n.first,'first'));
        list.push(genItem({'sp-disabled':this.value === FIRST},this.i18n.prev,'previous'));
        list.push(genItem({'sp-disabled':this.value === this.totalPage,'sp-right':true},this.i18n.last,'last'));
        list.push(genItem({'sp-disabled':this.value === this.totalPage,'sp-right':true},this.i18n.next,'next'));

        return h('div',{class:'sp-pagination'},[
            h('div',{class:'sp-page-info'},this.pageInfo),
            h('ul',list)
        ]);
    },
    props: {
        value: {
            type: Number,
            default: 1
        },
        pageSize: Number,
        totalRow: Number
    },
    inject: ['i18n'],
	data(){
		return {
			lastNumber: -1
		}
	},
    computed: {
        pageInfo(){
            return this.i18n.page_info
				.replace('page_num', this.value)
                .replace('page_count',this.totalPage)
				.replace('row_count',this.totalRow);
        },
        totalPage(){
            return Math.ceil(this.totalRow / this.pageSize);
        }
    },
    methods: {
        getPageNumber(action){
            switch (action){
                case 'first': return FIRST;
                case 'previous': return this.value > FIRST ? this.value - 1 : FIRST;
                case 'next': return this.value < this.totalPage ? this.value + 1 : this.totalPage;
                case 'last': return this.totalPage;
            }
        },
        switchPage(action){
            const pageNumber = this.getPageNumber(action);
            if(pageNumber === this.lastNumber) return;
            if(pageNumber) this.$emit('input', pageNumber);
            this.lastNumber = pageNumber;
        }
    }
}