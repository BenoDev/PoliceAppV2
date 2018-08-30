import React, { Component } from "react";

import { Link } from "react-router-dom";

import { Menu, Icon, Dropdown, Responsive, Label } from "semantic-ui-react";

import { CSSTransition, TransitionGroup } from "react-transition-group";

class NavbarFeatures extends Component {
  state = { activeItem: "home" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    const { children, isAuth, customer } = this.props;

    return (
      <Responsive minWidth={768}>
        <Menu
          style={{
            borderRadius: "0",
            backgroundColor: "transparent",
            margin: "0",
            height: "4rem",
            fontFamily: '"Roboto", sans-serif',
            fontWeight: "700"
          }}
          borderless
        >
          <Menu.Menu position="left">
            <Menu.Item name="Logo" />
          </Menu.Menu>

          <Menu.Menu position="right">
            <Dropdown
              className="navbar-dropdown"
              closeOnBlur
              id="dropdown"
              item
              simple
              text="Categories"
              style={{ borderRadius: "0", width: "10rem", fontWeight: "700" }}
            >
              <Dropdown.Menu
                style={{
                  borderRadius: "0",
                  border: "0",
                  width: "10rem",
                  fontWeight: "700"
                }}
              >
                <Dropdown.Item as={Link} to="/shop/boots">
                  Electronics
                </Dropdown.Item>
                <Dropdown.Item>Automotive</Dropdown.Item>
                <Dropdown.Item>Home</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Menu.Item
              name="messages"
              active={activeItem === "messages"}
              onClick={this.handleItemClick}
              style={{}}
            />
            <Menu.Item
              name="friends"
              active={activeItem === "friends"}
              onClick={this.handleItemClick}
              style={{ marginRight: "4rem" }}
            />
            <Menu.Item
              as={Link}
              to="/cart"
              name="carrello"
              active={activeItem === "video play"}
              onClick={this.handleItemClick}
            >
              <Icon name="cart" size="large" />
              <Label
                key={this.props.nProducts}
                className="label-animation"
                circular
                size="mini"
                style={{
                  marginLeft: "-1.1rem",
                  marginBottom: "-0.7rem",
                  zIndex: "5000",
                  backgroundColor: "#f76262"
                }}
              >
                {this.props.nProducts}
              </Label>
            </Menu.Item>
            <Menu.Item
              as={Link}
              to="/userpage"
              name="User"
              active={activeItem === "video play"}
              onClick={this.handleItemClick}
              style={{ marginRight: "1rem" }}
            >
              <Label
                style={{
                  color: "#f76262",
                  backgroundColor: "#fff",
                  letterSpacing: "1px"
                }}
              >
                {isAuth ? customer.email : "Benvenuto, cliente"}
              </Label>
              <Dropdown closeOnBlur id="dropdownUser" simple icon="user">
                <Dropdown.Menu
                  style={{
                    borderRadius: "0",
                    border: "0",
                    width: "10rem",
                    fontWeight: "700"
                  }}
                >
                  <Dropdown.Item as={Link} to="/shop/boots">
                    I mie Ordini
                  </Dropdown.Item>
                  <Dropdown.Item>Indirizzi</Dropdown.Item>
                  <Dropdown.Item>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        {children}
      </Responsive>
    );
  }
}

export default NavbarFeatures;
