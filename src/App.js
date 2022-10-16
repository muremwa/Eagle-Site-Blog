import { Routes, Route, BrowserRouter, useLocation, NavLink } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

import Home from './pages/home/Home';
import Error404 from './pages/home/Error404';
import Post from './pages/posts/Post';


function Title ({defaultTitle}) {
    const location = useLocation();
    const top = useRef(null);

    useEffect(() => {
        top.current.scrollIntoView();
    }, [location]);

    return (
        <div className="row justify-content-center mb-5 pb-5" ref={top}>
            <div className="col-md-7 text-center heading-section ftco-animate">
                <span><NavLink to='/'>Blog</NavLink></span>
                <h2>{defaultTitle.mainTitle}</h2>
                <span dangerouslySetInnerHTML={{__html: defaultTitle.miniTitle}} />
            </div>
        </div>
    );
}

function App() {
    const [defaultTitle, changeTitle] = useState({
        mainTitle: "Read my blog",
        miniTitle: "All posts"
    });

    const titleChanger = (titleObj) => changeTitle(titleObj);

    return (
        <BrowserRouter>
                <Title {...{defaultTitle}} />
                <Routes>
                    <Route path='/' element={<Home {...{titleChanger, defaultTitle}} />} />
                    <Route path='/posts/:blogSlug/' element={<Post {...{titleChanger}} />}/>
                    <Route path='*' element={<Error404/>} />
                </Routes>
        </BrowserRouter>
    )
}

export default App;
