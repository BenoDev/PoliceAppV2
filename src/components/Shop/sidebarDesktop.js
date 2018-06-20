import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  Icon,
  Responsive,
  Sidebar,
  Button,
  Transition,
  Container,
  Divider,
  Breadcrumb,
  Dropdown
} from "semantic-ui-react";

class sidebar extends Component {
  state = { visible: false };

  toggleVisibility = () => this.setState({ visible: !this.state.visible });

  componentWillUpdate() {
    console.log(this.state.visible);
  }

  render() {
    const { children } = this.props;
    const { visible } = this.state;

    return (
      <Sidebar.Pushable fluid as={Container}>
        <Sidebar
          borderless
          as={Menu}
          animation="scale down"
          direction="left"
          visible={visible}
          vertical
        >
          <Menu.Item
            name="hide-filter"
            style={{ marginTop: "1rem" }}
            onClick={this.toggleVisibility}
          >
            Nascondi filtri
          </Menu.Item>

          <Menu.Item name="home" style={{ marginTop: "2rem" }}>
            <Icon name="home" />
            Home
          </Menu.Item>

          <Menu.Item name="gamepad">
            <Icon name="gamepad" />
            Games
          </Menu.Item>
          <Menu.Item name="camera">
            <Icon name="camera" />
            Channels
          </Menu.Item>
        </Sidebar>
        <Menu
          style={{
            borderRadius: "0",
            backgroundColor: "transparent",
            margin: "0",
            marginTop: "2rem",
            height: "4.5rem",
            fontFamily: '"Roboto", sans-serif',
            fontWeight: "700",
            border: "0",
            boxShadow: "none"
          }}
          borderless
          widths={4}
        >
          <Menu.Item onClick={this.toggleVisibility}>Filtra prodotti</Menu.Item>

          <Menu.Item>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to="/">
                Home
              </Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section link>Store</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>T-Shirt</Breadcrumb.Section>
            </Breadcrumb>
            )
          </Menu.Item>
          <Menu.Item>
            Ordina:
            <Dropdown
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
                <Dropdown.Item>Electronics</Dropdown.Item>
                <Dropdown.Item>Automotive</Dropdown.Item>
                <Dropdown.Item>Home</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
          <Menu.Item>
            <Icon name="sidebar" />
          </Menu.Item>
        </Menu>
        <Sidebar.Pusher
          style={{ minHeight: "100vh", transformOrigin: "75% 0" }}
        >
          <div
          // style={
          //   visible ? { paddingRight: "26rem" } : { paddingRight: "0rem" }
          // }
          >
            {children}
          </div>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}

export default sidebar;
