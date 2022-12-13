import "antd/dist/reset.css";

import {Col, Descriptions, Divider, Layout, Row, Table} from "antd";
import { Link, Outlet } from "react-router-dom";

import { dataset } from "./data";
import Scatter from "./plot/Scatter";
import React from "react";

const { Header, Footer, Content } = Layout;

export default function Vis(props) {
  const data = JSON.stringify(dataset);
  const columns = [
    {
      title: "Case",
      dataIndex: "Case",
      key: "case",
    },
    {
      title: "Location",
      dataIndex: "Location",
      key: "location",
    },
    {
      title: "Date",
      dataIndex: "Date",
      key: "date",
    },
    {
      title: "Type",
      dataIndex: "Type",
      key: "type",
    },
    {
      title: "Fatalities",
      dataIndex: "Fatalities",
      key: "Fatalities",
      render: (text) => (text || "N/A"),
      sorter: {
        compare: (a, b) => a["Fatalities"] - b["Fatalities"],
        multiple: 3,
      }
    },
    {
      title: "Injuries",
      dataIndex: "Injuries",
      key: "Injuries",
      render: (text) => (text || "N/A"),
      sorter: {
        compare: (a, b) => a["Injuries"] - b["Injuries"],
        multiple: 3,
      }
    },
    {
      title: "Total Victims",
      dataIndex: "Total Victims",
      key: "Total Victims",
      render: (text) => (text || "N/A"),
      sorter: {
        compare: (a, b) => a["Total Victims"] - b["Total Victims"],
        multiple: 3,
      }
    },
  ];
  return (
    <>
      <Layout style={{background: "#fff"}}>
        <Header style={{ color: "white" }}>
          <Link to="/1">Header</Link>
        </Header>
        <Row justify={"center"}>
          <Col xs={20} sm={20} md={20} lg={18} xl={18} xxl={18}>
            <Content style={{ background: "#fff", paddingTop: "5%", paddingBottom: "5%"}}>
              <h1> CS 4460 Final Vis</h1>
              <Scatter data={dataset}></Scatter>
              <Table
                size={"middle"}
                dataSource={dataset}
                style={{paddingRight:"5%", paddingLeft:"5%"}}
                rowKey={"Case"}
                columns={columns}
                expandable={{
                  expandedRowRender: (record) => (
                    <Descriptions style={{width: "90%", paddingLeft: "5%"}}
                                  column={24} bordered
                                  size={"small"}
                    >
                      <Descriptions.Item label={"Shooter's Age"} span={8} labelStyle={{fontWeight: "bold"}}>
                        {record["Age"] || "N/A"}
                      </Descriptions.Item>
                      <Descriptions.Item label={"Gender"} span={8} labelStyle={{fontWeight: "bold"}}>
                        {record["Gender"] || "N/A"}
                      </Descriptions.Item>
                      <Descriptions.Item label={"Race"} span={8} labelStyle={{fontWeight: "bold"}}>
                        {record["Race"] || "N/A"}
                      </Descriptions.Item>
                      <Descriptions.Item label={"Weapon(s)"} span={24} labelStyle={{fontWeight: "bold"}}>
                        {record["weapon_details"] || "N/A"}
                      </Descriptions.Item>
                      <Descriptions.Item label={"Summary"} span={24} labelStyle={{fontWeight: "bold"}}>
                        {record["summary"] || "N/A"}
                      </Descriptions.Item>
                    </Descriptions>
                  ),
                  rowExpandable: (record) => record.summary !== null,
                }}
              />
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
