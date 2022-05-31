import {useEffect, useState} from "react";
import { NavLink } from "react-router-dom";
import ReactMarkdown from 'react-markdown';

import '../../style/post.css';
import {CommentForm, Comments} from "./Comments";


const Tag = (props) => <NavLink to={`/?tag=${props.slug}`} className="tag-cloud-link">{props.name}</NavLink>;


export default function Post () {
    const [post, postUpdater] = useState({
        featureImageUrl: 'http://127.0.0.1:8000/media/blog/default_images/default_feature.png',
        date: 'October 20, 2021',
        author: {
            name: 'Muremwa',
            bio: 'Prone to error.',
            image: 'http://127.0.0.1:8000/media/blog/default_images/default_author_avatar.png',
            id: 20
        },
        commentCount: 10,
        title: 'This is a test blog',
        slug: 'muremwa-this-is-a-test-blog-1',
        tags: [
            {
                name: 'fiction',
                slug: 'fiction',
            },
            {
                name: 'science',
                slug: 'science'
            },
            {
                name: 'politics',
                slug: 'politics'
            },
            {
                name: 'medical theory',
                slug: 'medical-theory'
            }
        ],
        comments: [
            {
                id: 1,
                name: 'Kate Bush',
                message: 'Running up that hill. \n (A deal with God)',
                date: 'October 20, 2021 at 11:45AM'
            },
            {
                id: 2,
                name: 'Lauryn Hill',
                message: 'Killing me softly with his song',
                date: 'October 30, 2021 at 11:45PM'
            },
            {
                id: 3,
                name: 'Celine Dion',
                message: 'It\'s coming back to me now',
                date: 'October 20, 2021 at 11:45AM'
            },
            {
                id: 4,
                name: 'Kendrick Lamar',
                message: 'Sing about me, I\'m dying of thirst',
                date: 'October 20, 2021 at 11:45AM'
            },

        ],
    });

    const x = `
> What a __time__ to be alive
# React Bootstrap with Material Design
MDBootstrap for React

## Getting Started
To test, contribute or just see what we did follow few easy steps:
- clone the repository
- cd to the directory with the repository
- run \`yarn install\` (or \`npm install\` if you don't use yarn)
- run the app using \`yarn start\` (or \`npm start\`)
- to build project use \`yarn run build\` (od \`npm run build\`)
- \`yarn run remove-demo\` (or \`npm run remove-demo\`) removes demo app pages
- enjoy!

## Bugs
If you want to report a bug or submit your idea feel fre to open an issue

Before you report a bug, please take your time to find if an issue hasn't been reported yet

![sd](http://127.0.0.1:8000/media/blog/feature_images/91069_2.jpg)

We're also open to pull requests

## Something Missing?
If you still have some questions do not hesitate to ask us. Open an issue or [visit our Slack](https://mdbbetatest.slack.com)
    `;

    const tags = post.tags.map((_tag, i) => <Tag key={i} {..._tag} />);

    useEffect(() => {
        document.title = `Muremwa | Post - ${post.title}`;
    });

    return (
        <section id="post" className="ftco-section">
            <div className="container mt-5">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-8">
                        {/* Feature image */}
                        <img alt={`Feature for ${post.title}`} className="block-6" src={post.featureImageUrl}/>

                        {/* content */}
                        <div className="post-content" data-post-content="{{ post.content }}">
                            <ReactMarkdown children={x} />
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