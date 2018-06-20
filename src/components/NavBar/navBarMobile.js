import React, { Component } from "react";
import {
  Menu,
  Icon,
  Responsive,
  Sidebar,
  Button,
  Transition,
  Segment,
  Divider
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
            borderless
            as={Menu}
            animation="overlay"
            direction="right"
            width="wide"
            visible={visible}
            vertical
            inverted
          >
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
          <Sidebar.Pusher
            dimmed={visible}
            onClick={visible ? this.toggleVisibility : null}
            style={{ minHeight: "100vh" }}
          >
            <Menu
              style={{
                borderRadius: "0",
                backgroundColor: "transparent",
                margin: "0",
                height: "4.5rem",
                fontFamily: '"Roboto", sans-serif',
                fontWeight: "700"
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
