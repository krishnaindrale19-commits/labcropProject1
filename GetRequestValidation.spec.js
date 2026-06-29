const {test, expect} = require('@playwright/test');

test("Get request validate path, IP and headsers ",async ({ request })=>
{
    // send get rquest 
    const response = await request.get
    ("https://echo.free.beeceptor.com/sample-request?author=beeceptor");
    // status code validation 
    console.log(response.status());
    await expect(response.status()).toBe(200);
    await expect(response.ok()).toBeTruthy();

    // get response body 
    const responseBody = await response.json();
    console.log(await responseBody);

    // validate the path 
    expect(responseBody).toHaveProperty('path');
    expect(responseBody.path).toContain('sample-request?');

    // validate IP 
    expect(responseBody).toHaveProperty('ip');
    expect(responseBody.ip).not.toBeNull();
    expect(responseBody.ip).not.toBe('');

    // validate the headers 
    expect(responseBody).toHaveProperty('headers');
    const Allheaders = responseBody.headers;

    //validate all the headers present or not 

    for (const[key, value]of Object.entries(Allheaders))
    {
        expect(key).toBeTruthy();
        expect(value).toBeTruthy();
    }


})