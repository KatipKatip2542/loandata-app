import {
  Card,
  Button,
  Input,
  Typography,
  IconButton,
  CardFooter,
  Dialog,
  DialogBody,
  DialogHeader,
  DialogFooter,
  Textarea,
} from "@material-tailwind/react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useEffect, useState } from "react";

import { FaRegEdit, FaRegSave, FaCheckCircle } from "react-icons/fa";
import { AiOutlineStop } from "react-icons/ai";
import { BsPlusCircle } from "react-icons/bs";
import { IoTrashBin } from "react-icons/io5";

import {
  getCustomer,
  addCustomer,
  editCustomer,
  deleteCustomer,
} from "../../../api/customerApi";
import { useRecoilState, useRecoilValue } from "recoil";
import { customerStore , customerIdStore , processStore } from "../../../store/Store";

const Customer = () => {
  //----------  Data Table --------------------//
  const [listData, setListData] = useState([]);

  // console.log(data)

  const [searchQuery, setSearchQuery] = useState("");
  const [customerDataStore, setCustomerDataStore] = useRecoilState(customerStore);

  const customerId = useRecoilValue(customerIdStore)
  const dataProcessStore = useRecoilValue(processStore)

  // console.log(customerId)

  const fetchCustomer = async () => {
    try {
      const response = await getCustomer(customerId , searchQuery);
      // console.log(response);
      setListData(response);
      setCustomerDataStore(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCustomer();
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
  const [newCustomer, setNewCustomer] = useState([]);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [dataAdd, setDataAdd] = useState([]);

  const handleModalAdd = (data) => {
    setOpenModalAdd(!openModalAdd);
    setDataAdd(data);
  };

  const handleAddCustomer = async () => {
    try {
      let data = {
        name: newCustomer.name,
        tell: newCustomer.tell,
        address: newCustomer.address,
        process_id: customerId
      };

      const response = await addCustomer(data);
      // console.log(response);
      setOpenModalAdd(false);
      fetchCustomer();
      toast.success("เพิ่มข้อมูล สินค้า สำเร็จ");
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

  const handleEditCustomer = async () => {
    try {
      let data = {
        id: dataEdit?.id,
        name: dataEdit?.name,
        tell: dataEdit?.tell,
        address: dataEdit?.address,
      };
      const response = await editCustomer(data);
      // console.log(response);
      setOpenModalEdit(false);
      fetchCustomer();
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

  const handleDeleteCustomer = async (id) => {
    try {
      const response = await deleteCustomer(id);
      setOpenModalDelete(false);
      fetchCustomer();
      toast.success("ลบข้อมูล สินค้า สำเร็จ");
    } catch (error) {
      toast.error(error);
    }
  };

  // console.log(dataProcessStore)
  return (
    <Card className=" w-full sm:h-[83vh]   ">
      <ToastContainer className="mt-10" autoClose={800} theme="colored" />
      <div className="flex flex-col w-full mt-5">
        {/* <p>ข้อมูลผู้บริจาค</p> */}
        <div className="w-full  flex  flex-col-reverse items-center md:flex-row justify-center sm:justify-between  ">
          <div className="w-full md:w-[50%] flex mt-5   px-0 md:mx-10 ">
            <Typography className=" font-bold ">ข้อมูลลูกค้า : <span>{dataProcessStore?.name}</span></Typography>
          </div>
          <div className="w-full md:w-[50%] flex   px-0 md:px-10">
            <div className="w-full flex flex-col md:flex-row justify-center md:justify-end items-center gap-5">
              <div>
                <Input
                  type="text"
                  label="ค้นหา ชื่อลูกค้า"
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
                  className="text-base flex justify-center  items-center   bg-green-500"
                  onClick={handleModalAdd}
                >
                  <span className="mr-2 text-xl">
                    <BsPlusCircle />
                  </span>
                  เพิ่มลูกค้า
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* ------------ table  ----------------------------------------- */}
        <Card className="mt-5  h-[35vh] sm:h-[48vh] md:h-[58vh] lg:h-[65vh] overflow-auto mb-3  border-2 mx-3   ">
          <table className="w-full min-w-max   ">
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
                    ชื่อ-สกุล
                  </Typography>
                </th>
                {/* <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 ">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold leading-none opacity-70"
                  >
                    เบอร์โทรศัพท์
                  </Typography>
                </th> */}
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 ">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold leading-none opacity-70"
                  >
                    ที่อยู่
                  </Typography>
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 w-1  ">
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
                      {/* <td className={classes}>
                        <div className="flex items-center justify-center">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal "
                          >
                            {data?.tell || ""}
                          </Typography>
                        </div>
                      </td> */}
                      <td className={classes}>
                        <div className="flex items-center justify-center ">
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
        </Card>
      </div>

      {/* modal Add Customer */}

      <Dialog open={openModalAdd} size="xs" handler={handleModalAdd}>
        <DialogHeader className="bg-purple-700 py-3  px-3  justify-center text-lg text-white opacity-80">
          <Typography variant="h5">เพิ่มข้อมูลลูกค้า</Typography>
        </DialogHeader>
        <DialogBody divider className=" overflow-auto ">
          <div className=" w-full flex flex-col justify-center  gap-4 ">
            <div className="w-full flex flex-col justify-center gap-4  ">
              <div className="flex   mt-3">
                <Input
                  type="text"
                  label="ชื่อลูกค้า"
                  maxLength="50"
                  color="blue-gray"
                  style={{ backgroundColor: "#F4F4F4" }}
                  onChange={(e) =>
                    setNewCustomer({
                      ...newCustomer,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              {/* <div className="flex  mt-3">
                <Input
                  type="text"
                  label="เบอร์โทรศัพท์"
                  maxLength="10"
                  color="blue-gray"
                  style={{ backgroundColor: "#F4F4F4" }}
                  onChange={(e) =>
                    setNewCustomer({
                      ...newCustomer,
                      tell: e.target.value,
                    })
                  }
                />
              </div> */}
              <div className="flex   mt-3">
                <Textarea
                  label="ที่อยู่"
                  maxLength="100"
                  color="blue-gray"
                  style={{ backgroundColor: "#F4F4F4" }}
                  onChange={(e) =>
                    setNewCustomer({
                      ...newCustomer,
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
            onClick={handleAddCustomer}
            className="flex text-base mr-1"
          >
            <span className="mr-2 text-xl">
              <FaRegSave />
            </span>
            บันทึก
          </Button>
        </DialogFooter>
      </Dialog>

      {/* modal Edit Customer */}

      <Dialog open={openModalEdit} size="xs" handler={handleModalEdit}>
        <DialogHeader className="bg-yellow-700 py-3  px-3  justify-center text-lg text-white opacity-80">
          <Typography variant="h5">แก้ไขข้อมูลลูกค้า</Typography>
        </DialogHeader>
        <DialogBody divider className=" overflow-auto ">
          <div className=" w-full flex flex-col justify-center  gap-4 ">
            <div className="w-full flex flex-col justify-center gap-4  ">
              <div className="flex   mt-3">
                <Input
                  type="text"
                  label="ชื่อลูกค้า"
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
              {/* <div className="flex  mt-3">
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
              </div> */}
              <div className="flex   mt-3">
                <Textarea
                  label="ที่อยู่"
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
            onClick={handleEditCustomer}
            className="flex text-base mr-1"
          >
            <span className="mr-2 text-xl">
              <FaRegSave />
            </span>
            บันทึก
          </Button>
        </DialogFooter>
      </Dialog>

      {/* modal Delete Customer */}

      <Dialog open={openModalDelete} size="sm" handler={handleModalDelete}>
        <DialogHeader className="bg-red-700 py-3  px-3  justify-center text-lg text-white opacity-80">
          <Typography variant="h5">ลบลูกค้า</Typography>
        </DialogHeader>
        <DialogBody divider className=" overflow-auto ">
          <div className="flex flex-col w-full justify-center gap-3 ">
            <Typography variant="h5" className="text-center">
              ต้องการลบ: {dataDelete?.name || ""}{" "}
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
              onClick={() => handleDeleteCustomer(dataDelete?.id)}
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
    </Card>
  );
};

export default Customer;
