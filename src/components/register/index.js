/*
 * @Author: lle_wang
 * @Date:   2018-05-17 17:03:12
 * @Last Modified by:   lle_wang
 * @Last Modified time: 2018-05-19 15:56:51
 */
import React from 'react';
import './register';
import {
	checkUserName,
	checkPassword,
	confirmPassword,
	checkPhone
} from 'util/index';
class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showErrorUser: false,
			showErrorPasskey: false,
			showErrorConfirm: false,
			showErrorTel: false
		}
	}
	// 新用户注册信息检查是否合法并决定提交与否
	registerHandler = (e) => {
		let username = this.refs.username.value,
			password = this.refs.password.value,
			secondPassword = this.refs.secondPassword.value,
			telValue = this.refs.tel.value;
		// 校验用户名
		let checkUserRes = checkUserName(username);
		if (checkUserRes === true) {
			this.setState({
				showErrorUser: false
			})
		} else {
			this.setState({
				showErrorUser: true
			})
			this.refs.wrongUser.innerHTML = checkUserRes;
		}

		// 校验密码
		let checkPasskeyRes = checkPassword(password);
		if (checkPasskeyRes === true) {
			this.setState({
				showErrorPasskey: false
			})
		} else {
			this.setState({
				showErrorPasskey: true
			})
			this.refs.wrongMima.innerHTML = checkPasskeyRes;
		}

		// 二次校验密码
		let checkConfirmRes = confirmPassword(password, secondPassword);
		if (checkConfirmRes === true) {
			this.setState({
				showErrorConfirm: false
			})
		} else {
			this.setState({
				showErrorConfirm: true
			})
			this.refs.wrongConfirm.innerHTML = checkConfirmRes;
		}

		// 校验手机号码
		let checkTelRes = checkPhone(telValue);
		if (checkTelRes === true) {
			this.setState({
				showErrorTel: false
			})
		} else {
			this.setState({
				showErrorTel: true
			})
			this.refs.wrongTel.innerHTML = checkTelRes;
		}

		// 所有校验成功向服务器提交注册表单数据
		if (checkUserRes === true && checkPasskeyRes === true && checkConfirmRes === true && checkTelRes === true) {
			this.props.transmitRegister(username, password, telValue);
		}
	}
	// 取消注册行为
	backHandler = (e) => {
		history.back();
	}
	render() {
		let errorUserClassName = this.state.showErrorUser ? 'form-group-login wrong-tips show' : 'form-group-login wrong-tips',
			errorPasskeyClassName = this.state.showErrorPasskey ? 'form-group-login wrong-tips show' : 'form-group-login wrong-tips',
			errorConfirmClassName = this.state.showErrorConfirm ? 'form-group-login wrong-tips show' : 'form-group-login wrong-tips',
			errorTelClassName = this.state.showErrorTel ? 'form-group-login wrong-tips show' : 'form-group-login wrong-tips';
		return (
			<div className="register-page">
				<h6 className='register-title'>COMMENTAPP</h6>
				<form className='form-register'>
					<div className="form-group-register">
						<label className='item-label' htmlFor="username">用户名 :</label>
						<input type="text" id='username' name='username' className='ipt' ref='username' />
						<i className="icon-user icons"></i>
					</div>
					{ /*用户名错误提示*/ }
					<div className={errorUserClassName}>
						<span className='txt' ref='wrongUser'></span>
					</div>
					<div className="form-group-register">
						<label className='item-label' htmlFor="password">密码 :</label>
						<input type="password" id='password' name='password' className='ipt' ref='password' />
						<i className="icon-mima icons"></i>
					</div>
					{ /*密码错误提示*/ }
					<div className={errorPasskeyClassName}>
						<span className='txt' ref='wrongMima'>密码错误</span>
					</div>
					<div className="form-group-register">
						<label className='item-label' htmlFor="confirm">密码确认 :</label>
						<input type="password" id='confirm' name='confirm' className='ipt' ref='secondPassword'/>
						<i className="icon-mima icons"></i>
					</div>
					{ /*密码确认错误提示*/ }
					<div className={errorConfirmClassName}>
						<span className='txt' ref='wrongConfirm'>两次密码不一致</span>
					</div>
					<div className="form-group-register">
						<label className='item-label' htmlFor="phone">phone :</label>
						<input type="tel" id='phone' name='phone' className='ipt' ref='tel'/>
						<i className="icon-tel3 icons"></i>
					</div>
					{ /*电话号码错误提示*/ }
					<div className={errorTelClassName}>
						<span className='txt' ref='wrongTel'>位数不足</span>
					</div>
					<div className="form-group-register buttons">
						<button type='button' id='ipt-login' onClick={this.registerHandler}>注册</button>
						<button type='button' id='ipt-cancel' onClick={this.backHandler}>取消</button>
					</div>
				</form>
			</div>
		);
	}
}

export default Register;