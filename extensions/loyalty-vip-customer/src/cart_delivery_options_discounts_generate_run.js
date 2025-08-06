/**
 * @typedef {import("../generated/api").Input} RunInput
 * @typedef {import("../generated/api").CartDeliveryOptionsDiscountsGenerateRunResult} CartDeliveryOptionsDiscountsGenerateRunResult
 */

/**
 * @param {RunInput} input
 * @returns {CartDeliveryOptionsDiscountsGenerateRunResult}
 */
export function cartDeliveryOptionsDiscountsGenerateRun(input) {
  const VIP_TAG = "swell_vip_chief ranger";
  const SHIPPING_NAME = "Standard Shipping";

  // Check if customer has the VIP tag
  const hasVipTag = input.cart?.buyerIdentity?.customer?.hasTags?.some(
    tagObj => tagObj.tag === VIP_TAG && tagObj.hasTag
  );

  console.log("Customer has VIP tag:", hasVipTag);
  console.log("Cart:", input.cart);

  if (!hasVipTag) {
    return { operations: [] };
  }

  const operations = [];

  for (const group of input.cart.deliveryGroups) {
    for (const option of group.deliveryOptions) {
      if (option.title && option.title.includes(SHIPPING_NAME)) {
        operations.push({
          deliveryDiscountsAdd: {
            candidates: [
              {
                message: "Free Shipping",
                targets: [
                  {
                    deliveryOption: {
                      handle: option.handle,
                    },
                  },
                ],
                value: {
                  percentage: {
                    value: 100,
                  },
                },
              },
            ],
            selectionStrategy: "ALL",
          },
        });
      }
    }
  }

  return { operations };
}