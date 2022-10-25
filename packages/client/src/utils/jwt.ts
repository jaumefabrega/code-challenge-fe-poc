type token = any; // FIX: fix

// Source: https://stackoverflow.com/a/47115113
export function jwtDecode(token: string | null) {
  if (!token) return null;
  const decodedToken: token = {};
  decodedToken.raw = token;
  decodedToken.header = JSON.parse(window.atob(token.split(".")[0]));
  decodedToken.payload = JSON.parse(window.atob(token.split(".")[1]));
  return decodedToken;
}
