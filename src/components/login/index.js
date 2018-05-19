/*
 * @Author: lle_wang
 * @Date:   2018-05-17 15:29:35
 * @Last Modified by:   lle_wang
 * @Last Modified time: 2018-05-18 17:47:24
 */
import React from 'react';
import './login';
import {
	Link
} from 'react-router-dom';
import {
	checkUserName,
	checkPassword
} from 'util/index';
class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showWrongUser: false,
			showWrongPasskey: false
		}
	}
	// 登录行为
	loginHandler = (e) => {
		let userName = this.refs.userName.value,
			password = this.refs.password.value,
			checkUserNameRes = checkUserName(userName),
			checkPasswordRes = checkPassword(password);
		// 用户名校验
		if (checkUserNameRes !== true) {
			this.setState({
				showWrongUser: true
			})
			this.refs.wrongUser.innerHTML = checkUserNameRes;
		} else {
			this.setState({
				showWrongUser: false
			})
		}
		// 密码校验
		if (checkPasswordRes !== true) {
			this.setState({
				showWrongPasskey: true
			})
			this.refs.wrongMima.innerHTML = checkPasswordRes;
		} else {
			this.setState({
				showWrongPasskey: false
			})
		}

		// 密码用户名都校验通过后向服务器传递表单数据
		if (checkUserNameRes === true && checkPasswordRes === true) {
			this.props.transmitLogin(userName, password);
		}
	}

	// 取消行为
	backHandler = (e) => {
		history.back();
	}
	render() {
		let wrongUserClassName = this.state.showWrongUser ? 'form-group-login wrong-tips show' : 'form-group-login wrong-tips',
			wrongPasskeyClassName = this.state.showWrongPasskey ? 'form-group-login wrong-tips show' : 'form-group-login wrong-tips';
		return (
			<div className="login-page">
				<h6 className='login-title'>COMMENTAPP</h6>
				<form className='form-login'>
					<div className="form-group-login">
						<label className='item-label' htmlFor="username">用户名 :</label>
						<input type="text" id='username' name='username' className='ipt' ref='userName' />
						<i className='icon-user icons'></i>
					</div>
					{ /*用户名错误提示*/ }
					<div className={wrongUserClassName}>
						<span className='txt' ref='wrongUser'></span>
					</div>
					<div className="form-group-login">
						<label className='item-label' htmlFor="password">密码 :</label>
						<input type="password" id='password' name='password' className='ipt' ref='password' />
						<i className='icon-mima icons'></i>
					</div>
					{ /*密码错误提示*/ }
					<div className={wrongPasskeyClassName}>
						<span className='txt' ref='wrongMima'></span>
					</div>
					<div className="form-group-login">
						<span className="span-group">
							<Link to='/register'><span id='register'>新用户注册</span></Link>
							<span id='forget'>忘记密码</span>
						</span>
					</div>
					<div className="form-group-login">
						<button type='button' id='ipt-login' onClick = { this.loginHandler }>登录</button>
						<button type='button' id='ipt-cancel' onClick={this.backHandler}>取消</button>
					</div>
				</form>
			</div>
		);
	}
}

export default Login;