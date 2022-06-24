import axios from 'axios';
import toast from 'react-hot-toast';

export default (method, form, cbSuccess, cbFail, isToast = true) => {
    axios
        .create({
            baseURL: import.meta.env.VITE_BASE_API,
            withCredentials: true
        })
    [method]('/auth/register', form)
        .then(resp => {

            // console.log(resp);

            if (cbSuccess) cbSuccess();
            if (isToast) toast.success(resp.data.msg);
            return resp;
        })
        .catch(err => {

            // console.log(err);

            if (cbFail) cbFail();
            if (isToast) toast.success(err.response.data.msg);
            return err;
        })
}