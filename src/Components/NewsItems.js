import React, { Component } from 'react'

export class NewsItems extends Component {
  
  render() {
    let {title, description, imageUrl, newsUrl, author, date, source} = this.props;
    return (
        <div>
            <div className="card">
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              position: 'absolute',
              right: '0',

            }}>
            <span className ="badge rounded-pill bg-danger"> {source} </span>
            </div>
              <img src={!imageUrl?"https://i.insider.com/636e7a40f5877200181c7ad8?width=1200&format=jpeg":imageUrl} className="card-img-top" alt="..."/>
              <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <p className="card-text"><small className="text-muted">By {author?author : 'unknown'} on {new Date(date).toGMTString()}</small></p>
                <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
              </div>
            </div>
        </div>
    )
  }
}

export default NewsItems
