import { Layout, EmptyState } from "@shopify/polaris";

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
        <p>Select products to change their prices.</p>
      </EmptyState>
    </Layout>
  );
}
