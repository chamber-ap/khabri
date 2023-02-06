import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'general',
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  capitaliseFirstLetter = (string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props){
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    }
    document.title =`${this.capitaliseFirstLetter(this.props.category)} - KHABRI`;
  }
async updateNews(){
  this.props.setProgress(10);
  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3a111dc52df948d7b9c4116388380d9c&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json()
    this.props.setProgress(70);

    // console.log(parsedData);
    this.setState({
      articles: parsedData.articles, 
      totalResults: parsedData.totalResults,
      loading: false
    })
  this.props.setProgress(100);

  }

  async componentDidMount(){
    // // console.log("cdm");
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3a111dc52df948d7b9c4116388380d9c&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true});
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // // console.log(parsedData);
    // this.setState({
    //   articles: parsedData.articles, 
    //   totalResults: parsedData.totalResults,
    //   loading: false
    // })
    this.updateNews();
  }

  handlePrevClick = async ()=>{
    // console.log("Previous");
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3a111dc52df948d7b9c4116388380d9c&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true});
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // this.setState({articles: parsedData.articles})
    // this.setState({
    //   page: this.state.page - 1,
    //   loading: false
    // })
    this.setState({page: this.state.page-1});
    this.updateNews();

  }

  
  handleNextClick = async ()=>{
  //   if(this.state.page + 1 >Math.ceil(this.state.totalResults/this.props.pageSize)){}
  //   else{
  //   console.log("Next");
  //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3a111dc52df948d7b9c4116388380d9c&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  //   this.setState({loading: true});
  //   let data = await fetch(url);
  //   let parsedData = await data.json()
  //   this.setState({
  //     page: this.state.page + 1,
  //     articles: parsedData.articles,
  //     loading: false
  //   })
  // }
  this.setState({page: this.state.page + 1});
    this.updateNews();
  }

  fetchMoreData = async() => {
    this.setState({page: this.state.page + 1})
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3a111dc52df948d7b9c4116388380d9c&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    
    let data = await fetch(url);
    let parsedData = await data.json()
    // console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles), 
      totalResults: parsedData.totalResults,
    })
  };


  render() {
    return (
      <>
        <h1 className='text-center' style={{margin: '40px' , marginTop: '90px'}}><strong>KHABRI</strong> - Top {this.capitaliseFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        > 
          <div className="container">
            <div className="row">
              { !this.state.loading && this.state.articles.map((element)=>{
                return <div className="col-md-4" key={element.url}>
                <NewsItems title={element.title? element.title.slice(0, 45):"" } description={element.description? element.description.slice(0, 90): ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
              </div>
              })}
          
        {/* </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark my-3" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil((this.state.totalResults/this.props.pageSize))}type="button" className="btn btn-dark my-3" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
            </div>
          </div>
        </InfiniteScroll>
      </>
    )
  }
}

export default News