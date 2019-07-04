export default {
	methods:{
		inPickedIndex(row){
			if(!row || !Object.keys(row).length || !this.picked.length) return -1;
			return this.picked.findIndex(val=>val[this.keyField] === row[this.keyField]);
		},
		inPicked(row){
			return this.inPickedIndex(row) !== -1;
		},
		adjust(){
			this.$refs.drop.adjust();
		},
		close(){
			if(this.show) this.$refs.drop.visible();
		},
		inputFocus(){
			if(!this.show) return;
			this.$nextTick(()=>{
				/**
				 * fixed the page will scroll to top when open drop down list and set input focus
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
		isChrome(){
			return navigator.vendor !== undefined && navigator.vendor.indexOf("Google") !== -1;
		},
		isEdge(){
			return navigator.userAgent.indexOf("Edge") >= 0;
		}
	}
}