import { useEffect } from "react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useFetcher, useNavigate } from "@remix-run/react";
import {
  Page,
  Layout,
  Text,
  Card,
  Button,
  BlockStack,
  Box,
  List,
  Link,
  InlineStack,
} from "@shopify/polaris";
import { TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);

  return null;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { admin } = await authenticate.admin(request);
  return Response.json({});
};

export default function Index() {
  const fetcher = useFetcher<typeof action>();
  const navigate = useNavigate();
 
  return (
    <Page>
      <TitleBar title="Ratings App"></TitleBar>
      <Button onClick={() => {  navigate("/auth/login")  }}>Login</Button>
      <Button onClick={() => {  navigate("/user/register")  }}>Register</Button>
    </Page>
  );
}
