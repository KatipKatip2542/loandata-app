import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import { Button } from "antd";

const ThemeButton = ({ darkTheme, toggleTheme }) => {
  return (
    <div className="theme-btn">
      <Button onClick={toggleTheme}>
        {darkTheme ? <HiOutlineSun style={{color:"#fff"}} /> : <HiOutlineMoon  />}
      </Button>
    </div>
  );
};

export default ThemeButton;
