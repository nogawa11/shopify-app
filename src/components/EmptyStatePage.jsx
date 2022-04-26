import { Layout, EmptyState, Button } from "@shopify/polaris";
import { Toast, useAppBridge } from "@shopify/app-bridge-react";
import { useState } from "react";

const img = "https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg";

export function EmptyStatePage({ setOpen }) {
  return (
    <Layout>
      <EmptyState
        heading="Change prices in bulk"
        action={{
          content: "Select products",
          onAction: () => setOpen(true),
        }}
        image={img}
        imageContained
      >
        <p>Select products to change their price.</p>
      </EmptyState>
    </Layout>
  );
}
