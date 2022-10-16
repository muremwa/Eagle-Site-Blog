import {NavLink, useLocation} from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import store from "../../store/BlogStore";
import {fetchAllPosts} from "../../actions/blogActions";


// single blog entry
function BlogEntry (props) {
    const { featureImageUrl, date, author, commentCount, title, slug, easyDate } = props;
    const linkToBlog = `posts/${slug}/`;
    const featureImgLinkStyle = {
        backgroundImage: `url(${featureImageUrl})`
    };

    const entryDiv = useRef(null);

    useEffect(() => {
        entryDiv.current.classList.add('fadeInUp');
        entryDiv.current.classList.add('ftco-animated');
    });

    return (
        <div className="col-md-4 ftco-animate" ref={entryDiv}>
            <div className="blog-entry">
                <NavLink to={linkToBlog} style={featureImgLinkStyle} className="block-20"/>

                <div className="text p-4 d-block">
                    <div className="meta mb-3">
                        <div><NavLink to={`/?on=${easyDate}`}>{date} </NavLink></div>
                        <div><NavLink to={`/?author=${author.name}`}>{author.name} </NavLink></div>
                        <div><span className="meta-chat"><span className="icon-chat"/> {commentCount}</span></div>
                    </div>
                    <h3 className="heading"><NavLink to={linkToBlog}>{title}</NavLink></h3>
                </div>

            </div>
        </div>
    )
}


function NoPosts (props) {
    const { loading, title } = props;
    const noPostsDiv = useRef(null);

    useEffect(() => {
        noPostsDiv.current.classList.add('fadeInUp');
        noPostsDiv.current.classList.add('ftco-animated');
    });

    return (
        <div className="col-md-12 text-center heading-section ftco-animate" ref={noPostsDiv}>
            <span>coming soon</span>
            <h2>
                {loading? 'loading posts...': title.miniTitle.replace('All Posts', 'No posts for now')}
            </h2>
        </div>
    )
}


// all blogs/blog index
export default function Home ({titleChanger, defaultTitle}) {
    document.title = 'Muremwa | Blog - All Posts';
    const [blogs, blogsUpdate] = useState(store.getAllPosts());
    const [fetchBlogs, updateFetch] = useState(true);
    const [noPosts, noPostsUpdate] = useState(false);
    const location = useLocation();

    const homeTitle = () => {
        const title = "All Posts"
        const searchParams = new URLSearchParams(location.search);

        const viceSuffixes = {
            author: searchParams.has('author')? `by ${searchParams.get('author')}`: null,
            tag: searchParams.has('tag')? `tagged ${searchParams.get('tag')}`: null,
            on: searchParams.has('on')? `dated ${searchParams.get('on')}`: null
        }

        if (!viceSuffixes.on) {
            const range = searchParams.has('before') && searchParams.has('after');
            viceSuffixes['before'] = searchParams.has('before')? `posted ${range? 'between': 'before'} ${searchParams.get('before')}`: null;
            viceSuffixes['after'] = searchParams.has('after')? `${range? 'and': 'posted after'} ${searchParams.get('after')}`: null;
        }

        const titleSuffix = Object.values(viceSuffixes).join(' ')

        titleChanger({
            mainTitle: "Read my blog",
            miniTitle: `${title} ${titleSuffix}`
        })
    }


    if (fetchBlogs) {
        fetchAllPosts(location.search, () => noPostsUpdate(true));
        updateFetch(false);
    }

    const updatePosts = () => {
        const _tempBlogs = store.getAllPosts();
        blogsUpdate(_tempBlogs);
        noPostsUpdate(!Boolean(_tempBlogs.length));
    };

    useEffect(() => {
        store.on('change_to_posts', updatePosts);

        return () => store.removeListener('change_to_posts', updatePosts);
    });

    // fetch posts when URL changes
    useEffect(() => {
        homeTitle();
        updateFetch(true);
    }, [location]);

    const mappedBlogs = blogs.map((blog, key) => <BlogEntry key={key} id={key} {...blog}/>);

    return (
        <div className="row">
            {mappedBlogs.length? mappedBlogs: <NoPosts loading={!noPosts} title={defaultTitle}/>}
        </div>
    )
}