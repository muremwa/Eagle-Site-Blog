import { NavLink } from "react-router-dom";


// single blog entry
function BlogEntry (props) {
    const { id, featureImageUrl, date, author, commentCount, title } = props;
    const linkToBlog = `posts/${title}-${id}`;
    const featureImgLinkStyle = {
        backgroundImage: `url(${featureImageUrl})`
    };

    return (
        <div className="col-md-4 ftco-animate">
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
    const blogs = [
        {
            id: 1,
            featureImageUrl: 'http://127.0.0.1:8000/media/blog/default_images/default_feature.png',
            date: 'October 20, 2021',
            author: {
                name: 'Muremwa',
                bio: '',
                image: 'http://127.0.0.1:8000/blog/posts/temper-tantrum-kimberly-smith-7/',
                id: 20
            },
            commentCount: 10,
            title: 'This is a test blog'
        }
    ].map((blog) => <BlogEntry key={blog.id} {...blog}/>);
    return (
        <div className="row">
            {blogs}
        </div>
    )
}