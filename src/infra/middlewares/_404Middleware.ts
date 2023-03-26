import { RequestHandler } from "express";

export const _404Middleware: RequestHandler = function (req, res, next) {
  res.status(404);

  // respond with json
  if (req.accepts("json")) {
    res.send({
      error: "Not found",
    });
    return;
  }

  // default to plain-text. send()
  res.type("txt").send("Not found");
};
