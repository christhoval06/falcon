import { withStyles, withTheme } from "@material-ui/core/styles";
import { compose } from "recompose";
import style from "../styles";
import EmptyState from "./EmptyState";


export default compose(
    withTheme(),
    withStyles(style),
)(EmptyState);
