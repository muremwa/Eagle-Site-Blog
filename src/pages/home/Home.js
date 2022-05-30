import { NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";


// single blog entry
function BlogEntry (props) {
    const { featureImageUrl, date, author, commentCount, title, slug } = props;
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
                        <div><NavLink to={`/?on=${date}`}>{date} </NavLink></div>
                        <div><NavLink to={`/?author=${author.name}`}>{author.name} </NavLink></div>
                        <div><span className="meta-chat"><span className="icon-chat"/> {commentCount}</span></div>
                    </div>
                    <h3 className="heading"><NavLink to={linkToBlog}>{title}</NavLink></h3>
                </div>

            </div>
        </div>
    )
}


// all blogs/blog index
export default function Home () {
    const [blogs, blogsUpdate] = useState(
        [
            {
                featureImageUrl: 'http://127.0.0.1:8000/media/blog/default_images/default_feature.png',
                date: 'October 20, 2021',
                author: {
                    name: 'Muremwa',
                    bio: '',
                    image: 'http://127.0.0.1:8000/blog/posts/temper-tantrum-kimberly-smith-7/',
                    id: 20
                },
                commentCount: 10,
                title: 'This is a test blog',
                slug: 'muremwa-this-is-a-test-blog-1',
            },
        ]
    );

    const mappedBlogs = blogs.map((blog, key) => <BlogEntry key={key} id={key} {...blog}/>);

    useEffect(() => {
        return document.title = 'Muremwa | Blog - All Posts';
    });


    return (
        <div className="row">
            {mappedBlogs}
        </div>
    )
}