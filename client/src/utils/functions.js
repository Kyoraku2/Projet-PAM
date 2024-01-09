import {COOKIE_MINUTE_TO_EXPIRE} from "./consts";

export function isLogged() {
  return getCookie('user') !== null;
}

/* Cookies */
export function setCookie(key, value, minutesToExpire = COOKIE_MINUTE_TO_EXPIRE) {
  const date = new Date();
  date.setTime(date.getTime() + (minutesToExpire * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  const serializedValue = JSON.stringify(value);
  document.cookie = key + "=" + serializedValue + ";" + expires + ";path=/";
}

export function deleteCookie(key) {
  document.cookie = key + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

export function getCookie(key) {
  const name = key + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');
  for(let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) === 0) {
      const serializedValue = cookie.substring(name.length, cookie.length);
      return JSON.parse(serializedValue);
    }
  }
  return null;
}
