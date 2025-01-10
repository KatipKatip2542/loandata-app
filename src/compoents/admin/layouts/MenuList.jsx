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

  const [HideActive, setHideActive] = useState(0);

  const checkScreenSize = () => {
    if (window.innerWidth < 960) {
      setHideActive(1);
    } else {
      setHideActive(0);
    }
  };

  const menuItems = [
    {
      key: "/admin",
      icon: <DatabaseOutlined style={iconStyle} />,
      label: (
        <Link
          to="/admin"
          onClick={() => (HideActive === 1 ? setCollapsed(!collapsed) : "")}
        >
          สถานที่
        </Link>
      ),
    },
    {
      key: "/admin/report/check",
      icon: <TbReportAnalytics style={iconStyle} />,
      label: (
        <Link
          to="/admin/report/check"
          onClick={() => (HideActive === 1 ? setCollapsed(!collapsed) : "")}
        >
          ยังจ่ายไม่ครบ
        </Link>
      ),
    },
  ];

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
      {/* <ConfigProvider
        theme={{
          token: {
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

          <Menu.Item key="/admin/report/check" icon={<TbReportAnalytics style={iconStyle} />}>
            <Link to="/admin/report/check" onClick={() => [HideActive == 1 ? setCollapsed(!collapsed) : '']} >
              ยังจ่ายไม่ครบ
            </Link>
          </Menu.Item>

        </Menu>
      </ConfigProvider> */}

      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#aa3dac",
          },
        }}
      >
        <Menu
          theme={darkTheme ? "dark" : "light"}
          mode="inline"
          className="menu-bar"
          selectedKeys={[currentPath]}
          items={menuItems} 
        />
      </ConfigProvider>
    </div>
  );
};

export default MenuList;
