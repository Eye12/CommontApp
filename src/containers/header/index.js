/*
 * @Author: lle_wang
 * @Date:   2018-05-14 15:10:15
 * @Last Modified by:   lle_wang
 * @Last Modified time: 2018-05-19 15:55:35
 */
import React from 'react';
import {
	connect
} from 'react-redux';
import './index.scss';
import {
	Link
} from 'react-router-dom';

class Header extends React.Component {
	keyUpHandler = (e) => {
		// timer的作用主用于减少keyup的频繁发生
		clearTimeout(this.timer);
		this.kValue = e.target.value.trim();
		let jumper = () => {
			window.location = '#/search-list/' + this.kValue;
		}
		if (this.kValue) {
			this.timer = setTimeout(jumper, 1000)
		}
	}

	render() {
		let userInfos = this.props.userInfos,
			userContent = userInfos ? (<Link to='/usercenter' id='user-link'>
					<span className="user">{userInfos.username}</span>
				</Link>) : (<Link to='/login' id='user-link'>
					<span className="user">注册/登录</span>
				</Link>);
		return (
			<div className="header">
				<Link to='/citys'>
					<span className="city">{ this.props.cityDatas.currentCity }<i className="icon-arrow"></i></span>
				</Link>
				<span className="search-group">
					<input type="search" className='ipt-search' placeholder='查询' onKeyUp={this.keyUpHandler} />
					<i className='icon-search'></i>
				</span>
				{userContent}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	cityDatas: state.cityDatas,
	userInfos: state.userInfos
})

export default connect(
	mapStateToProps
)(Header);