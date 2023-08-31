import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import {
  SelectPageList, SelectPageListCore
} from '@/index'
import { useSelectPageHandle } from '../../examples/handles'

describe('v-selectpage - SelectPageList 列表视图选择器模式', () => {
  const wrapper = mount(SelectPageList)
  const core = wrapper.getComponent(SelectPageListCore)

  const { dataListHandle } = useSelectPageHandle()
  const [data, callback] = core.emitted()['fetch-data'].at(-1)
  const result = dataListHandle(data)
  callback(result.list, result.count)

  test('应存在触发器元素', () => {
    expect(wrapper.find('.sp-trigger-container').exists()).toBeTruthy()
  })
  test('未选择项目时，触发器元素默认提示内容应为 `Select an option`', () => {
    expect(wrapper.find('.sp-placeholder').text()).toBe('Select an option')
  })
  test('下拉容器应不显示', () => {
    expect(Object.hasOwn(core.element.parentElement.style, 'visibility')).toBeFalsy()
    expect(core.element.parentElement.style.display).toBe('none')
  })
  test('点击触发元素后，应呈现激活状态', async () => {
    await wrapper.find('.sp-trigger-container').trigger('click')
    expect(wrapper.find('.sp-trigger-container').classes('sp-opened')).toBeTruthy()
  })
  test('下拉容器应显示并展开', () => {
    expect(core.element.parentElement.style.visibility).toBe('visible')
    expect(Object.hasOwn(core.element.parentElement.style, 'display')).toBeFalsy()
  })
  test('展开时响应 `visible-change` 事件，输出值为 true', () => {
    expect(wrapper.emitted()['visible-change'].length).toBeGreaterThan(0)
    const [visible] = wrapper.emitted()['visible-change'].at(-1)
    expect(visible).toBe(true)
  })
  test('选中列表中的第 1 个项目，触发器中应显示 `列表项目-item-1`', async () => {
    await core.findAll('.sp-list-item').at(0).trigger('click')
    expect(wrapper.find('.sp-select-content').text()).toBe('列表项目-item-1')
  })
  test('触发器中出现清除选择图标', () => {
    expect(wrapper.find('.sp-select .sp-circle-btn').exists()).toBeTruthy()
  })
  test('设置组件为禁用状态，触发器应无法响应激活操作', async () => {
    await wrapper.setProps({ disabled: true })
    const container = wrapper.find('.sp-trigger-container')
    expect(container.classes('sp-disabled')).toBeTruthy()

    await container.trigger('click')
    expect(container.classes('sp-opened')).toBeFalsy()
  })
  test('禁用状态下，解发器中的移除图标应不渲染', () => {
    expect(
      wrapper.find('.sp-select').find('.sp-circle-btn').exists()
    ).toBeFalsy()
  })
})
