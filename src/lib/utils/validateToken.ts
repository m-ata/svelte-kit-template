import {goto} from "$app/navigation";
import { publicRoutes } from "$lib//constants";
import type { UserToken } from "$lib/types";

export const validateUserToken = async(user: UserToken) => {
    try {
        const currentLocation = window.location.pathname;
        if (!user.loggedIn && !publicRoutes.includes(currentLocation)) {
            await goto("/login");
        }
        if (user.loggedIn && publicRoutes.includes(currentLocation)) {
            await goto("/");
        }
        return user.loggedIn;
    } catch(error) {
        console.log(error);
    }
}