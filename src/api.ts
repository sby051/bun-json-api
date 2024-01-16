/**
 * @module api.ts
 * @description This is the main module for the API. It defines the endpoints and their handlers, as well as some other configuration.
 */

/**
 * The endpoints for the API. Each endpoint is a key-value pair,
   where the key is the path and the value is a handler function for each HTTP method.
 */
export const ENDPOINTS: Endpoints = {
    "/echo": {
        GET: async (params, headers) => {
            return { params, headers }
        },
        POST: async (body, headers) => {
            return { body, headers }
        },
    },
};

/**
 * The port the API will listen on.
 * @default 8080
 */
export const PORT = 8080;

/**
 * The base path for the API. Leave blank for root.
 * @example "/api/v1"
 * @default "" -> root (/)
 */
export const BASE_PATH = "";

/**
 * The name of the server. This will be sent in the response headers and shown in logs.
 * @example "my-cool-bun-api-name"
 * @default "bun-json-api"
 */
export const NAME = "bun-json-api";

/**
 * The default response headers. These will be sent with every response in index.ts. Edit this if you want to add or remove headers.
 */
export const RESPONSE_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
    Server: "Bun",
    "X-Powered-By": "Bun",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
    "Referrer-Policy": "no-referrer",
    "Feature-Policy": "none",
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
};

export const STATUSES = {
    // 2xx Success
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NON_AUTHORITATIVE_INFORMATION: 203,
    NO_CONTENT: 204,
    RESET_CONTENT: 205,
    PARTIAL_CONTENT: 206,

    // 3xx Redirection
    MULTIPLE_CHOICES: 300,
    MOVED_PERMANENTLY: 301,
    FOUND: 302,
    SEE_OTHER: 303,
    NOT_MODIFIED: 304,
    USE_PROXY: 305,
    TEMPORARY_REDIRECT: 307,
    PERMANENT_REDIRECT: 308,

    // 4xx Client Error
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    PAYMENT_REQUIRED: 402,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    NOT_ACCEPTABLE: 406,
    PROXY_AUTHENTICATION_REQUIRED: 407,
    REQUEST_TIMEOUT: 408,
    CONFLICT: 409,
    GONE: 410,
    LENGTH_REQUIRED: 411,
    PRECONDITION_FAILED: 412,
    PAYLOAD_TOO_LARGE: 413,
    URI_TOO_LONG: 414,
    UNSUPPORTED_MEDIA_TYPE: 415,
    RANGE_NOT_SATISFIABLE: 416,
    EXPECTATION_FAILED: 417,
    IM_A_TEAPOT: 418, // April Fools' joke in RFC 2324
    MISDIRECTED_REQUEST: 421,
    UNPROCESSABLE_ENTITY: 422,
    LOCKED: 423,
    FAILED_DEPENDENCY: 424,
    TOO_EARLY: 425,
    UPGRADE_REQUIRED: 426,
    PRECONDITION_REQUIRED: 428,
    TOO_MANY_REQUESTS: 429,
    REQUEST_HEADER_FIELDS_TOO_LARGE: 431,

    // 5xx Server Error
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
    HTTP_VERSION_NOT_SUPPORTED: 505,
    VARIANT_ALSO_NEGOTIATES: 506,
    INSUFFICIENT_STORAGE: 507,
    LOOP_DETECTED: 508,
    NOT_EXTENDED: 510,
    NETWORK_AUTHENTICATION_REQUIRED: 511
} as const; // as const makes this a literal type, so we can use it in the response headers

export default ENDPOINTS;
