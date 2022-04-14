export function checkCookie(): boolean | null {
  if (typeof window !== "undefined") {
    let cookieEnabled = navigator.cookieEnabled;
    if (!cookieEnabled) {
      document.cookie = "test_cookie";
      cookieEnabled = document.cookie.indexOf("test_cookie") != -1;
    }
    return cookieEnabled;
  }
  return null;
}
