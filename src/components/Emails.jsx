import Email from "./Email";
import "./emails.css";
function Emails(props) {
    return (
        <ul>
            
            {props.emails.map((email, index) => (
                <Email
                setSelectedEmailId = {props.setSelectedEmailId}
                    email={email}
                    index={index}
                    toggleRead={props.toggleRead}
                    toggleStar={props.toggleStar}
                />
            ))}
        </ul>
    );
}

export default Emails;
