import React from 'react';
import { connect } from 'react-redux';
import { userConstants } from '../helpers/_constants';
import { UserForm } from '../helpers/_components/UserForm';
import { withRouter} from "react-router-dom";
import { alertActions, userActions} from '../helpers/_actions';

import { Debug } from "../helpers/_helpers/debug";
import * as Roles from "../helpers/_reducers/authentication.reducer";

// reactstrap components
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";

// core components
import PanelHeader from "../components/PanelHeader/PanelHeader.jsx";

import icons from "../variables/icons";

var logit = new Debug("Users");

class Users extends React.Component {
    constructor(props) {
        super(props);
        logit.resetPrefix("constructor");
        logit.debug("props =");
        logit.debug(props);

        const lowerCaseAction = props.location.pathname.split("/")[3].toLowerCase();
        const upperCaseAction =  lowerCaseAction.charAt(0).toUpperCase() + lowerCaseAction.slice(1)

        this.state = {
            name: "juano23@gmail.com",
            action: upperCaseAction,
        };

        logit.debug("states =");
        logit.debug(this.state);
        this.handleSubmitPage = this.handleSubmitPage.bind(this);
        this.props.dispatch(userActions.aUserReset());
    }

    componentDidMount() {
        logit.resetPrefix("componentDidMount");
        const {dispatch } = this.props;
        if (this.state.function === "edit") {
            logit.debug("in edit mode. check if user needed");
            dispatch(userActions.getUserIfNeeded(this.state.name));
        }
    }

    componentDidUpdate() {
        logit.resetPrefix("componentDidUpdate");
        const {dispatch } = this.props;
        if (this.state.function === "edit") {
            logit.debug("in edit mode. check if user needed");
            dispatch(userActions.getUserIfNeeded(this.state.name));
        }
    }

    handleSubmitPage(formType, user) {
        logit.resetPrefix("handleSubmitPage");

        logit.debug("user info = ");
        logit.debug(user);

        const { dispatch } = this.props;

        dispatch(alertActions.clear());
        if (formType === "Edit") {
            dispatch(userActions.updateUser(user));
        } else {
            dispatch(userActions.addUser(user));
        }
    }

    render() {
        logit.resetPrefix("render");
        var {aUser, isSystemUser} = this.props;
        const {action} = this.state;

        if (action === "Edit") {
            var isDataValid = aUser ? aUser.status === userConstants.USER_VALID : false;
            return (
                <>
                  <PanelHeader size="sm" />
                  <div className="content">
                      <Row>
                        <Col md={12}>
                          <Card>
                            <CardHeader>
                              <h5 className="title">{action} User</h5>
                            </CardHeader>
                            <CardBody>
                              <Col className="pr-1" md="5">{isDataValid ?
                                <UserForm values={aUser.user} formType={action}
                                          isSystemUser={isSystemUser}
                                          onSubmit={this.handleSubmitPage}/>
                                : <div> Loading......</div>}
                              </Col>
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                  </div>
                </>
            );
        } else {
            return (
                <>
                  <PanelHeader size="sm" />
                  <div className="content">
                      <Row>
                        <Col md={12}>
                          <Card>
                            <CardHeader>
                              <h5 className="title">{action} User</h5>
                            </CardHeader>
                            <CardBody>
                              <Col className="pr-1" md="5">
                                <UserForm values={aUser.user} formType={action}
                                          isSystemUser={isSystemUser}
                                          onSubmit={this.handleSubmitPage}/>
                              </Col>
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                  </div>
                </>
            );
        }
    }
}

function mapStateToProps(state, ownProps) {
    logit.resetPrefix("mapStateToProps");
    const { aUser } = state;
    logit.log("mapStateToProps");
    return {
        aUser,
        isSystemUser: Roles.isSystemUser(state),
    };
}

const connectedUserPage = connect(mapStateToProps)(Users);

export default connect(mapStateToProps)(Users);
