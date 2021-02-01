import React, { useState, Fragment } from "react";
import PropTypes from 'prop-types';
import "./index.css"

function AutoComplete({ stocks, tickers, currentVal }) {

    const [suggestions, updateSuggestions] = useState({
        activeSuggestion: 0,
        filteredSuggestions: [],
        showSuggestions: false,
        userInput: ""
    });
    function handleChange(event) {
        const suggestions = tickers;
        const userInput = event.currentTarget.value;
        const filteredSuggestions = suggestions.filter(suggestion => suggestion.toLowerCase().startsWith(userInput.toLowerCase()));
        updateSuggestions({
            activeSuggestion: 0,
            filteredSuggestions: filteredSuggestions,
            showSuggestions: true,
            userInput: userInput
        })
        currentVal = userInput;
    }
    function onClick(event) {
        updateSuggestions({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: event.currentTarget.innerText
        })
    }
    function onKeyDown(event) {
        const ENTER = event.keyCode == 13;
        const UP = event.keyCode == 38;
        const DOWN = event.keyCode == 40;
        let showSuggestions = suggestions.showSuggestions;
        let userInput = suggestions.userInput;
        let activeSuggestion = suggestions.activeSuggestion;
        let filteredSuggestions = suggestions.filteredSuggestions;
        console.log(activeSuggestion)


        if (ENTER) {
            updateSuggestions({
                activeSuggestion: 0,
                filteredSuggestions: [],
                showSuggestions: false,
                userInput: filteredSuggestions[activeSuggestion]
            })
        }
        if (UP) {
            if (activeSuggestion === 0)
                return

            updateSuggestions({
                ...suggestions,
                activeSuggestion: activeSuggestion - 1,
            })
        }
        if (DOWN) {

            if (activeSuggestion === filteredSuggestions.length - 1) {
                return
            }
            else
                updateSuggestions({
                    ...suggestions,
                    activeSuggestion: activeSuggestion + 1,
                })
        }

    }

    function SuggestionList() {
        let showSuggestions = suggestions.showSuggestions;
        let userInput = suggestions.userInput;
        let activeSuggestion = suggestions.activeSuggestion;
        let filteredSuggestions = suggestions.filteredSuggestions;

        if (showSuggestions && userInput) {
            if (filteredSuggestions.length) {
                return (
                    <ul className="suggestions">
                        {filteredSuggestions.map((suggestion, index) => {
                            let className;
                            if (index === activeSuggestion)
                                className = "suggestion-active";

                            return (
                                <li className={className} key={suggestion} onClick={onClick} >
                                    {suggestion}
                                </li>
                            );
                        })}
                    </ul>
                );
            } else {
                return (
                    <em>Nothing</em>
                )
            }

        }
        return (
            <em></em>
        )
    }




    return (
        <Fragment>
            <input type="text" id="ticker" onChange={handleChange} value={suggestions.userInput} onKeyDown={onKeyDown} />
            <SuggestionList></SuggestionList>
        </Fragment>
    );
}

export default AutoComplete;