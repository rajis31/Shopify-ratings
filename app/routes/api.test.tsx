import { json, LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
  return Response.json(
    { description: "Successfully connected api" },
    { status: 200 },
  );
}
