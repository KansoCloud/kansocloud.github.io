---
layout: post
title: "Adopting Behavior Driven Development (BDD) Framework"
date: 2023-12-27 11:00:00 +0530
categories: Adopting Behavior Driven Development (BDD) Framework
picture: "../images/ABDD/BDD2.png"
writer: "Apeksha Purohit, Shalini Purohit"
---

## **Introduction**

<strong>BDD</strong> Framework is a software development approach that allows testers, developers, and businesses to create specifications for a feature in simple text language (English) and link them directly to the code supporting the specific functionality.

## **Why Use BDD?**

BDD is an approach to write specifications and not just tests. Using the BDD framework reduces rework and increases reusability of code. In the traditional testing approach, usage of TDD and Unit testing is quite common. It tends to be monotonous to a certain extent since the same code is created multiple times to cover the same functionality. BDD Framework allows the tester to reuse test cases and step definitions multiple times. When compared to the traditional approach, BDD facilitates the creation of fewer tests thereby saving effort and time.

## **How does BDD Work?**

In the BDD framework, feature files are initially created to describe the main feature or functionality for a particular scenario, and test cases are then invoked from inside step definitions. Discussed below is a simple example of login functionality using BDD.

<strong>Feature</strong>: Login
<br>
As a user,
<br>
I want to log in to my account, to access my profile and settings features.

<strong>Scenario 1</strong>: As a user, I want to try to log in with valid credentials provided <br>
Given I am on the login page <br>
When I enter valid credentials and I click on the login button <br>
Then I should be logged in to my account <br>

<strong>Scenario 2</strong>: As a user, I want to try to login with invalid credentials <br>
\textcolor{red}{Given I} am on the login page <br>
When I enter invalid credentials and I click on the login button <br>
Then I should see an error message <br>

<!-- Two images to be presented here -->
<div style="display: flex; align-items: center; justify-content: center;">
    <div>
        <img src="../images/ABDD/BDD1.png" alt="BDD1.png">
    </div>
    <div>
        <img src="../images/ABDD/BDD2.png" alt="BDD2.png">
    </div>
</div>

<strong>BDD Best Practices</strong>

<ul>
    <li>
        Follow the Gherkin rules (Given/When/Then/And)
    </li>
    <li>
        Use a common vocabulary
    </li>
    <li>
        Maintain a one-to-one mapping
    </li>
    <li>
        Use Background Wisely
    </li>
    <li>
        Reuse Step Definitions
    </li>
    <li>
        Use Tags
    </li>
    <li>
        Write in a Declarative Way
    </li>
    <li>
        Use data tables and examples
    </li>
    <li>
        Multiple inputs can be tested for scenarios at once by utilizing data tables and examples in the scenario. Below is an example of a feature file that explains the use of examples:
    </li>
</ul>

<br>

<strong>Scenario Outline</strong>: Check login functionality
<br>
Given I am on the login page
When I enter (username) and (password)
Then I should be logged in successfully
Examples:

<br>

| Username | Password |
| :------: | :------: |
|   abc    |  123456  |
|   xyz    | learning |

## **BDD Advantages**

<ul>
    <li>
        Facilitates improved collaboration and communication.
    </li>
    <li>
        Enhances requirement understanding
    </li>
    <li>
        Enables early defect detection
    </li>
    <li>
        Potentially increases test coverage
    </li>
    <li>
        Reduces jargon use and provides a clearer approach
    </li>
</ul>

<!-- Single image needs to be presented here -->
<div style="display: flex; justify-content: center; align-items: center;">
    <img src="../images/ABDD/ABDD3.png" alt="">
</div>

## **Conclusion**

BDD is a software development process that encourages better collaboration among developers, quality assurance experts, and user groups in a software development project. It encourages teams to use conversation and concrete examples to formalize a shared understanding of how the application should behave. It is always recommended to start either with development or testing using BDD, as it gives teams a platform to work independently with different technologies. It covers user stories and code reusability with parameterization in Feature File. It uses an outside-to-inside approach. It helps to think from a testing perspective to a behavior perspective.

## **References**

[katalon-studio](https://docs.katalon.com/docs/katalon-studio/manage-test-artifacts/work-with-bdd-feature-files-in-katalon-studio)

[cucumber.io](https://cucumber.io/)

[bdd-framework](https://www.softwaretestinghelp.com/bdd-framework/)
