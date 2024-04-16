import { Card, Button } from "@material-tailwind/react";
import { useState } from "react";

import NotPaid from "./NotPaid";
import NotPaidLocation from "./NotPaidLoation";
import LostCustomer from "./LostCustomer";
import Refund from "./Refund";



const Report = () => {
  //---------- Dialog  ดูข้อมูลผู้บริจาค -------------- //
  const [activeCustomerMenu, setActiveCustomerMenu] = useState("menu1");



  return (
    <div>
      <Card className="w-full overflow-auto  px-3">
        <div >
          <div className=" item-center mt-5 flex w-full flex-col gap-2 md:justify-left lg:flex-row">
            <div className="flex  flex-col gap-5  lg:gap-10 xl:flex-row xl:gap-5 ">
              <div className="flex  flex-col justify-center gap-5 sm:flex-row lg:gap-20  ">
                <div className="flex justify-center">
                  <Button
                    size="lg"
                    variant="outlined"
                    className={`w-[200px] rounded-md py-3  px-4 shadow-lg border border-gray-400  ${
                      activeCustomerMenu === "menu1"
                        ? "bg-yellow-300 text-black"
                        : ""
                    }`}
                    onClick={() => setActiveCustomerMenu("menu1")}
                  >
                    ลูกค้าที่ยังจ่ายไม่ครบ
                  </Button>
                </div>
              </div>
              <div className="flex flex-col justify-center gap-5 sm:flex-row lg:gap-5">
                {/* <div className="flex justify-center">
                  <Button
                    variant="outlined"
                    size="lg"
                    className={`w-[300px]  py-3  px-4 shadow-lg border border-gray-400  ${
                      activeCustomerMenu === "menu2"
                        ? "bg-yellow-300 text-black"
                        : ""
                    }`}
                    onClick={() => setActiveCustomerMenu("menu2")}
                  >
                    ค้นหาจากสถานที่ ที่ยังจ่ายไม่ครบ
                  </Button>
                </div> */}
                <div className="flex justify-center">
                  <Button
                    size="lg"
                    variant="outlined"
                    className={`w-[200px]  py-3  px-4  shadow-lg border border-gray-400 ${
                      activeCustomerMenu === "menu2"
                        ? "bg-red-200 text-black"
                        : ""
                    }`}
                    onClick={() => setActiveCustomerMenu("menu2")}
                  >
                    สรุปลูกค้าเสีย
                  </Button>
                </div>
                <div className="flex justify-center">
                  <Button
                    size="lg"
                    variant="outlined"
                    className={`w-[200px]  py-3  px-4  shadow-lg border border-gray-400 ${
                      activeCustomerMenu === "menu3"
                        ? "bg-blue-200 text-black"
                        : ""
                    }`}
                    onClick={() => setActiveCustomerMenu("menu3")}
                  >
                    ประวัติรียอด
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {activeCustomerMenu === "menu1" && (
            <div>
              <hr className=" mt-5 border border-gray-500" />
              <NotPaid />
            </div>
          )}
          {activeCustomerMenu === "menu2" && (
            <div>
              <hr className=" mt-5 border border-gray-500" />
              <LostCustomer />
            </div>
          )}
          {activeCustomerMenu === "menu3" && (
            <div>
              <hr className=" mt-5 border border-gray-500" />
              <Refund />
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Report;
