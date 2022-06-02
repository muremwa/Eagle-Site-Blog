import {useEffect, useState} from "react";
import {NavLink, useParams} from "react-router-dom";
import ReactMarkdown from 'react-markdown';

import '../../style/post.css';
import {CommentForm, Comments} from "./Comments";
import store from "../../store/BlogStore";
import Error404 from "../home/Error404";
import {fetchBlog} from "../../actions/blogActions";


const Tag = (props) => {
    return <NavLink to={`/?tag=${props.name}`} className="tag-cloud-link">{props.name}</NavLink>
};


function Post ({ post }) {
    const tags = post.tags.map((_tag, i) => <Tag key={i} {..._tag} />);
    document.title = `Muremwa | Post - ${post.title}`;

    return (
        <section id="post" className="ftco-section">
            <div className="container mt-5">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-8">
                        {/* Feature image */}
                        <img alt={`Feature for ${post.title}`} className="block-6" src={post.featureImageUrl}/>

                        {/* content */}
                        <div className="post-content" data-post-content="{{ post.content }}">
                            <ReactMarkdown children={post.content} />
                        </div>

                        {/* Tags */}
                        <div className="tagcloud">{tags}</div>

                        {/* About author */}
                        <div className="about-author d-flex pt-5">
                            <div className="bio align-self-md-center mr-4">
                                <img src={post.author.image} alt="Image placeholder" className="img-fluid mb-4" />
                            </div>
                            <div className="desc align-self-md-center">
                                <h3>About The Author</h3>
                                <p>{post.author.bio}</p>
                            </div>
                        </div>

                        {/* Comments */}
                        <Comments comments={post.comments} title={post.title} />

                        {/* Commenting form */}
                        <CommentForm/>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default function PostMain () {
    const { blogSlug } = useParams();
    const [ post, postUpdater ] = useState(store.getPost(blogSlug));
    const [fetch, fetchUpdater] = useState(true);
    const [postNotFound, postNotFoundUpdate] = useState(false);

    const loadNewPost = () => {
        postUpdater(store.getPost(blogSlug));
        postNotFoundUpdate(!Boolean(post));
    };

    useEffect(() => {
        store.on(`change_to_${blogSlug}`, loadNewPost);

        return () => store.removeListener(`change_to_${blogSlug}`, loadNewPost);
    });

    // if post doesn't exist and fetch hasn't happened
    if (!post && fetch) {
        fetchBlog(blogSlug);
        fetchUpdater(false);
    }

    if (post) {
        return <Post post={post} />
    } else {
        if (postNotFound) {
            return <Error404 item={'blog post'}/>
        } else {
            return <h2 className="text-center">Loading post...</h2>
        }
    }
}