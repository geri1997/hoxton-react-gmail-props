function SingleEmail(props) {
    return (
        <>
            <button
                style={{ width: "50px", height: "50px" }}
                onClick={() => props.setSelectedEmailId(0)}
            >
                ◀
            </button>
            <h2>{props.email.sender}</h2>
            <p>{props.email.title}</p>
        </>
    );
}

export default SingleEmail