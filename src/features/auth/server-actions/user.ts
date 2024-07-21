"use server";

import { Prisma, UserRole } from "@prisma/client";
import { requireAuthentication } from "./auth";
import { prisma } from "@/lib/db";

export async function requireAdmin() {
  const user = await requireAuthentication();

  if (user.role !== UserRole.ADMIN) {
    throw new Error("Not authorized to perform this action");
  }

  return user;
}

export async function updateUser(updateUser: Prisma.UserCreateInput) {
  const user = await requireAuthentication();

  try {
    await prisma.user.update({
      where: { id: user.id },
      data: updateUser,
    });

    return true;
  } catch (error) {
    throw new Error("Couldn't update user");
  }
}
