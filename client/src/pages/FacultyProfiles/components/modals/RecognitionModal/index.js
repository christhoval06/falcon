import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { genericModalStyle } from "../../../../../components/styles";
import { facultyIsUpdated } from "../../../../../redux/actions/faculty.actions";
import { toastIsShowing } from "../../../../../redux/actions/toast.actions";
import { addRecognition, updateRecognition } from "../../../../../services/faculty/recognition";
import { requestAddRecognition } from "../../../../../services/faculty/request_profile_changes";
import { RecognitionModal as Component } from "./RecognitionModal";


const mapFormToRecognitionInput = form => ({
    title: form.title,
    basis: form.basis,
    sponsor: form.sponsor,
    date: {
        month: form.month,
        year: form.year,
    },
});

const mapStateToProps = state => ({
    user: state.authentication.user,
});

const mapDispatchToProps = dispatch => ({
    showToast(message) {
        dispatch(toastIsShowing(message));
    },

    submitAddRecognitionForm(form, faculty) {
        const recognition = mapFormToRecognitionInput(form);
        return addRecognition(faculty._id, recognition)
            .then(result => {
                const newRecognition = result.data.recognition.add;
                const newFaculty = {
                    ...faculty,
                    recognitions: [
                        ...faculty.recognitions,
                        newRecognition,
                    ],
                };

                dispatch(facultyIsUpdated(newFaculty));
                return newRecognition;
            });
    },

    submitUpdateRecognitionForm(form, recognitionId, faculty) {
        const recognition = mapFormToRecognitionInput(form);
        return updateRecognition(faculty._id, recognitionId, recognition)
            .then(result => {
                const newRecognition = result.data.recognition.update;
                const newFaculty = {
                    ...faculty,
                    recognitions: faculty.recognitions.map(recognition => {
                        if (recognition._id === recognitionId) {
                            return newRecognition;
                        }

                        return recognition;
                    }),
                };

                dispatch(facultyIsUpdated(newFaculty));
                return newRecognition;
            });
    },

    submitRequestAddRecognitionForm(form) {
        return requestAddRecognition(form)
            .then(result => result.data.requestProfileChange.recognition.add);
    },
});

export const RecognitionModal = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(genericModalStyle),
)(Component);
