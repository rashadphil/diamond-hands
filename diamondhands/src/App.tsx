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
const firestore = firebase.firestore();

function App() {
    const [cards, updateCards] = useState([]);
    const [user, loading] = useAuthState(auth);

    let userID;
    let ref;

    if (user) {
        console.log("LOGGED In");
        userID = user.uid; //gets ID if user is logged in
        ref = firebase
            .firestore()
            .collection("users")
            .where("userID", "==", userID); //only get info for the logged in user
    }

    function getCards() {
        ref.onSnapshot((querySnapshot) => {
            const userInfo: Array<any> = [];
            querySnapshot.forEach((doc) => {
                userInfo.push(doc.data());
            });
            let userCards = userInfo[0].optionCards;
            updateCards(userCards);
            console.log(userCards);
        });
    }
    useEffect(() => {
        if (user) getCards();
    }, [user]); //run useEffect is the user log in status changes changes

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
