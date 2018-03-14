//Author: Leizl Co

import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
const API_KEY = 'AIzaSyAE0O_XjQKTr8eIp6kZZN2i0Cid4hFCjTM';

// Create a new component. This component should produce some HTML
class App extends Component {
	constructor(props){
		super(props);
		
		this.state = { 
			videos: [],
			selectedVideo: null
		};
		
		this.videoSearch("cute animals");
	}
	
	videoSearch(term){
		YTSearch({key: API_KEY, term: term}, (videos) => {
			this.setState({ 
				videos: videos,
				selectedVideo: videos[0]
			});
			//this.setStats({ videos: data });
		});
	}
	
	render(){
		
		const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);
		
		return (
			<div>
				<h1 className='h1Title'>Custom YouTube Search</h1>
				<SearchBar onSearchTermChange={videoSearch} />
				<br />
				<VideoDetail video={this.state.selectedVideo} />
				<VideoList 
					onVideoSelect={selectedVideo => this.setState({selectedVideo})}
					videos={this.state.videos} />
			</div>	
		)
	}
}

// Take this component's generated HTML and put it on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));
