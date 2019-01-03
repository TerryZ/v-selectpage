export default {
    inject: ['keyField', 'showField', 'renderCell', 'rtl'],
    props: {
        list: Array,
        picked: Array,
        value: Number
    },
    methods: {
        click(row){
            this.$emit('select', row);
        },
		rowClass(row, index){
			return {
				'sp-over': this.value === index,
				'sp-selected': this.picked.findIndex(val => val[this.keyField] === row[this.keyField]) !== -1,
				'sp-rtl': this.rtl
			};
		},
        highlight(index){
            this.$emit('input', index);
        }
    }
};