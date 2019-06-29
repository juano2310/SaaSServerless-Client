import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input
} from "reactstrap";
import routes from "../../routes.js";
import * as Roles from "../../helpers/_reducers/authentication.reducer";

class Header extends React.Component {
  state = {
    isOpen: false,
    dropdownOpen: false,
    dropdownAdminOpen: false,
    color: "transparent"
  };
  sidebarToggle = React.createRef();
  toggle = () => {
    if (this.state.isOpen) {
      this.setState({
        color: "transparent"
      });
    } else {
      this.setState({
        color: "white"
      });
    }
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  dropdownToggle = e => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };
  dropdownToggleAdmin = e => {
    this.setState({
      dropdownOpenAdmin: !this.state.dropdownOpenAdmin
    });
  };
  getBrand = () => {
    var name;
    routes.map((prop, key) => {
      if (prop.collapse) {
        prop.views.map((prop, key) => {
          if (prop.path === this.props.location.pathname) {
            name = prop.name;
          }
          return null;
        });
      } else {
        if (prop.redirect) {
          if (prop.path === this.props.location.pathname) {
            name = prop.name;
          }
        } else {
          if (prop.path === this.props.location.pathname) {
            name = prop.name;
          }
        }
      }
      return null;
    });
    return name;
  };
  openSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    this.sidebarToggle.current.classList.toggle("toggled");
  };
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  updateColor = () => {
    if (window.innerWidth < 993 && this.state.isOpen) {
      this.setState({
        color: "white"
      });
    } else {
      this.setState({
        color: "transparent"
      });
    }
  };
  componentDidMount() {
    window.addEventListener("resize", this.updateColor.bind(this));
  }
  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      this.sidebarToggle.current.classList.toggle("toggled");
    }
  }
  render() {
    const { alert, authentication, isSystemAdminUser, isAdminUser, isTenantUser, } = this.props;
    return (
      //const { alert, authentication, isSystemAdminUser, isAdminUser, isTenantUser, } = this.props;
      // add or remove classes depending if we are on full-screen-maps page or not
      <Navbar
        color={
          this.props.location.pathname.indexOf("full-screen-maps") !== -1
            ? "white"
            : this.state.color
        }
        expand="lg"
        className={
          this.props.location.pathname.indexOf("full-screen-maps") !== -1
            ? "navbar-absolute fixed-top"
            : "navbar-absolute fixed-top " +
              (this.state.color === "transparent" ? "navbar-transparent " : "")
        }
      >
        <Container fluid>
          <div className="navbar-wrapper">
            <div className="navbar-toggle">
              <button
                type="button"
                ref={this.sidebarToggle}
                className="navbar-toggler"
                onClick={() => this.openSidebar()}
              >
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </button>
            </div>
            <NavbarBrand href="/">{this.getBrand()}</NavbarBrand>
          </div>
          <NavbarToggler onClick={this.toggle}>
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </NavbarToggler>
          <Collapse
            isOpen={this.state.isOpen}
            navbar
            className="justify-content-end"
          >
            <form>
              <InputGroup className="no-border">
                <Input placeholder="Search..." />
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <i className="now-ui-icons ui-1_zoom-bold" />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </form>
            {(isSystemAdminUser || isTenantUser || isAdminUser) && 
            <Nav navbar>
              <Dropdown nav isOpen={this.state.dropdownOpenAdmin} toggle={e => this.dropdownToggleAdmin(e)} >
                <DropdownToggle caret nav>
                  <i className="now-ui-icons business_badge" />
                  <p>
                    <span className="d-lg-none d-md-block">System</span>
                  </p>
                </DropdownToggle>
                <DropdownMenu right>
                  {isSystemAdminUser && <NavLink to="/admin/tenants"><DropdownItem tag="a" href="/admin/tenants">Tenants</DropdownItem></NavLink> }
                  {isTenantUser && <NavLink to="/admin/products"><DropdownItem tag="a" href="/admin/products">Catalog</DropdownItem></NavLink> }
                  {isTenantUser && <NavLink to="/admin/orders"><DropdownItem tag="a" href="/admin/orders">Orders</DropdownItem></NavLink> }
                  {isAdminUser &&  <NavLink to="/admin/users"><DropdownItem tag="a" href="/admin/users">Users</DropdownItem></NavLink> }
                </DropdownMenu>
              </Dropdown>
            </Nav>}
            <Nav navbar>
              <Dropdown nav isOpen={this.state.dropdownOpen}  toggle={e => this.dropdownToggle(e)}>
                <DropdownToggle caret nav>
                  <i className="now-ui-icons users_single-02" />
                  <p>
                    <span className="d-lg-none d-md-block">User</span>
                  </p>
                </DropdownToggle>
                <DropdownMenu right>
                  <NavLink to="/admin/user"><DropdownItem tag="a" href="/admin/user">User Profile</DropdownItem></NavLink>
                  <DropdownItem tag="a" href="/logout">Logout</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

function mapStateToProps(state) {
    const { alert, authentication } = state;
     return {
        alert, authentication,
        isSystemAdminUser: Roles.isSystemAdminUser(state),
        isAdminUser: Roles.isAdminUser(state),
        isTenantUser: Roles.isTenantUser(state),
    };
}

const connectedApp = connect(mapStateToProps)(Header);
export default connectedApp;
