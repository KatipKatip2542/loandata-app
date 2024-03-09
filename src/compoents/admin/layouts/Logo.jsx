/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Button } from "antd";

import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

import { useRecoilState } from "recoil";
import { collapsedStore  } from "../../../store/Store";

const Logo = ({ darkTheme, toggleTheme }) => {
  const [textToggle, setTextToogle] = useState(darkTheme);
  const [collapsed, setCollapsed] = useRecoilState(collapsedStore);
  const [showButton, setShowButton] = useState(false);


  // eslint-disable-next-line no-unused-vars
  const toggleText = () => {
    setTextToogle(!textToggle);
  };

  useEffect(() => {
    toggleText();
  }, [darkTheme]);

  const checkScreenSize = () => {
    if (window.innerWidth < 960) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
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
    <div className="logo ">
      <div className="logo-icon  justify-between">
        <p className={textToggle == false ? "text-white" : "text-black"}>
          Menu
        </p>
      </div>
      <div className=" text-end">
        <Button
          type="text"
          className="toggle"
          disabled={showButton}
          onClick={() => setCollapsed(!collapsed)}
          icon={<MenuFoldOutlined />}
        ></Button>
      </div>
    </div>
  );
};

export default Logo;
