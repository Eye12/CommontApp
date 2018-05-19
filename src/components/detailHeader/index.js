/*
 * @Author: lle_wang
 * @Date:   2018-05-16 10:17:17
 * @Last Modified by:   lle_wang
 * @Last Modified time: 2018-05-18 21:48:31
 */
import React from 'react';
import './detailHeader';
class DetailHeader extends React.Component {
	backHandler = (e) => {
		// history.back();
		window.location = '#/';
	}
	render() {
		return (
			<div className="detail-header">
				<div className="left" onClick={ this.backHandler }><i className='icon-jiantou'></i></div>
				<div className="right">
					<i className="icon-zhuanfa"></i>
					<i className="icon-xingxing1"></i>
					<i className="icon-more"></i>
				</div>
			</div>
		);
	}
}

export default DetailHeader;