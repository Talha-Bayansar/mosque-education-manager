"use client";

import { View } from "@/shared/components/layout/view";
import { Person } from "@prisma/client";
import { usePeople } from "../hooks/use-people";
import { isArrayEmpty } from "@/lib/utils";

type Props = {
  peopleServer: Person[];
};

export const PeopleView = ({ peopleServer }: Props) => {
  const { data } = usePeople(peopleServer);

  if (isArrayEmpty(data)) return null;

  return (
    <View>
      {data!.map((person) => (
        <div key={person.id}>
          {person.firstName} {person.lastName}
        </div>
      ))}
    </View>
  );
};
