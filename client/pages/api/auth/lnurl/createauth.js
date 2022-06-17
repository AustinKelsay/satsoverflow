import { middlewares } from "../../../../helpers/express";
import prisma from "../../../../lib/prisma";
import { encodedUrl } from "../../../../lib/lnurl";
import { randomBytes } from "crypto";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export default async function handler(req, res) {
  function k1() {
    return randomBytes(32).toString("hex");
  }
  await middlewares(req, res);

  const createauth = await prisma.lnAuth.create({ data: { k1: k1() } });

  const encodedurl = encodedUrl(process.env.LNAUTH_URL, "login", createauth.k1);

  if (createauth) {
    res.status(200).json({ createauth, encodedurl });
  } else {
    res.status(400).json({ status: "lnAuth could not be created" });
  }
}
