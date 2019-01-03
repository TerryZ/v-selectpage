<template>
    <div class="sp-base sp-inputs" ref="input" >
        <span class="sp-placeholder" v-show="!picked.length" v-text="placeholder"></span>
        <span class="sp-selected-tag" :key="index" v-for="(sel,index) in picked">
            <span v-html="renderCell(sel)"></span>
            <span @click="remove(index)" v-show="!disabled">
                <i class="sp-iconfont sp-icon-close"></i>
            </span>
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
        inject: ['renderCell'],
        methods: {
            remove(index){
                this.$emit('remove', index);
            }
        }
    }
</script>