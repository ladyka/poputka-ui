import axios from "axios";

axios.interceptors.response.use(
    (response) => {
        const data = response.data as unknown;

        // When session expires, backend may return an HTML sign-in page.
        if (typeof window !== "undefined" && typeof data === "string" && data.includes("<h2>Please sign in</h2>")) {
            const pathname = window.location.pathname || "/";
            if (!pathname.startsWith("/sign-in")) {
                const next = `${window.location.pathname}${window.location.search}${window.location.hash}`;
                window.location.assign(`/sign-in?next=${encodeURIComponent(next)}`);
            }
            return Promise.reject(new Error("AUTH_REQUIRED"));
        }

        if (data && typeof data === "object" && "body" in (data as Record<string, unknown>)) {
            (response as typeof response & { data: unknown }).data = (data as { body: unknown }).body;
            return response;
        }

        (response as typeof response & { data: unknown }).data = data;
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export const instance = axios.create({
  baseURL: "/",
  withCredentials: true,
});

export const apiInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
});


