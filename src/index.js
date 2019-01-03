import selectPage from './SelectPage.vue';

const Plugin = {
    install(Vue, option = {}){
        if(Object.keys(option).length){
        	const props = selectPage.mixins[0].props;
            if(typeof option.title === 'string') props.title.default = option.title;
            if(typeof option.language === 'string') props.language.default = option.language;
            if(typeof option.placeholder === 'string') props.placeholder.default = option.placeholder;
            if(typeof option.pageSize === 'number') props.pageSize.default = option.pageSize;
			if(typeof option.rtl === 'boolean') props.rtl.default = option.rtl;

            if(option.dataLoad && typeof option.dataLoad === 'function'){
                selectPage.extends = {
                    methods:{
                        dataLoad: option.dataLoad
                    }
                };
            }
        }
        Vue.component(selectPage.name, selectPage);
    }
};

export default Plugin;