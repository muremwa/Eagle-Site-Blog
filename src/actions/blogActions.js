import dispatcher from "../dispatcher/dispatcher";

const vpost =
    {
        id: 3,
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
        slug: 'kim-wild-blog-3',
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
    content: `# This post is wild`
};

export function fetchBlog (slug) {
    // action to actually fetch blog
    setTimeout(() => {
        const lpost = slug === vpost.slug? vpost: null;
        dispatcher.dispatch({
            type: 'FETCHED_BLOG',
            load: lpost,
            arg: slug
        });
    }, 3000);
}