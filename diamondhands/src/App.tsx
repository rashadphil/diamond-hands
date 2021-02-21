import "./App.css";
import React, { useState, useEffect } from "react";

import CardWheel from "./OptionCard/CardWheel";
import OptionForm from "./NewOption/OptionForm";

import firebase from "./firebase";
import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

const auth = firebase.auth();
const db = firebase.firestore();

const cors_api_url = 'https://limitless-escarpment-41761.herokuapp.com'

function App() {
    const [cards, updateCards] = useState([]);
    const [user, loading] = useAuthState(auth);

    let userID;
    let ref;
    let userRef;

    if (user) {
        userID = user.uid; //gets ID if user is logged in
        ref = db.collection("users");
        userRef = ref.doc(userID);
    }

    function getCards() {
        ref.where("userID", "==", userID).onSnapshot((querySnapshot) => {
            const userInfo: Array<any> = [];
            querySnapshot.forEach((doc) => {
                userInfo.push(doc.data());
            });

            //if user is in database: gets users cards and renders them
            //if not: does not render any cards
            let userInDatabase = userInfo[0];
            if (userInDatabase) {
                let userCards = userInfo[0].optionCards;
                updateCards(userCards);
            } else {
                //add the user to the database
                userRef.set({ userID: userID, optionCards: [] });
                updateCards([]);
            }
        });
    }

    useEffect(() => {
        if (user) {
            getCards();
        }
    }, [user]); //run useEffect is the user log in status changes changes

    function addCard(option) {
        updateCards(cards.concat(option)); //adds new option to cardwheel
        userRef.update({
            optionCards: firebase.firestore.FieldValue.arrayUnion(option), //updates database with new card
        });
    }
    function jsonToCard(response) {
        let jayson = response.optionChain.result[0].quote;
        let type = jayson.shortName.split(" ")[4]; //call or put
        let expArray = jayson.expireIsoDate.split("-");
        let m, d, y;
        m = expArray[1];
        d = expArray[2].slice(0, 2);
        y = expArray[0].slice(2, 4);
        //ticker e.x. (PLTR)
        //underlyingSymbol e.x. (PLTR210226C00015000)
        return {
            ticker: jayson.underlyingSymbol,
            strike: jayson.strike,
            purchasePrice: jayson.regularMarketOpen,
            currentPrice: jayson.regularMarketPrice,
            todayReturn: jayson.regularMarketChangePercent,
            totalReturn: jayson.regularMarketChangePercent,
            exp: `${m}/${d}/${y}`,
            type: type,
            underlyingSymbol: jayson.symbol,
        };
    }
    function onSubmit(event) {
        event.preventDefault(event); //prevents page from refreshing on form submit
        let strike = event.target.strike.value;
        let ticker = event.target.ticker.value;
        let expiration = event.target.expiration.value;
        let type = "C";
        let underlyingSymbol;

        let m, y, d;
        let expirationAsArray = expiration.split("/");
        m = expirationAsArray[0];
        d = expirationAsArray[1];
        if (expirationAsArray.length == 3)
            y = expirationAsArray[2];
        else
            y = String(new Date().getFullYear());
        //make sure year is only 2 digits
        if (y.length == 4)
            y = y.slice(-2);
        //make sure date has 2 digits
        if (d.length == 1)
            d = "0" + d;
        //make sure month has 2 digits
        if (m.length == 1)
            m = "0" + m;

        let apiStrike = (100000.000 + parseFloat(strike)).toFixed(3).toString().replace(".", "").substring(1); //get yahoo finance symbol strike code
        underlyingSymbol = `${ticker}${y}${m}${d}${type}${apiStrike}`

        return fetch(`${cors_api_url}/https://query2.finance.yahoo.com/v7/finance/options/${underlyingSymbol}`, {
            method: "GET",
            headers: new Headers({
                'Origin': "http://localhost:3000",
                'Content-Type': 'application/json',
                'Accept': 'application/json'

            }),
            mode: "cors",
        })
            .then(res => res.json())
            .then(response => addCard(jsonToCard(response)))
    }


    return (
        <>
            {user ? (
                [<SignOut></SignOut>, <CardWheel cardList={cards}></CardWheel>]
            ) : (
                    <SignIn></SignIn>
                )}
            <OptionForm onSubmit={(event) => onSubmit(event)}></OptionForm>
        </>
    );
}

function SignIn() {
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    };
    return <button onClick={signInWithGoogle}>Sign in With Google</button>;
}
function SignOut() {
    return (
        auth.currentUser && (
            <button onClick={() => auth.signOut()}>Sign Out</button>
        )
    );
}
export default App;
