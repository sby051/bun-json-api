/**
 * @module log.enhance.ts
 * @description This module enhances the console.log and console.error functions to include a timestamp and server name.
 * @example
 * // This code:
 * console.log("Hello world!");
 * // Will print:
 * [Mon, 01 Jan 1970 00:00:00 GMT] [my-server-name] Hello world!
 */

import { NAME } from "./api";
const { log, error } = console;

console.log = (message, ...optionalParams) => {
    const timestamp = new Date().toUTCString();
    log(`\x1b[32m[${timestamp}] [${NAME}] ${message}\x1b[0m`, ...optionalParams);
};

console.error = (message, ...optionalParams) => {
    const timestamp = new Date().toUTCString();
    error(`\x1b[31m[${timestamp}] [${NAME}] ${message}\x1b[0m`, ...optionalParams);
};
