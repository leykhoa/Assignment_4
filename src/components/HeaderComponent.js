import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';


class Header extends Component {

    constructor(props) {
        super(props);
        this.toggleNav = this.toggleNav.bind(this);
        this.state = {
            isNavOpen: true
        };

    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }
    render() {
        return (
            <React.Fragment>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto" href="/">
                            <img src="asset/images/logo.png" height="30" width="41" alt="Ristorante Con Fusion"></img>
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen}>
                            <Nav>
                                <NavItem>
                                    <NavLink className="nav-link" to="/staffs">
                                        <span className="fa fa-users fa-lg"> Nhân viên</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/departments">
                                        <span className="fa fa-id-card fa-lg"> Phòng ban</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/salary">
                                        <span className="fa fa-money fa-lg"> Bảng lương</span>
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
            </React.Fragment>
        )
    }
}
export default Header;