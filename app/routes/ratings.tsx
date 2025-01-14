import { useState } from "react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";
import { GraphQLClient, GraphQLQueryOptions } from "node_modules/@shopify/shopify-app-remix/dist/ts/server/clients/types";
import type { AllOperations, AdminOperations } from '@shopify/admin-api-client';
import { authenticate } from "../shopify.server";
import { Text } from "@shopify/polaris";
export const links = () => [{ rel: "stylesheet", href: polarisStyles }];


async function getProducts(graphql: GraphQLClient<AdminOperations>) {

  const response = await graphql(
    `query {
      products(first: 2, reverse: true) {
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
        }
      }
    }`,
  );

  console.log("--------TOP---------")
  const { data: { products: { edges } } } = await response.json();
  console.log(edges);
  console.log("--------BOTTOM---------");
}

async function getProductCount(graphql: GraphQLClient<AdminOperations>) {

  const response = await graphql(
    `query {
       productsCount {
         count
        }
    }`,
  );

  console.log("--------TOP---------")
  const { data } = await response.json();
  console.log(data);
  console.log("--------BOTTOM---------");
}




export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin } = await authenticate.admin(request);
  await getProducts(admin.graphql);
  await getProductCount(admin.graphql);
  return {};
};

export const action = async ({ request }: ActionFunctionArgs) => {
  return {};
};

export default function Ratings() {
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();


  return (
    <>
      <div className="bg-blue-300 p-5 mt-[25px] w-[95%] mx-auto rounded-md">
        <Text variant="heading2xl" as="h2">
          Ratings
        </Text>
      </div>
    
    </>
  );
}