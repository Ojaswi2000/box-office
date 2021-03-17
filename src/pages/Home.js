import React,{useState} from 'react'
import ActorGrid from '../components/actor/ActorGrid';
import MainPageLayout from '../components/MainPageLayout'
import ShowGrid from '../components/show/ShowGrid';
import {apiGet} from '../misc/config';

const Home = () => {

    const [input,setInput]=useState('');
    const [results,setResults]=useState(null);
    const [searchOption,setSearchOption]=useState('shows');
    const isShowSearch = searchOption === "shows";

    const onSearch= () => {
        apiGet(`/search/${searchOption}?q=${input}`).then(result => {
            setResults(result);
            console.log(result);
    });
};

    const onInputChange =(ev) => {
        setInput(ev.target.value);
    };
    const onKeyDown =(ev) => {
        if(ev.keyCode===13)
        {
            onSearch();
        }
    }

    const renderResults =() => {
        if (results && results.length === 0)
        {
            return <div>No Results</div>
        }
        if (results && results.length > 0)
        {
            return results[0].show ? <ShowGrid data={results} /> : <ActorGrid data={results} />
        
        
        }
        return null;

    }

    const onRadioChange= (ev) => {
        setSearchOption(ev.target.value);
        
    }
    console.log(searchOption);

    
    return (
        <MainPageLayout>
        <input type="text" onChange={onInputChange} onKeyDown={onKeyDown} value={input} placeholder="Search for something" />
        <div>
            <label htmlFor="shows-search">
                Shows search
                <input 
                id="shows-search" 
                type="radio" 
                value="shows" 
                onChange={onRadioChange} 
                checked={isShowSearch}
                />
            </label>
            <label htmlFor="actors-search">
                Actors search
                <input 
                id="actors-search" 
                type="radio" 
                value="people" 
                onChange={onRadioChange} 
                checked={!isShowSearch}
                />
            </label>

        </div>
        <button type="button" onClick={onSearch}>Search</button>
        {renderResults()}
        </MainPageLayout>
    )
}

export default Home
