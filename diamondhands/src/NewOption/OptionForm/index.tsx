import React, { useState } from "react";
import "./index.css";
import FormButton from "../FormButton";
import Modal from "./Modal";

function OptionForm({ onSubmit }) {
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
