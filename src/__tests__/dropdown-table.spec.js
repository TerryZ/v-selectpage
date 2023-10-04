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
      modelValue: [2, 3, 5],
      customTriggerClass: 'custom-trigger',
      customContainerClass: 'custom-container'
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

  test('设置 `customTriggerClass` prop，触发对象容器应添加相应样式类', () => {
    expect(wrapper.classes('custom-trigger')).toBeTruthy()
  })
  test('设置 `customContainerClass` prop，下拉容器应添加相应样式类', () => {
    expect(core.element.parentElement.classList.contains('custom-container')).toBeTruthy()
  })
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
  test('在搜索框中按下方向下键 2 次，列表中的第 2 个项目，应处于高亮状态', async () => {
    await core.find('.sp-search-input').trigger('keydown.down')
    await core.find('.sp-search-input').trigger('keydown.down')

    expect(
      core.findAll('.sp-table tbody tr').at(1).classes('sp-over')
    ).toBeTruthy()
  })
  test('按下方向上键，列表中的第 1 个项目，应处于高亮状态', async () => {
    await core.find('.sp-search-input').trigger('keydown.up')

    expect(
      core.findAll('.sp-table tbody tr').at(0).classes('sp-over')
    ).toBeTruthy()
  })
  test('在存在高亮行的情况下，在搜索框中按回车键，当前高亮行将被选中', async () => {
    await core.find('.sp-search-input').trigger('keydown.enter')
    expect(
      core.findAll('.sp-table tbody tr').at(0).classes('sp-selected')
    ).toBeTruthy()
  })
  test('在搜索框中按 esc 键，应收起下拉容器', async () => {
    await core.find('.sp-search-input').trigger('keydown.esc')
    expect(wrapper.find('.sp-trigger-container').classes('sp-opened')).toBeFalsy()
    expect(Object.hasOwn(core.element.parentElement.style, 'visibility')).toBeFalsy()
    expect(core.element.parentElement.style.display).toBe('none')
  })
  test('收起下拉容器时响应 `visible-change` 事件，输出值为 false', () => {
    const [visible] = wrapper.emitted()['visible-change'].at(-1)
    expect(visible).toBe(false)
  })
})
