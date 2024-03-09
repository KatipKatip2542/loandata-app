import { Card, Button } from "@material-tailwind/react";
import { useState } from "react";
import Customer from "./Customer";
import Location from "./Location";
import { useRecoilState } from "recoil";
import { activeMenuStore } from "../../../store/Store";

function Database() {
  const [activeCustomerMenu, setActiveCustomerMenu] = useRecoilState(activeMenuStore);

  return (
    <div>
      {/* <Card className="w-full h-[86vh]  px-3"> */}
      <Card className="w-full   px-3">
        <div className="w-full " >
          <div className=" item-center mt-5 flex w-full flex-col gap-2  lg:flex-row">
            {/* <div className="flex  flex-col gap-5   sm:flex-row  ">
              <div className="flex  flex-col justify-center gap-5 sm:flex-row lg:gap-20  ">
                <div className="flex justify-center">
                  <Button
                    size="lg"
                    variant="outlined"
                    className={`w-[150px] rounded-md py-3  px-4 shadow-lg border border-gray-400  ${
                      activeCustomerMenu === "menu1"
                        ? "bg-purple-300 text-white"
                        : ""
                    }`}
                    onClick={() => setActiveCustomerMenu("menu1")}
                  >
                    ลูกค้า
                  </Button>
                </div>
              </div>
              <div className="flex flex-col justify-center gap-5 sm:flex-row lg:gap-20">
                <div className="flex justify-center">
                  <Button
                    variant="outlined"
                    size="lg"
                    className={`w-[150px]  py-3  px-4 shadow-lg border border-gray-400  ${
                      activeCustomerMenu === "menu2"
                        ? "bg-purple-300 text-white"
                        : ""
                    }`}
                    onClick={() => setActiveCustomerMenu("menu2")}
                  >
                    สถานที่
                  </Button>
                </div>
              </div>
            </div> */}
          </div>
          {/* {activeCustomerMenu === "menu1" && (
            <div className="w-full   ">
              <Customer />
            </div>
          )} */}
          {activeCustomerMenu === "menu2" && (
            <div className="w-full  ">
              <Location />
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

export default Database;
