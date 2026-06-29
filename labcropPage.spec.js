
const {test, expect} = require('@playwright/test');

test("Apply for the job ", async ({browser,page})=>
{
    await page.goto("https://www.labcorp.com/");
    // get the page title 
    const pageTitle = page.title();
    console.log(await page.title);
    await expect(page).toHaveTitle
    ("Lab Diagnostics, Drug Development, Global Life Sciences | Labcorp");
    await page.locator("//button[@id='onetrust-accept-btn-handler']").click();
    await page.locator("//div[@id='container-09ff0e5b1d']//div[@id='text-a63751913f']").click();
// await page.waitForLoadState('networkidle');
     await page.getByPlaceholder("Search job title or location").pressSequentially("QA");
     await page.locator("//ul[@class='phs-jobs-list']").click();
 //    await page.waitForLoadState('networkidle');
     // verify job tittle 
     const jobTitle = (await page.locator("//h1[@class='job-title']").textContent()).trim();
     expect(jobTitle).toBe("QA Compliance Auditor");
     // verify job location 
     const jobLocation = page.locator("//span[@class='au-target job-location']");
     console.log(await jobLocation.textContent());
     await expect(jobLocation).toContainText(" Singapore, Singapore")
     // verify job ID 

    const jobID = page.locator("//span[@class='au-target jobId']");
    console.log(await jobID.textContent());
    await expect(jobID).toContainText(" 2612055");

    // add more assertions on Responsibilities , Qualifications and experience 
    const Responsibilities = page.getByText
    ("Development and delivery of training to operational groups");
    console.log(await Responsibilities.textContent());
    await expect(Responsibilities).toHaveText
    ("Development and delivery of training to operational groups");
    const Qualifications = page.getByText("Bachelor Degree in Life Science");
    console.log(await Qualifications.textContent());
    await expect(Qualifications).toContainText("Life Science");
    const experience  = page.getByText
    ("4 years or more experience in a GxP regulatory environment");
    console.log(await experience.textContent());
    await expect(experience).toContainText("4");


    // click o apply and verify that job name , ID and location 
    await page.getByRole("button",{name:'Apply Now'}).click();
    
        await page.pause();

     
}
)