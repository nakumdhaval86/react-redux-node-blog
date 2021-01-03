import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min";
import { useLocation } from "react-router-dom";
import AdminRouter from "./componets/Admin/Routing/AdminRoute";
import UserRouter from "./componets/client/UserRouter";

function App() {
  let location = useLocation();
  let nlocation = location.pathname.split("/");
  let adminLocation = nlocation[1];
  return (
    <div className="App">
      {/* UseBased Navigation */}
      {adminLocation === "admin" ? <AdminRouter /> : <UserRouter />}{" "}
    </div>
  );
}

export default App;
