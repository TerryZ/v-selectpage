import { mount } from '@vue/test-utils';
import list from '@test/sample/nba-teams';
import sp from '@/SelectPage';

describe('v-selectpage list view', ()=>{
	describe('single selection mode', ()=>{
		const wrapper = mount(sp, {
			propsData: {
				data: list
			}
		});
		it('"Select current page" and "Clear current page" buttons should be not exist in single selection mode',()=>{
			expect(wrapper.find('div.sp-header button.sp-select-all-btn').exists()).to.equal(false);
			expect(wrapper.find('div.sp-header button.sp-remove-all-btn').exists()).to.equal(false);
		});

		it('select first item, that item name should be "Chicago Bulls"', ()=>{
			wrapper.find('div.sp-input-container').trigger('click');
			wrapper.vm.next();
			wrapper.find('li.sp-over').trigger('click');
			expect(wrapper.vm.picked[0].name).to.equal('Chicago Bulls');
		});
		it('after item pick, the "x" icon(clear picked item) should be display', ()=>{
			expect(wrapper.find('div.sp-clear').exists()).to.equal(true);
		});
		it('click "x" icon to clear selected items, value should be empty', ()=>{
			wrapper.find('div.sp-clear').trigger('click');
			expect(wrapper.vm.picked.length).to.equal(0);
		});
		it('v-model/value content modify to "22", the selected item name should be "Los Angeles Clippers"', ()=>{
			wrapper.setProps({ value: '22' });
			expect(wrapper.vm.picked[0].name).to.equal('Los Angeles Clippers');
		});
	});
	describe('multiple selection mode', ()=>{
		const wrapper = mount(sp, {
			propsData: {
				data: list,
				multiple: true
			}
		});

		it('"Select current page" and "Clear current page" buttons should be exist in multiple selection mode',()=>{
			expect(wrapper.find('div.sp-header button.sp-select-all-btn').exists()).to.equal(true);
			expect(wrapper.find('div.sp-header button.sp-remove-all-btn').exists()).to.equal(true);
		});
		it('click "select current page" icon, go next page and click icon again, the picked items size should be 20', ()=>{
			wrapper.find('div.sp-input-container').trigger('click');
			wrapper.find('button.sp-select-all-btn').trigger('click');
			wrapper.find('div.sp-pagination').findAll('a').at(3).trigger('click');
			wrapper.find('button.sp-select-all-btn').trigger('click');
			expect(wrapper.vm.picked.length).to.equal(20);
		});
		it('click "clear current page" icon, the picked items size should be 10', ()=>{
			wrapper.find('button.sp-remove-all-btn').trigger('click');
			expect(wrapper.vm.picked.length).to.equal(10);
		});
		it('v-model/value content modify to "3,5,7", the picked items name should be "Detroit Pistons,Milwaukee Bucks,Boston Celtics"', ()=>{
			wrapper.setProps({ value: '3,5,7' });
			expect(wrapper.vm.picked.map(val=>val.name).join(',')).to.equal('Detroit Pistons,Milwaukee Bucks,Boston Celtics');
		});

		const limit = mount(sp, {
			propsData:{
				data: list,
				multiple: true,
				maxSelectLimit: 3
			}
		});

		it('"maxSelectLimit" options set to 3, click "select current page" icon and the picked items size should be 3', ()=>{
			limit.find('div.sp-input-container').trigger('click');
			limit.find('button.sp-select-all-btn').trigger('click');
			expect(limit.vm.picked.length).to.equal(3);
		});
		it('click "Clear all selected" icon, all picked items should be clear', ()=>{
			limit.find('div.sp-input-container').trigger('click');
			limit.find('button.sp-clear-all-btn').trigger('click');
			expect(limit.vm.picked.length).to.equal(0);
		});
		it('cross page pick. go to next page and pick item, back to first page, click "select current page" icon, the picked items size should be 3', ()=>{
			wrapper.find('div.sp-pagination').findAll('a').at(3).trigger('click');//go next page
			wrapper.findAll('ul.sp-results li').at(5).trigger('click');//pick a item
			wrapper.find('div.sp-pagination').findAll('a').at(1).trigger('click');//back to previous page
			limit.find('button.sp-select-all-btn').trigger('click');
			expect(limit.vm.picked.length).to.equal(3);
		});
		it('for now, click "select current page" icon again, the picked size should not change(3)',()=>{
			limit.find('button.sp-select-all-btn').trigger('click');
			expect(limit.vm.picked.length).to.equal(3);
		});
		it('after picking, the title text should be "已选择 3 个项目"', ()=>{
			expect(limit.find('div.sp-header > h3').text()).to.equal('已选择 3 个项目');
		});
		it('click the "x" icon in first tag, the first tag should be remove and there are only 2 tags left now', ()=>{
			limit.findAll('span.sp-selected-tag').at(0).find('span:last-child').trigger('click');
			expect(limit.vm.picked.length).to.equal(2);
		});
		it('click "Clear all selected" icon, all picked items should be clear', ()=>{
			limit.find('div.sp-input-container').trigger('click');
			limit.find('button.sp-clear-all-btn').trigger('click');
			expect(limit.vm.picked.length).to.equal(0);
		});
		it('after clear, the title text should be "SelectPage"(default title text when no items are picked)', ()=>{
			expect(limit.find('div.sp-header > h3').text()).to.equal('SelectPage');
		});
	});
});