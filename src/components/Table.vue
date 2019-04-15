<template>
    <table class="sp-table">
        <thead>
        <tr :class="{'sp-rtl': rtl}">
            <th :key="index" v-for="(col,index) in tbColumns">{{col.title}}</th>
        </tr>
        </thead>
        <tbody @mouseleave="highlight(-1)">
        <tr :key="index" v-for="(row,index) in list" :class="rowClass(row, index)"
            @click="click(row)" @mouseenter="highlight(!picked.includes(row)?index:-1)" >
            <td :key="idx" v-for="(col,idx) in tbColumns" v-html="renderColumn(row, col)"></td>
        </tr>
        </tbody>
    </table>
</template>

<script>
    import view from '../mixins/view';
    export default {
        name: "SelectPageTable",
        mixins: [view],
        props: {
            tbColumns:  Array
        },
        methods: {
          renderColumn(row, col) {
              if(typeof col.data === 'string') return row[col.data];
              else if(typeof col.data === 'function') return col.data(row);
          }
        }
    }
</script>
