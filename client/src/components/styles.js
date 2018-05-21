export const formContainer = theme => ({
    width: 720,
});

export const form = theme => ({
    padding: theme.spacing.unit,
});

export const pageContainer = theme => ({
    position: "relative",
    paddingTop: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit * 5,

    // Constrain content to margins
    width: "80%",
    maxWidth: 1200,

    // Center the page container
    marginLeft: "auto",
    marginRight: "auto",

    // Do not allow padding to increase height
    boxSizing: "border-box",
});

export const card = theme => ({
    width: "100%",
});

export const genericModalStyle = theme => ({
    container: {
        ...formContainer(theme),
    },

    form: {
        ...form(theme),
    },
});

export const activeItem = theme => ({
    fontWeight: theme.typography.fontWeightMedium,
    borderLeft: "6px solid",
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
    background: theme.palette.grey["100"],
});