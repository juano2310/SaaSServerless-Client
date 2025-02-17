/*eslint-disable*/
import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

import logo from "../../logo-white.svg";

var ps;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.sidebar, {
        suppressScrollX: true,
        suppressScrollY: false
      });
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }
  render() {
    return (
      <div className="sidebar" data-color={this.props.backgroundColor}>
        <div className="logo">
          <NavLink
            to="/admin/dashboard"
            className="simple-text logo-mini"
            activeClassName="active"
          >
            <div className="logo-img">
              <img src={logo} alt="react-logo" />
            </div>
          </NavLink>
          <NavLink
            to="/admin/dashboard"
            className="simple-text logo-normal"
            activeClassName="active"
          >
            Project Charles
          </NavLink>
        </div>
        <div className="sidebar-wrapper" ref="sidebar">
          <Nav>
            {this.props.routes.map((prop, key) => {
              if (prop.redirect) return null;
              if (prop.invisible) return null;
              return (
                <li
                  className={
                    (prop.main ? "" : this.activeRoute(prop.layout + prop.path)) +
                    (prop.pro ? " active active-pro" : "") + (prop.main ? " active-main" : "")
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={"now-ui-icons " + prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                  {(prop.main ? <div class="divider"></div> : "")}
                </li>
              );
            })}
          </Nav>
        </div>
      </div>
    );
  }
}

export default Sidebar;
