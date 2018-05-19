/*
 * @Author: lle_wang
 * @Date:   2018-05-14 13:32:33
 * @Last Modified by:   lle_wang
 * @Last Modified time: 2018-05-19 15:55:07
 */
const userInfos = (state = null, action) => {
	switch (action.type) {
		case 'REGISTER':
			return {
				username: action.username,
				userDatas: action.userDatas
			}
		case 'LOGIN':
			return {
				username: action.username,
				userDatas: action.userDatas
			}
		default:
			return state
	}
}

export default userInfos;