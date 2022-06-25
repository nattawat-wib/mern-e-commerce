import axios from 'axios';
import toast from 'react-hot-toast';

export const cancelToken = axios.CancelToken.source();

export default (method, url, form, cbSuccess, cbFail, isToast = true, toggleList = []) => {
    if(toggleList.length) {
        toggleList.forEach(toggle => {
            toggle(true)
        })
    }
    
    axios
        .create({
            baseURL: import.meta.env.VITE_BASE_API,
            withCredentials: true
        })
    [method](url, form)
        .then(resp => {

            // console.log(resp);

            if (cbSuccess) cbSuccess(resp.data);
            if (isToast) toast.success(resp.data.msg);

            if(toggleList.length) {
                toggleList.forEach(toggle => {
                    toggle(false)
                })
            }            
            return resp;
        })
        .catch(err => {

            // console.log(err);

            if (cbFail) cbFail(err);
            if (isToast) toast.error(err.response.data.msg);

            if(toggleList.length) {
                toggleList.forEach(toggle => {
                    toggle(false)
                })
            }            
            return err;
        })
}