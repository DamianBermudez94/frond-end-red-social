import { Global } from "./Global";

export const GetUserProfile = async (userId, setState) => {
  const requestUserProfile = await fetch(
    Global.url + "user/profile/" + userId,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    }
  );
  const dataUserProfile = await requestUserProfile.json();
  
  if (dataUserProfile.status == "success") {
    setState(dataUserProfile.user);
  }
};
