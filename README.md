<br><br>

<h3 align="center">v-selectpage</h3>

<br><br>

<p align="center"><img src="https://terryz.github.io/image/v-selectpage/v-selectpage-multiple.png" alt="v-selectpage" ></p>

<p align="center">
  A powerful selector for <strong>Vue2</strong>, list or table view of pagination, <br>
  use tags for multiple selection, i18n and server side resources supports
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/v-selectpage"><img src="https://img.shields.io/npm/v/v-selectpage.svg"></a>
  <a href="https://mit-license.org/"><img src="https://img.shields.io/badge/license-MIT-brightgreen.svg"></a>
  <a href="https://www.npmjs.com/package/v-selectpage"><img src="https://img.shields.io/npm/dy/v-selectpage.svg"></a>
</p>
<br><br><br><br><br>

## Demo、Document、Changelog
Explorer on

- [English site](https://terryz.github.io/vue/#/selectpage)
- [国内站点](https://terryz.gitee.io/vue/#/selectpage)

**If you think this project is helpful, please star it.**

<br><br>

## Features

- show content by pagination
- i18n support, provide Chinese, English, Japanese languages
- server side data source support
- tag form for multiple selection
- keybord to quick navigate
- quick search for autocomplete
- list view and table view to show content
- custom row content render


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
