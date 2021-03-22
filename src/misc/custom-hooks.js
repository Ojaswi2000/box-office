import {useReducer,useEffect,useState} from 'react'
import {apiGet} from '../misc/config';

function showsReducer(prevState,action){
    switch(action.type)
    {
        case 'ADD':{
            return [...prevState,action.showID];
        }

        case 'REMOVE':{
            return prevState.filter(showID => showID !== action.showID);
        }
        default : return prevState;
    }
}

function usePersistedReducer(reducer,initialState,key) {

    const [state,dispatch]=useReducer(reducer,initialState,initial=>{
    const persisted = localStorage.getItem(key);

    return persisted ? JSON.parse(persisted) : initial;
    });

    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(state));
    },[state,key]);

    return [state,dispatch];

}
    export function useShows(key="shows"){
        return usePersistedReducer(showsReducer, [], key);
    }


    export function useLastQuery(key="lastQuery"){
        const [input,setInput]=useState(()=>{
            const persisted = sessionStorage.getItem(key);

            return persisted ? JSON.parse(persisted) : '';
        });

        const setPersistedInput= (newState)=>{
            setInput(newState);
            sessionStorage.setItem(key,JSON.stringify(newState));
        }
        return [input,setPersistedInput];
    }


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



    export function useShow(showID){
        const [ state, dispatch]= useReducer(reducer,
            {
            show:null,
            isLoading: true,
            errors: null
            }
            );
        
         useEffect(()=>{
     
             let isMounted = true;
             apiGet(`/shows/${showID}?embed[]=seasons&embed[]=cast`)
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
         },[showID]);
     
         return state;
    }