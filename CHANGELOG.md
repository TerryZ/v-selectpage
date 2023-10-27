# Changelog

Please refer to [CHANGELOG-CN](CHANGELOG-CN.md) for Chinese changelog

## [3.0.1](https://github.com/TerryZ/v-selectpage/compare/v3.0.0...v3.0.1) (2023-10-27)

### Bug Fixes

- Selected items will not be cleared when `v-model` set value to an empty array [#68](https://github.com/TerryZ/v-selectpage/issues/68)

### Features

- Added `removeItem` and `removeAll` methods to `SelectPageList` , `SelectPageTable` components

## [3.0.0](https://github.com/TerryZ/v-selectpage/compare/v3.0.0-beta.2...v3.0.0) (2023-10-09)

### Bug Fixes

- Update `.d.ts` document

## [3.0.0-beta.2](https://github.com/TerryZ/v-selectpage/compare/v3.0.0-beta.1...v3.0.0-beta.2) (2023-10-05)

### Features

- Upgrade `v-dropdown` to `v3.0.0`
- Added `customTriggerClass` prop, used to add custom class to trigger objects
- Added `customContainerClass` prop for adding custom class to dropdown container

### Bug Fixes

- Update `.d.ts` document

## [3.0.0-beta.1](https://github.com/TerryZ/v-selectpage) (2023-09-01)

### Features

- The `v-selectpage` component has been refactored using Vue 3 **composition API**
- The build tool has been switched from `Webpack` to `Vite`
- The unit testing library has been switched from `Mocha` to `Vitest`
- Two new core modules, `SelectPageListCore` and `SelectPageTableCore`, have been added. These modules can be used independently
- The `visible-change` event has been added to the dropdown list modules `SelectPageList` and `SelectPageTable`. This event is fired when the dropdown layer is opened or closed
- Data loading has been changed to use the `fetch-data` and `fetch-selected-data` events to improve flexibility in data processing
- Four new languages have been added: `Traditional Chinese`, `Russian`, `Turkish`, and `Dutch`
- The event for changing the selected items has been changed from `values` to `selection-change`
- A new `remove` event has been added to respond to item removal operations
