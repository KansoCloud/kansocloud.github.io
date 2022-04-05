---
    layout: post
    title:  "Application Security in Cloud and DevSecOps Best Practices"
    date:   2022-04-05 12:38:50 +0530
    categories: Test Automation
    picture: "../images/applicationSecurity(blog2)/appSecurity-4.png"
    writer: "Pramod Veerannagari"
---
## **Introduction**
Building a secure and compliant application on a public cloud platform necessitates the implementation of numerous controls to be applied during the build, test, deploy and post-deployment phases.

<img src="/images/applicationSecurity(blog2)/appSecurity-1.png" width="100%" alt="Flow diagram" style= "padding-top: 30px">

* Application development teams struggle to understand the overarching  DevSecOps toolchain and how exactly to introduce security controls into their current SDLC process and their  automated delivery pipelines
* Lack of infrastructure and application scanning capabilities can allow attackers to find weaknesses and compromise the overall system
* Infrastructure misconfigurations have the potential to publicly expose sensitive data and systems

There has been a recent trend to shift testing to the left. In fact, it is equally critical to **“Shift Security to the Left”** using DevOps tooling to help organizations prevent Security issues down the road.

## **What does it mean to “Shift Security to the Left”**
**“Shift Security to the Left”** means moving security to the earliest possible point in the development process. In our opinion, every software development organization can “shift security to the left”  by embracing the following core guiding principles:
* Utilize a Secure Infrastructure Layer
* Integrate Security right from the Development phase
* Embrace Pre-Commit & Commit Security Practices
* Implement Continuous Delivery & Deployment Security Practices

#### **Utilize a Secure “Cloud Infrastructure Layer”**

![Mobile app release lifecycle steps](/images/applicationSecurity(blog2)/appSecurity-2.png)

* Implement infrastructure controls for a fully secure and compliant infrastructure based on required standards. This will require navigating through cloud providers’ native solutions, open-source software and any third-party ISV tools
* Implement automated configuration management  using Infrastructure as Code(IaC) with appropriate security controls
* Automate compliance and security “Policy Scanning” for ensuring continuous compliance
* Build automated security testing into application CI-CD pipelines to avoid release of vulnerable code.
* Secure Container environments (docker and kubernetes) using image scanning tools to ensure the final images are not vulnerable.
* Build continuous monitoring feedback loop from production to engineering
* Infrastructure and container environments security analysis can be automated when integrated with the source code repositories or CI-CD pipelines:
    - <a href="https://snyk.io/product/infrastructure-as-code-security/" target="_blank">Infrastructure as Code Security using Snyk</a>
    - <a href="https://snyk.io/product/container-vulnerability-management/" target="_blank">Container vulnerability management using Snyk</a>

#### **Integrate Security right from the Development phase**

<img src="/images/applicationSecurity(blog2)/appSecurity-3.png" width="100%" alt="Flow diagram" style= "padding-top: 30px">

* Utilize software development best practices to minimize vulnerabilities in applications
* Follow best practices on application logging with a special emphasis on logging security related items
* Enforce input validation of all data to ensure only properly formatted data is entering the system/API to avoid malfunction of downstream systems
* Enable solid Authentication and Authorization to enforce the concept of “Least Privilege”
* Isolate any backend data used by the application as much as possible to prevent direct access to undesirable users
* Utilize well tested open source libraries or utilities to implement phases like Authentication, Authorization and Logging rather than reinventing the wheel
* Use of feature toggles to securely experiment new features without breaking any of the existing functionalities
* Utilize encryption while transferring sensitive data or when storing it, so that only the authorized users can access it
* Dependency security testing and analysis Tools to : <a href="https://github.com/sottlmarek/DevSecOps#oss-and-dependecy-management" target="_blank">OSS and Dependency management</a>

#### **Embrace “Pre-Commit” Stage Security Practices**

<img src="/images/applicationSecurity(blog2)/appSecurity-4.png" width="100%" alt="Flow diagram" style= "padding-top: 30px">

* Validate security activities before code is checked into version control
* Perform threat modeling of the application build and deployment environments to understand threats and implement appropriate mitigation strategies
* Follow structured Git branching strategies to facilitate/enforce peer reviews of code and software development best practices
* Setup pre-commit security hooks in source code repository for early detection of security vulnerabilities in code before committing it to the repository
* Mandate use of IDE security plugins to identify and fix security issues as and when developers create code

<img src="/images/applicationSecurity(blog2)/appSecurity-4.png" width="100%" alt="Flow diagram" style= "padding-top: 30px">

* Here are some of the examples for implementing the Pre-Commit hooks into your source code repository:
    - <a href="https://github.com/pre-commit/pre-commit-hooks" target="_blank">Some out-of-the-box hooks for pre-commit</a>
    - <a href="https://github.com/sottlmarek/DevSecOps#pre-commit-time-tools" target="_blank">Modern DevSecOps Threat Modeling Pre-Commit Tools</a>
    - <a href="https://medium.com/slalom-build/pre-commit-hooks-for-terraform-9356ee6db882" target="_blank">Pre-Commit Hooks for Terraform</a>
    - <a href="https://towardsdatascience.com/pre-commit-hooks-you-must-know-ff247f5feb7e" target="_blank">Pre-Commits Hooks to improve Productivity</a>
    - <a href="https://blog.gitguardian.com/setting-up-a-pre-commit-git-hook-with-gitguardian-shield-to-scan-for-secrets/" target="_blank">Preventing Secrets to be Commited using GitGuardian</a>

#### **Embrace “Commit Stage” Security Practices**

<img src="/images/applicationSecurity(blog2)/appSecurity-5.png" width="100%" alt="Flow diagram" style= "padding-top: 30px">

* Perform fast and automated security checks during the build and continuous integration steps
* Integrate Security checks within CI-CD pipelines to help you detect issues during software development lifecycle
* Incorporate Static Application Security Testing (SAST) to detect security issues in code and provide early feedback
* SAST tool feedback can save time and effort, especially when compared to finding vulnerabilities later in the development cycle.
* Deploy container image and Kubernetes security scanning to help developers find and fix vulnerabilities in cloud native applications
* Develop automated security tests and checks during development stage and add them to CI-CD pipelines
* Reference to OWASP curated list of SAST tools :<a href="https://owasp.org/www-community/Source_Code_Analysis_Tools" target="_blank">Source Code Analysis Tools | OWASP</a>

#### **Implement Continuous Delivery Security Practices**

<img src="/images/applicationSecurity(blog2)/appSecurity-6.png" width="100%" alt="Flow diagram" style= "padding-top: 30px">

* Perform automated security acceptance, functional testing and deep scanning during continuous delivery
* Integrate security acceptance testing within CI-CD pipelines
* Perform regular Dynamic Application Security Testing (DAST) for validating the application from the outside (as a user sees it). It checks your application from the outside by active communication and analysis of the responses based on injected inputs.
* Develop infrastructure tests to validate infrastructure configuration against required specifications
* Perform compliance checks on infrastructure to ensure that that system is continuously insync with requirements
* Reference to OWASP curated list of DAST tools :<a href="https://owasp.org/www-community/Vulnerability_Scanning_Tools" target="_blank">Vulnerability Scanning Tools | OWASP</a>

#### **Implement Continuous Deployment Security Practices**

<img src="/images/applicationSecurity(blog2)/appSecurity-7.png" width="100%" alt="Flow diagram" style= "padding-top: 30px">

* Security checks before, during and after deployment to production
* Continuous security monitoring and compliance checks in production
* Deploy Host-based Intrusion Detection software (HIDS) for file integrity monitoring, real-time altering and active response to incidents
* Enforce Security controls for serverless runtime components
* Deploy scanning mechanisms across the cloud infrastructure to detect security risks a continuous basis

## **Conclusion**
Simplifying and building transparency on Cloud Security will break down barriers between Development, Automation and Operations teams. Automating security scanning and testing using DevSecOps pipelines will initiate security testing early in the software development lifecycle.
* Embrace the principle of "Shift-Left" Security  in the product development life cycle so that total software development effort and thereby costs can be reduced by using continuous delivery and continuous testing methodologies.
* Achieve cost reduction by enabling an iterative and compressed feedback loop between developers, testers and operations staff as part of an integrated software development lifecycle.
* Integrate automated Security testing with a software version control system so that security related checks are triggered automatically during the software development and deployment phases.
