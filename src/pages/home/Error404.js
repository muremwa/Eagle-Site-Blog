import {useEffect} from "react";


export default function Error404 () {
    const st = {
        height: '40vh'
    };

    useEffect(() => {
        document.title = 'Muremwa | 404 - Page Not Found'
    });

    return (
        <div className="text-center">
            <img style={st} src="http://127.0.0.1:8000/static/svg/404.svg" alt="404 graphic"/>
            <h2>The page you requested does not exist</h2>
        </div>
    )
}