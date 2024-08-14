"use client";

import { View } from "@/shared/components/layout/view";
import {
  format,
  isAfter,
  isSameDay,
  startOfToday,
  startOfTomorrow,
} from "date-fns";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { CalendarIcon, HouseIcon, UserIcon } from "lucide-react";
import { isArrayEmpty } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { getUpcomingMeetups } from "../server-actions/meetup";

type Props = {
  upcomingMeetups: Awaited<ReturnType<typeof getUpcomingMeetups>>;
};

export const UpcomingMeetups = ({ upcomingMeetups }: Props) => {
  const t = useTranslations();
  const today = startOfToday();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("upcomingMeetups")}</CardTitle>
      </CardHeader>
      <CardContent>
        <View>
          <View>
            {!isArrayEmpty(upcomingMeetups) ? (
              upcomingMeetups
                .filter(
                  (meetup) =>
                    isSameDay(meetup.date, today) || isAfter(meetup.date, today)
                )
                .map((meetup) => (
                  <Card key={meetup.id}>
                    <CardHeader>
                      <h3 className="font-medium">{meetup.subject}</h3>
                    </CardHeader>
                    <CardContent>
                      <p className="flex gap-2 items-center">
                        <UserIcon className="flex-shrink-0" size={16} />
                        <span>
                          {`${meetup.speaker?.firstName} ${meetup.speaker?.lastName}`}
                        </span>
                      </p>
                      <p className="flex gap-2 items-center">
                        <HouseIcon className="flex-shrink-0" size={16} />
                        <span>
                          {`${meetup.host?.firstName} ${meetup.host?.lastName}`}
                        </span>
                      </p>
                      <p className="flex gap-2 items-center">
                        <CalendarIcon className="flex-shrink-0" size={16} />
                        <span>
                          {isSameDay(new Date(meetup.date), startOfToday())
                            ? t("today")
                            : isSameDay(
                                new Date(meetup.date),
                                startOfTomorrow()
                              )
                            ? t("tomorrow")
                            : format(new Date(meetup.date), "dd/MM/yyyy")}
                        </span>
                      </p>
                    </CardContent>
                  </Card>
                ))
            ) : (
              <p>{t("noUpcomingMeetups")}</p>
            )}
          </View>
        </View>
      </CardContent>
    </Card>
  );
};
