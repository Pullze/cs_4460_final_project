import { dataset } from "./data";
import { Layout, Table, Row, Col } from 'antd';
import 'antd/dist/reset.css';

const { Header, Footer, Content } = Layout;

export default function Vis (props) {
  const data = JSON.stringify(dataset)
  const columns = [
    {
      title: 'Case',
      dataIndex: 'Case',
      key: 'case',
    },
    {
      title: 'Location',
      dataIndex: 'Location',
      key: 'location',
    },
    {
      title: 'Date',
      dataIndex: 'Date',
      key: 'date',
    },
    {
      title: 'Total Victims',
      dataIndex: 'Total Victims',
      key: 'Total Victims',
    }
  ];
  return (
    <Layout>
      <Header>Header</Header>
      <Row justify={"center"}>
        <Col xs={24} sm={24} md={18} lg={18} xl={19} xxl={20}>
          <Content style={{background: '#fff'}}>
            <h1> CS 4460 Final Vis</h1>
            <Table dataSource={dataset} columns={columns} />
          </Content>
        </Col>
      </Row>
      <Footer>Footer</Footer>
    </Layout>
  );
}