import axios, { AxiosError, AxiosResponse, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { jwtDecode } from 'jwt-decode'; // Ensure it's installed via `npm install jwt-decode`
import { BASE_URL, REFRESH_TOKEN_URL } from '@/handler/apiConfig';
interface ApiErrorResponse {
    detail?: string;
    [key: string]: unknown;
}

interface AuthResponse {
    access: string;
    refresh: string;
}

interface DecodedToken {
    exp: number;
}
// Redirect to login
const redirectToLogin = () => {
    localStorage.removeItem('accessToken'); // Remove accessToken from localStorage
    localStorage.removeItem('refreshToken');
    // window.location.href = '/login';
};

export const handleApiError = (error: AxiosError<ApiErrorResponse>) => {
    if (error.response && error.response.data) {
        console.error('API Error:', error.response.data);
        throw error.response.data;
    } else {
        console.error('API Error:', error.message);
        throw error;
    }
};

export const api = axios.create({
    baseURL: BASE_URL,
});

// Function to check if a token is expired
const isTokenExpired = (token: string | null): boolean => {
    if (!token) return true;
    try {
        const decoded: DecodedToken = jwtDecode(token);
        return decoded.exp * 1000 < Date.now(); // Convert seconds to milliseconds
    } catch (error) {
        return true;
    }
};

// Token refresh queue handler
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

// Add subscriber to queue
const subscribeTokenRefresh = (callback: (token: string) => void) => {
    refreshSubscribers.push(callback);
};

// Notify subscribers when token is refreshed
const onRefreshed = (newToken: string) => {
    console.log('Token refreshed');
    refreshSubscribers.forEach((callback) => callback(newToken));
    refreshSubscribers = [];
};
// Request Interceptor
api.interceptors.request.use(
    async (config: AxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
        let accessToken =localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        // Check if access token is expired
        if (isTokenExpired(accessToken) && refreshToken) {
            if (!isRefreshing) {
                isRefreshing = true;
                try {
                    const response = await axios.post<AuthResponse>(REFRESH_TOKEN_URL, { refresh: refreshToken });
                    if (response.status === 200) {
                        accessToken = response.data.access;
                        localStorage.setItem('accessToken', accessToken); // Set accessToken as a cookie with an expiry of 1 day
                        onRefreshed(accessToken); // Notify subscribers
                    } else {
                        redirectToLogin();
                    }
                } catch (refreshError) {
                    console.error('Token refresh failed:', refreshError);
                    redirectToLogin();
                    return Promise.reject(refreshError);
                } finally {
                    isRefreshing = false;
                }
            }

            // Queue requests while refreshing and continue once token is refreshed
            return new Promise((resolve) => {
                subscribeTokenRefresh((newToken: string) => {
                    if (config.headers) {
                        config.headers.Authorization = `Bearer ${newToken}`;
                    }
                    resolve(config as InternalAxiosRequestConfig);
                });
            });
        }

        // Attach access token to headers if available
        if (accessToken && config.headers) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config as InternalAxiosRequestConfig;
     },
    (error: AxiosError) => Promise.reject(error)
);
api.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        const originalRequest: (AxiosRequestConfig & { _retry?: boolean }) | undefined = error.config;
        if (!originalRequest) {
            return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken || isTokenExpired(refreshToken)) {
                redirectToLogin();
                return Promise.reject(error);
            }

            try {
                const response = await axios.post<AuthResponse>(REFRESH_TOKEN_URL, { refresh: refreshToken });
                if (response.status === 200) {
                    const newAccessToken = response.data.access;
                    localStorage.setItem('accessToken', newAccessToken); // Set the new access token in cookies

                    if (originalRequest.headers) {
                        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    }
                    // Retry the original request with the new access token
                    return api(originalRequest);
                }
            } catch (refreshError) {
                console.error('Error refreshing token:', refreshError);
                redirectToLogin();
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);  // Reject the error for other cases
    }
);

