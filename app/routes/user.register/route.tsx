import { useState } from "react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import {
  AppProvider as PolarisAppProvider,
  Button,
  Card,
  FormLayout,
  Page,
  Text,
  TextField,
} from "@shopify/polaris";
import polarisTranslations from "@shopify/polaris/locales/en.json";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";
import prisma from "app/db.server";

export const links = () => [{ rel: "stylesheet", href: polarisStyles }];


export async function action({
  request,
}: ActionFunctionArgs) {
  const body = await request.formData();
  const user = await prisma.user.create({
    data: { username: body.get("username") as string, password: body.get("password") as string }
  });
  return Response.json({ success: true, message: "registered was successful" });
}


export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");



  return (
    <PolarisAppProvider i18n={polarisTranslations}>
      <Page>
        <Card>
          <Form method="post">
            <FormLayout>
              <Text variant="headingMd" as="h2">
                Register
              </Text>
              <TextField
                type="text"
                name="username"
                label="Username"
                helpText="User123"
                value={username}
                onChange={setUsername}
                autoComplete="on"
              />
              <TextField
                type="password"
                name="password"
                label="Password"
                helpText="Password123"
                value={password}
                onChange={setPassword}
                autoComplete="off"
              />
              <Button submit>Register</Button>
            </FormLayout>
          </Form>
        </Card>
      </Page>
    </PolarisAppProvider>
  );
}
