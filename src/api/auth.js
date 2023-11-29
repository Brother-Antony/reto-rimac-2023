import axios from "./axios";

export const transformUserData = (response) => {
    const { config, headers, request, status, data } = response
  
    const transformedData = {
        config,
        headers,
        request,
        status,
        data: {
          ...data,
          documentType: "DNI",
          documentNumber: "30216147",
          phoneNumber: "5130216147",
        },
    }
  
    return transformedData
}

export const loginRequest = async (user) => {
    try {
        const res = await axios.get(`/user.json`, user)

        if (res && res.status === 200) {
            const transformedData = transformUserData(res)
            return transformedData
        } else {
            console.error("Inicio de sesión fallido")
            return null
        }
    } catch (error) {
        console.error(error)
        return null
    }
}

export const plansRequest = async (user) => axios.get(`/plans.json`, user)
