---
layout: post_without_share
title:  "AWS Customer Use Case TikMe"
date:   2022-12-05 10:37:50 +0530
categories: AWS
picture: "../images/blog7/TikMe.png"
writer: "Mitch Martin"
---



#### **About TikMe**
       
TikMe develops mobile applications to assist service requesters and service providers to find and connect with each other based on location to assign and complete jobs. 

<br>



#### **The Challenge**

TikMe is in need of an automated CI/CD and testing solution for their mobile application development with updated DevOps practices to streamline development and scalability issues for mobile applications. The environment was running on EC2 instances with docker-compose where the build and release was a manual process.


#### **The Solution**

Phase I consisted of deploying infrastructure to TikMe’s AWS account to support application development using AWS serverless services with automated testing following the high-level design below:

<img src="images\blog7\TikMe.png" width="100%" height="50%" alt="Flow diagram">

We migrated the environment to AWS ECS Fargate and the static data resided in Amazon S3 and AWS Elastic File System (EFS).
All services are deployed using Terraform and GitHub Actions for CI/CD with AWS CloudTrail enabled and AWS Secrets Manager for storing any sensitive data being used within the application.
With CI/CD enabled, deployed as part of the DevOps practices, the containers images are automatically packaged and published to ECR on code merge and are deployed to the ECS environment after approval from the code owners. 
The application teams are able to easily debug and troubleshoot the application using CloudWatch Logs and CloudWatch Insights, as all the application logs are pushed to CloudWatch Logs. 
In order to protect the data for backup and recovery, AWS Backup service is used to backup the S3 buckets and RDS MySQL Database Cluster.

#### **The Benefits**

A scalable, secure, repeatable, highly available solution for the application and database to support application development and automated testing with controlled automated releases to their environments approved by the code owners. With the application previously being containerized it also had the least impact on the application teams. 


#### **About KansoCloud**

We are a cloud technology services consulting firm focused on accelerating our customers' "Cloud-Native Transformation Journey".  Our primary goal is to simplify our customers’ cloud journey by eliminating clutter while untapping the "Cloud-Native Potential" of their applications. We specialize in accelerated delivery of DevSecOps automation using "No-Code / Low-Code" platforms.  We currently have locations in Herndon, VA (US), Hyderabad, Pune & Udaipur (India) while supporting customers globally.







