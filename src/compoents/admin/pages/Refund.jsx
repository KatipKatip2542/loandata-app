import {
  Card,
  CardFooter,
  Button,
  IconButton,
  Input,
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

import moment from "moment";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { TbDatabaseSearch } from "react-icons/tb";
import { AiOutlineStop } from "react-icons/ai";

import { useEffect, useState } from "react";

import { getRefund, getRefundTable, getPDF } from "../../../api/ReportApi";

import { useRecoilValue } from "recoil";
import { processStore } from "../../../store/Store";

import ReportPdf from "./ReportPdf";
import { BsNutFill } from "react-icons/bs";

const Refund = () => {
  const [listData, setListData] = useState([]);
  const dataProcessStore = useRecoilValue(processStore);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchQuery1, setSearchQuery1] = useState("");

  const fecthRefund = async () => {
    try {
      let data = {
        process_id: dataProcessStore?.id,
        date: searchQuery,
        search: searchQuery1,
      };

      const respone = await getRefund(data);
      // console.log(respone);
      setListData(respone);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fecthRefund();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, searchQuery1]);

  const [tableView, setTableView] = useState([]);
  const fecthRefundDetail = async (id) => {
    try {
      const respone = await getRefundTable(id);
      // console.log(respone);
      setTableView(respone.data);
    } catch (error) {
      toast.error(error);
    }
  };

  //----- จัดการแสดงข้อมูล / หน้า -------------- //
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = Array.isArray(listData)
    ? listData?.slice(startIndex, endIndex)
    : [];

  const totalPages = Math.ceil(listData?.length / itemsPerPage);

  // console.log(listData)

  //------------- modal View -----------------------//
  const [openModalView, setOpenModalView] = useState(false);
  const [dataView, setDataView] = useState([]);

  const handleModalView = (data) => {
    setOpenModalView(!openModalView);
    setDataView(data);
  };
  const [dataPdf,setDataPdf] = useState([])
  //------------- open Receipt A4 Sub  -----------------------//
  const [openModalReceiptSubFull, setOpenModalReceiptSubFull] = useState(false);
  const handleModalReceiptSubFull = () => {
    setOpenModalReceiptSubFull(!openModalReceiptSubFull);
  };
  // console.log(tableView);

  const fecthPdf = async () => {
    try {
      let data = {
        process_id: dataProcessStore?.id,
        date: searchQuery,
        search: searchQuery1,
      };

      const respone = await getPDF(data);
      // console.log(respone);
      setDataPdf(respone);
    } catch (error) {
      toast.error(error);
    }
  };

  // useEffect(() => {
  //   fecthPdf();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [searchQuery, searchQuery1]);

  // console.log(dataPdf)
  // console.log(totalPages)
  // console.log(tableView)

  return (
    <div>
      <div className=" h-[74vh]  ">
        <ToastContainer className="toast " autoClose={800} theme="colored" />
        <div className="flex flex-col w-full">
          {/* <p>ข้อมูลผู้บริจาค</p> */}
          <div className="w-full  flex  flex-col-reverse items-center md:flex-row justify-center sm:justify-between xl:gap-5 ">
            <div className="w-full md:w-[50%] flex mt-5   px-0 md:mx-10 ">
              <Typography className=" font-bold ">
                รายงานลูกค้าทั้งหมดที่รียอด :{" "}
                <span>{dataProcessStore?.name}</span>
              </Typography>
            </div>
            <div className=" w-full lg:w-[20%] mt-5 lg:mt-0 flex flex-col md:flex-row items-center gap-5">
              <Input
                type="date"
                label="ค้นหา วันที่รียอด"
                className="  "
                //   placeholder="ค้นหา ชื่อลูกค้า"
                color="blue-gray"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ backgroundColor: "#F4F4F4" }}
              />
            </div>
            <div className=" w-full mt-5 lg:mt-0 lg:w-[20%]  flex flex-col md:flex-row items-center gap-5">
              <Input
                type="text"
                label="ค้นหา ลูกค้าที่ต้องการ"
                color="blue-gray"
                value={searchQuery1}
                onChange={(e) => setSearchQuery1(e.target.value)}
                style={{ backgroundColor: "#F4F4F4" }}
              />
            </div>
            <div className=" w-full mt-5 lg:mt-0 lg:w-[20%]  flex flex-col md:flex-row items-center gap-5">
              <Button
                color="purple"
                className="w-[200px] lg:w-[150px]"
                onClick={() => [setOpenModalReceiptSubFull(true) , fecthPdf()]}
              >
                PDF
              </Button>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row w-full gap-5">
            <div className="flex w-full lg:px-5 ">
              <Card
                className="mt-5 w-full border-2 overflow-auto shadow-lg "
                style={{ border: "1px solid #cccccc" }}
              >
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
                            ลูกค้า
                          </Typography>
                        </th>
                        <th className="border-y border-purple-100 bg-purple-300/50 p-4 ">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold leading-none opacity-70"
                          >
                            จำนวนเงินยืม
                          </Typography>
                        </th>
                        <th className="border-y border-purple-100 bg-purple-300/50 p-4 ">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold leading-none opacity-70"
                          >
                            จำนวนวัน
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
                            วันรียอด
                          </Typography>
                        </th>
                        <th className="border-y border-purple-100 bg-purple-300/50 p-4  ">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold leading-none opacity-70"
                          >
                            ได้รับสุทธิ
                          </Typography>
                        </th>
                        <th className="border-y border-purple-100 bg-purple-300/50 p-4  ">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold leading-none opacity-70"
                          >
                            จ่ายเกิน
                          </Typography>
                        </th>
                        <th className="border-y border-purple-100 bg-purple-300/50 p-4  ">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold leading-none opacity-70"
                          >
                            ดูรายการ
                          </Typography>
                        </th>
                      </tr>
                    </thead>
                    {listData?.length == 0 ? (
                      <tbody>
                        <tr>
                          <td colSpan={9} className=" text-center pt-5 ">
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
                                    {data?.user || ""}
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
                                    {Number(data?.price).toLocaleString() || ""}
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
                                    {Number(data?.count_day).toLocaleString() ||
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
                                    {Number(data?.price_pay).toLocaleString() ||
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
                                    {moment(data?.date)
                                      .add(543, "years")
                                      .format("DD-MM-YYYY")}
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
                                    {Number(data?.total_sum).toLocaleString()}
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
                                    {Number(data?.qty_overpay).toLocaleString()}
                                  </Typography>
                                </div>
                              </td>
                              <td className={classes}>
                                <div className="flex justify-center  px-3 gap-2">
                                  <IconButton
                                    variant="outlined"
                                    size="sm"
                                    onClick={() => [
                                      handleModalView(data),
                                      fecthRefundDetail(data?.id),
                                    ]}
                                  >
                                    <TbDatabaseSearch className="h-6 w-6  text-blue-700 " />
                                  </IconButton>
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
            {/* <div className="flex w-full lg:w-[20%] flex-col h-full   justify-center md:justify-end    ">
              <div
                className="p-3 md:h-[180px] items-center mt-2 md:mt-5 px-5 rounded-md  "
                style={{ border: "3px solid #b3b3b3" }}
              >
                <Typography className=" font-bold mt-2">
                  จำนวนยืม:{" "}
                  <sapn className="font-normal">
                    {Number(listData?.totals?.total).toLocaleString() == "NaN"
                      ? 0
                      : Number(listData?.totals?.total).toLocaleString()}
                  </sapn>{" "}
                  บาท
                </Typography>
                <Typography className=" font-bold mt-1">
                  จ่ายแล้ว:{" "}
                  <sapn className="font-normal">
                    {Number(listData?.totals?.price).toLocaleString() == "NaN"
                      ? 0
                      : Number(listData?.totals?.price).toLocaleString()}
                  </sapn>{" "}
                  บาท
                </Typography>
                <Typography className=" font-bold mt-1">
                  ค้างจ่าย:{" "}
                  <sapn className="font-normal">
                    {Number(listData?.totals?.overdue).toLocaleString() == "NaN"
                      ? 0
                      : Number(listData?.totals?.overdue) < 0
                      ? 0
                      : Number(listData?.totals?.overdue).toLocaleString()}
                  </sapn>{" "}
                  บาท
                </Typography>
                <Typography className=" font-bold mt-1">
                  กำไร:{" "}
                  <sapn className="font-normal">
                    {Number(listData?.totals?.overdue).toLocaleString() == "NaN"
                      ? 0
                      : Number(listData?.totals?.overdue) < 0
                      ? Math.abs(
                          Number(listData?.totals?.overdue)
                        ).toLocaleString()
                      : 0}
                  </sapn>{" "}
                  บาท
                </Typography>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* modal View */}

      <Dialog open={openModalView} size="md" handler={handleModalView}>
        <DialogHeader className="bg-purple-700 py-3  px-3  justify-center text-lg text-white opacity-80">
          <Typography variant="h5">ดูรายการ</Typography>
        </DialogHeader>
        <DialogBody divider className=" overflow-auto bg-gray-200 ">
          <div className=" w-full flex flex-col  lg:flex-row  justify-center  gap-4 ">
            <Card className="w-full lg:w-5/12  rounded-lg border-black p-3 ps-5">
              <Typography className="font-bold ">
                จำนวนเงินยืม :{" "}
                <span className=" font-normal">
                  {Number(dataView?.price).toLocaleString()} บาท
                </span>
              </Typography>
              <Typography className="font-bold">
                จำนวนวันที่ยืม :{" "}
                <span className=" font-normal">
                  {Number(dataView?.count_day).toLocaleString()} วัน
                </span>
              </Typography>
              <Typography className="font-bold">
                จ่ายแล้ว :{" "}
                <span className=" font-normal">
                  {Number(dataView?.price_pay).toLocaleString()} บาท
                </span>
              </Typography>
              <Typography className="font-bold">
                {/* วันที่รียอด : <span className=" font-normal">{moment(dataView?.date).format("DD-MM-YYYY")}</span>{" "} */}
                วันที่รียอด :{" "}
                <span className=" font-normal">
                  {moment(dataView?.date)
                    .add(543, "years")
                    .format("DD-MM-YYYY")}
                </span>{" "}
              </Typography>
              <Typography className="font-bold">
                ได้รับสุทธิ :{" "}
                <span className=" font-normal">
                  {Number(dataView?.total_sum).toLocaleString()} บาท
                </span>
              </Typography>
              <Typography className="font-bold">
                จ่ายเกิน :{" "}
                <span className=" font-normal">
                  {Number(dataView?.qty_overpay).toLocaleString()} บาท
                </span>
              </Typography>
            </Card>
            <Card className="w-full lg:w-7/12 h-[300px] rounded-lg border-black p-3 overflow-auto ">
              <table className="w-full min-w-max ">
                <thead>
                  <tr>
                    <th className="border-y border-purple-100 bg-purple-300/50 p-2 ">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold leading-none opacity-70"
                      >
                        งวดที่
                      </Typography>
                    </th>
                    <th className="border-y border-purple-100 bg-purple-300/50 p-2">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold leading-none opacity-70"
                      >
                        วันที่
                      </Typography>
                    </th>
                    <th className="border-y border-purple-100 bg-purple-300/50 p-2 ">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold leading-none opacity-70"
                      >
                        จำนวนเงิน
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
                    {tableView.map((data, index) => {
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
                                className={`font-normal ${data?.date == null ? "bg-purple-500 px-2 py-1 text-purple-500  rounded-md bg-opacity-20" : '' } `}
                              >
                                {data?.date == null
                                  ? "จ่ายล่วงหน้า"
                                  : moment(data?.date)
                                      .add(543, "years")
                                      .format("DD-MM-YYYY") || ""}
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
                                {data?.price || ""}
                              </Typography>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                )}
              </table>
            </Card>
          </div>
        </DialogBody>
        <DialogFooter className="p-2">
          <Button
            color="gray"
            size="sm"
            onClick={handleModalView}
            className="flex mr-1 text-base items-center"
          >
            <span className="text-xl mr-2">
              <AiOutlineStop />{" "}
            </span>
            ออก
          </Button>
        </DialogFooter>
      </Dialog>

      {/* open PDF A4  Sub */}
      {openModalReceiptSubFull == true ? (
        <ReportPdf
          openModalReceiptSubFull={openModalReceiptSubFull}
          handleModalReceiptSubFull={handleModalReceiptSubFull}
          dataPdf={dataPdf}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Refund;
