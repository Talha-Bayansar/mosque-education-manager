"use server";
import { TimeSpan, createDate } from "oslo";
import { generateRandomString, alphabet } from "oslo/crypto";
import { lucia } from "..";
import { cookies } from "next/headers";
import { cache } from "react";
import type { Session, User } from "lucia";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { prisma } from "@/lib/db";

export const requireAuthentication = async () => {
  const { user } = await getSession();

  if (!user) throw new Error("Not authenticated");

  return user;
};

export const sendEmail = async (email: string, verificationCode: string) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    /* 
          setting service as 'gmail' is same as providing these setings:
          host: "smtp.gmail.com",
          port: 465,
          secure: true
          If you want to use a different email provider other than gmail, you need to provide these manually.
          Or you can go use these well known services and their settings at
          https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json
      */
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASSWORD,
    },
  });

  const mailOptions: Mail.Options = {
    from: process.env.MY_EMAIL,
    to: email,
    subject: "Verification Code",
    text: verificationCode,
  };

  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve("Email sent");
        } else {
          reject(err.message);
        }
      });
    });

  try {
    await sendMailPromise();
    return true;
  } catch (err) {
    return false;
  }
};

export async function generateEmailVerificationCode(
  email: string
): Promise<string> {
  await prisma.verificationCode.delete({
    where: { email: email.toLowerCase() },
  });

  const code = generateRandomString(8, alphabet("0-9"));
  await prisma.verificationCode.create({
    data: {
      email: email.toLowerCase(),
      code: code,
      expiresAt: createDate(new TimeSpan(15, "m")),
    },
  });
  return code;
}

export async function sendEmailVerificationCode(email: string) {
  const code = await generateEmailVerificationCode(email.toLowerCase());
  await sendEmail(email.toLowerCase(), code);
}

export async function signin(email: string, code: string) {
  const verificationCode = await prisma.verificationCode.findFirst({
    where: {
      AND: [
        {
          email: email.toLowerCase(),
        },
        {
          code: code,
        },
      ],
    },
  });

  if (verificationCode) {
    const user = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });

    if (user) {
      const session = await lucia.createSession(user.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
      await prisma.verificationCode.delete({
        where: {
          id: verificationCode.id,
        },
      });
      return true;
    } else {
      const email = verificationCode.email;
      const name = email.split("@")[0];
      const newUser = await prisma.user.create({
        data: {
          email: email.toLowerCase(),
          name: name,
        },
      });

      if (newUser) {
        const session = await lucia.createSession(newUser.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
        await prisma.verificationCode.delete({
          where: {
            id: verificationCode.id,
          },
        });
        return true;
      } else {
        return false;
      }
    }
  } else {
    return false;
  }
}

export const getSession = cache(
  async (): Promise<
    { user: User; session: Session } | { user: null; session: null }
  > => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    const result = await lucia.validateSession(sessionId);
    // next.js throws when you attempt to set cookie when rendering page
    try {
      if (result.session && result.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }
    } catch {}
    return result;
  }
);

export async function signout(): Promise<boolean> {
  const { session } = await getSession();
  if (!session) {
    return false;
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return true;
}
