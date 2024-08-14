export const routes = {
  root: "/",
  getStarted: {
    root: "/get-started",
  },
  signin: { root: "/sign-in" },
  dashboard: {
    root: "/",
    groups: {
      root: "/groups",
      create: {
        root: "/groups/create",
      },
      id: (id: string) => ({
        root: `/groups/${id}`,
        updateMembers: {
          root: `/groups/${id}/update-members`,
        },
      }),
    },
    meetups: {
      root: "/meetups",
      create: {
        root: "/meetups/create",
      },
      id: (id: string) => ({
        root: `/meetups/${id}`,
        update: {
          root: `/meetups/${id}/update`,
        },
        attendance: {
          root: `/meetups/${id}/attendance`,
        },
      }),
    },
    people: {
      root: "/people",
      create: {
        root: "/people/create",
      },
      id: (id: string) => ({
        root: `/people/${id}`,
        update: {
          root: `/people/${id}/update`,
        },
      }),
    },
    posters: {
      root: "/posters",
    },
    settings: {
      root: "/settings",
    },
    tasks: {
      root: "/tasks",
    },
    team: {
      root: "/team",
    },
  },
};
