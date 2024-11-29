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
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
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
  
  
    return (
      <div className="flex bg-gray-100 w-full h-[100vh] justify-center">
        <ToastContainer autoClose={2000} theme="colored" />
  
        <Card className="w-96 my-32 border-2 bg-gray-50 ">
          <div className="flex justify-center mt-10">
            <Typography variant="h4">เข้าสู่ระบบ.</Typography>
          </div>
          <CardBody className="flex flex-col  gap-4 mt-10">
            <Input
              color="blue"
              label="UserName"
              size="lg"
              name="username"
              onChange={(e) => handleChange(e)}
            />
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
          </CardBody>
          <CardFooter className="pt-5 ">
            <Button
              color="purple"
              variant="gradient"
              fullWidth
              onClick={handleSignIn}
            >
              <Typography variant="h5" color="white">
                เข้าสู่ระบบ
              </Typography>
            </Button>
  
            {/* <ul className="mx-auto mt-5">
              <li>ADMIN : admin / kk1999</li>
              <li>USER : user1 / user1</li>
            </ul> */}
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  export default Login;
