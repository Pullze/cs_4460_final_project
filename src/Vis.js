import "antd/dist/reset.css";

import {
  Col,
  Descriptions,
  Divider,
  Layout,
  Row,
  Table,
  Tabs,
  Typography,
} from "antd";
import { Link, Outlet } from "react-router-dom";

import CaseTable from "./CaseTable";
import MapPage from "./map/MapPage";
import React from "react";
import Scatter from "./plot/Scatter";
import { dataset } from "./data";

const { Header, Footer, Content } = Layout;
const { Paragraph, Title, Text } = Typography;

export default function Vis(props) {
  const data = JSON.stringify(dataset);
  return (
    <>
      <Layout style={{ background: "#fff" }}>
        <Header
          style={{
            background: "#fff",
            boxShadow:
              "0 1px 2px 0 rgb(0 0 0 / 3%), 0 1px 6px -1px rgb(0 0 0 / 2%), 0 2px 4px 0 rgb(0 0 0 / 2%)",
            zIndex: "999",
          }}
        >
          <Text keyboard style={{ lineHeight: "64px", fontSize: "22px" }}>
            CS 4460 Info Vis
          </Text>
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
              <>
                <Title level={1} style={{marginBottom: 0}}> US Mass Shootings, 1982–2022 </Title>
                <Text italic> Lidan Zheng, Lai Wang </Text>
              </>
              <>
                <Paragraph style={{marginTop: "2vh"}}>
                  Mass shootings are a pervasive and tragic issue in the United States. These incidents,
                  defined as a shooting in which four or more people are killed or injured, have resulted in hundreds
                  of fatalities and injuries and have had a devastating impact on communities across the country.
                  In this project, we visualize the data on mass shootings in the U.S. to better understand the
                  prevalence and patterns of these incidents and to provide insights on this important issue.
                </Paragraph>
                <Paragraph>
                  Our visualizations provide insights on the frequency and location of mass shootings, as well as
                  key trends and patterns in mass shootings, such as the high concentration of incidents in certain
                  states. We provides a scatter plot and a map which is switchable in the tabs below. Both visualization
                  is interactive.
                </Paragraph>
              </>
              <Tabs
                style={{marginTop: "4vh"}}
                defaultActiveKey="1"
                type="card"
                items={[
                  {
                    label: "Plot",
                    key: "1",
                    children: <Scatter data={dataset}></Scatter>,
                  },
                  {
                    label: "Map",
                    key: "2",
                    children: <MapPage />,
                  },
                ]}
                // onChange={(activeKey) => setActiveTab(activeKey)}
              />
              {/* <Scatter data={dataset}></Scatter> */}
              <>
                <Title level={2}> Dataset </Title>
                <Paragraph>
                  The dataset we use is a cleaned version of the U.S. mass
                  shooting dataset from{" "}
                  <a
                    href={
                      "https://www.motherjones.com/politics/2012/12/mass-shootings-mother-jones-full-data/"
                    }
                    target={"_blank"}
                  >
                    Mother Jones
                  </a>
                  . This database originally covered cases from 1982 to 2012 and
                  has since been updated and expanded numerous times. Note that
                  this database does noe include the New York City subway
                  shooting on April 12, the school shooting in Washington, DC on
                  April 22, or other such attacks in which fewer than three
                  victim died. The full dataset is shown in the table below.
                  Click the "+" sign at each column will show additional details
                  of each case.
                </Paragraph>
              </>
              <CaseTable dataset={dataset} />
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
