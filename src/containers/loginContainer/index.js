/*
 * @Author: lle_wang
 * @Date:   2018-05-18 14:34:13
 * @Last Modified by:   lle_wang
 * @Last Modified time: 2018-05-18 20:36:57
 */
import React from 'react';
import Login from 'components/login/index';
import 'whatwg-fetch';
import {
	connect
} from 'react-redux';
import actions from 'actions/index';
import ErrorWindow from 'components/errorWindow/index';
class LoginContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isShowError: false,
			errorInfo: null
		}
	}
	fetchLogin = (username, password) => {
		fetch('/login', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: username,
				password: password
			})
		}).then(res => {
			return res.json();
		}).then(res => {
			if (Number(res.status) === 1) {
				this.props.dispatch(actions.login(username, res.datas));
				history.back();
			} else {
				this.setState({
					isShowError: true,
					errorInfo: res.info
				})
			}
		})
	}
	transmitClose = () => {
		this.setState({
			isShowError: false,
			errorInfo: null
		})
	}
	render() {
		let styleObj = {
				position: 'relative'
			},
			isShowContent = this.state.isShowError ? <ErrorWindow info={this.state.errorInfo} title='登录失败: ' close={this.transmitClose} /> : '';
		return (
			<div className="login-container" style={styleObj}>
				<Login transmitLogin = {this.fetchLogin}></Login>
				{isShowContent}
			</div>
		);
	}
}
export default connect()(LoginContainer);