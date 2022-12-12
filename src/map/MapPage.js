import "antd/dist/reset.css";
import "./components/Map.css";

import React, { useEffect, useRef, useState } from "react";

import { Layout } from "antd";
import UsMap from "./components/MapTest";
import { geoUS } from "./geoUS";

const { Header, Footer, Content } = Layout;

export default function MapPage() {
  const mapRef = useRef();
  return (
    <div id="map" ref={mapRef}>
      <UsMap mapData={geoUS.features} />
    </div>
  );
}
