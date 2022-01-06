import { useState } from "react";

import initialEmails from "./data/emails";

import "./App.css";
import InboxList from "./components/InboxList";
import Emails from "./components/Emails";
import Header from "./components/Header";
import SingleEmail from "./components/SingleEmail";

const getReadEmails = (emails) => emails.filter((email) => !email.read);

const getStarredEmails = (emails) => emails.filter((email) => email.starred);

function App() {
    const [emails, setEmails] = useState(initialEmails);
    const [hideRead, setHideRead] = useState(false);
    const [currentTab, setCurrentTab] = useState("inbox");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedEmailId, setSelectedEmailId] = useState(0);

    const unreadEmails = emails.filter((email) => !email.read);
    const starredEmails = emails.filter((email) => email.starred);

    function search(keyword) {
        setSearchTerm(keyword);
    }
    function displaySingleEmail(emailId) {
        const email = emails.find((email) => email.id === emailId);
        return <SingleEmail setSelectedEmailId = {setSelectedEmailId} email={email}/>;
    }
    const toggleStar = (targetEmail) => {
        const updatedEmails = (emails) =>
            emails.map((email) =>
                email.id === targetEmail.id
                    ? { ...email, starred: !email.starred }
                    : email
            );
        setEmails(updatedEmails);
    };

    const toggleRead = (targetEmail) => {
        const updatedEmails = (emails) =>
            emails.map((email) =>
                email.id === targetEmail.id
                    ? { ...email, read: !email.read }
                    : email
            );
        setEmails(updatedEmails);
    };

    let filteredEmails = emails;
    if (searchTerm)
        filteredEmails = filteredEmails.filter((email) =>
            email.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    if (hideRead) filteredEmails = getReadEmails(filteredEmails);

    if (currentTab === "starred")
        filteredEmails = getStarredEmails(filteredEmails);

    return (
        <div className="app">
            <Header search={search} />
            <nav className="left-menu">
                <InboxList
                    currentTab={currentTab}
                    setCurrentTab={setCurrentTab}
                    unreadEmails={unreadEmails}
                    starredEmails={starredEmails}
                    hideRead={hideRead}
                    setHideRead={setHideRead}
                    setSelectedEmailId={setSelectedEmailId}
                />
            </nav>

            <main className="emails">
                {selectedEmailId === 0 ? (
                    <Emails
                        setSelectedEmailId={setSelectedEmailId}
                        emails={filteredEmails}
                        toggleRead={toggleRead}
                        toggleStar={toggleStar}
                    />
                ) : (
                    displaySingleEmail(selectedEmailId)
                )}
            </main>
        </div>
    );
}

export default App;
