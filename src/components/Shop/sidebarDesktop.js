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

const orderOptions = [
  { key: 1, text: "Rilevanza", value: "RELEVANCE" },
  { key: 2, text: "Prezzo più alto", value: "desc" },
  { key: 3, text: "Prezzo più basso", value: "asc" },
  { key: 4, text: "Ultimi arrivi", value: "UPDATED_AT" }
];

class sidebar extends Component {
  state = {
    visible: false,
    itemOrder: orderOptions[0].value
  };

  toggleVisibility = () => this.setState({ visible: !this.state.visible });
  handleChange = (e, { value }) => {
    this.setState({ itemOrder: value });
    if (value === "RELEVANCE" || value == "UPDATED_AT") {
      this.props.onOrderChange(value, null);
    } else if (value === "asc" || value == "desc") {
      this.props.onOrderChange(null, value);
    } else {
      this.props.onOrderChange(null, null);
    }
  };

  componentWillUpdate() {
    console.log(this.state.visible);
  }

  render() {
    const { children } = this.props;
    const { visible } = this.state;
    const { itemOrder } = this.state;

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
            <span>
              Ordina:{" "}
              <Dropdown
                inline
                onChange={this.handleChange}
                style={{ borderRadius: "0", fontWeight: "700" }}
                options={orderOptions}
                value={itemOrder}
              />
            </span>
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
