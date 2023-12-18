---
layout: post
title: "Thanos based Centralized Kubernetes Monitoring"
date: 2023-12-18 11:00:00 +0530
categories: Thanos based Centralized Kubernetes Monitoring
picture: "../images/thanos/thanos-excalidraw.png"
writer: "Shubham Jain"
---

## **Problem Statement**

As Kubernetes implementations become common, there is an ever-growing need to monitor such clusters along with the application workloads running in those clusters. There are three major challenges in this regard:

<ul>
    <li>
        Typically, organizations run multiple clusters making it hard for their operations teams to monitor all the clusters simultaneously. This has created an urgent need for a centralized monitoring platform to manage all their clusters and view them on a single dashboard.
    </li>
    <li>
        In addition, a lot of organizations have recently adopted other open-source platforms such as Jaeger, Prometheus, Loki, etc as part of their Kubernetes ecosystem. In such cases, managing the retention of their Prometheus metrics for a long-term period is a common challenge. Only 15 days of Prometheus metrics are generally available at the cluster level, and customers with compliance requirements need to save at least one year of metrics.
    </li>
    <li>
        A centralized alerting platform is a basic need since it is neither feasible nor scalable to set up alerts in each cluster and regularly monitor them.
    </li>
</ul>

<br>

## **Thanos Introduction**

<strong>Thanos</strong> is an open-source CNCF incubating project designed to enhance and extend the capabilities of Prometheus, a widely used monitoring and alerting system in the Kubernetes ecosystem. Thanos provides a scalable and long-term storage solution for Prometheus metrics, enabling users to maintain and query historical monitoring data across multiple Prometheus instances.

The best practice installation of Thanos should follow a couple of basic guidelines:
<br>

<ol>
    <li>
        Thanos is typically deployed on a sidecar container along with the Prometheus service in the cluster being monitored. Thanos is responsible for pushing Prometheus’s metrics regularly to a long-term storage solution such as AWS S3.
    </li>
    <li>
        Thanos should ideally be installed using the official helm char on the observer cluster (from where all the clusters are being monitored).
    </li>
</ol>

<br>
<!-- img will be presented here -->
<div style="display: flex; align-items: center; justify-content: center;">
<img src="../images/thanos/thanos-excalidraw.png" alt="" srcset="">
</div>

In the picture above, Thanos deployment as a sidecar container along with Prometheus in Cluster A and Cluster B (clusters being monitored) and pushes metrics to object storage such as AWS S3. The main cluster (Cluster A, where Thanos is deployed, queries metrics from object storage and also has Grafana installed supporting visualization of all the clusters. It also consists of the alert manager which is used to set up alerting for all the clusters from a centralized location.

## **Thanos Features**

<ul>
    <li>
        <strong>Scalable Long-Term Storage: </strong> Thanos addresses the challenge of long-term storage for Prometheus metrics by leveraging the underlying cloud platform’s object storage solution such as AWS S3 or Google Cloud Storage. It allows for storing metrics beyond the retention period of a typical Prometheus server.
    </li>
    <li>
        <strong>Global-View Querying: </strong>Thanos provides a global view of metrics by allowing the user to query data from multiple Prometheus instances as if they were part of a single system. This query federation capability enables unified analysis and monitoring across distributed deployments.
    </li>
    <li>
        <strong>Downsampling and Compaction: </strong> Thanos supports downsampling and compaction techniques to optimize storage costs and query performance. It aggregates data over longer time ranges, reducing the granularity of stored metrics while still preserving important information.
    </li>
    <li>
        <strong>Seamless Prometheus Integration: </strong> Thanos is designed to work seamlessly with Prometheus and other components of the Prometheus ecosystem. It is compatible with PromQL, the query language used with Prometheus, and can be integrated with Alertmanager for alerting and Grafana for visualization.
    </li>
    <li>
        <strong>Observability Enhancements: </strong> Besides long-term storage and global querying, Thanos offers additional observability enhancements, such as advanced metric aggregation functions and distributed tracing integration. These features contribute to a more comprehensive monitoring solution.
    </li>
    <li>
        <strong>Open-Source Community: </strong> Thanos is an open-source incubating project in CNCF with an active community of contributors. It benefits from community-driven development, feature expansion, and ongoing support.
    </li>
</ul>
<br>

## **Thanos Components**

<ul>
    <li>
        <strong>Thanos Sidecar </strong>is deployed alongside each Prometheus server. It is responsible for continuously uploading Prometheus metrics to object storage, such as Amazon S3 or Google Cloud Storage. The Sidecar also exposes a Thanos-compatible endpoint for querying data.
    </li>
    <li>
        <strong>Thanos Store</strong> is a read-only component that provides an API for querying metrics from object storage. It serves as a long-term storage layer for Prometheus metrics beyond their retention period. Multiple Thanos Stores can be deployed for scalability and high availability.

    </li>
    <li>
        <strong>Thanos Query </strong> aggregates metrics from multiple Prometheus servers and Thanos Stores. It provides a unified view and query interface to access metrics across distributed deployments. Thanos Query supports PromQL, the same query language used by Prometheus.
    </li>
    <li>
        <strong>Thanos Compact </strong> is responsible for downsampling and compacting data in object storage. It reduces storage costs and improves query performance by aggregating data over longer time ranges while preserving important information. Thanos Compact runs as a separate process.
    </li>
    <li>
        <strong>Thanos Ruler</strong> extends the alerting capabilities of Prometheus. It allows the user to define and manage alerts across multiple Prometheus servers and Thanos Stores. Thanos Ruler integrates with Thanos Query to query and process alerting rules.
    </li>
    <li>
        <strong>Thanos Sidecar Injector</strong> is an optional component that assists with automatically injecting the Thanos Sidecar into Prometheus deployments. It simplifies the deployment and configuration of Thanos Sidecars in a Kubernetes environment.
    </li>
    <li>
        <strong>Thanos Bucket Web</strong> is a user interface for exploring and inspecting metrics stored in Thanos. It provides a graphical interface to view metrics across time and across different Prometheus servers or Thanos Stores.
    </li>

</ul>
<br>

## **Conclusion**

<strong>Thanos</strong> is a powerful open-source platform designed to extend the capabilities of Prometheus for monitoring and observability in Kubernetes environments. By supporting a scalable, long-term storage solution and enabling cross-cluster querying, Thanos addresses key challenges faced by organizations managing large-scale containerized applications. Thanos components such as Sidecar, Store, Query, and Compact, work in unison to enhance the overall functionality offered by Prometheus.

## **References**

[Getting-started](https://thanos.io/v0.10/thanos/getting-started.md/)

[Thanos-monitoring](https://particule.io/en/blog/thanos-monitoring/)

[Bitnami/thanos](https://github.com/bitnami/charts/tree/main/bitnami/thanos)

[Monitoring-using-prometheus-and-thanos](https://www.metricfire.com/blog/ha-kubernetes-monitoring-using-prometheus-and-thanos)
