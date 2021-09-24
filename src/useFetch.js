import {useEffect,useState} from 'react'

const useFetch = (url) =>{
    const [data,setData] = useState(null);
    const [isPending,setIsPending] = useState(true);
    const [error,setError] = useState(null)
    
   useEffect(()=>{
        const abortCont = new AbortController()

        fetch(url, {signal : abortCont.signal})
        .then(res => {
            if(!res.ok){
                throw Error('could not fetch the data for that resource ');
            }
            return res.json();
        })
        .then(data => {
            setData(data);
            setIsPending(false);
            setError(null);
        })
        .catch(error => {
            if (error.name === 'AbortError'){
                console.log('fetch aborted')
            }
            setError(error.message);
            setIsPending(false);
        }) 

        return ()=> abortCont.abort()
    },[url]) 
    return {data,isPending,error};
}
export default useFetch;