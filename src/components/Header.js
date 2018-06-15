import React, { Component } from "react";

import { Link } from "react-router-dom";

import { Menu, Icon, Dropdown, Responsive } from "semantic-ui-react";

class NavbarFeatures extends Component {
  state = { activeItem: "home" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu
        style={{ borderRadius: "0", backgroundColor: "transparent" }}
        borderless
      >
        <Menu.Menu position="left">
          <Menu.Item name="Logo" />
        </Menu.Menu>
        <Responsive {...Responsive.onlyComputer}>
          <Menu.Menu position="right">
            <Dropdown
              closeOnBlur
              id="dropdown"
              item
              simple
              text="Categories"
              style={{ borderRadius: "0", width: "10rem" }}
            >
              <Dropdown.Menu
                style={{ borderRadius: "0", border: "0", width: "10rem" }}
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
            />
            <Menu.Item
              name="friends"
              active={activeItem === "friends"}
              onClick={this.handleItemClick}
              style={{ marginRight: "4rem" }}
            />
            <Menu.Item
              name="carrello"
              active={activeItem === "video play"}
              onClick={this.handleItemClick}
            >
              <Icon name="cart" />
            </Menu.Item>
            <Menu.Item
              name="User"
              active={activeItem === "video play"}
              onClick={this.handleItemClick}
              style={{ marginRight: "4rem" }}
            >
              <Icon name="user" />
            </Menu.Item>
          </Menu.Menu>
        </Responsive>
      </Menu>
    );
  }
}

export default NavbarFeatures;
