import * as React from "react";
import "./index.css";
import FormButton from "../FormButton";
import Modal from "./Modal";
import CardWheel from "../../OptionCard/CardWheel";

class OptionForm extends React.Component {
    state = { isShown: false, newCard: {} };
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
    onSubmit = (event) => {
        event.preventDefault(event);
        this.setState({
            isShown: false,
            newCard: {
                strike: event.target.strike.value,
                ticker: event.target.ticker.value,
                expiration: event.target.expiration.value,
            },
        });
        // console.log(event.target.strike.value);
        // console.log(event.target.ticker.value);
        // console.log(event.target.expiration.value);
        // console.log(this.state);
        console.log(event.target.value);
    };
    render() {
        return (
            <React.Fragment>
                <FormButton
                    showModal={this.showModal}
                    closeModal={this.closeModal}
                ></FormButton>
                {this.state.isShown ? (
                    <Modal
                        closeModal={this.closeModal}
                        onSubmit={this.onSubmit}
                    ></Modal>
                ) : null}
            </React.Fragment>
        );
    }
}

export default OptionForm;
