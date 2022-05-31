function Comment (props) {
    const { id, name, date, message } = props;
    const commentId = `comment-${id}`;

    return (
        <li className="comment" id={commentId}>
            <div className="comment-body">
                <h3>{name}</h3>
                <div className="meta">{date}</div>
                <p>{message}</p>
            </div>
        </li>
    )
}

function CommentsList ({ comments }) {
    const commentsComps = comments.map((_comment) => <Comment key={_comment.id} {..._comment}/>);

    return (
        <ul className="comment-list">{commentsComps}</ul>
    )
}

function NoComments ({ title }) {
    return <span >Be the first to comment on {title}</span>
}

export function Comments (props) {
    const { title, comments } = props;
    const commentsTitle = comments.length > 0? ` (${comments.length})`: '';
    const content = comments.length > 0? <CommentsList comments={comments} />: <NoComments title={title} />;

    return (
        <div className="pt-5 mt-5">
            <h3 className="mb-5">Comments{commentsTitle}</h3>
            {content}
        </div>
    )
}


export function CommentForm () {
    const formSubmitHandling = (event_) => event_.preventDefault();

    return (
        <div className="comment-form-wrap pt-5">
            <h3 className="mb-5">Leave a comment</h3>

            <form method="post" onSubmit={formSubmitHandling}>
                <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input type="text" className="form-control" id="name" name="name" required />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" name="email" />
                </div>

                <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea name="message" id="message" cols="30" rows="10" className="form-control" required />
                </div>
                <div className="form-group">
                    <input type="submit" value="Post Comment" className="btn py-3 px-4 btn-primary" />
                </div>

            </form>
        </div>
    )
}
