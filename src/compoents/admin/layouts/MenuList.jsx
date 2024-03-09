import { Menu, ConfigProvider } from "antd";
import { DatabaseOutlined } from "@ant-design/icons";
import { TbReportAnalytics } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import { GoWorkflow } from "react-icons/go";

import { collapsedStore } from "../../../store/Store";
import { useRecoilState } from "recoil";

// eslint-disable-next-line no-unused-vars, react/prop-types
const MenuList = ({ darkTheme, toggleTheme }) => {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  const iconStyle = { fontSize: "26px", marginRight: "5px", marginTop: "7px" };

  const [collapsed, setCollapsed] = useRecoilState(collapsedStore);

  const [HideActive , setHideActive] = useState(0)

  const checkScreenSize = () => {
    if (window.innerWidth < 960) {
      setHideActive(1);
    } else {
      setHideActive(0);
    }
  };

  useEffect(() => {
    // เรียกฟังก์ชันเมื่อ Component โหลดหรือขนาดหน้าจอเปลี่ยน
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    // คืนค่าเมื่อ Component ถูก Unmount เพื่อเลิกติดตามการเปลี่ยนขนาดหน้าจอ
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return (
    <div>
      <ConfigProvider
        theme={{
          token: {
            // colorPrimary: "#EF86F1",
            // colorPrimary: "#ED5EF0",
            colorPrimary: "#aa3dac",
          },
        }}
      >
        <Menu
          theme={darkTheme ? "dark" : "light"}
          mode="inline"
          className="menu-bar"
          selectedKeys={[currentPath]}
        >
          <Menu.Item key="/admin" icon={<DatabaseOutlined style={iconStyle} />}>
            <Link to="/admin" onClick={() => [HideActive == 1 ? setCollapsed(!collapsed) : '']} >
              สถานที่
            </Link>
          </Menu.Item>
          {/* <Menu.Item 
            key="/admin/process"
            icon={<GoWorkflow style={iconStyle} />}
          >
            <Link to="/admin/process"  onClick={() => [HideActive == 1 ? setCollapsed(!collapsed) : '']} >
              Process
            </Link>
          </Menu.Item> */}
          {/* <Menu.Item
            key="/admin/report"
            icon={<TbReportAnalytics style={iconStyle} />}
          >
            <Link to="/admin/report"  onClick={() => [HideActive == 1 ? setCollapsed(!collapsed) : '']} >
              รายงาน
            </Link>
          </Menu.Item> */}
        </Menu>
      </ConfigProvider>
    </div>
  );
};

export default MenuList;
