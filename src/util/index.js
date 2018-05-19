/*
 * @Author: lle_wang
 * @Date:   2018-05-18 10:12:31
 * @Last Modified by:   lle_wang
 * @Last Modified time: 2018-05-18 18:50:28
 */
// 用户名校验
const checkUserName = (value) => {
	if (value.length) {
		let res = value.match(/^(?![^a-zA-Z]+$)(?!\D+$)/);
		if (res === null) {
			return '用户名必须包含数字或字母';
		} else {
			return true;
		}
	} else {
		return '不能为空！';
	}
}
// 密码校验
const checkPassword = (value) => {
	if (value.length) {
		if (value.length >= 6) {
			let res = value.match(/^(?![^a-zA-Z]+$)(?!\D+$)/);
			if (res === null) {
				return '密码必须包含数字和字母';
			} else {
				return true;
			}
		} else {
			return '密码长度必须大于等于6';
		}
	} else {
		return '不能为空！';
	}
}
// 前后两次输入密码校验
const confirmPassword = (firstVal, nextVal) => {
	if (firstVal === nextVal) {
		return true;
	} else {
		return '两次密码输入不一致';
	}
}
// 电话号码合法与否检验
const checkPhone = (telValue) => {
	// 手机号码根据前7位就可以知道归属地了,所以{4,8},意思是后边匹配数据4-8即可;
	// let checkRes = telValue.match(/^1[3|4|5|8][0-9]\d{4,8}$/);
	if (telValue) {
		let res = telValue.match(/^1[3|4|5|8][0-9]\d{8}$/);
		if (res === null) {
			return '手机号码不合法'
		} else {
			return true;
		}
	} else {
		return '不能为空'
	}
}

export {
	checkUserName,
	checkPassword,
	confirmPassword,
	checkPhone
}