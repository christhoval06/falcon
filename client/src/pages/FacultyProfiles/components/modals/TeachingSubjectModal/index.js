import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { genericModalStyle } from "../../../../../components/styles";
import { facultyIsUpdated } from "../../../../../redux/actions/faculty.actions";
import { setTeachingSubjects } from "../../../../../services/faculty/teaching_subjects";
import { getDifference } from "../../../../../utils/difference.util";
import { addFacultyToSubjects, removeFacultyFromSubjects } from "../../../../../utils/subject.util";
import { TeachingSubjectModal as Component } from "./TeachingSubjectModal";


const mapDispatchToProps = dispatch => ({
    onSubmitForm(faculty, selectedSubjects, oldSubjects) {
        const selectedSubjectsId = selectedSubjects.map(subject => subject._id);
        const {addedItems, removedItems} = getDifference(selectedSubjects, oldSubjects);

        return setTeachingSubjects(faculty._id, selectedSubjectsId)
            .then(result => result.data.teachingSubject.set)
            .then(newTeachingSubjects => {
                dispatch(facultyIsUpdated({
                    ...faculty,
                    teachingSubjects: newTeachingSubjects,
                }));

                addFacultyToSubjects({
                    dispatch,
                    faculty,
                    subjects: addedItems,
                });

                removeFacultyFromSubjects({
                    dispatch,
                    faculty,
                    subjects: removedItems,
                });

                return newTeachingSubjects;
            });
    },
});

export const TeachingSubjectModal = compose(
    connect(null, mapDispatchToProps),
    withStyles(genericModalStyle),
)(Component);