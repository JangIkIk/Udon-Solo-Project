import { useEffect } from "react";
import axios from "axios";



export const useTokenGet = <T,>(
    endpoint: string,
    setState: React.Dispatch<React.SetStateAction<T>>
  ) => {
    console.log("무한루프 방지");
    
    const storgeToken = sessionStorage.getItem("accessToken");
    const cookieToken = () => {
        const cookie = document.cookie.split(";");

        for(let i = 0 ; i < cookie.length; i++){
            const cookieTrim = cookie[i].trim();
            if(cookieTrim.startsWith("accessToken")){
                return cookieTrim.substring("accessToken=".length)
            }
        }
        return null;
    };

    useEffect(()=>{
        if(storgeToken){
            getData(storgeToken);
        }else if(cookieToken()){
            getData(cookieToken());
        }
    },[])


    const refreshToken = () => {
      return axios.get('/token', {withCredentials: true})
      .then( res => {
        const newToken = res.headers.authorization;
        setToken(newToken);
        return getData(newToken);
      })
    }

    const setToken = ( token : string )=>{
      if(storgeToken){
        sessionStorage.setItem("accessToken",token);
      }else{
        const expires = new Date();
        expires.setTime(expires.getTime() + (3600 * 1000))
        document.cookie = `accessToken=${token}; expires=${expires.toUTCString()}; path=/;`;
      }
    }
    
    const getData = ( token: string | null)=>{
        axios.get<T>(`${endpoint}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then( res => setState(res.data))
        .catch( err => {
          if(err.response.status === 401){
            return refreshToken();
          } else{
            console.log("토큰이 유효하지않음");
          }
        })
    }
}

