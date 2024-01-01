import React, { Component } from 'react'

export class Newsitem extends Component {
    
  render() {
    let {title,description,imageUrl,newsUrl,author,date,source} = this.props
    return (
      <>
        <div className="card" >
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{zIndex:'1',left:'85%'}}>
    {source} </span>
            <img src ={!imageUrl?'https://w7.pngwing.com/pngs/537/283/png-transparent-the-columbus-metropolitan-club-service-business-sales-building-none-building-text-service.png':imageUrl} style={{height:'50%'}} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <p className="card-text"><small className="text-muted">By {author} on {date}</small></p>
                <a href={newsUrl} target="_blank" className="btn btn-primary">Read More</a>
            </div>
        </div>
      </>
    )
  }
}

export default Newsitem
