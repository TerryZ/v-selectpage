import { mount } from '@vue/test-utils';
import list from '@test/sample/nba-teams';
import sp from '@/SelectPage';

describe('v-selectpage basic options', ()=>{
	const wrapper = mount(sp, {
		propsData: {
			data: list,
			disabled: true,
			placeholder: 'This is test placeholder text',
			title: 'v-selectpage test title'
		}
	});
	it('"disabled" option set to true, the dropdown is not allowed to be opened ', ()=>{
		wrapper.find('div.sp-input-container').trigger('click');
		expect(wrapper.find('div.v-dropdown-container').isVisible()).to.equal(false);
	});
	it('the placeholder text should be "This is test placeholder text"', ()=>{
		expect(wrapper.find('span.sp-placeholder').text()).to.equal('This is test placeholder text');
	});
	it('"pagination" set to false, pagination bar should be not exist', ()=>{
		wrapper.setProps({ pagination: false });
		expect(wrapper.find('div.sp-pagination').exists()).to.equal(false);
	});
	it('the title text in selectpage should be "v-selectpage test title"', ()=>{
		expect(wrapper.find('div.sp-header > h3').text()).to.equal('v-selectpage test title');
	});
	it('enter query keyword "sa", the result list should only have 2 items',()=>{
		wrapper.setProps({ disabled: false, pagination: true });
		wrapper.find('.sp-search-input').setValue('sa');
		/**
		 * simulate keyboard enter, because in the real case "populate" method will trigger by keyup event
		 */
		wrapper.vm.populate();
		expect(wrapper.findAll('ul.sp-results li').length).to.equal(2);
	});
});