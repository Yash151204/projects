import React from "react";

const Newsitem = (props) => {

    let {title,description,img,url,author,date,source}=props
    return (
      <><div className="my-3">
        <div className="card" >
          <div style={{display:"flex",justifyContent:"flex-end",position:"absolute",right:0}}>
        <span className=" badge rounded-pill bg-dark" >{source}</span>
        </div>
          <img src={img} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
              {description}
            </p>
            <p className="card-text">
             By {author?author:"Unknown"}, on {new Date(date).toGMTString()}
            </p>
            <a href={url} target="_blank" rel="noreferrer" className="btn btn-dark">
              Learn more
            </a>
          </div>
        </div>
        </div>
      </>
    );
  
}

export default Newsitem;
