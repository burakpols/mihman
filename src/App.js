import React from "react"; // Import React
import { Route, Routes } from "react-router-dom";
import AdminPage from "./components/admin/admin";
import Qr from "./components/menu/qr";
import DataTable from "./components/admin/Dashboard";


const App = (props) => {
  return (
    <Routes>
      <Route path="/qr" element={<Qr />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route exact path="/admin/dashboard/zAwbAcPVXTIGwdSIIHXXYKehz3OANhWZ" element={<DataTable />} />
    </Routes>
  );
};

export default App;
