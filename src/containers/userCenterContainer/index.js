/*
 * @Author: lle_wang
 * @Date:   2018-05-18 21:22:51
 * @Last Modified by:   lle_wang
 * @Last Modified time: 2018-05-18 21:39:03
 */
import React from 'react';
import UserCenter from 'components/userCenter/index';
import {
	connect
} from 'react-redux';
class UserCenterContainer extends React.Component {
	render() {
		return (
			<div className="user-center-container">
				<UserCenter datas={this.props.userInfos}></UserCenter>
			</div>
		);
	}
}
const mapStateToProps = state => ({
	userInfos: state.userInfos
})
export default connect(mapStateToProps)(UserCenterContainer);