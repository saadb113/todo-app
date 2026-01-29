
import { useState } from 'react';
import '../App.css';
import {Link, useNavigate} from "react-router-dom"
function App() {
    const navigate = useNavigate();
    const [activeFaq, setactiveFaq] = useState(0);
    const [faqData, setfaqData] = useState([
        {question : "Is my data safe?",
        p:"Your notes are protected and stored safely, so your ideas stay private."
        },
        {
            question : "Can I use Noto on multiple devices?",
            p:"Yes, you can access your notes from any device with internet access."
        },
        {
            question : "Is Noto free to use?",
            p:"Yes, Noto is completely free to use."
        },
        {
            question : "Do I need an account to create notes?",
            p:"No, you can create notes without an account."
        }
    ]);
    return (
        <div className="App">
            <header>
                <nav>

                <div className="logo"></div>
<div className="links">

                <Link>Features</Link>
                <Link>Faqs</Link>
                <button onClick={()=>navigate("/signin")} className="btn">Log In</button>
</div>
                </nav>
            </header>
            <section className="heroSection">
                <div className="herosection-left">
                    <h1>Your thoughts.
                        Beautifully organized.</h1>
                    <p>Capture ideas, plans, and reminders in a clean and focused notes experience.
                    </p>
                    <button onClick={()=>navigate("/signin")} className='btn'>Start Writing</button>
                </div>
                <div className="herosection-right">
                    <div className="notes-card">
                        <div className="note-content">
                            <h2>The beginning of screenless design: UI jobs to be taken over by Solution Architect</h2>
                            <p>13 Things You Should Give Up If You Want To Be a Successful UX Designer</p>
                        </div>
                        <div className="date">
                            <p>May 21, 2020</p>
                        </div>
                    </div>
                    <div className="notes-card">
                        <div className="note-content">
                            <h2>The beginning of screenless design: UI jobs to be taken over by Solution Architect</h2>
                            <p>13 Things You Should Give Up If You Want To Be a Successful UX Designer</p>
                        </div>
                        <div className="date">
                            <p>May 21, 2020</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className='features'>
            <h1>Designed to help you think better</h1>
            <p>Noto is built for focus, speed, and simplicity — so your ideas flow without friction.</p>
            <div className="cards">
                <div className="card">
                    <div className="icon"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg></div>
                    <h2>Fast & Responsive</h2>
                    <p>Write and edit notes instantly with a smooth, distraction-free experience.</p>
                </div>
                <div className="card">
                    <div className="icon"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg></div>
                    <h2>Secure by Default</h2>
                    <p>Your notes are protected and stored safely, so your ideas stay private.</p>
                </div>
                <div className="card">
                    <div className="icon"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></div>
                    <h2>Smart Organization</h2>
                    <p>Quickly find what you need with powerful search and clean structure.</p>
                </div>
                <div className="card">
                    <div className="icon"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line></svg></div>
                    <h2>Minimal & Focused</h2>
                    <p>A calm interface designed to reduce noise and help you stay in flow.</p>
                </div>
            </div>
            </section>
            <section className="faqs">
                <h1>Questions? We’ve got answers.</h1>
                <p>Everything you need to know before you start writing your next idea.</p>
                <div className="accordians">
                    {faqData.map((item, index)=>(
                            <>
                    <div onClick={()=>setactiveFaq(index)} className={`accordian ${activeFaq === index ? "active" : ""}`}>
                        <h2>{item.question} <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="faq-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></h2>
                        <p>{item.p}</p>
                    </div>
                            </>
                        )
                    )}
                </div>
            </section>
        </div>
    );
}

export default App;
