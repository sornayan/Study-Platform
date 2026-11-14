# Cloud Computing (CS642) — Complete PYQ Answers

**B.Tech Semester VI | Computer Science & Engineering / Information Technology**  
**Source papers:** Annual examinations 2021, 2022, 2023, 2024 and 2025  
**Answer standard:** Detailed, exam-ready answers suitable for a 7-mark question unless the paper indicates otherwise.

> **Important preparation rule:** Examination instructions such as “Answer any five questions” are instructions to candidates. This document answers every readable question, sub-question and short-note alternative in the supplied papers.

## Syllabus basis and scope note

The supplied CS642 syllabus has five modules:

1. **Introduction to Cloud Computing:** emergence, definition, architecture, cloud-based services, benefits, characteristics, public/private environments, evolution of hardware and Internet software, and the SPI framework.
2. **Cloud Services:** CaaS, IaaS, MaaS, PaaS and SaaS.
3. **Cloud Security Challenges:** people, security governance, security portfolio management, security architecture, IAM, data security, threats, and case studies of Amazon EC2, Google App Engine and IBM Clouds.
4. **The MSP Model:** evolution to cloud/SaaS, cloud data centre, data-centre-based SOA, open-source software and SOA.
5. **Virtualization and Smartphones:** hardware/software, memory, storage, data and network virtualization; benefits and security; VMware and KVM; virtual-machine security; smartphone operating systems including iPhone, Windows Mobile and Android.

Some questions in the supplied PYQs also ask about **OpenStack, HDFS, parallel programming, supply-chain management, cluster/grid computing, mobile-cloud limitations and detailed numerical/network-style concepts**. These are retained because they appear in the papers. Where a topic is not explicitly named in the five detailed modules, it is treated as a PYQ extension rather than being represented as a separately prescribed syllabus unit.

**Source wording note:** The 2023 paper is a two-column scan. Its questions are arranged below in the apparent reading order; the wording is preserved as closely as the scan permits. Answers use standard cloud-computing terminology and avoid claims about live product availability or current commercial editions.

## Examination coverage audit

The supplied papers contain the following answerable sub-questions and optional alternatives. Every listed alternative is answered, even where the paper asks candidates to attempt only a subset.

| Examination year | Answer sections included |
|---|---:|
| 2025 Annual | 14 |
| 2024 Annual | 15 (including all three Q7 short-note choices) |
| 2023 Annual | 14 |
| 2022 Annual | 16 |
| 2021 Annual | 16 |
| **Total** | **75** |

---

# 2025 Annual Examination

## Question 1(a). What are the innovative characteristics of cloud computing?

**Answer:**

Cloud computing is an Internet-based model in which computing resources such as servers, storage, networks, platforms and applications are provided as services. Its important characteristics make it different from traditional locally managed computing.

1. **On-demand self-service:** A user can create a virtual machine, storage volume or application environment whenever required, usually through a portal or API, without waiting for manual action by the provider.
2. **Broad network access:** Services are available through standard networks and devices such as computers, tablets and smartphones.
3. **Resource pooling:** The provider pools physical and virtual resources and allocates them to several customers. This is called multi-tenancy. Each tenant's data and access must remain isolated.
4. **Rapid elasticity:** Resources can be increased or decreased according to workload. For example, an online shopping site can add computing instances during a festival sale and release them later.
5. **Measured service:** Usage is monitored and metered. Customers may be charged according to storage, processing time, network transfer or number of users.
6. **Virtualization and abstraction:** Users work with virtual resources without needing to know the exact physical server on which the workload runs.
7. **Automation and service orientation:** Provisioning, monitoring, backup and scaling can be performed through policies and APIs.
8. **Cost flexibility:** The pay-as-you-use model reduces the need for large initial investments in hardware.

Thus, cloud computing combines shared resources, automation, elasticity and metered delivery to provide flexible computing services.

## Question 1(b). Which are the technologies on which cloud computing relies?

**Answer:**

Cloud computing is made possible by the combination of several technologies rather than by one technology alone.

1. **Virtualization:** A hypervisor allows several virtual machines to share one physical server. It improves resource utilization and supports isolation and flexible allocation.
2. **Distributed computing:** Work and data can be distributed among multiple connected computers. This supports scalability and fault tolerance.
3. **High-speed Internet and networking:** Broadband networks, routers, switches and data-centre networks connect users to remotely hosted services.
4. **Web services and service-oriented architecture (SOA):** Applications expose functions through standard interfaces and APIs, allowing systems to communicate over networks.
5. **Utility computing:** Computing capacity is supplied like a utility and measured according to consumption.
6. **Grid and cluster computing:** Clusters combine closely connected computers, while grids coordinate distributed resources. These ideas contributed to large-scale resource sharing.
7. **Automation and management software:** Orchestration, monitoring, provisioning and policy tools manage large resource pools.
8. **Distributed storage and databases:** Replication, partitioning and distributed file systems allow data to be stored and accessed across multiple machines.
9. **Multi-tenancy (architectural approach):** A single service platform can serve several customers while logically separating their data, identities and workloads. Multi-tenancy is not a standalone enabling technology; it is supported by virtualization, access control, network isolation and service-management mechanisms.

Together, these technologies and architectural approaches provide the connectivity, resource sharing, abstraction, scalability and service management needed for cloud computing.

## Question 2(a). Define cloud computing and identify its core features.

**Answer:**

Cloud computing is a model for providing convenient, on-demand network access to a shared pool of configurable computing resources—such as networks, servers, storage, applications and services—that can be rapidly provisioned and released with limited management effort.

The five commonly recognized essential characteristics are:

1. **On-demand self-service:** Users obtain resources when required through a portal or API.
2. **Broad network access:** Services are reachable over a network using standard mechanisms and different client devices.
3. **Resource pooling:** A provider serves multiple customers from a common pool of resources, with logical separation between tenants.
4. **Rapid elasticity:** Capacity can be scaled up or down quickly according to demand.
5. **Measured service:** Resource usage is monitored and measured, enabling transparent usage reports and pay-per-use charging.

Cloud platforms also commonly use the following implementation features:

6. **Virtualization:** Physical resources are abstracted into virtual servers, networks and storage.
7. **Service-based delivery:** Resources are offered as IaaS, PaaS or SaaS and accessed through defined interfaces.

**Example:** A college may use a cloud-based learning management application. Students access it through a browser, while the provider manages the servers, storage and maintenance.

Therefore, cloud computing provides flexible, network-based access to shared and measurable IT resources.

## Question 2(b). What are the major advantages of cloud computing?

**Answer:**

1. **Lower initial cost:** An organization does not need to purchase a large number of servers and storage devices before starting a project.
2. **Pay-as-you-use:** Customers generally pay according to the resources consumed, although charges must be monitored carefully.
3. **Scalability:** Computing and storage resources can be increased or reduced as demand changes.
4. **Availability and continuity:** Providers may use replicated systems, redundant networks and backup facilities to reduce service interruption.
5. **Fast deployment:** Servers and application environments can be provisioned much faster than purchasing and installing physical equipment.
6. **Anywhere access:** Authorized users can access services from different locations through the Internet.
7. **Maintenance reduction:** The provider manages much of the underlying hardware and, in SaaS, also manages the application platform.
8. **Collaboration:** Users can work on shared files and applications from different locations.
9. **Automatic updates:** Cloud providers can maintain and update centrally hosted services.
10. **Resource efficiency:** Pooling and virtualization can improve utilization of physical infrastructure.

**Limitations to consider:** Dependence on network connectivity, security and privacy risks, vendor lock-in and unpredictable usage charges may reduce these benefits if the service is not planned properly.

## Question 3(a). Describe the vision introduced by cloud computing.

**Answer:**

The vision of cloud computing is to make computing resources available like a utility—similar to electricity—so that users can obtain processing power, storage, platforms and software whenever they need them without owning or managing all the underlying infrastructure.

The vision includes the following ideas:

1. **Computing as a service:** Users request IT capabilities as services instead of purchasing every hardware and software component.
2. **Access from anywhere:** Applications and data can be accessed through standard networks using different devices.
3. **Elastic capacity:** Resources can expand during high demand and contract when demand decreases.
4. **Shared infrastructure:** Large pools of servers, storage and networking equipment are shared efficiently among customers.
5. **Lower entry barriers:** Start-ups, educational institutions and small organizations can use powerful computing resources without a large capital investment.
6. **Focus on core work:** Organizations can spend less time maintaining infrastructure and more time developing products and serving users.
7. **Global collaboration:** Teams can access common applications and information across geographical locations.
8. **Automation:** Provisioning, monitoring, billing and scaling can be performed through software.

For example, a small online business can host its website, database and file storage on cloud infrastructure and increase capacity when its customer base grows.

Thus, cloud computing aims to make computing flexible, accessible, scalable and economically convenient.

## Question 3(b). Explain the cloud ecosystem.

**Answer:**

The cloud ecosystem is the network of people, organizations, technologies and services involved in providing, using, managing and evaluating cloud services.

Its main participants are:

1. **Cloud consumer:** An individual or organization that uses cloud services, such as a college using online storage.
2. **Cloud provider:** An organization that owns or operates the cloud infrastructure and offers services such as IaaS, PaaS or SaaS.
3. **Cloud broker:** An intermediary that helps consumers select, combine, manage or optimize services from one or more providers.
4. **Cloud carrier:** The network or telecommunications provider that transports cloud services between provider and consumer.
5. **Cloud auditor:** An independent party that assesses security, performance, privacy, controls and compliance.
6. **Technology vendors:** Hardware, virtualization, storage, networking and software companies supply components used by cloud providers.
7. **Service developers and integrators:** They build cloud applications and connect cloud services with existing systems.

**Working:** A consumer requests a service from a provider. A carrier provides connectivity. A broker may assist in service selection or integration, while an auditor may independently evaluate the provider's controls.

**Importance:** The ecosystem establishes responsibilities, enables service integration, supports security evaluation and gives consumers choices among providers and service models.

## Question 4(a). What are the disadvantages of virtualization?

**Answer:**

Virtualization provides flexibility and better utilization, but it also introduces limitations and management risks.

1. **Performance overhead:** A virtual machine may perform slightly slower than a workload running directly on physical hardware because of the virtualization layer.
2. **Resource contention:** Several VMs share CPU, memory, storage and network resources. A heavily loaded VM can affect other VMs.
3. **Single host failure impact:** If one physical host fails, several VMs running on it may become unavailable unless high-availability arrangements exist.
4. **Complex management:** Administrators must manage hypervisors, virtual networks, images, snapshots, storage and VM lifecycles.
5. **Security risks:** A vulnerable hypervisor, weak isolation, misconfigured virtual network or compromised management console can affect multiple VMs.
6. **VM sprawl:** Uncontrolled creation of virtual machines leads to unused VMs, wasted capacity and increased attack surface.
7. **Licensing and training cost:** Virtualization platforms, management tools and skilled administrators may add cost.
8. **Backup and recovery complexity:** Snapshots are not a complete substitute for independent backups. Large virtual environments require planned backup and restore procedures.
9. **Hardware dependency:** Some specialized devices or applications may not work efficiently in a virtualized environment.

These disadvantages can be controlled through capacity planning, patching, access control, monitoring, high availability and disciplined VM lifecycle management.

## Question 4(b). What does Infrastructure-as-a-Service (IaaS) refer to?

**Answer:**

Infrastructure-as-a-Service (IaaS) is a cloud service model in which a provider supplies fundamental computing resources—such as virtual machines, storage, networking and related infrastructure—over a network. The customer rents these resources instead of purchasing and maintaining all physical hardware.

**Main components:**

1. **Compute:** Virtual machines or instances with selected CPU and memory capacity.
2. **Storage:** Block, object or file storage for operating systems, databases, backups and user data.
3. **Networking:** Virtual networks, IP addresses, routers, firewalls, load balancers and connectivity.
4. **Virtualization layer:** Hypervisors and management software allocate physical resources to virtual resources.
5. **Management interface:** A web console or API allows users to create, configure, monitor and delete resources.

**Responsibility division:** The provider normally manages data-centre buildings, physical servers, storage hardware and networking hardware. The customer generally manages the guest operating system, applications, data, user access and many security settings. Exact responsibility depends on the provider and service agreement.

**Examples:** Amazon EC2 and comparable virtual-machine services provide IaaS capabilities.

**Benefits:** Rapid provisioning, elasticity, lower capital expenditure and flexible configuration. **Limitations:** Customers still need to manage operating systems, applications, security configurations and cost.

## Question 5(a). Design and justify the requirements for design and implementation of types of cloud with supply chain management as a case study.

**Answer:**

A supply chain management (SCM) system connects suppliers, manufacturers, warehouses, transporters, distributors and retailers. It needs shared information, continuous availability, security and the ability to handle changing demand. A **hybrid cloud** is often a suitable design because sensitive business information can remain in a controlled private environment while partner-facing and scalable services can use a public cloud.

### 1. Requirements

- **Scalability:** The system must handle seasonal orders and sudden increases in transactions.
- **Availability:** Inventory, order and shipment information should remain accessible to authorized partners.
- **Data security:** Supplier contracts, customer details, prices and financial records require access control and encryption.
- **Integration:** The system must exchange data with ERP, warehouse, transport and supplier systems through APIs or secure interfaces.
- **Interoperability:** Different partners may use different software and data formats.
- **Performance:** Order tracking and inventory updates should have low response times.
- **Disaster recovery:** Critical records and services need backup and recovery arrangements.
- **Cost control:** Resources should be scaled according to actual demand.

### 2. Proposed cloud design

```text
 Suppliers / Manufacturers / Warehouses / Retailers
                         |
                  Secure Internet / VPN
                         |
              API Gateway / Identity Layer
                         |
             Hybrid Cloud Integration Layer
                 /                    \
       Private Cloud                 Public Cloud
   ERP, finance, sensitive       Partner portal, order tracking,
   supplier contracts, core      analytics, web applications,
   inventory database            elastic demand processing
                 \                    /
                  Shared monitoring,
                backup and audit logs
```

### 3. Justification of cloud types

- **Private cloud:** Suitable for sensitive ERP, finance and confidential supplier data because the organization has greater control over infrastructure and policies.
- **Public cloud:** Suitable for public-facing portals, scalable analytics and services used by many external partners. It provides elasticity and avoids purchasing all hardware.
- **Hybrid cloud:** Connects private and public environments so data and applications can be placed according to sensitivity, cost and performance needs.
- **Community cloud:** May be considered where a group of organizations with similar compliance or operational requirements shares infrastructure.

### 4. Implementation steps

1. Classify data and identify security requirements.
2. Select public/private/hybrid components.
3. Design network connectivity, identity management and APIs.
4. Migrate applications in stages and test integration.
5. Establish monitoring, backup, recovery and service-level agreements.
6. Review cost, performance and security regularly.

**Conclusion:** A hybrid architecture is a balanced choice for many SCM systems, but the final design should follow the organization's data sensitivity, partner requirements, budget and legal obligations.

## Question 5(b). Explain OpenStack and programming support for cloud storage.

**Answer:**

**OpenStack** is an open-source cloud-computing platform used to build and manage private or public cloud infrastructure. It provides services for compute, storage, networking, identity and cloud administration through APIs and a web dashboard.

### Important OpenStack components

1. **Nova:** Manages compute instances and VM lifecycle.
2. **Neutron:** Provides virtual networking, subnets, routers and network connectivity.
3. **Swift:** Provides object storage for unstructured data such as images, documents and backups.
4. **Cinder:** Provides block storage volumes that can be attached to virtual machines.
5. **Keystone:** Provides identity services, authentication and service catalog functions.
6. **Glance:** Stores and manages VM images.
7. **Horizon:** Provides a web-based dashboard for users and administrators.

### Programming support for cloud storage

- **REST APIs:** Programs can create containers, upload or download objects, manage volumes and query storage services through HTTP-based APIs.
- **Authentication:** Keystone issues tokens after authentication; clients use authorized tokens to access services.
- **SDKs and client libraries:** Programming libraries simplify API calls from languages such as Python.
- **Object operations:** Applications can create containers, upload objects, retrieve objects and delete objects.
- **Automation:** Scripts can provision storage, set permissions and manage resources without manual dashboard operations.
- **Metadata:** Object metadata can store content type, identifiers and application-specific information.

**Example:** A college application may store uploaded assignment files in object storage through an API and keep structured student records in a database.

OpenStack therefore gives organizations an open platform and programmatic interfaces for operating cloud infrastructure and storage.

## Question 6(a). Explain on-demand computing with its advantages.

**Answer:**

On-demand computing is a service model in which a user obtains computing resources—such as processing power, storage, software or network capacity—whenever required, usually through self-service interfaces. Resources can be provisioned and released without long procurement delays.

**Working:** A user selects the required service and capacity through a portal or API. The cloud management system allocates resources from a shared pool. Usage is monitored, and resources can later be scaled or released.

### Advantages

1. **Immediate access:** Resources can be created quickly when a project or workload starts.
2. **Elasticity:** Capacity can be increased during peak demand and reduced afterward.
3. **Lower initial investment:** Organizations avoid buying hardware for maximum possible demand.
4. **Pay-per-use:** Charges are based on measured consumption, subject to the provider's pricing rules.
5. **Better resource utilization:** Shared infrastructure can use physical capacity more efficiently.
6. **Business flexibility:** Teams can experiment, develop and test applications without waiting for hardware procurement.
7. **Global access:** Services can be accessed from multiple locations through networks.
8. **Reduced infrastructure maintenance:** The provider manages much of the underlying hardware.

**Example:** An e-commerce site can temporarily add more server instances during a major sale and release them when traffic falls.

**Conclusion:** On-demand computing provides flexible and rapid access to IT resources, but organizations should monitor cost, access security and service availability.

## Question 6(b). Discuss SaaS implementation issues with key characteristics and benefits.

**Answer:**

Software-as-a-Service (SaaS) is a cloud model in which a provider hosts and manages a complete application and makes it available to users through a browser, mobile application or API. Customers generally subscribe to the service rather than installing and maintaining the full application themselves.

### Key characteristics

1. **Network-based access:** Users access the application over the Internet.
2. **Provider-managed application:** The provider maintains the software, infrastructure and updates.
3. **Multi-tenancy:** One application platform can serve multiple customers while separating their data and configuration.
4. **Subscription or usage pricing:** Customers may pay per user, feature, period or usage.
5. **Centralized updates:** The provider deploys updates centrally.
6. **Configuration:** Users can often configure settings without changing the underlying application code.

### Benefits

- Low initial installation and infrastructure cost.
- Faster deployment and access from different locations.
- Reduced maintenance burden for customers.
- Easier collaboration and centralized data access.
- Provider-managed updates and backups, subject to the service terms.
- Capacity can often grow as the organization adds users.

### Implementation issues

1. **Security and privacy:** Customer data must be protected from unauthorized access and leakage.
2. **Tenant isolation:** One customer's activity must not expose another customer's data.
3. **Integration:** SaaS must connect with existing databases, identity systems and business applications.
4. **Customization limits:** Highly specialized workflows may not fit the provider's standard application.
5. **Availability and connectivity:** The service depends on the provider and network connection.
6. **Data migration and exit:** Moving data into or out of the service can be difficult.
7. **Vendor lock-in:** Proprietary formats or integrations can make switching providers costly.
8. **Compliance and location:** Organizations must understand where data is stored and which regulations or contracts apply.
9. **Service-level agreement:** Backup, uptime, support, recovery and responsibilities should be defined.

**Conclusion:** SaaS simplifies application delivery, but successful implementation requires careful assessment of security, integration, data portability and service commitments.

## Question 7(a). Illustrate the system issues of running a parallel programming.

**Answer:**

Parallel programming divides a problem into tasks that can execute simultaneously on multiple processor cores or computers. It can reduce execution time, but it introduces system and programming challenges.

1. **Task decomposition:** A large problem must be divided into independent or partially independent tasks. Poor division limits parallelism.
2. **Data partitioning:** Data must be distributed among processors without creating excessive duplication or imbalance.
3. **Communication overhead:** Processors may need to exchange intermediate data. Communication can consume time and network bandwidth.
4. **Synchronization:** Tasks may need to coordinate access to shared data or wait for other tasks. Locks, barriers and semaphores are common mechanisms.
5. **Race conditions:** If multiple tasks access shared data without correct synchronization, results may depend on execution order.
6. **Deadlock:** Tasks can wait indefinitely for resources held by one another.
7. **Load balancing:** Work should be distributed so that processors remain usefully occupied. An idle processor reduces overall performance.
8. **Memory consistency:** Programs must ensure that updates made by one processor are visible to other processors as required.
9. **Fault tolerance:** Failure of a node or task should be detected and handled where the application requires reliability.
10. **Scalability and debugging:** A program that works on a few processors may not scale efficiently; concurrency bugs are also difficult to reproduce.

**Conclusion:** Good parallel programs require suitable task decomposition, communication design, synchronization, load balancing and error handling.

## Question 7(b). Discuss HDFS architecture.

**Answer:**

Hadoop Distributed File System (HDFS) is a distributed file system designed to store very large files across a cluster of commodity machines. It divides files into large blocks and stores replicated copies on different DataNodes to improve reliability and availability.

### Main components

1. **NameNode:** The master service that manages the file-system namespace and metadata. It records file names, directories, permissions and the mapping of file blocks to DataNodes. It normally does not store the user file contents.
2. **DataNodes:** Worker nodes that store the actual data blocks. They serve read and write requests and report their status to the NameNode.
3. **Secondary NameNode / checkpoint node:** Periodically assists by creating checkpoints of namespace metadata. It should not be confused with a direct real-time backup or automatic replacement for the NameNode.
4. **HDFS client:** Contacts the NameNode for metadata and communicates with DataNodes to read or write block data.

### Working

**File write:** The client requests file creation from the NameNode. The NameNode checks permissions and selects DataNodes. The client divides the file into blocks and sends data through a replication pipeline. DataNodes store the blocks and acknowledge successful writes.

**File read:** The client asks the NameNode for block locations. The NameNode returns suitable DataNodes. The client reads blocks directly from DataNodes and combines them in order.

### Features

- Large block-based storage.
- Replication for fault tolerance.
- High-throughput access to large files.
- Data locality: computation can be moved close to data.
- Scalable cluster-based design.

**Limitations:** HDFS is mainly designed for large streaming workloads; it is not ideal for huge numbers of very small files or low-latency random updates.

---

# 2024 Annual Examination

## Question 1(a). Explain the benefits of using a Cloud Model.

**Answer:**

A cloud model allows an organization to obtain computing resources as services over a network instead of owning and operating every component locally. Its benefits include:

1. **Reduced capital expenditure:** The organization can rent computing and storage instead of purchasing large infrastructure in advance.
2. **Scalability:** Capacity can be increased or decreased according to demand.
3. **Rapid provisioning:** New servers and application environments can be deployed quickly.
4. **Anywhere access:** Authorized employees can use cloud applications from different locations.
5. **Resource pooling:** Shared infrastructure can improve utilization.
6. **Business continuity:** Replication, backup and disaster-recovery services can support recovery from failures when correctly configured.
7. **Maintenance reduction:** Providers maintain the physical infrastructure and may also manage platforms or applications.
8. **Measured usage:** Monitoring and metering support usage-based billing.
9. **Collaboration:** Centralized applications and documents make teamwork easier.

The benefits depend on selecting an appropriate provider, understanding the service agreement and managing security and cost.

## Question 1(b). Differentiate between Public and Private Cloud environment.

**Answer:**

| Basis | Public cloud | Private cloud |
|---|---|---|
| Ownership/control | Operated by a third-party provider | Dedicated to one organization; operated internally or by a service provider |
| Users | Multiple customers share the provider's infrastructure | One organization uses the environment |
| Resource sharing | Multi-tenant infrastructure with logical isolation | Dedicated environment or resources reserved for one organization |
| Cost | Usually lower initial cost and usage-based pricing | Often higher setup and management cost |
| Scalability | Large provider resource pools can offer rapid scaling | Scaling depends on the organization's capacity and investment |
| Control | Less control over physical infrastructure | Greater control over configuration and policies |
| Security responsibility | Shared between provider and customer | Organization has greater direct control but also greater responsibility |
| Maintenance | Provider manages physical infrastructure | Organization or contracted operator manages it |
| Example | Public IaaS or SaaS service | Private cloud operated for a bank or university |

**Public cloud** is suitable when flexibility, quick deployment and cost efficiency are priorities. **Private cloud** is useful when an organization needs greater control, dedicated resources or specific compliance arrangements. A hybrid cloud can combine both.

## Question 2(a). Compare and contrast CaaS, IaaS, MaaS, SaaS and PaaS.

**Answer:**

These models provide different levels of cloud functionality.

| Model | Full form and service | Main use | Customer responsibility |
|---|---|---|---|
| CaaS | Communication-as-a-Service; hosted communication tools such as messaging, voice or video | Business communication without building the communication platform | Users, policies and integration; provider manages communication platform |
| IaaS | Infrastructure-as-a-Service; virtual compute, storage and networking | Rent infrastructure to run operating systems and applications | OS, middleware, applications, data and configuration |
| MaaS | Monitoring-as-a-Service; hosted monitoring of systems, applications or networks | Observe availability, performance, logs and alerts | Select metrics, configure alerts and respond to events |
| PaaS | Platform-as-a-Service; managed runtime, middleware, databases and development tools | Build, test and deploy applications | Application code, data and configuration |
| SaaS | Software-as-a-Service; complete hosted application | Use ready-to-use software through a network | User configuration, access and data use |

**Comparison:** IaaS gives the customer the greatest control over the computing environment among these common models, but also more management responsibility. PaaS hides much of the infrastructure and runtime management. SaaS provides a complete application and requires the least infrastructure administration. CaaS and MaaS provide specialized communication and monitoring capabilities.

**Examples:** A virtual machine service is IaaS; a managed application runtime is PaaS; hosted email is SaaS; hosted video conferencing is CaaS; and a hosted infrastructure monitoring dashboard is MaaS.

## Question 2(b). Explain the functionality of the SPI framework.

**Answer:**

The **SPI framework** represents the three major cloud service layers: **SaaS, PaaS and IaaS**. It explains how services are delivered at different levels of abstraction.

```text
+---------------------------------------+
| SaaS – complete application           |
| Example: hosted email or office suite  |
+---------------------------------------+
| PaaS – development/runtime platform   |
| Example: application runtime, database|
+---------------------------------------+
| IaaS – compute, storage and network    |
| Example: virtual machines and volumes  |
+---------------------------------------+
| Physical data-centre resources         |
+---------------------------------------+
```

1. **IaaS:** Supplies virtualized hardware resources such as compute, storage and networking. The customer manages the operating system and applications.
2. **PaaS:** Supplies an application development and deployment environment, including runtime, middleware and often managed database services. The customer focuses on application code and data.
3. **SaaS:** Supplies a complete application over a network. The provider manages the application stack, while the customer uses and configures it.

**Functionality of the framework:** It classifies cloud offerings, shows the relationship between service layers, clarifies the division of responsibilities and helps an organization select a suitable service model. Higher layers hide more of the lower-level infrastructure from the customer.

## Question 3(a). Explain the threats of Cloud Computing.

**Answer:**

Cloud computing creates security risks because data and applications are hosted on shared, remotely accessible infrastructure.

1. **Data breach:** Unauthorized persons gain access to confidential customer information.
2. **Data loss or destruction:** Accidental deletion, ransomware, hardware failure or poor backup may make data unavailable.
3. **Account or service hijacking:** Stolen passwords or tokens allow attackers to control cloud accounts.
4. **Insecure APIs and interfaces:** Weak authentication, poor input validation or exposed management interfaces can be exploited.
5. **Malicious insiders:** An employee or contractor with legitimate access may misuse privileges.
6. **Denial of Service (DoS):** Attackers overload a service so genuine users cannot access it.
7. **Shared-technology vulnerabilities:** A weakness in a hypervisor, container runtime or shared platform can threaten multiple tenants.
8. **Misconfiguration:** Publicly exposed storage, excessive permissions or insecure network rules can expose data.
9. **Compliance and data-location risks:** Data may be stored or processed in locations with different legal requirements.
10. **Insufficient visibility:** Customers may not have direct control over the provider's physical infrastructure.

**Protection:** Use strong IAM and MFA, encryption, secure APIs, patching, network segmentation, monitoring, backups, incident response and provider due diligence.

## Question 3(b). What do you mean by Identity and Access Management (IAM)?

**Answer:**

Identity and Access Management (IAM) is the set of policies, processes and technologies used to identify users and control what they are allowed to access in an information system or cloud environment.

### Main functions

1. **Identification:** A user claims an identity, such as a user name or account identifier.
2. **Authentication:** The system verifies the identity using a password, token, certificate, biometric factor or multi-factor method.
3. **Authorization:** The system decides which resources and actions the authenticated user may access.
4. **Role management:** Permissions are grouped into roles such as administrator, developer and read-only user.
5. **Provisioning and de-provisioning:** Accounts and permissions are created, modified and removed when a person joins, changes roles or leaves.
6. **Federation and single sign-on:** Trusted identity systems can allow users to access multiple services with managed authentication.
7. **Auditing:** Logs record access and administrative activity for investigation and compliance.

**Principle of least privilege:** Give each identity only the minimum permissions required to perform its job. Review access regularly and remove unused accounts.

**Example:** A cloud administrator may create virtual machines, while a student user can only view a learning application. IAM prevents the student from performing administrative actions.

## Question 4(a). Explain IBM Clouds in detail.

**Answer:**

IBM has been an enterprise technology provider and has offered cloud services for infrastructure, application platforms, data, integration and business workloads. In the context of the syllabus and textbook-era case study, “IBM Clouds” refers to IBM's enterprise cloud approach rather than one single product.

### Main elements

1. **Infrastructure services:** Virtual servers, storage and networks allow an organization to host operating systems and applications.
2. **Platform services:** Managed application runtimes, middleware, databases and development tools help developers build and deploy applications.
3. **Software and business services:** Hosted software and enterprise capabilities can be consumed as services.
4. **Hybrid integration:** Enterprises can connect existing data-centre systems with cloud applications and services.
5. **Management:** Monitoring, provisioning, service management and performance tools help operate workloads.
6. **Security:** Identity management, access control, encryption, network protection and governance are important for enterprise deployments.
7. **Scalability:** Cloud resources can be adjusted according to workload requirements.

### Historical IBM cloud examples relevant to the syllabus-era case study

- **IBM SmartCloud Enterprise:** An enterprise infrastructure service that provided virtual server capacity on demand (IaaS).
- **IBM SmartCloud Application Services:** A platform-as-a-service offering intended to support enterprise application development and deployment.
- **IBM SmartCloud Foundations:** A portfolio of cloud software and hardware used to build and manage private-cloud environments.

These are historical product names useful for understanding the textbook-era IBM case study; they should not be treated as a list of current product editions. IBM's broader enterprise approach also emphasized private, public and hybrid cloud deployment, integration with existing systems, management and security.

### Enterprise use

For example, an organization could use SmartCloud Enterprise-style virtual infrastructure for a web application, use a managed application platform for development and deployment, and retain sensitive legacy systems inside a private data-centre environment. Integration and identity controls connect the parts while applying different security policies to different workloads.

**Advantages:** Enterprise integration, managed services, flexible capacity and support for hybrid architectures. **Considerations:** Organizations must evaluate cost, security responsibility, compatibility, migration complexity and service-level commitments.

**Historical references:** IBM's *SmartCloud Milestones* and its 2011 *SmartCloud Application Services* presentation document these syllabus-era examples.

## Question 4(b). Describe the basic approach to a Data-Centre-Based SOA.

**Answer:**

A **Service-Oriented Architecture (SOA)** is an architectural approach in which application functions are organized as reusable, loosely coupled services. A data-centre-based SOA hosts and manages these services within a data centre and exposes them through standard interfaces.

### Basic approach

1. **Identify business functions:** Divide business processes into services such as authentication, billing, inventory or customer records.
2. **Define service contracts:** Specify service operations, input/output formats, policies and error handling.
3. **Build or wrap services:** Existing applications may be converted into services through adapters or interfaces.
4. **Use standard communication:** Services communicate through APIs or messaging protocols.
5. **Service registry/discovery:** A catalogue can help applications find available services.
6. **Orchestration:** A workflow coordinates several services to complete a business process.
7. **Data-centre hosting:** Services run on managed servers, virtual machines, storage and networks.
8. **Management and security:** Monitoring, logging, authentication, authorization, load balancing and backup are applied centrally.

```text
User / Business Application
           |
      API / Service Gateway
           |
   Service Orchestration
      /      |       \
 Identity  Billing  Inventory
      \      |       /
     Data-centre infrastructure
```

**Benefits:** Reuse, interoperability, loose coupling and easier integration. **Challenges:** Governance, service dependencies, latency, security and version management.

## Question 5(a). What do you mean by Open Source Software? Give example.

**Answer:**

Open-source software is software whose source code is made available under a licence that permits users to inspect, use, modify and redistribute it subject to the licence conditions.

### Characteristics

1. **Source-code access:** Users and developers can inspect how the software works.
2. **Modification:** Users may adapt the software to their needs within licence terms.
3. **Redistribution:** Copies and modified versions may be shared according to the licence.
4. **Community development:** Contributors can identify bugs, submit improvements and develop extensions.
5. **Transparency:** Public source code makes independent review possible, although openness alone does not guarantee security.
6. **Reduced licence dependence:** There may be no per-user proprietary licence fee, but support, hosting, customization and maintenance can still cost money.

**Examples:** Linux, Apache HTTP Server, MySQL, Python and OpenStack are examples of widely used open-source software or projects.

### Difference from traditional proprietary software

In proprietary software, source-code access and modification are generally restricted by the vendor's licence. In open-source software, rights are granted through an open-source licence. Both types still require maintenance, security updates and responsible administration.

### Advantages

Flexibility, community support, reduced vendor lock-in, inspectability and customization. Possible challenges include support responsibility, compatibility and the need for skilled administrators.

## Question 5(b). Explain the process of Virtual Machine Security.

**Answer:**

Virtual machine security means protecting the hypervisor, host, guest VMs, virtual networks, VM images and data from unauthorized access, malware and configuration errors.

### Security process

1. **Secure the hypervisor:** Install trusted versions, apply patches and disable unnecessary services.
2. **Protect the host:** Harden the host operating system, restrict administrative access and monitor privileged actions.
3. **Isolate VMs:** Use virtual network segmentation and access rules so one VM cannot freely access another.
4. **Control identities:** Use strong authentication, MFA and role-based access for VM consoles and management APIs.
5. **Secure images:** Use trusted, updated VM templates. Scan images and remove embedded credentials before reuse.
6. **Patch guest operating systems:** Keep each VM's OS and applications updated.
7. **Protect data:** Encrypt sensitive storage and backups; securely delete or sanitize decommissioned VM disks.
8. **Monitor activity:** Collect logs and alerts for unusual VM creation, privilege changes and network traffic.
9. **Backup and recovery:** Maintain independent backups and test restoration.
10. **Lifecycle control:** Track VM owners, purpose, resource allocation and retirement dates to prevent VM sprawl.

**Conclusion:** Security must cover the entire virtual environment, not only the guest operating system.

## Question 6(a). Write the benefits of virtualization.

**Answer:**

1. **Better hardware utilization:** Multiple VMs can share one physical server, reducing idle capacity.
2. **Server consolidation:** Several lightly used servers can be moved onto fewer physical hosts.
3. **Lower cost:** Hardware, electricity, cooling and floor-space requirements may be reduced.
4. **Isolation:** Each VM can run its own operating system and applications separately.
5. **Rapid provisioning:** VM templates allow systems to be created quickly.
6. **Scalability:** Resources can be reassigned as workload requirements change.
7. **Portability and migration:** Some virtualization platforms allow VMs to move between compatible hosts.
8. **Testing and development:** Different operating systems and software configurations can run on the same hardware.
9. **Disaster recovery:** VM images and backups can simplify restoration when designed correctly.
10. **Legacy support:** Older applications may continue to run in a compatible virtual environment.

**Conclusion:** Virtualization improves flexibility and utilization, but it needs capacity planning and security controls.

## Question 6(b). Recommend the security issues for virtualization.

**Answer:**

Important virtualization security issues include:

1. **Hypervisor compromise:** An attacker who compromises the hypervisor may affect many guest VMs.
2. **VM escape:** A vulnerability may allow code in a guest VM to interfere with the host or other VMs.
3. **Weak isolation:** Incorrect network or storage configuration can expose data between tenants.
4. **Management-console attack:** Stolen administrator credentials can allow an attacker to create, modify or delete VMs.
5. **VM image risks:** Images may contain malware, outdated software or embedded passwords.
6. **VM sprawl:** Unmanaged and forgotten VMs remain unpatched and increase attack surface.
7. **Snapshot and data leakage:** Snapshots may contain sensitive memory or disk data.
8. **Resource exhaustion:** A VM may consume excessive CPU, memory, storage or bandwidth and affect others.
9. **Insecure migration:** VM migration traffic may expose data if not protected.
10. **Logging gaps:** Lack of visibility can delay detection of malicious activity.

**Recommendations:** Patch and harden hypervisors, restrict administrative access, use MFA, segment virtual networks, encrypt data and migration traffic, scan images, monitor resource usage, maintain backups and remove unused VMs.

## Question 7(a). Short note: KVM.

**Answer:**

**KVM (Kernel-based Virtual Machine)** is a Linux kernel virtualization technology that allows a Linux system with suitable processor virtualization support to act as a hypervisor. It turns the Linux kernel into a virtualization layer and runs guest operating systems as virtual machines.

- KVM uses hardware virtualization features provided by modern processors.
- Each VM is represented through Linux processes and uses virtual CPU and memory resources.
- QEMU is commonly used with KVM to provide device emulation and VM execution support.
- Linux scheduling, memory management and security mechanisms support the virtualized environment.
- KVM can run multiple guest operating systems, subject to hardware and configuration compatibility.
- It is used in private-cloud and data-centre environments, including OpenStack-based deployments.

**Benefits:** Open-source availability, integration with Linux, hardware-assisted virtualization, scalability and flexible management. **Limitations:** Correct setup, host hardening, monitoring and specialist administration are still required.

## Question 7(b). Short note: MSP Model.

**Answer:**

**MSP (Managed Service Provider) model** refers to the delivery of IT services in which an external provider manages specified technology operations for a customer. These services may include hosting, infrastructure management, network monitoring, backup, maintenance and technical support.

### Main features

1. The customer contracts with a provider for defined IT services.
2. The provider operates and maintains agreed resources remotely.
3. Service levels define availability, response times and responsibilities.
4. Monitoring and support are often centralized.
5. Costs may be based on a fixed fee or service usage.

### Evolution toward cloud computing

Traditional MSP services often managed dedicated customer systems. With virtualization, automation, shared resource pools and self-service portals, providers could deliver more standardized and elastic services. This helped the evolution toward IaaS, PaaS and SaaS.

**Difference:** An MSP may manage a customer's existing IT environment, while cloud computing generally provides pooled, standardized and rapidly provisionable resources as services. The models can overlap.

## Question 7(c). Short note: Amazon EC2.

**Answer:**

**Amazon Elastic Compute Cloud (EC2)** is an Infrastructure-as-a-Service example that provides resizable virtual computing capacity. A customer launches virtual server instances rather than purchasing physical servers.

### Main concepts

- **Instances:** Virtual servers with selected compute capacity.
- **Machine images:** Templates used to launch instances with an operating system and software.
- **Storage:** Instance storage and separately managed block storage can support application data.
- **Networking:** Virtual networks, IP addressing and security rules control connectivity.
- **Elasticity:** Instances can be added or removed according to workload.
- **Management:** Console and APIs support provisioning, monitoring and automation.

**Example:** A developer can launch an instance, install a web server, deploy an application and scale the number of instances when traffic increases.

EC2 illustrates IaaS because the provider manages physical infrastructure while the customer manages the guest OS, application and many configuration settings.

---

# 2023 Annual Examination

## Question 1(a). Explain briefly about cloud computing and its characteristics.

**Answer:**

Cloud computing is a model that provides shared computing resources—such as servers, storage, networking, platforms and software—over a network on demand. Users can provision resources quickly and release them when they are no longer required.

Its principal characteristics are:

1. On-demand self-service.
2. Broad network access.
3. Resource pooling and multi-tenancy.
4. Rapid elasticity and scalability.
5. Measured service and usage-based billing.
6. Virtualization and abstraction of physical resources.
7. Automated provisioning and service management.

For example, an organization may host its website and database on cloud virtual machines and increase capacity during busy periods. Cloud computing reduces the need to own all infrastructure, but requires attention to security, network connectivity and cost management.

## Question 1(b). What are the major technologies that led to cloud computing?

**Answer:**

The major enabling technologies include virtualization, distributed computing, high-speed networks, Internet technologies, web services, SOA, utility computing, cluster and grid computing, distributed storage, automation and multi-tenancy. Virtualization abstracts hardware; distributed computing spreads processing across machines; networking connects users and data centres; web services provide standard interfaces; utility computing provides measured consumption; and automation manages provisioning and scaling. Together, these technologies make shared, elastic and remotely accessible computing resources practical.

## Question 2(a). What are the main characteristics of a Platform-as-a-Service solution?

**Answer:**

Platform-as-a-Service (PaaS) provides a managed environment in which developers build, test, deploy and operate applications without managing the underlying servers and much of the operating-system layer.

1. **Development tools:** It may provide code editors, SDKs, testing tools and deployment utilities.
2. **Managed runtime:** Applications run on a provider-managed language runtime or application server.
3. **Middleware and services:** Databases, messaging, authentication or caching may be integrated.
4. **Automatic provisioning:** The platform creates and manages required runtime resources.
5. **Scalability:** The platform may add or remove capacity according to workload.
6. **Team collaboration:** Several developers can work with shared tools and environments.
7. **Usage-based pricing:** Charges may depend on resources, application activity or service tier.
8. **Provider maintenance:** The provider manages infrastructure, runtime patches and platform updates.

**Advantages:** Faster development, reduced infrastructure work and standardized deployment. **Limitations:** Less control over the underlying environment, platform restrictions and possible vendor lock-in.

## Question 2(b). Explain briefly about components of an IaaS-based solution for cloud computing.

**Answer:**

An IaaS solution supplies basic computing infrastructure as virtual resources.

1. **Physical data-centre layer:** Servers, storage devices, switches, routers, power and cooling.
2. **Virtualization layer:** Hypervisors divide physical resources into virtual machines and virtual devices.
3. **Compute service:** Provides instances with configurable CPU, memory and operating-system images.
4. **Storage service:** Provides block, object or file storage for operating systems and application data.
5. **Networking service:** Provides virtual networks, subnets, IP addresses, routing, firewalls and load balancing.
6. **Management and orchestration:** Creates, monitors, scales and removes resources through a portal or API.
7. **Identity and security:** Authentication, access control, key management and security policies protect resources.
8. **Metering and billing:** Measures resource usage for reporting and charging.

The provider normally manages physical infrastructure, while the customer manages the guest OS, application, data and many security configurations.

## Question 3(a). Explain briefly about Amazon EC2 and Google App Engine with examples.

**Answer:**

Amazon EC2 and Google App Engine illustrate two different cloud service approaches.

### Amazon EC2 — IaaS

EC2 provides virtual machine instances. The customer selects an instance size and machine image, launches the VM, configures the operating system, installs software and manages the application. It offers more control over the software environment but also more administration responsibility.

**Example:** A company launches two Linux instances, installs a web server and application, connects them to storage and increases the instance count when visitor traffic grows.

### Google App Engine — PaaS

Google App Engine is an example of a managed application platform. Developers deploy application code to a supported runtime while the platform handles much of the server provisioning, runtime management and scaling.

**Example:** A developer uploads a web application and configures its runtime. The platform manages the hosting environment and adjusts resources according to demand, subject to platform limits.

### Comparison

| EC2 | App Engine |
|---|---|
| IaaS | PaaS |
| Customer manages guest OS and runtime | Provider manages runtime/platform |
| Greater environment control | Less infrastructure control |
| Suitable for custom system software | Suitable for applications fitting platform capabilities |

## Question 3(b). Explain briefly about cloud computing security architecture.

**Answer:**

Cloud security architecture is the arrangement of policies, controls and technologies used to protect cloud infrastructure, applications, identities and data.

1. **Governance and policy:** Defines security responsibilities, acceptable use, risk management and compliance requirements.
2. **Identity and access management:** Authentication, authorization, MFA, role-based access and least privilege control access.
3. **Physical security:** Data centres use controlled entry, surveillance, power protection and environmental safeguards.
4. **Network security:** Firewalls, segmentation, secure gateways, VPNs and traffic monitoring protect communication.
5. **Host and virtualization security:** Hypervisors, hosts and guest systems must be hardened and patched.
6. **Application security:** Secure development, testing, API authentication and vulnerability management reduce application risk.
7. **Data security:** Encryption at rest and in transit, key management, backup and secure deletion protect information.
8. **Monitoring and incident response:** Logs, alerts, vulnerability scans and response procedures help detect and handle attacks.

Cloud security follows a shared-responsibility approach: the provider secures the cloud infrastructure, while the customer remains responsible for many identities, data and service configurations. The exact division depends on IaaS, PaaS or SaaS.

## Question 4(a). Explain briefly the evolution from the MSP model to cloud computing.

**Answer:**

The Managed Service Provider (MSP) model developed when organizations began outsourcing IT operations such as hosting, network management, backup and maintenance to specialized service providers.

1. **Traditional in-house IT:** Organizations bought and managed their own hardware and software.
2. **Outsourcing and MSP:** External providers began managing specific systems and services remotely under service agreements.
3. **Hosted services:** Providers hosted applications and infrastructure for customers in data centres.
4. **Virtualization:** Physical servers were divided into multiple virtual machines, improving utilization and flexibility.
5. **Automation:** Provisioning, monitoring and configuration became software-driven.
6. **Internet-based delivery:** Customers accessed resources through web portals and APIs.
7. **Resource pooling and multi-tenancy:** Standardized infrastructure served multiple customers with logical isolation.
8. **Cloud service models:** These developments enabled IaaS, PaaS and SaaS with rapid provisioning, elasticity and measured usage.

**Conclusion:** Cloud computing evolved from managed and hosted IT services by adding virtualization, automation, resource pooling, self-service and elastic delivery.

## Question 4(b). Explain briefly the basic approach to a data-centre-based SOA.

**Answer:**

A data-centre-based SOA organizes business application functions as reusable services hosted in a data centre. A basic implementation identifies business functions, defines service interfaces, develops or wraps the functions as services, connects them through standard APIs or messaging, and manages them centrally.

The data centre supplies servers, storage, networking, virtualization and power/cooling. A service gateway or middleware handles requests, while orchestration combines multiple services into a business process. Identity management, authorization, monitoring, logging, backup and load balancing support secure and reliable operation.

For example, an online order process may call separate inventory, payment, delivery and notification services. SOA promotes reuse and loose coupling, but requires governance, version control, security and performance management.

## Question 5(a). List and discuss different types of virtualization.

**Answer:**

1. **Hardware/server virtualization:** A hypervisor divides a physical server into multiple virtual machines, each with its own guest OS.
2. **Operating-system-level virtualization:** Isolated containers share the host OS kernel but run separate application environments.
3. **Storage virtualization:** Several physical storage devices are combined into logical storage pools or volumes.
4. **Network virtualization:** Logical networks, virtual switches, routers and firewalls are created independently of the physical network layout.
5. **Memory virtualization:** Physical memory is abstracted and allocated to virtual machines or applications as virtual memory.
6. **Desktop virtualization:** Desktop environments are hosted centrally and accessed remotely.
7. **Application virtualization:** Applications run in isolated or managed environments without conventional local installation.
8. **Data virtualization:** Data from different sources is presented through a common logical view without necessarily copying all data into one repository.

Virtualization improves utilization, flexibility and isolation. Its success depends on correct resource allocation, monitoring and security.

## Question 5(b). What is virtualization and what are its benefits?

**Answer:**

Virtualization is the creation of a logical or virtual version of a computing resource—such as a server, operating system, storage device, network or desktop—using software abstraction. In server virtualization, a hypervisor allows multiple VMs to share one physical host.

**Benefits:**

- Better utilization of physical hardware.
- Server consolidation and reduced equipment cost.
- Isolation between guest environments.
- Rapid provisioning from VM templates.
- Flexible resource allocation and scaling.
- Easier testing of different operating systems.
- VM migration and improved maintenance flexibility.
- Simplified backup and disaster recovery when supported by a complete plan.

Virtualization can also introduce hypervisor, isolation and resource-contention risks, so management and security controls are essential.

## Question 6(a). Explain briefly about mobile operating systems for smartphones with examples.

**Answer:**

A mobile operating system manages smartphone hardware and provides services for applications and users. It controls the processor, memory, storage, display, camera, sensors, wireless communication, security and user interface.

### Examples

1. **Android:** A mobile operating system based on the Linux kernel and an application framework. It supports application execution, device services, notifications, permissions and connectivity. It is used by many device manufacturers.
2. **iOS (iPhone):** Apple's mobile operating system, designed for iPhone hardware. It provides a controlled application environment, security permissions, touch interface and integration with Apple's services.
3. **Windows Mobile / Windows Phone:** Historical Microsoft mobile platforms that offered a mobile user interface and integration with Microsoft services. They are relevant as syllabus-era examples, not as a recommendation for a current smartphone purchase.

### Main functions

Process and memory management, file management, user interface, application lifecycle, network communication, device drivers, power management and security controls.

## Question 6(b). What are the differences between Public Cloud and Private Cloud? Explain with the help of a diagram.

**Answer:**

A public cloud is operated by a provider and offers resources to multiple customers over a network. A private cloud is dedicated to one organization and may be managed internally or by a third party.

```text
Public Cloud                         Private Cloud
Users of many organizations           Users of one organization
          |                                    |
   Internet / Provider                    Private network
          |                                    |
 Shared provider resource pool           Dedicated cloud environment
```

| Basis | Public cloud | Private cloud |
|---|---|---|
| Users | Multiple organizations | One organization |
| Ownership | Provider-owned/operated infrastructure | Dedicated to one organization |
| Initial cost | Usually lower | Usually higher |
| Control | Less physical control | Greater control |
| Scalability | Large shared capacity | Depends on dedicated capacity |
| Security | Logical tenant isolation and shared responsibility | Greater policy control, but organization manages more security |
| Maintenance | Provider manages physical infrastructure | Internal team or contracted operator |

Public cloud is attractive for elasticity and lower initial cost. Private cloud is useful for workloads requiring dedicated resources or greater control. A hybrid design may combine the two.

## Question 7(a). What are the advantages and disadvantages of using cloud computing?

**Answer:**

### Advantages

1. Lower initial hardware investment.
2. Pay-as-you-use pricing.
3. Rapid provisioning and deployment.
4. Elastic scaling according to demand.
5. Access from different locations and devices.
6. Provider-managed hardware and some maintenance tasks.
7. Backup, replication and disaster-recovery options.
8. Better collaboration through shared applications.

### Disadvantages

1. Dependence on reliable Internet connectivity.
2. Security and privacy risks if access or configuration is weak.
3. Service outages at the provider or network level.
4. Vendor lock-in and difficulty moving data or applications.
5. Unpredictable charges if usage is not monitored.
6. Less control over physical infrastructure.
7. Compliance and data-location concerns.
8. Migration and integration complexity.

**Conclusion:** Cloud computing can reduce cost and increase flexibility, but the organization must assess security, availability, portability and total cost before adoption.

## Question 7(b). Explain briefly about KVM and virtualization benefits.

**Answer:**

KVM (Kernel-based Virtual Machine) is a Linux virtualization technology that enables a Linux kernel to run virtual machines using processor hardware virtualization support. Each guest VM is managed as a process, with virtual CPU, memory and devices. QEMU is commonly used with KVM for device emulation and VM execution.

**Benefits of KVM:**

- Open-source technology and close Linux integration.
- Support for multiple guest operating systems.
- Hardware-assisted virtualization.
- Flexible CPU and memory allocation.
- Suitable for data centres and private-cloud platforms.
- Can be managed through command-line tools and cloud-management platforms.

General virtualization benefits include server consolidation, improved hardware utilization, isolation, rapid provisioning, portability, test environments and improved recovery options. Secure operation requires patched hosts, protected management access and VM isolation.

---

# 2022 Annual Examination

## Question 1(a). Define cloud computing. Differentiate between private and public cloud development models in terms of cost control and security.

**Answer:**

Cloud computing provides shared computing resources such as servers, storage, networks and applications over a network on demand. Resources can be provisioned and released rapidly with limited management effort.

| Basis | Public cloud | Private cloud |
|---|---|---|
| Cost | Lower initial investment; usage-based charges | Higher setup and operation cost; dedicated capacity |
| Cost control | Flexible, but usage can produce unexpected bills | More direct control over capacity and infrastructure budget |
| Security control | Provider and customer share responsibility; logical isolation is important | Organization has greater control over architecture and policies |
| Management | Provider manages physical infrastructure | Organization or contracted operator manages dedicated cloud |
| Scalability | Large shared resource pool | Limited by dedicated capacity and investment |
| Suitable use | Variable workloads and general applications | Sensitive or specialized workloads needing greater control |

Neither model is automatically secure. Public-cloud security depends on provider controls and customer configuration; private-cloud security depends on the organization's people, technology and processes. A hybrid model may balance control and flexibility.

## Question 1(b). Explain the advantages and disadvantages of using cloud computing.

**Answer:**

**Advantages:** lower capital expenditure, usage-based pricing, quick resource provisioning, scalability, anywhere access, provider-managed physical infrastructure, collaboration and access to backup or recovery facilities.

**Disadvantages:** dependence on network connectivity, security and privacy concerns, provider outages, less control over physical systems, vendor lock-in, data migration difficulties, regulatory concerns and costs that may rise if usage is not monitored.

**Conclusion:** Cloud computing is beneficial when its service model matches the organization's workload and when security, cost and continuity are planned carefully.

## Question 2(a). Define data security. What are the different security threats associated with cloud computing?

**Answer:**

Data security means protecting information against unauthorized access, disclosure, alteration, destruction or loss throughout its lifecycle. It aims to preserve confidentiality, integrity and availability.

### Cloud security threats

1. **Data breach:** Unauthorized access exposes confidential information.
2. **Data loss:** Deletion, corruption, ransomware or hardware failure makes data unavailable.
3. **Account hijacking:** Stolen credentials allow an attacker to control a cloud account.
4. **Insecure interfaces and APIs:** Weak authentication or poor validation may expose services.
5. **Malicious insiders:** Authorized employees or contractors may misuse access.
6. **DoS attacks:** Excessive traffic can make services unavailable.
7. **Multi-tenancy risks:** Shared infrastructure can create isolation problems if a platform has a vulnerability.
8. **Misconfiguration:** Public storage or excessive permissions can expose data.
9. **Weak encryption/key management:** Data may be disclosed if encryption is absent or keys are poorly protected.
10. **Compliance risks:** Incorrect data location, retention or access handling can violate requirements.

Security measures include encryption, IAM, MFA, least privilege, secure APIs, network segmentation, monitoring, backups and incident response.

## Question 2(b). What is security governance? What are the layers in security architecture design? Explain briefly.

**Answer:**

**Security governance** is the framework of leadership, policies, responsibilities and processes used to direct and monitor information security. It ensures that cloud security supports organizational goals and manages business, legal and technical risks.

### Main elements of governance

- Security policies and standards.
- Defined responsibilities between provider and customer.
- Risk assessment and treatment.
- Compliance and audit management.
- Security awareness and training.
- Incident response and continuity planning.
- Review of service providers and service-level agreements.

### Layers of a cloud security architecture

1. **Physical layer:** Protects buildings, servers, power, cooling and physical access.
2. **Network layer:** Uses firewalls, segmentation, secure gateways, VPNs and traffic monitoring.
3. **Host/virtualization layer:** Secures hypervisors, host OS, VM isolation and patches.
4. **Application layer:** Uses secure coding, authentication, API protection and vulnerability testing.
5. **Data layer:** Protects information through classification, encryption, backup, access controls and retention rules.
6. **Identity layer:** Manages identities, authentication, authorization and privileged access.
7. **Management and governance layer:** Monitors logs, configuration, compliance, risk and incident response across all layers.

These layers work together; a weakness in one layer can affect the security of the entire cloud environment.

## Question 3(a). What are the different cloud service models? Explain with suitable examples.

**Answer:**

1. **Infrastructure-as-a-Service (IaaS):** Provides virtual machines, storage and networking. The customer manages the operating system and applications. Example: Amazon EC2.
2. **Platform-as-a-Service (PaaS):** Provides a managed runtime, development tools and middleware. Developers deploy applications without managing the underlying servers. Example: Google App Engine.
3. **Software-as-a-Service (SaaS):** Provides a complete hosted application through a browser or client. Example: hosted email or online office software.
4. **Communication-as-a-Service (CaaS):** Provides hosted communication functions such as voice, video and messaging.
5. **Monitoring-as-a-Service (MaaS):** Provides hosted monitoring of infrastructure, applications, logs or performance.

IaaS gives the customer more control but more administration work. PaaS reduces infrastructure management. SaaS gives a ready-to-use application. CaaS and MaaS provide specialized service capabilities.

## Question 3(b). What is open-source software? How does it differ from traditional software? Explain its advantages.

**Answer:**

Open-source software is software distributed under a licence that allows users to access, use, study, modify and redistribute the source code according to the licence conditions.

| Open-source software | Traditional proprietary software |
|---|---|
| Source code is available under an open-source licence | Source code is usually restricted |
| Modification is allowed under licence terms | Modification is generally controlled by vendor terms |
| Community may contribute improvements | Development is controlled by vendor or contracted team |
| Redistribution is permitted under licence | Redistribution is restricted by licence |
| Support may come from community or commercial vendors | Support is generally vendor-provided |

**Advantages:** flexibility, customization, inspectability, community innovation, reduced dependence on a single vendor and possible savings in licence costs. However, deployment, support, training, hosting and maintenance may still require expenditure. Open source does not automatically mean secure or free of defects; it still needs review, patching and proper configuration.

## Question 4(a). What is virtualization in cloud computing? Discuss software and software virtualization briefly.

**Answer:**

**Question wording note:** The 2022 paper scan appears to repeat the word “software” in the phrase “software and software virtualization.” The CS642 Module V syllabus explicitly lists “Hardware & Software Virtualization”; therefore, the second occurrence is interpreted here as **hardware virtualization**. This is a stated assumption, not a silent change to the source question.

Virtualization is the abstraction of physical computing resources into logical resources. It allows several isolated environments to share the same physical hardware.

### Hardware virtualization

A hypervisor creates and manages virtual machines on a physical computer. Each VM receives virtual CPU, memory, storage and network devices and can run its own guest operating system.

- **Type I hypervisor:** Runs directly on physical hardware.
- **Type II hypervisor:** Runs as an application on a host operating system.

### Software virtualization

Software or application virtualization provides an isolated or abstracted software environment. An application may run in a managed runtime, container or virtualized application environment without depending directly on the host's full software configuration. Operating-system-level containers share the host kernel but isolate processes and resources.

### Benefits

Improved utilization, consolidation, isolation, portability, faster provisioning and easier testing. **Risks:** hypervisor vulnerabilities, weak isolation, resource contention and configuration errors.

## Question 4(b). Explain mobile operating systems. List features of mobile operating systems for smartphones.

**Answer:**

A mobile operating system controls smartphone hardware and provides the platform on which mobile applications run. Examples include Android, iOS and the historical Windows Mobile platform.

### Features

1. Touch-based graphical user interface.
2. Process and memory management for multiple applications.
3. Application installation, execution and lifecycle management.
4. Wireless connectivity through mobile networks, Wi-Fi and Bluetooth.
5. File and storage management.
6. Access to camera, GPS, sensors, microphone and other hardware.
7. Notifications and background services.
8. Security features such as screen lock, application permissions, sandboxing and encryption support.
9. Power and battery management.
10. Synchronization and cloud-service integration.

A mobile OS provides a consistent environment for users and developers while managing limited battery, memory and processing resources.

## Question 5(a). What is public cloud? How is public cloud better over private cloud?

**Answer:**

A public cloud is a cloud environment owned or operated by a service provider that offers computing resources to multiple customers over a network. The provider maintains the physical infrastructure, while customers use logically isolated resources.

**Advantages over private cloud in suitable cases:**

1. Lower initial investment because the customer does not build a dedicated data centre.
2. Pay-as-you-use pricing can match variable workloads.
3. Rapid provisioning of compute, storage and network resources.
4. Large resource pools can support rapid scaling.
5. Provider manages physical equipment and data-centre facilities.
6. Global service regions may make it easier to serve distributed users.
7. Small organizations can access advanced infrastructure without owning it.

**Important qualification:** Public cloud is not always better. Private cloud may be preferable where dedicated control, special compliance or predictable workloads justify the cost. Public-cloud security still requires correct customer configuration and IAM.

## Question 5(b). What is virtual machine migration? Why is it needed in cloud computing?

**Answer:**

Virtual machine migration is the process of moving a VM from one physical host to another. The VM's execution state, memory, storage and network connections are transferred or made available at the destination.

### Types

- **Cold migration:** The VM is stopped before it is moved.
- **Live migration:** The VM continues running while its memory and state are transferred, with a short interruption during final switchover.
- **Storage migration:** Virtual disks are moved or copied to another storage location.

### Why migration is needed

1. **Load balancing:** Move VMs away from overloaded hosts.
2. **Hardware maintenance:** Evacuate VMs before repairing or replacing a host.
3. **Energy efficiency:** Consolidate VMs onto fewer hosts during low demand.
4. **Fault avoidance:** Move workloads away from a host showing failure warnings.
5. **Performance:** Place VMs closer to required storage or network resources.
6. **Data-centre management:** Reorganize resources without permanently stopping services.
7. **Disaster recovery:** Move workloads to another site when the original site is at risk.

Migration requires compatible hosts, sufficient destination resources, network connectivity and protection of migration traffic.

## Question 6(a). What is KVM? Explain KVM briefly and mention the difference between KVM and VM.

**Answer:**

**KVM (Kernel-based Virtual Machine)** is a Linux kernel virtualization technology that enables Linux to act as a hypervisor on hardware that supports virtualization. It uses processor virtualization extensions and commonly works with QEMU for device emulation.

### Working

The KVM kernel modules expose virtualization capabilities. A VM is created with virtual CPU, memory and devices. The host Linux kernel schedules VM execution and manages physical resources.

### KVM versus VM

| KVM | VM |
|---|---|
| A virtualization technology/hypervisor facility | A virtual machine is an individual virtual computer |
| Manages VM execution using host hardware | Runs a guest OS and applications |
| Provides the virtualization mechanism | Is the virtual environment created by the mechanism |
| Example: KVM on Linux | Example: a Linux guest VM running on KVM |

KVM is not itself a VM. It is one technology used to create and run VMs. Benefits include hardware-assisted execution, Linux integration and open-source availability.

## Question 6(b). Discuss the different security recommendations in virtualization briefly.

**Answer:**

1. Keep hypervisors and host operating systems patched.
2. Restrict management interfaces to trusted networks.
3. Use MFA and role-based access for administrators.
4. Apply least privilege and remove unused accounts.
5. Separate VM networks using segmentation and firewall rules.
6. Use trusted VM images and scan templates before deployment.
7. Patch guest operating systems and applications.
8. Encrypt sensitive VM disks, backups and migration traffic.
9. Monitor host, hypervisor, VM and virtual-network logs.
10. Maintain independent backups and test recovery.
11. Control VM creation and remove unused VMs to prevent VM sprawl.
12. Limit resource consumption to reduce denial-of-service effects between VMs.

These recommendations protect the hypervisor, guest systems, management plane and data. Virtualization security must be managed as a complete environment.

## Question 7(a). Define data breach. Explain IAM briefly.

**Answer:**

A **data breach** is an incident in which confidential or protected information is accessed, disclosed, copied, altered or stolen by an unauthorized person or process. It may occur because of stolen credentials, misconfiguration, malware, insider misuse or a software vulnerability.

**Identity and Access Management (IAM)** controls who can access cloud resources and what actions they can perform.

Main IAM functions:

1. Identification of users, services and devices.
2. Authentication through passwords, tokens, certificates or MFA.
3. Authorization through roles, policies and permissions.
4. Least-privilege access.
5. Account provisioning and removal.
6. Privileged-access management.
7. Access logs, audits and periodic reviews.

IAM reduces the risk of unauthorized access. It should be combined with encryption, secure APIs, monitoring, backups and an incident-response plan.

## Question 7(b). Compare Monitoring-as-a-Service and Platform-as-a-Service in detail.

**Answer:**

| Basis | MaaS | PaaS |
|---|---|---|
| Full form | Monitoring-as-a-Service | Platform-as-a-Service |
| Purpose | Monitor systems, networks, applications or services | Build, test, deploy and run applications |
| Main features | Metrics, logs, dashboards, alerts and reports | Runtime, middleware, development tools and deployment environment |
| User | Operations teams and administrators | Application developers |
| Output | Visibility into performance, health and events | A running application platform |
| Customer work | Choose metrics, define alerts and respond to incidents | Write application code, manage data and configure application |
| Example | Hosted infrastructure monitoring service | Managed application runtime |

MaaS helps maintain visibility and operational control. PaaS helps developers focus on application development rather than infrastructure management. They can be used together: an application deployed on PaaS may be monitored through MaaS.

## Question 8(a). Explain cluster computing, grid computing and cloud computing in detail with suitable examples.

**Answer:**

### Cluster computing

A cluster is a group of computers connected through a high-speed network and coordinated to work as one system for a particular purpose. Cluster nodes are usually managed within one organization or location. **Example:** A university computing cluster processes scientific workloads across several servers.

### Grid computing

Grid computing coordinates distributed and possibly heterogeneous resources belonging to different administrative domains to solve large problems. Resources may be geographically separated and shared through middleware. **Example:** Multiple research institutions combine computing resources for a scientific simulation.

### Cloud computing

Cloud computing provides configurable computing resources as services over a network, with on-demand self-service, resource pooling, elasticity and measured usage. **Example:** A company rents virtual machines and storage from a cloud provider to host its application.

| Basis | Cluster | Grid | Cloud |
|---|---|---|---|
| Resource location | Often one site | Geographically distributed | Provider data centres or distributed locations |
| Administration | Usually one organization | Multiple organizations | Cloud provider and customer share responsibilities |
| Main goal | Performance/availability | Resource sharing and large-scale computation | Service delivery and elastic resource access |
| Provisioning | Cluster scheduler | Grid middleware | Portal/API/self-service |
| Billing | Often internal allocation | Depends on collaboration | Commonly metered or subscription-based |

They are related but not identical. A cloud may use clusters and distributed systems internally, while grids focus on coordinated resource sharing.

## Question 8(b). What is a cloud data centre? Explain the basic approach to a data-centre-based SOA.

**Answer:**

A **cloud data centre** is a facility containing servers, storage systems, networking equipment, power, cooling, physical security and management systems used to deliver cloud services. It may host virtual machines, applications, databases and distributed storage.

### Main infrastructure

- Compute servers and virtualization hosts.
- Storage systems and backup facilities.
- Routers, switches, firewalls and load balancers.
- Redundant power, cooling and fire protection.
- Monitoring, access control and operational management.

### Data-centre-based SOA approach

1. Identify reusable business functions.
2. Define service interfaces and contracts.
3. Implement or wrap applications as services.
4. Host services on managed data-centre infrastructure.
5. Connect services through APIs or message middleware.
6. Orchestrate services into complete workflows.
7. Apply IAM, logging, monitoring, backup and load balancing.

For example, a purchase workflow can call inventory, payment and shipping services. SOA improves reuse and integration, while the data centre provides reliable hosting. Governance and security are required to manage service dependencies.

---

# 2021 Annual Examination

## Question 1(a). What is cloud computing? Discuss the emergence of cloud computing.

**Answer:**

Cloud computing is a model that delivers computing resources such as processing, storage, networking, platforms and applications over a network on demand. Users can provision resources quickly and pay according to usage or subscription.

### Emergence

1. **Mainframe and time-sharing systems:** Many users shared expensive central computers through terminals.
2. **Client-server computing:** Processing and data management were divided between client machines and servers.
3. **Distributed computing:** Connected computers cooperated to perform tasks and share resources.
4. **Cluster computing:** Multiple computers were combined for improved performance and availability.
5. **Grid computing:** Distributed resources across organizations were coordinated for large tasks.
6. **Virtualization:** Multiple virtual systems could share physical servers, improving utilization and flexibility.
7. **Internet and web services:** High-speed connectivity and standard APIs made remote service delivery practical.
8. **Utility computing and automation:** Providers began offering metered computing capacity and automated provisioning.

These developments led to modern IaaS, PaaS and SaaS models. Cloud computing combines distributed resources, virtualization, Internet access, resource pooling and measured service.

## Question 1(b). Classify the different types of cloud. Why should one prefer public clouds over private cloud?

**Answer:**

Cloud deployment models are commonly classified as:

1. **Public cloud:** Infrastructure is operated by a provider and used by multiple customers with logical isolation.
2. **Private cloud:** Cloud infrastructure is dedicated to one organization and may be managed internally or externally.
3. **Community cloud:** Infrastructure is shared by organizations with common requirements, such as security or compliance needs.
4. **Hybrid cloud:** Combines two or more distinct cloud environments with connectivity and some portability or data/application integration.

### Why prefer public cloud in suitable cases?

- Lower initial capital investment.
- Pay-as-you-use pricing.
- Quick resource provisioning.
- Large resource pool and elastic scaling.
- Provider-managed physical infrastructure.
- Access to services without building a private data centre.
- Useful for variable demand, development and test environments.

Public cloud is not always the best choice. Private cloud may be preferable for dedicated control or specialized requirements. The selection should consider security, cost, compliance, workload and operational capability.

## Question 2(a). What is Infrastructure-as-a-Service? Explain Amazon EC2 in detail.

**Answer:**

Infrastructure-as-a-Service (IaaS) provides virtual computing resources such as machines, storage and networks over a network. Customers rent infrastructure and manage the guest operating system and applications.

**Amazon EC2 (Elastic Compute Cloud)** is an example of IaaS. It provides virtual server instances that users can launch and configure.

### Main features

1. **Instances:** Virtual servers with selected processing and memory capacity.
2. **Machine images:** Templates containing an operating system and required software.
3. **Storage:** Persistent block storage and other storage options support application data.
4. **Networking:** Virtual networks, IP addresses, routing and security rules connect instances.
5. **Elasticity:** Users can add or remove instances as demand changes.
6. **Monitoring:** Resource usage and instance status can be monitored.
7. **Automation:** APIs and scripts can create, configure and terminate instances.

**Example:** A company launches an EC2 instance, installs a web server and deploys its website. It can create additional instances during a traffic spike.

The provider manages physical infrastructure; the customer remains responsible for the guest OS, application, data and many security configurations.

## Question 2(b). Mention advantages and disadvantages of the cloud computing model as compared to conventional computing with proper justification.

**Answer:**

### Advantages over conventional in-house computing

1. Lower initial investment in servers and data-centre equipment.
2. Faster provisioning of resources.
3. Elastic scaling according to demand.
4. Pay-as-you-use cost model.
5. Remote access and collaboration.
6. Provider-managed physical infrastructure and hardware maintenance.
7. Access to backup, replication and recovery options.

### Disadvantages

1. Dependence on Internet connectivity and provider availability.
2. Data security and privacy concerns.
3. Less direct control over physical infrastructure.
4. Vendor lock-in and migration challenges.
5. Usage charges may become high if resources are not monitored.
6. Compliance and data-location issues.
7. Integration with legacy applications may be complex.

**Justification:** Conventional computing may provide direct control and predictable local access, but requires capital, maintenance and capacity planning. Cloud computing is flexible and fast, but requires careful provider selection, security design and cost governance. The best choice depends on workload and organizational needs.

## Question 3(a). What do you mean by Platform-as-a-Service in cloud? List companies which provide these services.

**Answer:**

Platform-as-a-Service (PaaS) provides a managed application development and deployment environment over a network. It includes runtime environments, middleware, development tools and often managed databases or messaging services. Developers focus on application code rather than managing physical servers and much of the operating system.

### Characteristics

- Managed runtime and middleware.
- Development, testing and deployment tools.
- Web/API-based provisioning.
- Automatic or policy-based scaling.
- Integration with databases and other services.
- Provider-managed platform maintenance.

**Examples of providers/platforms:** Google App Engine, Microsoft Azure App Service, Salesforce Platform and Heroku are examples of PaaS offerings or platforms. Availability and exact product names can change over time; these examples illustrate the PaaS model.

**Advantages:** Faster development, reduced infrastructure administration, collaboration and scalability. **Limitations:** Platform restrictions, less control over runtime configuration and possible vendor lock-in.

## Question 3(b). What risks are associated with cloud computing? Explain multi-tenancy with respect to different cloud environments.

**Answer:**

### Risks

- Data breach or loss.
- Account hijacking and weak identity controls.
- Insecure APIs and management interfaces.
- Malicious insiders.
- Denial-of-service attacks.
- Misconfigured storage or network rules.
- Compliance and data-location issues.
- Provider outage and vendor lock-in.
- Shared-technology vulnerabilities.

### Multi-tenancy

Multi-tenancy means that a cloud provider serves multiple customers using shared physical infrastructure or a common application platform while keeping each customer's data and access logically separated.

**Public cloud:** Multi-tenancy is common; several customers share pooled infrastructure. Isolation is enforced through virtualization, access controls and network/storage separation.

**Private cloud:** The environment is dedicated to one organization, but it may still have internal multi-tenancy—for example, separate departments or projects sharing the private cloud.

**Community cloud:** Several organizations with shared requirements may use common infrastructure with separate accounts, data boundaries and policies.

**Hybrid cloud:** Workloads may be divided between private and public environments. Identity, network and data controls must remain consistent across them.

Multi-tenancy improves utilization and cost efficiency but makes isolation, access control, patching and monitoring essential.

## Question 4(a). Explain virtualization in cloud. Discuss storage virtualization.

**Answer:**

Virtualization abstracts physical resources and presents them as logical resources. In cloud computing, it allows multiple virtual machines or services to share a physical infrastructure while remaining logically separated.

### General virtualization

A hypervisor manages virtual machines and allocates CPU, memory, storage and network devices. Virtualization improves utilization, flexibility, provisioning and workload isolation.

### Storage virtualization

Storage virtualization combines multiple physical storage devices or arrays into a logical storage pool. Users and applications access logical volumes or storage services without needing to know the exact physical disk location.

**Working:** Storage management software maps logical storage addresses to physical devices, manages allocation and may support replication, snapshots and migration.

**Types:**

- **Block virtualization:** Presents logical block volumes to servers.
- **File virtualization:** Provides a unified view of files stored on multiple systems.
- **Object storage abstraction:** Presents data as objects with identifiers and metadata.

**Benefits:** Centralized management, better utilization, easier expansion, simplified migration and data availability options. **Challenges:** Management complexity, performance bottlenecks and the need to protect metadata and access controls.

## Question 4(b). Differentiate between Type-I and Type-II hypervisors.

**Answer:**

A hypervisor is software that creates and manages virtual machines.

| Basis | Type-I hypervisor | Type-II hypervisor |
|---|---|---|
| Installation | Runs directly on physical hardware | Runs on top of a host operating system |
| Also called | Bare-metal hypervisor | Hosted hypervisor |
| Layers | Hardware → hypervisor → guest VMs | Hardware → host OS → hypervisor application → guest VMs |
| Performance | Usually lower overhead | Additional host-OS layer may add overhead |
| Usage | Servers and data centres | Desktop testing, learning and development |
| Management | Manages hardware resources directly | Depends partly on host OS facilities |
| Examples | VMware ESXi, Microsoft Hyper-V in its bare-metal role, Xen | Oracle VirtualBox, VMware Workstation |

Type-I is generally preferred for production server virtualization because it runs directly on hardware. Type-II is convenient for desktop users who need to run another operating system as an application.

## Question 5(a). Define SOA. How does SOA help to promote cloud computing?

**Answer:**

**Service-Oriented Architecture (SOA)** is a software design approach in which application functions are organized as reusable, loosely coupled services that communicate through well-defined interfaces.

### Main principles

1. Services have clearly defined interfaces or contracts.
2. Services are loosely coupled and avoid unnecessary dependence on internal implementation.
3. Services can be reused by multiple applications.
4. Standard protocols and message formats support interoperability.
5. Services can be composed into larger business processes.

### How SOA promotes cloud computing

- Cloud services expose functionality through standard APIs.
- Reusable services support service composition.
- Loose coupling makes it easier to replace or scale components.
- Network-based service access fits cloud delivery.
- Service catalogues and orchestration support automated provisioning.
- Enterprise applications can integrate with hosted services.

**Example:** An online shopping application may call separate customer, payment, inventory and delivery services. Cloud infrastructure hosts and scales these services. SOA is an architectural foundation that supports service-based cloud applications, although SOA alone is not cloud computing.

## Question 5(b). What is a Data Centre? Explain infrastructure requirements for establishing a modern data centre.

**Answer:**

A data centre is a facility that houses computing, storage and networking equipment used to process, store and distribute information.

### Infrastructure requirements

1. **Building and space:** Adequate floor area, equipment racks, cable pathways and controlled access.
2. **Power supply:** Reliable utility power, UPS systems, generators and redundant distribution.
3. **Cooling:** HVAC and airflow management to maintain safe operating temperatures.
4. **Compute infrastructure:** Servers, processors, memory and virtualization hosts.
5. **Storage:** Storage arrays, backup systems and suitable data-protection technology.
6. **Networking:** Routers, switches, firewalls, load balancers and redundant links.
7. **Physical security:** Access cards, guards, CCTV, alarms and visitor controls.
8. **Fire and environmental protection:** Fire detection/suppression, water-leak detection and environmental monitoring.
9. **Operations and monitoring:** Network monitoring, server management, logging and maintenance procedures.
10. **Business continuity:** Backup, disaster recovery and redundant components.
11. **Scalability and efficiency:** Modular design, capacity planning and efficient power/cooling use.

A modern data centre must provide availability, security, performance, manageability and the ability to expand.

## Question 6(a). Explain how data security is ensured in cloud computing.

**Answer:**

Cloud data security protects information against unauthorized disclosure, modification, destruction and loss. It requires controls at data, application, network, identity and infrastructure levels.

1. **Data classification:** Identify confidential, sensitive and public information and apply suitable controls.
2. **Encryption at rest:** Encrypt stored files, databases, disks and backups.
3. **Encryption in transit:** Use secure communication protocols to protect data over networks.
4. **Key management:** Restrict access to encryption keys, rotate them where required and protect recovery procedures.
5. **IAM:** Use MFA, role-based access and least privilege.
6. **Tenant isolation:** Ensure customers cannot access each other's data.
7. **Backup and recovery:** Maintain independent backups and test restoration.
8. **Monitoring and auditing:** Record access, configuration changes and unusual activity.
9. **Secure deletion and retention:** Follow data-retention rules and securely dispose of data when no longer required.
10. **Incident response:** Define procedures for detection, containment, investigation and notification.

Cloud data security is a shared responsibility. The provider secures its infrastructure, while customers must correctly configure identities, applications, data and service settings.

## Question 6(b). Explain virtual machine. Why do we need VM migration in cloud computing?

**Answer:**

A **virtual machine (VM)** is a software-based computer that behaves like a physical computer. It has virtual CPU, memory, storage and network devices and runs a guest operating system. A hypervisor manages the VM and shares the physical host's resources among multiple VMs.

### Need for VM migration

1. Balance workload across physical hosts.
2. Perform host maintenance without a long service interruption.
3. Move workloads away from a failing or overloaded server.
4. Consolidate VMs to save energy during low demand.
5. Improve performance by placing a VM closer to required resources.
6. Support disaster recovery and site-level continuity.
7. Reorganize data-centre resources dynamically.

Cold migration moves a stopped VM. Live migration transfers most VM state while it runs and briefly pauses it during final switchover. Migration requires compatible hardware/software, network access and secure transfer of VM state.

## Question 7(a). What is MaaS? Explain MaaS briefly.

**Answer:**

**Monitoring-as-a-Service (MaaS)** is a cloud service model in which monitoring tools and infrastructure are hosted and delivered by a provider. Customers use the service to observe the health, availability, performance and activity of systems or applications.

### Main functions

1. Collects metrics such as CPU, memory, disk and network usage.
2. Collects logs and events from applications and infrastructure.
3. Displays information through dashboards and reports.
4. Sends alerts when thresholds or unusual conditions are detected.
5. Tracks availability and response time.
6. Supports trend analysis and capacity planning.
7. Helps identify faults and performance bottlenecks.

**Example:** An organization uses a hosted dashboard to monitor its cloud servers and receive an alert when CPU utilization remains high.

**Benefits:** Centralized visibility, reduced need to operate monitoring infrastructure, rapid deployment and easier remote monitoring. Customers must still configure meaningful metrics, alert rules and access permissions.

## Question 7(b). Discuss the different types of hardware virtualization. Compare them with their performance.

**Answer:**

Hardware virtualization creates virtual computers on a physical machine. The main techniques are:

1. **Full virtualization:** The hypervisor presents a complete virtual hardware environment so an unmodified guest OS can run. Traditional implementations may use binary translation or hardware support.
2. **Para-virtualization:** The guest OS is modified to cooperate with the hypervisor through hypercalls. This can reduce some virtualization overhead but requires guest OS support.
3. **Hardware-assisted virtualization:** Processor extensions provide support for guest execution and privileged operations, reducing the need for some software techniques.

| Type | Guest OS change | Performance considerations |
|---|---|---|
| Full virtualization | Usually not required | Convenient compatibility; overhead depends on implementation and hardware support |
| Para-virtualization | Usually required | Can reduce overhead for supported operations; requires modified guest or drivers |
| Hardware-assisted | Usually not required | Uses CPU virtualization features and generally provides efficient general-purpose virtualization |

Performance also depends on memory virtualization, I/O, storage, drivers, workload and hypervisor quality. No technique is universally fastest in every workload.

## Question 8(a). Define data breach. Explain IAM briefly.

**Answer:**

A data breach is an incident in which information is accessed, copied, disclosed or modified without authorization. It may result from stolen credentials, misconfigured cloud storage, malware, insider misuse or exploitation of a vulnerability.

IAM controls user and service identities and their permissions. It includes identification, authentication, authorization, account provisioning, role management, least-privilege policies, privileged-access control and auditing. Strong IAM uses MFA, secure credential storage, periodic permission reviews and prompt removal of unused accounts. IAM helps prevent unauthorized access, but must be combined with encryption, monitoring, secure configuration and incident response.

## Question 8(b). What are the problems of using traditional cloud via mobile phones? How can these problems be resolved?

**Answer:**

Using conventional cloud services from a mobile phone can be difficult because smartphones have limited resources and often depend on variable wireless connectivity.

### Problems

1. **Limited bandwidth:** Mobile networks may be slower or congested.
2. **High latency:** Network delay affects remote application response.
3. **Intermittent connectivity:** Movement between cells or weak signal can interrupt access.
4. **Battery limitation:** Continuous network access and computation consume power.
5. **Limited screen and input:** Complex desktop interfaces are difficult to use on small displays.
6. **Resource constraints:** Memory, processor and storage may be limited.
7. **Security risks:** Lost phones, insecure Wi-Fi and weak authentication can expose information.
8. **Data cost:** Large uploads and downloads may consume expensive mobile data.

### Solutions

- Use responsive mobile interfaces and lightweight applications.
- Cache frequently used data locally and synchronize when connectivity returns.
- Compress data and minimize unnecessary network transfers.
- Use efficient protocols and adaptive quality based on bandwidth.
- Apply encryption, screen locks, MFA and remote-wipe capability.
- Use edge processing or mobile-cloud offloading where appropriate.
- Optimize background synchronization and battery consumption.
- Support offline operation for essential tasks.

These measures improve usability, performance, availability and security when accessing cloud services from smartphones.

---

# Final Revision Index — Topics Repeated Across Papers

The following topics recur across multiple years and deserve priority during revision:

| Topic | Where it appears prominently |
|---|---|
| Cloud definition, emergence and characteristics | 2021, 2022, 2023, 2025 |
| Public vs private cloud | 2021, 2022, 2023, 2024 |
| Advantages and disadvantages of cloud | 2021, 2022, 2023, 2025 |
| IaaS | 2021, 2023, 2025 |
| PaaS | 2021, 2023, 2024 |
| SaaS / SaaS implementation | 2024, 2025 |
| CaaS, MaaS and SPI framework | 2022, 2024 |
| Cloud security threats, data security and IAM | 2021, 2022, 2023, 2024 |
| Virtualization, types, benefits and security | 2021, 2022, 2023, 2024, 2025 |
| KVM and virtual machines | 2022, 2023, 2024 |
| VM migration | 2021, 2022 |
| MSP model | 2023, 2024 |
| Data centre and data-centre-based SOA | 2021, 2022, 2023, 2024 |
| Amazon EC2 | 2021, 2023, 2024 |
| Google App Engine | 2021, 2023 |
| Open-source software (general) | 2022, 2024 |
| OpenStack | 2025 |
| Mobile operating systems / mobile cloud | 2021, 2022, 2023 |

## Selected references for the historical IBM case-study examples

- [IBM, *SmartCloud Milestones* (2013)](https://www.ibm.com/cloud-computing/SmartCloudMilestones_060413.pdf).
- [IBM, *SmartCloud Application Services* presentation (2011)](https://www.ibm.com/cloud-computing/us/en/assets/IBMSmartCloud_Application_Services_Presentation.pdf).
- [IBM announcement of SmartCloud services (12 October 2011)](https://www.prnewswire.com/news-releases/ibm-unveils-new-smart-cloud-services-to-give-enterprises-control-of-the-cloud-131582168.html).

## Exam-writing reminders

- For a 7-mark answer, start with a definition, explain 5–8 relevant points, add an example or diagram where useful, and finish with a short conclusion.
- For comparisons, use a table with clear comparison bases.
- For architecture questions, draw a labelled block diagram and explain each block.
- For case-study questions, state requirements, propose an architecture, justify the service/deployment model and mention security and cost controls.
- Do not treat the exam's “Answer any five” instruction as a reason to omit questions from this preparation file.

**Coverage audit:** 75 answer sections were matched against the five supplied annual papers. The 2022 Q4(a) wording issue is explicitly disclosed above; all listed questions and internal choices remain included.

**End of document.**
