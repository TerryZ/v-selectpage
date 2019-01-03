<template>
    <div>
        <div class="sp-base sp-input" ref="input" >
            <span v-html="results"></span>
            <span class="sp-placeholder" v-show="!results" v-text="placeholder"></span>
        </div>
        <div class="sp-clear" v-show="results && !disabled"
             @click.stop="remove" :title="i18n.clear"><i class="sp-iconfont sp-icon-close"></i></div>
    </div>
</template>

<script>
    export default {
        name: "SelectPageSelect",
        props: {
            results: String,
            disabled: Boolean,
            placeholder: String
        },
        inject: ['i18n'],
        methods: {
            remove(){
                this.$emit('remove');
            }
        }
    }
</script>