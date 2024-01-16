/**
 * @module index
 * @description This is the main module for the API. It handles incoming requests and sends them to the appropriate endpoint.
 * You should NOT have to edit this file. It's configured to work with the API defined in api.ts.
 */

import "./log.enhance";
import * as API from "./api";
import * as utils from "./utils";
import type { ServeOptions } from "bun";

function parseRequest(request: Request) {
    const headers = Object.fromEntries(request.headers.entries());
    const method = request.method.toUpperCase();
    const url = new URL(request.url);
    const relativePath = url.pathname.slice(API.BASE_PATH.length);
    return { headers, method, url, relativePath };
}

function json(data: EndpointData, status: UnionOfValues<typeof API.STATUSES>) {
    return new Response(JSON.stringify(data), {
        status: status ?? API.STATUSES.OK,
        headers: API.RESPONSE_HEADERS,
    });
}

const handleRequest = (async (request, server) => {
    let socket = server.requestIP(request);

    console.log(`Incoming request: ${request.method} ${request.url} from ${socket?.address ?? 'Unknown'}`);

    const { headers, method, url, relativePath } = parseRequest(request);

    const endpoint = API.ENDPOINTS[relativePath];

    if (!endpoint) {
        console.log(`Endpoint not found for ${method} ${relativePath}`);
        return json({ error: "Endpoint not found" }, API.STATUSES.NOT_FOUND);
    }

    const handler = endpoint[method];

    if (!handler) {
        console.log(`Method not allowed for ${method} ${relativePath}`);
        return json({ error: "Method not allowed" }, API.STATUSES.METHOD_NOT_ALLOWED);
    }

    let data: EndpointData = null;

    switch (method) {
        case "GET":
            const params = Object.fromEntries(url.searchParams.entries());
            if (Object.keys(params).length > 0) data = params;
            break;
        case "POST":
            const body = (await request.json()) as Record<string, unknown>;
            if (Object.keys(body).length > 0) data = body;
            break;
        default:
            return json({ error: "Method not supported by API" }, API.STATUSES.METHOD_NOT_ALLOWED);
    }

    console.log(`Handling request: ${method} ${relativePath}`);
    const response = await handler(data, headers);
    console.log(`Responding to request: ${method} ${relativePath} with response: ${JSON.stringify(response)}`);

    return json(utils.omit(response, "status"), response.status);
}) satisfies ServeOptions["fetch"];

let port = Bun.env.PORT || API.PORT;

function main() {
    try {
        Bun.serve({ port, fetch: handleRequest });
        console.log(`Listening on port: ${port}\n\nPress Ctrl+C to exit.`);
    }
    catch(e: unknown) {
        console.error(`Error occured during runtime: ${e}`);
        process.exit(1);
    }
}

main();