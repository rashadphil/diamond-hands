import * as React from "react";
import "./index.css";
import FormButton from "../FormButton";
import Modal from "./Modal";

class OptionForm extends React.Component {
    state = { isShown: false };
    showModal = () => {
        this.setState({ isShown: true });
        this.toggleScrollLock();
    };
    toggleScrollLock = () => {
        document.querySelector("html")?.classList.toggle("scroll-lock");
    };
    closeModal = () => {
        this.setState({ isShown: false });
        this.toggleScrollLock();
    };

    render() {
        return (
            <React.Fragment>
                <FormButton
                    showModal={this.showModal}
                    closeModal={this.closeModal}
                ></FormButton>
                {this.state.isShown ? (
                    <Modal closeModal={this.closeModal}></Modal>
                ) : null}
            </React.Fragment>
        );
    }
}

export default OptionForm;
