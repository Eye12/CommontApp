/*
 * @Author: lle_wang
 * @Date:   2018-05-14 13:25:49
 * @Last Modified by:   lle_wang
 * @Last Modified time: 2018-05-19 15:54:57
 */
import {
	combineReducers
} from 'redux';
import cityDatas from './cityDatas';
import userInfos from './userInfos';

export default combineReducers({
	cityDatas,
	userInfos
})