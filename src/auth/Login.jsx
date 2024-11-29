import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";

function Login() {
  const navigate = useNavigate();

  const [sendDataLogin, setSendDataLogin] = useState({});

  const handleChange = (e) => {
    setSendDataLogin((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  //------- API ----------------------//

  const handleSignIn = async () => {
    const data = {
      username: sendDataLogin.username,
      password: sendDataLogin.password,
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API}/api/login`,
        data
      );
      if (res.data.token) {
        localStorage.setItem("Token", res.data.token);
        const token = res.data.token;
        let decoded = jwtDecode(token);
        // console.log(decoded.username)
        if (decoded.status == "0") {
          localStorage.setItem("User", decoded.username);
          toast.success("เข้าสู่ระบบสำเร็จ");
          setTimeout(() => {
            navigate("/admin");
            window.location.reload();
          }, 1000);
        }
      } else {
        toast.error(res?.data?.error);
      }
    } catch (error) {
      toast.error("ไม่สำเร็จ กรุณาลองอีกครั้ง");
    }
  };

  const handleSendNewPassword = async()=>{
    toast.success('รหัสผ่านใหม่ถูกส่งไปยังอีเมลของคุณแล้ว')
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API}/api/login/getEmail/newPassword`
      );
      
    } catch (error) {
      console.log(error);
      toast.error("ไม่สำเร็จ กรุณาลองอีกครั้ง");
      
    }
  }

  return (
    <div className=" bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300  flex  w-full h-[100vh] items-center justify-center">
      <ToastContainer autoClose={2000} theme="colored" />

      <Card className="w-96 py-8  border-2 bg-gray-50 ">
        <div className="flex justify-center ">
          <Typography variant="h4">เข้าสู่ระบบ</Typography>
        </div>
        <CardBody className="flex flex-col  gap-4 mt-2">
          <div className="bg-gray-300 rounded-md">
            <Input
              color="blue"
              label="UserName"
              size="lg"
              name="username"
              variant="outlined"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="bg-gray-300 rounded-md">
            <Input
              type="password"
              color="blue"
              label="Password"
              size="lg"
              name="password"
              onChange={(e) => handleChange(e)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSignIn();
                }
              }}
            />
          </div>

          <div className="mt-4">
            <Button
              color="purple"
              variant="gradient"
              fullWidth
              size="sm"
              onClick={handleSignIn}
            >
              <Typography variant="h5" color="white">
                เข้าสู่ระบบ
              </Typography>
            </Button>
            <button  onClick={handleSendNewPassword} className="mt-4 px-4 py-2 bg-gradient-to-r from-indigo-400 to-purple-400 group hover:from-purple-400 hover:to-indigo-400 text-white w-full rounded-md">
              ขอรหัสผ่านใหม่ (เจ้าของเว็บ)
            </button>{" "}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Login;
