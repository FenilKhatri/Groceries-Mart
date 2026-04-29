import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TOAST_CONFIG } from "../../../utils/constants";

const AppToaster = () => {
  return <ToastContainer {...TOAST_CONFIG} />;
};

export default AppToaster;
