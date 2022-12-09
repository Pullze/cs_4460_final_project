import "antd/dist/reset.css";

import { Col, Layout, Row, Table } from "antd";

import { dataset } from "./data";

const { Header, Footer, Content } = Layout;

export default function Viz1(props) {
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
      title: "Total Victims",
      dataIndex: "Total Victims",
      key: "Total Victims",
      render: (text) => (text === null ? "N/A" : text),
      sorter: {
        compare: (a, b) => a["Total Victims"] - b["Total Victims"],
        multiple: 3,
      },
    },
  ];
  return (
    <Layout>
      <Header style={{ color: "white" }}>changed</Header>
      <Row justify={"center"}>
        <Col xs={24} sm={24} md={18} lg={18} xl={19} xxl={20}>
          <Content style={{ background: "#fff" }}>
            <h1> CS 4460 Final Vis</h1>
            <Table
              dataSource={dataset}
              rowKey={"Case"}
              columns={columns}
              expandable={{
                expandedRowRender: (record) => (
                  <p style={{ margin: 0 }}>{record.summary}</p>
                ),
                rowExpandable: (record) => record.summary !== null,
              }}
            />
          </Content>
        </Col>
      </Row>
      <Footer>Footer</Footer>
    </Layout>
  );
}