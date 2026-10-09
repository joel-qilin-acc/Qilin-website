import type { Service } from "@/types/content";

export const services: Service[] = [
  {
    slug: "development",
    name: "Software development",
    short: "Full-stack product engineering, from MVP to enterprise platform.",
    headline: "Enterprise-grade applications, built to scale",
    subheadline: "Full-stack product engineering for fintech, edtech, healthcare and enterprise teams.",
    intro:
      "We architect and build full-stack applications that power businesses, from rapid MVPs to production systems handling millions of transactions.",
    capabilities: [
      { title: "SaaS platforms", body: "Multi-tenant architectures with subscription management and analytics." },
      { title: "Fintech applications", body: "Payment processing, crypto platforms and trading systems with bank-grade security." },
      { title: "EdTech and LMS", body: "Learning management systems, course platforms and assessment engines." },
      { title: "B2B marketplaces", body: "Procurement platforms, vendor management and multi-sided marketplaces." },
      { title: "Enterprise portals", body: "Internal tools, dashboards, CRM integrations and workflow management." },
      { title: "API development", body: "REST and GraphQL APIs built for performance and security." },
    ],
    stack: ["Next.js", "React", "Express.js", "NestJS", "Django", "Python", "Node.js", "PostgreSQL", "MongoDB", "Redis", "GraphQL"],
    process: [
      { title: "Discovery", body: "Requirements, architecture and a roadmap you can hold us to." },
      { title: "Sprints", body: "Weekly demos in agile sprints, so you see progress every week." },
      { title: "Testing", body: "Unit, integration and end-to-end tests before anything ships." },
      { title: "Launch", body: "Deployment, monitoring and ongoing development after go-live." },
    ],
    proof: [
      { client: "Spend The Bits", slug: "spend-the-bits", text: "Payments platform at 99.9% uptime" },
      { client: "Eduley", slug: "eduley", text: "Secure LMS for thousands of concurrent students" },
      { client: "EcoProcurer", slug: "ecoprocurer", text: "India’s B2B solar marketplace" },
    ],
    cta: { label: "Start a project", href: "/contact" },
  },
  {
    slug: "devops",
    name: "DevOps and cloud",
    short: "Kubernetes migrations, CI/CD and infrastructure that stays up.",
    headline: "DevOps and cloud engineering",
    subheadline: "Infrastructure that scales with your ambition.",
    intro:
      "We design, build and manage cloud infrastructure that delivers 99.9% uptime, absorbs traffic surges and reduces the operational burden on your team.",
    capabilities: [
      { title: "Kubernetes migration and management", body: "Move workloads to Kubernetes with zero downtime, then run the clusters." },
      { title: "CI/CD pipelines", body: "Automated build, test and deploy with quality gates and rollback." },
      { title: "Infrastructure as code", body: "Version-controlled infrastructure with Terraform and Ansible." },
      { title: "Cloud migration", body: "AWS, GCP and Azure migrations with detailed planning and rollback strategies." },
      { title: "Container orchestration", body: "Docker with health checks and auto-healing." },
      { title: "Monitoring and observability", body: "Full-stack visibility with Prometheus, Grafana and the ELK stack." },
    ],
    stack: ["Kubernetes", "Docker", "AWS", "GCP", "Azure", "Terraform", "Ansible", "ArgoCD", "GitHub Actions", "Prometheus", "Grafana", "Helm", "Istio"],
    process: [
      { title: "Assess", body: "A review of your current infrastructure, costs and risks." },
      { title: "Design", body: "A target architecture and a migration plan." },
      { title: "Migrate", body: "Incremental implementation with rollback at every step." },
      { title: "Operate", body: "Monitoring, tuning and on-call, so it keeps working." },
    ],
    proof: [
      { client: "ICS Mobile", slug: "ics-mobile", text: "500 to 20k+ TPS" },
      { client: "Spend The Bits", slug: "spend-the-bits", text: "80% to 99.9% uptime" },
      { client: "AlfredX", slug: "alfredx", text: "99.9% across APAC" },
    ],
    cta: { label: "Get an infrastructure audit", href: "/contact" },
  },
  {
    slug: "security",
    name: "Security audits",
    short: "White-hat penetration testing and audits with remediation support.",
    headline: "Security audits and penetration testing",
    subheadline: "Find the vulnerabilities before attackers do.",
    intro:
      "Our ethical hackers use the same tools and mindset as threat actors. We find the gaps in your security posture and deliver actionable reports to close them before a breach happens.",
    capabilities: [
      { title: "White-box testing", body: "Full access with source code and architecture review." },
      { title: "Black-box testing", body: "A zero-knowledge simulation of an external attacker." },
      { title: "Infrastructure audits", body: "Network, firewall and access-control assessment." },
      { title: "Web application testing", body: "OWASP Top 10 and injection vulnerability discovery." },
      { title: "API security", body: "Authentication and data-exposure testing for REST and GraphQL." },
      { title: "Cloud security", body: "IAM, storage permissions, encryption and compliance validation." },
    ],
    stack: ["OWASP Top 10", "Burp Suite", "Kubernetes audits", "AWS IAM", "Threat modelling"],
    process: [
      { title: "Recon", body: "Map the attack surface with open-source intelligence." },
      { title: "Assess", body: "Automated and manual scanning for OWASP risks, CVEs and misconfigurations." },
      { title: "Exploit", body: "Controlled proof-of-concept attacks to show real impact." },
      { title: "Report", body: "Severity-rated findings with prioritised remediation guidance." },
    ],
    proof: [
      { client: "Eduley", slug: "eduley", text: "SOC 2 aligned controls in the codebase" },
      { client: "Kashti FinServ", slug: "kashti-finserv", text: "NBFC-ready, through due diligence" },
      { client: "Spend The Bits", slug: "spend-the-bits", text: "Compliance-ready audit trails" },
    ],
    cta: { label: "Get the $97 audit", href: "/2026-audit" },
  },
  {
    slug: "scalability",
    name: "Scalability",
    short: "From 3 requests a second to 3,000+, without rewriting the product.",
    headline: "Scalability engineering",
    subheadline: "From dozens of users to millions, without a rewrite.",
    intro:
      "We have scaled systems from 3 requests a second to 3,000+, and handled up to 10,000 transactions a second in production. We re-engineer the bottlenecks instead of rewriting the product.",
    capabilities: [
      { title: "Throughput re-architecture", body: "Event-driven pipelines and parallel workers, as in the 500 to 20k+ TPS lift." },
      { title: "Database scaling", body: "Read replicas, sharding, connection pooling and query optimisation." },
      { title: "Event-driven design", body: "Kafka and queue-based architectures that decouple services." },
      { title: "Caching and edge delivery", body: "Multi-tier caching that cuts origin traffic by 70 to 90%." },
      { title: "Autoscaling", body: "Horizontal scaling tuned to your real traffic patterns." },
      { title: "Load testing", body: "Proof-of-architecture tests at 10x your current peak." },
    ],
    stack: ["Kubernetes", "Kafka", "RabbitMQ", "Redis", "PostgreSQL", "Elasticsearch", "ClickHouse", "NGINX", "Cloudflare", "k6"],
    process: [
      { title: "Profile", body: "Load profiling and bottleneck identification at 2 to 10x peak." },
      { title: "Design", body: "An architecture for your next 10x of growth." },
      { title: "Roll out", body: "Incremental rollout with feature flags and traffic mirroring." },
      { title: "Maintain", body: "Continuous capacity management and quarterly load-test drills." },
    ],
    proof: [
      { client: "ICS Mobile", slug: "ics-mobile", text: "40x throughput" },
      { client: "Kashti FinServ", slug: "kashti-finserv", text: "3 to 3,000+ applications a day" },
      { client: "AllIndex", slug: "allindex", text: "Sub-second analytics at scale" },
    ],
    cta: { label: "Book a scalability audit", href: "/contact" },
  },
  {
    slug: "finops",
    name: "FinOps and cost reduction",
    short: "Typical cloud savings of 20 to 40%, with no downtime.",
    headline: "FinOps and cloud cost reduction",
    subheadline: "Cut cloud costs by 20 to 40% with zero downtime.",
    intro:
      "We analyse, optimise and govern your cloud spending, reducing cost while improving performance and reliability. Our lead is the author of the AWS Profit Playbook.",
    capabilities: [
      { title: "Cost audit", body: "A line-by-line bill analysis that finds usage patterns and idle resources." },
      { title: "Optimisation roadmap", body: "Recommendations ranked by savings impact." },
      { title: "Implementation", body: "Right-sizing, reserved instances and savings plans, executed for you." },
      { title: "Continuous governance", body: "Monthly reviews, budget alerts and anomaly detection." },
    ],
    stack: ["AWS Cost Explorer", "CloudWatch", "Savings Plans", "Reserved Instances", "Spot Instances", "Kubecost", "Datadog"],
    process: [
      { title: "Audit", body: "Understand where the money goes." },
      { title: "Roadmap", body: "Rank the savings by impact and risk." },
      { title: "Implement", body: "Make the changes without downtime." },
      { title: "Govern", body: "Keep the savings from drifting back." },
    ],
    proof: [
      { client: "Open Door Education", slug: "open-door-education", text: "Cloud cost cut by 50%" },
      { client: "Violet LMS", slug: "violet-lms", text: "$4K a month saved" },
      { client: "Spend The Bits", slug: "spend-the-bits", text: "Lower cost after Kubernetes" },
    ],
    cta: { label: "Get a free cost assessment", href: "/contact" },
  },
];

export function findService(slug: string) {
  return services.find((service) => service.slug === slug);
}
