import React, { useState } from 'react';
import "./home.scss";
import List from './List';
import Logo from "../images/logo.svg"
import facebook from "../images/facebook.svg"
import twitter from "../images/twitter.svg"
import instagram from "../images/instagram.svg"
import linkedin from "../images/linkedin.svg"
import { Loader } from "./loader.js";

function PickMyLine() {

    const [prompt, setPrompt] = useState("");
    const [pickupLines, setPickupLines] = useState([]);
    const [gender, setGender] = useState("girls");
    const [loading, setLoading] = useState(false);


    const generateText = async (prompt, gender) => {
        try {
            const response = await fetch(`https://pml-service.onrender.com/api/generate?gender=${gender}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt
                }),
            });
            if (!response.ok) {
                throw new Error('The data could not be fetched');
            }

            const data = await response.json();
            let linesFetched = data.data.slice(1);
            let formattedLines = linesFetched.split('\n');
            setPickupLines(formattedLines.slice(1).filter((item) => item !== ""));
            setLoading(false);
            await saveDataToGoogleSheet();
        }
        catch (error) {
            console.log("Error occured - ", error);
        }
    }

    const saveDataToGoogleSheet = async () => {
        await fetch('https://pml-service.onrender.com/api/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }



    const inputChange = (event) => {
        const { value } = event.target;
        setPrompt(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        await generateText(prompt, gender);
    }

    const handleNextClick = (activePage, totalPages, clickAction) => {
        if (activePage === totalPages.length - 1) return
        clickAction(activePage + 1)
    }

    const handlePrevClick = (activePage, clickAction) => {
        if (activePage !== 0) clickAction(activePage - 1)
    }

    const handleGenderChange = (event) => {
        const { value } = event.target;
        setGender(value);
    }


    return (<>
        <div className="content">
            <header className="header-section">
                <section className="left-section">
                    <div className="logo"><img className="logo-img" src={Logo} alt="logo" />
                        <div className="logo-text">Pick My Line</div></div>
                </section>
                <section className="right-section"></section>
            </header>
            <section className="center-heading">
                <div className="bold-heading">
                    Pick your favourite line to flat your <span className="hightlight-text">partner!</span>
                </div>
                <div className="sub-heading">
                    Not able to start conversation even after getting matched? Here is a ChatGPT powered pickup line generator for you!!
                </div>
            </section>

            <section className="main-content-container">
                <section className="main-content">
                    <section>
                        <form onSubmit={handleSubmit} className="container">
                            <section className="search-container">
                                <div className="pickupline-text">Pickup line for : </div>
                                <input
                                    type="text"
                                    placeholder={"handsome/cute/brown"}
                                    required
                                    name="prompt"
                                    value={prompt}
                                    onChange={inputChange}
                                    className="search-box"
                                />
                                <section className="gender-dropdown">
                                    {/* <label htmlFor="gender">Select gender</label> */}
                                    <select name="gender" id="cars" onChange={handleGenderChange} value={gender}>
                                        <option value="girls">Girls</option>
                                        <option value="boys">Guys</option>
                                    </select>
                                </section>

                            </section>
                            <section className="getyourline-button">
                                <button type="submit" className={`search-button ${loading ? 'inactive' : ''}`} disabled={loading}>
                                    Get your Line
                                </button>
                            </section>

                        </form>
                    </section>
                    <List pickupLines={pickupLines}
                        handleNextClick={handleNextClick}
                        handlePrevClick={handlePrevClick}
                    />
                    <Loader showLoader={loading} />
                </section>
            </section>

        </div>
        <footer>
            <section className="footer-logo">
                <div className="logo"><img className="logo-img" src={Logo} alt="logo" />
                    <div className="logo-text">Pick My Line</div></div>
            </section>
            <section className="links">
                <div><a href="https://linktr.ee/pickmyline" target="_blank" rel="noreferrer">Team</a></div>
                <div><a href="https://forms.gle/zujJufCBbWvVVofS6" target="_blank" rel="noreferrer">Contact Us</a></div>
            </section>
            <section className="social-handles">
                <img src={facebook} alt="facebook_icon" onClick={saveDataToGoogleSheet} />
                <img src={twitter} alt="twitter_icon" onClick={saveDataToGoogleSheet} />
                <img src={instagram} alt="instagram" onClick={saveDataToGoogleSheet} />
                <img src={linkedin} alt="linkedin" onClick={saveDataToGoogleSheet} />
            </section>
            <section className="links">
                <div>Designed with love by <a href="https://destlab.in/" target="_blank" rel="noreferrer" >DestLab</a></div>
            </section>
        </footer>
    </>
    )
}

export default PickMyLine