import "dotenv/config";
import axios from "axios";

const headers = {
  "X-Shopify-Access-Token": process.env.X_SHOPIFY_ACCESS_TOKEN,
};

const makeSuffix = () => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const randomArray = [" "];
  for (let i = 0; i < 3; i++) {
    let randomNum = Math.floor(Math.random() * alphabet.length);
    randomArray.push(alphabet[randomNum]);
  }
  return randomArray.join("").toUpperCase();
};

const hasSuffix = (title) => {
  const re = / [A-Z][A-Z][A-Z]/;
  return re.test(title);
};

axios
  .get(`https://${process.env.SHOP}/admin/api/2022-04/products.json`, {
    headers: headers,
  })
  .then((response) => {
    const data = response.data.products;
    data.forEach((product) => {
      const productId = product.variants[0].product_id;
      const body = {
        product: {
          title: `${
            hasSuffix(product.title)
              ? product.title.split(" ").slice(0, -1).join(" ") + makeSuffix()
              : product.title + makeSuffix()
          }`,
        },
      };
      axios
        .put(
          `https://${process.env.SHOP}/admin/api/2022-04/products/${productId}.json`,
          body,
          { headers }
        )
        .then((response) => console.log(response));
    });
  });
