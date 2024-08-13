import client from "@prisma/client";

export type Meetup = Omit<client.Meetup, "date"> & {
  date: string;
};
