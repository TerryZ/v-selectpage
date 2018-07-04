<br><br>

<h3 align="center">v-selectpage</h3>

<br>

<p align="center">
  <a href="https://www.npmjs.com/package/v-selectpage"><img src="https://img.shields.io/npm/v/v-selectpage.svg"></a>
  <a href="https://mit-license.org/"><img src="https://img.shields.io/badge/license-MIT-brightgreen.svg"></a>
  <a href="https://www.npmjs.com/package/v-selectpage"><img src="https://img.shields.io/npm/dy/v-selectpage.svg"></a>
</p>

<p align="center"><img src="https://terryz.github.io/image/v-selectpage/v-selectpage-multiple.png" alt="v-selectpage" ></p>

<p align="center">
  A powerful selector for <strong>Vue2</strong>, list or table view of pagination, <br>
  use tags for multiple selection, i18n and server side resources supports
</p>

<p align="center">
  <a href="https://nodei.co/npm/v-selectpage/"><img src="https://nodei.co/npm/v-selectpage.png"></a>
</p>

<br><br><br><br><br>



## Demo、Document、Changelog
Explorer on

- [English site](https://terryz.github.io/vue/#/selectpage)
- [国内站点](https://terryz.gitee.io/vue/#/selectpage)

the jQuery version: [SelectPage](https://github.com/TerryZ/SelectPage)

**If you think this project is helpful, please star it.**

<br><br>

## Features

- show content by pagination
- i18n support, provide Chinese, English, Japanese languages
- server side data source support
- tag form for multiple selection
- keyboard to quick navigate
- quick search for autocomplete
- list view and table view to show content
- custom row content render

<br><br>

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

<br><br>

## Plugin preview

*single selection show by list view*

![single](https://terryz.github.io/image/v-selectpage/v-selectpage-single.png)

*multiple selection with tags show by list view*

![multiple](https://terryz.github.io/image/v-selectpage/v-selectpage-multiple.png)

*single selection show by table view*

![table](https://terryz.github.io/image/v-selectpage/v-selectpage-table.png)

<br><br>

## Install

``` bash
npm install v-selectpage --save
```

Include plugin in your `main.js` file.

```js
import Vue from 'vue'
import vSelectPage from 'v-selectpage';
Vue.use(vSelectPage);
```

## Deploy on your component

template code

```html
<template>
    <v-selectpage :data="list" key-field="id" show-field="name" class="form-control"></v-selectpage>
</template>
```

script code

```js
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
};
```
<br><br>
