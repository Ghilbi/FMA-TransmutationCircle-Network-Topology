# 🔮 Network Transmutation Circle - Complete Project Documentation

> **"Humankind cannot gain anything without first giving something in return. To obtain, something of equal value must be lost."**
> — The Law of Equivalent Exchange

---

## 📋 Table of Contents

1. [Project Overview](#1-project-overview)
2. [Network Architecture](#2-network-architecture)
3. [Device Inventory](#3-device-inventory)
4. [IP Addressing Scheme](#4-ip-addressing-scheme)
5. [VLAN Configuration](#5-vlan-configuration)
6. [Routing Configuration](#6-routing-configuration)
7. [Security Implementation](#7-security-implementation)
8. [Cabling Specifications](#8-cabling-specifications)
9. [Complete Device Configurations](#9-complete-device-configurations)
10. [Testing Procedures](#10-testing-procedures)
11. [Troubleshooting Guide](#11-troubleshooting-guide)
12. [Defense Presentation Guide](#12-defense-presentation-guide)

---

## 1. Project Overview

### 1.1 Project Description
This project implements a **three-tier enterprise network architecture** using Cisco Packet Tracer, featuring:
- **Core Layer**: High-speed routing backbone with redundancy
- **Distribution Layer**: Policy enforcement and VLAN routing
- **Access Layer**: End-user connectivity with security controls

### 1.2 Design Philosophy
The network follows the "Transmutation Circle" theme inspired by Fullmetal Alchemist, where:
- **Cardinal directions** (N, E, S, W) organize network segments
- **Elemental symbols** represent device functions
- **Equivalent Exchange** ensures balanced security and accessibility

### 1.3 Key Features
| Feature | Implementation |
|---------|---------------|
| Redundancy | Dual core routers with OSPF failover |
| Segmentation | 4 VLANs for traffic isolation |
| Security | Firewalls, ACLs, Port Security, BPDU Guard |
| Scalability | Modular design with room for expansion |
| Management | VTP for centralized VLAN management |

---

## 2. Network Architecture

### 2.1 Three-Tier Hierarchy

```
                    ┌─────────────────────────────────────┐
                    │           CORE LAYER                │
                    │    CORE-R1 ←──────→ CORE-R2         │
                    │     (Truth)         (Gate)          │
                    └─────────────┬───────────────────────┘
                                  │
            ┌─────────────────────┼─────────────────────┐
            │                     │                     │
      ┌─────┴─────┐         ┌─────┴─────┐         ┌─────┴─────┐
      │   FW-N    │         │   FW-E    │         │   FW-S    │    FW-W
      │  (Flame)  │         │  (Water)  │         │  (Earth)  │   (Wind)
      └─────┬─────┘         └─────┬─────┘         └─────┬─────┘
            │                     │                     │
      ┌─────┴─────┐         ┌─────┴─────┐         ┌─────┴─────┐
      │   DSW-N   │         │   DSW-E   │         │   DSW-S   │   DSW-W
      │  (Human)  │         │  (Soul)   │         │  (Mind)   │  (Spirit)
      │  VLAN 10  │         │  VLAN 20  │         │  VLAN 30  │  VLAN 40
      └─────┬─────┘         └─────┬─────┘         └─────┬─────┘
            │                     │                     │
      ┌─────┴─────┐         ┌─────┴─────┐         ┌─────┴─────┐
      │ ASW-N1/N2 │         │ ASW-E1/E2 │         │ ASW-S1/S2 │  ASW-W1/W2
      │ (Iron/Gold)│        │(Silver/Copper)│     │(Lead/Tin) │  (Mercury/Salt)
      └─────┬─────┘         └─────┬─────┘         └─────┬─────┘
            │                     │                     │
      ┌─────┴─────┐         ┌─────┴─────┐         ┌─────┴─────┐
      │ Endpoints │         │ Endpoints │         │ Endpoints │   Endpoints
      │ Servers   │         │    PCs    │         │  Servers  │   Guest PCs
      └───────────┘         └───────────┘         └───────────┘
```

### 2.2 Ring Layout (Transmutation Circle)
| Ring | Layer | Radius | Devices |
|------|-------|--------|---------|
| Ring 0 | Core | Center | CORE-R1, CORE-R2 |
| Ring 1 | Security | Inner | FW-N, FW-E, FW-S, FW-W |
| Ring 2 | Distribution | Middle | DSW-N, DSW-E, DSW-S, DSW-W |
| Ring 3 | Access | Outer | 8 Access Switches (2 per direction) |
| Ring 4 | Endpoints | Outermost | Servers, PCs |

---

## 3. Device Inventory

### 3.1 Core Layer Devices
| Device ID | Name | Model | Role | Symbol |
|-----------|------|-------|------|--------|
| CORE-R1 | Core Router Alpha | Cisco 2911 | Primary Router | Truth ⬡ |
| CORE-R2 | Core Router Omega | Cisco 2911 | Secondary Router | Gate ⬡ |

### 3.2 Security Layer Devices
| Device ID | Name | Model | Role | Symbol |
|-----------|------|-------|------|--------|
| FW-N | Firewall North | ASA 5506-X | North Segment Security | Flame ⊛ |
| FW-E | Firewall East | ASA 5506-X | East Segment Security | Water ⊛ |
| FW-S | Firewall South | ASA 5506-X | South Segment Security | Earth ⊛ |
| FW-W | Firewall West | ASA 5506-X | West Segment Security | Wind ⊛ |

### 3.3 Distribution Layer Devices
| Device ID | Name | Model | VLAN | Symbol |
|-----------|------|-------|------|--------|
| DSW-N | Distribution Switch North | Catalyst 3560 | VLAN 10 | Human ☿ |
| DSW-E | Distribution Switch East | Catalyst 3560 | VLAN 20 | Soul ☿ |
| DSW-S | Distribution Switch South | Catalyst 3560 | VLAN 30 | Mind ☿ |
| DSW-W | Distribution Switch West | Catalyst 3560 | VLAN 40 | Spirit ☿ |

### 3.4 Access Layer Devices
| Device ID | Name | Model | VLAN | Symbol |
|-----------|------|-------|------|--------|
| ASW-N1 | Access Switch N1 | Catalyst 2960 | VLAN 10 | Iron ◎ |
| ASW-N2 | Access Switch N2 | Catalyst 2960 | VLAN 10 | Gold ◎ |
| ASW-E1 | Access Switch E1 | Catalyst 2960 | VLAN 20 | Silver ◎ |
| ASW-E2 | Access Switch E2 | Catalyst 2960 | VLAN 20 | Copper ◎ |
| ASW-S1 | Access Switch S1 | Catalyst 2960 | VLAN 30 | Lead ◎ |
| ASW-S2 | Access Switch S2 | Catalyst 2960 | VLAN 30 | Tin ◎ |
| ASW-W1 | Access Switch W1 | Catalyst 2960 | VLAN 40 | Mercury ◎ |
| ASW-W2 | Access Switch W2 | Catalyst 2960 | VLAN 40 | Salt ◎ |

### 3.5 Endpoint Devices
| Device ID | Name | Type | VLAN | IP Address | Symbol |
|-----------|------|------|------|------------|--------|
| SRV-N1 | Web Server | Server-PT | 10 | 192.168.10.10 | Philosopher ☉ |
| SRV-N2 | Application Server | Server-PT | 10 | 192.168.10.11 | Stone ☉ |
| PC-E1 | Workstation Alpha | PC-PT | 20 | DHCP | Seeker ☽ |
| PC-E2 | Workstation Beta | PC-PT | 20 | DHCP | Acolyte ☽ |
| SRV-S1 | Database Server | Server-PT | 30 | 192.168.30.10 | Archive ☉ |
| SRV-S2 | DNS/DHCP Server | Server-PT | 30 | 192.168.30.20 | Oracle ☉ |
| PC-W1 | Guest Terminal Alpha | PC-PT | 40 | DHCP | Wanderer ☽ |
| PC-W2 | Guest Terminal Beta | PC-PT | 40 | DHCP | Pilgrim ☽ |

---

## 4. IP Addressing Scheme

### 4.1 Core Infrastructure (10.0.x.x/30 - Point-to-Point Links)
| Link | Network | Device A | IP A | Device B | IP B |
|------|---------|----------|------|----------|------|
| Core Interconnect | 10.0.0.0/30 | CORE-R1 | 10.0.0.1 | CORE-R2 | 10.0.0.2 |
| R1 to FW-N | 10.0.1.0/30 | CORE-R1 | 10.0.1.1 | FW-N | 10.0.1.2 |
| R1 to FW-S | 10.0.2.0/30 | CORE-R1 | 10.0.2.1 | FW-S | 10.0.2.2 |
| R2 to FW-E | 10.0.3.0/30 | CORE-R2 | 10.0.3.1 | FW-E | 10.0.3.2 |
| R2 to FW-W | 10.0.4.0/30 | CORE-R2 | 10.0.4.1 | FW-W | 10.0.4.2 |

### 4.2 VLAN Networks (192.168.x.0/24)
| VLAN | Network | Gateway | DHCP Range | Purpose |
|------|---------|---------|------------|---------|
| 10 | 192.168.10.0/24 | 192.168.10.1 | .100-.200 | Admin/Servers |
| 20 | 192.168.20.0/24 | 192.168.20.1 | .100-.200 | User Workstations |
| 30 | 192.168.30.0/24 | 192.168.30.1 | N/A (Static) | Server Farm |
| 40 | 192.168.40.0/24 | 192.168.40.1 | .100-.200 | Guest Network |

### 4.3 DMZ Networks (172.16.x.0/24)
| Firewall | DMZ Network | Purpose |
|----------|-------------|---------|
| FW-N | 172.16.1.0/24 | Public Web Services |
| FW-E | 172.16.2.0/24 | Remote Access |
| FW-S | 172.16.3.0/24 | External Services |
| FW-W | 172.16.4.0/24 | DNS/External |

### 4.4 Firewall Inside Interfaces
| Firewall | Inside IP | Security Level |
|----------|-----------|----------------|
| FW-N | 192.168.10.254 | 100 |
| FW-E | 192.168.20.254 | 100 |
| FW-S | 192.168.30.254 | 100 |
| FW-W | 192.168.40.254 | 100 |

---

## 5. VLAN Configuration

### 5.1 VLAN Database
| VLAN ID | Name | Purpose | Color Code |
|---------|------|---------|------------|
| 10 | VLAN10-ADMIN | Administrative users and servers | Red (#ff6b6b) |
| 20 | VLAN20-USERS | Regular user workstations | Teal (#4ecdc4) |
| 30 | VLAN30-SERVERS | Server farm (Database, DNS, DHCP) | Blue (#45b7d1) |
| 40 | VLAN40-GUEST | Guest network (Internet only) | Green (#96ceb4) |
| 100 | VLAN100-NATIVE | Native VLAN for trunks | - |
| 999 | VLAN999-BLACKHOLE | Unused ports (security) | - |

### 5.2 VTP Configuration
```
VTP Domain: ALCHEMY
VTP Password: transmute
VTP Mode:
  - Distribution Switches: Server
  - Access Switches: Client
```

### 5.3 Trunk Configuration
| Trunk Link | Allowed VLANs | Native VLAN |
|------------|---------------|-------------|
| DSW → ASW | Per-segment VLAN + 100 | 100 |
| ASW Uplinks | Segment VLAN + 100 | 100 |

---

## 6. Routing Configuration

### 6.1 OSPF Configuration
```
OSPF Process ID: 1
Area: 0 (Backbone)
Network: 10.0.0.0/16

Router IDs:
  CORE-R1: 1.1.1.1
  CORE-R2: 2.2.2.2
```

### 6.2 OSPF Passive Interfaces
- All interfaces are passive by default
- Non-passive interfaces:
  - Gig0/0 (Core interconnect)
  - Gig0/1, Gig0/2 (Firewall links)

### 6.3 Static Routes on Firewalls
| Firewall | Destination | Next Hop |
|----------|-------------|----------|
| FW-N | 0.0.0.0/0 | 10.0.1.1 |
| FW-E | 0.0.0.0/0 | 10.0.3.1 |
| FW-S | 0.0.0.0/0 | 10.0.2.1 |
| FW-W | 0.0.0.0/0 | 10.0.4.1 |

---

## 7. Security Implementation

### 7.1 Firewall Access Control Lists

#### FW-N (North - Admin/Web)
```
OUTSIDE-IN:
  permit tcp any host 172.16.1.10 eq www
  permit tcp any host 172.16.1.10 eq 443
  deny ip any any

INSIDE-OUT:
  permit ip 192.168.10.0/24 any
  deny ip any any
```

#### FW-E (East - Users)
```
OUTSIDE-IN:
  permit tcp any host 172.16.2.10 eq 22
  permit tcp any host 172.16.2.10 eq 3389
  deny ip any any

INSIDE-OUT:
  permit ip 192.168.20.0/24 any
  deny ip any any
```

#### FW-S (South - Servers)
```
OUTSIDE-IN:
  permit icmp any any echo-reply
  deny ip any any

INSIDE-OUT:
  permit ip 192.168.30.0/24 any
  deny ip any any
```

#### FW-W (West - Guest)
```
OUTSIDE-IN:
  permit tcp any any eq domain
  permit udp any any eq domain
  deny ip any any

INSIDE-OUT:
  permit ip 192.168.40.0/24 any
  deny ip any any
```

### 7.2 Router ACLs (CORE-R1/R2)
```
ip access-list extended CORE-PROTECT
  remark Block spoofed internal addresses
  deny ip 10.0.0.0 0.255.255.255 10.0.0.0 0.255.255.255
  permit ip any any
```

### 7.3 VLAN ACLs (Distribution Switches)
```
ip access-list extended VLANxx-IN
  permit ip 192.168.xx.0 0.0.0.255 any
  deny ip any any

ip access-list extended VLANxx-OUT
  permit ip any 192.168.xx.0 0.0.0.255
  deny ip any any
```

### 7.4 Port Security (Access Switches)

| VLAN | Max MACs | Violation Action | Sticky |
|------|----------|------------------|--------|
| 10 (Admin) | 2 | Restrict | Yes |
| 20 (Users) | 2 | Restrict | Yes |
| 30 (Servers) | 1 | Shutdown | Yes |
| 40 (Guest) | 3 | Protect | No |

### 7.5 Spanning Tree Security
```
spanning-tree mode rapid-pvst
spanning-tree portfast              ! On access ports
spanning-tree bpduguard enable      ! On access ports
switchport nonegotiate              ! On trunk ports
```

### 7.6 Password Security
| Access Method | Password Type | Encryption |
|---------------|---------------|------------|
| Enable Secret | Hashed | Type 5 (MD5) |
| Console | Password | Type 7 |
| VTY Lines | Password | Type 7 |
| Transport | SSH only | - |

---

## 8. Cabling Specifications

### 8.1 Cable Types Used
| Connection Type | Cable | Color (Packet Tracer) |
|-----------------|-------|----------------------|
| Router ↔ Router | Copper Crossover | Red |
| Router ↔ Switch | Copper Straight-Through | Black |
| Switch ↔ Switch (Trunk) | Copper Straight-Through | Black |
| Switch ↔ PC/Server | Copper Straight-Through | Black |
| Firewall ↔ Any | Copper Straight-Through | Black |

### 8.2 Interface Assignments

#### Core Routers
| Device | Interface | Connected To | Cable |
|--------|-----------|--------------|-------|
| CORE-R1 | Gig0/0 | CORE-R2 Gig0/0 | Crossover |
| CORE-R1 | Gig0/1 | FW-N Gig1/1 | Straight |
| CORE-R1 | Gig0/2 | FW-S Gig1/1 | Straight |
| CORE-R2 | Gig0/0 | CORE-R1 Gig0/0 | Crossover |
| CORE-R2 | Gig0/1 | FW-E Gig1/1 | Straight |
| CORE-R2 | Gig0/2 | FW-W Gig1/1 | Straight |

#### Firewalls
| Device | Interface | Connected To | Purpose |
|--------|-----------|--------------|---------|
| All FWs | Gig1/1 | Core Router | Outside |
| All FWs | Gig1/2 | DSW | Inside |
| All FWs | Gig1/3 | DMZ | DMZ |

#### Distribution Switches
| Device | Interface | Connected To |
|--------|-----------|--------------|
| DSW-x | Gig1/0/1 | FW-x Gig1/2 |
| DSW-x | Gig1/0/2 | ASW-x1 Gig0/1 |
| DSW-x | Gig1/0/3 | ASW-x2 Gig0/1 |

#### Access Switches
| Device | Interface | Connected To |
|--------|-----------|--------------|
| ASW-x1/x2 | Gig0/1 | DSW-x (Trunk) |
| ASW-x1/x2 | Fa0/1-12 | End Devices |
| ASW-x1/x2 | Fa0/13-24 | Unused (VLAN 999) |

---

## 9. Complete Device Configurations

### 9.1 CORE-R1 (Truth)
```
hostname CORE-R1-Truth
!
enable secret 5 $1$mERr$hx5rVt7rPNoS4wqbXKX7m0
service password-encryption
!
ip routing
!
interface GigabitEthernet0/0
 description Link to CORE-R2
 ip address 10.0.0.1 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/1
 description Link to FW-N
 ip address 10.0.1.1 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/2
 description Link to FW-S
 ip address 10.0.2.1 255.255.255.252
 no shutdown
!
router ospf 1
 router-id 1.1.1.1
 network 10.0.0.0 0.0.255.255 area 0
 passive-interface default
 no passive-interface GigabitEthernet0/0
 no passive-interface GigabitEthernet0/1
 no passive-interface GigabitEthernet0/2
!
ip access-list extended CORE-PROTECT
 remark Block spoofed internal addresses
 deny ip 10.0.0.0 0.255.255.255 10.0.0.0 0.255.255.255
 permit ip any any
!
line console 0
 password 7 0822455D0A16
 login
line vty 0 4
 password 7 0822455D0A16
 login
 transport input ssh
```

### 9.2 CORE-R2 (Gate)
```
hostname CORE-R2-Gate
!
enable secret 5 $1$mERr$hx5rVt7rPNoS4wqbXKX7m0
service password-encryption
!
ip routing
!
interface GigabitEthernet0/0
 description Link to CORE-R1
 ip address 10.0.0.2 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/1
 description Link to FW-E
 ip address 10.0.3.1 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/2
 description Link to FW-W
 ip address 10.0.4.1 255.255.255.252
 no shutdown
!
router ospf 1
 router-id 2.2.2.2
 network 10.0.0.0 0.0.255.255 area 0
 passive-interface default
 no passive-interface GigabitEthernet0/0
 no passive-interface GigabitEthernet0/1
 no passive-interface GigabitEthernet0/2
!
ip access-list extended CORE-PROTECT
 remark Block spoofed internal addresses
 deny ip 10.0.0.0 0.255.255.255 10.0.0.0 0.255.255.255
 permit ip any any
!
line console 0
 password 7 0822455D0A16
 login
line vty 0 4
 password 7 0822455D0A16
 login
 transport input ssh
```

### 9.3 FW-N (Flame)
```
hostname FW-North-Flame
!
enable password cisco123
passwd cisco123
!
interface GigabitEthernet1/1
 nameif outside
 security-level 0
 ip address 10.0.1.2 255.255.255.252
 no shutdown
!
interface GigabitEthernet1/2
 nameif inside
 security-level 100
 ip address 192.168.10.254 255.255.255.0
 no shutdown
!
interface GigabitEthernet1/3
 nameif dmz
 security-level 50
 ip address 172.16.1.1 255.255.255.0
 no shutdown
!
access-list OUTSIDE-IN extended permit tcp any host 172.16.1.10 eq www
access-list OUTSIDE-IN extended permit tcp any host 172.16.1.10 eq 443
access-list OUTSIDE-IN extended deny ip any any
!
access-list INSIDE-OUT extended permit ip 192.168.10.0 255.255.255.0 any
access-list INSIDE-OUT extended deny ip any any
!
access-group OUTSIDE-IN in interface outside
access-group INSIDE-OUT in interface inside
!
route outside 0.0.0.0 0.0.0.0 10.0.1.1 1
```

### 9.4 DSW-N (Human) - Distribution Switch Example
```
hostname DSW-North-Human
!
enable secret 5 $1$mERr$hx5rVt7rPNoS4wqbXKX7m0
service password-encryption
!
ip routing
vtp mode server
vtp domain ALCHEMY
vtp password transmute
!
vlan 10
 name VLAN10-ADMIN
vlan 100
 name VLAN100-NATIVE
vlan 999
 name VLAN999-BLACKHOLE
!
interface GigabitEthernet1/0/1
 description Uplink to FW-N
 no switchport
 ip address 192.168.10.1 255.255.255.0
 no shutdown
!
interface GigabitEthernet1/0/2
 description Trunk to ASW-N1
 switchport mode trunk
 switchport trunk native vlan 100
 switchport trunk allowed vlan 10,100
 switchport nonegotiate
 no shutdown
!
interface GigabitEthernet1/0/3
 description Trunk to ASW-N2
 switchport mode trunk
 switchport trunk native vlan 100
 switchport trunk allowed vlan 10,100
 switchport nonegotiate
 no shutdown
!
interface Vlan10
 ip address 192.168.10.1 255.255.255.0
 ip access-group VLAN10-IN in
 ip access-group VLAN10-OUT out
 no shutdown
!
ip access-list extended VLAN10-IN
 permit ip 192.168.10.0 0.0.0.255 any
 deny ip any any
!
ip access-list extended VLAN10-OUT
 permit ip any 192.168.10.0 0.0.0.255
 deny ip any any
!
ip default-gateway 192.168.10.254
!
spanning-tree mode rapid-pvst
spanning-tree vlan 10 root primary
```

### 9.5 ASW-N1 (Iron) - Access Switch Example
```
hostname ASW-N1-Iron
!
enable secret 5 $1$mERr$hx5rVt7rPNoS4wqbXKX7m0
service password-encryption
!
vtp mode client
vtp domain ALCHEMY
vtp password transmute
!
vlan 10
 name VLAN10-ADMIN
vlan 100
 name VLAN100-NATIVE
vlan 999
 name VLAN999-BLACKHOLE
!
interface GigabitEthernet0/1
 description Trunk to DSW-N
 switchport mode trunk
 switchport trunk native vlan 100
 switchport trunk allowed vlan 10,100
 switchport nonegotiate
 no shutdown
!
interface range FastEthernet0/1-12
 description Access Ports - VLAN 10
 switchport mode access
 switchport access vlan 10
 switchport port-security
 switchport port-security maximum 2
 switchport port-security violation restrict
 switchport port-security mac-address sticky
 spanning-tree portfast
 spanning-tree bpduguard enable
 no shutdown
!
interface range FastEthernet0/13-24
 description Unused Ports - Disabled
 switchport mode access
 switchport access vlan 999
 shutdown
!
spanning-tree mode rapid-pvst
spanning-tree portfast default
```

---

## 10. Testing Procedures

### 10.1 Pre-Testing Checklist
- [ ] All devices powered on
- [ ] All cables connected (green indicators in Packet Tracer)
- [ ] All interface configurations applied
- [ ] VLAN database synchronized

### 10.2 Layer 1 Tests - Physical Connectivity

#### Test 1.1: Interface Status
**Command:** `show ip interface brief`
**Run on:** All routers and L3 switches
**Expected Result:**
```
Interface              IP-Address      OK? Method Status Protocol
GigabitEthernet0/0     10.0.0.1        YES manual up     up
GigabitEthernet0/1     10.0.1.1        YES manual up     up
```
**Pass Criteria:** All interfaces show `up/up`

#### Test 1.2: Cable Verification
**Action:** Visual inspection in Packet Tracer
**Expected Result:** All connection triangles are GREEN
**Pass Criteria:** No red or orange indicators

---

### 10.3 Layer 2 Tests - Switching

#### Test 2.1: VLAN Database
**Command:** `show vlan brief`
**Run on:** All switches
**Expected Result:**
```
VLAN Name                Status    Ports
---- ------------------- --------- ------
10   VLAN10-ADMIN        active    Fa0/1-12
100  VLAN100-NATIVE      active    
999  VLAN999-BLACKHOLE   active    Fa0/13-24
```
**Pass Criteria:** All VLANs present with correct ports

#### Test 2.2: Trunk Status
**Command:** `show interfaces trunk`
**Run on:** All switches
**Expected Result:**
```
Port        Mode         Encapsulation  Status        Native vlan
Gi0/1       on           802.1q         trunking      100

Port        Vlans allowed on trunk
Gi0/1       10,100
```
**Pass Criteria:** Trunks active with correct allowed VLANs

#### Test 2.3: VTP Status
**Command:** `show vtp status`
**Run on:** All switches
**Expected Result:**
```
VTP Domain Name                 : ALCHEMY
VTP Operating Mode              : Server/Client
VTP Version Running             : 2
Configuration Revision          : X (same on all)
```
**Pass Criteria:** Same domain name and revision across all switches

#### Test 2.4: Spanning Tree
**Command:** `show spanning-tree`
**Run on:** Distribution switches
**Expected Result:** DSW-N is root for VLAN 10, DSW-E for VLAN 20, etc.
**Pass Criteria:** Correct root bridge per VLAN, no blocked ports on access links

#### Test 2.5: Port Security
**Command:** `show port-security interface fa0/1`
**Run on:** Access switches
**Expected Result:**
```
Port Security              : Enabled
Port Status                : Secure-up
Violation Mode             : Restrict
Maximum MAC Addresses      : 2
Sticky MAC Addresses       : 1
```
**Pass Criteria:** Port security active with correct settings

---

### 10.4 Layer 3 Tests - Routing

#### Test 3.1: OSPF Neighbors
**Command:** `show ip ospf neighbor`
**Run on:** CORE-R1 and CORE-R2
**Expected Result:**
```
Neighbor ID     Pri   State           Dead Time   Address         Interface
2.2.2.2         1     FULL/DR         00:00:38    10.0.0.2        Gi0/0
```
**Pass Criteria:** Both routers show FULL state

#### Test 3.2: Routing Table
**Command:** `show ip route`
**Run on:** Core routers
**Expected Result:**
```
O    10.0.1.0/30 [110/2] via 10.0.0.1
O    10.0.2.0/30 [110/2] via 10.0.0.1
C    10.0.0.0/30 is directly connected
```
**Pass Criteria:** All networks visible, OSPF routes with [110/x]

#### Test 3.3: OSPF Database
**Command:** `show ip ospf database`
**Run on:** Core routers
**Expected Result:** LSAs from both router IDs (1.1.1.1 and 2.2.2.2)
**Pass Criteria:** Complete LSDB with no missing entries

---

### 10.5 Connectivity Tests (PING)

#### Test 4.1: Same VLAN Connectivity
| Source | Destination | Command | Expected |
|--------|-------------|---------|----------|
| SRV-N1 (192.168.10.10) | SRV-N2 (192.168.10.11) | `ping 192.168.10.11` | ✅ Success |
| PC-E1 (192.168.20.100) | PC-E2 (192.168.20.101) | `ping 192.168.20.101` | ✅ Success |
| PC-W1 (192.168.40.100) | PC-W2 (192.168.40.101) | `ping 192.168.40.101` | ✅ Success |

#### Test 4.2: Core Router Connectivity
| Source | Destination | Command | Expected |
|--------|-------------|---------|----------|
| CORE-R1 | CORE-R2 | `ping 10.0.0.2` | ✅ 5/5 Success |
| CORE-R1 | FW-N | `ping 10.0.1.2` | ✅ 5/5 Success |
| CORE-R2 | FW-E | `ping 10.0.3.2` | ✅ 5/5 Success |

#### Test 4.3: Cross-VLAN Tests (Through Firewall)
| Source | Destination | Command | Expected | Notes |
|--------|-------------|---------|----------|-------|
| SRV-N1 (VLAN 10) | SRV-S1 (VLAN 30) | `ping 192.168.30.10` | ⚠️ Depends on ACL | May timeout |
| PC-E1 (VLAN 20) | PC-W1 (VLAN 40) | `ping 192.168.40.100` | ❌ Blocked | Guest isolated |

#### Test 4.4: Gateway Reachability
| Device | Gateway | Command | Expected |
|--------|---------|---------|----------|
| SRV-N1 | 192.168.10.1 | `ping 192.168.10.1` | ✅ Success |
| PC-E1 | 192.168.20.1 | `ping 192.168.20.1` | ✅ Success |
| SRV-S1 | 192.168.30.1 | `ping 192.168.30.1` | ✅ Success |

---

### 10.6 Security Tests

#### Test 5.1: VLAN Isolation (Guest → Admin)
**Source:** PC-W1 (Guest VLAN 40)
**Destination:** SRV-N1 (Admin VLAN 10)
**Command:** `ping 192.168.10.10`
**Expected Result:** `Request timed out`
**Pass Criteria:** Ping fails - Guest cannot reach Admin network

#### Test 5.2: Firewall ACL Verification
**Command:** `show access-lists` (on firewalls)
**Expected Result:**
```
access-list OUTSIDE-IN line 1 permit tcp any host 172.16.1.10 eq www (hitcnt=X)
access-list OUTSIDE-IN line 2 deny ip any any (hitcnt=Y)
```
**Pass Criteria:** Hit counters incrementing on active rules

#### Test 5.3: Port Security Violation
**Action:** Connect 3 devices to access port (max is 2)
**Expected Result:** Third device cannot communicate, violation logged
**Command to verify:** `show port-security interface fa0/x`
**Pass Criteria:** `SecurityViolation` counter incremented

#### Test 5.4: BPDU Guard Test
**Action:** Connect another switch to an access port
**Expected Result:** Port goes err-disabled
**Command to verify:** `show interfaces fa0/x`
**Pass Criteria:** Interface shows `err-disabled`

#### Test 5.5: Unused Port Security
**Command:** `show interfaces fa0/13`
**Expected Result:** `FastEthernet0/13 is administratively down`
**Pass Criteria:** All unused ports (13-24) are shutdown in VLAN 999

---

### 10.7 Redundancy Tests

#### Test 6.1: Core Router Failover
**Procedure:**
1. From PC-E1, start continuous ping to SRV-S1: `ping -t 192.168.30.10`
2. On CORE-R1, shutdown Gig0/0: `shutdown`
3. Observe OSPF reconvergence
4. Count dropped pings

**Expected Result:**
- Brief loss (3-10 pings)
- Traffic resumes via alternate path
- OSPF reconverges within 40 seconds

**Pass Criteria:** Connectivity restored automatically

#### Test 6.2: Access Switch Failover
**Procedure:**
1. Disconnect ASW-N1 from DSW-N
2. Verify STP reconvergence on ASW-N2

**Expected Result:** Traffic continues through ASW-N2
**Pass Criteria:** No permanent connectivity loss

---

### 10.8 Test Results Summary Template

| Category | Test | Result | Notes |
|----------|------|--------|-------|
| **Layer 1** | Interface Status | ⬜ Pass / ⬜ Fail | |
| | Cable Verification | ⬜ Pass / ⬜ Fail | |
| **Layer 2** | VLAN Database | ⬜ Pass / ⬜ Fail | |
| | Trunk Status | ⬜ Pass / ⬜ Fail | |
| | VTP Sync | ⬜ Pass / ⬜ Fail | |
| | Spanning Tree | ⬜ Pass / ⬜ Fail | |
| | Port Security | ⬜ Pass / ⬜ Fail | |
| **Layer 3** | OSPF Neighbors | ⬜ Pass / ⬜ Fail | |
| | Routing Table | ⬜ Pass / ⬜ Fail | |
| | OSPF Database | ⬜ Pass / ⬜ Fail | |
| **Connectivity** | Same VLAN Ping | ⬜ Pass / ⬜ Fail | |
| | Gateway Ping | ⬜ Pass / ⬜ Fail | |
| | Cross-VLAN Blocking | ⬜ Pass / ⬜ Fail | |
| **Security** | VLAN Isolation | ⬜ Pass / ⬜ Fail | |
| | Firewall ACLs | ⬜ Pass / ⬜ Fail | |
| | Port Security | ⬜ Pass / ⬜ Fail | |
| | BPDU Guard | ⬜ Pass / ⬜ Fail | |
| **Redundancy** | Core Failover | ⬜ Pass / ⬜ Fail | |

---

## 11. Troubleshooting Guide

### 11.1 Common Issues and Solutions

#### Issue: Interface Shows "administratively down"
**Symptom:** `show ip int brief` shows interface as `down/down`
**Cause:** Interface not enabled
**Solution:**
```
interface GigabitEthernet0/1
 no shutdown
```

#### Issue: OSPF Neighbors Not Forming
**Symptom:** `show ip ospf neighbor` shows empty
**Checks:**
1. Interfaces in same subnet? `show ip int brief`
2. OSPF network statement correct? `show run | section ospf`
3. Hello/Dead timers match? `show ip ospf interface`
4. Interface not passive? `show ip ospf interface`

**Solution:**
```
router ospf 1
 no passive-interface GigabitEthernet0/0
```

#### Issue: VLANs Not Propagating
**Symptom:** VLANs missing on client switches
**Checks:**
1. VTP domain matches? `show vtp status`
2. VTP password matches? `show vtp password`
3. Trunk is up? `show interfaces trunk`

**Solution:**
```
vtp domain ALCHEMY
vtp password transmute
```

#### Issue: Trunk Not Forming
**Symptom:** `show interfaces trunk` empty
**Checks:**
1. Both ends configured as trunk?
2. Encapsulation matches?
3. Native VLAN matches?

**Solution:**
```
interface GigabitEthernet0/1
 switchport mode trunk
 switchport trunk encapsulation dot1q
 switchport trunk native vlan 100
```

#### Issue: Port Security Violation
**Symptom:** Device can't communicate, port restricted/shutdown
**Check:** `show port-security interface fa0/x`
**Solution:**
```
! Clear sticky MAC addresses
clear port-security sticky interface fa0/1

! Re-enable err-disabled port
interface FastEthernet0/1
 shutdown
 no shutdown
```

#### Issue: Ping Fails Between VLANs
**Symptom:** Same VLAN works, cross-VLAN fails
**Checks:**
1. Default gateway configured on endpoints?
2. Routing enabled on L3 switch? `ip routing`
3. ACLs blocking traffic? `show access-lists`
4. Firewall rules? `show access-lists`

#### Issue: STP Blocking Wrong Ports
**Symptom:** Expected active port is in blocking state
**Check:** `show spanning-tree`
**Solution:** Verify root bridge priority
```
spanning-tree vlan 10 root primary
```

---

## 12. Defense Presentation Guide

### 12.1 Key Talking Points

#### Opening Statement
*"This project implements a three-tier enterprise network following Cisco best practices, featuring redundant core routing, segmented VLANs, and defense-in-depth security."*

#### Architecture Highlights
1. **Three-Tier Design**: Core → Distribution → Access
2. **Redundancy**: Dual core routers with OSPF for automatic failover
3. **Segmentation**: 4 VLANs isolating different user groups
4. **Security**: Multiple layers (Firewalls, ACLs, Port Security, BPDU Guard)

### 12.2 Questions to Prepare For

| Question | Answer |
|----------|--------|
| Why three-tier architecture? | Scalability, manageability, clear separation of functions |
| Why OSPF instead of static routes? | Dynamic convergence, automatic failover, scalability |
| How does VLAN isolation work? | Layer 2 separation, traffic must route through firewall |
| What happens if CORE-R1 fails? | OSPF reconverges, traffic reroutes through CORE-R2 |
| Why use VTP? | Centralized VLAN management, consistency across switches |
| What is port security protecting against? | MAC flooding, CAM table overflow, unauthorized devices |
| Why BPDU Guard on access ports? | Prevents rogue switches, protects STP topology |
| Why Native VLAN 100 instead of 1? | Security best practice, prevents VLAN hopping |

### 12.3 Live Demonstration Script

#### Demo 1: Show Working Connectivity (2 min)
```
1. Open PC-E1 command prompt
2. ping 192.168.20.1 (gateway) - SUCCESS
3. ping 192.168.20.101 (same VLAN) - SUCCESS
4. Show "Network is working normally"
```

#### Demo 2: Demonstrate VLAN Isolation (2 min)
```
1. From PC-W1 (Guest)
2. ping 192.168.10.10 (Admin server)
3. Show TIMEOUT - "Guest cannot reach Admin network"
4. Explain: "Firewall blocks cross-VLAN traffic"
```

#### Demo 3: Show OSPF Convergence (3 min)
```
1. On CORE-R1: show ip ospf neighbor (FULL state)
2. On CORE-R1: show ip route (OSPF routes)
3. Shutdown CORE-R1 Gig0/0
4. On CORE-R2: show ip ospf neighbor (routing changes)
5. Show traffic still flowing
```

#### Demo 4: Port Security (2 min)
```
1. On ASW-N1: show port-security
2. Show maximum MACs, violation mode
3. Explain sticky MAC learning
```

#### Demo 5: Show Running Config (1 min)
```
1. On key device: show running-config
2. Highlight: passwords encrypted, ACLs applied, security features
```

### 12.4 Project Statistics Summary

| Metric | Value |
|--------|-------|
| Total Devices | 26 |
| Core Routers | 2 |
| Firewalls | 4 |
| L3 Switches (Distribution) | 4 |
| L2 Switches (Access) | 8 |
| Servers | 4 |
| PCs | 4 |
| VLANs Configured | 6 (4 user + Native + Blackhole) |
| OSPF Areas | 1 (Backbone) |
| Security Controls | 6+ per device |

---

## Appendix A: Quick Reference Commands

### Show Commands
```
show ip interface brief          ! Interface status
show vlan brief                  ! VLAN database
show interfaces trunk            ! Trunk status
show vtp status                  ! VTP information
show spanning-tree               ! STP status
show ip ospf neighbor            ! OSPF neighbors
show ip route                    ! Routing table
show access-lists                ! ACL status with hit counts
show port-security               ! Port security summary
show port-security interface X   ! Per-interface security
show running-config              ! Full configuration
```

### Configuration Mode
```
enable                           ! Enter privileged mode
configure terminal               ! Enter config mode
interface X                      ! Enter interface config
end                              ! Return to privileged mode
copy running-config startup-config  ! Save configuration
```

---

## Appendix B: Network Diagram ASCII Art

```
                                    ┌─────────────────────┐
                                    │      INTERNET       │
                                    └──────────┬──────────┘
                                               │
                    ┌──────────────────────────┼──────────────────────────┐
                    │                          │                          │
              ┌─────┴─────┐              ┌─────┴─────┐              ┌─────┴─────┐
              │  CORE-R1  │──────────────│  CORE-R2  │              │   (DMZ)   │
              │  (Truth)  │   10.0.0.0/30│  (Gate)   │              │           │
              │ 10.0.0.1  │              │ 10.0.0.2  │              │           │
              └─────┬─────┘              └─────┬─────┘              └───────────┘
                    │                          │
         ┌──────────┼──────────┐    ┌──────────┼──────────┐
         │          │          │    │          │          │
    ┌────┴────┐┌────┴────┐    ┌────┴────┐┌────┴────┐
    │  FW-N   ││  FW-S   │    │  FW-E   ││  FW-W   │
    │ (Flame) ││ (Earth) │    │ (Water) ││ (Wind)  │
    └────┬────┘└────┬────┘    └────┬────┘└────┬────┘
         │          │              │          │
    ┌────┴────┐┌────┴────┐    ┌────┴────┐┌────┴────┐
    │  DSW-N  ││  DSW-S  │    │  DSW-E  ││  DSW-W  │
    │ VLAN 10 ││ VLAN 30 │    │ VLAN 20 ││ VLAN 40 │
    └────┬────┘└────┬────┘    └────┬────┘└────┬────┘
         │          │              │          │
    ┌────┴────┐┌────┴────┐    ┌────┴────┐┌────┴────┐
    │ASW-N1/N2││ASW-S1/S2│    │ASW-E1/E2││ASW-W1/W2│
    └────┬────┘└────┬────┘    └────┬────┘└────┬────┘
         │          │              │          │
    ┌────┴────┐┌────┴────┐    ┌────┴────┐┌────┴────┐
    │ Servers ││ Servers │    │   PCs   ││  Guest  │
    │  Admin  ││ DB/DNS  │    │  Users  ││   PCs   │
    └─────────┘└─────────┘    └─────────┘└─────────┘
```

---

**Document Version:** 2.0  
**Last Updated:** December 22, 2025  
**Author:** Network Transmutation Circle Project Team

---

*"The world isn't perfect. But it's there for us, doing the best it can. That's what makes it so damn beautiful."*
