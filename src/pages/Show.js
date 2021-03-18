import React,{useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import { apiGet } from '../misc/config';

const Show = () => {

    const {id}= useParams();
    const [show,setShow]=useState(null);
    const [isLoading,setIsLoading]=useState(true);
    const [errors,setErrors]=useState(null);

    useEffect(()=>{

        let isMounted = true;
        apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`).then(results => {

            
                if(isMounted) {
                setShow(results);
                setIsLoading(false);
                }
        })
        .catch(err => {
            if(isMounted) {
            setErrors(err.message);
            setIsLoading(false);
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
            This is the show page
        </div>
    )
}

export default Show
