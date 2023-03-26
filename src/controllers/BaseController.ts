import { Response } from "express";
import { injectable } from "inversify";

@injectable()
export abstract class BaseController {
  public static jsonResponse(res: Response, code: number, message: any) {
    return res.status(code).json({ message });
  }

  public created(res: Response) {
    return res.sendStatus(201);
  }

  public ok<T>(res: Response, dto?: T) {
    if (dto) {
      res.type("application/json");
      return res.status(200).json(dto);
    } 
      return res.sendStatus(200);
    
  }

  protected addUserInfo(
    body: Record<string, any> | string,
    user: Record<string, any>,
  ) {
    if (typeof body === "string")
      body = body.length > 0 ? JSON.parse(body) : {};
    if (typeof user !== "undefined" && typeof body !== "string") {
      body.user = user.username;
      body.domain = user.domain;
    }
    return JSON.stringify(body);
  }

  protected lengthInUtf8Bytes(str: string): number {
    // Matches only the 10.. bytes that are non-initial characters in a multi-byte sequence.
    const m = encodeURIComponent(str).match(/%[89ABab]/g);
    return str.length + (m ? m.length : 0);
  }
}
