import React, { Component } from "react";
import {
  Menu,
  Icon,
  Responsive,
  Sidebar,
  Button,
  Segment
} from "semantic-ui-react";

class NavBarMobile extends Component {
  state = { visible: false };

  toggleVisibility = () => this.setState({ visible: !this.state.visible });

  componentWillUpdate() {
    console.log(this.state.visible);
  }

  render() {
    const { children } = this.props;
    const { visible } = this.state;

    return (
      <Responsive maxWidth={767}>
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation="overlay"
            direction="right"
            width="thin"
            visible={visible}
            vertical
            inverted
          >
            <Menu.Item name="home">
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
          <Sidebar.Pusher
            dimmed={visible}
            onClick={this.toggleVisibility}
            style={{ minHeight: "100vh" }}
          >
            <Menu
              style={{
                borderRadius: "0",
                backgroundColor: "transparent"
              }}
              borderless
            >
              <Menu.Menu position="left">
                <Menu.Item name="Logo" />
              </Menu.Menu>
              <Menu.Menu position="right">
                <Menu.Item onClick={this.toggleVisibility}>
                  <Icon name="sidebar" />
                </Menu.Item>
              </Menu.Menu>
            </Menu>
            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Responsive>
    );
  }
}

export default NavBarMobile;
