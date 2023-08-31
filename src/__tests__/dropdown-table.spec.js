import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import {
  SelectPageTable, SelectPageTableCore
} from '@/index'
import { useSelectPageHandle } from '../../examples/handles'

describe('v-selectpage - SelectPageTable 表格视图选择器模式', () => {
  const wrapper = mount(SelectPageTable, {
    props: {
      columns: [
        { title: '编码', data: 'code', width: 100 },
        { title: '名称', data: 'name' },
        { title: '单价', data: 'price', width: 80 }
      ],
      multiple: true,
      modelValue: [2, 3, 5]
    }
  })
  const core = wrapper.getComponent(SelectPageTableCore)

  const { dataListHandle, selectedItemsHandle } = useSelectPageHandle()
  const [data, callback] = core.emitted()['fetch-data'].at(-1)
  const [selected, selectedCallback] = core.emitted()['fetch-selected-data'].at(-1)
  const result = dataListHandle(data)
  const selectedResult = selectedItemsHandle(selected)
  callback(result.list, result.count)
  selectedCallback(selectedResult)

  test('3 个项目被默认选中，触发器中应有两个标签元素', () => {
    expect(wrapper.findAll('.sp-chip')).toHaveLength(3)
  })
  test('第 1 个标签显示文本应为 `列表项目-item-2`', () => {
    expect(wrapper.findAll('.sp-chip').at(0).find('.sp-chip--body').text()).toBe('列表项目-item-2')
  })
  test('第 2 个标签显示文本应为 `列表项目-item-3`', () => {
    expect(wrapper.findAll('.sp-chip').at(1).find('.sp-chip--body').text()).toBe('列表项目-item-3')
  })
  test('设置组件为禁用状态，触发器应无法响应激活操作', async () => {
    await wrapper.setProps({ disabled: true })
    const container = wrapper.find('.sp-trigger-container')
    expect(container.classes('sp-disabled')).toBeTruthy()

    await container.trigger('click')
    expect(container.classes('sp-opened')).toBeFalsy()
  })
  test('禁用状态下，标签中的移除图标应不渲染', () => {
    expect(
      wrapper.findAll('.sp-chip').at(0).find('.sp-circle-btn').exists()
    ).toBeFalsy()
  })
  test('取消禁用状态，触发器恢复可操作状态', async () => {
    await wrapper.setProps({ disabled: false })
    const container = wrapper.find('.sp-trigger-container')
    expect(container.classes('sp-disabled')).toBeFalsy()

    await container.trigger('click')
    expect(container.classes('sp-opened')).toBeTruthy()
  })
  test('点击第 2 个标签中的移除图标，该标签应被移除', async () => {
    await wrapper.findAll('.sp-chip').at(1).find('.sp-circle-btn').trigger('click')
    expect(wrapper.findAll('.sp-chip')).toHaveLength(2)
  })
  test('点击下拉界面中的垃圾桶图标，所有选中项目应被移除', async () => {
    await core.find('.sp-search-control .sp-circle-btn').trigger('click')
    expect(wrapper.findAll('.sp-chip')).toHaveLength(0)
  })
  test('触发器元素内的文本应为 `Select an option`', () => {
    expect(wrapper.find('.sp-placeholder').text()).toBe('Select an option')
  })
})
