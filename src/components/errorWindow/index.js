/*
 * @Author: lle_wang
 * @Date:   2018-05-18 16:08:36
 * @Last Modified by:   lle_wang
 * @Last Modified time: 2018-05-18 20:50:52
 */
import React from 'react';
import './errorWindow';
class ErrorWindow extends React.Component {
	closeHandler = () => {
		this.props.close();
	}
	render() {
		console.log(this.props.info);
		return (
			<div className="error-window">
				<p><span className="title">{this.props.title}</span>{this.props.info}</p>
				<i className="icon-close" onClick={this.closeHandler}></i>
			</div>
		);
	}
}

export default ErrorWindow;