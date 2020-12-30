import React, { useState } from "react";
import "./index.css";
import FormButton from "../FormButton";
import Modal from "./Modal";

function OptionForm() {
    const [isShown, formVisible] = useState(false);
    function showModal() {
        formVisible(true);
        toggleScrollLock();
    }
    function toggleScrollLock() {
        document.querySelector("html")?.classList.toggle("scroll-lock");
    }
    function closeModal() {
        formVisible(false);
        toggleScrollLock();
    }
    function onSubmit(event) {
        event.preventDefault(event);
        formVisible(false);
        // this.setState({
        //     isShown: false,
        //     newCard: {
        //         strike: event.target.strike.value,
        //         ticker: event.target.ticker.value,
        //         expiration: event.target.expiration.value,
        //     },
        // });
    }
    return (
        <React.Fragment>
            <FormButton
                showModal={showModal}
                closeModal={closeModal}
            ></FormButton>
            {isShown ? (
                <Modal closeModal={closeModal} onSubmit={onSubmit}></Modal>
            ) : null}
        </React.Fragment>
    );
}

export default OptionForm;
