import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min";
// import Navbar from "./componets/Navbar";
// import AdminNavbar from "./componets/Admin/AdminNavbar";
// import Home from "./componets/Home";
// import PostForm from "./componets/PostForm";
// import PostView from "./componets/PostView";
import Dashboard from "./componets/Admin/Dashboard";
import { Switch, Route, useLocation } from "react-router-dom";
import AdminRouter from "./componets/Admin/AdminRoute";
import UserRouter from "./componets/UserRouter";

function App() {
  let location = useLocation();
  let nlocation = location.pathname.split("/");
  let adminLocation = nlocation[1];
  return (
    <div className="App">
      {/* {adminLocation === "admin" ? <AdminNavbar /> : <Navbar />} */}
      {adminLocation === "admin" ? <AdminRouter /> : <UserRouter />}

      {}
    </div>
  );
}

export default App;
