import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
// import { nextTick } from 'vue'
// import list from './data/nba-teams'
import { SelectPageListCore } from '@/index'
import { useSelectPageHandle } from '../../examples/handles'

describe('v-selectpage SelectPageListCore 列表模式核心模块', () => {
  describe('默认参数场景', () => {
    const wrapper = mount(SelectPageListCore, {
      props: {
        fetchData (data, callback) {
          console.log(data)
        }
      }
    })
    it('初始加载列表数据请求参数应为: { search: "", pageNumber: 1, pageSize: 10 }', () => {
      const { dataHandle } = useSelectPageHandle()

      const [data, callback] = wrapper.emitted()['fetch-data'][0]

      const result = dataHandle(data)
      callback(result.list, result.count)

      expect(data.search).toBe('')
      expect(data.pageNumber).toBe(1)
      expect(data.pageSize).toBe(10)
    })
    it('列表中应有 10 个项目', () => {
      expect(wrapper.findAll('.sp-list-item')).toHaveLength(10)
    })
  })
})
