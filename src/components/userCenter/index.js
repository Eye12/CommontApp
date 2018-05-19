/*
 * @Author: lle_wang
 * @Date:   2018-05-17 20:32:16
 * @Last Modified by:   lle_wang
 * @Last Modified time: 2018-05-18 21:43:14
 */
import React from 'react';
import './userCenter';
import {
	Link
} from 'react-router-dom';
class UserCenter extends React.Component {
	render() {
		let datas = this.props.datas;
		return (
			<div className="user-center">
				<div className="u-top-head">
					<span className="left"><i className="icon-shezhi"></i></span>
					<span className="right"><i className="icon-youxiang"></i></span>
				</div>
				<div className="u-head-portrait">
					<img src={require('../../images/userComments/cId7/7-0.jpg')} alt="head-protrait.jpg" className="portrait"/>
				</div>
				<div className="u-user-name">{datas.username}</div>
				<div className="u-groups">
					<span className="group-item">
						<i className="icon-xingxing g-icons"></i>
						<span className="txt">收藏</span>
					</span>
					<span className="group-item">
						<i className="icon-pingjia g-icons"></i>
						<span className="txt">评价</span>
					</span>
					<span className="group-item">
						<i className="icon-zuji g-icons"></i>
						<span className="txt">足迹</span>
					</span>
				</div>
				<div className="u-server">
					<p className="u-title">CommentApp - 服务</p>
					<span className="server-item">
						<i className="icon-kefuzhongxin"></i>
						<span className="txt">客服中心</span>
					</span>
					<span className="server-item">
						<Link to='/'>
							<i className="icon-fanhuishouye"></i>
							<span className="txt">返回首页</span>
						</Link>
					</span>
				</div>
			</div>
		);
	}
}
export default UserCenter;