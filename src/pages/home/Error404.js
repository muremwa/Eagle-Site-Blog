export default function Error404 ({ item }) {
    const st = {
        height: '40vh'
    };

    document.title = 'Muremwa | 404 - Page Not Found';

    return (
        <div className="text-center">
            <img style={st} src="http://127.0.0.1:8000/static/svg/404.svg" alt="404 graphic"/>
            <h2>The {item? item: 'page'} you requested does not exist</h2>
        </div>
    )
}