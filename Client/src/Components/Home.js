import { useContext, useEffect, useState, useRef } from "react";
import { UserLoginContext } from "../App";
import { GridLayout } from "./GridLayout";
import { genre } from "./ListContent";
import { Audio } from "./Audio";
import { developer_data } from "../developer_data.js";
import { Developer } from "./Developer.js";
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"

export const Home = () => {
    const { isLoggedIn, isAdminLoggedIn, loggedInUserData } = useContext(UserLoginContext);
    const [fetchedSongs, setFetchedSongs] = useState([]);

    // Fetch Demo Songs
    const fetchDemoSongs = async () => {
        // GET request to our API server .. ⬆
        const baseURL = 'http://localhost:4000/getSampleSongs';
        let response;

        try {
            response = await axios.get(baseURL);
        } catch (err) {
            response = err.response;
        }

        if (response.data.serverResponse.responseCode === 200) {
            setFetchedSongs(response.data.serverResponse.responseData);
        } else {
            alert(`ERROR : ${response.data.serverResponse.message}`);
        }
    }
    useEffect(() => {
        fetchDemoSongs();
    }, []);

        //paypal sandbox
        const DonateButton = ({ currency, amount }) => {
            const amountRef = useRef(amount);
            useEffect(() => {
              amountRef.current = amount;
            }, [amount]);
            return (
                <PayPalButtons
                  // forceReRender={[currency, amount]}
                  style={{ color: "black", label: "donate" }}
                  fundingSource="paypal"
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: amountRef.current,
                            breakdown: {
                              item_total: {
                                currency_code: currency,
                                value: amountRef.current
                              }
                            }
                          },
                          items: [
                            {
                              name: "Cat Fundraiser",
                              description:
                                "All proceeds directly support Furby's care and recovery.",
                              quantity: "1",
                              unit_amount: {
                                currency_code: currency,
                                value: amountRef.current
                              },
                              category: "DONATION"
                            }
                          ]
                        }
                      ]
                    });
                  }}
                />
              );
            };
            
            function DonateForm() {
              const [amount, setAmount] = useState("5.00");
              return (
                <form className="DonateForm">
                  <AmountPicker
                    onAmountChange={(e) => {
                      setAmount(e.target.value);
                    }}
                  />
                  <DonateButton currency="USD" amount={amount} />
                </form>
              );
            }
            function AmountPicker({ onAmountChange }) {
                return (
                  <fieldset onChange={onAmountChange}>
                    <legend>Donation Amount</legend>
                    <label>
                      <input type="radio" value="5.00" defaultChecked="true" name="amount" />
                      5.00
                    </label>
                    <label>
                      <input type="radio" value="10.00" name="amount" id="radio-6" />
                      10.00
                    </label>
                    <label>
                      <input type="radio" value="15.00" name="amount" id="radio-9" />
                      15.00
                    </label>
                  </fieldset>
                );
              }
              
              


    // if user is logged in greet them
    if (isLoggedIn) {
        // Admin
        if (isAdminLoggedIn) {
            return (
                <>
                    <main>
                        <h2>Welcome Admin {loggedInUserData?.name}🦸‍♂️</h2>
                    </main>
                </>
            )
        } else {
            return (
                <>
                    <main>
                        {/* <h2>Welcome User {loggedInUserData?.name}</h2> */}
                        <GridLayout list={genre} alt="" ></GridLayout>
                    </main>
                </>
            )
        }

    } else {
        return (
            <main>
                <h1 className="componentTitle">Wide range of song genre</h1>
                <GridLayout list={genre}></GridLayout>
                {/* Featured Artist */}
                <div id="featuredArtist">
                    <h1>Featured artists</h1>
                    <div className="artist">
                        {/* Artist Image */}
                        <section className="artistImageContainer">
                            <img src={`http://localhost:4000/Artist_Image/1669322507000_Shreya_Goshal_Twitter (2).jfif`} alt="" loading="lazy" />
                        </section>
                        <strong className="artistName">Shreya Goshal</strong>
                    </div>
                    <div className="artist">
                        {/* Artist Image */}
                        <section className="artistImageContainer">
                            <img src={`http://localhost:4000/Artist_Image/1669321850637_Photo by Elizeu Dias on Unsplash.jpg`} alt="" loading="lazy" />
                        </section>
                        <strong className="artistName">Barra da Tijuca</strong>
                    </div>
                    <div className="artist">
                        {/* Artist Image */}
                        <section className="artistImageContainer">
                            <img src={`http://localhost:4000/Artist_Image/1669323635305_Shaan_Facebook.jpg`} alt="" loading="lazy" />
                        </section>
                        <strong className="artistName">Shaan</strong>
                    </div>
                    <div className="artist">
                        {/* Artist Image */}
                        <section className="artistImageContainer">
                            <img src={`http://localhost:4000/Artist_Image/1669321965384_Photo by Claudia Raya on Unsplash.jpg`} alt="" loading="lazy" />
                        </section>
                        <strong className="artistName">Claudia Raya</strong>
                    </div>
                </div>
                {/* Songs */}
                <div id="featuredSong">
                    <h1>Demo Songs</h1>
                    {/* Dynamic Rendering */}
                    {fetchedSongs ? fetchedSongs.map((currentSong) => <Audio songData={currentSong} key={currentSong._id} />) : ""}
                </div>

                {/* About Team Members 🧑‍🤝‍🧑*/}
                <div id="mainTeamMembersContainer">
                    <h1>Meet Our Developers</h1>
                    {/* Dynamic Rendering */}
                    {developer_data.map((currentDeveloper) => <Developer devData={currentDeveloper} key={currentDeveloper.gitHub} />)}
                </div>

                {/* Paypal donate */} 
                
                  <PayPalScriptProvider
                    options={{
                      "client-id": "AU-vXTfev0mZxlIxqLWL_fW3jppHWiRJ1FZHgfcOOVSU5VzLW_2uwnVU-wXz0HdG5trzwfhvUJVYjIRp",
                      components: "buttons",
                      currency: "CAD"
                    }}
                  >
                    <h1>Donate to our musify</h1>
                    <DonateForm />
                  </PayPalScriptProvider>
            </main>
        )
    }
}