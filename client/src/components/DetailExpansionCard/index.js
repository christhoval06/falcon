import { withStyles, withTheme } from "@material-ui/core/styles";
import { compose } from "recompose";
import DetailExpansionCard from "./DetailExpansionCard";
import styles from "./styles";


export default compose(
    withTheme(),
    withStyles(styles),
)(DetailExpansionCard);