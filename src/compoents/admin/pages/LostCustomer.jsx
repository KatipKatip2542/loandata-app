import {
  Card,
  CardFooter,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";

import Select from "react-select";


import { useRecoilValue } from "recoil";

import { locationStore , customerIdStore , processStore } from "../../../store/Store";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useEffect, useState } from "react";

import { getLostCustomer } from "../../../api/ReportApi";



const LostCustomer = () => {
  const [listData, setListData] = useState([]);
  const [isSearchable, setIsSearchable] = useState(true);
  const customerId = useRecoilValue(customerIdStore);
  const dataProcessStore = useRecoilValue(processStore);
  const [sendId, setSendId] = useState("");

  //----- จัดการแสดงข้อมูล / หน้า -------------- //
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = Array.isArray(listData?.data)
    ? listData?.data?.slice(startIndex, endIndex)
    : [];

  const totalPages = Math.ceil(listData?.data?.length / itemsPerPage);

  const dataLocationStore = useRecoilValue(locationStore);

  const locationOptions = dataLocationStore?.map((location) => ({
    value: location.id,
    label: location.name,
  }));

  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleLocationSelect = (e) => {
    // ค้นหาข้อมูลลูกค้าที่ถูกเลือกจาก customerDataStore
    const locations = dataLocationStore.find(
      (location) => location.id === e.value
    );
    // เซ็ตข้อมูลลูกค้าที่ถูกเลือกใน state
    setSelectedLocation(locations);
    setSendId(locations?.id || "");
  };

  // console.log(selectedLocation);

  const fecthLostCustomer = async () => {
    try {
      const respone = await getLostCustomer(customerId);
      // console.log(respone)
      setListData(respone);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fecthLostCustomer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendId]);

  // console.log(listData)

  return (
    <div>
      <div className=" h-[74vh]  ">
      <ToastContainer className="toast " autoClose={800} theme="colored" />
        <div className="flex flex-col w-full">
          {/* <p>ข้อมูลผู้บริจาค</p> */}
          <div className="w-full  flex  flex-col-reverse items-center md:flex-row justify-center sm:justify-between  ">
            <div className="w-full md:w-[50%] flex mt-5   px-0 md:mx-10 ">
              <Typography className=" font-bold ">
                รายงานลูกค้าทั้งหมดที่ยังจ่ายเงินไม่ครบ :  <span>{dataProcessStore?.name}</span>
              </Typography>
            </div>
            {/* <div className="w-full  flex   ">
              <div className="w-full flex flex-col md:flex-row justify-center md:justify-end items-center gap-5">
                <Select
                  classNamePrefix="select"
                  placeholder="เลือกจังหวัด"
                  className="w-full lg:w-[50%]"
                  isSearchable={isSearchable}
                  name="color"
                  options={locationOptions}
                  onChange={(e) => handleLocationSelect(e)}
                />
              </div>
            </div> */}
          </div>
          <div className="flex flex-col lg:flex-row w-full gap-5">
            <div className="flex w-full lg:w-[80%] ">
              <Card className="mt-5 w-full border-2 overflow-auto shadow-lg " style={{ border: "1px solid #b3b3b3"  }}>
                <div>
                  <table className="w-full min-w-max ">
                    <thead>
                      <tr>
                        <th className="border-y border-purple-100 bg-purple-300/50 p-4 ">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold leading-none opacity-70"
                          >
                            ลำดับ
                          </Typography>
                        </th>
                        <th className="border-y border-purple-100 bg-purple-300/50 p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold leading-none opacity-70"
                          >
                            ชื่อ
                          </Typography>
                        </th>
                        <th className="border-y border-purple-100 bg-purple-300/50 p-4 ">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold leading-none opacity-70"
                          >
                            สถานที่
                          </Typography>
                        </th>
                        <th className="border-y border-purple-100 bg-purple-300/50 p-4 ">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold leading-none opacity-70"
                          >
                            จำนวนยืม
                          </Typography>
                        </th>
                        <th className="border-y border-purple-100 bg-purple-300/50 p-4 ">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold leading-none opacity-70"
                          >
                            จ่ายแล้ว
                          </Typography>
                        </th>
                        <th className="border-y border-purple-100 bg-purple-300/50 p-4  ">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold leading-none opacity-70"
                          >
                            ยอดค้างจ่าย
                          </Typography>
                        </th>
                        <th className="border-y border-purple-100 bg-purple-300/50 p-4  ">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold leading-none opacity-70"
                          >
                            กำไร
                          </Typography>
                        </th>
                      </tr>
                    </thead>
                    {listData?.length == 0 ? (
                      <tbody>
                        <tr>
                          <td colSpan={6} className=" text-center pt-5 ">
                            <Typography>...ไม่พบข้อมูล...</Typography>
                          </td>
                        </tr>
                      </tbody>
                    ) : (
                      <tbody>
                        {displayedData.map((data, index) => {
                          const isLast = index === displayedData.length - 1;
                          const pageIndex = startIndex + index;
                          const classes = isLast
                            ? "p-2"
                            : "p-3 border-b border-blue-gray-50";

                          return (
                            <tr key={index}>
                              <td className={classes}>
                                <div className="flex items-center justify-center">
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal "
                                  >
                                    {pageIndex + 1 || ""}
                                  </Typography>
                                </div>
                              </td>
                              <td className={classes}>
                                <div className="flex items-center justify-center">
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal "
                                  >
                                    {data?.name || ""}
                                  </Typography>
                                </div>
                              </td>
                              <td className={classes}>
                                <div className="flex items-center justify-center">
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal "
                                  >
                                    {data?.house_name || ""}
                                  </Typography>
                                </div>
                              </td>
                              <td className={classes}>
                                <div className="flex items-center justify-center ">
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal "
                                  >
                                    {Number(data?.total).toLocaleString() ||
                                      ""}
                                  </Typography>
                                </div>
                              </td>
                              <td className={classes}>
                                <div className="flex items-center justify-center ">
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal "
                                  >
                                    {Number(data?.paid).toLocaleString() || ""}
                                  </Typography>
                                </div>
                              </td>
                              <td className={classes}>
                                <div className="flex items-center justify-center ">
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal "
                                  >
                                    {Number(data?.overdue) < 0 ? "0" : Number(data?.overdue).toLocaleString() }
                                  </Typography>
                                </div>
                              </td>
                              <td className={classes}>
                                <div className="flex items-center justify-center ">
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal "
                                  >
                                    {Number(data?.overdue) < 0 ?  Math.abs(Number(data?.overdue)).toLocaleString() : 0 }
                                  </Typography>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    )}
                  </table>
                </div>
                <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                  <Button
                    variant="outlined"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    ก่อนหน้า
                  </Button>
                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                      <IconButton
                        key={i}
                        variant="outlined"
                        size="sm"
                        onClick={() => setCurrentPage(i + 1)}
                        className={
                          currentPage === i + 1
                            ? "bg-purple-400 text-white"
                            : ""
                        }
                      >
                        {i + 1}
                      </IconButton>
                    ))}
                  </div>
                  <Button
                    variant="outlined"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    ถัดไป
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <div className="flex w-full lg:w-[20%] flex-col h-full   justify-center md:justify-end   ">
              <div
                className="p-3 md:h-[180px] items-center mt-5 px-5 rounded-md "
                style={{ border: "3px solid #b3b3b3"  }}
              >
                <Typography className=" font-bold mt-2">
                  จำนวนยืม: <sapn className="font-normal">{Number(listData?.totals?.total).toLocaleString() == "NaN" ? 0 : Number(listData?.totals?.total).toLocaleString()}</sapn> บาท
                </Typography>
                <Typography className=" font-bold mt-1">
                  จ่ายแล้ว: <sapn className="font-normal">{Number(listData?.totals?.price).toLocaleString() == 'NaN' ? 0 : Number(listData?.totals?.price).toLocaleString()}</sapn> บาท
                </Typography>
                <Typography className=" font-bold mt-1">
                  ค้างจ่าย: <sapn className="font-normal">{Number(listData?.totals?.overdue).toLocaleString() == 'NaN'  ? 0 : Number(listData?.totals?.overdue) < 0 ? 0 : Number(listData?.totals?.overdue).toLocaleString()}</sapn> บาท
                </Typography>
                <Typography className=" font-bold mt-1">
                  กำไร: <sapn className="font-normal">{Number(listData?.totals?.overdue).toLocaleString() == 'NaN' ? 0 : Number(listData?.totals?.overdue) < 0 ?  Math.abs(Number(listData?.totals?.overdue)).toLocaleString() : 0 }</sapn> บาท
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LostCustomer;
