import { createRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "./core";
import Cors from "micro-cors";

Cors({
  allowMethods: ["POST", "GET"],
});

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,

  // Apply an (optional) custom config:
  // config: { ... },
});
