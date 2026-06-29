const {test, expect} = require('@playwright/test');

test.only("validate post request customer product and payment infomration", async ({request})=>
{
    // payload 
    const payload = {
      order_id: "12345",
      customer: {
        name: "Jane Smith",
        email: "janesmith@example.com",
        phone: "1-987-654-3210",
        address: {
          street: "456 Oak Street",
          city: "Metropolis",
          state: "NY",
          zipcode: "10001",
          country: "USA"
        }
      },
      items: [
        {
          product_id: "A101",
          name: "Wireless Headphones",
          quantity: 1,
          price: 79.99
        },
        {
          product_id: "B202",
          name: "Smartphone Case",
          quantity: 2,
          price: 15.99
        }
      ],
      payment: {
        method: "credit_card",
        transaction_id: "txn_67890",
        amount: 111.97,
        currency: "USD"
      },
      shipping: {
        method: "standard",
        cost: 5.99,
        estimated_delivery: "2024-11-15"
      },
      order_status: "processing",
      created_at: "2024-11-07T12:00:00Z"
    };

    // post request 
    const response = await request.post
    ("http://echo.free.beeceptor.com/sample-request?author=beeceptor",
        {data: payload,
            headers: {'Content-Type': 'application/json'}
        }
    );

    // status validation 
    await expect(response.status()).toBe(200);
    await expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();
    const body = responseBody.parsedBody;
  //  console.log(JSON.stringify(responseBody, null, 2));
    console.log(body);

    // Validate Customer Information
    expect(body.customer.name).toBe(payload.customer.name);
    expect(body.customer.email).toBe(payload.customer.email);
    expect(body.customer.phone).toBe(payload.customer.phone);

    expect(body.customer.address.street).toBe(payload.customer.address.street);
    expect(body.customer.address.city).toBe(payload.customer.address.city);
    expect(body.customer.address.state).toBe(payload.customer.address.state);
    expect(body.customer.address.zipcode).toBe(payload.customer.address.zipcode);
    expect(body.customer.address.country).toBe(payload.customer.address.country);

    // Validate Product Information
    expect(body.items).toHaveLength(2);

    expect(body.items[0].product_id).toBe("A101");
    expect(body.items[0].name).toBe("Wireless Headphones");
    expect(body.items[0].quantity).toBe(1);
    expect(body.items[0].price).toBe(79.99);

    expect(body.items[1].product_id).toBe("B202");
    expect(body.items[1].name).toBe("Smartphone Case");
    expect(body.items[1].quantity).toBe(2);
    expect(body.items[1].price).toBe(15.99);

    // Validate Payment Information
    expect(body.payment.method).toBe("credit_card");
    expect(body.payment.transaction_id).toBe("txn_67890");
    expect(body.payment.amount).toBe(111.97);
    expect(body.payment.currency).toBe("USD");

    console.log("Customer validation successful");
    console.log("Product validation successful");
    console.log("Payment validation successful");


}
)