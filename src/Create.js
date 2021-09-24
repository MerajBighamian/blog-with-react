import { useState } from "react";
import {useHistory} from 'react-router-dom'

const Create = () => {
    const [title,setTitle] = useState('');
    const [body,setBody] = useState('');
    const [author,setAuthor] = useState('meraj');
    const [IsPending,setIsPending] = useState(false);
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = {title,body,author};
        setIsPending(true)
        fetch('http://127.0.0.1:8500/blogs/' , {
            method: 'POST',
            headers: {"Content-Type" : 'application/json'},
            body: JSON.stringify(blog)
        }).then(()=>{
            console.log('new blog added')
            setIsPending(false);
            history.push('/');
        })
    }
    return ( 
        
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog title : </label>
                <input type="text" required value={title} onChange={(e)=>setTitle(e.target.value)}/>

                <label>Blog body : </label>
                <textarea required value={body} onChange={(e)=>{setBody(e.target.value)}}></textarea>

                <label>Blog author : </label>
                <select value={author} onChange={(e)=>setAuthor(e.target.value)}>
                    <option value="meraj">meraj</option>
                    <option value="taha">taha</option>
                    <option value="ali">ali</option>
                </select>
                {/* show loading message if IsPending is true and disabled submit button */}
                {!IsPending && <button>Add Blog</button>}
                {IsPending && <button disabled>Adding Blog.....</button>}
            </form>
        </div>
    );
}
 
export default Create;