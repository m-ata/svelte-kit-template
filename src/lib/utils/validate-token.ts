import { goto } from "$app/navigation";
import { DEFAULT_ROUTE, publicRoutes } from "$lib//constants";
import type { UserToken } from "$lib/types/token.type";

export const validateUserToken = async (user: UserToken) => {
  try {
    const currentLocation = window.location.pathname;
    if (!user.loggedIn && !publicRoutes.includes(currentLocation)) {
      await goto("/login");
    }
    if (user.loggedIn && publicRoutes.includes(currentLocation)) {
      await goto(DEFAULT_ROUTE);
    }
    return user.loggedIn;
  } catch (error) {
    console.log(error);
  }
};
