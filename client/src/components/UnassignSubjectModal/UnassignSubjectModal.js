import DialogContentText from "@material-ui/core/DialogContentText";
import React from "react";
import { DangerActionConfirmationModal } from "../DangerActionConfirmationModal/index";
import { getFullName } from "../../utils/user.util";


export class UnassignSubjectModal extends DangerActionConfirmationModal {
    get dialogTitle() {
        return this.props.perspective === "faculty" ?
            "Are you sure you want to unassign this subject?" :
            "Are you sure you want to unassign this faculty?";
    }

    get dialogContent() {
        const {subject, faculty} = this.props;
        const facultyName = getFullName(faculty.user);

        return (
            <DialogContentText>
                You are about to unassign <b>{facultyName}</b> from the subject <b>{subject.name}</b>.
            </DialogContentText>
        );
    }

    get buttonName() {
        return this.props.perspective === "faculty" ? "Unassign subject" : "Unassign faculty";
    }

    onConfirmAction = () => {
        this.setState({isSubmitting: true, error: null});
        const {subject, faculty, onConfirmRemove} = this.props;

        onConfirmRemove(faculty, subject)
            .then(() => this.setState({isSubmitting: false}, this.closeModal))
            .catch(error => {
                console.log("An error occurred while unassigning subject", error);
                this.setState({isSubmitting: false, error: "An error occurred"});
            });
    };
}