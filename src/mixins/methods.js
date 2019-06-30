const LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40, TAB = 9, ENTER = 13, ESCAPE = 27;

export default {
    methods: {
		close(){
			if(this.show) this.$refs.drop.visible();
		},
        showChange(val){
            this.show = val;
            if(val){
                this.inputFocus();
            }else{
                this.highlight = -1;
            }
        },
        inputFocus(){
			if(!this.show) return;
            this.$nextTick(()=>{
				/**
				 * fix open drop down list and set input focus, the page will scroll to top
				 * that.$refs.search.focus({preventScroll:true}); only work on Chrome and EDGE
				 */
                if(this.isChrome() || this.isEdge()) this.$refs.search.focus({preventScroll:true});
                else{
                    const x = window.pageXOffset, y = window.pageYOffset;
                    this.$refs.search.focus();
                    if(window.pageYOffset !== y) setTimeout(()=>{ window.scrollTo(x, y); }, 0);
                }
            });
        },
        /**
         * remove all selected item
         */
        remove(index){
            let removed = [];
            if(typeof index !== 'number'){
                removed = this.picked.concat();
                this.picked = [];
            }else{
                removed = [this.picked[index]];
                this.picked.splice(index, 1);
            }
            this.$emit('removed', removed);
        },
        /**
         * pick page items
         * @param check
         * true: pick
         * false: remove
         */
        pickPage(check){
            const removed = [];
            this.list.forEach(row=>{
                if(check){//picked current page items
                    if(!this.inPicked(row) && (!this.maxSelectLimit || (this.maxSelectLimit && this.picked.length < this.maxSelectLimit))){
                        this.picked.push(row);
                    }
                }else{//unpicked current page items
                    if(this.inPicked(row)){
                        const idx = this.inPickedIndex(row);
                        if(idx !== -1) {
                            removed.push(this.picked[idx]);
                            this.picked.splice(idx, 1);
                        }
                    }
                }
            });

            if(!check) this.$emit('removed', removed);
			this.inputFocus();
        },
        adjust(){
            this.$refs.drop.adjust();
        },
        getResults(){
            if(!this.picked.length || this.multiple) return;
            return this.renderCell(this.picked[0]);
        },
        renderCell(row){
            if(row && Object.keys(row).length){
                switch (typeof this.showField){
                    case 'string': return row[this.showField];
                    case 'function': return this.showField(row);
                }
            }
        },
        processKey(e){
            if (![LEFT, UP, RIGHT, DOWN, ESCAPE, ENTER, TAB].includes(e.keyCode)) this.populate();
        },
        processControl(e){
            if ([LEFT, UP, RIGHT, DOWN, ESCAPE, ENTER, TAB].includes(e.keyCode)) {
                switch (e.keyCode) {
                    case LEFT:
                        if(this.pagination) this.$refs.page.switchPage('previous');
                        break;
                    case UP:
                        this.previous();
                        break;
                    case RIGHT:
						if(this.pagination) this.$refs.page.switchPage('next');
                        break;
                    case DOWN:
                        this.next();
                        break;
                    case TAB:
                    case ENTER:
                        if(this.highlight !== -1) this.selectItem(this.list[this.highlight]);
                        break;
                    case ESCAPE:
                        this.close();
                        break;
                }
            }
        },
        previous(){
            if(this.highlight > 0 && this.list.length){
                const previous = this.list.filter((val, idx)=>idx < this.highlight && !this.inPicked(val));
                if(previous.length){
                    const preIndex = this.list.findIndex(val => Object.is(val, previous[previous.length-1]));
                    if(preIndex !== -1) this.highlight = preIndex;
                }
            }
        },
        next(){
            if(this.highlight < (this.list.length - 1)){
                const nextIndex = this.list.findIndex((val, idx) => (idx > this.highlight) && !this.inPicked(val));
                if(nextIndex !== -1) this.highlight = nextIndex;
            }
        },
        selectItem(row){
            if(this.inPicked(row)) return;
            // multiple selection by tag form
            if(this.multiple){
                if((this.maxSelectLimit && (this.picked.length < this.maxSelectLimit)) || !this.maxSelectLimit){
					this.picked.push(row);
				}else{
					this.message = this.i18n.max_selected.replace('max_selected_limit', `<b>${this.maxSelectLimit}</b>`);
					setTimeout(() => {
						this.message = '';
					}, 3000);
				}
				this.inputFocus();
            }else{
                this.close();
                this.picked = [row];
            }
            this.highlight = -1;
        },
        sortList(){
            if(this.data && Array.isArray(this.data) && this.sort){
                const sortArr = this.sort.split(' '), sort = {};
                if(sortArr.length === 2){
                    sort.field = sortArr[0];
                    sort.order = sortArr[1];
                    this.sortedList = this.data.concat().sort((a, b) => {
                        const valA = a[sort.field],
                            valB = b[sort.field], order = sort.order ? sort.order.toLowerCase() : 'asc';
                        if(order === 'asc'){
                            return typeof valA==='number'?valA-valB:String(valA).localeCompare(String(valB));
                        }else if(order === 'desc'){
                            return typeof valA==='number'?valB-valA:String(valB).localeCompare(String(valA));
                        }
                    });
                }
            }
        },
        populate(){
            if(this.data){
                if(this.search && this.search !== this.lastSearch) this.pageNumber = 1;
                if(Array.isArray(this.data)){
                    let list = this.sortedList?this.sortedList.concat():this.data.concat();
                    if(this.search){
                        list = list.filter(val => val[this.searchColumn].toLowerCase().includes(this.search.toLowerCase()));
                    }
                    this.totalRows = list.length;

                    if(this.pagination){
                        const start = (this.pageNumber - 1) * this.pageSize, end = start + this.pageSize -1;
                        this.list = list.filter((val,index)=>index >= start&&index <= end);
                    }else this.list = list;
                }else if(typeof this.data === 'string') this.remote(false);

                if(this.search) this.lastSearch = this.search;
                this.highlight = -1;
            }
            this.inputFocus();
        },
        /**
         * load remote data
         * @param init[boolean]
         * true: load selected item info
         * false: load data list
         */
        remote(init){
            if(typeof this.data === 'string' && this.dataLoad && typeof this.dataLoad === 'function'){
                const queryParams = this.params && Object.keys(this.params).length ?
                    JSON.parse(JSON.stringify(this.params)) : {};
                queryParams.pageSize = this.pageSize;
                queryParams.pageNumber = this.pageNumber;
                if(this.sort) queryParams.orderBy = this.sort;
                if(init && this.value){
                    queryParams.searchKey = this.keyField;
                    queryParams.searchValue = this.value;
                }
                if(this.search){
                    //this.searchField ? this.searchField : this.showField;
                    if(!this.searchField && typeof this.showField === 'function'){
                        // eslint-disable-next-line no-console
                        console.error('Your "showField" was a function, in server side mode, your need specified "searchField" to search content.');
                    }else{
                        const field = this.searchField || this.showField;
                        queryParams[field] = this.search;
                    }
                }
                this.dataLoad(this, this.data, queryParams).then(resp=>{
                    if(resp){
                        if(!this.resultFormat || typeof this.resultFormat !== 'function'){
                            // eslint-disable-next-line no-console
                            console.error('In server side mode, you need specified "result-format" option(function type) to format server side response result.');
                        }else{
                            const tmpObj = this.resultFormat(resp);
                            if(tmpObj && Object.keys(tmpObj).length){
                                if(!init){//load new page data list
                                    this.list = tmpObj.list;
                                    this.totalRows = tmpObj.totalRow;
                                }else this.picked = tmpObj.list;//the selected item info
                            }
                        }
                    }
                }).catch(resp => {
                    this.list = [];
                    this.totalRows = 0;
                });
            }
        },
        pageChange(pNum){
            this.pageNumber = pNum;
            this.populate();
        },
        initSelection(){
            if(this.value) {
                if(Array.isArray(this.data)){
                    const arr = this.value.split(',');
                    if(arr && arr.length){
                        const matchRows = this.data.filter(val => arr.includes(String(val[this.keyField])));
                        if(matchRows.length) this.picked = this.multiple ? matchRows : [matchRows[0]];
                    }
                    this.findSelectionPage();
                }else if(typeof this.data === 'string'){
                    this.remote(true);
                }
            }
            this.populate();
        },
        findSelectionPage(){
            if(!this.multiple && this.pagination){
                const list = this.sortedList?this.sortedList.concat():this.data.concat();
                const index = list.findIndex(val => String(val[this.keyField]) === this.value);
                if(index >= 0){
                    this.pageNumber = Math.ceil((index + 1) / this.pageSize);
                }
            }
        },
        inPickedIndex(row){
            if(!row || !Object.keys(row).length || !this.picked.length) return -1;
            return this.picked.findIndex(val=>val[this.keyField] === row[this.keyField]);
        },
        inPicked(row){
            return this.inPickedIndex(row) !== -1;
        },
        isChrome(){
            return navigator.vendor !== undefined && navigator.vendor.indexOf("Google") !== -1;
        },
        isEdge(){
            return navigator.userAgent.indexOf("Edge") >= 0;
        }
    }
};