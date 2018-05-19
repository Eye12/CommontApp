/*
 * @Author: lle_wang
 * @Date:   2018-05-16 18:06:34
 * @Last Modified by:   lle_wang
 * @Last Modified time: 2018-05-17 12:33:00
 */
import React from 'react';
import Stars from 'components/stars/index';
import './commentsList';
class CommentsList extends React.Component {
	render() {
		let commentsListContent;
		if (this.props.itemData) {
			if (typeof(this.props.itemData) === 'string') {
				commentsListContent = ''
			} else {
				let data = this.props.itemData[0].comments,
					listContent = data.map((item, index) => {
						let headPortraitImgUrl = item.cId + '/' + item.headPortrait,
							imgGroupContent = item.bluePriting.slice(0, 3).map((itemChild, index) => {
								let commentImgUrl = item.cId + '/' + itemChild;
								return <img key={index} src={require('../../images/userComments/' + commentImgUrl)} alt={itemChild} />
							})
						return <li className="comments-item" key={index}>
						<span className="head-portrait">
							<img src={require('../../images/userComments/' + headPortraitImgUrl)} alt="head-portrait.jpg"/>
						</span>
						<span className="comment-content">
							<span className="user-info-group">
								<span className="name-time">
									<span className="user-name">{item.userName}</span>
									<span className="date-time">{item.time}</span>
								</span>
								<span className="user-stars">打分: <Stars starValue={item.score} /></span>
							</span>
							<span className="describe">{item.content}</span>
							<span className="img-group">
								{imgGroupContent}
							</span>
						</span>
					</li>
					})
				commentsListContent = <div>
					<p className="title">
						网友点评
					</p>
					<ul className="comment-list">
						{listContent}
					</ul>
				</div>
			}
		}
		return (
			<div className='comments-list'>
				{commentsListContent}
			</div>
		);
	}
}

export default CommentsList;