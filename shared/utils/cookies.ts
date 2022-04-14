export const setCookie = (name: string, token: string) => {
  const expiryDate = new Date();
  expiryDate.setMonth(expiryDate.getMonth() + 1);
  document.cookie = `${name}=${token}; path=/; expires=${expiryDate}`;
};

export const deleteCookie = (name: string) => {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
};
