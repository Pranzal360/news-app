import React, { useEffect,useRef,useState } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

const News = (props) => {

  const [article, setArticle] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [totalResults, settotalResults] = useState(0)

  // document.title =  capitalize( props.category) + " | News Fever";

  const capitalize = (string) => {
    string = string.slice(0, 1).toUpperCase() + string.slice(1);
    return string;
  };


  
  const update = async () => {
    props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?&country=${ props.country}&category=${ props.category}&apiKey=${ props.apikey}&page=${page}&pageSize=12`;
    const searchUrl = `https://newsapi.org/v2/everything?q=${ props.searchQuery}&apiKey=${ props.apikey}&page=${page}&pageSize=12`;
    //  setState({ loading: true });
     setLoading(true)
     props.setProgress(30)
    
    let data = await fetch( props.searchQuery ? searchUrl : url);
     props.setProgress(50)
    
    let parsedData = await data.json();
     props.setProgress(70)
    
     setArticle(parsedData.articles)
     settotalResults(parsedData.totalResults)
     setLoading(false)
     props.setProgress(100)
    
    }
    useEffect(() => {
      // Code to run after the component mounts
      console.log('Component mounted!');
      console.log(props.apikey)
      update()
  
      return () => {
        // Code to clean up on unmount or before the next effect
        console.log('Component will unmount!');
        
        
      };
    }, [props.searchQuery])
  

  const handlePrevClick = async () => {
    setPage(prevPage => prevPage + 1);
     update();
  };
  
  const handleNextClick = async () => {
    setPage(prevPage => prevPage + 1);
     update();
  };
    return (
      <div className="container my-5">
        <div className="container">
          <h2 className="text-center">
            Today's top headlines on { capitalize( props.category)}
          </h2>
          { loading && <Spinner></Spinner>}
          <div className="row">
            {! loading &&
               article.map((element) => {
                return (
                  <div className="col-md-3 mb-2" key={element.title}>
                    <Newsitem
                      title={
                        element.title != null
                        ? element.title.slice(0, 40)
                        : "None"
                      }
                      description={
                        element.description != null
                        ? element.description.slice(0, 80)
                        : "None"
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author ? element.author : "Unknown"}
                      date={new Date(element.publishedAt).toGMTString()}
                      source={element.source.name}
                    ></Newsitem>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="container d-flex justify-content-between">
          <button
            type="button"
            disabled={ page <= 1}
            onClick={ handlePrevClick}
            className="btn btn-secondary"
          >
            {" "}
            &larr; Previous
          </button>
          <button
            type="button"
            disabled={
               page + 1 > Math.ceil( totalResults / 12)
            }
            onClick={ handleNextClick}
            className="btn btn-warning text-light"
            >
            Next &rarr;
          </button>
        </div>
      </div>
    );

}

export default News;

News.defaultProps = {
  country: "in",
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
};