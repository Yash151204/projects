import React,{useState,useEffect} from "react";
import Newsitem from "./Newsitem";
import Loading from "./Loading";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News= (props) => {
    const [articles, setArticals] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [no, setNo] = useState(0)
    const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');

   const update= async () =>
  {
    props.setProgress(0)
    setLoading(true)
    let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.size}`
    let data=await fetch(url);
    let parsedData=await data.json()
    setArticals(parsedData.articles)
    setLoading(false)
    setNo(parsedData.totalResults)
    props.setProgress(100)
  }

  const fetchMoreData= async () =>
  {
    setPage(page+1)
    let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pageSize=${props.size}`
    let data=await fetch(url);
    let parsedData=await data.json()
    setArticals(articles.concat(parsedData.articles))
    setNo(parsedData.totalResults)
  }
  useEffect(() => {
    document.title=props.category + "-News Nest"  
    update()
  }, [])
   
    return (
      
      <>
      
          <h1 className="text-center" style={{marginTop:"75px"}}>Top  {props.category} Headlines    </h1>
          <h1 className='text-center' style={{textAlign:"center"}}>{hours}:{minutes}:{seconds}</h1>
          <div className="container text-center">
            {loading && <Loading/>}
          </div>
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length<no}
          loader={<Loading/>}
        >
          <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (<div className="col-md-4" key={element.url}>
                <Newsitem
                  title={element.title?element.title:""}
                  description={element.description?element.description:""}
                  img={element.urlToImage?element.urlToImage:"https://images.moneycontrol.com/static-mcnews/2021/06/Morning-Scan-10-770x433.jpg"}
                  url={element.url?element.url:""}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>)
            })}
          </div>
          </div>
          </InfiniteScroll>
      </>
    );
}

News.defaultProps={
  size:10,
  contury:"in",
  category:"general"
}

News.propTypes={
  size:PropTypes.number,
  contury:PropTypes.string,
  category:PropTypes.string
}


export default News;
