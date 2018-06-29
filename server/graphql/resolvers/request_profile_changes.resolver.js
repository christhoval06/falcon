import { Faculty } from "../../models/faculty.model";
import {
    DegreeAddRequest,
    ExtensionWorkAddRequest,
    InstructionalMaterialAddRequest,
    PresentationAddRequest,
    ProfileChangeRequest,
    RecognitionAddRequest,
} from "../../models/faculty_profile_changes.model";
import { FACULTY } from "../../models/user.model";
import { limitAccess } from "../../utils/user_decorator";
import { getUserFromContext } from "../../utils/user_from_context";
import { DoesNotExistError } from "../errors/does_not_exist.error";
import { ValidationError } from "../errors/validation.error";


const degreeChanges = faculty => ({
    add({newDegree}) {
        return DegreeAddRequest.create({
            faculty: faculty._id,
            ...newDegree,
        });
    },
});

const recognitionChanges = faculty => ({
    add({newRecognition}) {
        return RecognitionAddRequest.create({
            faculty: faculty._id,
            ...newRecognition,
        });
    },
});

const presentationChanges = faculty => ({
    add({newPresentation}) {
        return PresentationAddRequest.create({
            faculty: faculty._id,
            ...newPresentation,
        });
    },
});

const instructionalMaterialChanges = faculty => ({
    add({newInstructionalMaterial}) {
        return InstructionalMaterialAddRequest.create({
            faculty: faculty._id,
            ...newInstructionalMaterial,
        });
    },
});

const extensionWorkChanges = faculty => ({
    add({newExtensionWork}) {
        return ExtensionWorkAddRequest.create({
            faculty: faculty._id,
            ...newExtensionWork,
        });
    },
});

const rescindChangeRequest = faculty => async ({_id}) => {
    const changeRequest = await ProfileChangeRequest.findById(_id);
    if (!changeRequest) {
        throw new DoesNotExistError(`Change Request of ID ${_id} does not exist`);
    }

    // Convert to string because they are ObjectID instances that won't be equal otherwise
    if (String(changeRequest.faculty) !== String(faculty._id)) {
        throw new ValidationError(`Faculty of ID ${faculty._id} cannot rescind another faculty's (${changeRequest.faculty}) change request`);
    }

    await changeRequest.remove();
    return true;
};

async function requestProfileChanges(object, args, context) {
    const user = await getUserFromContext(context);
    const faculty = await Faculty.findOne({user: user._id}).exec();

    return {
        degree: degreeChanges(faculty),
        extensionWork: extensionWorkChanges(faculty),
        recognition: recognitionChanges(faculty),
        instructionalMaterial: instructionalMaterialChanges(faculty),
        presentation: presentationChanges(faculty),
        rescindChangeRequest: rescindChangeRequest(faculty),
    };
}

export const mutationResolvers = {
    requestProfileChange: limitAccess(requestProfileChanges, {allowed: FACULTY, action: "Submit change request"}),
};