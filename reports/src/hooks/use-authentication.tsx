
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
const SESSION_KEY = 'exams_token';
const SESSION_ID_TOKEN = 'exams_id_token';
const ACCOUNTID_KEY = 'account_id';
const UPI_NAME = 'exams_upid';
const CID_NAME = 'exams_cid';

interface Token {
  'email': string;
  'firstName': string;
  'lastName': string;
  'iat': number;
  'exp': number;
}

interface IdTokenDecoded extends Token {
  email_verified: boolean;
  'cognito:username': string;
  aud: string;
  name: string;
  email: string;
}

const useAuthentication = () => {

  const createSession = async (token: string, idToken: string, accountId: string, upid: string, cid: string) => {
    localStorage.setItem(SESSION_KEY, token);
    localStorage.setItem(ACCOUNTID_KEY, accountId);
    localStorage.setItem(UPI_NAME, upid);
    localStorage.setItem(CID_NAME, cid);
    localStorage.setItem(SESSION_ID_TOKEN, idToken);
  };

  /**
   * Return the current session token
   */
  const getSessionToken = () => {
    return localStorage.getItem(SESSION_KEY);
  };

  const logout = (callback?: () => void) => {
    localStorage.clear();

    if (callback) {
      callback();
    }
  };

  const isLoggedIn = () => {
    const tokenDecoded = getTokenDecoded();

    if (!tokenDecoded) {
      return false;
    }

    const currentTimestamp = Math.round(+new Date()/1000);

    return currentTimestamp < tokenDecoded.exp;
  };

  const getTokenDecoded = (): Token | undefined => {
    const sessionToken = getSessionToken();

    if (!sessionToken) {
      return undefined;
    }

    try {
      const decodedToken = jwt_decode(sessionToken) as Token;

      return decodedToken;
    } catch (error) {
      return undefined;
    }
  };

  const getUserNameFromToken = () => {
    const sessionToken = getSessionToken();

    if (sessionToken) {
      try {
        const decodeToken = jwt_decode(sessionToken) as Token;
        if (decodeToken?.firstName && decodeToken?.lastName) {
          return (decodeToken.firstName.concat(' ', decodeToken.lastName)) ;
        }
      } catch (error) {
        throw new Error('Invalid jwt');
      }
    }

    return null; 
  }

  const getAccountId = () => {
    return localStorage.getItem(ACCOUNTID_KEY)
  }

  const getUpid = () => {
    return localStorage.getItem(UPI_NAME);
  }

  const getCid = () => {
    return localStorage.getItem(CID_NAME);
  }

  const refreshTokenNeeded = () => {
    const decodedToken = getTokenDecoded();

    if (!decodedToken) {
      return true;
    }

    const currentTimestamp = Math.round(+new Date()/1000);

    return currentTimestamp > decodedToken.exp;
  }

  const getIdTokenDecoded = (): IdTokenDecoded | undefined => {
    const token = localStorage.getItem(SESSION_ID_TOKEN);

    if (!token) {
      return undefined;
    }

    const tokenDecoded: IdTokenDecoded = jwt_decode(token);

    return tokenDecoded;
  }

  return {
    createSession,
    getSessionToken,
    logout,
    isLoggedIn,
    getUserNameFromToken,
    refreshTokenNeeded,
    getIdTokenDecoded,
    getAccountId,
    getUpid,
    getCid
  };
}

export default useAuthentication;
