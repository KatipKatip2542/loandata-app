import {
  Card,
  Button,
  Input,
  Typography,
  IconButton,
  Dialog,
  DialogBody,
  DialogHeader,
  DialogFooter,
  Textarea,
} from "@material-tailwind/react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useState, useEffect } from "react";

import { FaRegEdit, FaRegSave, FaCheckCircle } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineStop } from "react-icons/ai";
import { BsPlusCircle } from "react-icons/bs";
import { IoTrashBin } from "react-icons/io5";

import {
  getLocation,
  addLocation,
  editLocation,
  deleteLocation,
} from "../../../api/locationApi";

import { useRecoilState } from "recoil";

import {
  locationStore,
  activeMenuStore,
  customerIdStore,
  processStore,
} from "../../../store/Store";

import { Link } from "react-router-dom";

const Location = () => {
  //----------  Data Table --------------------//

  const [listData, setListData] = useState([]);

  const [activeCustomerMenu, setActiveCustomerMenu] =
    useRecoilState(activeMenuStore);
  const [customerId, setCustomerId] = useRecoilState(customerIdStore);
  const [dataProcessStore, setDataProcessStore] = useRecoilState(processStore);

  const [searchQuery, setSearchQuery] = useState("");
  const [dataLocationStore, setDataLocationStore] =
    useRecoilState(locationStore);

  const fetchLocation = async () => {
    try {
      const response = await getLocation(searchQuery);

      console.log(response);
      setListData(response);
      setDataLocationStore(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  //----- จัดการแสดงข้อมูล / หน้า -------------- //
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = Array.isArray(listData)
    ? listData.slice(startIndex, endIndex)
    : [];

  const totalPages = Math.ceil(listData?.length / itemsPerPage);

  //------------- modal Add Product -----------------------//
  const [newLocation, setNewLocation] = useState([]);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [dataAdd, setDataAdd] = useState([]);

  const handleModalAdd = (data) => {
    setOpenModalAdd(!openModalAdd);
    setDataAdd(data);
  };

  const handleAddLocation = async () => {
    try {
      let data = {
        name: newLocation.name,
        tell: newLocation.tell,
        address: newLocation.address,
      };

      const response = await addLocation(data);
      console.log(response?.response);
      if (response?.response?.status == 500) {
        setOpenModalAdd(false);
        toast.error(response?.response?.data?.message);
      } else {
        setOpenModalAdd(false);
        fetchLocation();
        toast.success("เพิ่มข้อมูล สินค้า สำเร็จ");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  //------------- modal Edit Product -----------------------//
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState([]);

  const handleModalEdit = (data) => {
    setOpenModalEdit(!openModalEdit);
    setDataEdit(data);
  };

  const handleEditLocation = async () => {
    try {
      let data = {
        id: dataEdit.id,
        name: dataEdit.name,
        tell: dataEdit.tell,
        address: dataEdit.address,
      };
      const response = await editLocation(data);
      // console.log(response);
      setOpenModalEdit(false);
      fetchLocation();
      toast.success("แก้ไขข้อมูล สินค้า สำเร็จ");
    } catch (error) {
      toast.error(error);
    }
  };

  //------------- modal Delete Product -----------------------//

  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState([]);

  const handleModalDelete = (data) => {
    setOpenModalDelete(!openModalDelete);
    setDataDelete(data);
  };

  const handleDeleteLocation = async (id) => {
    try {
      const response = await deleteLocation(id);

      setOpenModalDelete(false);
      fetchLocation();
      if (response == undefined) {
        toast.error("ไม่สามารถลบสถานที่ได้ เนื่องจากถูกใช้งานแล้ว");
      } else {
        toast.success("ลบข้อมูล สถานที่ สำเร็จ");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className=" w-full  sm:h-[80vh]    ">
      <ToastContainer className="mt-10" autoClose={800} theme="colored" />
      <div className="flex flex-col w-full">
        {/* <p>ข้อมูลผู้บริจาค</p> */}
        <div className="w-full  flex   flex-col-reverse items-center md:flex-row justify-center sm:justify-between  ">
          <div className="w-full md:w-[30%] flex mt-5 lg:mt-0  px-0 md:mx-10  ">
            <Typography className=" font-bold ">ข้อมูลสถานที่</Typography>
          </div>
          <div className="w-full md:w-[60%] flex   px-0 lg:px-5">
            <div className="w-full flex flex-col md:flex-row justify-center md:justify-end items-center gap-5">
              <div>
                <Input
                  type="text"
                  label="ค้นหา สถานที่"
                  //   placeholder="ค้นหา ชื่อลูกค้า"
                  color="blue-gray"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ backgroundColor: "#F4F4F4" }}
                />
              </div>
              <div>
                <Button
                  size="sm"
                  variant="gradient"
                  color="green"
                  className="text-base  flex justify-center  items-center   bg-green-500"
                  onClick={handleModalAdd}
                >
                  <span className="mr-2 text-xl">
                    <BsPlusCircle />
                  </span>
                  เพิ่มสถานที่
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* ------------ table  ----------------------------------------- */}
        <Card className="mt-5 w-full h-[50vh] sm:h-[48vh] md:h-[58vh] lg:h-[65vh] overflow-auto mb-3 border-2  ">
          <div>
            <table className="w-full min-w-max  ">
              <thead>
                <tr>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4  w-1">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold leading-none opacity-70"
                    >
                      ลำดับ
                    </Typography>
                  </th>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold leading-none opacity-70"
                    >
                      ชื่อสถานที่
                    </Typography>
                  </th>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 ">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold leading-none opacity-70"
                    >
                      เบอร์โทรศัพท์
                    </Typography>
                  </th>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 ">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold leading-none opacity-70"
                    >
                      ที่อยู่สำนักงาน
                    </Typography>
                  </th>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 w-1 ">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold leading-none opacity-70"
                    >
                      ลูกค้า
                    </Typography>
                  </th>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 w-1 ">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold leading-none opacity-70"
                    >
                      รายงาน
                    </Typography>
                  </th>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 w-[100px]  ">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold leading-none opacity-70"
                    >
                      แก้ไข/ลบ
                    </Typography>
                  </th>
                </tr>
              </thead>
              {listData?.length == 0 ? (
                <tbody>
                  <tr>
                    <td colSpan={5} className=" text-center pt-5 ">
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
                      ? "p-1"
                      : "p-1 text-sm border-b border-blue-gray-50";

                    return (
                      <tr key={index}>
                        <td className={classes}>
                          <div className="flex items-center justify-center">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal text-sm "
                            >
                              {pageIndex + 1 || ""}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex items-center justify-center ">
                            <Link
                              to="/admin/process"
                              className="text-purple-500 font-bold"
                              onClick={() => [
                                setCustomerId(data?.id),
                                setDataProcessStore(data),
                              ]}
                            >
                              {/* <Button
                              variant="small"
                              // color="blue-gray"
                              className="font-normal text-sm p-2   "
                              style={{ backgroundColor: "#ED5EF0" }}
                              onClick={() => [setCustomerId(data?.id), setDataProcessStore(data)]}
                            >
                          </Button> */}
                              {data?.name || ""}
                            </Link>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex items-center justify-center">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal text-sm "
                            >
                              {data?.tell || ""}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex items-center justify-center  ">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal "
                            >
                              {data?.address || ""}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex justify-center  px-3 gap-2 ">
                            <Link
                              to="/admin/customer"
                              onClick={() => [
                                setCustomerId(data?.id),
                                setDataProcessStore(data),
                              ]}
                            >
                              <FaCircleUser className="h-6 w-6  text-blue-700 " />
                            </Link>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex justify-center  px-3 gap-2">
                            <Link
                              to="/admin/report"
                              onClick={() => [
                                setCustomerId(data?.id),
                                setDataProcessStore(data),
                              ]}
                            >
                              <TbReportAnalytics className="h-6 w-6  text-green-700 " />
                            </Link>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex justify-center  px-3 gap-2">
                            <IconButton
                              variant="outlined"
                              size="sm"
                              onClick={() => handleModalEdit(data)}
                            >
                              <FaRegEdit className="h-5 w-5  text-yellow-700 " />
                            </IconButton>

                            <IconButton
                              variant="outlined"
                              color="blue"
                              size="sm"
                              onClick={() => handleModalDelete(data)}
                            >
                              <IoTrashBin className="h-5 w-5  text-red-700 " />
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
        </Card>
      </div>

      {/* modal Add Location */}

      <Dialog open={openModalAdd} size="xs" handler={handleModalAdd}>
        <DialogHeader className="bg-purple-700 py-3  px-3  justify-center text-lg text-white opacity-80">
          <Typography variant="h5">เพิ่มข้อมูลสถานที่</Typography>
        </DialogHeader>
        <DialogBody divider className=" overflow-auto ">
          <div className=" w-full flex flex-col justify-center  gap-4 ">
            <div className="w-full flex flex-col justify-center gap-4  ">
              <div className="flex   mt-3">
                <Input
                  type="text"
                  label="ชื่อสถานที่"
                  maxLength="50"
                  color="blue-gray"
                  style={{ backgroundColor: "#F4F4F4" }}
                  onChange={(e) =>
                    setNewLocation({
                      ...newLocation,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex  mt-3">
                <Input
                  type="text"
                  label="เบอร์โทรศัพท์"
                  maxLength="10"
                  color="blue-gray"
                  style={{ backgroundColor: "#F4F4F4" }}
                  onChange={(e) =>
                    setNewLocation({
                      ...newLocation,
                      tell: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex   mt-3">
                <Textarea
                  label="ที่อยู่สำนักงาน"
                  maxLength="100"
                  color="blue-gray"
                  style={{ backgroundColor: "#F4F4F4" }}
                  onChange={(e) =>
                    setNewLocation({
                      ...newLocation,
                      address: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            size="sm"
            onClick={handleModalAdd}
            className="flex mr-1 text-base"
          >
            <span className="text-xl mr-2">
              <AiOutlineStop />
            </span>
            ยกเลิก
          </Button>
          <Button
            size="sm"
            variant="gradient"
            color="purple"
            onClick={handleAddLocation}
            className="flex text-base mr-1"
          >
            <span className="mr-2 text-xl">
              <FaRegSave />
            </span>
            บันทึก
          </Button>
        </DialogFooter>
      </Dialog>

      {/* modal Edit Location */}

      <Dialog open={openModalEdit} size="xs" handler={handleModalEdit}>
        <DialogHeader className="bg-yellow-700 py-3  px-3  justify-center text-lg text-white opacity-80">
          <Typography variant="h5">แก้ไขข้อมูลสถานที่</Typography>
        </DialogHeader>
        <DialogBody divider className=" overflow-auto ">
          <div className=" w-full flex flex-col justify-center  gap-4 ">
            <div className="w-full flex flex-col justify-center gap-4  ">
              <div className="flex   mt-3">
                <Input
                  type="text"
                  label="ชื่อสถานที่"
                  maxLength="50"
                  color="blue-gray"
                  style={{ backgroundColor: "#F4F4F4" }}
                  value={dataEdit.name}
                  onChange={(e) =>
                    setDataEdit({
                      ...dataEdit,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex  mt-3">
                <Input
                  type="text"
                  label="เบอร์โทรศัพท์"
                  maxLength="10"
                  color="blue-gray"
                  style={{ backgroundColor: "#F4F4F4" }}
                  value={dataEdit.tell}
                  onChange={(e) =>
                    setDataEdit({
                      ...dataEdit,
                      tell: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex   mt-3">
                <Textarea
                  label="ที่อยู่สถานที่"
                  maxLength="100"
                  color="blue-gray"
                  style={{ backgroundColor: "#F4F4F4" }}
                  value={dataEdit.address}
                  onChange={(e) =>
                    setDataEdit({
                      ...dataEdit,
                      address: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            size="sm"
            onClick={handleModalEdit}
            className="flex mr-1 text-base"
          >
            <span className="text-xl mr-2">
              <AiOutlineStop />
            </span>
            ยกเลิก
          </Button>
          <Button
            size="sm"
            variant="gradient"
            color="purple"
            onClick={handleEditLocation}
            className="flex text-base mr-1"
          >
            <span className="mr-2 text-xl">
              <FaRegSave />
            </span>
            บันทึก
          </Button>
        </DialogFooter>
      </Dialog>

      {/* modal Delete Location */}

      <Dialog open={openModalDelete} size="sm" handler={handleModalDelete}>
        <DialogHeader className="bg-red-700 py-3  px-3  justify-center text-lg text-white opacity-80">
          <Typography variant="h5">ลบสถานที่</Typography>
        </DialogHeader>
        <DialogBody divider className=" overflow-auto ">
          <div className="flex flex-col w-full justify-center gap-3 ">
            <Typography variant="h5" className="text-center">
              ต้องการลบ สถานที่: {dataDelete?.name || ""}{" "}
            </Typography>
            <Typography variant="h5" className="text-center">
              จริงหรือไม่?{" "}
            </Typography>
          </div>
        </DialogBody>
        <DialogFooter>
          <div className=" flex w-full justify-center  gap-5 ">
            <Button
              variant="gradient"
              color="red"
              size="sm"
              onClick={() => handleDeleteLocation(dataDelete?.id)}
              className="flex mr-1 text-base"
            >
              <span className="text-xl mr-2">
                <FaCheckCircle />
              </span>
              ตกลง
            </Button>
            <Button
              variant="gradient"
              color="blue-gray"
              size="sm"
              onClick={handleModalDelete}
              className="flex mr-1 text-base"
            >
              <span className="text-xl mr-2">
                <AiOutlineStop />
              </span>
              ยกเลิก
            </Button>
          </div>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default Location;
