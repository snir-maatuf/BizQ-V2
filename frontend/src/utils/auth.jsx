export const useIsLoggedIn = () => {
  return localStorage.getItem('userId');
};
export const logOut = () => {
  localStorage.removeItem('userId');
  window.location.href = '/';
};
