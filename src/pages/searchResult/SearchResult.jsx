import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import "./style.scss";
import { fetchDataFromApi } from "../../utils/api";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";
import noResults from "../../assets/no-results.png";


const SearchResult = () => {

  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);//here we are getting only 20 results but in order to show results infinitely we will use pagination i.e no of pages with no of results for infinite scrolling
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  //api call
 const fetchInitialData = () => {
      setLoading(true);

      fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
      .then((res) => {
        setData(res);
        console.log(res);
        setPageNum((prev) => prev + 1 );
        setLoading(false)
      })
 }


 //here we merge previously obtained data from api with the new data
 //as we want infinite scroll so there should be large number of data to show and that's why we merge all data
  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
    .then((res) => {
       if (data?.results) {
          setData({
            ...data, 
            results: [...data?.results, ...res.results]
          })
       } else {//intially data is null , useState(null)
         setData(res);
       }

       setPageNum((prev) => prev + 1 );
    })
  }


  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  }, [query]);



  return (
    <div  className="searchResultsPage">
        {loading &&
         <Spinner
           initial={true}
        />}
        {!loading && (
          <ContentWrapper>
              {data?.results?.length > 0 ? (
                <>
                   <div className="pageTitle">
                      {`Search ${data?.total_results > 1 ? "results": "result"} of '${query}'`}
                   </div>
                   <InfiniteScroll
                     className="content"
                     dataLength={data?.results?.length || []}
                     next={fetchNextPageData}
                     hasMore={pageNum <= data?.total_pages}
                     loader={<Spinner />}
                   >
                      {data?.results?.map((item, index) => {
                        if (item.media_type === "person") return;
                        return (
                          <MovieCard 
                            key={index}
                            data={item}
                            fromSearch={true}
                          />
                        )
                      })}
                   </InfiniteScroll>
                </>
              ) : (
                 <span className="resultNotFound">
                    Sorry, Results not found!!
                 </span>
              )}
          </ContentWrapper>
        )}
    </div>
  )
}

export default SearchResult