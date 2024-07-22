export const routes = {
  root: "/",
  signin: { root: "/sign-in" },
  dashboard: {
    root: "/dashboard",
    groups: {
      root: "/dashboard/groups",
      create: {
        root: "/dashboard/groups/create",
      },
      id: (id: string) => ({
        root: `/dashboard/groups/${id}`,
        update: {
          root: `/dashboard/groups/${id}/update`,
        },
      }),
    },
    meetups: {
      root: "/dashboard/meetups",
    },
    people: {
      root: "/dashboard/people",
      create: {
        root: "/dashboard/people/create",
      },
      id: (id: string) => ({
        root: `/dashboard/people/${id}`,
        update: {
          root: `/dashboard/people/${id}/update`,
        },
      }),
    },
    posters: {
      root: "/dashboard/posters",
    },
    settings: {
      root: "/dashboard/settings",
    },
    tasks: {
      root: "/dashboard/tasks",
    },
    team: {
      root: "/dashboard/team",
    },
  },
};
