
type PhaseSeed = {
  month: number;
  title: string;
  objective: string;
  weeks: { number: number; title: string; topics: string[]; exercise: string }[];
  deliverable: string[];
  resources: { label: string; url: string }[];
};

type ProjectSeed = {
  order: number;
  title: string;
  scenario: string;
  requirements: string[];
  demonstrates: string;
};

type CompetencySeed = {
  order: number;
  name: string;
  beginnerMilestone: string;
  jobReadyEvidence: string;
};

export const phases: PhaseSeed[] = [
  {
    month: 1,
    title: "Strengthen Networking Fundamentals",
    objective: "Become confident in diagnosing and resolving common enterprise networking problems.",
    weeks: [
      {
        number: 1,
        title: "Networking Fundamentals",
        topics: ["OSI and TCP/IP models", "MAC addresses and ARP", "IPv4 addressing and subnetting", "Public and private IP addresses", "Default gateways", "DNS and DHCP", "TCP versus UDP", "Common ports and protocols", "ICMP, ping, and traceroute", "NAT and PAT"],
        exercise: "Build a troubleshooting checklist for a user who can access internal applications but cannot access the internet. Be able to explain everything that happens when a user opens https://example.com.",
      },
      {
        number: 2,
        title: "Switching and VLANs",
        topics: ["Layer 2 switching", "VLAN configuration", "Access ports versus trunk ports", "802.1Q tagging", "Inter-VLAN routing", "Spanning Tree Protocol", "Link aggregation fundamentals", "MAC address tables", "Switch port security"],
        exercise: "Design a small office network with Administration (VLAN 10, 192.168.10.0/24), Finance (VLAN 20, 192.168.20.0/24) and IT (VLAN 30, 192.168.30.0/24). Configure it in a simulator, verify same-VLAN communication, then investigate why cross-VLAN traffic fails until routing is configured.",
      },
      {
        number: 3,
        title: "Routing",
        topics: ["Static and dynamic routing", "Routing tables", "Default routes", "Inter-VLAN routing", "OSPF fundamentals", "Route selection", "WAN connectivity", "NAT and PAT", "Basic redundancy concepts"],
        exercise: "Build a topology with two branch offices connected through routers. Configure routing so both branches communicate, then break it deliberately and diagnose the failure.",
      },
      {
        number: 4,
        title: "Network Troubleshooting",
        topics: ["Tools: ping, traceroute/tracert, ipconfig/ip, nslookup/dig, arp, netstat/ss", "tcpdump and Wireshark", "Incorrect subnet masks", "Duplicate IP addresses", "DNS resolution failures", "DHCP failures", "Incorrect VLAN assignments", "Routing problems", "Packet loss and latency", "MTU-related connectivity problems"],
        exercise: "Practise methodical troubleshooting: diagnose each fault type above in your lab without randomly changing configurations.",
      },
    ],
    deliverable: ["Three VLANs", "Inter-VLAN routing", "DHCP and DNS scenarios", "A branch-office routing scenario", "At least ten documented faults and their resolutions"],
    resources: [
      { label: "Cisco Networking Academy", url: "https://www.netacad.com/" },
      { label: "Cisco CCNA certification", url: "https://www.cisco.com/site/us/en/learn/training-certifications/certifications/enterprise/ccna/index.html" },
    ],
  },
  {
    month: 2,
    title: "Enterprise Network Security",
    objective: "Move from basic firewall administration toward the troubleshooting and security responsibilities expected of a Network Security Engineer.",
    weeks: [
      {
        number: 5,
        title: "Firewall Fundamentals",
        topics: ["Stateful versus stateless firewalls", "Inbound and outbound rules", "Source and destination objects", "Service and port objects", "Security zones", "NAT rules", "Firewall logging", "Rule ordering and troubleshooting", "Least-privilege access"],
        exercise: "Design firewall rules for an office with employee devices, an internal application server, a database server, guest Wi-Fi and internet connectivity — allowing only required traffic between segments.",
      },
      {
        number: 6,
        title: "VPN and Remote Access",
        topics: ["Site-to-site IPsec VPN", "Remote-access VPN", "SSL VPN concepts", "IKE negotiation", "Authentication and authorization", "VPN routing", "Split tunneling", "MFA", "Common VPN troubleshooting scenarios"],
        exercise: "Design a secure HQ-to-branch connection. Document the networks at both ends, required traffic, authentication, routing, and troubleshooting steps.",
      },
      {
        number: 7,
        title: "Modern Firewall Platforms",
        topics: ["Pick one: FortiGate or Palo Alto NGFW", "Firewall policies and security zones", "NAT and VPNs on the platform", "Security profiles / threat prevention", "Application-aware security", "Logging and centralized management"],
        exercise: "Check which platform appears most in target job descriptions and focus on that one only.",
      },
      {
        number: 8,
        title: "Security Monitoring and Network Segmentation",
        topics: ["Network segmentation", "Guest and corporate network separation", "Management VLANs", "Access-control policies", "Endpoint security", "MFA and privileged access", "Firewall log analysis", "Security incident triage", "Firmware and patch management", "Basic SIEM concepts"],
        exercise: "Analyse a set of firewall logs and triage one simulated security incident.",
      },
    ],
    deliverable: ["A segmented office network", "A firewall policy matrix", "A site-to-site VPN design", "A remote-access security design", "Example firewall logs", "Five documented security troubleshooting scenarios"],
    resources: [
      { label: "Fortinet Training Institute", url: "https://training.fortinet.com/" },
      { label: "Palo Alto Networks Education Services", url: "https://www.paloaltonetworks.com/services/education" },
    ],
  },
  {
    month: 3,
    title: "Windows Server, Identity and Enterprise Systems",
    objective: "Become more competitive for IT Infrastructure Engineer, System Administrator, and enterprise support positions.",
    weeks: [
      {
        number: 9,
        title: "Windows Server Fundamentals",
        topics: ["Windows Server architecture", "Server roles and features", "Local versus domain accounts", "Server management", "Windows services", "Event Viewer", "Remote administration", "File and folder permissions"],
        exercise: "Install a Windows Server evaluation VM, add roles, and practise remote administration.",
      },
      {
        number: 10,
        title: "Active Directory and Group Policy",
        topics: ["Active Directory Domain Services", "Domains, forests, and OUs", "Domain controllers", "User and computer accounts", "Security groups", "Group Policy Objects", "Password and account-lockout policies", "DNS dependencies", "Domain join and authentication troubleshooting"],
        exercise: "Create OUs for IT, Finance and Administration. Create users and groups, apply different policies (e.g. one that applies only to Finance), and test the results.",
      },
      {
        number: 11,
        title: "Microsoft 365 and Identity Security",
        topics: ["Microsoft Entra ID", "Multifactor authentication", "Conditional Access fundamentals", "Role-based access control", "User lifecycle management", "Microsoft 365 administration", "Basic Intune endpoint management", "Sign-in logs and identity troubleshooting", "On-prem AD vs cloud identity"],
        exercise: "Write a one-page comparison of on-premises AD and Entra ID, and walk through a sign-in log investigation.",
      },
      {
        number: 12,
        title: "Virtualization and Backup",
        topics: ["Virtual machines", "Virtual switches", "CPU and memory allocation", "Virtual network adapters", "Snapshots and checkpoints", "Backup and recovery", "Storage fundamentals", "High availability concepts"],
        exercise: "Build a small virtual environment with a server, a client and a basic domain. Test authentication, DNS, permissions, and recovery from a configuration mistake.",
      },
    ],
    deliverable: ["Windows Server administration", "AD user and group management", "Group Policy", "Microsoft 365 identity concepts", "Virtual networking", "Backup and recovery procedures"],
    resources: [
      { label: "Microsoft Learn", url: "https://learn.microsoft.com/en-us/training/" },
      { label: "Windows Server documentation", url: "https://learn.microsoft.com/en-us/windows-server/" },
    ],
  },
  {
    month: 4,
    title: "Cloud Networking and Infrastructure",
    objective: "Understand cloud networking well enough to design a small environment, deploy resources, and troubleshoot connectivity.",
    weeks: [
      {
        number: 13,
        title: "Cloud Fundamentals",
        topics: ["Choose one provider (Azure recommended)", "IaaS, PaaS, and SaaS", "Regions and availability zones", "Virtual machines", "Virtual networks", "Identity and access management", "Shared responsibility", "Cloud security fundamentals", "Cloud cost management"],
        exercise: "Create a free/low-cost account, set a budget alert, and explore the portal.",
      },
      {
        number: 14,
        title: "Cloud Networking",
        topics: ["VNets / VPCs", "Subnets (public and private)", "NSGs / security groups / NACLs", "Route tables", "Public and private IP addresses", "Internet and NAT gateways", "VPN Gateway / site-to-site VPN", "VNet / VPC peering", "Private connectivity and cloud DNS"],
        exercise: "Draw the network of a two-subnet cloud environment before deploying it.",
      },
      {
        number: 15,
        title: "Deploy a Cloud Infrastructure Lab",
        topics: ["One virtual network", "Two subnets", "One virtual machine", "Access controls", "Secure administrative access", "Monitoring and diagnostic logging"],
        exercise: "Deploy the lab, then test: an incorrect route, a blocked required port, a misconfigured security rule, broken DNS, and a removed permission.",
      },
      {
        number: 16,
        title: "Hybrid Networking",
        topics: ["Site-to-site VPN", "Private and public routing", "Hybrid DNS", "Identity integration", "Firewall placement", "Network address planning", "Connectivity monitoring", "Basic disaster recovery concepts"],
        exercise: "Design how an on-premises office connects to your cloud lab. Delete paid resources when finished.",
      },
    ],
    deliverable: ["An architecture diagram", "An IP addressing plan", "A network security policy", "A deployment guide", "A troubleshooting guide", "A basic cost estimate"],
    resources: [
      { label: "Microsoft Learn: Azure training", url: "https://learn.microsoft.com/en-us/training/azure/" },
      { label: "AWS Skill Builder", url: "https://skillbuilder.aws/" },
    ],
  },
  {
    month: 5,
    title: "Automation, Monitoring and Modern Operations",
    objective: "Develop the skills to automate, monitor, and improve infrastructure operations instead of repeating manual tasks.",
    weeks: [
      {
        number: 17,
        title: "PowerShell",
        topics: ["Variables and data types", "Conditions and loops", "Functions", "Arrays and objects", "Filtering and sorting", "Working with files", "Error handling", "CSV and JSON", "Basic remote administration"],
        exercise: "Write a script that reads an employee CSV and reports accounts needing review. Test only in a safe lab — never modify real accounts.",
      },
      {
        number: 18,
        title: "Python for Network Automation",
        topics: ["Python fundamentals", "Lists and dictionaries", "Functions", "File operations", "JSON and YAML", "HTTP APIs", "Exception handling", "Logging", "Netmiko, NAPALM and Ansible"],
        exercise: "Parse a sample network-device output file and report interfaces that are down. Later, collect from lab devices.",
      },
      {
        number: 19,
        title: "Monitoring and Observability",
        topics: ["SNMP", "Syslog", "ICMP monitoring", "Interface utilization", "CPU and memory metrics", "Availability monitoring", "Alert thresholds", "Log correlation", "Incident investigation", "One platform: Zabbix, PRTG or Grafana"],
        exercise: "Set up monitoring for a lab device with at least one meaningful alert.",
      },
      {
        number: 20,
        title: "IT Service Management and Root-Cause Analysis",
        topics: ["Incident versus problem management", "Change management", "Escalation procedures", "SLAs and SLOs", "Root-cause analysis", "Preventive maintenance", "Configuration documentation", "Asset lifecycle management", "Knowledge-base documentation"],
        exercise: "Write incident reports: summary, business impact, timeline, symptoms, root cause, resolution, preventive action.",
      },
    ],
    deliverable: ["A PowerShell reporting script", "A Python network-analysis script", "A monitoring dashboard or configuration", "Three root-cause analysis reports", "A documented change-management procedure"],
    resources: [
      { label: "Ansible documentation", url: "https://docs.ansible.com/" },
      { label: "Python documentation", url: "https://docs.python.org/3/" },
      { label: "Zabbix documentation", url: "https://www.zabbix.com/documentation/current/en/manual" },
    ],
  },
  {
    month: 6,
    title: "Portfolio, Certifications and Job Search",
    objective: "Turn the learning into demonstrable skills and secure interviews for better positions.",
    weeks: [
      {
        number: 21,
        title: "Build the Main Portfolio Project",
        topics: ["Network topology", "VLAN design", "Routing", "Firewall rules", "VPN architecture", "Windows Server and identity", "Cloud networking", "Monitoring", "Automation", "Troubleshooting documentation"],
        exercise: "Build the 'Enterprise Network and Infrastructure Modernization Lab' using simulators, local VMs and a small cloud lab.",
      },
      {
        number: 22,
        title: "Document the Project Professionally",
        topics: ["Architecture diagrams", "IP addressing tables", "Configuration examples", "Firewall policy matrices", "PowerShell and Python scripts", "Lab screenshots", "Monitoring examples", "Troubleshooting scenarios", "Lessons learned"],
        exercise: "Publish a repository or portfolio. Use only fictional, sanitized data — never real company configs or credentials.",
      },
      {
        number: 23,
        title: "Certification Strategy",
        topics: ["Cisco CCNA — core networking", "CCNP Enterprise — advanced networking", "Fortinet FCP or Palo Alto cert — firewall security", "AZ-104 — Azure infrastructure", "AWS Solutions Architect – Associate"],
        exercise: "Pick at most one certification based on target job descriptions. Verify current exam details on the official site.",
      },
      {
        number: 24,
        title: "Interview Preparation and Job Applications",
        topics: ["Networking questions", "Firewall and security questions", "Windows and infrastructure questions", "Cloud questions", "Automation and monitoring questions", "Structured answers: symptoms → investigation → root cause → fix → prevention"],
        exercise: "Practise the interview question bank aloud and keep applying on both Track A and Track B.",
      },
    ],
    deliverable: ["Completed portfolio project", "Professional documentation", "Certification decision", "Interview-ready answers"],
    resources: [],
  },
];

export const projects: ProjectSeed[] = [
  {
    order: 1,
    title: "Enterprise Office Network",
    scenario: "A company has 100 employees across three departments and needs a secure, maintainable network.",
    requirements: ["Separate VLANs for departments", "Dedicated guest network", "Inter-VLAN routing", "DHCP and DNS", "Internet connectivity", "Firewall rules", "Basic redundancy considerations", "Network monitoring", "Troubleshooting documentation"],
    demonstrates: "The ability to design, configure, and troubleshoot a small enterprise network.",
  },
  {
    order: 2,
    title: "Secure Hybrid Cloud Infrastructure",
    scenario: "A company has an on-premises office and wants to host an application in Azure.",
    requirements: ["On-premises network design", "Azure virtual network", "Separate application and management subnets", "VPN connectivity design", "Network access controls", "Identity and administrative access", "Monitoring and logging", "Backup and recovery considerations"],
    demonstrates: "The ability to reason about connectivity and security across on-premises and cloud environments.",
  },
  {
    order: 3,
    title: "Automated Network Operations",
    scenario: "The IT team needs better visibility into network health and wants to reduce repetitive manual checks.",
    requirements: ["Read a list of devices or sample outputs", "Collect or process interface and availability info", "Identify failed checks", "Generate a report", "Log errors", "Produce a clear summary for an IT engineer"],
    demonstrates: "The ability to improve infrastructure operations through automation and structured troubleshooting.",
  },
];

export const competencies: CompetencySeed[] = [
  ["Subnetting", "Calculate network ranges", "Solve subnetting problems accurately without a calculator"],
  ["VLANs", "Explain VLANs", "Configure VLANs and troubleshoot trunking"],
  ["Routing", "Explain routing tables", "Diagnose routing and reachability failures"],
  ["Firewall", "Explain firewall rules", "Design and troubleshoot least-privilege policies"],
  ["VPN", "Explain IPsec fundamentals", "Diagnose common tunnel and routing failures"],
  ["Windows Server", "Understand server roles", "Administer a small domain in a lab"],
  ["Identity", "Explain users and groups", "Troubleshoot authentication and access problems"],
  ["Cloud networking", "Understand virtual networks", "Deploy and troubleshoot a small cloud network"],
  ["Automation", "Write basic scripts", "Produce tested scripts that solve practical tasks"],
  ["Monitoring", "Understand metrics and alerts", "Configure monitoring and investigate a simulated incident"],
].map(([name, beginnerMilestone, jobReadyEvidence], i) => ({
  order: i + 1,
  name,
  beginnerMilestone,
  jobReadyEvidence,
}));

export const interviewQuestions: Record<string, string[]> = {
  Networking: [
    "Explain what happens when a user cannot access a website.",
    "How do VLANs work?",
    "What is the difference between a trunk and an access port?",
    "How would you troubleshoot an OSPF adjacency failure?",
    "How would you diagnose intermittent packet loss?",
  ],
  "Firewall and Security": [
    "How do you troubleshoot a site-to-site VPN?",
    "How would you investigate traffic blocked by a firewall?",
    "How would you segment a corporate network?",
    "How would you troubleshoot a user who can connect to a VPN but cannot reach internal applications?",
  ],
  "Windows and Infrastructure": [
    "What happens when a domain-joined computer cannot authenticate?",
    "How would you troubleshoot DNS failures?",
    "How do Group Policy and Active Directory interact?",
    "How would you restore a server from backup?",
  ],
  Cloud: [
    "How would you connect an on-premises network to Azure?",
    "What is the difference between a subnet and a network security group?",
    "How would you troubleshoot a virtual machine that cannot reach the internet?",
  ],
  "Automation and Monitoring": [
    "What tasks have you automated?",
    "How would you identify network interfaces with unusually high utilization?",
    "How would you design monitoring for a branch office?",
    "How would you investigate an alert indicating a server is unreachable?",
  ],
};
