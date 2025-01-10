import React, { useEffect, useState } from 'react'
import { TbReportAnalytics } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import { getAllReportCheckMyHome } from '../../../api/ReportApi';


const ReportCheck = () => {
    const [data, setData]= useState([])
    const navigate  = useNavigate()

    const fetchData = async()=>{
        try {
            const res = await getAllReportCheckMyHome()
            console.log({res});
            setData(res)
        } catch (error) {
            console.log(error);
        }
    }

    const handleChangePage = (id)=>{
        navigate (`/admin/report/check/detail`, {state: {id}})
    }

    useEffect(()=>{
        fetchData()
    },[])
  return (
    <div>
        <h2 className='text-lg flex flex-row gap-2 items-center'> <TbReportAnalytics size={23}/> ตรวจสอบรายการ บ้านที่ยังจ่ายไม่ครบ</h2>

        <div className='flex flex-wrap mt-5'>
            {data?.map((item)=> (
                <div className=' w-1/2 lg:w-1/6 p-2' key={item.id}>
                    <div className='bg-white hover:bg-gray-50 text-md hover:text-lg   text-center py-8 rounded-md shadow-lg  ' onClick={()=>handleChangePage(item.id)}>
                        <p className=' cursor-pointer'>{item.name}</p>
                    </div>

                </div>
            ))}

        </div>

    </div>
  )
}

export default ReportCheck