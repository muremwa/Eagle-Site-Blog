import dispatcher from "../dispatcher/dispatcher";
import ajax from './ajaxWrapper';

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


const vposts = [

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
    {
        id: 8,
        featureImageUrl: 'http://127.0.0.1:8000/media/blog/feature_images/91069_2.jpg',
        date: 'October 20, 2021',
        author: {
            name: 'Kimberly Smith',
            bio: 'Prone to error.',
            image: 'http://127.0.0.1:8000/media/blog/default_images/default_author_avatar.png',
            id: 7
        },
        commentCount: 10,
        title: 'Temper Tantrum',
        slug: 'temper-tantrum-kimberly-smith-7',
        tags: [
            {
                name: 'fiction',
                slug: 'fiction',
            },
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
        ],
        content: `
> What a __time__ to be alive
# React Bootstrap with Material Design
MDBootstrap for React
`
    },
];
//
// export function fetchBlog (slug) {
//     // action to actually fetch blog
//     setTimeout(() => {
//         const lpost = slug === vpost.slug? vpost: null;
//         dispatcher.dispatch({
//             type: 'FETCHED_BLOG',
//             load: lpost,
//             arg: slug
//         });
//     }, 3000);
// }

// export function fetchAllPosts (params) {
//     setTimeout(() => {
//         dispatcher.dispatch({
//             type: 'FETCHED_BLOGS',
//             load: vposts
//         });
//     }, 2000);
// }




// ----------------------------------------------------------------------------------------//
const cases = {
    HUNGARIAN_NOTATION: 'HN',
    NORMAL_CASE: 'NR',
    CAMEL_CASE: 'CS',
    SNAKE_CASE: 'SC',
};

/**
 * @param {string} toChange
 * @param {cases} currentCase
 * @param {cases} changeTo
 * @returns {string} Returns an string in the new case type
 */
function caseChanger (toChange, currentCase, changeTo) {
    if ([toChange, currentCase, changeTo].some((arg) => arg === undefined)) {
        throw new Error('Missing arguments');
    }

    if ([toChange, currentCase, changeTo].some((arg) => (typeof arg) !== 'string')) {
        throw new Error('Wrong argument type');
    }

    if (currentCase === changeTo) {
        return toChange;
    }

    let temp;
    let result;

    switch (currentCase) {
        case cases.CAMEL_CASE:
            temp = toChange.split(/([A-Z][a-z]*)/).filter(Boolean);
            break;

        case cases.HUNGARIAN_NOTATION:
            temp = toChange.split(/([A-Z][a-z]*)/).filter(Boolean);
            break;

        case cases.SNAKE_CASE:
            temp = toChange.split("_");
            break;

        case cases.NORMAL_CASE:
            temp = toChange.split(/\s/);
            break;

        default:
            throw new Error(`Converting from '${currentCase}' not supported`);
    }


    switch (changeTo) {
        case cases.CAMEL_CASE:
            result = temp.map((char) => `${char[0].toUpperCase()}${char.substring(1).toLowerCase()}`).join('');
            break;

        case cases.HUNGARIAN_NOTATION:
            result = temp.map((char, index) => {
                char = char.toLowerCase();
                if (index > 0) {
                    char = `${char[0].toUpperCase()}${char.substring(1).toLowerCase()}`;
                }

                return char
            }).join('');
            break;

        case cases.SNAKE_CASE:
            result = temp.map((char) => char.toLowerCase()).join('_');
            break;

        case cases.NORMAL_CASE:
            result = temp.map((char) => char.toLowerCase()).join(' ');
            break;

        default:
            throw new Error(`Converting to '${changeTo}' not supported`);
    }

    return result;
}

function cleaner (obj = {}) {
    /*
        clean generic data from the backend recursively!!!
    */
    const isObject = (item) => typeof item === 'object' && item !== null;

    if (!isObject(obj)) {
        return {};
    }

    // create a new object holder
    const newObj = {};

    // loop through all items and change case
    for (let key of Object.keys(obj)) {
        const newKey = caseChanger(key, cases.SNAKE_CASE, cases.HUNGARIAN_NOTATION);
        let value = obj[key];

        // recursively clean arrays and other objects
        if (Array.isArray(value)) {
            value = value.map(cleaner);
        } else if (isObject(value)) {
            value = cleaner(value);
        }

        newObj[newKey] = value;
    }
    return newObj;
}

export async function getPosts(params = '') {
    // clean url search
    const searchParams = new URLSearchParams(params);

    if (params) {
        const allowedKeys = ['on', 'before', 'after', 'tag', 'author'];

        searchParams.forEach((_, key) => {
            if (!allowedKeys.includes(key)) {
                searchParams.delete(key)
            }
        });

        if (searchParams.has('on') && (searchParams.has('before') || searchParams.has('after'))) {
            searchParams.delete('before');
            searchParams.delete('after');
        }
    }

    const urlSearchParams = params? `?${searchParams.toString()}`: '';

    const res = await fetch(`/blog/api/posts/${urlSearchParams}`, {
        method: "GET"
    });

    const blogs = await res.json();

    return blogs.map(cleaner);
}




















