import { Global } from "./Global"


export const GetUserProfile = async(userId, useState)=>{
    const request = await fetch(Global.url+"user/profile" + userId, {
        method: "GET",
        headers: { "Content-type": "application/json","Autorizathion":localStorage.getItem("token") },
      });
      const data = await request.json();
      console.log(data);
      if (data.status == "success") {
        setUserProgile(data.user);
      }
}