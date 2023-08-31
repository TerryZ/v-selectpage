import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { SelectPageTableCore } from '@/index'
import { useSelectPageHandle } from '../../examples/handles'

describe('v-selectpage SelectPageTableCore 表格模式核心模块', () => {
  describe('默认参数场景', () => {
    const wrapper = mount(SelectPageTableCore, {
      props: {
        columns: [
          { title: '编码', data: 'code', width: 100 },
          { title: '名称', data: 'name' },
          { title: '单价', data: 'price', width: 80 }
        ]
      }
    })
    const { dataListHandle } = useSelectPageHandle()
    const [data, callback] = wrapper.emitted()['fetch-data'].at(-1)

    const result = dataListHandle(data)
    callback(result.list, result.count)

    it('应存在 3 个数据列', () => {
      expect(wrapper.findAll('.sp-table table thead tr th')).toHaveLength(3)
    })
    it('应存在 10 行数据', () => {
      expect(wrapper.findAll('.sp-table table tbody tr')).toHaveLength(10)
    })
    it('3 个列标题应为 `编码`、`名称` 与 `单价`', () => {
      const header = wrapper.find('.sp-table table thead tr')

      expect(header.findAll('th').at(0).text()).toBe('编码')
      expect(header.findAll('th').at(1).text()).toBe('名称')
      expect(header.findAll('th').at(2).text()).toBe('单价')
    })
    it('第 1 列单元格的宽度应都为 100px', () => {
      expect(
        wrapper
          .findAll('.sp-table table tbody tr').at(0)
          .findAll('td').at(0)
          .element.style.width
      ).toBe('100px')
    })
    it('第 3 列单元格的宽度应都为 80px', () => {
      expect(
        wrapper
          .findAll('.sp-table table tbody tr').at(0)
          .findAll('td').at(2)
          .element.style.width
      ).toBe('80px')
    })
    it('第 1 行编码列的内容应为 `编码-code-1`', () => {
      const firstRow = wrapper.findAll('.sp-table table tbody tr').at(0)
      expect(firstRow.findAll('td').at(0).text()).toBe('编码-code-1')
    })
    it('第 1 行名称列的内容应为 `列表项目-item-1`', () => {
      const firstRow = wrapper.findAll('.sp-table table tbody tr').at(0)
      expect(firstRow.findAll('td').at(1).text()).toBe('列表项目-item-1')
    })
  })
})
