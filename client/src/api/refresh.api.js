import axios from "axios"

const refreshApi = async()=>{
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh`, 
        {},
        {
            withCredentials: true
        }
    )
    return res.data
}

export default refreshApi