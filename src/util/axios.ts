import axios from "axios";
  
export function getAPI() {
    let jwt = localStorage.getItem("jwt");
    if (jwt === "undefined") {
        localStorage.removeItem("jwt");
        jwt = null;
    }
    const api = axios.create({
        withCredentials: true,
        baseURL: "https://starvation-api.buildingblocs.sg/",
        headers: {
            "Authorization": (jwt ? `Bearer ${jwt}` : null)
        }
    });
    const renew = localStorage.getItem("renew");
    if (renew && Date.parse(renew) < Date.now()) {
        const refresh = localStorage.getItem("refresh");
        api.post("/refresh", {}, { headers: { "Authorization": refresh ? `Bearer ${refresh}` : null } }).then(
            res => {
                localStorage.setItem("jwt", res.data.access_token);
                localStorage.setItem("renew", res.data.renew);
            }
        ).catch(() => {
            localStorage.removeItem("jwt");
            localStorage.removeItem("renew");
            localStorage.removeItem("refresh");
        })
    }
    return api;
}

export default getAPI;