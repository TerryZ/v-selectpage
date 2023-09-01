# Changelog

Please refer to [CHANGELOG-CN](CHANGELOG-CN.md) for Chinese changelog

## [3.0.0-beta.1](https://github.com/TerryZ/v-selectpage) (2023-09-01)

### Features

- Refactored `v-selectpage` using the Vue 3 **Composition API**
- Transitioned the toolchain from `webpack` to `vite`
- Replaced the unit testing library from `mocha` with `vitest`
- Added `SelectPageListCore` and `SelectPageTableCore` core modules that can be used independently
- Introduced a `visible-change` event in the dropdown list modules `SelectPageList` and `SelectPageTable` to respond to the opening/closing of the dropdown layer
- Modified the data loading approach to respond through the `fetch-data` and `fetch-selected-data` events, enhancing data processing flexibility
- Added `Traditional Chinese`, `Russian`, `Turkish`, and `Dutch` languages
- Changed the event for item selection change from `values` to `selection-change`
- Added a `remove` event to respond to item removal operations
