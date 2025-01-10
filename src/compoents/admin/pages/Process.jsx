import {
  Card,
  Button,
  IconButton,
  Typography,
  Dialog,
  DialogBody,
  DialogHeader,
  DialogFooter,
  Input,
  Switch,
  Radio,
} from "@material-tailwind/react";
// import { Switch } from "antd";

import Select from "react-select";

// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import th from "date-fns/locale/th";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import moment from "moment/min/moment-with-locales";

import { parse, addYears } from "date-fns";

import { useEffect, useState, useRef } from "react";

import { useRecoilState, useRecoilValue } from "recoil";

import {
  locationStore,
  customerStore,
  customerIdStore,
  processStore,
} from "../../../store/Store";

import { FaRegSave } from "react-icons/fa";
import { AiOutlineStop } from "react-icons/ai";
import { BsPlusCircle, BsFillEyeFill } from "react-icons/bs";
import { IoIosSave } from "react-icons/io";
import { TbReload } from "react-icons/tb";
import { MdSmsFailed, MdCancel } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { LuTimerReset } from "react-icons/lu";
import { RiShutDownLine, RiDeleteBin6Fill } from "react-icons/ri";

import {
  getProcess,
  addProcess,
  getUpdateAll,
  getProcessUser,
  getProcessUser1,
  userUpdate,
  getProcessUserList,
  changeStatus,
  changeCancel,
  getProcessUserListSum,
  sendUpdate,
  sendReload,
  sendClose,
  sortUser,
  clearUser,
} from "../../../api/ProcessApi";
import { getCustomer } from "../../../api/customerApi";
import { editLocation } from "../../../api/locationApi";

const Process = () => {
  //----------  Data Table --------------------//
  const [listData, setListData] = useState([]);
  const [searchQuery1, setSearchQuery1] = useState("");
  const [dataProcessId, setDataProcessId] = useState([]);
  const [activeCustomerMenu, setActiveCustomerMenu] = useState("menu2");
  const [sumUser, setSumUser] = useState([]);

  const [disableInput, setDisableInput] = useState(false);

  const [customerDataStore, setCustomerDataStore] =
    useRecoilState(customerStore);
  const customerId = useRecoilValue(customerIdStore);
  const [dataProcessStore, setDataProcessStore] = useRecoilState(processStore);

  const [listDataCustomer, setListDataCustomer] = useState([]);
  const [isSearchable, setIsSearchable] = useState(true);
  // const [isClearable, setIsClearable] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeRow, setActiveRow] = useState();
  const [activeRow2, setActiveRow2] = useState(0);
  const [price, setPrice] = useState(null);

  const [selectDisable, setSelectDisable] = useState(0);
  const [userListSum, setUserListSum] = useState([]);
  const [userListData, setUserListData] = useState([]);
  const [disableButton, setDisableButton] = useState(true);

  const locationDataStore = useRecoilValue(locationStore);

  const selectStatus = [
    {
      id: 0,
      name: "กำลังจ่าย",
    },
    {
      id: 2,
      name: "ลูกค้าเสีย",
    },
  ];

  const locationOptions = locationDataStore?.map((location) => ({
    value: location.id,
    label: location.name,
  }));

  const customerOptions = customerDataStore?.map((customer) => ({
    value: customer.id,
    label: customer.name,
  }));

  const statusOptions = selectStatus?.map((status) => ({
    value: status.id,
    label: status.name,
  }));

  const fetchProcess = async () => {
    try {
      const response = await getProcess(searchQuery);
      console.log({response});
      
      setListData(response);
    } catch (error) {
      // console.error(error);
    }
  };

  useEffect(() => {
    // fetchProcess();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const fetchCustomer = async () => {
    try {
      const response = await getCustomer(customerId, searchQuery);

      // console.log(response);
      setCustomerDataStore(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCustomer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [selectCard, setSelectCard] = useState([]);
  const [openModalProcess, setOpenModalProcess] = useState(false);

  const handleSelectCard = async (item) => {
    setOpenModalProcess(!openModalProcess);
    setSelectCard(item);
    // setCardId(item?.id);
    await fetchUpdateAll(item?.id);
  };

  const fetchUpdateAll = async () => {
    try {
      const response = await getUpdateAll(dataProcessStore?.id);
      if (response?.status == 200) {
        setDataProcessId(response?.data);
      } else {
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUpdateAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const [statused, setStatused] = useState("");

  const fetchStatus = async (statused) => {
    try {
      const response = await getProcessUser(
        dataProcessStore?.id,
        statused,
        searchQuery1
      );
      if (response?.status == 200) {
        setListDataCustomer(response?.data);
      } else {
        toast.error("ดึงข้อมูลไม่สำเร็จ  กรุณาลองใหม่");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStatus(" ");
    // if (dataProcessStore?.id) {
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataProcessStore?.id, searchQuery1]);

  // const fetchStatus1 = async () => {
  //   try {
  //     const response = await getProcessUser1(
  //       dataProcessStore?.id,
  //       searchQuery1
  //     );
  //     // console.log(response);
  //     if (response?.status == 200) {
  //       setListDataCustomer(response.data);
  //     } else {
  //       return;
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchStatus1();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [dataProcessStore?.id, searchQuery1]);

  const [userId, setUserId] = useState("");

  const fetchUserList = async (id, status) => {
    try {
      setUserId(id);
      const response = await getProcessUserList(id);
      if (response?.status == 200) {
        setSumUser(response?.data);
        setDisableButton(status == "1" ? false : true);
      } else {
        toast.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const [fatchId, setFetchId] = useState("");

  const fetchUserListSum = async (id) => {
    // setFetchId(id);
    try {
      const response = await getProcessUserListSum(id);
      // console.log(response);
      setUserListSum(response);
    } catch (error) {
      console.error(error);
    }
  };

  //----- จัดการแสดงข้อมูล / หน้า -------------- //
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 300;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = Array.isArray(listDataCustomer)
    ? listDataCustomer.slice(startIndex, endIndex)
    : [];

  const totalPages = Math.ceil(listDataCustomer?.length / itemsPerPage);

  //------------- modal  -----------------------//

  const [openModalAddProcess, setOpenModalAddProcess] = useState(false);
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [openModalReload, setOpenModalReload] = useState(false);
  const [openModalDataReload, setOpenModalDataReload] = useState(false);
  const [openModalClearUser, setOpenModalClearUser] = useState(false);

  const handleModalAddProcess = () => {
    setOpenModalAddProcess(!openModalAddProcess);
  };

  const handleModalConfirm = () => {
    setOpenModalConfirm(!openModalConfirm);
    setOpenModalAddProcess(false);
  };

  const handleModalReload = () => {
    setOpenModalReload(!openModalReload);
  };

  const handleModalDataReload = () => {
    setOpenModalDataReload(!openModalDataReload);
    // setOpenModalAddProcess(false);
  };

  const [userData, setUserData] = useState([]);

  const handleModalClearUser = (data) => {
    setOpenModalClearUser(!openModalClearUser);
    setUserData(data);
  };

  // console.log(userData);

  const handleAddProcess = async () => {
    try {
      let data = {
        house_id: selectedLocation?.id,
      };

      const response = await addProcess(data);
      // console.log(response);
      if (response == undefined) {
        toast.error("สถานที่นี้ถูกสร้างไปแล้ว");
      } else {
        toast.success("เพิ่มข้อมูล Process สำเร็จ");
      }

      // await fetchProcess();

      setOpenModalConfirm(false);
    } catch (error) {
      toast.error(error);
    }
  };

  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleLocationSelect = (e) => {
    // ค้นหาข้อมูลลูกค้าที่ถูกเลือกจาก customerDataStore
    const locations = locationDataStore.find(
      (location) => location.id === e.value
    );
    // เซ็ตข้อมูลลูกค้าที่ถูกเลือกใน state
    setSelectedLocation(locations);
  };

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);

  const handleCustomerSelect = (e) => {
    // console.log(e);
    // ค้นหาข้อมูลลูกค้าที่ถูกเลือกจาก customerDataStore
    const customer = customerDataStore.find(
      (customer) => customer.id === e.value
    );
    // เซ็ตข้อมูลลูกค้าที่ถูกเลือกใน state
    setSelectedCustomer(customer);
    setSelectedValue(e);
  };

  const [selectedStatus, setSelectedStatus] = useState(null);
  const [statusValue, setStatusValue] = useState(null);

  const handleStatusSelect = (e) => {
    const status = selectStatus.find((status) => status.id === e.value);
    setSelectedStatus(status);
    setStatusValue(e);
  };

  const [amountDate, setAmountDate] = useState(0);
  const [amount, setAmount] = useState(0);

  const [searchQueryStart, setSearchQueryStart] = useState(new Date());
  const [searchQueryEnd, setSearchQueryEnd] = useState(new Date());

  // Function to add days to a date
  const addDays = (date, days) => {
    const newDate = new Date(date);
    newDate?.setDate(newDate.getDate() + days);
    return newDate;
  };

  const handleUser = async () => {
    setSelectDisable(true);
    try {
      let data = {
        process_id: dataProcessStore?.id,
        user_id: selectedCustomer?.id,
        price: Number(amount),
        count_day: Number(amountDate),
        // start_day: startDate,
        // end_day: startEnd,
      };
      const response = await userUpdate(data);
      // console.log(response)
      if (response.status == 200) {
        toast.success("เพิ่ม/อัพเดทข้อมูล ลูกค้า สำเร็จ");
        handleFetch();
        setAmountDate(0);setAmount(0);
        setSearchQueryStart(new Date());
        setSearchQueryEnd(new Date());
        setSelectedValue(null);
        setSelectDisable(false);
      } else {
        toast.error("ไม่สามารถบันทึกได้ กรุณาลองใหม่");
        setSelectDisable(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle change for searchQueryStart
  const handleSearchQueryStartChange = (date) => {
    setSearchQueryStart(date);

    // Update searchQueryEnd based on the new value of daysToAdd
    setSearchQueryEnd(addDays(date, amountDate));
  };

  // Handle change for daysToAdd
  const handleDaysToAddChange = (event) => {
    const inputValue = event.target.value || 0;
    const newDaysToAdd = parseInt(inputValue, 10);
    setAmountDate(newDaysToAdd);

    // if (searchQueryStart) {
    //   setSearchQueryEnd(addDays(searchQueryStart, newDaysToAdd));
    // }
  };
  const [changeDate, setChangeDate] = useState("");

  // const startDate = moment(searchQueryStart).add(543, 'years').format('YYYY-MM-DD')
  const startDate = moment(searchQueryStart).format("YYYY-MM-DD");
  const startEnd = moment(searchQueryEnd).format("YYYY-MM-DD");
  const dateSend = moment(changeDate).format("YYYY-MM-DD");

  // console.log(listDataCustomer);

  const handleChangeStatus = async (changestatus, dataed) => {
    try {
      // console.log(dateSend);
      if (
        dateSend == "Invalid date" ||
        ("" && price == null) ||
        price < 0 ||
        price == null ||
        price < 0
      ) {
        toast.error("กรุณาระบบวันที่ และ  จำนวนเงิน");
      } else {
        let data = {
          id: dataed?.id,
          status: changestatus,
          price: price,
          process_user_id: userId,
          process_id: dataProcessStore?.id,
          date: dateSend == "Invalid date" ? null : dateSend,
          status_count: dataed?.status_count,
        };
        // console.log(data);

        const response = await changeStatus(data);
        // console.log(response);
        if (response.status == 200) {
          toast.success("เปลี่ยนสถานะ สำเร็จ");
          setChangeDate("");
          handleFetch();
          setPrice(null);
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
        process_user_id: userId,
        process_id: dataProcessStore?.id,
        date: moment(dataed?.date, "DD-MM-YYYY")
          .add(-543, "years")
          .format("YYYY-MM-DD"),
      };
      const response = await changeCancel(data);
      // console.log(response);
      if (response.status == 200) {
        toast.success("เปลี่ยนสถานะ สำเร็จ");
        setChangeDate("");
        handleFetch();
      } else {
        toast.error(response?.response?.data);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleUpdate = async () => {
    // console.log(statusValue.value);
    try {
      let data = {
        id: userId,
        process_id: dataProcessStore?.id,
        // status: userListData?.status == 0 ? 2 : userListData?.status == 2 ? 0 : ''  ,
        status: Number(statusValue.value),
        // price: Number(userListData?.price),
        price: Number(amount),
        // date: Number(userListData?.count_day)
        date: Number(amountDate),
      };
      // console.log(data);
      const response = await sendUpdate(data);
      // console.log(response);
      if (response?.status == 200) {
        toast.success("เปลี่ยนสถานะ สำเร็จ");
        handleFetch();
        setSelectDisable(0),
          setSelectedValue(null),
          setStatusValue(null),
          setAmount(0),
          setAmountDate(0),
          setSearchQueryStart(new Date()),
          setSearchQueryEnd(new Date()),
          setUserListData([]);

        // setActiveRow("");
      } else {
        toast.error(response?.response?.data);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleClose = async () => {
    try {
      let data = {
        process_user_id: userId,
        process_id: dataProcessStore?.id,
        price: userListData?.total,
        count_day: userListData?.count_day,
      };

      const response = await sendClose(data);
      // console.log(response?.data);
      if (response?.status == 200) {
        toast.success("ปิดยอด สำเร็จ");
        setReturnReload(response?.data);
        fetchUserList();
        fetchStatus(0);

                // reset Status
                setSelectDisable(0),
                setSelectedValue(null),
                setStatusValue(null),
                setAmount(0),
                setAmountDate(0),
                setSearchQueryStart(new Date()),
                setSearchQueryEnd(new Date()),
                setUserListData([])
              setUserListSum([])
              setSumUser([])
              setActiveRow("")

              // open menu  จ่ายครบแล้ว
              setActiveCustomerMenu("menu3")
              fetchStatus(1)
              setDisableButton(false)
              setSumUser([])
              setActiveRow()

      } else {
        toast.error(response?.response?.data);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const [returnReload, setReturnReload] = useState([]);
  const [newPrice, setNewPrice] = useState(0);
  // const [radio, setRadio] = useState(0);
  // console.log(radio);

  const handleReload = async () => {
    // console.log(userListData);
    try {
      let data = {
        process_user_id: userId,
        process_id: dataProcessStore?.id,
        price: userListData?.total,
        new_price: Number(newPrice) || userListData?.total,
        count_day: userListData?.count_day,
        // status: Number(radio)
      };
      // console.log(data);
      const response = await sendReload(data);
      console.log(response?.data);
      if (response?.status == 200) {
        toast.success("รียอด สำเร็จ");
        setReturnReload(response?.data);
        handleModalDataReload();
        // handleFetch();
        setNewPrice(0);
        fetchStatus(0);
        fetchUserListSum(userId);
        fetchUpdateAll(dataProcessStore?.id);

        // reset
        setSumUser([]);
        setSelectDisable(0),
          setSelectedValue(null),
          setStatusValue(null),
          setAmount(0),
          setAmountDate(0),
          setSearchQueryStart(new Date()),
          setSearchQueryEnd(new Date()),
          setUserListData([]);
        setActiveRow("");
        // setRadio(0);
      } else {
        toast.error(response?.response?.data);
        handleModalReload();
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleFetch = () => {
    fetchUpdateAll(dataProcessStore?.id);
    // fetchStatus1();
    fetchStatus(0);
    fetchUserList(userId);
    fetchUserListSum(userId);
  };

  const handleChangeSwitch = (index, checked) => {
    // คัดลอก sumUser และอัพเดทค่า status_count ตาม checked ใหม่
    // console.log(checked);
    const updatedSumUser = sumUser.map((data, i) => {
      if (i === index) {
        return {
          ...data,
          status_count: checked == true ? "1" : "0",
        };
      }
      return data;
    });

    // อัพเดทค่า sumUser ใหม่
    setSumUser(updatedSumUser);

    // ทำอะไรสิ่งที่คุณต้องการต่อที่นี่ เช่น ส่งข้อมูลไปยัง backend
  };

  // console.log(disableButton);

  const checkInputDate = (e, index) => {
    const date = moment(e.target.value).add(+543, "years").format("DD-MM-YYYY");
    if (sumUser.some((item) => item.date === date)) {
      toast.error(`วันที่ ${date} มีอยู่แล้ว`);
      const newInputDates = [...changeDate];
      newInputDates[index] = "";
      document.getElementById("myInput").value = "";
      setChangeDate("");
    } else {
      // const newInputDates = [...changeDate];
      // newInputDates[index] =e.target.value
      // console.log(newInputDates[index])
      setChangeDate(e.target.value);
    }
  };

  const dragItem = useRef(null);
  const dragItemOver = useRef(null);

  // handle drag sorting
  const handleSort = async () => {
    try {
      // duplicate items
      let _listDataCustomer = [...listDataCustomer];

      //remove and save the dragged item  contect
      const graggedItemContent = _listDataCustomer.splice(
        dragItem.current,
        1
      )[0];

      // switch the position
      _listDataCustomer.splice(dragItemOver.current, 0, graggedItemContent);

      // reset the position
      dragItem.current = null;
      dragItemOver.current = null;

      // update the actual array

      const data = {
        sort_data: _listDataCustomer.map((item, index) => ({
          index: index + 1,
          id: item.id,
        })),
      };
      const response = await sortUser(data, dataProcessStore?.id);
      // console.log(response?.status);
      if (response?.status == 200) {
        fetchStatus();
        toast.success("ทำรายการสำเร็จ");
        // reset Status
        setSelectDisable(0),
          setSelectedValue(null),
          setStatusValue(null),
          setAmount(0),
          setAmountDate(0),
          setSearchQueryStart(new Date()),
          setSearchQueryEnd(new Date()),
          setUserListData([]);
        setSumUser([]);
        setActiveRow("");
      }
    } catch (error) {
      // toast.error(error);
    }
  };

  const handleClearUser = async (userData) => {
    try {
      const data = {
        id: userId,
        process_id: dataProcessStore?.id,
        price: userData?.price,
        count_day: userData?.count_day,
      };
      const response = await clearUser(data);
      // console.log(response?.status);
      if (response?.status == 200) {
        fetchStatus();
        fetchUpdateAll();
        handleModalClearUser();
        toast.success("ลบข้อมูลสำเร็จ");

        // reset Status
        setSelectDisable(0),
          setSelectedValue(null),
          setStatusValue(null),
          setAmount(0),
          setAmountDate(0),
          setSearchQueryStart(new Date()),
          setSearchQueryEnd(new Date()),
          setUserListData([]);
        setUserListSum([]);
        setSumUser([]);
        setActiveRow("");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  // console.log(dataProcessStore.id);
  // console.log(listDataCustomer)
  // console.log(sumUser);
  // console.log(price)

  return (
    <Card>
      <div className="flex flex-col w-full mt-1 px-2 ">
        <ToastContainer className="toast " autoClose={2500} theme="colored" />
        <div className="flex   flex-col  overflow-auto   items-center ">
          <div className="flex w-full flex-col lg:flex-row gap-5 ">
            <div className="flex flex-col w-full h-[85vh] lg:w-4/12 xl:w-3/12    ">
              <div className="flex  items-center justify-between gap-3  ">
                <div>
                  <Typography className="text-lg lg:text-xl font-bold">
                    {dataProcessStore?.name || ""}
                  </Typography>
                  {/* <button onClick={() => fetchUpdateAll(dataProcessStore?.id)}>test</button> */}
                </div>
                <div>
                  <Button
                    size="sm"
                    variant="gradient"
                    color="green"
                    className="text-sm  flex justify-center  items-center   bg-green-500"
                    onClick={() => [
                      setSelectDisable(0),
                      setSelectedValue(null),
                      setAmount(0),
                      setAmountDate(0),
                      setSearchQueryStart(new Date()),
                      setSearchQueryEnd(new Date()),
                      setUserListData([]),
                    ]}
                  >
                    <span className="mr-2 text-xl">
                      <BsPlusCircle />
                    </span>
                    เพิ่มการบันทึกใหม่
                  </Button>
                </div>
              </div>
              <div className=" w-full  flex flex-col justify-center mt-3  ">
                <Select
                  classNamePrefix="select"
                  placeholder="เลือกลูกค้า"
                  // isClearable={isClearable}
                  isSearchable={isSearchable}
                  isDisabled={selectDisable}
                  value={selectedValue}
                  // value={{ value: selectedCustomer?.id, label: selectedCustomer?.name }}
                  name="color"
                  options={customerOptions}
                  onChange={(e) => handleCustomerSelect(e)}
                />
              </div>
              <div className="flex w-full flex-col lg:flex-row justify-center mt-3 gap-3  ">
                <div className="w-full lg:w-[50%]">
                  <div className=" relative w-full min-w-[100px] h-10">
                    <input
                      type="number"
                      min={0}
                      value={amount}
                      disabled={disableInput}
                      className="peer w-[100%] h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 disabled:cursor-not-allowed transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent placeholder:opacity-0 focus:placeholder:opacity-100 text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-gray-500 "
                      style={{ backgroundColor: "rgb(244,244,244)" }}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                    <label className="flex w-[100%] h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-blue-gray-500 before:border-blue-gray-200 peer-focus:before:!border-blue-gray-500 after:border-blue-gray-200 peer-focus:after:!border-blue-gray-500">
                      จำนวนเงิน{" "}
                    </label>
                  </div>
                </div>
                <div className="w-full lg:w-[50%]">
                  <div className=" relative w-full min-w-[100px] h-10">
                    <input
                      type="number"
                      min={0}
                      value={amountDate}
                      // disabled={selectDisable}
                      disabled={disableInput}
                      className="peer w-[100%] h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 disabled:cursor-not-allowed transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent placeholder:opacity-0 focus:placeholder:opacity-100 text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-gray-500 "
                      style={{ backgroundColor: "rgb(244,244,244)" }}
                      onChange={handleDaysToAddChange}
                    />
                    <label className="flex w-[100%] h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-blue-gray-500 before:border-blue-gray-200 peer-focus:before:!border-blue-gray-500 after:border-blue-gray-200 peer-focus:after:!border-blue-gray-500">
                      จำนวนวัน{" "}
                    </label>
                  </div>
                </div>
              </div>

              <div className=" w-full  flex flex-col justify-center mt-3  ">
                <Typography>สถานะ:</Typography>
                <Select
                  classNamePrefix="select"
                  placeholder="เลือกสถานะ"
                  // isClearable={isClearable}
                  isSearchable={isSearchable}
                  // isDisabled={selectDisable}
                  value={statusValue}
                  // value={{ value: selectedCustomer?.id, label: selectedCustomer?.name }}
                  name="color"
                  options={statusOptions}
                  onChange={(e) => handleStatusSelect(e)}
                />
              </div>

              <div className="flex flex-col  w-full justify-center mt-5 gap-3  ">
                <div className="flex gap-5 ">
                  <div className="w-full ">
                    <Button
                      size="sm"
                      variant="gradient"
                      color="purple"
                      disabled={userListData?.status == 0 ? false : true}
                      className="text-sm flex justify-center  items-center w-full   bg-green-500"
                      onClick={handleModalReload}
                    >
                      <span className="mr-2 text-xl ">
                        <TbReload />
                      </span>
                      รียอด
                    </Button>
                  </div>
                  <div className="w-full ">
                    <Button
                      size="sm"
                      variant="gradient"
                      color="purple"
                      // disabled={!selectDisable}
                      disabled={
                        userListData?.status == 0 || userListData?.status == 2
                          ? false
                          : true
                      }
                      className="text-sm  flex justify-center  items-center w-full   bg-green-500"
                      onClick={handleUpdate}
                    >
                      <span className="mr-2 text-xl ">
                        <MdSmsFailed />
                      </span>
                      อัพเดท
                    </Button>
                  </div>
                </div>

                <div className="flex gap-5 flex-col xl:flex-row ">
                  <div className="w-full ">
                    <Button
                      size="sm"
                      variant="gradient"
                      color="red"
                      // disabled={!selectDisable}
                      disabled={
                        userListData?.status == 0 || userListData?.status == 2
                          ? false
                          : true
                      }
                      className="text-sm  flex justify-center  items-center w-full   bg-green-500"
                      onClick={handleClose}
                    >
                      <span className="mr-2 text-xl ">
                        <RiShutDownLine />
                      </span>
                      ปิดยอด
                    </Button>
                  </div>
                  <div className="w-full">
                    <Button
                      size="sm"
                      variant="gradient"
                      color="green"
                      disabled={selectDisable}
                      className="text-sm flex justify-center  items-center  w-full  bg-green-500"
                      onClick={handleUser}
                    >
                      <span className="mr-2 text-xl ">
                        <IoIosSave />
                      </span>
                      บันทึก
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex w-full flex-col h-full mt-4 2xl:mt-[20px]   ">
                <div
                  className=" lg:mt-[15px] xl:mt-[4px] sm:mt-0 md:mt-[18px]  md:h-[180px]  2xl:mt-0 p-3   lg:h-[300px] xl:h-[228px] 2xl:h-[240px] items-center rounded-md    mb-2 "
                  style={{ border: "2px solid #b3b3b3" }}
                >
                  <Typography className="text-xl font-bold ">
                    ยอดรวม(ทั้งหมด)
                  </Typography>
                  <Typography className=" font-bold mt-3">
                    ยอดรวม:{" "}
                    <sapn>
                      {Number(dataProcessId?.total).toLocaleString() == "NaN"
                        ? 0
                        : Number(dataProcessId?.total).toLocaleString()}
                    </sapn>{" "}
                    บาท
                  </Typography>
                  <Typography className=" font-bold mt-1">
                    ชำระแล้ว:{" "}
                    <sapn>
                      {Number(dataProcessId?.paid).toLocaleString() == "NaN"
                        ? 0
                        : Number(dataProcessId?.paid).toLocaleString()}
                    </sapn>{" "}
                    บาท
                  </Typography>
                  <Typography className=" font-bold mt-1">
                    ค้างชำระ:{" "}
                    <sapn>
                      {Number(dataProcessId?.overdue).toLocaleString() == "NaN"
                        ? 0
                        : Number(dataProcessId?.overdue) < 0
                        ? 0
                        : Number(dataProcessId?.overdue).toLocaleString()}
                    </sapn>{" "}
                    บาท
                  </Typography>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col  gap-3  lg:w-8/12 xl:w-9/12 ">
              <div className=" flex flex-col xl:flex-row  items-center sm:items-start  w-full justify-center md:justify-start   gap-5  ">
                {/* <div className="flex flex-col  xl:flex-row gap-5"> */}
                {/* <div className="flex gap-5 lg:ml-5 ">
                    <div className=" justify-center">
                      <Button
                        size="sm"
                        variant="outlined"
                        className={`w-[150px] rounded-md py-2  px-4 shadow-lg border border-gray-400  text-white  ${
                          activeCustomerMenu === "menu1"
                            ? " bg-blue-300 text-sm "
                            : "bg-blue-100 text-sm"
                        }`}
                        onClick={() => [
                          setActiveCustomerMenu("menu1"),
                          fetchStatus1(),
                          setDisableButton(true),
                          setActiveRow(),
                        ]}
                      >
                        ทั้งหมด
                      </Button>
                    </div>
                  </div> */}
                <div className="flex w-full flex-col justify-center lg:justify-start lg:ml-3 sm:mt-5 sm:flex-row md:mt-16 lg:mt-0   gap-5">
                  <div className=" flex justify-center">
                    <Button
                      size="sm"
                      variant="outlined"
                      className={`w-[150px] rounded-md py-2  px-4 shadow-lg border border-gray-400  text-white text-sm `}
                      style={{
                        backgroundColor:
                          activeCustomerMenu === "menu2"
                            ? "#ff9800"
                            : "#fdaf3d",
                      }}
                      onClick={() => [
                        setActiveCustomerMenu("menu2"),
                        fetchStatus(0),
                        setDisableButton(true),
                        setSumUser([]),
                        setActiveRow(),
                      ]}
                    >
                      กำลังจ่าย
                    </Button>
                  </div>
                  <div className=" flex justify-center">
                    <Button
                      size="sm"
                      variant="outlined"
                      className={`w-[150px] rounded-md py-2  px-4 shadow-lg border border-gray-400  ${
                        activeCustomerMenu === "menu3"
                          ? " bg-green-500 text-white text-sm"
                          : "bg-green-300 text-white text-sm"
                      }`}
                      onClick={() => [
                        setActiveCustomerMenu("menu3"),
                        fetchStatus(1),
                        setDisableButton(false),
                        setSumUser([]),
                        setActiveRow(),
                      ]}
                    >
                      จ่ายครบแล้ว
                    </Button>
                  </div>
                  <div className=" flex justify-center">
                    <Button
                      size="sm"
                      variant="outlined"
                      className={`w-[150px] rounded-md py-2  px-4 shadow-lg border border-gray-400  ${
                        activeCustomerMenu === "menu4"
                          ? " bg-red-500 text-white text-sm"
                          : "bg-red-300 text-white text-sm"
                      }`}
                      onClick={() => [
                        setActiveCustomerMenu("menu4"),
                        fetchStatus(2),
                        setDisableButton(false),
                        setSumUser([]),
                        setActiveRow(),
                      ]}
                    >
                      ลูกค้าเสีย
                    </Button>
                  </div>
                </div>
                {/* </div> */}
              </div>
              <div>
                <Card
                  className="w-full  h-[33vh]  shadow-lg  "
                  style={{ border: "1px solid #cccccc" }}
                >
                  <div className="mt-0 h-[380px] w-full overflow-auto  ">
                    <div className="flex justify-end px-2">
                      <div className=" flex items-end w-[300px] py-1 justify-end">
                        <Input
                          type="text"
                          label="ค้นหาลูกค้า"
                          className="w-[200px]  "
                          //   placeholder="ค้นหา ชื่อลูกค้า"
                          color="blue-gray"
                          value={searchQuery1}
                          onChange={(e) => setSearchQuery1(e.target.value)}
                          style={{ backgroundColor: "#F4F4F4" }}
                        />
                      </div>
                    </div>
                    <table className="w-full min-w-max ">
                      <thead>
                        <tr>
                          <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold leading-none opacity-70"
                            >
                              ลำดับ
                            </Typography>
                          </th>
                          <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold leading-none opacity-70"
                            >
                              ลูกค้า
                            </Typography>
                          </th>
                          <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold leading-none opacity-70"
                            >
                              จำนวนเงิน
                            </Typography>
                          </th>
                          <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold leading-none opacity-70"
                            >
                              จำนวนวัน
                            </Typography>
                          </th>
                          <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 w-[100px]">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold leading-none opacity-70"
                            >
                              สถานะ
                            </Typography>
                          </th>
                          <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 w-1">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold leading-none opacity-70"
                            >
                              เลือก
                            </Typography>
                          </th>
                          <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 w-[70px] ">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold leading-none opacity-70"
                            >
                              ลบ
                            </Typography>
                          </th>
                        </tr>
                      </thead>
                      {listDataCustomer?.length == 0 ? (
                        <tbody>
                          <tr>
                            <td colSpan={8}>
                              <Typography className="mt-5 text-center">
                                ...ไม่พบข้อมูล...
                              </Typography>
                            </td>
                          </tr>
                        </tbody>
                      ) : (
                        <tbody>
                          {displayedData?.map((data, index) => {
                            const isLast = index === displayedData?.length;
                            const classes = isLast
                              ? " "
                              : ` border-b border-blue-gray-50  ${
                                  index === activeRow ? "bg-gray-300" : ""
                                }`;
                            return (
                              <tr
                                key={index}
                                draggable
                                onDragStart={() => (dragItem.current = index)}
                                onDragEnter={() =>
                                  (dragItemOver.current = index)
                                }
                                onDragEnd={handleSort}
                                onDragOver={(e) => e.preventDefault}
                              >
                                <td className={classes}>
                                  <div className="flex items-center justify-center">
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="font-normal"
                                    >
                                      {index + 1 || ""}
                                    </Typography>
                                  </div>
                                </td>
                                <td className={classes}>
                                  <div className="flex items-center justify-center">
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className=" font-bold text-purple-500 cursor-pointer"
                                      onClick={() => [
                                        setActiveRow(index),
                                        fetchUserList(data?.id, data?.status),
                                        setSumUser([]),
                                        setUserListData(data),
                                        fetchUserListSum(data?.id),
                                        setDisableInput(
                                          data?.status == 2 ? true : false
                                        ),
                                        setDisableButton(
                                          data?.status == 2 ? true : false
                                        ),
                                        setSelectedValue(data),
                                        setStatusValue({
                                          ...statusValue,
                                          value: data?.status,
                                          label:
                                            data?.status == 0
                                              ? "กำลังจ่าย"
                                              : "ลูกค้าเสีย",
                                        }),
                                        setSelectedValue({
                                          ...selectedValue,
                                          label: data?.name,
                                        }),
                                        setSelectDisable(1),
                                        setAmount(data?.total),
                                        setAmountDate(data?.count_day),
                                        setSearchQueryStart(
                                          addYears(
                                            parse(
                                              data?.start_day,
                                              "dd-MM-yyyy",
                                              new Date()
                                            ),
                                            +543
                                          )
                                        ),
                                        setSearchQueryEnd(
                                          addYears(
                                            parse(
                                              data?.end_day,
                                              "dd-MM-yyyy",
                                              new Date()
                                            ),
                                            -543
                                          )
                                        ),
                                      ]}
                                    >
                                      {data?.name}
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
                                      {Number(data?.total).toLocaleString() ||
                                        ""}
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
                                      {data?.count_day || ""}
                                    </Typography>
                                  </div>
                                </td>
                                <td className={classes}>
                                  <div className="flex items-center justify-center">
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className={`font-normal ${
                                        data?.status == "0"
                                          ? "bg-yellow-300 bg-opacity-60 px-3  rounded-lg "
                                          : data?.status == "1"
                                          ? "bg-green-300  bg-opacity-60 px-3  rounded-lg"
                                          : data?.status == "2"
                                          ? "bg-red-500  bg-opacity-60 px-3   rounded-lg"
                                          : data?.status == "3"
                                          ? "bg-purple-500  bg-opacity-60 px-3   rounded-lg"
                                          : ""
                                      } `}
                                    >
                                      {data?.status == 0
                                        ? "กำลังจ่าย"
                                        : data?.status == 1
                                        ? "จ่ายครบแล้ว"
                                        : data?.status == 2
                                        ? "ลูกค้าเสีย"
                                        : data?.status == 3
                                        ? "รียอด"
                                        : ""}
                                    </Typography>
                                  </div>
                                </td>
                                <td className={classes}>
                                  <div className="flex justify-center ">
                                    <IconButton
                                      variant="outlined"
                                      color="blue"
                                      size="sm"
                                      onClick={() => [
                                        setActiveRow(index),
                                        fetchUserList(data?.id, data?.status),
                                        setSumUser([]),
                                        setUserListData(data),
                                        fetchUserListSum(data?.id),
                                        setDisableInput(
                                          data?.status == 2 ? true : false
                                        ),
                                        setDisableButton(
                                          data?.status == 2 ? true : false
                                        ),
                                        setSelectedValue(data),
                                        setStatusValue({
                                          ...statusValue,
                                          value: data?.status,
                                          label:
                                            data?.status == 0
                                              ? "กำลังจ่าย"
                                              : "ลูกค้าเสีย",
                                        }),
                                        setSelectedValue({
                                          ...selectedValue,
                                          label: data?.name,
                                        }),
                                        setSelectDisable(1),
                                        setAmount(data?.total),
                                        setAmountDate(data?.count_day),
                                        setSearchQueryStart(
                                          addYears(
                                            parse(
                                              data?.start_day,
                                              "dd-MM-yyyy",
                                              new Date()
                                            ),
                                            +543
                                          )
                                        ),
                                        setSearchQueryEnd(
                                          addYears(
                                            parse(
                                              data?.end_day,
                                              "dd-MM-yyyy",
                                              new Date()
                                            ),
                                            -543
                                          )
                                        ),
                                      ]}
                                    >
                                      <BsFillEyeFill className="h-5 w-5  text-light-blue-700 " />
                                    </IconButton>
                                  </div>
                                </td>
                                <td className={classes}>
                                  <div className="flex justify-center ">
                                    <IconButton
                                      variant="outlined"
                                      color="blue"
                                      size="sm"
                                      onClick={() => [
                                        setActiveRow(index),
                                        handleModalClearUser(data),
                                        setUserId(data.id),
                                      ]}
                                    >
                                      <RiDeleteBin6Fill className="h-5 w-5  text-red-500 " />
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
              <div className=" flex flex-col md:flex-row  items-center sm:items-start  w-full justify-center md:justify-start gap-5  ">
                <div className="w-full md:w-[70%]">
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
                          {disableButton &&
                            sumUser?.map((data, index) => {
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
                                          onChange={(e) =>
                                            checkInputDate(e, index)
                                          }
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
                                          onChange={(e) =>
                                            setPrice(e.target.value)
                                          }
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
                                          handleChangeSwitch(
                                            index,
                                            e.target.checked
                                          )
                                        }
                                        disabled={
                                          data?.status == 1 ? true : false
                                        }
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
                                        disabled={
                                          data?.status == 0 ? false : true
                                        }
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
                                        disabled={
                                          data?.status == 1 ? false : true
                                        }
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
                <div
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* modal Add Process */}

      <Dialog
        open={openModalAddProcess}
        handler={handleModalAddProcess}
        size="xs"
        className="h-[65vh]"
      >
        <DialogHeader className="bg-purple-700 py-3  px-3  justify-center text-lg text-white opacity-80">
          <Typography variant="h5">เพิ่มการบันทึกใหม่</Typography>
        </DialogHeader>
        <DialogBody divider className=" h-[47vh]">
          <div className=" w-full  flex flex-col justify-center mt-3  ">
            <Select
              className="  max-h-0"
              classNamePrefix="select"
              placeholder="เลือกบริษัท"
              // isClearable={isClearable}
              isSearchable={isSearchable}
              name="color"
              options={locationOptions}
              onChange={(e) => handleLocationSelect(e)}
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            size="sm"
            onClick={handleModalAddProcess}
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
            onClick={handleModalConfirm}
            className="flex text-base mr-1"
          >
            <span className="mr-2 text-xl">
              <FaRegSave />
            </span>
            บันทึก
          </Button>
        </DialogFooter>
      </Dialog>

      {/* modal Add Confirm */}

      <Dialog
        open={openModalConfirm}
        handler={handleModalConfirm}
        size="xs"
        className="h-[20vh] "
      >
        <DialogHeader className="bg-purple-700 py-3  px-3  justify-center text-lg text-white opacity-80">
          <Typography variant="h5">ยืนยันการสร้าง</Typography>
        </DialogHeader>
        <DialogFooter className="flex justify-center gap-5 mt-3">
          <Button
            variant="text"
            color="red"
            size="sm"
            onClick={handleModalConfirm}
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
            onClick={handleAddProcess}
            className="flex text-base mr-1"
          >
            <span className="mr-2 text-xl">
              <FaRegSave />
            </span>
            บันทึก
          </Button>
        </DialogFooter>
      </Dialog>

      {/* modal รียอด  */}
      <Dialog
        open={openModalReload}
        handler={handleModalReload}
        size="xs"
        className="h-[25vh] "
      >
        <DialogHeader className="bg-purple-700 py-3  px-3  justify-center text-lg text-white opacity-80">
          <Typography variant="h5">ยืนยันการรียอด</Typography>
        </DialogHeader>
        <DialogBody>
          <div className="flex flex-col justify-center items-center ">
            <div className="flex gap-3 justify-center   ">
              <Typography>จำนวนเงิน:</Typography>
              <input
                type="number"
                className=" border-2 w-[100px] border-black text-center bg-gray-200  "
                value={newPrice || userListData?.total}
                min="0"
                // onChange={(e) =>
                //   setUserListData({
                //     ...userListData,
                //     total: Number(e.target.value),
                //   })
                // }
                onChange={(e) => setNewPrice(e.target.value)}
              />
            </div>
            {/* <div className="flex gap-10  justify-center mt-3  ">
              <Radio
                name="type"
                label="ปกติ"
                color="green"
                onClick={() => setRadio(0)}
                className="bg-gray-300 items-center border-b-2 "
                defaultChecked
              />
              <Radio
                name="type"
                label="ชำระล่วงหน้า"
                color="green"
                onClick={() => setRadio(1)}
                className="bg-gray-300 items-center border-b-2"
              />
            </div> */}
          </div>
        </DialogBody>
        <DialogFooter className="flex justify-center gap-5 ">
          <Button
            variant="text"
            color="red"
            size="sm"
            onClick={handleModalReload}
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
            onClick={handleReload}
            className="flex text-base mr-1"
          >
            <span className="mr-2 text-xl">
              <FaRegSave />
            </span>
            บันทึก
          </Button>
        </DialogFooter>
      </Dialog>

      {/* modal Show reload  */}
      <Dialog
        open={openModalDataReload}
        handler={handleModalDataReload}
        size="md"
        className="h-[40vh] "
      >
        <DialogHeader className="bg-purple-700 py-3  px-3  justify-center text-lg text-white opacity-80">
          <Typography variant="h5">ยืนยันการสร้าง</Typography>
        </DialogHeader>
        <DialogBody divider className=" h-[20vh]">
          <div className=" w-full  flex flex-col text-center justify-center mt-3 gap-3 ">
            <Typography className=" text-xl font-bold">
              ยอดกู้ใหม่{" "}
              <span>{Number(returnReload?.newSum).toLocaleString()}</span> บาท
            </Typography>
            <Typography className=" text-xl font-bold">
              จำนวนเงินที่จ่ายเกิน{" "}
              <span>{Number(returnReload?.qty_overpay).toLocaleString()}</span>{" "}
              บาท
            </Typography>
            {/* <Typography className=" text-xl font-bold">
              หักจากยอดเก่าคงเหลือ{" "}
              <span>{Number(returnReload?.mySum).toLocaleString()}</span> บาท
            </Typography> */}
            <Typography className=" text-xl font-bold">
              หักค่าเอกสาร และหักงวดแรก คงเหลือ{" "}
              <span>{Number(returnReload?.totalSum).toLocaleString()}</span> บาท
            </Typography>
          </div>
        </DialogBody>
        <DialogFooter className="flex justify-center gap-5 mt-3">
          <Button
            size="sm"
            variant="gradient"
            color="gray"
            onClick={handleModalDataReload}
            className="flex text-base mr-1"
          >
            <span className="mr-2 text-xl">
              <CiLogout />
            </span>
            ปิด
          </Button>
        </DialogFooter>
      </Dialog>

      {/* modal Clear User  */}
      <Dialog
        open={openModalClearUser}
        handler={handleModalClearUser}
        size="xs"
        className="h-[39vh] "
      >
        <DialogHeader className="bg-red-700 py-3  px-3  justify-center text-lg text-white opacity-80">
          <Typography variant="h5">ยืนยันการลบข้อมูล</Typography>
        </DialogHeader>
        <DialogBody divider className=" h-[15vh]">
          <div className=" w-full  flex flex-col text-center justify-center mt-3 gap-3 ">
            <Typography className=" text-xl font-bold">
              ข้อมูลจะถูกเริ่มต้นใหม่ทั้งหมด{" "}
            </Typography>
            <Typography className="text-red-500 underline text-xl font-bold">{`(เฉพาะคุณ ${userData?.name})`}</Typography>
            <Typography className=" text-xl font-bold">
              ข้อมูลรายงานรียอดจะถูกลบ{" "}
            </Typography>
          </div>
        </DialogBody>
        <DialogFooter className="flex justify-center gap-5 mt-7">
          <Button
            size="md"
            variant="gradient"
            color="gray"
            onClick={handleModalClearUser}
            className="flex text-base mr-1 w-[130px] items-center justify-center"
          >
            <span className="mr-2 text-xl">
              <CiLogout />
            </span>
            ปิด
          </Button>
          <Button
            size="sm"
            variant="gradient"
            color="red"
            onClick={() => handleClearUser(userData)}
            className="flex text-base mr-1"
          >
            <span className="mr-2 text-xl">
              <FaRegSave />
            </span>
            รีเซทข้อมูล
          </Button>
        </DialogFooter>
      </Dialog>
    </Card>
  );
};

export default Process;
