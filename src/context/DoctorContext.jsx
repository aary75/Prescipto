import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {
    
    const backenedUrl = import.meta.env.VITE_BACKENED_URL

    const [dToken, setDToken] = useState(localStorage.getItem('dToken')?localStorage.getItem('dToken'):'') 
    const [appointments, setAppointments] = useState([])
    const [dashData, setDashData] = useState(false)
    const [profileData, setProfileData] = useState(false)

    const getAppointments = async () => {
        try {
            
         const {data} = await axios.get(backenedUrl + '/api/doctor/appointments',{headers:{dToken}})
         if (data.success) {
            setAppointments(data.appointments)
            console.log(data.appointments)
        } else {
            toast.error(data.message)
         }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const completeAppointment = async (appointmentId) => {
        
        try {
            
            const {data} = await axios.post(backenedUrl + '/api/doctor/complete-appointment',{appointmentId},{headers:{dToken}})
            if (data.success) {
                toast.success(data.message)
                getAppointments()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const cancelAppointment = async (appointmentId) => {
        
        try {
            
            const {data} = await axios.post(backenedUrl + '/api/doctor/cancel-appointment',{appointmentId},{headers:{dToken}})
            if (data.success) {
                toast.success(data.message)
                getAppointments()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const getDashData = async () => {

        try {
            
            const {data} = await axios.get(backenedUrl + '/api/doctor/dashboard', {headers:{dToken}})
            if (data.success) {
                setDashData(data.dashData)
                console.log(data.dashData)
            } else {
                toast.error(data.message)
            }


        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const getProfileData = async () => {
        try {
            
            const {data} = await axios.get(backenedUrl + '/api/doctor/profile',{headers:{dToken}})
            if(data.success) {
                setProfileData(data.profileData)
                console.log(data.profileData)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const value = {
         dToken, setDToken,
         backenedUrl,
         appointments,setAppointments,
         getAppointments,
         completeAppointment,cancelAppointment,
         dashData,setDashData,getDashData,
         profileData,setProfileData,
         getProfileData,
    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider