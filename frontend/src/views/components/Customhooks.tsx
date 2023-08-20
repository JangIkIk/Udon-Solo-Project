import axios from "axios";


// 엑세스 토큰이 저장된 위치
export const isToken = ( token? : string)=>{
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

  if(storgeToken && token){
      sessionStorage.setItem("accessToken",token);
  } else if(cookieToken() && token){
      const expires = new Date();
      expires.setTime(expires.getTime() + (3600 * 1000))
      document.cookie = `accessToken=${token}; expires=${expires.toUTCString()}; path=/;`;
  }

  if(storgeToken){
    return storgeToken
  } else if(cookieToken()){
    return cookieToken()
  }
}

// 엑세스토큰 재발급
export const refreshToken = () => {
    return axios.get('/token', {withCredentials: true})
    .then( res => {
      const newToken = res.headers.authorization;
      isToken(newToken);
    })
    .catch( err => {
      console.log("리프레시토큰 유효하지않음");
      console.log("err:",err)
    })
  }



// export const useTokenGet = <T,>(
//     endpoint: string,
//     setState: React.Dispatch<React.SetStateAction<T>>
//   ) => {
//     console.log("무한루프 방지");
    
//     const storgeToken = sessionStorage.getItem("accessToken");
//     const cookieToken = () => {
//         const cookie = document.cookie.split(";");

//         for(let i = 0 ; i < cookie.length; i++){
//             const cookieTrim = cookie[i].trim();
//             if(cookieTrim.startsWith("accessToken")){
//                 return cookieTrim.substring("accessToken=".length)
//             }
//         }
//         return null;
//     };

//     useEffect(()=>{
//         if(storgeToken){
//             getData(storgeToken);
//         }else if(cookieToken()){
//             getData(cookieToken());
//         }
//     },[])


//     const refreshToken = () => {
//       return axios.get('/token', {withCredentials: true})
//       .then( res => {
//         const newToken = res.headers.authorization;
//         setToken(newToken);
//         return getData(newToken);
//       })
//     }

//     const setToken = ( token : string )=>{
//       if(storgeToken){
//         sessionStorage.setItem("accessToken",token);
//       }else{
//         const expires = new Date();
//         expires.setTime(expires.getTime() + (3600 * 1000))
//         document.cookie = `accessToken=${token}; expires=${expires.toUTCString()}; path=/;`;
//       }
//     }
    
//     const getData = ( token: string | null)=>{
//         axios.get<T>(`${endpoint}`,{
//             headers:{
//                 Authorization: `Bearer ${token}`
//             }
//         })
//         .then( res => setState(res.data))
//         .catch( err => {
//           if(err.response.status === 401){
//             return refreshToken();
//           } else{
//             console.log("토큰이 유효하지않음");
//           }
//         })
//     }
// }

