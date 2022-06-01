import { EventEmitter } from "events";

import dispatcher from "../dispatcher/dispatcher";


class BlogStore extends EventEmitter {
    posts = [];

    getAllPosts () {
        return this.posts;
    };

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

            case 'FETCHED_BLOGS':
                if (load && Array.isArray(load)) {
                    this.posts = [...load];
                }
                this.emit('change_to_posts');
                break;

            default:
                break;
        }
    }
}

const blogStore = new BlogStore();
dispatcher.register(blogStore.handleActions.bind(blogStore));
export default blogStore;