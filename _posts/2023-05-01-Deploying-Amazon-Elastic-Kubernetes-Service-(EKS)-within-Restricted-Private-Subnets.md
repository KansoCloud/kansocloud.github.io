---
layout: post_without_share
title:  "Deploying Amazon Elastic Kubernetes Service (EKS) within Restricted Private Subnets"
date:   2023-04-05 10:45:50 +0530
categories: AWS
picture: "../images/blog5/EKS_EC2_Pattern.png"
writer: "Jason Dopson"
---


## **Introduction**
KansoCloud specializes in the design, deployment and management of Kubernetes clusters on AWS, Azure and GCP platforms to modernize our customers' DevOps platforms. One of our larger enterprise customers wanted to deploy Amazon Elastic Kubernetes Service (EKS) clusters with native Amazon Virtual Private Cloud (Amazon VPC) addressing.  One of the primary reasons for using native VPC networking was to take advantage of the ability to manage Kubernetes traffic at the VPC level based on security groups.

This design presents a few practical challenges:       
* Limits it to 32 IP addresses per subnet (/27) and AWS VPC networking must be used.  
* Extending existing subnets is not allowed.  
* No internet access is allowed (i.e. no internet gateways or public NAT gateways).  
* Load balancers need incoming access from other enterprise accounts.  
<br>

## **Approach**


<img src="images\blog5\EKS_EC2_Pattern.png" width="100%" height="50%" alt="EKS_EC2_pattern">

EKS, by default, requires the use of quite a few IP addresses out of the box.  In addition, there is a need to account for application pods, EKS worker nodes (Amazon EC2 or AWS Fargate), Load Balancers, Amazon EFS, and any other needed addons.  At this point, you would probably already have exhausted your IP pool. This means that new subnets are required right from the start or the EKS cluster will encounter issues due to IP exhaustion while trying to run alongside other deployed applications.  Since the customer instruction was to “work with what we had been given”, the idea was to attach a new CIDR to the VPC using private, non-routable IP space defined in RFC1918.  New subnets would be created and then EKS deployed to ensure compliance with the IP space restrictions.



## **Issues**
One of the first challenges was to successfully deploy EKS based external dependencies that come in the form of Docker containers.  Since this environment was closed to the Internet, external dependencies had to be sourced through the approved repository platform (JFrog Artifactory).  Also, without Internet access it became necessary to create VPC endpoints for the other AWS services required by the cluster (the dependencies required for a plain vanilla EKS cluster can be a topic for another blog!).    

The next challenge was to ensure the Load Balancer can accept incoming traffic from other AWS accounts which was not allowed in the new subnets.  The load balancers were deployed in the subnets furnished with the account since they need to have the necessary connectivity to the rest of the enterprise network as well as the EKS cluster residing in isolated subnets.

The Load Balancer acts as the “Ingress Point” for the entire EKS cluster.  Network traffic is routed to the EKS pods via the Load Balancer and SNI rules within the listener.  The next step was to configure SSL certificates to get this all working together.  

Note - In the interest of keeping this blog to the point, details of setting up the Application Load Balancer (ALB) Controller have been skipped but suffice to say ALB setup is straightforward using Ingress resources.  

The last piece of this puzzle was to configure the egress traffic from the cluster.  While the ALB will only support ingress traffic, the return traffic does not leave that way.  The pods need to have a way to  respond all the way back to the originating web requester.  Since it was known that the originating client for this request would exist on the enterprise network (in case of this customer), that traffic had to be allowed.  So, the decision was to  use Private NAT Gateways since there was no need for any public Internet access.  By attaching new subnets to these Private NAT Gateways, the EKS cluster traffic could follow the same routing as the Load Balancer to support end-to-end networking.


## **Conclusion**
KansoCloud can deploy your Amazon EKS clusters within “Restricted Private Subnets” based on the design ideas discussed in this blog and it can potentially manage a large IP address allocation (up to 65K IP addresses). It can also support ingress controlled securely via a Load Balancer, and is “air-gapped” from the Internet and other enterprise network traffic.

