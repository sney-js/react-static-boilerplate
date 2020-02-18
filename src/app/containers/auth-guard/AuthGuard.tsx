import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import { Redirect } from "@reach/router";

const UNAUTHORIZED_REDIRECT = "/";

const mapStateToProps = ({ isLoggedIn }) => {
    return {
        isLoggedIn,
    };
};

type AuthGuardProps = {
    isLoggedIn?: boolean;
    requireAuthorization?: boolean;
};

const AuthGuard: FunctionComponent<AuthGuardProps> = props => {
    return (
        <React.Fragment>
            {props.requireAuthorization && !props.isLoggedIn ? (
                <Redirect to={UNAUTHORIZED_REDIRECT} noThrow />
            ) : (
                props.children
            )}
        </React.Fragment>
    );
};

export default connect(mapStateToProps)(AuthGuard);
