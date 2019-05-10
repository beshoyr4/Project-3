import React from 'react';
import SearchBar from "../../components/SearchBar";
import ConcertList from "../../components/ConcertList"
import request from 'superagent';
import './style.css';

class Search extends React.Component {
    constructor() {
        super();

        this.state = {
            concertList: []
        };
        this.handleTermChange = this.handleTermChange.bind(this);
    };

    // Waiting for the site to send me my API key
    handleTermChange(term) {
        const url = "https://api.songkick.com/api/3.0/search/locations.json?location=geo:{39.0997,-94.5786}&apikey={your_api_key}";

        request.get(url, (err, res) => {
            this.setState({ concertList: res.body.data })
        });
    };
        
        // Try to add a request.post to save concerts (stretch goal)

    render() {
        return (
            <div>
                <SearchBar onTermChange={term => this.handleTermChange(term)}/>
                <ConcertList concertList={this.state.concertList}/>
            </div>
        );
    };
};

export default Search;