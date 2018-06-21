import DialogContentText from "@material-ui/core/DialogContentText";
import React from "react";
import { DangerActionConfirmationModal } from "../../../../../components/DangerActionConfirmationModal";
import { getFullName } from "../../../../../utils/user.util";


export class RemoveExtensionWorkModal extends DangerActionConfirmationModal {
    get dialogTitle() {
        return "Are you sure you want to remove this extension work?";
    }

    get dialogContent() {
        const facultyName = getFullName(this.props.faculty.user);
        const {title} = this.props.extensionWork;
        return (
            <DialogContentText>
                You are about to remove <b>{facultyName}</b>'s extension work titled <b>{title}</b>.
            </DialogContentText>
        );
    }

    get buttonName() {
        return "Remove extension work";
    }

    get submitAction() {
        const {faculty, extensionWork, onConfirmRemove} = this.props;
        return () => onConfirmRemove(faculty, extensionWork._id);
    }

    get toastSuccessMessage() {
        return "Extension work successfully removed";
    }
}