"use server";

import { View } from "@/shared/components/layout/view";
import { getTranslations } from "next-intl/server";
import { getUpcomingMeetups } from "../server-actions/meetup";
import { format, isSameDay, startOfToday, startOfTomorrow } from "date-fns";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { CalendarIcon, HouseIcon, UserIcon } from "lucide-react";
import { isArrayEmpty } from "@/lib/utils";

export const UpcomingMeetups = async () => {
  const t = await getTranslations();
  const upcomingMeetups = await getUpcomingMeetups(startOfToday());

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("upcomingMeetups")}</CardTitle>
      </CardHeader>
      <CardContent>
        <View>
          <View>
            {!isArrayEmpty(upcomingMeetups) ? (
              upcomingMeetups.map((meetup) => (
                <Card key={meetup.id}>
                  <CardHeader>
                    <h3 className="font-medium">{meetup.subject}</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="flex gap-2 items-center">
                      <UserIcon size={16} />
                      <span>
                        {`${meetup.speaker?.firstName} ${meetup.speaker?.lastName}`}
                      </span>
                    </p>
                    <p className="flex gap-2 items-center">
                      <HouseIcon size={16} />
                      <span>
                        {`${meetup.host?.firstName} ${meetup.host?.lastName}`}
                      </span>
                    </p>
                    <p className="flex gap-2 items-center">
                      <CalendarIcon size={16} />
                      <span>
                        {isSameDay(new Date(meetup.date), startOfToday())
                          ? t("today")
                          : isSameDay(new Date(meetup.date), startOfTomorrow())
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
