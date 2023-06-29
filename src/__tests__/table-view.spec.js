import { mount } from '@vue/test-utils';
import list from '@test/sample/nba-teams';
import table from '@test/sample/countries';
import sp from '@/SelectPage';

describe('v-selectpage table view', ()=>{
	describe('single select mode', ()=>{
		const wrapper = mount(sp, {
			propsData: {
				data: table,
				tbColumns: [
					{title: 'id',data: 'id'},
					{title: 'name',data: 'name'},
					{title: 'desc',data: 'desc'}
				]
			}
		});
		it('have table view container', ()=>{
			expect(wrapper.find('table.sp-table').exists()).to.equal(true);
		});
		it('have 3 table column', ()=>{
			expect(wrapper.find('table.sp-table > thead > tr').findAll('th').length).to.equal(3);
		});
	});
});