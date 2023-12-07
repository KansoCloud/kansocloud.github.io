---
    layout: post
    title:  "Creating Region Resilient applications in Azure"
    date:   2023-12-06 12:38:50 +0530
    categories: Azure
    picture: "../images/blog14/blog14.jpg"
    writer: "Deval Ganatra"
---

## **Problem Statement**

As the US holiday season approaches, a surge in online shopping is expected. One of our clients is gearing up for this surge by aiming to make their application “Region Resilient” so it can handle the traffic surge during the US holiday season. KansoCloud team’s challenge was to help them in migrating their workload from single-region microservices to a “Region Resilient” architecture.

### **What is “Region Resilience”? How is it different from DR?**

**"Region Resilience"** refers to the capability of an application to remain available and functional even when an entire geographic region of cloud infrastructure faces disruptions. This concept is slightly distinct from **Disaster Recovery (DR)**, which traditionally focuses on recovering from catastrophic events by restoring data and operations at a separate location within a specific period of time (Time to Recovery).

While DR is all about reacting to and recovering from disasters, Region Resilience is a forward-looking or proactive approach that minimizes the impact of potential disasters by distributing necessary resources across multiple regions, ensuring continuous availability even when one region encounters disruptions.

## **Solution Architecture**

While a complete deep dive of the overall architecture used by the client might not be possible in this context, the discussion below attempts to cover the highlights by use an example microservice.

In the architecture shown, the example used is an Azure Webservice or Azure Function that uses SQL DB. It consists of:

- Two replicas of Azure Webservice elements
- Azure SQL DB configured in “Active Geo-Replication” mode (Note - this requires Premium support Tier)
- Traffic Manager and Monitoring tools cover the Application’s health in one region.
  They will be responsible for diverting traffic to another region if necessary
- Azure App Service Configurations are defined in a way that it requires no/minimal manual action to serve traffic in a secondary region. (i.e. no hardcoding of values related to DB Primary endpoint, etc.)

<img src="/images/blog14/blog14.jpg" width="95%" alt="Flow diagram" style= "padding-top: 30px">

While this implementation looks pretty simple, it is a small component of a large application. Supporting “Regional Resilience” across other application components such as Producer, Consumers, Azure EventHub, Azure Storage Containers, etc. becomes technically challenging.

#### **Migration process to achieve “Region-Resilience”**

As part of the initial planning phase applications were categorized based on their criticality to our client’s business. A phased migration approach was adopted by classifying applications into three primary Tiers based on their criticality to the overall business.

Since multiple teams across the company were involved in the migration process, clear and continuous communication was mandated in order to coordinate efforts and address any challenges along the way.

In addition, clear rules were established at the beginning in terms for team/individual responsibilities through this migration process. Each team was assigned accountability for specific microservices. This meant that, all alerts originating specific particular microservices were monitored by the assigned teams in close collaboration with the DevOps team. In the event of a critical alert, designated team members were available, ensuring adherence to end customer SLAs.

### **Common Services Components**

In Microsoft Azure, each component typically follows a different method to achieve the final “Region-Resilience” state.

- Databases have Standard and Premium variants. Terraform modules were created to include the appropriate process to convert Premium Tier Databases with all the configuration changes required to support “Region-Resilience”. The outcome was to ensure Databases were started in Geo-Replication Active-Active mode.
- Azure Application Pipeline templates were also updated to support provisioning of multi-region resources.

<p>&nbsp;</p>

### **Microservices**

A simple versioning strategy was adopted to separate current versus “Region-Resilience” supported components. Both versions were during the migration process i.e. they coexisted in the development environment. Once the “Region-Resilient” version was tested and validated, the original version was moved out of Dev and promoted to QA. This careful version switching was replicated across environments, ensuring a simple yet repeatable transition.

## **Conclusion**

This transition to adopting a “Region-Resilient” architecture is a continuous journey. While the outcome was always clear from the beginning, achieving it required meticulous planning, open communication and a collaborative approach across business and technology units of the organization.
