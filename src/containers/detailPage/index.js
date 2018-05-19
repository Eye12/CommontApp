/*
 * @Author: lle_wang
 * @Date:   2018-05-16 09:59:22
 * @Last Modified by:   lle_wang
 * @Last Modified time: 2018-05-17 12:31:56
 */
import React from 'react';
import Details from 'components/details/index';
import DetailHeader from 'components/detailHeader/index';
import CommentsList from 'components/commentsList/index';
import 'whatwg-fetch';
class DetailPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			itemData: null,
			city: null
		}
	}
	componentDidMount() {
		let city = this.props.match.params.city,
			id = this.props.match.params.id,
			fecthUrl = '/commodity?city=' + city + '&id=' + id;
		fetch(fecthUrl).then(res => res.json()).then(data => {
			if (data.status) {
				this.setState({
					itemData: data.datas,
					city: city
				})
			} else {
				console.log('请求失败！')
			}
		});
	}
	render() {
		return (
			<div className="detail-page">
				<DetailHeader></DetailHeader>
				<Details city={this.state.city} itemData={this.state.itemData}></Details>
				<CommentsList itemData={this.state.itemData}></CommentsList>
			</div>
		);
	}
}

export default DetailPage;