import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import React, { Component } from "react";
import { FullPageLoadingIndicator } from "../../../../../components/FullPageLoadingIndicator";
import { EmptyState } from "../../../../../components/states/EmptyState";
import { ErrorState } from "../../../../../components/states/ErrorState";
import { getObjectForUserType } from "../../../../../utils/user.util";
import { ChangeRequestCard } from "../../cards/ChangeRequestCard";


export class ChangeRequestsTab extends Component {
    state = {
        activeChangeRequest: null,
    };

    componentDidMount() {
        this.fetchChangeRequests();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.fetchChangeRequests();
    }

    fetchChangeRequests = () => {
        const {
            user,
            getChangeRequests,
            getMyChangeRequests,
            isLoading,
            errors,
            changeRequests,
        } = this.props;

        const fetch = getObjectForUserType(user, {
            CLERK: getChangeRequests,
            DEAN: getChangeRequests,
            ASSOCIATE_DEAN: getChangeRequests,
            FACULTY: getMyChangeRequests,
        });

        if (!isLoading && !changeRequests && !errors) {
            fetch();
        }
    };

    // TODO
    renderEmptyState = () => (
        <EmptyState

        />
    );

    renderLoading = () => (
        <Grid container style={{height: "100%"}}>
            <FullPageLoadingIndicator size={100} />
        </Grid>
    );

    renderErrors = errors => (
        <div className={this.props.classes.cardsContainer}>
            <Card>
                <ErrorState
                    onRetryButtonClick={() => this.props.getFacultyDetails(this.props.activeFaculty)}
                    message="An error occurred while trying to fetch faculty details."
                    debug={errors[0]}
                />
            </Card>
        </div>
    );

    renderChangeRequests = changeRequests => changeRequests.map(changeRequest => (
        <Grid item key={changeRequest._id}>
            <ChangeRequestCard
                user={this.props.user}
                faculty={this.props.faculty}
                changeRequest={changeRequest}
            />
        </Grid>
    ));

    get changeRequestsForCurrentFaculty() {
        const {faculty, changeRequests} = this.props;
        return changeRequests ?
            changeRequests.filter(changeRequest => changeRequest.faculty === faculty._id) :
            null;
    }

    render() {
        const {classes, isLoading, errors} = this.props;
        const changeRequests = this.changeRequestsForCurrentFaculty;

        if (isLoading) {
            return this.renderLoading();
        }

        return (
            <div className={classes.cardsContainer}>
                {changeRequests &&
                <Grid
                    container
                    spacing={16}
                    alignItems="stretch"
                    direction="column"
                    wrap="nowrap"
                >
                    {this.renderChangeRequests(changeRequests)}
                </Grid>
                }

                {errors && this.renderErrors(errors)}
            </div>
        );
    }
}