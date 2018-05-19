/*
 * @Author: lle_wang
 * @Date:   2018-05-13 22:06:43
 * @Last Modified by:   lle_wang
 * @Last Modified time: 2018-05-19 15:56:21
 */
import React from 'react';
import './index.scss';
class ErrorPage extends React.Component {
	render() {
		return (
			<div className="error-page">
				出错啦!!!<br/>
				您访问的页面不存在！
			</div>
		);
	}
}

export default ErrorPage;