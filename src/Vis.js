import "antd/dist/reset.css";

import {Col, Descriptions, Divider, Layout, Row, Table, Typography} from "antd";
import { Link, Outlet } from "react-router-dom";

import { dataset } from "./data";
import Scatter from "./plot/Scatter";
import React from "react";

const { Header, Footer, Content } = Layout;
const { Paragraph, Title, Text } = Typography;

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
        <Header style={{ background: "#fff",
          boxShadow: "0 1px 2px 0 rgb(0 0 0 / 3%), 0 1px 6px -1px rgb(0 0 0 / 2%), 0 2px 4px 0 rgb(0 0 0 / 2%)",
          zIndex: "999"
        }}>
          <Text keyboard style={{lineHeight:"64px", fontSize: "22px"}}>CS 4460 Info Vis</Text>
          <Link to="/1">Header</Link>
        </Header>
        <Row justify={"center"}>
          <Col xs={20} sm={20} md={20} lg={18} xl={18} xxl={18}>
            <Content style={{ background: "#fff", paddingTop: "5%", paddingBottom: "5%"}}>
              <>
                <Title level={1}> US Mass Shootings, 1982–2022 </Title>
                <Text italic> Lidan Zheng, Lai Wang </Text>
              </>
              <Scatter data={dataset}></Scatter>
              <>
                <Title level={2}> Dataset </Title>
                <Paragraph>
                  The dataset we use is a cleaned version of the U.S. mass shooting dataset from {' '}
                  <a href={"https://www.motherjones.com/politics/2012/12/mass-shootings-mother-jones-full-data/"}>
                     Mother Jones
                  </a>
                  . This database originally covered cases from 1982 to 2012 and has since been updated and expanded
                  numerous times. Note that this database does noe include the New York City subway shooting on April 12,
                  the school shooting in Washington, DC on April 22, or other such attacks in which fewer than three
                  victim died. The full dataset is shown in the table below. Click the "+" sign at each column will show
                  additional details of each case.
                </Paragraph>
              </>
              <Table
                size={"middle"}
                dataSource={dataset}
                style={{paddingRight:"5%", paddingLeft:"5%", paddingTop: "16px"}}
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
