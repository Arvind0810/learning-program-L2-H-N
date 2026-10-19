type WeekResourceSeed = {
  kind: "video" | "practice" | "android-app" | "docs";
  title: string;
  url: string;
  source: string;
  language: "hi" | "en";
  tabletFriendly: boolean;
  note?: string;
};

type PracticeToolSeed = {
  order: number;
  name: string;
  url: string;
  platform: "browser" | "android-app";
  category: string;
  useFor: string;
};

// Every playlist ID below was confirmed live via YouTube oEmbed on 2026-10-19.
const hindiPlaylist = (listId: string, title: string, source: string, note?: string): WeekResourceSeed => ({
  kind: "video",
  title,
  url: `https://www.youtube.com/playlist?list=${listId}`,
  source,
  language: "hi",
  tabletFriendly: true,
  note,
});

const browserLab = (title: string, url: string, source: string, note?: string): WeekResourceSeed => ({
  kind: "practice",
  title,
  url,
  source,
  language: "en",
  tabletFriendly: true,
  note,
});

const androidApp = (title: string, packageId: string, note?: string): WeekResourceSeed => ({
  kind: "android-app",
  title,
  url: `https://play.google.com/store/apps/details?id=${packageId}`,
  source: "Google Play",
  language: "en",
  tabletFriendly: true,
  note,
});

const docs = (title: string, url: string, source: string): WeekResourceSeed => ({
  kind: "docs",
  title,
  url,
  source,
  language: "en",
  tabletFriendly: true,
});

const NEEDS_PC = "Needs a laptop/PC — Packet Tracer has no Android app.";

const CCNA_HINDI_NETWORK_NUGGETS = hindiPlaylist("PLN0OCwSZePjdHb33bAfU0oQ0zWb4w2RDK", "CCNA 200-301 Complete Course in Hindi", "Network Nuggets");
const CCNA_HINDI_IMEDITA = hindiPlaylist("PLz5p756z6BVCt5ZbpbINJqEKQHmJoVStp", "CCNA Full Course in Hindi", "I-MEDITA");
const PACKET_TRACER_HINDI = hindiPlaylist("PL71kSR7neg7KpyPqlq3jgw0RMKU3XHljL", "Cisco Packet Tracer Playlist in Hindi", "Sudhanshu Sekhar Tripathy", NEEDS_PC);
const TERMUX = androidApp("Termux (Linux terminal on Android)", "com.termux", "Run ping, traceroute, dig, ssh, nmap and Python on the tablet.");
const KILLERCODA_UBUNTU = browserLab("Killercoda Ubuntu playground", "https://killercoda.com/playgrounds/scenario/ubuntu", "Killercoda", "Free browser Linux VM — works in Chrome on the tablet.");
const CISCO_DEVNET = browserLab("Cisco DevNet Sandbox", "https://devnetsandbox.cisco.com", "Cisco", "Free reservable Cisco labs in the browser (free Cisco account).");
const MS_LEARN_AZURE = docs("Microsoft Learn: Azure training", "https://learn.microsoft.com/en-us/training/azure/", "Microsoft");
const AZURE_CLOUD_SHELL = browserLab("Azure Cloud Shell (Bash + PowerShell)", "https://shell.azure.com", "Microsoft", "Browser terminal; needs a free Azure account.");

export const weekResources: Record<number, WeekResourceSeed[]> = {
  1: [
    CCNA_HINDI_NETWORK_NUGGETS,
    hindiPlaylist("PLBGx66SQNZ8ZvdIoctCTWB3ApXQpQGEin", "CCNA / Computer Networking in Hindi-Urdu", "Technical Guftgu"),
    hindiPlaylist("PLAj6nwYw1SX1FWYuzOAoHi3Z1xEXxgxIE", "Complete Subnetting in Hindi", "Cloud Codex"),
    browserLab("Subnetting Practice", "https://subnettingpractice.com", "subnettingpractice.com", "Unlimited random subnetting questions — ideal on a tablet."),
    browserLab("Subnet IPv4 quiz", "https://www.subnetipv4.com", "subnetipv4.com"),
    TERMUX,
    docs("What is DNS?", "https://www.cloudflare.com/learning/dns/what-is-dns/", "Cloudflare Learning"),
  ],
  2: [
    hindiPlaylist("PLFDA35F703C02D2C4", "VLAN in Hindi", "JagvinderThind"),
    CCNA_HINDI_IMEDITA,
    PACKET_TRACER_HINDI,
    CISCO_DEVNET,
    docs("Cisco Packet Tracer (download, free with NetAcad)", "https://www.netacad.com/courses/packet-tracer", "Cisco NetAcad"),
  ],
  3: [
    hindiPlaylist("PLks8W396lro6PqIXTzTDTODthSX_5mhC1", "OSPF in Hindi — Complete Guide", "JagvinderThind"),
    CCNA_HINDI_NETWORK_NUGGETS,
    hindiPlaylist("PL4zTobzehs7XfsqLjnl1OGH6cmVHPLbqM", "Cisco Packet Tracer Tutorial (Hindi/Urdu)", "Network Ninja", NEEDS_PC),
    CISCO_DEVNET,
  ],
  4: [
    hindiPlaylist("PLsd7lkkL5kOcZWueLys4feZOLM7iLaGtL", "Wireshark Training Videos in Hindi", "jittu jaiswal"),
    hindiPlaylist("PLS0spxc8nUsDqFzwOUXrJfdncOVpDRXdE", "Computer Networking Full Course in Hindi", "Shesh Chauhan IT Trainer"),
    browserLab("A-Packets (open .pcap files in the browser)", "https://apackets.com", "A-Packets", "Wireshark-style analysis without installing anything."),
    docs("Wireshark sample captures", "https://wiki.wireshark.org/SampleCaptures", "Wireshark"),
    androidApp("PCAPdroid (capture tablet traffic, export .pcap)", "com.emanuelef.remote_capture"),
    androidApp("PingTools Network Utilities", "ua.com.streamsoft.pingtools", "ping, traceroute, DNS lookup, port scan."),
    TERMUX,
  ],
  5: [
    hindiPlaylist("PL14T8OOb70NwWZdY448ciczrfTyxWSI2C", "FortiGate Firewall: Zero to Hero in Hindi", "Network Library"),
    hindiPlaylist("PLsd7lkkL5kOcAvRTdUIiE9KKOWBeFwNAo", "Complete Fortinet Firewall in Hindi", "jittu jaiswal"),
    docs("Fortinet Training Institute (free NSE courses)", "https://training.fortinet.com", "Fortinet"),
  ],
  6: [
    hindiPlaylist("PLmi_odyamBsL3zRe9ccfHt2yxwqB71NK9", "IPSec VPN in Hindi", "Network Engineer Stuff"),
    hindiPlaylist("PLsd7lkkL5kOeJVuJyc8VqkYz0DSC8mR29", "Complete VPN Training Videos in Hindi", "jittu jaiswal"),
    docs("What is IPsec?", "https://www.cloudflare.com/learning/network-layer/what-is-ipsec/", "Cloudflare Learning"),
    androidApp("FortiClient VPN", "com.fortinet.forticlient_vpn", "See the remote-access VPN client side."),
    androidApp("GlobalProtect (Palo Alto VPN client)", "com.paloaltonetworks.globalprotect"),
  ],
  7: [
    hindiPlaylist("PL14T8OOb70NyDWhIqm2kG_AcmwoMg0k2O", "Palo Alto Firewall: PCNSE Zero to Hero in Hindi", "Network Library"),
    hindiPlaylist("PL14T8OOb70NwWZdY448ciczrfTyxWSI2C", "FortiGate Firewall: Zero to Hero in Hindi", "Network Library"),
    docs("Palo Alto Networks Cyberpedia", "https://www.paloaltonetworks.com/cyberpedia", "Palo Alto Networks"),
  ],
  8: [
    hindiPlaylist("PLFE3c66qCw4ewxFD7_4N-ouXGXFUKZ48r", "Splunk Beginner Series in Hindi — SIEM to SOC", "The Layman Security"),
    hindiPlaylist("PLzyOldZ_5kjR32gHmJ0EL9RbhNzLfxYUq", "Cybersecurity 101 (TryHackMe path) in Hindi", "CyberWalk Hindi"),
    browserLab("TryHackMe", "https://tryhackme.com", "TryHackMe", "Browser-based AttackBox labs — usable on a tablet with a keyboard."),
    androidApp("Fing — network scanner", "com.overlook.android.fing", "Discover devices on a network you own."),
  ],
  9: [
    hindiPlaylist("PLgZsQ5jmS-VbYoZOu1NXD28VgqKXcPw5n", "Windows Server 2022 Full Course in Hindi", "rohit shanu networking video"),
    hindiPlaylist("PLS0spxc8nUsAT---4-EFlKpQkmINu90AR", "Windows Server 2022 in Hindi", "Shesh Chauhan IT Trainer"),
    androidApp("Windows App (Remote Desktop)", "com.microsoft.rdc.androidx", "RDP from the tablet into a home PC or cloud VM running Windows Server."),
  ],
  10: [
    hindiPlaylist("PLXcDwhpyeYSquwYYag58eq80nQQVw81gV", "Active Directory Full Course in Hindi", "Aspbrtech"),
    hindiPlaylist("PLgZsQ5jmS-VaprSjYne06owj0pqGimlNG", "Group Policy Management in Server 2022 (Hindi)", "rohit shanu networking video"),
    hindiPlaylist("PLgZsQ5jmS-VYC5UMLd-zh-CUzzRh_opr6", "DNS Server 2022 in Hindi", "rohit shanu networking video"),
    docs("AD DS overview", "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/virtual-dc/active-directory-domain-services-overview", "Microsoft Learn"),
  ],
  11: [
    hindiPlaylist("PLUGuCqrhcwZzht4r2sbByidApmrvEjL9m", "Microsoft Entra ID / Azure AD in Hindi", "Tech learning"),
    hindiPlaylist("PL6Nt9HDlmQPVJ7lX146f6Pu4OOOeNpjja", "Microsoft Intune Full Beginner Course (Hindi)", "Himanshu Jangra"),
    docs("What is Microsoft Entra ID?", "https://learn.microsoft.com/en-us/entra/fundamentals/whatis", "Microsoft Learn"),
    androidApp("Microsoft Authenticator", "com.azure.authenticator", "Practise MFA sign-in flows."),
    androidApp("Intune Company Portal", "com.microsoft.windowsintune.companyportal", "See device enrolment from the user side."),
  ],
  12: [
    hindiPlaylist("PLm6Z4vpjAA6F4MouzoX2hvSvDu8ZEgp-N", "Microsoft Hyper-V Free Training in Hindi", "Sumbria Tech Point", "Hypervisor labs need a laptop/PC."),
    hindiPlaylist("PLxQkz-NJ79nnjoRofuf8_QQ4Qlx9-09le", "VMware in Hindi-Urdu", "SalhidTech"),
    hindiPlaylist("PLpQhHdb9D40DLsvEdUNqyGsS2Z-eFvWb4", "Veeam Backup & Replication in Hindi", "Azhar Sagar IT Guy"),
  ],
  13: [
    hindiPlaylist("PLks8W396lro4RpDs-teA87oaGH6nRU5Zf", "AZ-900 Azure Fundamentals Full Course in Hindi", "JagvinderThind"),
    hindiPlaylist("PLBGx66SQNZ8ZS9VhxzfWpne4c3ces9IHA", "Microsoft Azure Tutorial for Beginners (Hindi/Urdu)", "Technical Guftgu"),
    MS_LEARN_AZURE,
    androidApp("Microsoft Azure app", "com.microsoft.azure", "Check resources, costs and alerts from the tablet."),
  ],
  14: [
    hindiPlaylist("PLQStr4YBJutTz9qA-PnS60DKTsJ671bFc", "Azure Networking in Hindi", "How Azure Works"),
    hindiPlaylist("PLAwzouYxcpPjTtRB1FNQ5iLGkSaYD9JFb", "Azure Networking (AZ-700) in Hindi", "Sanjay Singh"),
    hindiPlaylist("PLIm9KY-ideOuz6jLToDDzzM0eAg9cM3u0", "AWS VPC Full Playlist in Hindi", "CloudFolks HUB Hindi"),
    docs("Configure virtual networks (with free sandbox)", "https://learn.microsoft.com/en-us/training/modules/configure-virtual-networks/", "Microsoft Learn"),
  ],
  15: [
    hindiPlaylist("PLAwzouYxcpPiYRHVBsfDmzIiiak3xM_BS", "Azure Administrator AZ-104 (Hindi, updated)", "Sanjay Singh"),
    AZURE_CLOUD_SHELL,
    androidApp("Microsoft Azure app", "com.microsoft.azure"),
    androidApp("AWS Console mobile app", "com.amazon.aws.console.mobile"),
  ],
  16: [
    hindiPlaylist("PLAwzouYxcpPjTtRB1FNQ5iLGkSaYD9JFb", "Azure Networking (AZ-700) in Hindi", "Sanjay Singh", "Covers VPN Gateway and hybrid connectivity."),
    MS_LEARN_AZURE,
  ],
  17: [
    hindiPlaylist("PLKWMn2eUhI2AJNBxfXuPlUUtQgAXhdmII", "PowerShell Full Course in Hindi", "Adarsh Tomar (Geeky Hub)"),
    hindiPlaylist("PLsjmv9aDmNDBg4x4mvRaxmvv1ARNvWX-p", "PowerShell Beginner Series (Hindi)", "Programming's Fun"),
    AZURE_CLOUD_SHELL,
    docs("Get started with Windows PowerShell", "https://learn.microsoft.com/en-us/training/paths/get-started-windows-powershell/", "Microsoft Learn"),
  ],
  18: [
    hindiPlaylist("PLu0W_9lII9agwh1XjRt242xIpHhPT2llg", "Python for Beginners (Full Course) in Hindi", "CodeWithHarry"),
    hindiPlaylist("PLnzLM82lqy8ujOrCvemVvfMk0eoekxpQ9", "Python for Network Engineers (Urdu/Hindi)", "URDUIT Academy"),
    hindiPlaylist("PL6XT0grm_TfgP3OlZzmGh4Cq_rHtX8z7e", "Ansible Tutorial for Beginners in Hindi", "Gaurav Sharma"),
    browserLab("Google Colab (Python in the browser)", "https://colab.research.google.com", "Google"),
    browserLab("Killercoda Ansible scenarios", "https://killercoda.com/ansible", "Killercoda"),
    androidApp("Pydroid 3 (offline Python IDE)", "ru.iiec.pydroid3"),
  ],
  19: [
    hindiPlaylist("PLVCgi5HZ0-YuovB7Q3EwqJWbBagI9v_kh", "Grafana in Hindi", "Vikas Jha"),
    hindiPlaylist("PL9Puyn_9KBpgVj52yrop12OeHehJw9RyC", "Nagios XI Network Monitoring in Hindi", "Abhimanyu Gautam"),
    browserLab("Grafana Play (live demo dashboards)", "https://play.grafana.org", "Grafana Labs"),
    browserLab("Zabbix live demo", "https://www.zabbix.com/demo", "Zabbix"),
  ],
  20: [
    docs("ITIL 4 overview", "https://www.axelos.com/certifications/itil-service-management", "AXELOS / PeopleCert"),
  ],
  21: [PACKET_TRACER_HINDI, KILLERCODA_UBUNTU, CISCO_DEVNET],
  22: [androidApp("Termius (SSH client)", "com.server.auditor.ssh.client", "SSH into lab machines from the tablet.")],
  23: [CCNA_HINDI_NETWORK_NUGGETS, hindiPlaylist("PLdjivcdVUZLap0DKDKFBYLNrNDYKQg08I", "AZ-104 Azure Administrator Full Course in Hindi", "SHARMA IT")],
  24: [
    hindiPlaylist("PLN0OCwSZePjd5UVbuxPXXjvNO_cSdKE7m", "Network Engineer Interview Q&A in Hindi", "Network Nuggets"),
    hindiPlaylist("PLWc4KyLBvvTbAx6MkOZfVyOjR4J4ZL9QA", "Networking Interview Preparation in Hindi", "BridgeWhy"),
    androidApp("AnkiDroid flashcards", "com.ichi2.anki", "Spaced-repetition cards for ports, protocols and interview answers."),
  ],
};

export const practiceTools: PracticeToolSeed[] = [
  ["Subnetting Practice", "https://subnettingpractice.com", "browser", "Networking", "Random subnetting drills"],
  ["Subnet IPv4 quiz", "https://www.subnetipv4.com", "browser", "Networking", "Subnetting quizzes"],
  ["Cisco DevNet Sandbox", "https://devnetsandbox.cisco.com", "browser", "Networking", "Real Cisco devices in the browser (free account)"],
  ["A-Packets", "https://apackets.com", "browser", "Networking", "Upload and analyse .pcap captures without Wireshark"],
  ["Killercoda Ubuntu playground", "https://killercoda.com/playgrounds/scenario/ubuntu", "browser", "Linux", "Disposable Linux VM in the browser"],
  ["Killercoda Ansible scenarios", "https://killercoda.com/ansible", "browser", "Automation", "Guided Ansible labs"],
  ["TryHackMe", "https://tryhackme.com", "browser", "Security", "Networking and security rooms with a browser AttackBox"],
  ["Google Colab", "https://colab.research.google.com", "browser", "Automation", "Python notebooks in the browser"],
  ["Azure Cloud Shell", "https://shell.azure.com", "browser", "Cloud", "Bash and PowerShell terminal (free Azure account)"],
  ["Grafana Play", "https://play.grafana.org", "browser", "Monitoring", "Explore real dashboards"],
  ["Zabbix live demo", "https://www.zabbix.com/demo", "browser", "Monitoring", "Click through a running Zabbix"],
  ["explainshell", "https://explainshell.com", "browser", "Linux", "Paste a command to see what every flag does"],
  ["Termux", "https://play.google.com/store/apps/details?id=com.termux", "android-app", "Linux", "Real Linux terminal: ping, dig, ssh, nmap, python"],
  ["PCAPdroid", "https://play.google.com/store/apps/details?id=com.emanuelef.remote_capture", "android-app", "Networking", "Capture the tablet's traffic and export .pcap"],
  ["PingTools", "https://play.google.com/store/apps/details?id=ua.com.streamsoft.pingtools", "android-app", "Networking", "ping, traceroute, DNS lookup, port scan"],
  ["Network Analyzer Lite", "https://play.google.com/store/apps/details?id=net.techet.netanalyzerlite.an", "android-app", "Networking", "Wi-Fi details, LAN scan, ping, traceroute"],
  ["Fing", "https://play.google.com/store/apps/details?id=com.overlook.android.fing", "android-app", "Networking", "Discover devices on your own network"],
  ["Termius", "https://play.google.com/store/apps/details?id=com.server.auditor.ssh.client", "android-app", "Remote access", "SSH into lab VMs"],
  ["Windows App (Remote Desktop)", "https://play.google.com/store/apps/details?id=com.microsoft.rdc.androidx", "android-app", "Remote access", "RDP into a PC or cloud VM for Windows Server labs"],
  ["Pydroid 3", "https://play.google.com/store/apps/details?id=ru.iiec.pydroid3", "android-app", "Automation", "Offline Python IDE"],
  ["Microsoft Azure", "https://play.google.com/store/apps/details?id=com.microsoft.azure", "android-app", "Cloud", "Manage Azure resources and Cloud Shell"],
  ["AWS Console", "https://play.google.com/store/apps/details?id=com.amazon.aws.console.mobile", "android-app", "Cloud", "Check AWS resources and billing"],
  ["AnkiDroid", "https://play.google.com/store/apps/details?id=com.ichi2.anki", "android-app", "Revision", "Flashcards for ports, protocols, interview answers"],
].map(([name, url, platform, category, useFor], i) => ({
  order: i + 1,
  name,
  url,
  platform: platform as PracticeToolSeed["platform"],
  category,
  useFor,
}));
