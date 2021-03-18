import React,{useEffect,useReducer} from 'react'
import {useParams} from 'react-router-dom'
import Cast from '../components/show/Cast';
import Details from '../components/show/Details';
import Seasons from '../components/show/Seasons';
import ShowMainData from '../components/show/ShowMainData';
import { apiGet } from '../misc/config';


const reducer = (prevState, action) => {
    switch(action.type) {

        case 'FETCH_SUCCESS' :{
            return {isLoading: false, errors : null, show: action.show};
        }

        case 'FETCH_FAILED' :{
            return {...prevState, isLoading : false, errors: action.errors}
        }
        default : 
        return prevState;
    }
};

const initialState ={
    show:null,
    isLoading: true,
    errors: null
};

const Show = () => {

    const {id}= useParams();

    const [ {show,isLoading,errors}, dispatch]= useReducer(reducer,initialState);
   // const [show,setShow]=useState(null);
   // const [isLoading,setIsLoading]=useState(true);
   // const [errors,setErrors]=useState(null);

    useEffect(()=>{

        let isMounted = true;
        apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
        .then(results => {
            if(isMounted) {
                dispatch({type: 'FETCH_SUCCESS', show : results });
            }
        })
        .catch(err => {
            if(isMounted) {
                dispatch ({type: 'FETCH_FAILED', errors : err.message});
            }
        });

        return ()=>{
            isMounted=false;
        }
    },[id]);

    console.log(show);

    if(isLoading){
        return <div>Data is being loaded</div>
    }

    if(errors){
        return <div>Error occurred :{errors}</div>
    }
    
    return (
        <div>
            <ShowMainData 
            image={show.image} 
            name={show.name} 
            rating={show.rating} 
            summary={show.summary} 
            tags={show.genres} 
            />
        <div>
            <h2>Details</h2>
            <Details 
            status={show.status}
            network={show.network}
            premiered={show.premiered}            
            />
            </div>

            <div>
                <h2>Seasons</h2>
                <Seasons 
                seasons={show._embedded.seasons}
                />
            </div>

            <div>
                <h2>Cast</h2>
                <Cast 
                cast={show._embedded.cast}
                />
            </div>
        </div>
    )
}

export default Show
