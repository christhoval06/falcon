import { USER_TYPES } from "../enums/user.enums";
import { FacultyLoadingPage } from "./FacultyLoading";
import { FacultyProfilesPage } from "./FacultyProfiles";
import { HomePage } from "./Home";
import { NotFoundPage } from "./NotFound";
import { SignInPage } from "./SignIn";
import { SubjectsPage } from "./Subjects";
import { BLUE_THEME, GREY_THEME, INDIGO_THEME, PINK_THEME, PNU_THEME, TEAL_THEME } from "./themes";


export const SIGN_IN_PAGE = {
    identifier: "SIGN_IN_PAGE",
    path: "sign-in",
    component: SignInPage,
    theme: PNU_THEME,
};

export const FACULTY_PROFILES_PAGE = {
    identifier: "FACULTY_PROFILES_PAGE",
    path: "faculty-profiles",
    component: FacultyProfilesPage,
    name: "Faculty Profiles",
    theme: TEAL_THEME,
};

export const SUBJECTS_PAGE = {
    identifier: "SUBJECTS_PAGE",
    path: "subjects",
    component: SubjectsPage,
    name: "Subjects",
    theme: BLUE_THEME,
};

export const HOME_PAGE = {
    identifier: "HOME_PAGE",
    path: "home",
    component: HomePage,
    name: "Home",
    theme: PNU_THEME,
};

export const FACULTY_LOADING_PAGE = {
    identifier: "FACULTY_LOADING_PAGE",
    path: "faculty-loading",
    component: FacultyLoadingPage,
    name: "Faculty Loading",
    theme: INDIGO_THEME,
};

export const USER_SETTINGS_PAGE = {
    identifier: "USER_SETTINGS_PAGE",
    path: "users",
    name: "Users",
    theme: GREY_THEME,
};

export const NOT_FOUND_PAGE = {
    identifier: "NOT_FOUND_PAGE",
    path: "404",
    theme: PINK_THEME,
    component: NotFoundPage,
};

export const PAGES = [
    SIGN_IN_PAGE,
    NOT_FOUND_PAGE,
    HOME_PAGE,
    FACULTY_PROFILES_PAGE,
    FACULTY_LOADING_PAGE,
    USER_SETTINGS_PAGE,
    SUBJECTS_PAGE,
];

export const GENERAL_PAGES = [
    NOT_FOUND_PAGE,
    SIGN_IN_PAGE,
];

export function getPagesForUserType(userType) {
    const {DEAN, ASSOCIATE_DEAN, FACULTY, CLERK} = USER_TYPES;

    switch (userType) {
        case DEAN.identifier:
        case ASSOCIATE_DEAN.identifier:
        case CLERK.identifier:
            return [
                HOME_PAGE,
                FACULTY_PROFILES_PAGE,
                FACULTY_LOADING_PAGE,
                USER_SETTINGS_PAGE,
                SUBJECTS_PAGE,
            ];
        case FACULTY.identifier:
        default:
            return [
                HOME_PAGE,
            ];
    }
}

export function getPageFromPath(candidatePath) {
    const page = PAGES.find(page => page.path === candidatePath);
    if (!page) {
        // If path is not found, it means path is invalid, return not found
        return NOT_FOUND_PAGE;
    }
    return page;
}

export function getPageFromIdentifier(candidateIdentifier) {
    const page = PAGES.find(page => page.identifier === candidateIdentifier);
    if (!page) {
        // If path is not found, it means path is invalid, return not found
        return NOT_FOUND_PAGE;
    }
    return page;
}
