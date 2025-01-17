import { useEffect, useState } from "react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, useActionData, useLoaderData, useSubmit } from "@remix-run/react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";
import { GraphQLClient, GraphQLQueryOptions } from "node_modules/@shopify/shopify-app-remix/dist/ts/server/clients/types";
import type { AllOperations, AdminOperations } from '@shopify/admin-api-client';
import { authenticate } from "../shopify.server";
import {
  AppProvider as PolarisAppProvider,
  Text,
  Card,
  BlockStack,
  FormLayout,
  TextField,
  Button,
  Grid,
  List
} from "@shopify/polaris";
export const links = () => [{ rel: "stylesheet", href: polarisStyles }];
import translations from '@shopify/polaris/locales/en.json';
import db from "app/db.server";


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


async function getProductSavedSearches(graphql: GraphQLClient<AdminOperations>, first: number) {

  const response = await graphql(
    `query {
      productSavedSearches(first:${first}) {
        nodes {
          id
          legacyResourceId
          name
          filters {
            key
            value
          }
          query
          searchTerms
        }
      }
    },`
  );

  console.log("--------TOP---------")
  const { data } = await response.json();
  console.log(data);
  console.log("--------BOTTOM---------");
}

async function getUsers() {
  const users = await db.user.findMany();
  console.log(users);
  return users;
}


export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin } = await authenticate.admin(request);
  await getProducts(admin.graphql);
  await getProductCount(admin.graphql);
  await getProductSavedSearches(admin.graphql, 10);
  const users = await getUsers();
  return { users: users };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  console.log(formData);
  return {};
};



export default function Ratings() {
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const [review, setReview] = useState<string>("");
  const [users, setUsers] = useState(loaderData.users);

  useEffect(() => { console.log(users) }, [users]);

  return (

    <PolarisAppProvider i18n={translations}>
      <div className="bg-blue-300 p-5 mt-[25px] w-[95%] mx-auto rounded-md">
        <Text variant="heading2xl" as="h2">
          Ratings
        </Text>
        <div className="mt-[20px]"></div>
        <Grid>
          <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
            <Card roundedAbove="sm">
              <BlockStack gap="200">
                <Text variant="heading2xl" as="h3">
                  Leave us a review
                </Text>
                <Form method="post">
                  <FormLayout>
                    <TextField
                      label="Review"
                      name="review"
                      multiline={4}
                      autoComplete="off"
                      value={review}
                      onChange={setReview}
                    />
                    <Button variant="primary" submit>Submit</Button>
                  </FormLayout>
                </Form>
              </BlockStack>
            </Card>

          </Grid.Cell>
          <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>

            <Card roundedAbove="sm">

              <div className="text-center">
                <Text variant="heading2xl" as="h3">User List</Text>
              </div>
              <div className="max-h-[500px] overflow-y-auto">
                <List type="number">
                  {
                    users.length > 0 ? (
                      users.map(user => (
                        <List.Item key={user.id}>{user.username}</List.Item>
                      ))
                    ) : null
                  }
                </List>
              </div>

            </Card>

          </Grid.Cell>

        </Grid>

      </div>
    </PolarisAppProvider>
  );
}