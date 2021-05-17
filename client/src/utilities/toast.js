import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const errorToast = (data) => {
    toast.error(data, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })
}
export const successToast = (data) => {
    toast.success(data, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })
}

export const infoToast = (data) => {
    toast.info(data, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })
}