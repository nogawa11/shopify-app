import { useState, useCallback } from "react";
import {
  Layout,
  Banner,
  Card,
  ResourceList,
  TextStyle,
  TextField,
  Stack,
  Thumbnail,
  Button,
} from "@shopify/polaris";
import { Toast, Loading } from "@shopify/app-bridge-react";
import { gql, useQuery, useMutation } from "@apollo/client";

const GET_PRODUCTS_BY_ID = gql`
  query getProducts($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Product {
        title
        handle
        descriptionHtml
        id
        images(first: 1) {
          edges {
            node {
              id
              originalSrc
              altText
            }
          }
        }
        variants(first: 1) {
          edges {
            node {
              price
              id
            }
          }
        }
      }
    }
  }
`;

const UPDATE_PRICE = gql`
  mutation productVariantUpdate($input: ProductVariantInput!) {
    productVariantUpdate(input: $input) {
      product {
        title
      }
      productVariant {
        id
        price
      }
    }
  }
`;

export function ProductsPage({ productIds }) {
  const { loading, error, data } = useQuery(GET_PRODUCTS_BY_ID, {
    variables: { ids: productIds },
  });

  const [mutateFunction] = useMutation(UPDATE_PRICE);
  let promise = new Promise((resolve) => resolve());

  const [toastState, setToastState] = useState(false);
  const toastMarkup = toastState && (
    <Toast
      content="Price has been updated!"
      onDismiss={() => setToastState(false)}
    />
  );

  if (loading) return <Loading />;
  if (error) {
    console.warn(error);
    return (
      <Banner status="critical">There was an issue loading products.</Banner>
    );
  }

  return (
    <>
      {toastMarkup}
      <Layout>
        <Layout.Section>
          <Card>
            <ResourceList
              showHeader
              resourceName={{ singular: "Product", plural: "Products" }}
              items={data.nodes}
              renderItem={(item) => {
                const media = (
                  <Thumbnail
                    source={
                      item.images.edges[0]
                        ? item.images.edges[0].node.originalSrc
                        : ""
                    }
                    alt={
                      item.images.edges[0]
                        ? item.images.edges[0].node.altText
                        : ""
                    }
                  />
                );

                const price = item.variants.edges[0].node.price;
                const [value, setValue] = useState({ price });
                const handleChange = useCallback((newValue) => {
                  setValue(newValue);
                }, []);
                const handleClick = () => {
                  const productVariableInput = {
                    id: item.variants.edges[0].node.id,
                    price: value,
                  };

                  promise
                    .then(() =>
                      mutateFunction({
                        variables: { input: productVariableInput },
                      })
                    )
                    .then(setToastState(true));
                };

                return (
                  <ResourceList.Item
                    id={item.id}
                    media={media}
                    accessibilityLabel={`View details for ${item.title}`}
                  >
                    <Stack>
                      <Stack.Item fill>
                        <h3>
                          <TextStyle variation="strong">{item.title}</TextStyle>
                        </h3>
                      </Stack.Item>
                      <Stack.Item>
                        <TextField
                          label="Set new price (JPY)"
                          name="priceChanger"
                          // placeholder=`¥{price}`
                          type="numeric"
                          onChange={handleChange}
                          value={value ? value : price}
                          connectedRight={
                            <Button primary onClick={handleClick}>
                              Save
                            </Button>
                          }
                        />
                      </Stack.Item>
                    </Stack>
                  </ResourceList.Item>
                );
              }}
            />
          </Card>
        </Layout.Section>
      </Layout>
    </>
  );
}
