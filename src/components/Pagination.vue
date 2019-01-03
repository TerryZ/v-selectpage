<template>
    <div class="sp-pagination" >
        <div class="sp-page-info" v-text="pageInfo"></div>
        <ul ref="page">
            <li :class="{'sp-disabled':value===1}" class="sp-page-first" :title="i18n.first">
                <a href="javascript:void(0);" @click="switchPage('first')" >
                    <i class="sp-iconfont sp-icon-first"></i>
                </a>
            </li>
            <li :class="{'sp-disabled':value===1}" class="sp-page-previous" :title="i18n.prev">
                <a href="javascript:void(0);" @click="switchPage('previous')" >
                    <i class="sp-iconfont sp-icon-previous"></i>
                </a>
            </li>
            <li :class="{'sp-disabled':value===totalPage}" class="sp-right sp-page-next" :title="i18n.last">
                <a href="javascript:void(0);" @click="switchPage('last')" >
                    <i class="sp-iconfont sp-icon-last"></i>
                </a>
            </li>
            <li :class="{'sp-disabled':value===totalPage}" class="sp-right sp-page-last" :title="i18n.next">
                <a href="javascript:void(0);" @click="switchPage('next')" >
                    <i class="sp-iconfont sp-icon-next"></i>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "SelectPagePagination",
        props: {
            value: {
                type: Number,
                default: 1
            },
            pageSize: Number,
            totalRow: Number
        },
        inject: ['i18n'],
        computed: {
            pageInfo(){
                return this.i18n.page_info.replace('page_num', this.value)
                    .replace('page_count',this.totalPage).replace('row_count',this.totalRow);
            },
            totalPage(){
                return Math.ceil(this.totalRow / this.pageSize);
            }
        },
        methods: {
            switchPage(pNum){
                let num = 0;
                if(typeof(pNum) === 'string'){
                    switch (pNum){
                        case 'first':
                            if(this.value!==1) num = 1;
                            break;
                        case 'previous':
                            if(this.value!==1) num = this.value - 1;
                            break;
                        case 'next':
                            if(this.value!==this.totalPage) num = this.value + 1;
                            break;
                        case 'last':
                            if(this.value!==this.totalPage) num = this.totalPage;
                            break;
                    }
                }else if(typeof(pNum) === 'number') num = pNum;
                if(num !== 0) this.$emit('input', num);
            }
        },
        mounted(){
            this.$on('go', this.switchPage);
        },
        destroyed(){
            this.$off('go', this.switchPage);
        }
    }
</script>