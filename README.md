# Shopify Loyalty Shipping Discount Function

This Shopify app provides a shipping discount function that gives a 100% shipping discount to customers with a "VIP" tag.

## How it Works

This app uses a Shopify Function to check the customer's tags at checkout. If the customer has the "VIP" tag, the function applies a 100% discount to the shipping rate.

## Setup and Development Workflow

Here are the steps to set up, develop, and deploy this discount function:

### 1. Set up your app and environment

*   Create a Partner account and a development store.
*   Install Shopify CLI and Node.js (16+).
*   Scaffold your app:
    ```sh
    shopify app create node
    ```

### 2. Generate a Discount Function extension

Use Shopify CLI to generate a discount function:

```sh
shopify app generate extension --template discount --flavor vanilla-js
```

Choose `JavaScript` as the language if prompted.

### 3. Write your function logic

In your extension’s `src/cart_delivery_options_discounts_generate_run.js`, implement the logic to check for the `VIP` tag and apply a 100% shipping discount.

### 4. Define your input query

In `src/cart_delivery_options_discounts_generate_run.graphql`, define the input fields you need (e.g., customer tags, delivery options).

### 5. Test your function locally

Use the Shopify CLI to preview and test your function:

```sh
shopify app dev
```

Install your app on your development store and test at checkout.

### 6. Deploy your function

When ready, deploy your app and extension:

```sh
shopify app deploy
```

### 7. Create the discount in Shopify Admin or via GraphQL

You can create the discount rule in the Shopify Admin UI, or automate it with GraphQL using the `discountAutomaticAppCreate` mutation.

For shipping discounts, set `discountClasses: [SHIPPING]` and `combinesWith: { orderDiscounts: true, productDiscounts: false, shippingDiscounts: false }`.

### 8. Replicate or update rules

To replicate or update your rules, repeat steps 2–7, adjusting your function logic and input query as needed.

## Key Documentation and Resources

*   [Build a discount function](https://shopify.dev/docs/apps/discounts/build-a-function)
*   [Shopify Functions overview](https://shopify.dev/docs/api/functions)
*   [Discounts API reference](https://shopify.dev/docs/api/admin-graphql/latest/mutations/discountAutomaticAppCreate)
*   [Input and output metafields for functions](https://shopify.dev/docs/api/functions/input-output)
*   [discountAutomaticAppCreate mutation](https://shopify.dev/docs/api/admin-graphql/latest/mutations/discountAutomaticAppCreate)
*   [Discount classes and combinations](https://shopify.dev/docs/apps/discounts/classes-and-combinations)
*   [Introduction to Shopify apps](https://shopify.dev/docs/apps/getting-started)
*   [App extensions](https://shopify.dev/docs/apps/build/app-extensions)
*   [Extension only apps](https://shopify.dev/docs/apps/build/app-extensions/build-extension-only-app)
*   [Shopify CLI](https://shopify.dev/docs/apps/tools/cli)