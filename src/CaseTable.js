import "antd/dist/reset.css";

import { Descriptions, Table } from "antd";

import React from "react";

const CaseTable = ({ dataset }) => {
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
      render: (text) => text || "N/A",
      sorter: {
        compare: (a, b) => a["Fatalities"] - b["Fatalities"],
        multiple: 3,
      },
    },
    {
      title: "Injuries",
      dataIndex: "Injuries",
      key: "Injuries",
      render: (text) => text || "N/A",
      sorter: {
        compare: (a, b) => a["Injuries"] - b["Injuries"],
        multiple: 3,
      },
    },
    {
      title: "Total Victims",
      dataIndex: "Total Victims",
      key: "Total Victims",
      render: (text) => text || "N/A",
      sorter: {
        compare: (a, b) => a["Total Victims"] - b["Total Victims"],
        multiple: 3,
      },
    },
  ];
  return (
    <Table
      size={"middle"}
      dataSource={dataset}
      style={{ paddingRight: "5%", paddingLeft: "5%" }}
      rowKey={"Case"}
      columns={columns}
      pagination={false}
      scroll={{
        y: 480
      }}
      expandable={{
        expandedRowRender: (record) => (
          <Descriptions
            style={{ width: "90%", paddingLeft: "5%" }}
            column={24}
            bordered
            size={"small"}
          >
            <Descriptions.Item
              label={"Shooter's Age"}
              span={8}
              labelStyle={{ fontWeight: "bold" }}
            >
              {record["Age"] || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item
              label={"Gender"}
              span={8}
              labelStyle={{ fontWeight: "bold" }}
            >
              {record["Gender"] || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item
              label={"Race"}
              span={8}
              labelStyle={{ fontWeight: "bold" }}
            >
              {record["Race"] || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item
              label={"Weapon(s)"}
              span={24}
              labelStyle={{ fontWeight: "bold" }}
            >
              {record["weapon_details"] || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item
              label={"Summary"}
              span={24}
              labelStyle={{ fontWeight: "bold" }}
            >
              {record["summary"] || "N/A"}
            </Descriptions.Item>
          </Descriptions>
        ),
        rowExpandable: (record) => record.summary !== null,
      }}
    />
  );
};

export default CaseTable;
