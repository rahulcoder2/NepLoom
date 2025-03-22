/**
 * A middleware function that wraps an async route handler to catch errors automatically.
 *
 * @param {(req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => Promise<any>} requestHandler
 * @returns {(req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => void}
 */
const asyncHandle = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((error)=> next(error));
    };
};

export { asyncHandle };
