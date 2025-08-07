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

  if (!input.cart?.buyerIdentity?.customer) {
    console.log("No customer found");
    return { operations: [] };
  }

  const hasTags = input.cart.buyerIdentity.customer.hasTags;
  if (!Array.isArray(hasTags)) {
    console.log("No tags found or tags is not an array");
    return { operations: [] };
  }

  const hasVipTag = hasTags.some(
    tagObj => tagObj?.tag === VIP_TAG && tagObj?.hasTag === true
  );

  console.log("Customer has VIP tag:", hasVipTag);

  if (!hasVipTag) {
    return { operations: [] };
  }

  if (!Array.isArray(input.cart.deliveryGroups)) {
    console.log("No delivery groups found");
    return { operations: [] };
  }

  const operations = [];

  for (const group of input.cart.deliveryGroups) {
    if (!Array.isArray(group.deliveryOptions)) continue;
    
    for (const option of group.deliveryOptions) {
      if (option?.title && 
          typeof option.title === 'string' && 
          option.title.includes(SHIPPING_NAME) &&
          option.handle) {
        
        operations.push({
          deliveryDiscountsAdd: {
            candidates: [
              {
                message: "Free Shipping VIP",
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