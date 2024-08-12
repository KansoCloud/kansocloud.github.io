---
layout: post
title:  "Strategies and Best Practices for AWS Service Cross-Account Migrations"
date:   2024-08-12 15:30:00 +0530
picture: "../images/no-photo-available.png"
categories: AWS Service Cross-Account Migrations
writer: "Seth Nicewarner"
---

## **Introduction**
AWS cross-account migrations are crucial for cloud developers. This blog covers strategies, challenges, and best practices for migrating AWS services between accounts seamlessly.

## **Reasons for Cross-Account Migrations**
* **Organizational Restructuring:** Dividing or merging business units
* **Compliance and Security:** Isolating sensitive data or moving data to meet regulatory requirements
* **Cost Optimization:** Leveraging different pricing structures or regions
* **Disaster Recovery:** Creating isolated environments for backup and recovery

<br>

## **Migration Strategies**
It is advisable to choose a migration strategy based on data volume, downtime tolerance, and resource dependencies. Common approaches include:

### **Data Transfer Methods**
* **AWS Data Transfer Service:** Ideal for large datasets; accelerates data transfer between regions and accounts.
* **S3-to-S3 Copy:** Facilitates direct copying for S3 data using cross-account permissions.
* **Database-Specific Tools:** Use built-in utilities for RDS, DynamoDB, and ElasticSearch.
* **Scripting and Automation:** Custom scripts or AWS Lambda functions for complex scenarios.

<br>

### **Migration Patterns**
* **Lift and Shift:** Move resources with minimal changes; suitable for applications with few dependencies.
* **Re-platforming:** Change the underlying platform (e.g., from EC2 to Fargate) while retaining application logic.
* **Refactoring:** Modify the application architecture to leverage new AWS services or optimize performance.

<br>

## **Case Studies: Migrating Specific Services**

### **DynamoDB**
**Old/Non-Unified AWS Account:**
1. Navigate to DynamoDB in the AWS console.
2. Go to Tables and select the table to migrate.
3. Click "Actions" and select "Export To S3".
4. Enter the destination S3 bucket: `s3://<env>-dynamo-migration-bucket-<unified-account-number>/<env>/<table-name>/`.
5. Choose "A different AWS account" and enter the target account number. Wait for the migration to complete.

**Unified AWS Account:**
1. Locate the S3 bucket `<env>-dynamo-migration-<account-number>` and navigate to the desired table folder.
2. Click on 'AWSDynamoDB/' and the folder with the Object Key number.
3. Select the 'data/' file, copy the S3 URI.
4. Go to DynamoDB, select "Imports from S3", and paste the S3 source URL.
5. Use this AWS account, choose 'GZIP' and 'JSON' format.
6. Enter the table name and partition key (and sort key if applicable).
7. Review and start the import. Wait for completion.

### **S3**
**Old/Non-Unified AWS Account:**
1. Ensure cross-account bucket permissions: [AWS Documentation](https://docs.aws.amazon.com/AmazonS3/latest/userguide/example-walkthroughs-managing-access-example2.html).
2. Create DataSync tasks for each bucket: select the legacy bucket and the corresponding unified bucket.
3. Navigate to DataSync, select the task, and click "Start". Wait for completion.

**Unified AWS Account:**
1. Navigate to DataSync, select the migration task, and click "Start". Wait for completion.
2. After the initial dry run, adjust transfer mode to only include changed data to optimize data transfer time.

### **RDS**
**Create a Manual Snapshot:**
1. Take a snapshot of the RDS instance: `<env>-final-migration-snapshot`.
2. Copy and re-encrypt with the master account KMS key: `<env>-shared-snapshot`.
3. Share the re-encrypted snapshot with the target unified account.

**Unified Account:**
1. Copy the shared snapshot into the target account: `legacy-<env>-rds`, using the AWS RDS KMS key for the unified account.

### **EFS**
**Old/Non-Unified AWS Account:**
1. Create a Data Sync task.
2. Source location: Amazon EFS File system.
3. Configure with Flowable Engage EFS File System, mount path `/`, subnet, and security group.
4. Destination location: S3, default storage class, folder `/`, and auto-generated IAM role.
5. Name: `datasync-<env>-efs-migration`.
6. Set transfer mode to "Transfer all data".
7. Optional: Choose not to send logs to Cloudwatch.

**Unified AWS Account:**
1. Create a Data Sync task.
2. Source location: S3, default storage class, folder `/`, and auto-generated IAM role.
3. Destination location: Amazon EFS File system with the Flowable Engage EFS File System, mount path `/`, subnet, and security group.
4. Name: `datasync-<env>-efs-migration`.
5. Set transfer mode to "Transfer all data".
6. Optional: Choose not to send logs to Cloudwatch.

## **Best Practices**
* **Thorough Planning:** Assess the environment, define scope, and develop a detailed plan.
* **Testing:** Perform thorough testing in a non-production environment.
* **Data Validation:** Verify data integrity and consistency post-migration.
* **Security:** Implement measures to protect data during transfer.
* **Monitoring:** Track the migration process and resource usage.
* **Documentation:** Maintain detailed records of the migration process.

<br>

Cross-account migrations in AWS require careful planning and execution. By thoroughly understanding the tools, strategies, and best practices, one can effectively migrate DynamoDB, S3, RDS, EFS, and other services while minimizing downtime and risks.
