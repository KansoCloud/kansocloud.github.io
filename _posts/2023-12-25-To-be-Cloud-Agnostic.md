---
layout: post
title: "To be "Cloud Agnostic", or Not to be: that is the question!"
date: 2023-12-27 11:00:00 +0530
categories: To be "Cloud Agnostic", or Not to be: that is the question!
picture: ""
writer: "Tyler Barto"
---

## **Introduction**

There is a lot of buzz in the industry on developing “Cloud Agnostic” solutions while developing products on public cloud platforms. “Cloud Agnostic” architecture is a model that avoids vendor specific managed solutions in favor of traditional compute-driven architecture with customer-managed tooling and third party products. The important question to ask is, how beneficial is a “Cloud Agnostic” approach to application architecture.

## **Background**

When the argument is made for a solution requiring to be cloud agnostic, the principal driver tends to come from a desire for solution portability. This stems from the impulse to avoid “vendor lock in”, in a sense, to any given cloud provider. For example, a customer application is currently hosted in Azure using initial billing credits from the vendor. As those credits are gradually used up, the customer may want to be able to run the same application in Amazon Web Services (AWS) or Google Cloud based on financial incentives offered by them or maybe from a better overall cost perspective. The goal then would be to only use ubiquitous services such as virtual machines to run traditional workloads as standalone servers or containers running with a scheduler such as Nomad or Kubernetes.

This usually leads organizations into adopting Kubernetes as a container platform and packaging the application dependencies into it. It stands to reason that given sufficient automation exists, using helm charts and the like, this would be an ideal approach for portability, but what unintended consequences might that approach have, and what are the costs?

## **Our Perspective**

The first thing to consider is how portable such a direction really is. While the application has been obscured from the environment somewhat by the addition of an extra operational layer, platform differences are now a concern when deploying infrastructure for Kubernetes to operate on. While managed Kubernetes services, such as GKE, AKS, and EKS are now common, each of these carries nuance and works best when paired with other services specific to each platform to provide enhanced functionality for resilient storage, load balancing, monitoring, DNS, secrets management, et cetera. Here are some important considerations:

**Operational Complexity:**
Concerning the consequences, the biggest is the additional resources required to manage the Kubernetes platform. Even when a cloud platform managed service is used, it is still the organization’s responsibility to ensure nodes meet their security/compliance requirements, application components are adjusted for feature modifications and deprecations with control plane upgrades, node pools are built to scale intelligently with expected application usage, and so much more. It may be tempting to think that running the application stack entirely on Kubernetes simplifies operations, but the opposite is often true.

**Resilience:**
One of the common problems arises from running something as a container that probably shouldn’t be running on a platform designed for ephemeral workloads (such as databases, and other stateful systems). Each major cloud provider has long since solved the problem of how to store resilient state at any scale in a cost-effective manner, be it in managed SQL or NoSQL databases, shared file systems, or object storage which do not necessarily require variations in application code across multiple cloud provider solutions and should not be ignored. While there are ways to functionally maintain a resilient state entirely within a container platform such as Kubernetes, it requires additional tooling and management meaning more complexity and cost.

**Scaling:**
Another cause for concern is scaling. Platform specific managed services normally handle scaling transparently, offering high availability, even under unplanned load. When an application runs exclusively within containers on Kubernetes, the operations team instead needs to manage multiple node pools for fine-tuned scaling leaving the business to pay for extra compute resources for longer than needed, or beyond the capacity needed. This is especially true when something like a serverless function could have served the purpose and only ever consumed just enough compute resources to run as concurrently or for as long as it needed to.

## **Conclusion**

Coming back to weighing the benefits of building “Cloud Agnostic” applications, is the increase in portability worth the increased operational cost, sacrifices in performance and resiliency, and over-reliance on third party tooling? In a scenario, where there is a need to provide a packaged application to customer managed environments, it may still be tempting to take this route. In our opinion, having deployment templates for multiple cloud providers, which can still certainly take advantage of a container platform such as Kubernetes for container workloads, but also in conjunction with other cloud specific managed services that provide the same functionality across multiple providers, would ultimately provide for a solution that is more resilient, easier to manage, and likely less expensive.
