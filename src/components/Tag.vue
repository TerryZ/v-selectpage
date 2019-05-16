<template>
    <div class="sp-base sp-inputs" ref="input" >
        <span class="sp-placeholder" v-show="!picked.length" v-text="placeholder"></span>
        <span class="sp-selected-tag" :key="index" v-for="(sel,index) in tagList">
            <span v-html="renderCell(sel)"></span>
            <span @click="remove(index)" v-show="!disabled">
                <i class="sp-iconfont sp-icon-close"></i>
            </span>
        </span>
        <span v-if="maxShowTags < 1 && picked.length > 0" class="sp-selected-tag">{{ tagItemsSelectedText }}</span>
        <span v-else-if="picked.length > maxShowTags" class="sp-selected-tag">
            +{{ picked.length - maxShowTags }}
        </span>
    </div>
</template>

<script>
    export default {
        name: "SelectPageTag",
        props: {
            picked: Array,
            disabled: Boolean,
            placeholder: String
        },
        inject: ['renderCell', 'maxShowTags', 'i18n'],
        computed: {
          tagItemsSelectedText() {
            const textStr = this.i18n.items_selected;
            return textStr.replace('selected_count', this.picked.length);
          },
          tagList() {
            if(this.maxShowTags < 1) return [];
            return this.picked.slice(0, this.maxShowTags);
          }
        },
        methods: {
            remove(index){
                this.$emit('remove', index);
            }
        }
    }
</script>