/*
 * @Author: lle_wang
 * @Date:   2018-05-14 13:27:16
 * @Last Modified by:   lle_wang
 * @Last Modified time: 2018-05-19 15:55:00
 */
const cityDatas = (state = {
	currentCity: '北京'
}, action) => {
	switch (action.type) {
		case 'CHOOSE_CITY':
			return {
				currentCity: action.currentCity,
				cityDatas: action.cityDatas
			}
		default:
			return state
	}
}

export default cityDatas;