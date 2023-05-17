---
layout: post_without_share
title:  "Test Automation for Salesforce CRM  using Robot Framework & Playwright"
date:   2023-05-17 10:37:50 +0530
categories: Test Automation
picture: "../images/blog_9/Test_Automation_salesforce.png"
writer: "Deval Ganatra"
---



## **Introduction**
Functional Test Automation is the process of testing software to ensure it meets the product functional requirements with minimal human intervention. In other words, it’s a test to double-check that the software performs exactly the way it is expected to (from a user perspective). This process typically tests for bugs, defects, and any other issues that can arise during the course of product development.



## **Problem Statement**
Even though Test Automation as a practice as well as automation platforms have been around for a while, their adoption has lagged behind for testing CRM platforms. Recently, one of our customers approached us with a request to implement UI Test Automation for their Salesforce implementation. Their primary objective was to automate most of their regression testing so that their internal testing team could move rapidly with a drastically shortened feedback loop for any newly introduced features.

Implementing a User Interface (UI) Test Automation for a CRM platform comes with its own set of challenges such as:
1. What is the right UI test automation tool for a customizable CRM platform such as Salesforce?
2. Can the automation handle large-scale UI changes between releases and still remain effective?
3. What is the right testing approach given the customer’s software development lifecycle?
4. Is the test automation tool flexible enough to support future software changes with minimal effort i.e. how maintainable are the test cases/scenarios? This is especially important given the constantly evolving Salesforce ecosystem.

## **Test Automation Framework - Robot**

[Robot Framework](), is an open-source Test Automation framework that serves as a bridge between browser automation libraries (such as Playwright and/or Selenium) and provides a unified interface for executing test cases. With Robot Framework, testers and developers can leverage the capabilities of Playwright or Selenium without the need to worry about the underlying complexities. Test cases can be written in a human-readable format, and specific keywords for Playwright or Selenium can be used to interact with browsers and perform actions on web elements.

## **Browser Automation Library -  Playwright v/s Selenium**
When it comes to Salesforce based solutions, the UI is highly dynamic by design and customers don't have control over the underlying infrastructure. So, it was especially important for the Test Automation tool to be able to handle the dynamic components used by Salesforce effectively and efficiently. We had two options in this regard:
[Playwright](https://playwright.dev/) is a relatively new open source tool for browser automation, with its first version released by Microsoft in 2020. It was built by the team behind [Puppeteer](https://developer.chrome.com/docs/puppeteer/), which is a headless testing framework for Chrome/Chromium. Playwright goes beyond Puppeteer and provides support for multiple browsers, among other changes. Playwright is designed for end-to-end automated testing of web apps. It’s cross-platform, cross-browser and cross-language, and includes helpful features like auto-waiting. It is specifically engineered for the modern web and generally runs very quickly, even for complex testing projects.
[Selenium](https://www.selenium.dev/) is a long-running open source tool for browser automation. It was originally conceived in 2004 by [Jason Huggins](https://applitools.com/blog/jason-huggins/), and has been actively developed ever since. Selenium is a widely-used tool with a huge community of users, and the Selenium and the framework is capable of automating and controlling web browsers and interacting with UI elements, and it’s the most popular framework in the industry today.

Bottomline, Playwright library covers almost all use cases offered by Selenium Library. With features such as automatic sleeps, browser/context re-use and improved underlying technology, Playwright automations are often faster to run
After a thorough analysis based on the specific customer use cases, Playwright was selected as the tool of choice based on the following criteria:
* **Dynamic Wait**:  Playwright supports an “intelligent wait time” feature that handles different page load times and dynamic components efficiently. Since Salesforce is filled with dynamic components (almost every element is generated dynamically) this feature turned out to be an essential part of our testing process.
* **Screenshot Evidences**: Playwright provides an out-of-the-box capability to save screenshots of test executions on-demand, which was a requirement for our customer.
* **Multi-Browser Support**: Playwright supports multiple browsers making it easy to to validate the developed test automation scenarios on different browser platforms (to mimic real world usage of the CRM software). 
* **Shadow Element Feature**: This feature of Playwright made our life easier as it could efficiently handle the dynamic components created by Salesforce applications.
* **Browser Contexts and Authentication**: Playwright allows for setting up and managing multiple browser contexts, which enables clean handling of authentication challenges.
* **Seamless Support for Python Extensions**: Playwright provides seamless support for Python extensions, enabling us to directly integrate Python functions as “keywords” within the Robot Framework.
* **Built-in Debugger**: Playwright comes with a built-in debugger that assists with identification and resolution of any issues coming out of the testing process.

## **Additional Technical Challenges**
* **Shadow Elements**: Salesforce's UI is highly dynamic and uses nested shadow elements, which makes it difficult to control how UI elements are rendered on a webpage. After some research and experimentation, it was determined that Playwright was able to handle iFrames and Shadow elements comprehensively.
* **Combining API and UI**: Some use cases necessitated the use of APIs to  verify UI elements. To address this need, we implemented a combination of both UI and API testing. The solution involved retrieving the API response from the backend and verifying it with the response from the UI. This approach allowed for covering additional test scenarios while minimizing test redundancy.
* **Test Framework Setup**: The initial test framework setup took some time as there was a need to create reusable components for things like logging, screen capturing, dynamic value selection to name a few. Bootstrap functions (performing repetitive actions) were created for each test suite eventually reducing new code needed to create test cases.

## **Conclusion**
In general, Test Automation of dynamic element based UI is a challenge. The capabilities offered by the combination of Robot Framework and Playwright library enabled the KansoCloud team to develop a comprehensive test automation solution using open source technologies to solve the specific needs of our customer. For the Test Automation process to be effective in an organization, it should always be an integral part of the overall software development (CI/CD) lifecycle.

## **References**
* [How Does playwright work](https://muuktest.com/blog/how-does-playwright-work/)
* [Playwright vs Selenium](https://applitools.com/blog/playwright-vs-selenium/)










