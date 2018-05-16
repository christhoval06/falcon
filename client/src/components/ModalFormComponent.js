import { Component } from "react";


export default class ModalFormComponent extends Component {
    state = {...this.initialState};

    get initialForm() {
        return {};
    };

    get initialState() {
        return {
            form: {...this.initialForm},
            isSubmitting: false,
            error: null,
        }
    };

    closeModal = () => {
        if (this.state.isSubmitting) {
            return;
        }

        this.props.onClose();
        this.resetForm();
    };

    resetForm = () => this.setState({...this.initialState});

    handleFormChange = fieldName => event => {
        const form = {...this.state.form};
        form[fieldName] = event.target.value;
        this.setState({
            form: {
                ...form,
            },
        });
    };
}