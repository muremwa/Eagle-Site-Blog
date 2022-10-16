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

    const res = await fetch(`/blog/api/posts/${urlSearchParams}`, {method: "GET"});

    const blogs = await res.json();

    return blogs.map(cleaner);
}


export async function getSinglePost (slug) {
    const res = await fetch(`/blog/api/posts/${slug}`, {method: "GET"});
    return cleaner(await res.json());
}


export async function postComment (slug, formData) {
    const res = await fetch(`/blog/api/posts/${slug}/new-comment/`, {
        method: "POST",
        body: formData
    });
    const resJ = cleaner(await res.json());

    if (!resJ.id) {
        throw new Error('Could not comment')
    }

    return resJ
}