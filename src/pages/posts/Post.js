import { useEffect, useRef } from "react";
import { NavLink, useParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from  'rehype-raw';
import { useQuery } from "react-query";

import '../../style/post.css';
import { CommentForm, Comments } from "./Comments";
import Error404 from "../home/Error404";
import { getSinglePost } from "../../actions/blogActions";


const Tag = (props) => {
    return <NavLink to={`/?tag=${props.name}`} className="tag-cloud-link">{props.name}</NavLink>
};

const FeatureImage = ({title, url}) => {
    return <img alt={`Feature for ${title}`} className="block-6" src={url}/>
}


function Post ({ post, titleChanger }) {
    const commentSection = useRef(null);
    const errorSection = useRef(null);
    const tags = post.tags.map((_tag, i) => <Tag key={i} {..._tag} />);
    document.title = `Muremwa | Post - ${post.title}`;

    useEffect (() => {
        titleChanger({
            mainTitle: post.title,
            miniTitle: `<small><i>by</i></small> ${post.author.name}`
        });
    }, [post]);

    return (
        <section id="post" className="ftco-section">
            <div className="container mt-5">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-8">
                        {/* Feature image */}
                        {post.noFeatureImage? void 0: <FeatureImage title={post.title} url={post.featureImageUrl} />}

                        {/* content */}
                        <div className="post-content" data-post-content="{{ post.content }}">
                            <ReactMarkdown children={post.content} rehypePlugins={[rehypeRaw]} />
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
                        <Comments err={errorSection} top={commentSection} comments={post.comments} title={post.title} />

                        {/* Commenting form */}
                        <CommentForm err={errorSection} top={commentSection}/>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default function PostMain ({ titleChanger }) {
    const { blogSlug } = useParams();
    const { status, data } = useQuery(['posts', blogSlug], () => getSinglePost(blogSlug));

    if (data) {
        return <Post {...{post: data, titleChanger}} />
    } else {
        if (status === 'success') {
            return <Error404 item={'blog post'}/>
        } else if (status === 'loading') {
            return <h2 className="text-center">Loading post...</h2>
        } else if (status === 'error') {
            return <h2 className="text-center">An error occurred loading post</h2>
        }
    }
}