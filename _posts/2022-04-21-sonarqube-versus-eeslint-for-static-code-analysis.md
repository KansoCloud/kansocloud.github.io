---
layout: post
title:  "SonarQube versus ESLint for Static Code Analysis"
date:   2022-04-21 12:38:50 +0530
categories: Test Automation
picture: "../images/blog3/image1.png"
writer: "Pramod Veerannagari"
---

## **Introduction**
Static Code Analysis (also known as Source Code Analysis) is usually performed as part of a Code Review and should ideally be implemented as part of the CI portion of a product development lifecycle. Static Code Analysis commonly refers to the running of Static Code Analysis tools that attempt to highlight possible vulnerabilities within ‘static’ (non-running) source code by using techniques such as Taint Analysis and Data Flow Analysis. Ideally, such tools would automatically identify code quality issues, security vulnerabilities with a reasonable degree of confidence. Such tools should actually serve as aids for a software developer to help zero in on quality and vulnerability aspects of the code so they can find them more efficiently, rather than a tool that simply finds them automatically.

Per <a href="https://owasp.org/" target="_blank">Open Web Application Security Project (OWASP)</a>

**SonarQube** is a static code analysis platform developed by SonarSource for continuous inspection of code quality to perform automatic reviews with static analysis of code to detect bugs, code smells, and security vulnerabilities on 20+ programming languages.

**ESLint** is an open-source static code analysis tool for identifying problematic patterns found in JavaScript code. Rules in ESLint are configurable, and customized rules can be defined and loaded. ESLint covers both code quality and coding style issues.

This comparison exercise was completed by KansoCloud on behalf of a customer looking for an easy to maintain yet comprehensive Static Code analysis platform to cover their PHP/Laravel and NodeJS based web applications.

## **Comparison Matrix**

<table><th></th><th>SonarQube</th><th>ESLint</th>
<tr><th>Developer</th><td>SonarSource (2006)</td><td>​Nicholas C. Zakas (2013)</td></tr>
<tr><th>Latest Version</th><td>9.3 LTS</td><td>​8.11.0</td></tr>
<tr><th>Software Licensing</th><td>​GNU Lesser General Public License</td><td>MIT License​</td></tr>
<tr><th>Features</th><td><ul><li>Supports multiple languages (go, java, python, JS, TS, etc)</li><li>Provides intuitive Dashboards atdifferent levels (Developer, Architect, manager etc.)</li><li>Supports security hotspots and taint analysis</li><li>Out-of-the-Box configuration of Quality Gates</li><li>Developers can use SonarLint to sync the config on SonarQube server</li><li>Supports advanced level security analysis (Paid Version)</li><li>Available SaaS version (SonarCloud)</li></ul></td><td><ul><li>​Configuration Flexibility - every rule is a plugin</li><li>Can apply fixes automatically
</li><li>Can run on CI server itself</li><li>No need of Dedicated Infrastructure
</li><li>All configurations are version controlled along with the code
</li><li>Can output reports in different formats like junit, unix, codeblock, html, etc.
</li></ul></td></tr>
<tr><th>Disadvantages</th><td><ul><li>​Requires dedicated infrastructure</li><li>Requires Authentication & Authorization management
</li><li>Comparatively more expensive to operate and maintain</li></ul></td><td><ul><li>Initially requires additional time investment for configuration</li><li>Covers only essential security testing
</li><li>No Dashboards available</li><li>Reports are meant for developers i.e. might look cryptic non-developers</li></ul>​</td></tr>
<tr><th>Requirements</th><td><ul><li>Requires a production grade database such as Postgres</li><li>EC2 instance or Fargate task to host SonarQube server (on AWS)</li><li>At-least 2GB of RAM to run efficiently and 1GB of free RAM for the OS
</li><li>Good I/O performance for disks (for ElasticSearch)</li></ul></td><td><ul><li>Node.js pre-installed on the system</li><li>.eslintrc file created with  all the configuration and rules
</li><li>eslint extension installed on the IDE for Developers
</li><li>CI system to generate reports on every git flow trigger</li></ul>​</td></tr>
</table>

## **Conclusion**
The primary objective for the customer was to assist their developers in detecting bugs, code smells, vulnerabilities, security hotspots during early stage development. Since it is an application supporting financial services, there was also the additional requirement to ensure security and compliance. Another important requirement was the ability to	 view clear and intuitive dashboards for internal consumption as well as supporting external audit purposes.

Even though operational cost was a consideration, ease of operation was given a higher priority based on the customer's staffing profile.

SonarQube offered a more comprehensive coverage of all the areas the customer was interested in along with support for multiple languages and easy to use dashboards . While ESLint requires infrastructure to be provisioned with specific software installed on it along with the user searching for appropriate plugins to utilize, SonarQube makes it very convenient with its comprehensive SaaS offering, **SonarCloud**. Given the specific use cases and usage requirements, the recommendation was to proceed with SonarCloud.
