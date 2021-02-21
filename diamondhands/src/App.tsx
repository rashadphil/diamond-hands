import "./App.css";
import React, { useState, useEffect } from "react";

import CardWheel from "./OptionCard/CardWheel";
import OptionForm from "./NewOption/OptionForm";

import firebase from "./firebase";
import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { gql } from '@apollo/client';

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
    function jsonToCard(strike, ticker, expiration, type, response) {
        let jayson = response.optionChain.result[0].options[0];
        if (type == "call")
            jayson = jayson.calls;
        if (type == "puts")
            jayson = jayson.puts;
        console.log(jayson);
        // new Date(1504095567183).toLocaleDateString("en-US")
        return {};
    }
    function getSpecificDateJson(strike, ticker, expiration, type, specificDates) { //looks at each possible date and then makes card
        let userDateUnix;

        let userDateAsArray = expiration.split("/"); //[DD, MM, YY]
        if (userDateAsArray.length == 3)
            userDateAsArray[2] = "20" + userDateAsArray[2];
        else
            userDateAsArray[2] = (new Date().getFullYear()).toString();

        //for each unixDate in ticker's options Chain
        for (const unixDate of specificDates) {
            let tempDate = new Date((unixDate + 86400) * 1000).toLocaleDateString("en-US"); //adding 86400 because yahoo finance dates off by one day
            let tempDateAsArray = tempDate.split("/"); //[DD, MM, YY]
            console.log(userDateAsArray, tempDateAsArray);
            if (JSON.stringify(userDateAsArray) === JSON.stringify(tempDateAsArray)) {
                userDateUnix = unixDate;
                break;
            }
        }
        fetch(`${cors_api_url}/https://query2.finance.yahoo.com/v7/finance/options/${ticker}?date=${userDateUnix}`, {
            method: "GET",
            headers: new Headers({
                'Origin': "http://localhost:3000",
                'Content-Type': 'application/json',
                'Accept': 'application/json'

            }),
            mode: "cors",
        })
            .then(res => res.json())
            .then(response =>
                addCard(
                    jsonToCard(strike, ticker, expiration, type, response)
                ),
            );
    }
    function onSubmit(event) {
        event.preventDefault(event); //prevents page from refreshing on form submit
        let strike = event.target.strike.value;
        let ticker = event.target.ticker.value;
        let expiration = event.target.expiration.value;
        let type = "call";

        return fetch(`${cors_api_url}/https://query2.finance.yahoo.com/v7/finance/options/${ticker}`, {
            method: "GET",
            headers: new Headers({
                'Origin': "http://localhost:3000",
                'Content-Type': 'application/json',
                'Accept': 'application/json'

            }),
            mode: "cors",
        })
            .then(res => res.json())
            .then(response => response.optionChain.result[0].expirationDates)
            .then(possibleDates => getSpecificDateJson(strike, ticker, expiration, type, possibleDates))
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
