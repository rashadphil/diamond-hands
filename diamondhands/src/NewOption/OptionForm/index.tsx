import * as React from "react";
import "./index.css";
import FormButton from "../FormButton";
import Modal from "./Modal";

class OptionForm extends React.Component {
    state = { isShown: false };
    showModal = () => {
        this.setState({ isShown: true });
    };
    render() {
        return (
            <React.Fragment>
                <FormButton showModal={this.showModal}></FormButton>
                {this.state.isShown ? <Modal></Modal> : null}
            </React.Fragment>
        );
    }
}

export default OptionForm;
