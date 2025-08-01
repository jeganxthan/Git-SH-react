import {API_PATHS} from './apiPaths'
import axiosInstance from './axiosInstance'

const uploadImages = async(imageFile)=>{
    const formData = new FormData();
    formData.append('profileImage', imageFile);
    try{
        const response = await axiosInstance.post(API_PATHS.AUTH.UPLOAD_IMAGE, formData,{
            headers:{
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log("UPLOAD RESPONSE", response.data);
        return response.data;
    }catch(error){
        console.error('Error uploading the image: ', error);
        throw error;
    }
}
export default uploadImages;