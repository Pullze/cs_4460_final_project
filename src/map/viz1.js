import "antd/dist/reset.css";

import { Layout } from "antd";
import Map from "./Map";
import { geoUS } from "./geoUS";

const { Header, Footer, Content } = Layout;

export default function Viz1(props) {
  return (
    <Layout>
      <Header style={{ color: "white" }}>changed</Header>
      <Content>
        <Map mapData={geoUS.features} />
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
}
