<a href="https://terryz.github.io/vue/#/selectpage" target="_blank">
  <img src="https://terryz.github.io/image/v-selectpage/v-selectpage-multiple.png" alt="SelectPage" align="right" valign="top" >
</a>

<!--
## Contributors

### Code Contributors

This project exists thanks to all the people who contribute. [[Contribute](CONTRIBUTING.md)].
<a href="https://github.com/TerryZ/v-selectpage/graphs/contributors"><img src="https://opencollective.com/v-selectpage/contributors.svg?width=890&button=false" /></a>

### Financial Contributors

Become a financial contributor and help us sustain our community. [[Contribute](https://opencollective.com/v-selectpage/contribute)]

#### Individuals

<a href="https://opencollective.com/v-selectpage"><img src="https://opencollective.com/v-selectpage/individuals.svg?width=890"></a>

#### Organizations

Support this project with your organization. Your logo will show up here with a link to your website. [[Contribute](https://opencollective.com/v-selectpage/contribute)]

<a href="https://opencollective.com/v-selectpage/organization/0/website"><img src="https://opencollective.com/v-selectpage/organization/0/avatar.svg"></a>
<a href="https://opencollective.com/v-selectpage/organization/1/website"><img src="https://opencollective.com/v-selectpage/organization/1/avatar.svg"></a>
<a href="https://opencollective.com/v-selectpage/organization/2/website"><img src="https://opencollective.com/v-selectpage/organization/2/avatar.svg"></a>
<a href="https://opencollective.com/v-selectpage/organization/3/website"><img src="https://opencollective.com/v-selectpage/organization/3/avatar.svg"></a>
<a href="https://opencollective.com/v-selectpage/organization/4/website"><img src="https://opencollective.com/v-selectpage/organization/4/avatar.svg"></a>
<a href="https://opencollective.com/v-selectpage/organization/5/website"><img src="https://opencollective.com/v-selectpage/organization/5/avatar.svg"></a>
<a href="https://opencollective.com/v-selectpage/organization/6/website"><img src="https://opencollective.com/v-selectpage/organization/6/avatar.svg"></a>
<a href="https://opencollective.com/v-selectpage/organization/7/website"><img src="https://opencollective.com/v-selectpage/organization/7/avatar.svg"></a>
<a href="https://opencollective.com/v-selectpage/organization/8/website"><img src="https://opencollective.com/v-selectpage/organization/8/avatar.svg"></a>
<a href="https://opencollective.com/v-selectpage/organization/9/website"><img src="https://opencollective.com/v-selectpage/organization/9/avatar.svg"></a>

# [v-selectpage](https://terryz.github.io/vue/#/selectpage) &middot; [![Financial Contributors on Open Collective](https://opencollective.com/v-selectpage/all/badge.svg?label=financial+contributors)](https://opencollective.com/v-selectpage) [![circle ci](https://circleci.com/gh/TerryZ/v-selectpage.svg?style=svg)](https://circleci.com/gh/TerryZ/v-selectpage) [![code coverage](https://codecov.io/gh/TerryZ/v-selectpage/branch/master/graph/badge.svg)](https://codecov.io/gh/TerryZ/v-selectpage) [![npm version](https://img.shields.io/npm/v/v-selectpage.svg)](https://www.npmjs.com/package/v-selectpage) [![npm download](https://img.shields.io/npm/dy/v-selectpage.svg)](https://www.npmjs.com/package/v-selectpage) [![license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://mit-license.org/) [![language](https://img.shields.io/badge/language-Vue2-brightgreen.svg)](https://www.npmjs.com/package/v-selectpage)
-->

# [v-selectpage](https://terryz.github.io/vue/#/selectpage)

[![circle ci](https://circleci.com/gh/TerryZ/v-selectpage.svg?style=svg)](https://circleci.com/gh/TerryZ/v-selectpage) [![code coverage](https://codecov.io/gh/TerryZ/v-selectpage/branch/master/graph/badge.svg)](https://codecov.io/gh/TerryZ/v-selectpage) [![npm version](https://img.shields.io/npm/v/v-selectpage.svg)](https://www.npmjs.com/package/v-selectpage)

A powerful selection plugin for **Vue3**, list or table view of pagination, use tags form for multiple selection, i18n and server side resources supports

[![Financial Contributors on Open Collective](https://opencollective.com/v-selectpage/all/badge.svg?label=financial+contributors)](https://opencollective.com/v-selectpage)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![npm download](https://img.shields.io/npm/dy/v-selectpage.svg)](https://www.npmjs.com/package/v-selectpage)
[![license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://mit-license.org/)

<br><br><br><br><br><br><br><br>

## Examples and Documentation

Live Examples on [CodePen](https://codepen.io/terry05/pen/wXNKOK), more examples and documentation please visit below sites

- [English site](https://terryz.github.io/vue/#/selectpage)
- [国内站点](https://terryz.gitee.io/vue/#/selectpage)

The jQuery version: [SelectPage](https://github.com/TerryZ/SelectPage)

## Features

- Display contents with pagination
- I18n support, provided languages:
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
- Tag form for multiple selection
- Keyboard navigation
- quick search for autocomplete
- Provides list view and table view
- Customization of row/cell content rendering
- Core module that can be used independently

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

```vue
<template>
  <SelectPageList
    key-prop="id"
    label-prop="name"
    @fetch-data="fetchData"
  />
</template>

<script setup>
import { ref } from 'vue'
import { SelectPageList } from 'v-selectpage'

const list = [
  { id: 1 ,name: 'Chicago Bulls',desc:'芝加哥公牛' },
  { id: 2 ,name: 'Cleveland Cavaliers',desc:'克里夫兰骑士' },
  { ... }
]

function fetchData (data, callback) {
  // pagination information and search keyword
  const { search, pageNumber, pageSize } = data

  // fetch data list with pagination state
  doDataRequest(data)
    .then(resp => {
      callback(resp)
    })
    .catch(() => {
      callback([]) // clear the data list if necessary when request fails
    })
}
</script>
```

## Plugin preview

List view for Single selection

![single](https://terryz.github.io/image/v-selectpage/v-selectpage-single.png)

List view for multiple selection with tags form

![multiple](https://terryz.github.io/image/v-selectpage/v-selectpage-multiple.png)

Table view for single selection

![table](https://terryz.github.io/image/v-selectpage/v-selectpage-table.png)

## Contributors

### Code Contributors

This project exists thanks to all the people who contribute. [[Contribute](CONTRIBUTING.md)].
<a href="https://github.com/TerryZ/v-selectpage/graphs/contributors"><img src="https://opencollective.com/v-selectpage/contributors.svg?width=890&button=false" /></a>

### Financial Contributors

Become a financial contributor and help us sustain our community. [[Contribute](https://opencollective.com/v-selectpage/contribute)]

#### Individuals

<a href="https://opencollective.com/v-selectpage"><img src="https://opencollective.com/v-selectpage/individuals.svg?width=890"></a>

#### Organizations

Support this project with your organization. Your logo will show up here with a link to your website. [[Contribute](https://opencollective.com/v-selectpage/contribute)]

<a href="https://opencollective.com/v-selectpage/organization/0/website"><img src="https://opencollective.com/v-selectpage/organization/0/avatar.svg"></a>
<a href="https://opencollective.com/v-selectpage/organization/1/website"><img src="https://opencollective.com/v-selectpage/organization/1/avatar.svg"></a>
<a href="https://opencollective.com/v-selectpage/organization/2/website"><img src="https://opencollective.com/v-selectpage/organization/2/avatar.svg"></a>
<a href="https://opencollective.com/v-selectpage/organization/3/website"><img src="https://opencollective.com/v-selectpage/organization/3/avatar.svg"></a>
<a href="https://opencollective.com/v-selectpage/organization/4/website"><img src="https://opencollective.com/v-selectpage/organization/4/avatar.svg"></a>
<a href="https://opencollective.com/v-selectpage/organization/5/website"><img src="https://opencollective.com/v-selectpage/organization/5/avatar.svg"></a>
<a href="https://opencollective.com/v-selectpage/organization/6/website"><img src="https://opencollective.com/v-selectpage/organization/6/avatar.svg"></a>
<a href="https://opencollective.com/v-selectpage/organization/7/website"><img src="https://opencollective.com/v-selectpage/organization/7/avatar.svg"></a>
<a href="https://opencollective.com/v-selectpage/organization/8/website"><img src="https://opencollective.com/v-selectpage/organization/8/avatar.svg"></a>
<a href="https://opencollective.com/v-selectpage/organization/9/website"><img src="https://opencollective.com/v-selectpage/organization/9/avatar.svg"></a>

## Dependencies

- [v-dropdown](https://github.com/TerryZ/v-dropdown) - The dropdown container
