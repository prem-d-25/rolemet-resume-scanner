import { useEffect } from "react"
import useAuthStore from "./authStore"
import refreshApi from "@/api/refresh.api"
import { useNavigate } from "react-router-dom"

const useAuthInit = ()=>{

    const {setAuth, setInitializing, logout} = useAuthStore(state=> state)
    const navigate = useNavigate()

    useEffect(()=>{
        const initializeAuth = async()=>{
            try{

                const data = await refreshApi()
                console.log(data)

                setAuth({
                    accessToken: data.accessToken,
                    user: data.user,
                })

            }
            catch(error){
                console.log("this")
                logout()
                navigate("/login")       
                console.error("No active session", error)
            }
            finally{
                setInitializing(false)
            }
        }
        initializeAuth()

    }, []);

}

export default useAuthInit