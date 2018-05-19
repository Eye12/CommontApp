/*
 * @Author: lle_wang
 * @Date:   2018-05-13 13:18:36
 * @Last Modified by:   lle_wang
 * @Last Modified time: 2018-05-19 15:57:21
 */
// 选择所在城市
const chooseCity = (currentCity, cityDatas) => {
	return {
		type: 'CHOOSE_CITY',
		currentCity,
		cityDatas
	}
}

// 新用户注册
const register = (username, userDatas) => {
	return {
		type: 'REGISTER',
		username,
		userDatas
	}
}

// 老用户登录
const login = (username, userDatas) => {
	return {
		type: 'LOGIN',
		username,
		userDatas
	}
}

export default {
	chooseCity,
	register,
	login
}