/*
 * @Author: lle_wang
 * @Date:   2018-05-16 09:56:17
 * @Last Modified by:   lle_wang
 * @Last Modified time: 2018-05-17 11:29:57
 */
import React from 'react';
import Stars from 'components/stars/index';
import './details';
class Details extends React.Component {
	render() {
		let city = this.props.city,
			itemData = this.props.itemData,
			detailContent;
		if (city && itemData) {
			if (typeof(itemData) === 'string') {
				detailContent = itemData;
			} else {
				let imgUrl = city + '/' + itemData[0].img,
					wifiContent = itemData[0].wifi ? (<span className="wifi"><i className="icon-WIFI"></i>WIFI</span>) : ''
				detailContent = <div className="detail-part1">
					<div className="detail-group1">
						<div className="group-one-image">
							<img src={require('../../images/list/' + imgUrl)} alt="iamges"/>
						</div>
						<div className="group-one-content">
							<p className="seller-name">{itemData[0].title}</p>
							<div className="group-starts">
								<Stars starValue={itemData[0].stars} />
								<span className='comment-counts'>{itemData[0].commentsAmount}条</span>
								<span className='person-consumption'>¥{itemData[0].pConsumption}/人</span>
							</div>
							<div className="category-address">
								<span className="category">{itemData[0].category}</span>
								<span className='addr'>{itemData[0].addr}</span>
							</div>
							<div className="time">
								<span className="open-time"><i className="icon-time"></i>营业至{itemData[0].BusinessHours}</span>
								{wifiContent}
							</div>
						</div>
					</div>
					<div className="detail-group2">
						<address className='detail-address'><i className="icon-zuobiao"></i>{itemData[0].address}</address>
						<div className="tel"><i className="icon-tel"></i></div>
					</div>
				</div>
			}
		} else {
			detailContent = 'loading...';
		}
		// 渲染
		return (
			<div className="detail">
				{detailContent}
			</div>
		);
	}
}

export default Details;