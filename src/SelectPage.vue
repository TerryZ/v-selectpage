<template>
    <div class="v-selectpage">
        <!-- select panel -->
        <div :class="inputClasses" ref="caller" @click="open">
            <!-- multiple with tag form -->
            <v-tags :disabled="disabled" :placeholder="placeholderString" @remove="remove"
                    :picked="picked" v-if="multiple" />
            <v-select :disabled="disabled" :results="results"
                      :placeholder="placeholderString" @remove="remove" v-else />
            <div :class="{'sp-button':true,open: show}"><span class="sp-caret"></span></div>
        </div>

        <!-- drop down list -->
        <v-dropdown ref="drop" @show-change="showChange" :width="width" :align="rtl?'right':'left'" >
            <!-- header bar -->
            <div class="sp-header">
                <h3 v-html="headerTitle"></h3>
                <button type="button" :title="i18n.select_all" class="sp-select-all-btn"
                        @click="pickPage(true)" v-if="multiple"><i class="sp-iconfont sp-icon-select-all"></i></button>
                <button type="button" :title="i18n.unselect_all" class="sp-remove-all-btn" v-if="multiple"
                        @click="pickPage(false)" ><i class="sp-iconfont sp-icon-unselect-all"></i></button>
                <button type="button" :title="i18n.clear_all" class="sp-clear-all-btn"
                        @click="remove" ><i class="sp-iconfont sp-icon-clear"></i></button>
                <button type="button" :title="i18n.close_btn" @click="close"
                        class="sp-close-btn"><i class="sp-iconfont sp-icon-close"></i></button>
            </div>
            <!-- search bar -->
            <div class="sp-search">
                <input type="text" autocomplete="off" ref="search" v-model="search"
                       @keyup="processKey" @keydown.stop="processControl" class="sp-search-input">
            </div>
            <!-- message bar -->
            <transition name="sp-message-slide" :appear="true">
                <div class="sp-message" v-if="message">
                    <i class="sp-iconfont sp-icon-warning"></i>
                    <span v-html="message"></span>
                </div>
            </transition>
            <!-- content list bar -->
            <div class="sp-result-area" >
                <!-- single column(list) mode -->
                <v-list v-if="!tbColumns" v-show="list.length" :list="list"
                        :picked="picked" v-model="highlight" @select="selectItem" />
                <!-- multiple columns(table) mode -->
                <v-table v-if="Array.isArray(tbColumns)&&tbColumns.length" v-show="list.length" :list="list"
                         :tb-columns="tbColumns" :picked="picked" v-model="highlight" @select="selectItem" />
                <!-- no result message -->
                <div v-if="!list.length" class="sp-result-message" v-text="i18n.not_found"></div>
            </div>
            <!-- pagination bar -->
            <v-pagination ref="page" :total-row="totalRows" v-if="pagination"
                          v-model="pageNumber" :page-size="pageSize" />
        </v-dropdown>
    </div>
</template>

<script>
    import props from './mixins/props';
    import methods from './mixins/methods';

    import dropdown from 'v-dropdown';
    import tag from './components/Tag';
    import select from './components/Select';
    import page from './components/Pagination';
    import listView from './components/List';
    import tableView from './components/Table';
    export default {
        name: "v-selectpage",
        mixins: [props, methods],
        components: {
            'v-dropdown': dropdown,
            'v-tags': tag,
            'v-select': select,
            'v-pagination': page,
            'v-list': listView,
            'v-table': tableView
        },
        data(){
            return {
                show: false,
                search: '',
                lastSearch: null,
                searchColumn: null,
                i18n: this.getTranslation(),
                message: '',
                highlight: -1,

                list: [],
                sortedList: null,
                picked: [],

                pageNumber: 1,
                totalRows: 0
            };
        },
        provide(){
            return {
                i18n: this.i18n,
                renderCell: this.renderCell,
                keyField: this.keyField,
                showField: this.showField,
                rtl: this.rtl
            };
        },
        watch: {
            picked(val){
                if(this.message && this.maxSelectLimit && val.length < this.maxSelectLimit) this.message = '';
                this.$emit('input', val.map(value=>value[this.keyField]).join(','));
                this.$emit('values', this.picked.concat());
            },
            value: {
                handler(){
                    this.initSelection();
                },
                immediate: true
            },
            data(){
                this.sortList();
                this.populate();
                if(this.picked.length) this.picked = [];
                else this.initSelection();
            },
            pageNumber(){
                this.populate();
            },
            disabled(val){
                if(val && this.show) this.close();
            }
        },
        computed: {
            headerTitle(){
                const headerStr = this.i18n.items_selected,
                    replace = val => headerStr.replace('selected_count', `<b>${val}</b>`);
                if(this.picked.length) return this.multiple?replace(this.picked.length):this.getResults();
                else return this.title;
            },
            results(){
                return this.getResults();
            },
            placeholderString(){
                return this.placeholder?this.placeholder:this.i18n.placeholder;
            },
            inputClasses(){
                return { 'sp-input-container': true, 'sp-open': this.show, 'sp-disabled': this.disabled };
            }
        },
        mounted(){
            this.scrollPolyfill();

            //switch class name
            //let className = this.$el.className;
            //this.$el.className = 'v-selectpage';
            //this.$refs.input.className += ' ' + className;

            //set searchField when user not config
            if(!this.searchField){
                if(typeof this.showField === 'string') this.searchColumn = this.showField;
                else if(Array.isArray(this.showField) && this.showField.length)
                    this.searchColumn = this.showField[0].data;
            }else this.searchColumn = this.searchField;

            //sort data list
            this.sortList();

            this.$on('clear', this.remove);
        },
        destroyed(){
            this.$off('clear', this.remove);
        }
    }
</script>

<style lang="scss">
$font: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
div.v-selectpage{
    /*font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";*/
    /*font-family: "Helvetica Neue Light", "HelveticaNeue-Light", "Helvetica Neue", Calibri, Helvetica, Arial;*/
    font-family: $font;
    box-sizing: border-box;
    div.sp-input-container {
        position: relative;
        span.sp-placeholder { color: #aaa; }
        &.sp-open{
            div.sp-input, div.sp-inputs { border: 1px solid #999;color: black;border-radius: 2px; }
            div.sp-input {background-color: #F9F9F9;}
        }
        &.sp-disabled {
            div.sp-input, div.sp-inputs { cursor: not-allowed;color: #555;background-color: #eee; }
            div.sp-button { cursor: not-allowed; }
        }
        div.sp-base {
            display: block;
            height: 34px;
            padding: 6px 12px;
            font-size: 14px;
            line-height: 1.42857143;
            color: #555;
            background-color: #fff;
            background-image: none;
            border: 1px solid #ccc;
            border-radius: 4px;
            -webkit-box-shadow: none;
            box-shadow: none;
            will-change: border-color, box-shadow, background-color;
            -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s,background-color ease-in-out .3s;
            -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s,background-color ease-in-out .3s;
            transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s,background-color ease-in-out .3s;
            box-sizing: border-box;
        }
        div.sp-input { background-color: white;cursor: pointer;color: #333;opacity: 1; }
        div.sp-inputs {
            padding: 3px 24px 0 3px;
            position: relative;
            overflow: hidden;
            clear: both;
            cursor: pointer;
            list-style: none;
            height: auto;
            min-height: 34px;
            font-size: 14px;
            span.sp-placeholder{ margin-left: 9px;margin-top: 3px; display: inline-block; }
            span.sp-selected-tag {
                list-style: none;
                padding: 0 5px;
                margin: 0 3px 3px 0;
                float: left;
                position: relative;
                box-sizing: content-box;
                border: 1px solid #aaa;
                border-radius: 3px;
                background-color: #E4EAEE;/*#EFEFEF;*/
                cursor: pointer;
                max-width: 100%;
                box-shadow: 0 0 2px white inset, 0 1px 0 rgba(0, 0, 0, 0.05);
                height: 24px;
                line-height: 24px;
                -webkit-transition: all .5s cubic-bezier(.175,.885,.32,1);
                transition: all .5s cubic-bezier(.175,.885,.32,1);
                &:hover{background-color: white;border: 1px solid #D0D0D0;box-shadow: 0 2px 7px rgba(0,0,0,.1);}
                i {
                    font-size: 14px; color: #aaa;
                    &:hover { color: black; }
                }
            }
        }
        div.sp-clear {
            position: absolute;
            top: 0;
            right: 25px;
            display: block;
            width: auto;
            height: 100%;
            cursor: pointer;
            font-size: 20px;
            color: #999;
            font-weight: 600;
            margin: 0;
            padding: 4px 0 0 0;
            box-sizing: border-box;
            line-height: 1;
            i { font-size: 12px; }
            &:hover { color: black;font-weight: bold; }
        }
        div.sp-button {
            display: inline-block;
            border-bottom-right-radius: 0;
            border-top-right-radius: 0;
            cursor: pointer;
            text-align: center;
            box-sizing: border-box;

            border: 0;
            width: 24px;
            height: 100%;
            padding: 0;
            vertical-align: middle;
            line-height: 100%;
            position: absolute;
            top: 0;
            right: 0;
            span.sp-caret {
                position: absolute;
                top: 50%;
                right: 12px;
                margin-top: -1px;
                vertical-align: middle;
                display: inline-block;
                width: 0;
                height: 0;
                margin-left: 2px;
                border-top: 4px dashed;
                /*border-top: 4px solid\9;*/
                border-right: 4px solid transparent;
                border-left: 4px solid transparent;
                transition:transform .2s ease;
            }
            &.open span.sp-caret { transform: rotate(180deg); }
        }
    }
}
div.sp-header {
    background-color: white;font-family: $font;
    & > h3 {
        margin: 6px 100px 0 10px;
        text-align: left;
        height: 18px;
        color: #24292e;
        font-size: 16px;
        font-weight: 500;
        white-space: nowrap;
    }
    button{
        position: absolute;
        padding: 0;
        cursor: pointer;
        background: 0 0;
        border: 0;
        outline: none;
        line-height: 100%;
        color: #999;
        top: 3px;
        font-size: 21px;
        &.sp-close-btn { right: 9px; }
        &.sp-remove-all-btn { right: 55px; }
        &.sp-select-all-btn { right: 81px; }
        &.sp-clear-all-btn { right: 31px; }
        &:hover { color: black; }
    }
}




.sp-search {
    font-family: $font;padding: 10px;background-color: white;border-top-left-radius: 2px;border-top-right-radius: 2px;
    .sp-search-input {
        display: block;
        background-color: #F6F6F6;
        margin: 0 !important;
        width: 100%;
        font-size: 14px;
        line-height: 20px;
        min-height: 20px;
        padding: 4px 6px;
        vertical-align: middle;
        box-sizing: border-box;
        outline: none !important;
        height: 30px;
        border-radius: 2px;
        border: 1px solid #ddd;

        will-change: border-color, box-shadow, background-color;
        transition: border-color .3s ease-in-out,box-shadow .3s ease-in-out,background-color .3s ease-in-out;
        &:focus { border: 1px solid #aaa;box-shadow: 0 0 0 3px rgba(150,150,150, 0.2);background-color: white; }
    }
}

div.sp-result-area{
    background-color: white;min-width: 298px;max-height: 320px;overflow-y: auto;font-family: $font;
    ul.sp-results {
        background-color: white;list-style: none;margin: 0;padding: 0;
        li {
            height: auto !important;
            line-height: 1;
            margin: 0;
            overflow: hidden;
            padding: 4px 8px;
            position: relative;
            text-align: left;
            white-space: nowrap;
            font-size: 14px;
            color: #333;
            cursor : pointer;
            &.sp-over { background-color: #2196F3 /*#53A4EA*/!important;color: #fff !important;cursor: pointer; }
            &.sp-selected { color: #ccc;cursor: default; }
            &.sp-rtl { direction: rtl;text-align: right; }
        }
    }
    div.sp-result-message {
        font-family: $font;padding: 10px;text-align: center;
    }
    table.sp-table {
        width: 100%;
        td,th { font-size: 14px;border: 0 !important; }
        th{ background-color: #F5F5F5;padding: 5px 8px;}
        td{ padding: 4px 8px; }
        tbody tr {
            &.sp-over td { background-color: #53A4EA !important;color: #fff !important;cursor: pointer; }
            &.sp-selected { color: #ccc;cursor: default; }
        }
        thead tr.sp-rtl th, tbody tr.sp-rtl td { direction: rtl;text-align: right; }
    }
}

div.sp-pagination {
    font-family: $font;
    padding: 0;
    background-color: white;
    position: relative;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    text-align: center;
    font-size: 14px;
    div.sp-page-info { height: 28px;line-height: 29px;font-weight: 400; }
    ul {
        position: absolute;
        top: 0;
        padding: 0;
        margin: 0;
        text-align: left;
        border-bottom-left-radius: 2px;
        border-bottom-right-radius: 2px;
        width: 100%;
        li {
            display: inline-block;text-align: center;
            a {
                display: inline-block;
                padding: 7px 7px 5px 7px;
                font-size: 14px;
                color: #6a737d;
                text-decoration: none;
                cursor: pointer;
                height: 28px;
                line-height: 100%;
                background: transparent;
                &:hover { color: black;font-weight: bold; }
            }
            &.sp-right{ float:right; }
            &:first-child{ border-bottom-left-radius: 2px; }
            &:last-child{ border-bottom-right-radius: 2px; }
            &.sp-disabled a { color: #ddd;font-weight: normal;/*cursor: not-allowed;*/ }
        }
    }
}
div.sp-message {
    font-family: $font;padding: 10px;position: relative;background-color: #E4EAEE;color: black;
    i {position: absolute;top: 6px;font-size: 22px;}
    span{ margin-left: 30px;font-size: 16px; }
}

.sp-message-slide-enter-active,.sp-message-slide-leave-active {
    transition: opacity .5s;
}
.sp-message-slide-enter, .sp-message-slide-leave-to {
    opacity: 0;
}
</style>
<style>
    /* icons */
    @font-face {font-family: "sp-iconfont";
        src: url('data:image/eot;base64,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?t=1530004230003'); /* IE9*/
        src: url('data:application/x-font-woff;charset=utf-8;base64,d09GRgABAAAAAAhIAAsAAAAADMQAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAADMAAABCsP6z7U9TLzIAAAE8AAAARAAAAFZW7kk7Y21hcAAAAYAAAACnAAACNjrIPMtnbHlmAAACKAAAA8gAAAVwDG6R+GhlYWQAAAXwAAAALwAAADYRz4wHaGhlYQAABiAAAAAeAAAAJAfeA41obXR4AAAGQAAAABcAAAAsK+oAAGxvY2EAAAZYAAAAGAAAABgIfAmYbWF4cAAABnAAAAAfAAAAIAEaAGJuYW1lAAAGkAAAAUUAAAJtPlT+fXBvc3QAAAfYAAAAcAAAAJM+wARieJxjYGRgYOBikGPQYWB0cfMJYeBgYGGAAJAMY05meiJQDMoDyrGAaQ4gZoOIAgCKIwNPAHicY2Bk/sc4gYGVgYOpk+kMAwNDP4RmfM1gxMjBwMDEwMrMgBUEpLmmMDgwVDz3Zm7438AQw9zA0AAUZgTJAQAq8wy+eJzFkTEOgkAQRd8KohIJVp6BwpJbcAwvQWFI6DyKlceaPQb+ZWgM2ups3ib7N5mZ/A9sgUxcRA7hSSDVQ2qY9Yxy1nNuep85SSnoDWustasNNsYq1rGbJv1/09cV1Gt9kl5qq5yNpuzYc0j7heJjj59U+N/o9zrO9315KRX6Ba1oOEm3xknpWuukdO3qyFtscOQyNjrym1g5cp5YO8qA2DlkL7QBM/EAeJxlUz1sHEUUnm8mt7fr3O3dzt6fd30/u4dvfbLvDPbdWklsx5HSEEAYkUAoghxEQ4FFFTcUR4FEIiMhN3RgBSQMoaEIVaQYJRIdUihpbASCgg5RshPerH+IYbWaeTPfe/O9b94blmHs8c/inqgxl02xZ9hFtsoYjGmENq8jiAZ9Po1ykClXS7aI2lGQbYd9sYRqaJQqc/GgUzWyRgE2GpgP5uKozyMMB8v8HOYqdWDc916WkxNSfISxWtR4X13it1FuticKyz317Mz50lzLNTdyUo5LuWkamYzJ+amCjberFStjjRnq80zBK99rdnkTufHIe/61fMuX1z8YrNcnqxYwGsH1W/YX5x3Pof9dr+LK8Wwxb9a8fPupEjZ+PV1zc/XOL4w+rXVPPBBN5rAGm2YzbEibQdhHvIBlSrhKKmzAyMKoVINlROiIsDN0BvFcpeyUjGxbe5WMsCNeSl4PB74o4rIzO5x1cKUo/IH6UDrq62Ip5LfDUlHdKUpbygkp7afhT/n0B17/bINfbwRBI/m0cbbvCYZ68kk9BMI6f6OuQmmjRUG22rflOyXf7/p+mvd98Z24wHJsnM2yM+wKY5NPJtZ+coH2sI8osJEtt3WVdF0GnclBTAbVJEBA8JF3ig4dravs2OBrBxn/cDDhz23EU+p+N8a2zkqs0JhsUZIX8lKNsK1WCHJ96eaxa0tIXyIeEbyWakhj/rV5S3sj7q7osyekPsxeSVq0g/3UKZWOvdQOujHVjJP2XbErVliBtagzqUiUZjsIOxElPT+pZToN6GotOKRLXK41gWYtuVprAa0a30mu9peApT7f6em5J3KtFNVYrTWPxT55LIJmvkMzcZ4izkfiGxETZ5O1WcSYu6zbO+XO6utznYN+p1vvUDIGooVqhCpewEzAvw96QC9IzgQzOIdygX9WLJeLybVCGeZ+d/9FfDutnuO/B71DHx1zN7mmnVLX5M5ed8/C3Wl16VD/e6S/yELSHw+oKamq1Pz6AS64x9YRxF+xLLVm+dLCTbVhSd/649jC9iGGt8a8MVq5nqVuqBuW51ri1fyxje1D+H/8xAz97iOL+DphVhxbRxC+sjQP8asN3DzgP7KI+wDDx0RAK+LHLdzSnH9/mT+21dohzKgej3/jPwmP+Jl1QjrR8h/VyCwVTayrLbNYMjEysUUDmWqLtjREDlTT/5xzImO6tzexngaNzDRAh9EOzfp8PRCYnvGX2BQ5dpreX9YCSV+wqOpic1U9VA9XsaQerGIRi6vqwcUTKyyRB6XxD0LyBFh4nGNgZGBgAGL1cv278fw2Xxm4WRhA4HqECiuC/r+fhYHZEcjlYGACiQIA758IGwB4nGNgZGBgbvjfwBDDAmQxMLAwMIBpJMANAEcqAnUAAHicY2FgYGB+ycDAwkAAMzIwAAAnpgEWAAAAAAAAdgDSAVABigHQAhACUAJ0ApYCuHicY2BkYGDgZghjYGUAASYg5gJCBob/YD4DABJMAX0AeJxlj01OwzAQhV/6B6QSqqhgh+QFYgEo/RGrblhUavdddN+mTpsqiSPHrdQDcB6OwAk4AtyAO/BIJ5s2lsffvHljTwDc4Acejt8t95E9XDI7cg0XuBeuU38QbpBfhJto41W4Rf1N2MczpsJtdGF5g9e4YvaEd2EPHXwI13CNT+E69S/hBvlbuIk7/Aq30PHqwj7mXle4jUcv9sdWL5xeqeVBxaHJIpM5v4KZXu+Sha3S6pxrW8QmU4OgX0lTnWlb3VPs10PnIhVZk6oJqzpJjMqt2erQBRvn8lGvF4kehCblWGP+tsYCjnEFhSUOjDFCGGSIyujoO1Vm9K+xQ8Jee1Y9zed0WxTU/3OFAQL0z1xTurLSeTpPgT1fG1J1dCtuy56UNJFezUkSskJe1rZUQuoBNmVXjhF6XNGJPyhnSP8ACVpuyAAAAHicbcgxDsIwDEZh/yWhtGWDa3Rg4jyRCbUFOFKaiNLTg8SG+KanRw199fTfgAYbOHhs0WKHDj0G7AmLe4Zs7SzBWKpniXzrlhpslWTTUTnZeNEcueinsk5SDj/zHq/FvVI9ubWmsy/6iDPRG+r/IE4=') format('woff'),
        url('data:image/ttf;base64,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?t=1530004230003') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
        url('data:image/svg;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiID4KPCEtLQoyMDEzLTktMzA6IENyZWF0ZWQuCi0tPgo8c3ZnPgo8bWV0YWRhdGE+CkNyZWF0ZWQgYnkgaWNvbmZvbnQKPC9tZXRhZGF0YT4KPGRlZnM+Cgo8Zm9udCBpZD0iaWNvbmZvbnQiIGhvcml6LWFkdi14PSIxMDI0IiA+CiAgPGZvbnQtZmFjZQogICAgZm9udC1mYW1pbHk9Imljb25mb250IgogICAgZm9udC13ZWlnaHQ9IjUwMCIKICAgIGZvbnQtc3RyZXRjaD0ibm9ybWFsIgogICAgdW5pdHMtcGVyLWVtPSIxMDI0IgogICAgYXNjZW50PSI4OTYiCiAgICBkZXNjZW50PSItMTI4IgogIC8+CiAgICA8bWlzc2luZy1nbHlwaCAvPgogICAgCiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0ieCIgdW5pY29kZT0ieCIgaG9yaXotYWR2LXg9IjEwMDEiCmQ9Ik0yODEgNTQzcS0yNyAtMSAtNTMgLTFoLTgzcS0xOCAwIC0zNi41IC02dC0zMi41IC0xOC41dC0yMyAtMzJ0LTkgLTQ1LjV2LTc2aDkxMnY0MXEwIDE2IC0wLjUgMzB0LTAuNSAxOHEwIDEzIC01IDI5dC0xNyAyOS41dC0zMS41IDIyLjV0LTQ5LjUgOWgtMTMzdi05N2gtNDM4djk3ek05NTUgMzEwdi01MnEwIC0yMyAwLjUgLTUydDAuNSAtNTh0LTEwLjUgLTQ3LjV0LTI2IC0zMHQtMzMgLTE2dC0zMS41IC00LjVxLTE0IC0xIC0yOS41IC0wLjUKdC0yOS41IDAuNWgtMzJsLTQ1IDEyOGgtNDM5bC00NCAtMTI4aC0yOWgtMzRxLTIwIDAgLTQ1IDFxLTI1IDAgLTQxIDkuNXQtMjUuNSAyM3QtMTMuNSAyOS41dC00IDMwdjE2N2g5MTF6TTE2MyAyNDdxLTEyIDAgLTIxIC04LjV0LTkgLTIxLjV0OSAtMjEuNXQyMSAtOC41cTEzIDAgMjIgOC41dDkgMjEuNXQtOSAyMS41dC0yMiA4LjV6TTMxNiAxMjNxLTggLTI2IC0xNCAtNDhxLTUgLTE5IC0xMC41IC0zN3QtNy41IC0yNXQtMyAtMTV0MSAtMTQuNQp0OS41IC0xMC41dDIxLjUgLTRoMzdoNjdoODFoODBoNjRoMzZxMjMgMCAzNCAxMnQyIDM4cS01IDEzIC05LjUgMzAuNXQtOS41IDM0LjVxLTUgMTkgLTExIDM5aC0zNjh6TTMzNiA0OTh2MjI4cTAgMTEgMi41IDIzdDEwIDIxLjV0MjAuNSAxNS41dDM0IDZoMTg4cTMxIDAgNTEuNSAtMTQuNXQyMC41IC01Mi41di0yMjdoLTMyN3oiIC8+CiAgICAKCiAgICAKICAgIDxnbHlwaCBnbHlwaC1uYW1lPSJ3YXJuIiB1bmljb2RlPSImIzU4OTc5OyIgZD0iTTg0OS4xMi0zMi43MDQgMTc0Ljg4LTMyLjcwNGMtNDUuMjE2IDAtODEuNTM2IDE3LjcyOC05OS42OCA0OC42NC0xOC4xNDQgMzAuOTEyLTE1LjkzNiA3MS4yOTYgNi4wOCAxMTAuNzUyTDQyMS40NzIgNzM2LjM1MmMyMi4xNDQgMzkuNzQ0IDU1LjA3MiA2Mi41MjggOTAuMzA0IDYyLjUyOHM2OC4xMjgtMjIuNzUyIDkwLjMzNi02Mi40NjRsMzQwLjU0NC02MDkuNzkyYzIyLjAxNi0zOS40NTYgMjQuMjg4LTc5LjgwOCA2LjExMi0xMTAuNzJDOTMwLjY1Ni0xNS4wMDggODk0LjMwNC0zMi43MDQgODQ5LjEyLTMyLjcwNHpNNTExLjgwOCA3MzQuODhjLTExLjIgMC0yNC4wMzItMTEuMTA0LTM0LjQzMi0yOS42OTZMMTM3LjE4NCA5NS40NTZjLTEwLjY1Ni0xOS4xMzYtMTMuMTUyLTM2LjMyLTYuNzg0LTQ3LjE2OCA2LjM2OC0xMC44MTYgMjIuNTkyLTE3LjAyNCA0NC40OC0xNy4wMjRsNjc0LjI0IDBjMjEuOTIgMCAzOC4xMTIgNi4xNzYgNDQuNDggMTcuMDI0IDYuMzM2IDEwLjgxNiAzLjg3MiAyOC02LjgxNiA0Ny4xMzZMNTQ2LjI0IDcwNS4xODRDNTM1Ljg3MiA3MjMuNzc2IDUyMi45NzYgNzM0Ljg4IDUxMS44MDggNzM0Ljg4ek01MTIgMjU2Yy0xNy42NjQgMC0zMiAxNC4zMDQtMzIgMzJsMCAyODhjMCAxNy42NjQgMTQuMzM2IDMyIDMyIDMyczMyLTE0LjMzNiAzMi0zMmwwLTI4OEM1NDQgMjcwLjMwNCA1MjkuNjY0IDI1NiA1MTIgMjU2ek01MTIgMTQzLjg3Mm0tNDggMGExLjUgMS41IDAgMSAwIDk2IDAgMS41IDEuNSAwIDEgMC05NiAwWiIgIGhvcml6LWFkdi14PSIxMDI0IiAvPgoKICAgIAogICAgPGdseXBoIGdseXBoLW5hbWU9InNoYW5jaHUiIHVuaWNvZGU9IiYjNTkyMTE7IiBkPSJNNjA3Ljg5Nzg2NyAxMjcuOTU2OTk2Yy0xNy43MTc0NTMgMC0zMS45OTQ2MjUgMTQuMjc3MTcxLTMxLjk5NDYyNSAzMS45OTQ2MjVMNTc1LjkwMzI0MiA1MTIuMDY0NTA1YzAgMTcuNzE3NDUzIDE0LjI3NzE3MSAzMS45OTQ2MjUgMzEuOTk0NjI1IDMxLjk5NDYyNXMzMS45OTQ2MjUtMTQuMjc3MTcxIDMxLjk5NDYyNS0zMS45OTQ2MjVsMC0zNTEuOTQwODdDNjM5Ljg5MjQ5MSAxNDIuNDA2MTgxOTk5OTk5OTQgNjI1LjYxNTMyIDEyNy45NTY5OTYgNjA3Ljg5Nzg2NyAxMjcuOTU2OTk2ek00MTUuOTMwMTE5IDEyNy45NTY5OTZjLTE3LjcxNzQ1MyAwLTMxLjk5NDYyNSAxNC4yNzcxNzEtMzEuOTk0NjI1IDMxLjk5NDYyNUwzODMuOTM1NDk1IDUxMi4wNjQ1MDVjMCAxNy43MTc0NTMgMTQuMjc3MTcxIDMxLjk5NDYyNSAzMS45OTQ2MjUgMzEuOTk0NjI1IDE3LjcxNzQ1MyAwIDMxLjk5NDYyNS0xNC4yNzcxNzEgMzEuOTk0NjI1LTMxLjk5NDYyNWwwLTM1MS45NDA4N0M0NDcuOTI0NzQ0IDE0Mi40MDYxODE5OTk5OTk5NCA0MzMuNjQ3NTczIDEyNy45NTY5OTYgNDE1LjkzMDExOSAxMjcuOTU2OTk2ek05MjguMDE2MTI2IDY3Mi4wMzc2MjhsLTE1OS45NzMxMjMgMEw3NjguMDQzMDA0IDczNi4wMjY4NzdjMCA1Mi45ODAzNDYtNDIuNjU5NDk5IDk1Ljk4Mzg3NC05NS4yOTU4MTcgOTUuOTgzODc0TDM1MS45NDA4NyA4MzIuMDEwNzUxYy01Mi45ODAzNDYgMC05NS45ODM4NzQtNDMuMDAzNTI4LTk1Ljk4Mzg3NC05NS45ODM4NzRsMC02My45ODkyNDktMTU5Ljk3MzEyMyAwYy0xNy43MTc0NTMgMC0zMS45OTQ2MjUtMTQuMjc3MTcxLTMxLjk5NDYyNS0zMS45OTQ2MjVzMTQuMjc3MTcxLTMxLjk5NDYyNSAzMS45OTQ2MjUtMzEuOTk0NjI1bDgzMi4wMzIyNTMgMGMxNy43MTc0NTMgMCAzMS45OTQ2MjUgMTQuMjc3MTcxIDMxLjk5NDYyNSAzMS45OTQ2MjVTOTQ1LjczMzU4IDY3Mi4wMzc2MjggOTI4LjAxNjEyNiA2NzIuMDM3NjI4ek0zMTkuOTQ2MjQ2IDczNi4wMjY4NzdjMCAxNy41NDU0MzkgMTQuNDQ5MTg1IDMxLjk5NDYyNSAzMS45OTQ2MjUgMzEuOTk0NjI1bDMyMC44MDYzMTYgMGMxNy41NDU0MzkgMCAzMS4zMDY1NjgtMTQuMTA1MTU3IDMxLjMwNjU2OC0zMS45OTQ2MjVsMC02My45ODkyNDlMMzE5Ljk0NjI0NiA2NzIuMDM3NjI4IDMxOS45NDYyNDYgNzM2LjAyNjg3NyAzMTkuOTQ2MjQ2IDczNi4wMjY4Nzd6TTczNi4wNDgzNzktNjQuMDEwNzUxMDAwMDAwMDNMMjg4LjEyMzYzNS02NC4wMTA3NTEwMDAwMDAwM2MtNTIuOTgwMzQ2IDAtOTUuOTgzODc0IDQzLjAwMzUyOC05NS45ODM4NzQgOTUuOTgzODc0TDE5Mi4xMzk3NjEgNTEyLjQwODUzMzk5OTk5OTljMCAxNy43MTc0NTMgMTQuMjc3MTcxIDMxLjk5NDYyNSAzMS45OTQ2MjUgMzEuOTk0NjI1czMxLjk5NDYyNS0xNC4yNzcxNzEgMzEuOTk0NjI1LTMxLjk5NDYyNWwwLTQ4MC40MzU0MTFjMC0xNy43MTc0NTMgMTQuNDQ5MTg1LTMxLjk5NDYyNSAzMS45OTQ2MjUtMzEuOTk0NjI1bDQ0OC4wOTY3NTggMGMxNy43MTc0NTMgMCAzMS45OTQ2MjUgMTQuMjc3MTcxIDMxLjk5NDYyNSAzMS45OTQ2MjVMNzY4LjIxNTAxOCA1MTEuMjA0NDM1YzAgMTcuNzE3NDUzIDE0LjI3NzE3MSAzMS45OTQ2MjUgMzEuOTk0NjI1IDMxLjk5NDYyNXMzMS45OTQ2MjUtMTQuMjc3MTcxIDMxLjk5NDYyNS0zMS45OTQ2MjVsMC00NzkuMjMxMzEyQzgzMi4wMzIyNTMtMjAuODM1MjA4OTk5OTk5OTYzIDc4OS4wMjg3MjUtNjQuMDEwNzUxMDAwMDAwMDMgNzM2LjA0ODM3OS02NC4wMTA3NTEwMDAwMDAwM3oiICBob3Jpei1hZHYteD0iMTAyNCIgLz4KCiAgICAKICAgIDxnbHlwaCBnbHlwaC1uYW1lPSJjaGVjayIgdW5pY29kZT0iJiM1ODkzMjsiIGQ9Ik04NTEuNjA4IDc4MC4yNzljMzEuMDU2IDAgNTYuMzIzLTI1LjI2NyA1Ni4zMjMtNTYuMzI1di02NzkuODg2YzAtMzEuMDU3LTI1LjI2Ni01Ni4zMjQtNTYuMzIzLTU2LjMyNGgtNjc5Ljg4NmMtMzEuMDU4IDAtNTYuMzI1IDI1LjI2Ni01Ni4zMjUgNTYuMzI0bDAgNjc5Ljg4NmMwIDMxLjA1OCAyNS4yNjcgNTYuMzI1IDU2LjMyNSA1Ni4zMjVoNjc5Ljg4Nk04NTEuNjA4IDgzMS40NDVoLTY3OS44ODZjLTU5LjM2NSAwLTEwNy40OS00OC4xMjUtMTA3LjQ5LTEwNy40OXYtNjc5Ljg4NmMwLTU5LjM2NSA0OC4xMjUtMTA3LjQ4OSAxMDcuNDktMTA3LjQ4OWg2NzkuODg2YzU5LjM2NSAwIDEwNy40ODggNDguMTI0IDEwNy40ODggMTA3LjQ4OXY2NzkuODg2YzAgNTkuMzY1LTQ4LjEyMyAxMDcuNDktMTA3LjQ4OCAxMDcuNDl2MHoiICBob3Jpei1hZHYteD0iMTAyNCIgLz4KCiAgICAKICAgIDxnbHlwaCBnbHlwaC1uYW1lPSJ4dWFuemhvbmciIHVuaWNvZGU9IiYjNTg5MjA7IiBkPSJNNzYuODgzOTExIDc0Mi44Nzk5M2MwIDQzLjM3MTcyMyAzNS4wODgwNzYgNzguNTMwNDA3IDc4LjUyOTM4NCA3OC41MzA0MDdoNzEwLjYxMjA4YzQzLjM3MTcyMyAwIDc4LjUzMDQwNy0zNS4wODgwNzYgNzguNTMwNDA3LTc4LjUzMDQwN3YtNzEwLjYxMTA1N2MwLTQzLjM3MTcyMy0zNS4wODgwNzYtNzguNTMwNDA3LTc4LjUzMDQwNy03OC41MzA0MDdIMTU1LjQxNDMxOGMtNDMuMzcwNyAwLTc4LjUyOTM4NCAzNS4wODgwNzYtNzguNTI5Mzg0IDc4LjUzMDQwN1Y3NDIuODc5OTNoLTAuMDAxMDIzeiBtNTkuMzI5MTI4LTE3LjkxNjAwOXYtNjc0Ljc3Njk5MmMwLTIwLjUzOTc2MSAxNi41OTA4My0zNy4xMjAzNTggMzcuMTE5MzM1LTM3LjEyMDM1OGg2NzQuNzc4MDE1YzIwLjUzNzcxNCAwIDM3LjExOTMzNSAxNi41ODk4MDcgMzcuMTE5MzM1IDM3LjEyMDM1OHY2NzQuNzc2OTkyYzAgMjAuNTM4NzM4LTE2LjU5MDgzIDM3LjEyMDM1OC0zNy4xMTkzMzUgMzcuMTIwMzU4SDE3My4zMzEzNTFjLTIwLjUzODczOCAwLTM3LjExODMxMi0xNi41OTE4NTQtMzcuMTE4MzEyLTM3LjEyMDM1OHpNNDAwLjU2MDEzMSAxNDMuOTQzMDc5TDE3Ny4yNDI0MTkgMzY3LjIxNjc4OWw0MS4yMTY2NDUgNDEuMTcxNjE5IDIyMy4yNzY3OC0yMjMuMjc2NzgtNDEuMTc1NzEzLTQxLjE2ODU0OXpNMzYzLjI5MTM5NCAxOTMuOTAwNzg3bDQzNy4zMDE4NjcgNDM3LjMwNTk2IDQzLjYwNDAxMy00My41OTY4NS00MzcuMjY3MDc1LTQzNy4zMDM5MTMtMjcuMTc4OTU4IDI3LjEzNzAwMy0xNi40NTk4NDcgMTYuNDU3OHoiICBob3Jpei1hZHYteD0iMTAyNCIgLz4KCiAgICAKICAgIDxnbHlwaCBnbHlwaC1uYW1lPSJpY29uLWRpcmVjdGlvbi1yaWdodCIgdW5pY29kZT0iJiM1OTAwNjsiIGQ9Ik01OTguMDg2IDM2MS40NTFjNi4wNDQgNi4wMjggOS4zNzMgMTQuMDQgOS4zNzMgMjIuNTYgMCA4LjUyMS0zLjMzIDE2LjUyNS05LjM3MSAyMi41MzZMMTgyLjAwNCA4MjIuNjNjLTYuMDM0IDYuMDM0LTE0LjA1MiA5LjM1NC0yMi41NzkgOS4zNDktOC41MTMtMC4wMDUtMTYuNTEtMy4zMjYtMjIuNTE5LTkuMzUxLTYuMDI3LTYuMDQyLTkuMzQ2LTE0LjA1OC05LjM0Ni0yMi41NzEgMC04LjUxNCAzLjMyLTE2LjUyMiA5LjM0OC0yMi41NTFMNTMwLjQxNyAzODQgMTM2LjkxLTkuNTA1OTk5OTk5OTk5OTcyYy02LjAyOC02LjAyOC05LjM0OC0xNC4wNDEtOS4zNDgtMjIuNTYyczMuMzItMTYuNTM0IDkuMzQ4LTIyLjU2MmM2LjAzNC02LjAzNCAxNC4wNTQtOS4zNTQgMjIuNTgtOS4zNDggOC41MTIgMC4wMDYgMTYuNTA4IDMuMzI2IDIyLjUxNCA5LjM0OGw0MTYuMDgyIDQxNi4wODF6TTQxNi41MzcgODAwLjA1N2MwLTguNTE0IDMuMzItMTYuNTIyIDkuMzQ4LTIyLjU1MUw4MTkuMzkyIDM4NCA0MjUuODg1LTkuNTA1OTk5OTk5OTk5OTcyYy02LjAyOC02LjAyOC05LjM0OC0xNC4wNDEtOS4zNDgtMjIuNTYyczMuMzItMTYuNTM0IDkuMzQ4LTIyLjU2MmM2LjAzNC02LjAzNCAxNC4wNTQtOS4zNTQgMjIuNTgtOS4zNDggOC41MTIgMC4wMDYgMTYuNTA4IDMuMzI2IDIyLjUxNCA5LjM0OEw4ODcuMDYgMzYxLjQ1MmM2LjA0NCA2LjAyOCA5LjM3MyAxNC4wNCA5LjM3MyAyMi41NiAwIDguNTIxLTMuMzMgMTYuNTI1LTkuMzcxIDIyLjUzNkw0NzAuOTggODIyLjYzYy02LjAzNCA2LjAzNC0xNC4wNTIgOS4zNTQtMjIuNTc5IDkuMzQ5LTguNTEzLTAuMDA1LTE2LjUxLTMuMzI2LTIyLjUxOS05LjM1MS02LjAyNi02LjA0Mi05LjM0NS0xNC4wNTgtOS4zNDUtMjIuNTcxeiIgIGhvcml6LWFkdi14PSIxMDI0IiAvPgoKICAgIAogICAgPGdseXBoIGdseXBoLW5hbWU9Imljb24tZGlyZWN0aW9uLWxlZnQiIHVuaWNvZGU9IiYjNTkwMDk7IiBkPSJNNDI1LjkwOSA0MDYuNTQ5Yy02LjA0NC02LjAyOC05LjM3My0xNC4wNC05LjM3My0yMi41NiAwLTguNTIxIDMuMzMtMTYuNTI1IDkuMzcxLTIyLjUzNkw4NDEuOTktNTQuNjI5OTk5OTk5OTk5OTk1YzYuMDM0LTYuMDM0IDE0LjA1Mi05LjM1NCAyMi41NzktOS4zNDkgOC41MTMgMC4wMDUgMTYuNTEgMy4zMjYgMjIuNTE4IDkuMzUxIDYuMDI3IDYuMDQyIDkuMzQ2IDE0LjA1OCA5LjM0NiAyMi41NzEgMCA4LjUxMy0zLjMyIDE2LjUyMi05LjM0OCAyMi41NTFMNDkzLjU3NyAzODRsMzkzLjUwOCAzOTMuNTA3YzYuMDI4IDYuMDI4IDkuMzQ4IDE0LjA0MSA5LjM0OCAyMi41NjJzLTMuMzIgMTYuNTM0LTkuMzQ4IDIyLjU2MmMtNi4wMzQgNi4wMzQtMTQuMDU0IDkuMzU0LTIyLjU4IDkuMzQ4LTguNTEyLTAuMDA2LTE2LjUwOC0zLjMyNi0yMi41MTQtOS4zNDhMNDI1LjkwOSA0MDYuNTQ5ek02MDcuNDU3LTMyLjA1NzAwMDAwMDAwMDAxNmMwIDguNTEzLTMuMzIgMTYuNTIyLTkuMzQ4IDIyLjU1MUwyMDQuNjAyIDM4NCA1OTguMTEgNzc3LjUwNzAwMDAwMDAwMDFjNi4wMjggNi4wMjggOS4zNDggMTQuMDQxIDkuMzQ4IDIyLjU2MnMtMy4zMiAxNi41MzQtOS4zNDggMjIuNTYyYy02LjAzNCA2LjAzNC0xNC4wNTQgOS4zNTQtMjIuNTggOS4zNDgtOC41MTItMC4wMDYtMTYuNTA4LTMuMzI2LTIyLjUxNC05LjM0OEwxMzYuOTM0IDQwNi41NDljLTYuMDQ0LTYuMDI4LTkuMzczLTE0LjA0LTkuMzczLTIyLjU2IDAtOC41MjEgMy4zMy0xNi41MjUgOS4zNzEtMjIuNTM2TDU1My4wMTUtNTQuNjI5OTk5OTk5OTk5OTk1YzYuMDM0LTYuMDM0IDE0LjA1Mi05LjM1NCAyMi41NzktOS4zNDkgOC41MTMgMC4wMDUgMTYuNTEgMy4zMjYgMjIuNTE4IDkuMzUxIDYuMDI3IDYuMDQyIDkuMzQ1IDE0LjA1OSA5LjM0NSAyMi41NzF6IiAgaG9yaXotYWR2LXg9IjEwMjQiIC8+CgogICAgCiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0ieW91MSIgdW5pY29kZT0iJiM1OTE0OTsiIGQ9Ik03MjEuOTIgNDAxLjkybC0zODQgMzg0Yy0xMC4yNCAxMC4yNC0yNS42IDEwLjI0LTM1Ljg0IDBzLTEwLjI0LTI1LjYgMC0zNS44NEw2NjguMTYgMzg0IDMwMi4wOCAxNy45MTk5OTk5OTk5OTk5NmMtMTAuMjQtMTAuMjQtMTAuMjQtMjUuNiAwLTM1Ljg0czI1LjYtMTAuMjQgMzUuODQgMGwzODQgMzg0YzEwLjI0IDEwLjI0IDEwLjI0IDI1LjYgMCAzNS44NHoiICBob3Jpei1hZHYteD0iMTAyNCIgLz4KCiAgICAKICAgIDxnbHlwaCBnbHlwaC1uYW1lPSJ6dW83IiB1bmljb2RlPSImIzU5MTUxOyIgZD0iTTM1NS44NCAzODRMNzIxLjkyIDc1MC4wOGMxMC4yNCAxMC4yNCAxMC4yNCAyNS42IDAgMzUuODQtMTAuMjQgMTAuMjQtMjUuNiAxMC4yNC0zNS44NCAwbC0zODQtMzg0Yy0xMC4yNC0xMC4yNC0xMC4yNC0yNS42IDAtMzUuODRsMzg0LTM4NGMxMC4yNC0xMC4yNCAyNS42LTEwLjI0IDM1Ljg0IDBzMTAuMjQgMjUuNiAwIDM1Ljg0TDM1NS44NCAzODR6IiAgaG9yaXotYWR2LXg9IjEwMjQiIC8+CgogICAgCiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0idGltZXMiIHVuaWNvZGU9IiYjNTg4ODA7IiBkPSJNOTA3LjUxIDY3LjU5NTAwMDAwMDAwMDAzbC03OS4xMDEtNzkuMTAyLTMxNi40MDYgMzE2LjQwNS0zMTYuNDA1LTMxNi40MDUtNzkuMTA0IDc5LjEwMkw0MzIuODk5IDM4NCAxMTYuNDk0IDcwMC40MDVsNzkuMTA0IDc5LjA5OSAzMTYuNDA1LTMxNi40MDVMODI4LjQxIDc3OS41MDRsNzkuMDk4LTc5LjA5OUw1OTEuMTAyIDM4NGwzMTYuNDA1LTMxNi40MDV6IiAgaG9yaXotYWR2LXg9IjEwMjUiIC8+CgogICAgCgoKICA8L2ZvbnQ+CjwvZGVmcz48L3N2Zz4K?t=1530004230003#iconfont') format('svg'); /* iOS 4.1- */
    }

    .sp-iconfont {
        font-family:"sp-iconfont" !important;
        font-size:16px;
        font-style:normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .sp-icon-warning:before { content: "\e663"; }
    .sp-icon-clear:before { content: "\e74b"; }
    .sp-icon-unselect-all:before { content: "\e634"; }
    .sp-icon-select-all:before { content: "\e628"; }
    .sp-icon-last:before { content: "\e67e"; }
    .sp-icon-first:before { content: "\e681"; }
    .sp-icon-next:before { content: "\e70d"; }
    .sp-icon-previous:before { content: "\e70f"; }
    .sp-icon-close:before { content: "\e600"; }
</style>
