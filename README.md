<a href="https://terryz.github.io/vue/#/selectpage" target="_blank">
  <img src="https://terryz.github.io/image/v-selectpage/v3/selectpage-list-multiple.png" alt="SelectPage" align="right" valign="top" >
</a>

# [v-selectpage](https://terryz.github.io/vue/#/selectpage)

[![CircleCI](https://dl.circleci.com/status-badge/img/gh/TerryZ/v-selectpage/tree/master.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/TerryZ/v-selectpage/tree/master) [![code coverage](https://codecov.io/gh/TerryZ/v-selectpage/branch/master/graph/badge.svg)](https://codecov.io/gh/TerryZ/v-selectpage) [![npm version](https://img.shields.io/npm/v/v-selectpage.svg)](https://www.npmjs.com/package/v-selectpage)

SelectPage for Vue3, a select items components provides the list of items with pagination

[![Financial Contributors on Open Collective](https://opencollective.com/v-selectpage/all/badge.svg?label=financial+contributors)](https://opencollective.com/v-selectpage)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![npm download](https://img.shields.io/npm/dy/v-selectpage.svg)](https://www.npmjs.com/package/v-selectpage)

If you are using vue `2.x` version, please use [v-selectpage 2.x](https://github.com/TerryZ/v-selectpage/tree/dev-vue-2) version instead

<br><br><br><br><br><br><br><br>

## Examples and Documentation

Documentation and examples please visit below sites

- [github-pages](https://terryz.github.io/docs-vue3/selectpage/)

The jQuery version: [SelectPage](https://github.com/TerryZ/SelectPage)

## Features

- Display contents with pagination
- I18n support
- Select single / multiple options
- Tags form for multiple selection
- Keyboard navigation
- Searchable
- Provide display forms such as list view and table view
- Customization of row / cell content rendering
- Core module that can be used independently

I18n support languages

<!-- Chinese Simplified • English • Japanese • Arabic • Spanish • German • Romanian • French • Portuguese-Brazil • Polish • Dutch • Chinese Traditional • Russian • Turkish -->

- Chinese Simplified
- English
- Japanese
- Arabic
- Spanish
- German
- Romanian
- French
- Portuguese-Brazil
- Polish
- Dutch
- Chinese Traditional
- Russian
- Turkish

## Installation

[![https://nodei.co/npm/v-selectpage.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/v-selectpage.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/v-selectpage)

Install `v-selectpage` to your project

``` bash
# npm
npm i v-selectpage
# yarn
yarn add v-selectpage
# pnpm
pnpm add v-selectpage
```

## Usage

Quick start example

```vue
<template>
  <SelectPageList
    key-prop="id"
    label-prop="name"
    @fetch-data="fetchData"
  />
</template>

<script setup lang="ts">
import { SelectPageList } from 'v-selectpage'
import type { PageParameters, FetchDataCallback } from 'v-selectpage'

function fetchData (data: PageParameters, callback: FetchDataCallback) {
  // pagination information and search keyword
  const { search, pageNumber, pageSize } = data

  // request parameters
  const parameters = {
    search,
    pageNumber,
    pageSize,
    ...
  }

  // fetch data list with pagination state
  doDataRequest(parameters)
    .then(resp => {
      /**
       * Return data format for example
       * {
       *   list: object[], // current page data list
       *   total: number // result count
       * }
       */
      callback(resp.list, resp.total)
    })
    .catch(() => {
      // clear the data list if necessary when request fails
      callback([], 0)
    })
}
</script>
```

Set default selected items

```vue
<template>
  <SelectPageList
    language="zh-chs"
    v-model="selected"
    :multiple="true"
    @fetch-data="fetchData"
    @fetch-selected-data="fetchSelectedData"
  />
</template>

<script setup>
import { ref } from 'vue'
import { SelectPageList } from 'v-selectpage'
import type {
  SelectPageKey, FetchSelectedDataCallback,
  PageParameters, FetchDataCallback
} from 'v-selectpage'

const selected = ref<SelectPageKey[]>([2, 4, 7])

// fetch current page data
function fetchData (data: PageParameters, callback: FetchDataCallback) {
  ...
}
// fetch selected items data
function fetchSelectedData (keys: SelectPageKey[], callback: FetchSelectedDataCallback) {
  // get data models by keys
  doDataRequest({ keys }).then(resp => {
    callback(resp)
  })
}
</script>
```

## Plugin preview

List view for Single selection

![single](https://terryz.github.io/image/v-selectpage/v3/selectpage-list-single.png)

List view for multiple selection with tags form

![multiple](https://terryz.github.io/image/v-selectpage/v3/selectpage-list-multiple.png)

Table view for single selection

![table](https://terryz.github.io/image/v-selectpage/v3/selectpage-table-single.png)

## Dependencies

- [v-dropdown](https://github.com/TerryZ/v-dropdown) - The dropdown container

## License

[![license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://mit-license.org/)
