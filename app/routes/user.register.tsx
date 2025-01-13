import { useEffect, useState } from "react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, useActionData, useLoaderData, useNavigate } from "@remix-run/react";
import {
  AppProvider as PolarisAppProvider,
  Button,
  Card,
  FormLayout,
  Page,
  Text,
  TextField,
  Banner,
} from "@shopify/polaris";
import polarisTranslations from "@shopify/polaris/locales/en.json";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";
import prisma from "app/db.server";
import bcrypt from "bcrypt";

export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

export async function action({
  request,
}: ActionFunctionArgs) {
  const body = await request.formData();

  try {
    let hashedPassword = await bcrypt.hash(body.get("password") as string, 10);
    let userExists = await prisma.user.findFirst({ where: { username: body.get("username") as string } });

    if (userExists) {
      return Response.json({ success: false, message: "User exists, try a different username." }, { status: 200 });
    }

    const user = await prisma.user.create({
      data: {
        username: body.get("username") as string,
        password: hashedPassword as string
      }
    });
    return Response.json({ success: true, message: "Registration was successful" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json({ success: false, message: "Registation failed, please try again" }, { status: 500 });
  }

}


export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState("");
  const actionData = useActionData<typeof action>();
  const navigate = useNavigate();

  useEffect(() => {
    setErr("");
    setSuccess(false);
    if (typeof actionData === 'object' && 'success' in actionData && actionData.success) {
      setSuccess(true);
    }
    if (typeof actionData === 'object' && 'success' in actionData && !actionData.success) {
      setErr(actionData.message);
    }
  }, [actionData])



  return (
    <PolarisAppProvider i18n={polarisTranslations}>
      <Page>
        <Card>
          <Form method="post">
            <FormLayout>
              <Text as="p" fontWeight="bold">
                Register
              </Text>
              <TextField
                type="text"
                name="username"
                label="Username"
                placeholder="User123"
                value={username}
                onChange={setUsername}
                autoComplete="on"
              />
              <TextField
                type="password"
                name="password"
                label="Password"
                placeholder="Password123"
                value={password}
                onChange={setPassword}
                autoComplete="off"
              />
              <div style={{ display: "flex", justifyContent: "flex-start", gap: "10px" }}>
                <Button onClick={() => {navigate("/app")}}>Go Back</Button>
                <Button submit>Register</Button>
              </div>

            </FormLayout>
          </Form>
          <div style={{ marginTop: '10px', marginBottom: '10px' }}></div>
          {
            success ? (
              <Banner title="Registration Successful" onDismiss={() => { setSuccess(false); }} tone="success">
                <p>You have successfully registered a user account.</p>
              </Banner>
            ) : null
          }
          {
            err !== "" ? (
              <Banner title="Error" onDismiss={() => { setErr(""); }} tone="warning">
                <p>{err}</p>
              </Banner>
            ) : null
          }

        </Card>
      </Page>
    </PolarisAppProvider>
  );
}
