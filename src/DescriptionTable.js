import "antd/dist/reset.css";

import { Button, Descriptions, Empty, Space } from "antd";

import React from "react";

const DescriptionTable = ({ descriptionData, clearDescription }) => {
  return descriptionData !== null ? (
    <Space direction={"vertical"}>
      <Descriptions
        title={"Case Details"}
        column={24}
        style={{ width: "100%" }}
        bordered
        size={"small"}
      >
        <Descriptions.Item
          label={"Case"}
          span={24}
          labelStyle={{ fontWeight: "bold" }}
        >
          {descriptionData["Case"]}
        </Descriptions.Item>
        <Descriptions.Item
          label={"Location"}
          span={12}
          labelStyle={{ fontWeight: "bold" }}
        >
          {descriptionData["Location"] || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item
          label={"Date"}
          span={12}
          labelStyle={{ fontWeight: "bold" }}
        >
          {descriptionData["Date"] || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item
          label={"Total Victims"}
          span={8}
          labelStyle={{ fontWeight: "bold" }}
        >
          {descriptionData["Total Victims"] || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item
          label={"Fatalities"}
          span={8}
          labelStyle={{ fontWeight: "bold" }}
        >
          {descriptionData["Fatalities"] || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item
          label={"Injuries"}
          span={8}
          labelStyle={{ fontWeight: "bold" }}
        >
          {descriptionData["Injuries"] || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item
          label={"Shooter's Age"}
          span={8}
          labelStyle={{ fontWeight: "bold" }}
        >
          {descriptionData["Age"] || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item
          label={"Gender"}
          span={8}
          labelStyle={{ fontWeight: "bold" }}
        >
          {descriptionData["Gender"] || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item
          label={"Race"}
          span={8}
          labelStyle={{ fontWeight: "bold" }}
        >
          {descriptionData["Race"] || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item
          label={"Weapon(s)"}
          span={24}
          labelStyle={{ fontWeight: "bold" }}
        >
          {descriptionData["weapon_details"] || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item
          label={"Summary"}
          span={24}
          labelStyle={{ fontWeight: "bold" }}
        >
          {descriptionData["summary"] || "N/A"}
        </Descriptions.Item>
      </Descriptions>
      <Button onClick={clearDescription}> Clear </Button>
    </Space>
  ) : (
    <Empty style={{ marginTop: "5em", marginBottom: "5em" }}>
      <span>Click a dot to show details.</span>
    </Empty>
  );
};
export default DescriptionTable;
