import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getAllReportCheckMyHomeList } from "../../../api/ReportApi";
import ReportCheckDetailModal from "./ReportCheckDetailModal";

const ReportCheckDetail = () => {
  const [data, setData] = useState([]);
  const [sum, setSum] = useState({
    name: "",
    count_pay: 0,
    count_no_pay: 0,
    sum_all: 0,
    sum_paying: 0,
    sum_remaining: 0,
  });
  const [idList, setIdList] = useState("");
  const [nameList, setnameList] = useState("");
  const location = useLocation();
  const { id } = location.state || {};

  // Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = (id, name) => {
    setOpen(!open);
    setIdList(id);
    setnameList(name);
  };

  const fetchData = async () => {
    try {
      const res = await getAllReportCheckMyHomeList(id);
      console.log({ res });
      setData(res);
      setData(res.result);
      setSum({
        name: res.name,
        count_pay: res.count_pay,
        count_no_pay: res.count_no_pay,
        sum_all: res.sum_all,
        sum_paying: res.sum_paying,
        sum_remaining: res.sum_remaining,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="h-screen">
      <ReportCheckDetailModal
        open={open}
        handleOpen={handleOpen}
        process_id={id}
        process_user_id={idList}
        fetchData={fetchData}
        process_user_name={nameList}
      />
      <div className="flex flex-row gap-8 items-center ">
        <p className="text-xl">{sum.name || ""}</p>
        <Link
          to="/admin/report/check"
          className="bg-red-500 text-white px-4 py-1 rounded-md"
        >
          กลับหน้ารายการ
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-4">
        <div className="w-full lg:w-2/3 bg-white px-4 py-2 rounded-md shadow-md h-80 lg:h-[600px] overflow-y-scroll">
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto  text-base ">
              <thead>
                <tr>
                  <th className="px-4 py-2 border text-start">ชื่อ</th>
                  <th className="px-4 py-2 border text-start">ราคาเต็ม</th>
                  <th className="px-4 py-2 border text-start">จ่ายมาแล้ว</th>
                  <th className="px-4 py-2 border text-start">เหลือ</th>
                  <th className="px-4 py-2 border text-start">ชำระเงิน</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border">
                      {index + 1} {".  "} {item.name}
                    </td>
                    <td className="px-4 py-2 border">
                      {Number(item.total).toLocaleString()}
                    </td>
                    <td className="px-4 py-2 border">
                      {Number(item.paid).toLocaleString()}
                    </td>
                    <td className="px-4 py-2 border">
                      {Number(item.overdue).toLocaleString()}
                    </td>
                    <td className="px-4 py-2 border">
                      <button
                        onClick={() => handleOpen(item.id, item.name)}
                        className="bg-red-500 hover:bg-red-700 text-white text-sm px-2 py-0.5 rounded-md"
                      >
                        ชำระเงิน
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-full lg:w-1/3 bg-white px-4 py-2 rounded-md shadow-md h-52">
          <p className="text-lg mt-1.5">ทั้งหมด {sum.count_pay} คน</p>
          <p className="text-lg mt-1.5">ยังไม่จ่าย {sum.count_no_pay} คน</p>

          <p className=" mt-3 text-xl text-red-500 font-medium">
            ราคารวม {Number(sum.sum_all).toLocaleString()} บาท
          </p>
          <p className="text-lg mt-1.5">
            จ่ายแล้ว {Number(sum.sum_paying).toLocaleString()} บาท
          </p>
          <p className="text-lg mt-1.5">
            คงเหลือ {Number(sum.sum_remaining).toLocaleString()} บาท
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReportCheckDetail;
