import { jwtDecode } from "jwt-decode";

export interface JwtToken {
  sub: string; //username
  id: number;  
  exp: number;
  iat: number;
}


export const saveToken = (token: string) => {
  localStorage.setItem('token', token);
};
  
export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

export const clearToken = () => {
  localStorage.removeItem('token');
};

export const decodeToken = () : JwtToken|null => {
  const token = getToken();

  if (!token) return null;

  try {
    return jwtDecode<JwtToken>(token);
  } catch (err) {
    console.error("Gagal decode token:", err);
    return null;
  }
}

export const getUsername = (): string | null => {
  return decodeToken()?.sub ?? null;
};

export const getUserId = (): number | null => {
  return decodeToken()?.id ?? null;
};

export const isTokenExpired = () : boolean | null => {
  const decode = decodeToken();
  if(!decode || !decode.exp) return true

  const now = Math.floor(Date.now() / 1000);

  return decode.exp < now;

}