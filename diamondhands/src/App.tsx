import "./App.css";
import React, { useState } from "react";

import CardWheel from "./OptionCard/CardWheel";
import OptionForm from "./NewOption/OptionForm";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp({
    apiKey: "AIzaSyA9YAE6jwb1GEA7clfnYLqrkBB1L-rSkpg",
    authDomain: "diamond-hands-ca6e7.firebaseapp.com",
    projectId: "diamond-hands-ca6e7",
    storageBucket: "diamond-hands-ca6e7.appspot.com",
    messagingSenderId: "78768005190",
    appId: "1:78768005190:web:8a06a0234d11d467732a47",
    measurementId: "G-WGBJZKRSML",
});
const auth = firebase.auth();
const firestore = firebase.firestore();

// console.log(firebase);

function App() {
    const [cards, updateCards] = useState([
        {
            ticker: "MSFT",
            strike: "$222.5/$225",
            purchasePrice: 0.71,
            currentPrice: 1.72,
            todayReturn: 68.67,
            totalReturn: 140.85,
            exp: "12/31/20",
            type: "call",
        },
        {
            ticker: "NIO",
            strike: "$45/$46",
            purchasePrice: 0.71,
            currentPrice: 1.72,
            todayReturn: 68.67,
            totalReturn: 140.85,
            exp: "12/31/20",
            type: "put",
        },
        {
            ticker: "AAPL",
            strike: "$222.5/$225",
            purchasePrice: 0.71,
            currentPrice: 1.72,
            todayReturn: -68.67,
            totalReturn: -23.38,
            exp: "12/31/20",
            type: "call",
        },
        {
            ticker: "MSFT",
            strike: "$222.5/$225",
            purchasePrice: 0.71,
            currentPrice: 1.72,
            todayReturn: 68.67,
            totalReturn: 140.85,
            exp: "12/31/20",
            type: "call",
        },
    ]);
    const [user] = useAuthState(auth);

    function addCard(option) {
        updateCards(cards.concat(option)); //adds new option to cardwheel
        console.log(cards);
    }
    function onSubmit(event) {
        event.preventDefault(event); //prevents page from refreshing on form submit
        let strike = event.target.strike.value;
        let ticker = event.target.ticker.value;
        let expiration = event.target.expiration.value;
        addCard({
            ticker: ticker,
            strike: strike,
            purchasePrice: 0.71,
            currentPrice: 1.72,
            todayReturn: 68.67,
            totalReturn: 140.85,
            exp: expiration,
            type: "call",
        });
    }
    console.log(user);

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
