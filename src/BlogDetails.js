import { useParams,useHistory } from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => {
    const {id} = useParams()
    const {data:blog,error,isPending} = useFetch('http://127.0.0.1:8500/blogs/' + id)
    const history = useHistory()
    const handleClick = () => {
        fetch('http://127.0.0.1:8500/blogs/'+blog.id,{
            method : 'DELETE'
        }).then(()=>{
            history.push('/');
        })
    }

    return ( 
        <div className="blog-details">
            {isPending && <div>loading ....</div> }
            {error && <div>{error}</div>}
            {blog && (
                <article>
                    <h2>{blog.title}</h2>
                    <p>{blog.author}</p>
                    <section>{blog.body}</section>
                    <time >{blog.published_at}</time>
                    <button onClick={handleClick}>delete</button>
                </article>
            )}
        </div>    
    );
}
 
export default BlogDetails;