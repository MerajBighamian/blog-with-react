import BlogList from './BlogList';
import useCsrfToken from './useCsrfToken';
import useFetch from './useFetch';

const Home = () => {
    const {data:blogs,isPending,error} = useFetch('http://127.0.0.1:8500/blogs/');
    const csrfToken = useCsrfToken()
    console.log(csrfToken)
    return ( 
        <div className="home">
            {error && <div>{error}</div>}
            {isPending && <div>loading ...</div>}
            {blogs && <BlogList blogs={blogs} title='All Blogs!'/>}
            
        </div>
     );
}
 
export default Home;