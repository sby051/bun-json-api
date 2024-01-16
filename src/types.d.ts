/**
 * Type used by the ENDPOINTS constant in src/api.ts. DO NOT EDIT.
 */
declare type Endpoints = Record<
    string,
    Record<
        string,
        EndpointRequestHandler
    >
>;

/**
 * A function that receives some data (or null) and headers and returns a promise of some data (or null).
 */
declare type EndpointRequestHandler = (
    data: EndpointData,
    headers: Record<string, string>,
) => Promise<EndpointData & { status?: UnionOfValues<typeof API.STATUSES> }>;

/**
 * The data that is sent to the endpoint handler. This is either a query string object, a parsed JSON object or null.
 */
declare type EndpointData = Record<string, unknown> | null;

declare type UnionOfValues<T> = T extends Record<string, infer U> ? U : never;