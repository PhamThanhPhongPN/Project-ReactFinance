import React from "react";
import { DownOutlined, SettingOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import "./HomeDropDown.css";
import { useNavigate } from "react-router";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: "My Account",
    disabled: true,
  },
  {
    type: "divider",
  },
  {
    key: "2",
    label: "LogOut",
  },
];

export default function HomeDropDown() {
  const navigate = useNavigate();

  const handleLogOut: MenuProps["onClick"] = ({ key }) => {
    if (key === "2") {
      if (confirm("Do you want to log out?") == true) {
        navigate("/sign-in");
      }
    }
  };

  return (
    <Dropdown menu={{ items, onClick: handleLogOut }}>
      <a onClick={(e) => e.preventDefault()}>
        <Space style={{color: "white"}}>
          Tài khoản
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
}