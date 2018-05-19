/*
 * @Author: lle_wang
 * @Date:   2018-05-16 11:22:38
 * @Last Modified by:   lle_wang
 * @Last Modified time: 2018-05-16 11:30:03
 */
import React from 'react';
import './stars';
class Stars extends React.Component {
	render() {
		// 星星
		let starsValue = this.props.starValue,
			starsValueInt = Math.floor(starsValue),
			starsContent = [];
		for (var i = 0; i < starsValueInt; i++) {
			starsContent.push(
				<i className="icon-cc-star" key={`${i + 'ccstar'}`}></i>
			);
		}
		if (starsContent.length < 5) {
			let remainder = starsValue - starsValueInt;
			if (remainder >= 0.5) {
				starsContent.push(
					<i className="icon-cc-star-half" key='half'></i>
				);
			}
			if (starsContent.length < 5) {
				for (var ii = 0; ii < (6 - starsContent.length); ii++) {
					starsContent.push(
						<i className="icon-star" key={`${ii + 'star'}`}></i>
					);
				}
			}
		}

		return (
			<span className="stars">{starsContent}</span>
		);
	}
}

export default Stars;