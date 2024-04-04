import { Global } from "./Global";

export const GetUserProfile = async (userId, setState) => {
  const requestUserProfile = await fetch(
    Global.url + "user/profile/" + userId,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    }
  );
  const dataUserProfile = await requestUserProfile.json();

  if (dataUserProfile.status == "success") {
    setState(dataUserProfile.user);
  }
  // Devolvemos toda la data que tiene la peticion
  return dataUserProfile;
};
