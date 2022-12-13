import "antd/dist/reset.css";

import { Col, Descriptions, Divider, Layout, Row, Table } from "antd";
import { Link, Outlet } from "react-router-dom";

import CaseTable from "./CaseTable";
import React from "react";
import Scatter from "./plot/Scatter";
import { dataset } from "./data";

const { Header, Footer, Content } = Layout;

export default function Vis(props) {
  const data = JSON.stringify(dataset);
  return (
    <>
      <Layout style={{ background: "#fff" }}>
        <Header style={{ color: "white" }}>
          <Link to="/1">Header</Link>
        </Header>
        <Row justify={"center"}>
          <Col xs={20} sm={20} md={20} lg={18} xl={18} xxl={18}>
            <Content
              style={{
                background: "#fff",
                paddingTop: "5%",
                paddingBottom: "5%",
              }}
            >
              <h1> CS 4460 Final Vis</h1>
              <Scatter data={dataset}></Scatter>
            </Content>
          </Col>
        </Row>
        <Footer>
          <Divider plain> Made with ❤️ by CS students. </Divider>
        </Footer>
      </Layout>
      <Outlet />
    </>
  );
}
