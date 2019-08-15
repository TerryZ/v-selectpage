<br><br>

<p align="center"><img src="https://terryz.github.io/image/v-selectpage/v-selectpage-multiple.png" alt="v-selectpage" ></p>

<p align="center">
  <a href="https://circleci.com/gh/TerryZ/v-selectpage"><img src="https://circleci.com/gh/TerryZ/v-selectpage.svg?style=svg"></a>
  <a href="https://codecov.io/gh/TerryZ/v-selectpage"><img src="https://codecov.io/gh/TerryZ/v-selectpage/branch/master/graph/badge.svg" /></a>
  <a href="https://www.npmjs.com/package/v-selectpage"><img src="https://img.shields.io/npm/v/v-selectpage.svg"></a>
  <a href="https://mit-license.org/"><img src="https://img.shields.io/badge/license-MIT-brightgreen.svg"></a>
  <a href="https://www.npmjs.com/package/v-selectpage"><img src="https://img.shields.io/npm/dy/v-selectpage.svg"></a>
</p>

<br>

<h1 align="center">v-selectpage</h1>

A powerful selector for <strong>Vue2</strong>, list or table view of pagination, use tags for multiple selection, i18n and server side resources supports

## Demos and Documents
Explorer on

- [English site](https://terryz.github.io/vue/#/selectpage)
- [国内站点](https://terryz.gitee.io/vue/#/selectpage)

The jQuery version: [SelectPage](https://github.com/TerryZ/SelectPage)

## Features

- show content by pagination
- i18n support, provide Chinese, English, Japanese languages
- server side data source support
- tag form for multiple selection
- keyboard to quick navigate
- quick search for autocomplete
- list view and table view to show content
- custom row content render

## Browsers support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE9, IE10, IE11, Edge | Firefox 18+ | Chrome 49+ | Safari 10+ | Opera 36+ |

## Plugin preview

*single selection show by list view*

![single](https://terryz.github.io/image/v-selectpage/v-selectpage-single.png)

*multiple selection with tags show by list view*

![multiple](https://terryz.github.io/image/v-selectpage/v-selectpage-multiple.png)

*single selection show by table view*

![table](https://terryz.github.io/image/v-selectpage/v-selectpage-table.png)

## Installation

``` bash
npm i v-selectpage --save
```

Include and install plugin in your `main.js` file.

```js
import Vue from 'vue'
import vSelectPage from 'v-selectpage';
Vue.use(vSelectPage, { global config options });
```

<a href="https://nodei.co/npm/v-selectpage/"><img src="https://nodei.co/npm/v-selectpage.png"></a>


## Deploy on your component

```vue
<template>
  <v-selectpage :data="list" key-field="id" show-field="name" ></v-selectpage>
</template>

<script>
export default {
  data(){
    return {
      list: [
        {id:1 ,name:'Chicago Bulls',desc:'芝加哥公牛'},
        {id:2 ,name:'Cleveland Cavaliers',desc:'克里夫兰骑士'},
        {...}
      ]
    }
  }
}
</script>
```

## Dependenics

- [v-dropdown](https://github.com/TerryZ/v-dropdown) - The dropdown container layer

## Vue plugin series

| Plugin | Status | Description |
| :---------------- | :-- | :-- |
| [v-page](https://github.com/TerryZ/v-page) | [![npm version](https://img.shields.io/npm/v/v-page.svg)](https://www.npmjs.com/package/v-page) | A simple pagination bar, including length Menu, i18n support |
| [v-dialogs](https://github.com/TerryZ/v-dialogs) | [![npm version](https://img.shields.io/npm/v/v-dialogs.svg)](https://www.npmjs.com/package/v-dialogs) | A simple and powerful dialog, including Modal, Alert, Mask and Toast modes |
| [v-tablegrid](https://github.com/TerryZ/v-tablegrid) | [![npm version](https://img.shields.io/npm/v/v-tablegrid.svg)](https://www.npmjs.com/package/v-tablegrid) | A simpler to use and practical datatable |
| [v-uploader](https://github.com/TerryZ/v-uploader) | [![npm version](https://img.shields.io/npm/v/v-uploader.svg)](https://www.npmjs.com/package/v-uploader) | A Vue2 plugin to make files upload simple and easier, <br>you can drag files or select file in dialog to upload |
| [v-ztree](https://github.com/TerryZ/v-ztree) | [![npm version](https://img.shields.io/npm/v/v-ztree.svg)](https://www.npmjs.com/package/v-ztree) | A simple tree for Vue2, support single or multiple(check) select tree, <br>and support server side data |
| [v-gallery](https://github.com/TerryZ/v-gallery) | [![npm version](https://img.shields.io/npm/v/v-gallery.svg)](https://www.npmjs.com/package/v-gallery) | A Vue2 plugin make browsing images in gallery |
| [v-region](https://github.com/TerryZ/v-region) | [![npm version](https://img.shields.io/npm/v/v-region.svg)](https://www.npmjs.com/package/v-region) | A simple region selector, provide Chinese administrative division data |
| [v-selectpage](https://github.com/TerryZ/v-selectpage) | [![npm version](https://img.shields.io/npm/v/v-selectpage.svg)](https://www.npmjs.com/package/v-selectpage) | A powerful selector for Vue2, list or table view of pagination, <br>use tags for multiple selection, i18n and server side resources supports |
| [v-suggest](https://github.com/TerryZ/v-suggest) | [![npm version](https://img.shields.io/npm/v/v-suggest.svg)](https://www.npmjs.com/package/v-suggest) | A Vue2 plugin for input suggestions by autocomplete |
| [v-playback](https://github.com/TerryZ/v-playback) | [![npm version](https://img.shields.io/npm/v/v-playback.svg)](https://www.npmjs.com/package/v-playback) | A Vue2 plugin to make video play easier |
| [v-selectmenu](https://github.com/TerryZ/v-selectmenu) | [![npm version](https://img.shields.io/npm/v/v-selectmenu.svg)](https://www.npmjs.com/package/v-selectmenu) | A simple, easier and highly customized menu solution |
