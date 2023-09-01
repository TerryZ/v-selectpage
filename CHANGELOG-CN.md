# Changelog

英文 changelog 内容请访问 [CHANGELOG](CHANGELOG.md)

## [3.0.0-beta.1](https://github.com/TerryZ/v-selectpage) (2023-09-01)

### 新特性

- 使用 vue3 **composition api** 重构 `v-selectpage`
- 工具链从 `webpack` 更换为 `vite`
- 单元测试库从 `mocha` 更换为 `vitest`
- 新增 `SelectPageListCore` 与 `SelectPageTableCore` 核心模块可独立使用
- 下拉列表形态模块 `SelectPageList` 与 `SelectPageTable` 模块增加 `visible-change` 事件，响应下拉层打开/关闭状态
- 数据加载方式修改为通过 `fetch-data` 与 `fetch-selected-data` 事件响应的渠道，增加数据处理灵活性
- 多语言新增 `繁体中文`、`俄罗斯文`、`土耳其文` 与 `荷兰文`
- 选中项目变更事件从 `values` 修改为 `selection-change`
- 新增 `remove` 事件响应项目移除操作
