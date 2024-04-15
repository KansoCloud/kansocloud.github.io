---
    layout: post
    title:  "Test Driven Development in DevSecOps"
    date:   2024-04-15 10:38:50 +0530
    categories: Test Driven Development in DevSecOps
    picture: "../images/TDD/test-driven-development-TDD.webp"
    writer: "Tyler Barto"
---

### Introduction

Test Driven Development (TDD) is not a new concept. The idea has been around for the better part of 30 years, but its adoption in the DevSecOps world has not been as prolific as in other development spaces. There are serious merits to the approach, particularly when coupled with agile methodology and iterative improvement in general.

<!-- img src will be given here -->

![Test driven development](../images/TDD/test-driven-development-TDD.webp)

#### Why use TDD?

Consider this typical scenario: A user story is created for an engineer to develop a new feature. The engineer develops the new feature, writes a simple unit test to validate the changes they made, and commits it. The test passes, but the feature addition does not quite match the user expectations. Why is that?

When tests are written to cover a unit of code that was just developed, an engineer’s inclination is to write a test designed to pass with a bias toward the notion that they have already completed the task sufficiently. We end up writing a test making an assumption on “how it should run” not based on “how it could run”. This assumption is usually not an issue, but occasionally, that can deviate from the intention of the actual story. There are also cases where scrum teams are just not used to writing tests, relying instead on manual validation, given acceptance criteria. That practice tends not to pass the scrutiny of most release practices, and what better way to get in the habit of writing your tests, than to write them before doing anything else?

#### How does TDD help?

With TDD, before any code changes or additions are made, a unit test is written, designed around the constraints of the user story with the expectation that it will fail if run against the code’s current state. In fact, this test should be run against the existing code to prove that it fails. Who knows, maybe it passes, in which case the engineer does have to worry about making any further changes! Either way, the test should be the baseline from which the actual code change is made.

Once the initial test successfully demonstrates failure, coding can begin. This initial effort should be no more than is required to produce something resulting in the test passing. Messy code with hardcoded values is okay at this point, the goal is just to pass the test. Once the test passes, then the code can be cleaned, linted, and sanitized to improve code quality, with continued runs of the initial tests to prevent regression. It may seem odd or even counterintuitive to be so laser-focused on code passing a test to initially sacrifice code-quality, with linting and cleaning coming through iteration, but this ensures that the process is centered on the function as defined in the user story.

After enough iterations to satisfy code cleanliness standards, vulnerability management, and the like, the work should be done. If any additional functionality is required for acceptance, but the test passes, the engineer should write another test and begin again. Ideally, a user story should be written specifically enough that this is not a problem, but if not used to the practice, the author of the story may have left some expectations not explicitly defined.

#### The Bottomline

The objective of TDD is to prove that quality is engineered into development practices right from the beginning and it indirectly prevents scope creep (which causes unforeseen issues down the road). The outcome of TDD is a trail of evidence proving that a release includes tested changes and changes that reflect the true intent of the original story.

##### References:

[TDD](https://marsner.com/blog/why-test-driven-development-tdd/)

[TDD vs BDD](https://katalon.com/resources-center/blog/tdd-vs-bdd)
