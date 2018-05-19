/*
 * @Author: lle_wang
 * @Date:   2018-05-18 19:16:24
 * @Last Modified by:   lle_wang
 * @Last Modified time: 2018-05-18 21:29:22
 */
import React from 'react';
import Register from 'components/register/index';
import 'whatwg-fetch';
import {
	connect
} from 'react-redux';
import actions from 'actions/index';
import ErrorWindow from 'components/errorWindow/index';
class registerContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isShowError: false,
			errorInfo: null
		}
	}
	fetchRegister = (username, password, tel) => {
		fetch('/register', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: username,
				password: password,
				tel: tel
			})
		}).then(res => {
			return res.json();
		}).then(res => {
			if (Number(res.status) === 1) {
				this.props.dispatch(actions.register(username, null));
				window.location = '#';
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
			isShowContent = this.state.isShowError ? <ErrorWindow info={this.state.errorInfo} title='注册失败: ' close={this.transmitClose} /> : '';
		return (
			<div className="login-container" style={styleObj}>
				<Register transmitRegister = {this.fetchRegister}></Register>
				{isShowContent}
			</div>
		);
	}
}
export default connect()(registerContainer);