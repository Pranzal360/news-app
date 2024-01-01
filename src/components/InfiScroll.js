import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class InfiScroll extends Component {
    static defaultProps = {
        country: 'in',
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        category: PropTypes.string
    }

    capitalize = (string) => {
        string = string.slice(0, 1).toUpperCase() + string.slice(1)
        return string
    }

    constructor(props) {
        super(props);
        this.state = {
            article: [],
            page: 1,
            loading: true
        }
        document.title = this.capitalize(this.props.category) + ' | News Fever'

    }


    async update() {
        this.props.setProgress(10)
        const url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=12`;
        const searchUrl = `https://newsapi.org/v2/everything?q=${this.props.searchQuery}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=12`;
        this.props.setProgress(30)
        this.setState({ loading: true });
        let data = await fetch(this.props.searchQuery ? searchUrl : url);
        this.props.setProgress(50)
        let parsedData = await data.json()
        this.props.setProgress(70)
        this.props.setProgress(100)
        this.setState({
            article: parsedData.articles, totalResults: parsedData.totalResults,
            loading: false
        })
    }

    scrollHandler = async (e) => {
        if (this.state.page + 1 > Math.ceil(this.state.totalResults / 12)) {
            window.removeEventListener('scroll',this.scrollHandler)
        }
        if (!this.state.loading && window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
            this.props.setProgress(10)
            console.log('time to fetch more data !'+this.state.page)
            this.setState({ loading: true })
            this.setState({page:++this.state.page})
            this.props.setProgress(30)
            const url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page }&pageSize=12`
            let data = await fetch(url)
            this.props.setProgress(50)
            let parsedData = await data.json()
            this.props.setProgress(100)
            this.setState({
                article: this.state.article.concat(parsedData.articles),
                loading:false
            }) 

        }
    }
    async componentDidMount() {
        await this.update()
        window.addEventListener('scroll', this.scrollHandler)
        
    }


    async componentDidUpdate(prevProps) {
        
        await this.scrollHandler()
        if (prevProps.searchQuery !== this.props.searchQuery) {
            await this.update()
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollHandler);
    }


    render() {
        return (
            <div className='container my-2'>
                <div className="container" >
                    <h2 className='text-center mb-3 my-2'>Today's top headlines on {this.capitalize(this.props.category)}</h2>
                    {this.state.loading && <Spinner></Spinner>}
                    <div className="row">
                        {this.state.article.map((element) => {
                            return <div className="col-md-3 mb-2" key={element.title}>
                                <Newsitem title={element.title != null ? element.title.slice(0, 40) : 'None'} description={element.description != null ? element.description.slice(0, 80) : 'None'} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author ? element.author : 'Unknown'} date={new Date(element.publishedAt).toGMTString()} source={element.source.name}></Newsitem>
                            </div>
                        })}
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default InfiScroll

