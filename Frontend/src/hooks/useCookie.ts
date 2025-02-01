const useCookie = (): [
  (cookieName: string) => string,
  (cookieName: string, value: string, days: number) => void,
  (cookieName: string) => void
] => {
  const getCookie = (cookieName: string): string => {
    console.log(document.cookie)
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${cookieName}=`));
    if (cookie) {
      return cookie.split("=")[1];
    }
    return " ";
  };

  const setCookie = (cookieName: string, value: string, days: number) => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
    document.cookie = `${cookieName}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
  };

  const deleteCookie = (cookieName: string) => {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  };
  return [getCookie, setCookie, deleteCookie];
};

export default useCookie;
