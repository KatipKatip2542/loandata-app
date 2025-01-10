import { Navigate, Route, Routes } from "react-router-dom";

import HomeAdmin from "../compoents/admin/layouts/HomeAdmin";
import Database from "../compoents/admin/pages/Database";
import Process from "../compoents/admin/pages/Process";
import Report from "../compoents/admin/pages/Report";
import Customer from "../compoents/admin/pages/Customer";
import ReportCheck from "../compoents/admin/pages/ReportCheck";
import ReportCheckDetail from "../compoents/admin/pages/ReportCheckDetail";

const CheckRouter = () => {
  const status = "admin"; // admin , user
  return (
    <>
      {status === "admin" ? (
        // สิทธิ์ Admin
        <Routes>
          <Route path="/admin" element={<HomeAdmin />}>
            <Route index element={<Database />} />
            <Route path="/admin/process" element={<Process />} />
            <Route path="/admin/report" element={<Report />} />
            <Route path="/admin/customer" element={<Customer />} />
            <Route path="/admin/report/check" element={<ReportCheck />} />
            <Route path="/admin/report/check/detail" element={<ReportCheckDetail />} />
          </Route>
          <Route path="/" element={<Navigate to="/admin" />} />
          <Route path="*" element={<Navigate to="/admin" />} />
        </Routes>
      ) : (
        ""
        // สิทธิ์ User
        // <Routes>
        //   <Route path="/admin" element={<Layout />}>
        //     <Route index element={<Home />} />
        //     <Route path="/admin/aboutme" element={<AboutMe />} />
        //   </Route>
        // </Routes>
      )}
    </>
  );
};

export default CheckRouter;
