const LEFT = 37
const UP = 38
const RIGHT = 39
const DOWN = 40
const TAB = 9
const ENTER = 13
const ESCAPE = 27

export default {
  methods: {
    showChange (val) {
      this.show = val
      if (val) {
        this.inputFocus()
      } else {
        this.highlight = -1
      }
    },
    /**
     * remove all selected item
     */
    remove (index) {
      let removed = []
      if (typeof index !== 'number') {
        removed = this.picked.slice()
        this.picked = []
      } else {
        removed = [this.picked[index]]
        this.picked.splice(index, 1)
      }
      this.$emit('removed', removed)
    },
    /**
     * pick/remove current page items
     * @param check
     * true: pick
     * false: remove
     */
    pickPage (check = true) {
      const toDo = []
      if (check) { // picked current page items
        if (this.maxSelectLimit && this.picked.length >= this.maxSelectLimit) return
        let available = 0

        /**
         * the number of current page available items
         */
        if (check && this.maxSelectLimit) {
          const outOfPage = this.picked.filter(val => {
            return this.list.findIndex(value => val[this.keyField] === value[this.keyField]) === -1
          }).length
          available = this.maxSelectLimit - outOfPage
        }
        this.list.forEach(row => {
          if (!this.inPicked(row) && (!this.maxSelectLimit || (this.maxSelectLimit && toDo.length < available))) {
            toDo.push(row)
          }
        })
        this.picked.push(...toDo)
      } else { // unpicked current page items
        if (!this.picked.length) return
        this.list.forEach(row => {
          if (this.inPicked(row)) {
            toDo.push(this.inPickedIndex(row))
          }
        })
        this.$emit('removed', this.picked.filter((val, index) => toDo.includes(index)))
        this.picked = this.picked.filter((val, index) => !toDo.includes(index))
      }

      this.inputFocus()
    },
    getResults () {
      if (!this.picked.length || this.multiple) return
      return this.renderCell(this.picked[0])
    },
    renderCell (row) {
      if (!row || !Object.keys(row).length) return ''
      switch (typeof this.showField) {
        case 'string': return row[this.showField]
        case 'function': return this.showField(row)
      }
    },
    processKey (e) {
      if (![LEFT, UP, RIGHT, DOWN, ESCAPE, ENTER, TAB].includes(e.keyCode)) this.populate()
    },
    processControl (e) {
      if ([LEFT, UP, RIGHT, DOWN, ESCAPE, ENTER, TAB].includes(e.keyCode)) {
        switch (e.keyCode) {
          case LEFT:
            if (this.pagination) this.$refs.page.switchPage('previous')
            break
          case UP:
            this.previous()
            break
          case RIGHT:
            if (this.pagination) this.$refs.page.switchPage('next')
            break
          case DOWN:
            this.next()
            break
          case TAB:
          case ENTER:
            if (this.highlight !== -1) this.selectItem(this.list[this.highlight])
            break
          case ESCAPE:
            this.close()
            break
        }
      }
    },
    previous () {
      if (this.highlight > 0 && this.list.length) {
        const previous = this.list.filter((val, idx) => idx < this.highlight && !this.inPicked(val))
        if (previous.length) {
          const preIndex = this.list.findIndex(val => Object.is(val, previous[previous.length - 1]))
          if (preIndex !== -1) this.highlight = preIndex
        }
      }
    },
    next () {
      if (this.highlight < (this.list.length - 1)) {
        const nextIndex = this.list.findIndex((val, idx) => (idx > this.highlight) && !this.inPicked(val))
        if (nextIndex !== -1) this.highlight = nextIndex
      }
    },
    selectItem (row) {
      if (this.inPicked(row)) return
      // multiple selection by tag form
      if (this.multiple) {
        if ((this.maxSelectLimit && (this.picked.length < this.maxSelectLimit)) || !this.maxSelectLimit) {
          this.picked.push(row)
        } else {
          this.message = this.i18n.max_selected.replace('max_selected_limit', `<b>${this.maxSelectLimit}</b>`)
          setTimeout(() => {
            this.message = ''
          }, 3000)
        }
        this.inputFocus()
      } else {
        this.close()
        this.picked = [row]
      }
      this.highlight = -1
    },
    sortList () {
      if (this.data && Array.isArray(this.data) && this.sort) {
        const sortArr = this.sort.split(' '); const sort = {}
        if (sortArr.length === 2) {
          sort.field = sortArr[0]
          sort.order = sortArr[1]
          this.sortedList = this.data.slice().sort((a, b) => {
            const valA = a[sort.field]
            const valB = b[sort.field]; const order = sort.order ? sort.order.toLowerCase() : 'asc'
            if (order === 'asc') {
              return typeof valA === 'number' ? valA - valB : String(valA).localeCompare(String(valB))
            } else if (order === 'desc') {
              return typeof valA === 'number' ? valB - valA : String(valB).localeCompare(String(valA))
            }
          })
        }
      }
    },
    populate () {
      if (this.data) {
        if (this.search && this.search !== this.lastSearch) this.pageNumber = 1
        if (Array.isArray(this.data)) {
          let list = this.sortedList ? this.sortedList.slice() : this.data.slice()
          /**
           * search content filter
           */
          if (this.search) {
            list = list.filter(val => new RegExp(this.search.toLowerCase()).test(val[this.searchColumn].toLowerCase()))
          }
          this.totalRows = list.length

          if (this.pagination) {
            const start = (this.pageNumber - 1) * this.pageSize
            const end = start + this.pageSize - 1
            this.list = list.filter((val, index) => index >= start && index <= end)
          } else {
            this.list = list
          }
        } else if (typeof this.data === 'string') {
          this.remote()
        }

        this.lastSearch = this.search
        this.highlight = -1
      }
      this.inputFocus()
    },
    /**
     * load remote data
     * @param initPicked[boolean]
     * true: load selected item info
     * false: load data list
     */
    remote (initPicked = false) {
      if (typeof this.data === 'string' && this.dataLoad && typeof this.dataLoad === 'function') {
        const queryParams = this.params && Object.keys(this.params).length
          ? JSON.parse(JSON.stringify(this.params)) : {}
        queryParams.pageSize = this.pageSize
        queryParams.pageNumber = this.pageNumber
        if (this.sort) queryParams.orderBy = this.sort
        if (initPicked && this.value) {
          queryParams.searchKey = this.keyField
          queryParams.searchValue = this.value
        }
        if (this.search) {
          // this.searchField ? this.searchField : this.showField;
          if (!this.searchField && typeof this.showField === 'function') {
            // eslint-disable-next-line no-console
            console.error('Your "showField" was a function, in server side mode, your need specified "searchField" to search content.')
          } else {
            const field = this.searchField || this.showField
            queryParams[field] = this.search
          }
        }
        this.dataLoad(this, this.data, queryParams).then(resp => {
          if (resp) {
            if (!this.resultFormat || typeof this.resultFormat !== 'function') {
              // eslint-disable-next-line no-console
              console.error('In server side mode, you need specified "result-format" option(function type) to format server side response result.')
            } else {
              const tmpObj = this.resultFormat(resp)
              if (tmpObj && Object.keys(tmpObj).length) {
                if (!initPicked) { // load new page data list
                  this.list = tmpObj.list
                  this.totalRows = tmpObj.totalRow
                } else this.picked = tmpObj.list// the selected item info
              }
            }
          }
        }).catch(resp => {
          this.list = []
          this.totalRows = 0
        })
      }
    },
    pageChange (pNum) {
      this.pageNumber = pNum
      this.populate()
    },
    initSelection () {
      if (this.value) {
        if (Array.isArray(this.data)) {
          const arr = this.value.split(',')
          if (arr && arr.length) {
            const matchRows = this.data.filter(val => arr.includes(String(val[this.keyField])))
            if (matchRows.length) this.picked = this.multiple ? matchRows : [matchRows[0]]
          }
          this.findSelectionPage()
        } else if (typeof this.data === 'string') {
          this.remote(true)
        }
      }
      this.populate()
    },
    findSelectionPage () {
      if (!this.multiple && this.pagination) {
        const list = this.sortedList ? this.sortedList.slice() : this.data.slice()
        const index = list.findIndex(val => String(val[this.keyField]) === this.value)
        if (index >= 0) {
          this.pageNumber = Math.ceil((index + 1) / this.pageSize)
        }
      }
    }
  }
}
