import { Global } from "./Global"


export const GetUserProfile = async(userId, setState)=>{
    const requestUserProfile = await fetch(Global.url+"user/profile/" + userId, {
        method: "GET",
        headers: { "Content-type": "application/json","Autorizathion":localStorage.getItem("token") },
      });
      const dataUserProfile = await requestUserProfile.json();
      console.log(dataUserProfile);
      if (dataUserProfile.status == "success") {
        setState(dataUserProfile.user);
      }
}