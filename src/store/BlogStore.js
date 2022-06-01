import { EventEmitter } from "events";

import dispatcher from "../dispatcher/dispatcher";


class BlogStore extends EventEmitter {
    posts = [
        {
            id: 1,
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
            content: `
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
    `
        },
    ];

    getAllPosts () {
        return this.posts;
    };

    filterPosts () {
        return this.posts;
    }

    /**
     * Returns a specific post
     * @param slug {string}
     **/
    getPost (slug) {
        return this.posts.find((post) => post.slug === slug);
    };

    handleActions (action) {
        const { type, load, arg } = action;

        switch (type) {
            case 'FETCHED_BLOG':
                if (load) {
                    this.posts.push(load);
                }
                this.emit(`change_to_${arg}`);
                break;

            default:
                break;
        }
    }
}

const blogStore = new BlogStore();
dispatcher.register(blogStore.handleActions.bind(blogStore));
export default blogStore;