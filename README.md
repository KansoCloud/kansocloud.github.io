## Supporting Continuous Delivery with Quality for Mobile Apps
Updated: Oct 3, 2021
# Introduction
Building, testing, and delivering mobile applications typically involves multiple steps that can be long and complicated. When build, test, and deliver steps are performed manually in such cases, the process can become arduous and error-prone. In addition, the feedback loop to developers takes longer to compete slowing down the overall development process. The key to delivering accelerated value to end users is by adopting the concepts of Continuous Integration (CI), Continuous Delivery (CD), and Continuous Testing (CT) for mobile applications similar to how CI-CD has been successfully adopted for server-based applications.
# Mobile App Release Lifecycle
CI-CD for mobile apps comes with its own challenges: 
* builds have to be distributed for testing and alpha/beta users
* timing of each release is not fully under the control of the development team;  for instance - an iOS application can only be released when it successfully passed Apple's App Store validation.

A typical mobile app release lifecycle involves the following steps:

![Mobile app release lifecycle steps](/images/img1.png)

To simplify the build, test, and release steps, an integrated set of tools that can build, test and deliver both Android and iOS apps is needed to simplify the end-to-end release process. The following diagram shows the build, test, and release flow using an integrated set of tools for end-to-end delivery of the app.

![Flow diagram](/images/img2.webp)

### Build Phase
Mobile build phase includes two modes: debug/profile and release:
* Debug/Profile builds are generally created by developers during development and testing on their local machines. 
* Once the development is complete, the app release build lifecycle gets triggered and the release build needs to be shared at each phase of the lifecycle environment (Internal, Alpha, Beta/Prod)
* Creating release builds by developers hinder their ability to focus on development and have to switch context to create new builds for each environment (Internal, Alpha, Beta/Prod) 
* Build automation with a platform such as Fastlane allows for orchestration of the entire release lifecycle including code signing for iOS
* Code signing identities and profiles are stored in a private, encrypted git repository to securely sync them across machines and CI environments
* This also enables separate production and development code signing identities

### Publish Phase
The automated Publish phase makes the artifacts created by the build process available for internal testing
* Builds can be published to:
  - Distribution stores such as Firebase, AppCenter, TestFairy, etc. for "Manual Testing"
  - Testing platforms and Device Farms such as TestProject.io, BrowserStack, AWS Device Farm, etc for "Automated Testing"
* When a new IOS Device or Android needs to be added for internal testing, the automated process updates the code signing profiles and publishes a new version of the app
* Release notes are generated automatically from the git commits for every published event

### Release Phase
Release steps are part of every phase of the mobile app lifecycle and include submission of the app, metadata, screenshot, etc.
* Release automation utilizes <a href="https://fastlane.tools/" target="_blank">Fastlane</a> to manage all the app’s metadata including screenshots. 
* The release for each lifecycle phase can be as below: 
  - Alpha versions are published to PlayStore & AppStore to a limited audience
  - Beta versions are published to PlayStore & AppStore and then promoted to Production available for all users

## Mobile App Development with “Shift-Left” Testing
### Why adopt “Shift-Left” Testing?
* Reduces overall software development costs by using “Continuous/Automated Testing”
* Increases delivery speed & decrease time to market by enabling a “Constant Feedback Loop”
* Minimizes unexpected errors and improve satisfaction by constantly “Reviewing Changes & Progress.

The key to incorporate quality into mobile software is by ensuring that accelerated feedback is provided on the impact of any and changes introduced. The need of the hour is to adopt the concept of "Continuous Testing" (CT) to guarantee software quality in every build cycle. Hence, integrating automated frameworks with flexible pipelines and us the of "No-Code/Low-Code" platforms is the way to move forward.  Using such platforms enables the creation and curation of efficient and reliable automated test suites which can be run as part of the Continuous Delivery (CD) pipelines thereby facilitating faster  CT adoption. Open so Open-source tools such as TestProject offer a reliable platform to develop such acceptance tests in an agile environment rapidly and a way to operationalize such tests to facilitate continuous feedback to the developers.
# Why use Mobile Device Farms such as BrowserStack or SauceLabs?
There is a need for cloud-based mobile testing platforms to execute tests in a continuous manner using delivery pipelines. These platforms depend on mobile device farms supporting real mobile devices to facilitate automated testing to closely simulate the experience of real users at scale.

![Cloud-based mobile testing diagram](/images/img3.png)
# Conclusion
Adopting Continuous Delivery with Continuous Testing practices for mobile applications is technically feasible and can be successfully implemented with planning and deliberate selection of tools and processes. It also requires a cultural change and organizational commitment to the philosophies of "Shift-Left & Continuous Testing" to really embrace "Test Driven Development" principles. KansoCloud’s DevTestOps methodology maximizes the success of building and adopting Continuous Delivery for mobile applications by making it an integral part of the product development lifecycle for its customers. Implemented in the right way, adopting these best practices will eventually result in the following tangible benefits:
* Reduce total software development effort and cost.
* Support an iterative and compressed feedback loop between developers, testers, and end-users as part of an integrated product development lifecycle.
* Integrate automated testing with a software version control system so that different steps within software build, deployment, and testing phases are triggered automatically.
