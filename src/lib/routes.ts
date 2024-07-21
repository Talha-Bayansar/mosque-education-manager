export const routes = {
  root: "/",
  signin: { root: "/sign-in" },
  dashboard: {
    root: "/dashboard",
    groups: {
      root: "/dashboard/groups",
    },
    meetups: {
      root: "/dashboard/meetups",
    },
    people: {
      root: "/dashboard/people",
      create: {
        root: "/dashboard/people/create",
      },
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
