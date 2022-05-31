import { Routes, Route, BrowserRouter, useLocation, NavLink } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

import Home from './pages/home/Home';
import Error404 from './pages/home/Error404';
import Post from './pages/posts/Post';

import './App.css';


function Title () {
    const [defaultTitle, titleChanger] = useState("Read my blog");
    const location = useLocation();
    const top = useRef(null);

    useEffect(() => {
        top.current.scrollIntoView();
    }, [location]);

    return (
        <div className="row justify-content-center mb-5 pb-5" ref={top}>
            <div className="col-md-7 text-center heading-section ftco-animate">
                <span><NavLink to='/'>Blog</NavLink></span>
                <h2>{defaultTitle}</h2>
                <span>All posts</span>
            </div>
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
                <Title />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/posts/:blogSlug/' element={<Post />}/>
                    <Route path='*' element={<Error404/>} />
                </Routes>
        </BrowserRouter>
    )
}

export default App;
