import DialogContentText from "@material-ui/core/DialogContentText";
import React from "react";
import { DangerActionConfirmationModal } from "../../../../../components/DangerActionConfirmationModal";
import { getFullName } from "../../../../../utils/user.util";


export class RemoveDegreeModal extends DangerActionConfirmationModal {
    get dialogTitle() {
        return "Are you sure you want to remove this degree?";
    }

    get dialogContent() {
        const facultyName = getFullName(this.props.faculty.user);
        const {title, completionYear} = this.props.degree;

        return (
            <DialogContentText>
                You are about to remove <b>{facultyName}</b>'s degree <b>{title}</b> from <b>{completionYear}</b>.
            </DialogContentText>
        );
    }

    get buttonName() {
        return "Remove degree";
    }

    get submitAction() {
        const {faculty, degree, onConfirmRemove} = this.props;
        return () => onConfirmRemove(faculty, degree._id);
    }

    get toastSuccessMessage() {
        return "Degree successfully removed";
    }
}
