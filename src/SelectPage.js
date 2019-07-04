import './selectpage.scss';
import dropdown from 'v-dropdown';

import data from './mixins/data';
import methods from './mixins/methods';
import util from './mixins/util';
import render from './mixins/render';

import tag from './components/Tag';
import select from './components/Select';
import page from './components/Pagination';
import list from './components/List';
import table from './components/Table';

export default {
	name: "v-selectpage",
	mixins: [data, methods, util, render],
	components: {
		'v-dropdown': dropdown,
		'sp-tag': tag,
		'sp-select': select,
		'sp-page': page,
		'sp-list': list,
		'sp-table': table
	},
	provide(){
		return {
			i18n: this.i18n,
			renderCell: this.renderCell,
			keyField: this.keyField,
			showField: this.showField,
            inPicked: this.inPicked,
			rtl: this.rtl
		};
	},
	mounted(){
		//set searchField when user not config
		if(!this.searchField){
			if(typeof this.showField === 'string'){
                this.searchColumn = this.showField;
            }else if(Array.isArray(this.showField) && this.showField.length){
                this.searchColumn = this.showField[0].data;
            }
		}else this.searchColumn = this.searchField;

		//sort data list
		this.sortList();

		this.initSelection();
	}
}