import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import { tenantMgrConstants } from '../helpers/_constants';
import { TenantForm } from '../helpers/_components/TenantForm';
import { withRouter} from "react-router-dom";
import { tenantMgrActions } from '../helpers/_actions';
import {FormLabel, FormControl, FormGroup} from "react-bootstrap";
import LoaderButton from "../helpers/_components/LoaderButton";
import { Debug } from "../helpers/_helpers/debug";

// reactstrap components
import { Row, Col, Card, CardHeader, CardBody } from "reactstrap";

// core components
import PanelHeader from "../components/PanelHeader/PanelHeader.jsx";

var logit = new Debug("TenantPage");

class TenantPage extends React.Component {
    constructor(props) {
        super(props);
        logit.resetPrefix("constructor");
        logit.debug("props =");
        logit.debug(props);

        const capitalize = (s) => {
          if (typeof s !== 'string') return ''
          return s.charAt(0).toUpperCase() + s.slice(1)
        }

        this.state = {
            id: props.match.params.id,
            action: capitalize(this.props.match.path.split("/")[3].toLowerCase()),
        };

        this.props.dispatch(tenantMgrActions.tenantReset());
        this.props.dispatch(tenantMgrActions.getTenant(this.state.id));
    }

     handleSubmitTP(values, actions) {
        logit.resetPrefix("handleSubmitTP");

        const  tenant = {
            companyName: values.companyName,
            ownerName: values.ownerName,
            email: values.email,
            id: values.id,
            status: values.status,
            tier: values.tier,
        };
        logit.debug("tenant info = ");
        logit.debug(tenant);

        const { dispatch } = actions;

        dispatch(tenantMgrActions.updateTenant(tenant));
        actions.setSubmitting(false);
    }

    render() {
        logit.resetPrefix("render");
        const {aTenant} = this.props;
        const {action} = this.state;

        var isDataValid = aTenant ? aTenant.status === tenantMgrConstants.TENANT_VALID  : false;

        return (
            <>
              <PanelHeader size="sm" />
              <div className="content">
                <Row>
                  <Col xs={12}>
                  <Card>
                    <CardBody>
                        <div className="col-12 ">
                            <h2>{action} Tenent</h2>
                            {isDataValid ?
                                <TenantForm values={aTenant.tenant} dispatch={this.props.dispatch}  />
                                : <div>  Loading......</div>
                            }
                        </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </>
        );
    }
}

function mapStateToProps(state) {
    logit.resetPrefix("mapStateToProps");
    const { aTenant } = state;
    return {
        aTenant
    };
}

const connectedTenantPage = connect(mapStateToProps)(TenantPage);
export default connectedTenantPage;
