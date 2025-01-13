import { useState } from "react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";
import { GraphQLClient, GraphQLQueryOptions } from "node_modules/@shopify/shopify-app-remix/dist/ts/server/clients/types";
import type { AllOperations, AdminOperations} from '@shopify/admin-api-client';
import { authenticate } from "../shopify.server";
export const links = () => [{ rel: "stylesheet", href: polarisStyles }];



async function getProducts(graphql: GraphQLClient<AdminOperations>) {

  const response = await graphql(
    `query {
      products(first: 10, reverse: true) {
        edges {
          node {
            id
            title
            handle
            resourcePublicationOnCurrentPublication {
              publication {
                name
                id
              }
              publishDate
              isPublished
            }
          }
        }g
      }
    }`,
  );

  const data = await response.json();
  console.log(data);

}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin } = await authenticate.admin(request);
  await getProducts(admin.graphql);
  return {};
};

export const action = async ({ request }: ActionFunctionArgs) => {
  return {};
};

export default function Ratings() {
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();


  return (
    <>Ratings Page</>
  );
}