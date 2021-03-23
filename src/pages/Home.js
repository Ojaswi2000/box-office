import React,{useState} from 'react'
import ActorGrid from '../components/actor/ActorGrid';
import MainPageLayout from '../components/MainPageLayout'
import ShowGrid from '../components/show/ShowGrid';
import {apiGet} from '../misc/config';
import { useLastQuery } from '../misc/custom-hooks';
import { RadioInputsWrapper, SearchInput, SearchButtonWrapper } from './Home.styled';

const Home = () => {

    const [input,setInput]=useLastQuery();
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
        <SearchInput type="text" onChange={onInputChange} onKeyDown={onKeyDown} value={input} placeholder="Search for something" />
        <RadioInputsWrapper>
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
            </div>

            <div>
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

        </RadioInputsWrapper>
        <SearchButtonWrapper>
        <button type="button" onClick={onSearch}>Search</button>
        </SearchButtonWrapper>
        {renderResults()}
        </MainPageLayout>
    )
}

export default Home
