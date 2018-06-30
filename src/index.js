import selectPage from './SelectPage.vue';

const Plugin = {
    install(Vue, option = {}){
        if(Object.keys(option).length){
            if(typeof(option.title) === 'string')
                selectPage.props.title.default = option.title;
            if(typeof(option.language) === 'string')
                selectPage.props.language.default = option.language;
            if(typeof(option.placeholder) === 'string')
                selectPage.props.placeholder.default = option.placeholder;
            if(typeof(option.pageSize) === 'number')
                selectPage.props.pageSize.default = option.pageSize;

            if (option.dataLoad && typeof(option.dataLoad) === 'function'){
                selectPage.mixins = [{
                    methods:{
                        dataLoad: option.dataLoad
                    }
                }];
            }
        }
        Vue.component(selectPage.name, selectPage);
    }
};

export default Plugin;