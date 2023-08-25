import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
// import list from './data/nba-teams'
import { SelectPageListCore } from '@/index'
import { useSelectPageHandle } from '../../examples/handles'

describe('v-selectpage SelectPageListCore 列表模式核心模块', () => {
  describe('默认参数场景', () => {
    const wrapper = mount(SelectPageListCore)
    const { dataHandle } = useSelectPageHandle()

    it('初始加载第一页列表数据', () => {
      // { search: "", pageNumber: 1, pageSize: 10 }
      const [data, callback] = wrapper.emitted()['fetch-data'].at(-1)

      const result = dataHandle(data)
      callback(result.list, result.count)

      expect(data.search).toBe('')
      expect(data.pageNumber).toBe(1)
      expect(data.pageSize).toBe(10)
    })
    it('列表中应有 10 个项目', () => {
      expect(wrapper.findAll('.sp-list-item')).toHaveLength(10)
    })
    it('搜索栏中显示的提示文字应为 `Search`', () => {
      expect(wrapper.find('.sp-search-input').attributes('placeholder')).toBe('Search')
    })
    it('搜索栏清空搜索内容图标应不存在', () => {
      expect(wrapper.find('.sp-search-container .bi-x-lg').exists()).toBe(false)
    })
    it('无选中项目时，清空选择按钮应为禁用状态', () => {
      expect(
        wrapper.find('.sp-search-control .sp-circle-btn').classes('sp-circle-btn--disabled')
      ).toBe(true)
    })
    it('分页栏中显示信息应为 `Page 1 of 11 (101 records)`', () => {
      expect(wrapper.find('.sp-page-info').text()).toBe('Page 1 of 11 (101 records)')
    })
    it('分页栏中的首页、上一页按钮应为禁用状态', () => {
      const buttons = wrapper.findAll('.sp-page-button')

      expect(buttons.at(0).classes('sp-page-disabled')).toBe(true)
      expect(buttons.at(1).classes('sp-page-disabled')).toBe(true)
    })
    it('跳转至下一页，应更新分页栏页码，且首页、上一页按钮状态可用', async () => {
      const buttons = wrapper.findAll('.sp-page-button')
      // click `next page` button
      await buttons.at(2).find('a').trigger('click')

      // 首页、上一页按钮恢复可用状态
      expect(buttons.at(0).classes('sp-page-disabled')).toBe(false)
      expect(buttons.at(1).classes('sp-page-disabled')).toBe(false)
      // 分页栏信息中当前页更新为 2
      expect(wrapper.find('.sp-page-info').text()).toBe('Page 2 of 11 (101 records)')

      const [data] = wrapper.emitted()['fetch-data'].at(-1)

      // fetch-data 事件的当前页数据响应为 2
      expect(data.pageNumber).toBe(2)
    })
    it('搜索关键字 `10`，搜索栏出现清空搜索内容图标', async () => {
      vi.useFakeTimers()

      const input = wrapper.find('.sp-search-input')
      // 输入 10 两个字符
      await input.setValue('10')
      await input.trigger('input')

      vi.runAllTimers()
      await nextTick()

      // console.log(wrapper.emitted()['fetch-data'])
      const [data, callback] = wrapper.emitted()['fetch-data'].at(-1)

      expect(data.search).toBe('10')
      expect(data.pageNumber).toBe(1)
      expect(wrapper.find('.sp-search-container .bi-x-lg').exists()).toBe(true)

      const result = dataHandle(data)
      callback(result.list, result.count)

      vi.useRealTimers()
    })
    it('搜索后，列表中应只有 3 个项目', () => {
      expect(wrapper.findAll('.sp-list-item')).toHaveLength(3)
    })
    it('分页栏中显示信息应为 `Page 1 of 1 (3 records)`', () => {
      expect(wrapper.find('.sp-page-info').text()).toBe('Page 1 of 1 (3 records)')
    })
    it('选中列表的第 2 个项目，该项目应呈现选中样式', async () => {
      const secondItem = wrapper.findAll('.sp-list-item').at(1)

      await secondItem.trigger('click')

      expect(secondItem.classes('sp-selected')).toBeTruthy()
    })
    it('选中项目后，响应 `selection-change` 事件，且响应数据为 id 为 100 的数据', async () => {
      const [data] = wrapper.emitted()['selection-change'].at(-1)
      const [model] = wrapper.emitted()['update:modelValue'].at(-1)

      expect(data.at(0).id).toBe(100)
      expect(model).toEqual([100])
    })
    it('点击选中项目移除选中图标，应移除该项目的选中状态，且响应事件为空数组', async () => {
      const selectedItem = wrapper.find('.sp-list-item.sp-selected')
      await selectedItem.find('.sp-circle-btn').trigger('click')
      expect(selectedItem.classes('sp-selected')).toBeFalsy()

      const [data] = wrapper.emitted()['selection-change'].at(-1)
      expect(data).toHaveLength(0)
    })
    it('再次选中第 3 个项目，`selection-change` 事件响应数据为 id 为 101 的数据', async () => {
      const thirdItem = wrapper.findAll('.sp-list-item').at(2)
      await thirdItem.trigger('click')
      expect(thirdItem.classes('sp-selected')).toBeTruthy()

      const [data] = wrapper.emitted()['selection-change'].at(-1)
      const [model] = wrapper.emitted()['update:modelValue'].at(-1)
      expect(data.at(0).id).toBe(101)
      expect(model).toEqual([101])
    })
    it('点击搜索栏尾部的清除所有选中项目图标，所有选中项目应被清除，并响应数据为空数组', async () => {
      await wrapper.find('.sp-search-control .sp-circle-btn').trigger('click')

      const [data] = wrapper.emitted()['selection-change'].at(-1)
      const [model] = wrapper.emitted()['update:modelValue'].at(-1)
      expect(data).toHaveLength(0)
      expect(model).toHaveLength(0)
    })
  })
})
