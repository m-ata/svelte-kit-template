import {goto} from "$app/navigation";
import { publicRoutes } from "../../utils/constants";

export const validateUserToken = async() => {
    try {
        
        const response = localStorage.getItem('auth-token');
        const currentLocation = window.location.pathname;
        if (!response && !publicRoutes.includes(currentLocation)) {
            await goto("/login");
        }
        if (response && publicRoutes.includes(currentLocation)) {
            await goto("/");
        }
        return response;
    } catch(error) {
        console.log(error);
    }
}