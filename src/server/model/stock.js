module.exports = class extends think.Model {
	async addStockNum(nums) {
		let upNums = [],
			noNums = [],
			numKeys = Object.keys(nums);
		let hasNums = await this.model('stock_num').where({
			id: ["IN", numKeys]
		}).getField('id');
		numKeys.forEach(d => {
			if (!hasNums.includes(d)) {
				noNums.push(d);
			}
		})
		if (noNums.length > 0) {
			let addNum = []
			noNums.forEach(d => {
				let arr = d.split('-')
				let s = {
					group_id: arr[0],
					area_id: arr[1],
					bar_id: arr[2],
					goods_id: arr[3],
					stock_num: nums[d],
					id: d
				}
				addNum.push(s)
			})
		
			await this.model('stock_num').addMany(addNum, {
				ignore: true
			})
		}
		if (hasNums.length > 0) {
			let upNum = []
			hasNums.forEach(d => {
				upNum.push({
					id: d,
					stock_num: ['exp', `stock_num+${nums[d]}`]
				})
			})
			await this.model('stock_num').updateMany(upNum)
		}
	}
}