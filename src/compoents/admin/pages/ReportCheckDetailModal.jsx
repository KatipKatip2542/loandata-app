import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Card,
  Switch,
  IconButton,
} from "@material-tailwind/react";
import { Typography } from "antd";
import {
  changeCancel,
  changeStatus,
  getProcessUserList,
} from "../../../api/ProcessApi";
import { toast } from "react-toastify";
import { FaRegSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import moment from "moment";

const ReportCheckDetailModal = ({ open, handleOpen, process_id , process_user_id, fetchData, process_user_name }) => {
  const [sumUser, setSumUser] = useState([]);
  const [activeRow2, setActiveRow2] = useState(0);
  const [changeDate, setChangeDate] = useState("");
  const [price, setPrice] = useState(null);



  //----- จัดการแสดงข้อมูล / หน้า -------------- //
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 300;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const dateSend = moment(changeDate).format("YYYY-MM-DD");


  const fetchUserList = async () => {
    try {
      const response = await getProcessUserList(process_user_id);

      if (response?.status == 200) {
        setSumUser(response?.data);
      } else {
        toast.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeSwitch = (index, checked) => {
    const updatedSumUser = sumUser.map((data, i) => {
      if (i === index) {
        return {
          ...data,
          status_count: checked == true ? "1" : "0",
        };
      }
      return data;
    });
    setSumUser(updatedSumUser);
  };

  const handleChangeStatus = async (changestatus, dataed) => {
    try {
      if (
       
        dateSend == "Invalid date" ||
        ("" && price == null) ||
        price < 0 ||
        price == null ||
        price < 0
      ) {
        toast.error("กรุณาระบบวันที่ และ  จำนวนเงิน");
      } else {
        const data = {
          id: dataed?.id,
          status: changestatus,
          price: price,
          process_user_id: process_user_id,
          process_id: process_id,
          date: dateSend == "Invalid date" ? null : dateSend,
          status_count: dataed?.status_count,
        };
        console.log(data);
        


        const response = await changeStatus(data);
        console.log(response);
        if (response.status == 200) {
          toast.success("เปลี่ยนสถานะ สำเร็จ");
          setChangeDate("");
          setPrice(null);
          fetchUserList()
          fetchData()
        } else {
          toast.error(response?.response?.data);
        }
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleChangeCancel = async (changestatus, dataed) => {
    try {
      let data = {
        id: dataed?.id,
        status: Number(changestatus),
        price: price <= 0 ? dataed?.price : price,
        process_user_id: process_user_id,
        process_id: process_id,
        date: moment(dataed?.date, "DD-MM-YYYY")
          .add(-543, "years")
          .format("YYYY-MM-DD"),
      };
      const response = await changeCancel(data);
      // console.log(response);
      if (response.status == 200) {
        toast.success("เปลี่ยนสถานะ สำเร็จ");
        setChangeDate("");
        fetchUserList()
      
      } else {
        toast.error(response?.response?.data);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const checkInputDate = (e, index) => {
    const date = moment(e.target.value).add(+543, "years").format("DD-MM-YYYY");
    if (sumUser.some((item) => item.date === date)) {
      toast.error(`วันที่ ${date} มีอยู่แล้ว`);
      const newInputDates = [...changeDate];
      newInputDates[index] = "";
      document.getElementById("myInput").value = "";
      setChangeDate("");
    } else {
      setChangeDate(e.target.value);
    }
  };

  useEffect(() => {
    if (open) {
      fetchUserList();
    }
  }, [open, process_user_id]);

  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>
        <div>{process_user_name} </div>
      </DialogHeader>
      <DialogBody>
        <div className=" flex flex-col md:flex-row  items-center sm:items-start  w-full justify-center md:justify-start gap-5  ">
          <div className="w-full">
            <Card
              className="w-full md:h-[66vh] lg:h-[60vh] xl:h-[40vh]  2xl:h-[42vh]  p-2 rounded-md"
              style={{ border: "2px solid #b3b3b3" }}
            >
              <div className="h-[380px] overflow-auto ">
                <table className="w-full min-w-max  ">
                  <thead>
                    <tr>
                      <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-1 ">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold leading-none opacity-70"
                        >
                          จำนวน
                        </Typography>
                      </th>
                      <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-1 ">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold leading-none opacity-70"
                        >
                          วันที่
                        </Typography>
                      </th>
                      <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-1 ">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold leading-none opacity-70"
                        >
                          ราคา
                        </Typography>
                      </th>
                      <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-1 ">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold leading-none opacity-70"
                        >
                          สถานะ
                        </Typography>
                      </th>
                      <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-1 ">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold leading-none opacity-70"
                        >
                          ไม่นับ/นับ
                        </Typography>
                      </th>
                      <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-1">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold leading-none opacity-70"
                        >
                          บันทึก/ยกเลิก
                        </Typography>
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {sumUser?.map((data, index) => {
                      const isLast = index === sumUser?.length;
                      const pageIndex = startIndex + index;
                      const classes = isLast
                        ? "p-1"
                        : `p-1 border-b border-blue-gray-50 ${
                            data?.status == 1 ? "bg-gray-300" : ""
                          } `;
                      return (
                        <tr key={index}>
                          <td className={classes}>
                            <div className="flex items-center justify-center">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {pageIndex + 1 || ""}
                              </Typography>
                            </div>
                          </td>
                          {data?.date == "Invalid dateInvalid date" ? (
                            <td className={classes}>
                              <div className="flex items-center justify-center ">
                                <input
                                  type="date"
                                  id="myInput"
                                  className=" border-2 border-black text-center bg-gray-200 "
                                  placeholder="ระบุวันที่ DD-MM-YYY"
                                  // value={data?.date || ''}
                                  // onChange={(e) =>
                                  //   setChangeDate(e.target.value)
                                  // }
                                  onChange={(e) => checkInputDate(e, index)}
                                />
                              </div>
                            </td>
                          ) : (
                            <td className={classes}>
                              <div className="flex items-center justify-center">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {data?.date}
                                </Typography>
                              </div>
                            </td>
                          )}
                          {data?.price == null || data?.price < 0 ? (
                            <td className={classes}>
                              <div className="flex items-center justify-center ">
                                <input
                                  type="number"
                                  min="0"
                                  className=" border-2 w-24 border-black text-center bg-gray-200 "
                                  placeholder="ใส่ราคา"
                                  onChange={(e) => setPrice(e.target.value)}
                                />
                              </div>
                            </td>
                          ) : (
                            <td className={classes}>
                              <div className="flex items-center justify-center">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {data?.price}
                                </Typography>
                              </div>
                            </td>
                          )}

                          <td className={classes}>
                            <div className="flex items-center justify-center">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className={`font-normal ${
                                  data?.status == "0"
                                    ? "bg-red-300 bg-opacity-60 px-3   rounded-lg "
                                    : data?.status == "1"
                                    ? "bg-green-300 bg-opacity-60 px-3   rounded-lg"
                                    : ""
                                } `}
                              >
                                {data?.status == 0
                                  ? "ยังไม่จ่าย"
                                  : data?.status == 1
                                  ? "จ่ายแล้ว"
                                  : ""}
                              </Typography>
                            </div>
                          </td>
                          <td className={classes}>
                            <div className="flex items-center justify-center">
                              <Switch
                                color="blue"
                                checked={data.status_count == "1"}
                                onChange={(e) =>
                                  handleChangeSwitch(index, e.target.checked)
                                }
                                disabled={data?.status == 1 ? true : false}
                              />
                            </div>
                          </td>
                          <td className={classes}>
                            <div className="flex items-center justify-center">
                              <IconButton
                                variant="outlined"
                                color="green"
                                size="sm"
                                className="ml-3 "
                                disabled={data?.status == 0 ? false : true}
                                onClick={() => [
                                  setActiveRow2(index),
                                  handleChangeStatus(
                                    data?.status == 0
                                      ? "1"
                                      : data?.status == 1
                                      ? "0"
                                      : "",
                                    data
                                  ),
                                ]}
                              >
                                <FaRegSave className="h-5 w-5  text-green-700 " />
                              </IconButton>
                              <IconButton
                                variant="outlined"
                                color="red"
                                size="sm"
                                className="ml-1  "
                                disabled={data?.status == 1 ? false : true}
                                onClick={() => [
                                  setActiveRow2(index),
                                  handleChangeCancel(
                                    data?.status == 0
                                      ? "1"
                                      : data?.status == 1
                                      ? "0"
                                      : "",
                                    data
                                  ),
                                  // handleButton(),
                                ]}
                              >
                                <MdCancel className="h-6 w-6  text-light-red-700 " />
                              </IconButton>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
          {/* <div
                  className="flex w-full  md:w-[30%] md:h-[450px] lg:h-[400px]  xl:h-[279px] 2xl:h-[291px]  rounded-md  "
                  style={{ border: "2px solid #b3b3b3" }}
                >
                  <div className="w-full gap-3  p-3">
                    <Typography className="text-xl font-bold">
                      ยอดรวม ({userListData?.name})
                    </Typography>
                    <Typography className=" font-bold mt-3">
                      ระยะเวลา:{" "}
                      <sapn>
                        {" "}
                        {Number(userListSum?.count_day).toLocaleString() ==
                        "NaN"
                          ? 0
                          : Number(userListSum?.count_day).toLocaleString()}
                      </sapn>{" "}
                      วัน
                    </Typography>
                    <Typography className=" font-bold mt-1  ">
                      ชำระแล้ว:{" "}
                      <sapn>
                        {" "}
                        {Number(userListSum?.pay_date).toLocaleString() == "NaN"
                          ? 0
                          : Number(userListSum?.pay_date).toLocaleString()}
                      </sapn>{" "}
                      วัน
                    </Typography>
                    <Typography className=" font-bold mt-1  ">
                      คงเหลือ:{" "}
                      <sapn>
                        {" "}
                        {Number(userListSum?.pay_date).toLocaleString() == "NaN"
                          ? 0
                          : Number(
                              userListSum?.count_day - userListSum?.pay_date
                            ).toLocaleString()}
                      </sapn>{" "}
                      วัน
                    </Typography>
                    <hr className="h-0.5 bg-gray-400 mt-1.5" />
                    <Typography className=" font-bold mt-1">
                      ยอดยืม:{" "}
                      <sapn>
                        {" "}
                        {Number(userListSum?.total).toLocaleString() == "NaN"
                          ? 0
                          : Number(userListSum?.total).toLocaleString()}
                      </sapn>{" "}
                      บาท
                    </Typography>
                    <Typography className=" font-bold mt-1">
                      ยอดสุทธิ:{" "}
                      <sapn>
                        {" "}
                        {Number(userListSum?.newTotal).toLocaleString() == "NaN"
                          ? 0
                          : Number(userListSum?.newTotal).toLocaleString()}
                      </sapn>{" "}
                      บาท
                    </Typography>
                    <Typography className=" font-bold mt-1">
                      ชำระแล้ว:{" "}
                      <sapn>
                        {Number(userListSum?.paid).toLocaleString() == "NaN"
                          ? 0
                          : Number(userListSum?.paid).toLocaleString()}
                      </sapn>{" "}
                      บาท
                    </Typography>
                    <Typography className=" font-bold mt-1">
                      ค้างชำระ:{" "}
                      <sapn>
                        {Number(userListSum?.overdue).toLocaleString() == "NaN"
                          ? 0
                          : Number(userListSum?.overdue) < 0
                          ? 0
                          : Number(userListSum?.overdue).toLocaleString()}
                      </sapn>{" "}
                      บาท
                    </Typography>
                  </div>
                </div> */}
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={handleOpen}
          className="mr-1"
        >
          <span>ออก</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ReportCheckDetailModal;
