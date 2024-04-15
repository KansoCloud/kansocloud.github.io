---
    layout: post
    title:  "Using Azure Secure Virtual Hub to Accelerate Compliance"
    date:   2024-04-15 10:38:50 +0530
    categories: Using Azure Secure Virtual Hub to Accelerate Compliance
    picture: "../images/Azure%20secure%20virtual%20hub/Azure-security-hub.png"
    writer: "Jason Dopson"
---

### Introduction

Managing network security in a complex cloud environment can be a challenge. Azure Virtual WAN offers a solution, but for many organizations, it requires additional configuration to implement security policies. Azure Secure Virtual Hub is a streamlined approach that integrates security directly into the Virtual WAN.

#### What is a Secure Virtual Hub?

A Secure Virtual Hub is a Virtual WAN hub with pre-configured Azure Firewall Manager. This means it inherits the security and routing policies defined in the Firewall Manager, thereby simplifying the process of securing cloud network traffic.

#### Why choose Secure Virtual Hub?

Secure virtual hubs are ideal for organizations that require increased security posture or to meet specific compliance requirements. In our case, Secure Virtual Hub was used for a solution to meet a client’s FedRAMP approval process.

With FedRAMP, any sensitive data/traffic needs to remain **in boundary** and requires full end-to-end encryption. To support the client’s workload,a secure Landing Zone with multiple VNets was deployed. The boundary was established by keeping these VNets behind a firewall which is the only ingress/egress to leave the boundary.

Even though our VNets are secured behind a firewall, the traffic going between these VNets needs to be controlled. Of course, this can be accomplished solely with NSGs and ASGs but this can be cumbersome if the infrastructure is not managed with Infrastructure as Code (IaC) and additional automation.

##### Benefits of Using Secure Virtual Hub

- Simplified Security Management
- Enhanced Security
- Flexible Security Options
- Scalable Network Architecture

##### Example FedRAMP Architecture

Secure Virtual Hub can assist in establishing the FedRAMP network boundary quickly by using Azure Firewall Manager to create VNets and a Virtual WAN (in a hub-and-spoke topology) from a single interface. North-South and East-West traffic gets routed through Azure Firewall by using what is known as **routing intent**. Secure Virtual Hub maintains VNet-to-VNet and VNet-to-Internet connectivity by enforcing the next hop which will be the Azure Firewall.

Azure Firewall can be used as a DNS Proxy by setting it as the default DNS for VNets, further improving overall security posture while enabling more auditing capabilities. Azure Firewall can also be used to perform TLS packet inspection, but in our case the associated TLS sessions need to be maintained end-to-end with no decryption points in the middle.

<!-- img src will be given here -->

![Azure secure vurtual hub](../images/Azure%20secure%20virtual%20hub/Azure-security-hub.png)

#### Conclusion

By implementing Azure Secure Virtual Hubs, network security management can be streamlined to enforce granular traffic controls thereby achieving a more robust and scalable cloud network architecture. Using the Secure Virtual Hub construct can accelerate an organization's public cloud journey by implementing core network components of a compliant landing zone. All this can be accomplished by using a single interface with just a few clicks to set up the appropriate configuration. In reality, it is more than a few clicks but it is always recommended to implement IaC (**for example, Terraform supports for this resource**).
