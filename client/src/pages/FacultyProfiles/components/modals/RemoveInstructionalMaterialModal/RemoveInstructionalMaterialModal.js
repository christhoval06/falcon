import DialogContentText from "@material-ui/core/DialogContentText";
import React from "react";
import { DangerActionConfirmationModal } from "../../../../../components/DangerActionConfirmationModal";
import { getFullName } from "../../../../../utils/user.util";


export class RemoveInstructionalMaterialModal extends DangerActionConfirmationModal {
    get dialogTitle() {
        return "Are you sure you want to remove this instructional material?";
    }

    get dialogContent() {
        const facultyName = getFullName(this.props.faculty.user);
        const {title, usageYear} = this.props.instructionalMaterial;
        return (
            <DialogContentText>
                You are about to remove <b>{facultyName}</b>'s instructional material
                titled <b>{title}</b> used in <b>{usageYear}</b>.
            </DialogContentText>
        );
    }

    get buttonName() {
        return "Remove instructional material";
    }

    get submitAction() {
        const {faculty, instructionalMaterial, onConfirmRemove} = this.props;
        return () => onConfirmRemove(faculty, instructionalMaterial._id);
    }

    get toastSuccessMessage() {
        return "Instructional Material successfully removed";
    }
}