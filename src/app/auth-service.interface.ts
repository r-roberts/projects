export interface IAuthorization {
    roles: string[];
    accessToken: string;
    idToken: string;
    login: () => void;
    handleAuthentication: () => void;
    renewTokens: () => void;
    logout: () => void;
    clearSession: () => void;
    isAuthenticated: () => boolean;
}
