import { json, LoaderFunctionArgs } from "@remix-run/node";
import { cors } from "remix-utils/cors";

export async function loader({ request }: LoaderFunctionArgs) {
  let response = json({ description: "Successfully connected api" });
  return await cors(
    request,
    response,
    {
      origin: "*", 
      methods: ["GET", "POST", "OPTIONS"],
      credentials: true,
    },
  );
}


