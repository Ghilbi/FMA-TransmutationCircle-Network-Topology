// Network devices data for the Transmutation Circle Network Topology
// This data was previously served by the backend API

export const devices = [
  {
    "id": "CORE-R1",
    "name": "Core Router Alpha (Truth)",
    "type": "Router",
    "model": "Cisco 2911",
    "layer": "core",
    "symbol": "Truth",
    "vlan": null,
    "ring": 0,
    "config": "hostname CORE-R1-Truth\n!\nenable secret 5 $1$mERr$hx5rVt7rPNoS4wqbXKX7m0\nservice password-encryption\n!\nip routing\n!\ninterface GigabitEthernet0/0\n description Link to CORE-R2\n ip address 10.0.0.1 255.255.255.252\n no shutdown\n!\ninterface GigabitEthernet0/1\n description Link to FW-N\n ip address 10.0.1.1 255.255.255.252\n no shutdown\n!\ninterface GigabitEthernet0/2\n description Link to FW-S\n ip address 10.0.2.1 255.255.255.252\n no shutdown\n!\nrouter ospf 1\n router-id 1.1.1.1\n network 10.0.0.0 0.0.255.255 area 0\n passive-interface default\n no passive-interface GigabitEthernet0/0\n no passive-interface GigabitEthernet0/1\n no passive-interface GigabitEthernet0/2\n!\nip access-list extended CORE-PROTECT\n remark Block spoofed internal addresses\n deny ip 10.0.0.0 0.255.255.255 10.0.0.0 0.255.255.255\n permit ip any any\n!\nline console 0\n password 7 0822455D0A16\n login\nline vty 0 4\n password 7 0822455D0A16\n login\n transport input ssh"
  },
  {
    "id": "CORE-R2",
    "name": "Core Router Omega (Gate)",
    "type": "Router",
    "model": "Cisco 2911",
    "layer": "core",
    "symbol": "Gate",
    "vlan": null,
    "ring": 0,
    "config": "hostname CORE-R2-Gate\n!\nenable secret 5 $1$mERr$hx5rVt7rPNoS4wqbXKX7m0\nservice password-encryption\n!\nip routing\n!\ninterface GigabitEthernet0/0\n description Link to CORE-R1\n ip address 10.0.0.2 255.255.255.252\n no shutdown\n!\ninterface GigabitEthernet0/1\n description Link to FW-E\n ip address 10.0.3.1 255.255.255.252\n no shutdown\n!\ninterface GigabitEthernet0/2\n description Link to FW-W\n ip address 10.0.4.1 255.255.255.252\n no shutdown\n!\nrouter ospf 1\n router-id 2.2.2.2\n network 10.0.0.0 0.0.255.255 area 0\n passive-interface default\n no passive-interface GigabitEthernet0/0\n no passive-interface GigabitEthernet0/1\n no passive-interface GigabitEthernet0/2\n!\nip access-list extended CORE-PROTECT\n remark Block spoofed internal addresses\n deny ip 10.0.0.0 0.255.255.255 10.0.0.0 0.255.255.255\n permit ip any any\n!\nline console 0\n password 7 0822455D0A16\n login\nline vty 0 4\n password 7 0822455D0A16\n login\n transport input ssh"
  },
  {
    "id": "FW-N",
    "name": "Firewall North (Flame)",
    "type": "Firewall",
    "model": "ASA 5506-X",
    "layer": "core",
    "symbol": "Flame",
    "vlan": null,
    "ring": 1,
    "config": "hostname FW-North-Flame\n!\nenable password cisco123\npasswd cisco123\n!\ninterface GigabitEthernet1/1\n nameif outside\n security-level 0\n ip address 10.0.1.2 255.255.255.252\n no shutdown\n!\ninterface GigabitEthernet1/2\n nameif inside\n security-level 100\n ip address 192.168.10.254 255.255.255.0\n no shutdown\n!\ninterface GigabitEthernet1/3\n nameif dmz\n security-level 50\n ip address 172.16.1.1 255.255.255.0\n no shutdown\n!\naccess-list OUTSIDE-IN extended permit tcp any host 172.16.1.10 eq www\naccess-list OUTSIDE-IN extended permit tcp any host 172.16.1.10 eq 443\naccess-list OUTSIDE-IN extended deny ip any any\n!\naccess-list INSIDE-OUT extended permit ip 192.168.10.0 255.255.255.0 any\naccess-list INSIDE-OUT extended deny ip any any\n!\naccess-group OUTSIDE-IN in interface outside\naccess-group INSIDE-OUT in interface inside\n!\nroute outside 0.0.0.0 0.0.0.0 10.0.1.1 1"
  },
  {
    "id": "FW-E",
    "name": "Firewall East (Water)",
    "type": "Firewall",
    "model": "ASA 5506-X",
    "layer": "core",
    "symbol": "Water",
    "vlan": null,
    "ring": 1,
    "config": "hostname FW-East-Water\n!\nenable password cisco123\npasswd cisco123\n!\ninterface GigabitEthernet1/1\n nameif outside\n security-level 0\n ip address 10.0.3.2 255.255.255.252\n no shutdown\n!\ninterface GigabitEthernet1/2\n nameif inside\n security-level 100\n ip address 192.168.20.254 255.255.255.0\n no shutdown\n!\ninterface GigabitEthernet1/3\n nameif dmz\n security-level 50\n ip address 172.16.2.1 255.255.255.0\n no shutdown\n!\naccess-list OUTSIDE-IN extended permit tcp any host 172.16.2.10 eq 22\naccess-list OUTSIDE-IN extended permit tcp any host 172.16.2.10 eq 3389\naccess-list OUTSIDE-IN extended deny ip any any\n!\naccess-list INSIDE-OUT extended permit ip 192.168.20.0 255.255.255.0 any\naccess-list INSIDE-OUT extended deny ip any any\n!\naccess-group OUTSIDE-IN in interface outside\naccess-group INSIDE-OUT in interface inside\n!\nroute outside 0.0.0.0 0.0.0.0 10.0.3.1 1"
  },
  {
    "id": "FW-S",
    "name": "Firewall South (Earth)",
    "type": "Firewall",
    "model": "ASA 5506-X",
    "layer": "core",
    "symbol": "Earth",
    "vlan": null,
    "ring": 1,
    "config": "hostname FW-South-Earth\n!\nenable password cisco123\npasswd cisco123\n!\ninterface GigabitEthernet1/1\n nameif outside\n security-level 0\n ip address 10.0.2.2 255.255.255.252\n no shutdown\n!\ninterface GigabitEthernet1/2\n nameif inside\n security-level 100\n ip address 192.168.30.254 255.255.255.0\n no shutdown\n!\ninterface GigabitEthernet1/3\n nameif dmz\n security-level 50\n ip address 172.16.3.1 255.255.255.0\n no shutdown\n!\naccess-list OUTSIDE-IN extended permit icmp any any echo-reply\naccess-list OUTSIDE-IN extended deny ip any any\n!\naccess-list INSIDE-OUT extended permit ip 192.168.30.0 255.255.255.0 any\naccess-list INSIDE-OUT extended deny ip any any\n!\naccess-group OUTSIDE-IN in interface outside\naccess-group INSIDE-OUT in interface inside\n!\nroute outside 0.0.0.0 0.0.0.0 10.0.2.1 1"
  },
  {
    "id": "FW-W",
    "name": "Firewall West (Wind)",
    "type": "Firewall",
    "model": "ASA 5506-X",
    "layer": "core",
    "symbol": "Wind",
    "vlan": null,
    "ring": 1,
    "config": "hostname FW-West-Wind\n!\nenable password cisco123\npasswd cisco123\n!\ninterface GigabitEthernet1/1\n nameif outside\n security-level 0\n ip address 10.0.4.2 255.255.255.252\n no shutdown\n!\ninterface GigabitEthernet1/2\n nameif inside\n security-level 100\n ip address 192.168.40.254 255.255.255.0\n no shutdown\n!\ninterface GigabitEthernet1/3\n nameif dmz\n security-level 50\n ip address 172.16.4.1 255.255.255.0\n no shutdown\n!\naccess-list OUTSIDE-IN extended permit tcp any any eq domain\naccess-list OUTSIDE-IN extended permit udp any any eq domain\naccess-list OUTSIDE-IN extended deny ip any any\n!\naccess-list INSIDE-OUT extended permit ip 192.168.40.0 255.255.255.0 any\naccess-list INSIDE-OUT extended deny ip any any\n!\naccess-group OUTSIDE-IN in interface outside\naccess-group INSIDE-OUT in interface inside\n!\nroute outside 0.0.0.0 0.0.0.0 10.0.4.1 1"
  },
  {
    "id": "DSW-N",
    "name": "Distribution Switch North (Human)",
    "type": "L3 Switch",
    "model": "Catalyst 3560",
    "layer": "distribution",
    "symbol": "Human",
    "vlan": 10,
    "ring": 2,
    "config": "hostname DSW-North-Human\n!\nenable secret 5 $1$mERr$hx5rVt7rPNoS4wqbXKX7m0\nservice password-encryption\n!\nip routing\nvtp mode server\nvtp domain ALCHEMY\nvtp password transmute\n!\nvlan 10\n name VLAN10-ADMIN\nvlan 100\n name VLAN100-NATIVE\nvlan 999\n name VLAN999-BLACKHOLE\n!\ninterface GigabitEthernet1/0/1\n description Uplink to FW-N\n no switchport\n ip address 192.168.10.1 255.255.255.0\n no shutdown\n!\ninterface GigabitEthernet1/0/2\n description Trunk to ASW-N1\n switchport mode trunk\n switchport trunk native vlan 100\n switchport trunk allowed vlan 10,100\n switchport nonegotiate\n no shutdown\n!\ninterface GigabitEthernet1/0/3\n description Trunk to ASW-N2\n switchport mode trunk\n switchport trunk native vlan 100\n switchport trunk allowed vlan 10,100\n switchport nonegotiate\n no shutdown\n!\ninterface Vlan10\n ip address 192.168.10.1 255.255.255.0\n ip access-group VLAN10-IN in\n ip access-group VLAN10-OUT out\n no shutdown\n!\nip access-list extended VLAN10-IN\n permit ip 192.168.10.0 0.0.0.255 any\n deny ip any any\n!\nip access-list extended VLAN10-OUT\n permit ip any 192.168.10.0 0.0.0.255\n deny ip any any\n!\nip default-gateway 192.168.10.254\n!\nspanning-tree mode rapid-pvst\nspanning-tree vlan 10 root primary"
  },
  {
    "id": "DSW-E",
    "name": "Distribution Switch East (Soul)",
    "type": "L3 Switch",
    "model": "Catalyst 3560",
    "layer": "distribution",
    "symbol": "Soul",
    "vlan": 20,
    "ring": 2,
    "config": "hostname DSW-East-Soul\n!\nenable secret 5 $1$mERr$hx5rVt7rPNoS4wqbXKX7m0\nservice password-encryption\n!\nip routing\nvtp mode server\nvtp domain ALCHEMY\nvtp password transmute\n!\nvlan 20\n name VLAN20-USERS\nvlan 100\n name VLAN100-NATIVE\nvlan 999\n name VLAN999-BLACKHOLE\n!\ninterface GigabitEthernet1/0/1\n description Uplink to FW-E\n no switchport\n ip address 192.168.20.1 255.255.255.0\n no shutdown\n!\ninterface GigabitEthernet1/0/2\n description Trunk to ASW-E1\n switchport mode trunk\n switchport trunk native vlan 100\n switchport trunk allowed vlan 20,100\n switchport nonegotiate\n no shutdown\n!\ninterface GigabitEthernet1/0/3\n description Trunk to ASW-E2\n switchport mode trunk\n switchport trunk native vlan 100\n switchport trunk allowed vlan 20,100\n switchport nonegotiate\n no shutdown\n!\ninterface Vlan20\n ip address 192.168.20.1 255.255.255.0\n ip access-group VLAN20-IN in\n ip access-group VLAN20-OUT out\n no shutdown\n!\nip access-list extended VLAN20-IN\n permit ip 192.168.20.0 0.0.0.255 any\n deny ip any any\n!\nip access-list extended VLAN20-OUT\n permit ip any 192.168.20.0 0.0.0.255\n deny ip any any\n!\nip default-gateway 192.168.20.254\n!\nspanning-tree mode rapid-pvst\nspanning-tree vlan 20 root primary"
  },
  {
    "id": "DSW-S",
    "name": "Distribution Switch South (Mind)",
    "type": "L3 Switch",
    "model": "Catalyst 3560",
    "layer": "distribution",
    "symbol": "Mind",
    "vlan": 30,
    "ring": 2,
    "config": "hostname DSW-South-Mind\n!\nenable secret 5 $1$mERr$hx5rVt7rPNoS4wqbXKX7m0\nservice password-encryption\n!\nip routing\nvtp mode server\nvtp domain ALCHEMY\nvtp password transmute\n!\nvlan 30\n name VLAN30-SERVERS\nvlan 100\n name VLAN100-NATIVE\nvlan 999\n name VLAN999-BLACKHOLE\n!\ninterface GigabitEthernet1/0/1\n description Uplink to FW-S\n no switchport\n ip address 192.168.30.1 255.255.255.0\n no shutdown\n!\ninterface GigabitEthernet1/0/2\n description Trunk to ASW-S1\n switchport mode trunk\n switchport trunk native vlan 100\n switchport trunk allowed vlan 30,100\n switchport nonegotiate\n no shutdown\n!\ninterface GigabitEthernet1/0/3\n description Trunk to ASW-S2\n switchport mode trunk\n switchport trunk native vlan 100\n switchport trunk allowed vlan 30,100\n switchport nonegotiate\n no shutdown\n!\ninterface Vlan30\n ip address 192.168.30.1 255.255.255.0\n ip access-group VLAN30-IN in\n ip access-group VLAN30-OUT out\n no shutdown\n!\nip access-list extended VLAN30-IN\n permit ip 192.168.30.0 0.0.0.255 any\n deny ip any any\n!\nip access-list extended VLAN30-OUT\n permit ip any 192.168.30.0 0.0.0.255\n deny ip any any\n!\nip default-gateway 192.168.30.254\n!\nspanning-tree mode rapid-pvst\nspanning-tree vlan 30 root primary"
  },
  {
    "id": "DSW-W",
    "name": "Distribution Switch West (Spirit)",
    "type": "L3 Switch",
    "model": "Catalyst 3560",
    "layer": "distribution",
    "symbol": "Spirit",
    "vlan": 40,
    "ring": 2,
    "config": "hostname DSW-West-Spirit\n!\nenable secret 5 $1$mERr$hx5rVt7rPNoS4wqbXKX7m0\nservice password-encryption\n!\nip routing\nvtp mode server\nvtp domain ALCHEMY\nvtp password transmute\n!\nvlan 40\n name VLAN40-GUEST\nvlan 100\n name VLAN100-NATIVE\nvlan 999\n name VLAN999-BLACKHOLE\n!\ninterface GigabitEthernet1/0/1\n description Uplink to FW-W\n no switchport\n ip address 192.168.40.1 255.255.255.0\n no shutdown\n!\ninterface GigabitEthernet1/0/2\n description Trunk to ASW-W1\n switchport mode trunk\n switchport trunk native vlan 100\n switchport trunk allowed vlan 40,100\n switchport nonegotiate\n no shutdown\n!\ninterface GigabitEthernet1/0/3\n description Trunk to ASW-W2\n switchport mode trunk\n switchport trunk native vlan 100\n switchport trunk allowed vlan 40,100\n switchport nonegotiate\n no shutdown\n!\ninterface Vlan40\n ip address 192.168.40.1 255.255.255.0\n ip access-group VLAN40-IN in\n ip access-group VLAN40-OUT out\n no shutdown\n!\nip access-list extended VLAN40-IN\n permit ip 192.168.40.0 0.0.0.255 any\n deny ip any any\n!\nip access-list extended VLAN40-OUT\n permit ip any 192.168.40.0 0.0.0.255\n deny ip any any\n!\nip default-gateway 192.168.40.254\n!\nspanning-tree mode rapid-pvst\nspanning-tree vlan 40 root primary"
  },
  {
    "id": "ASW-N1",
    "name": "Access Switch N1 (Iron)",
    "type": "Switch",
    "model": "Catalyst 2960",
    "layer": "access",
    "symbol": "Iron",
    "vlan": 10,
    "ring": 3,
    "config": "hostname ASW-N1-Iron\n!\nenable secret 5 $1$mERr$hx5rVt7rPNoS4wqbXKX7m0\nservice password-encryption\n!\nvtp mode client\nvtp domain ALCHEMY\nvtp password transmute\n!\nvlan 10\n name VLAN10-ADMIN\nvlan 100\n name VLAN100-NATIVE\nvlan 999\n name VLAN999-BLACKHOLE\n!\ninterface GigabitEthernet0/1\n description Trunk to DSW-N\n switchport mode trunk\n switchport trunk native vlan 100\n switchport trunk allowed vlan 10,100\n switchport nonegotiate\n no shutdown\n!\ninterface range FastEthernet0/1-12\n description Access Ports - VLAN 10\n switchport mode access\n switchport access vlan 10\n switchport port-security\n switchport port-security maximum 2\n switchport port-security violation restrict\n switchport port-security mac-address sticky\n spanning-tree portfast\n spanning-tree bpduguard enable\n no shutdown\n!\ninterface range FastEthernet0/13-24\n description Unused Ports - Disabled\n switchport mode access\n switchport access vlan 999\n shutdown\n!\nspanning-tree mode rapid-pvst\nspanning-tree portfast default"
  },
  {
    "id": "ASW-N2",
    "name": "Access Switch N2 (Gold)",
    "type": "Switch",
    "model": "Catalyst 2960",
    "layer": "access",
    "symbol": "Gold",
    "vlan": 10,
    "ring": 3,
    "config": "hostname ASW-N2-Gold\n!\nenable secret 5 $1$mERr$hx5rVt7rPNoS4wqbXKX7m0\nservice password-encryption\n!\nvtp mode client\nvtp domain ALCHEMY\nvtp password transmute\n!\nvlan 10\n name VLAN10-ADMIN\nvlan 100\n name VLAN100-NATIVE\nvlan 999\n name VLAN999-BLACKHOLE\n!\ninterface GigabitEthernet0/1\n description Trunk to DSW-N\n switchport mode trunk\n switchport trunk native vlan 100\n switchport trunk allowed vlan 10,100\n switchport nonegotiate\n no shutdown\n!\ninterface range FastEthernet0/1-12\n description Access Ports - VLAN 10\n switchport mode access\n switchport access vlan 10\n switchport port-security\n switchport port-security maximum 2\n switchport port-security violation restrict\n switchport port-security mac-address sticky\n spanning-tree portfast\n spanning-tree bpduguard enable\n no shutdown\n!\ninterface range FastEthernet0/13-24\n description Unused Ports - Disabled\n switchport mode access\n switchport access vlan 999\n shutdown\n!\nspanning-tree mode rapid-pvst\nspanning-tree portfast default"
  },
  {
    "id": "ASW-E1",
    "name": "Access Switch E1 (Silver)",
    "type": "Switch",
    "model": "Catalyst 2960",
    "layer": "access",
    "symbol": "Silver",
    "vlan": 20,
    "ring": 3,
    "config": "hostname ASW-E1-Silver\n!\nenable secret 5 $1$mERr$hx5rVt7rPNoS4wqbXKX7m0\nservice password-encryption\n!\nvtp mode client\nvtp domain ALCHEMY\nvtp password transmute\n!\nvlan 20\n name VLAN20-USERS\nvlan 100\n name VLAN100-NATIVE\nvlan 999\n name VLAN999-BLACKHOLE\n!\ninterface GigabitEthernet0/1\n description Trunk to DSW-E\n switchport mode trunk\n switchport trunk native vlan 100\n switchport trunk allowed vlan 20,100\n switchport nonegotiate\n no shutdown\n!\ninterface range FastEthernet0/1-12\n description Access Ports - VLAN 20\n switchport mode access\n switchport access vlan 20\n switchport port-security\n switchport port-security maximum 2\n switchport port-security violation restrict\n switchport port-security mac-address sticky\n spanning-tree portfast\n spanning-tree bpduguard enable\n no shutdown\n!\ninterface range FastEthernet0/13-24\n description Unused Ports - Disabled\n switchport mode access\n switchport access vlan 999\n shutdown\n!\nspanning-tree mode rapid-pvst\nspanning-tree portfast default"
  },
  {
    "id": "ASW-E2",
    "name": "Access Switch E2 (Copper)",
    "type": "Switch",
    "model": "Catalyst 2960",
    "layer": "access",
    "symbol": "Copper",
    "vlan": 20,
    "ring": 3,
    "config": "hostname ASW-E2-Copper\n!\nenable secret 5 $1$mERr$hx5rVt7rPNoS4wqbXKX7m0\nservice password-encryption\n!\nvtp mode client\nvtp domain ALCHEMY\nvtp password transmute\n!\nvlan 20\n name VLAN20-USERS\nvlan 100\n name VLAN100-NATIVE\nvlan 999\n name VLAN999-BLACKHOLE\n!\ninterface GigabitEthernet0/1\n description Trunk to DSW-E\n switchport mode trunk\n switchport trunk native vlan 100\n switchport trunk allowed vlan 20,100\n switchport nonegotiate\n no shutdown\n!\ninterface range FastEthernet0/1-12\n description Access Ports - VLAN 20\n switchport mode access\n switchport access vlan 20\n switchport port-security\n switchport port-security maximum 2\n switchport port-security violation restrict\n switchport port-security mac-address sticky\n spanning-tree portfast\n spanning-tree bpduguard enable\n no shutdown\n!\ninterface range FastEthernet0/13-24\n description Unused Ports - Disabled\n switchport mode access\n switchport access vlan 999\n shutdown\n!\nspanning-tree mode rapid-pvst\nspanning-tree portfast default"
  },
  {
    "id": "ASW-S1",
    "name": "Access Switch S1 (Lead)",
    "type": "Switch",
    "model": "Catalyst 2960",
    "layer": "access",
    "symbol": "Lead",
    "vlan": 30,
    "ring": 3,
    "config": "hostname ASW-S1-Lead\n!\nenable secret 5 $1$mERr$hx5rVt7rPNoS4wqbXKX7m0\nservice password-encryption\n!\nvtp mode client\nvtp domain ALCHEMY\nvtp password transmute\n!\nvlan 30\n name VLAN30-SERVERS\nvlan 100\n name VLAN100-NATIVE\nvlan 999\n name VLAN999-BLACKHOLE\n!\ninterface GigabitEthernet0/1\n description Trunk to DSW-S\n switchport mode trunk\n switchport trunk native vlan 100\n switchport trunk allowed vlan 30,100\n switchport nonegotiate\n no shutdown\n!\ninterface range FastEthernet0/1-12\n description Access Ports - VLAN 30\n switchport mode access\n switchport access vlan 30\n switchport port-security\n switchport port-security maximum 1\n switchport port-security violation shutdown\n switchport port-security mac-address sticky\n spanning-tree portfast\n spanning-tree bpduguard enable\n no shutdown\n!\ninterface range FastEthernet0/13-24\n description Unused Ports - Disabled\n switchport mode access\n switchport access vlan 999\n shutdown\n!\nspanning-tree mode rapid-pvst\nspanning-tree portfast default"
  },
  {
    "id": "ASW-S2",
    "name": "Access Switch S2 (Tin)",
    "type": "Switch",
    "model": "Catalyst 2960",
    "layer": "access",
    "symbol": "Tin",
    "vlan": 30,
    "ring": 3,
    "config": "hostname ASW-S2-Tin\n!\nenable secret 5 $1$mERr$hx5rVt7rPNoS4wqbXKX7m0\nservice password-encryption\n!\nvtp mode client\nvtp domain ALCHEMY\nvtp password transmute\n!\nvlan 30\n name VLAN30-SERVERS\nvlan 100\n name VLAN100-NATIVE\nvlan 999\n name VLAN999-BLACKHOLE\n!\ninterface GigabitEthernet0/1\n description Trunk to DSW-S\n switchport mode trunk\n switchport trunk native vlan 100\n switchport trunk allowed vlan 30,100\n switchport nonegotiate\n no shutdown\n!\ninterface range FastEthernet0/1-12\n description Access Ports - VLAN 30\n switchport mode access\n switchport access vlan 30\n switchport port-security\n switchport port-security maximum 1\n switchport port-security violation shutdown\n switchport port-security mac-address sticky\n spanning-tree portfast\n spanning-tree bpduguard enable\n no shutdown\n!\ninterface range FastEthernet0/13-24\n description Unused Ports - Disabled\n switchport mode access\n switchport access vlan 999\n shutdown\n!\nspanning-tree mode rapid-pvst\nspanning-tree portfast default"
  },
  {
    "id": "ASW-W1",
    "name": "Access Switch W1 (Mercury)",
    "type": "Switch",
    "model": "Catalyst 2960",
    "layer": "access",
    "symbol": "Mercury",
    "vlan": 40,
    "ring": 3,
    "config": "hostname ASW-W1-Mercury\n!\nenable secret 5 $1$mERr$hx5rVt7rPNoS4wqbXKX7m0\nservice password-encryption\n!\nvtp mode client\nvtp domain ALCHEMY\nvtp password transmute\n!\nvlan 40\n name VLAN40-GUEST\nvlan 100\n name VLAN100-NATIVE\nvlan 999\n name VLAN999-BLACKHOLE\n!\ninterface GigabitEthernet0/1\n description Trunk to DSW-W\n switchport mode trunk\n switchport trunk native vlan 100\n switchport trunk allowed vlan 40,100\n switchport nonegotiate\n no shutdown\n!\ninterface range FastEthernet0/1-12\n description Access Ports - VLAN 40\n switchport mode access\n switchport access vlan 40\n switchport port-security\n switchport port-security maximum 3\n switchport port-security violation protect\n spanning-tree portfast\n spanning-tree bpduguard enable\n no shutdown\n!\ninterface range FastEthernet0/13-24\n description Unused Ports - Disabled\n switchport mode access\n switchport access vlan 999\n shutdown\n!\nspanning-tree mode rapid-pvst\nspanning-tree portfast default"
  },
  {
    "id": "ASW-W2",
    "name": "Access Switch W2 (Salt)",
    "type": "Switch",
    "model": "Catalyst 2960",
    "layer": "access",
    "symbol": "Salt",
    "vlan": 40,
    "ring": 3,
    "config": "hostname ASW-W2-Salt\n!\nenable secret 5 $1$mERr$hx5rVt7rPNoS4wqbXKX7m0\nservice password-encryption\n!\nvtp mode client\nvtp domain ALCHEMY\nvtp password transmute\n!\nvlan 40\n name VLAN40-GUEST\nvlan 100\n name VLAN100-NATIVE\nvlan 999\n name VLAN999-BLACKHOLE\n!\ninterface GigabitEthernet0/1\n description Trunk to DSW-W\n switchport mode trunk\n switchport trunk native vlan 100\n switchport trunk allowed vlan 40,100\n switchport nonegotiate\n no shutdown\n!\ninterface range FastEthernet0/1-12\n description Access Ports - VLAN 40\n switchport mode access\n switchport access vlan 40\n switchport port-security\n switchport port-security maximum 3\n switchport port-security violation protect\n spanning-tree portfast\n spanning-tree bpduguard enable\n no shutdown\n!\ninterface range FastEthernet0/13-24\n description Unused Ports - Disabled\n switchport mode access\n switchport access vlan 999\n shutdown\n!\nspanning-tree mode rapid-pvst\nspanning-tree portfast default"
  },
  {
    "id": "SRV-N1",
    "name": "Web Server (Philosopher)",
    "type": "Server",
    "model": "Server-PT",
    "layer": "endpoint",
    "symbol": "Philosopher",
    "vlan": 10,
    "ring": 4,
    "config": "! Server Configuration - Web Server\nhostname SRV-N1-Philosopher\n!\nInterface: FastEthernet0\n IP Address: 192.168.10.10\n Subnet Mask: 255.255.255.0\n Default Gateway: 192.168.10.1\n DNS Server: 192.168.30.20\n!\nServices Running:\n - HTTP (Port 80)\n - HTTPS (Port 443)\n!\nSecurity:\n - Firewall enabled\n - Only ports 80, 443 open\n - SSH disabled"
  },
  {
    "id": "SRV-N2",
    "name": "Application Server (Stone)",
    "type": "Server",
    "model": "Server-PT",
    "layer": "endpoint",
    "symbol": "Stone",
    "vlan": 10,
    "ring": 4,
    "config": "! Server Configuration - Application Server\nhostname SRV-N2-Stone\n!\nInterface: FastEthernet0\n IP Address: 192.168.10.11\n Subnet Mask: 255.255.255.0\n Default Gateway: 192.168.10.1\n DNS Server: 192.168.30.20\n!\nServices Running:\n - Application (Port 8080)\n - API Gateway (Port 8443)\n!\nSecurity:\n - Firewall enabled\n - Only ports 8080, 8443 open\n - SSH enabled (Port 22)"
  },
  {
    "id": "PC-E1",
    "name": "Workstation Alpha (Seeker)",
    "type": "PC",
    "model": "PC-PT",
    "layer": "endpoint",
    "symbol": "Seeker",
    "vlan": 20,
    "ring": 4,
    "config": "! PC Configuration - Workstation\nhostname PC-E1-Seeker\n!\nInterface: FastEthernet0\n IP Address: DHCP (192.168.20.100)\n Subnet Mask: 255.255.255.0\n Default Gateway: 192.168.20.1\n DNS Server: 192.168.30.20\n!\nSecurity:\n - Windows Defender enabled\n - Firewall enabled\n - Domain joined"
  },
  {
    "id": "PC-E2",
    "name": "Workstation Beta (Acolyte)",
    "type": "PC",
    "model": "PC-PT",
    "layer": "endpoint",
    "symbol": "Acolyte",
    "vlan": 20,
    "ring": 4,
    "config": "! PC Configuration - Workstation\nhostname PC-E2-Acolyte\n!\nInterface: FastEthernet0\n IP Address: DHCP (192.168.20.101)\n Subnet Mask: 255.255.255.0\n Default Gateway: 192.168.20.1\n DNS Server: 192.168.30.20\n!\nSecurity:\n - Windows Defender enabled\n - Firewall enabled\n - Domain joined"
  },
  {
    "id": "SRV-S1",
    "name": "Database Server (Archive)",
    "type": "Server",
    "model": "Server-PT",
    "layer": "endpoint",
    "symbol": "Archive",
    "vlan": 30,
    "ring": 4,
    "config": "! Server Configuration - Database Server\nhostname SRV-S1-Archive\n!\nInterface: FastEthernet0\n IP Address: 192.168.30.10\n Subnet Mask: 255.255.255.0\n Default Gateway: 192.168.30.1\n DNS Server: 192.168.30.20\n!\nServices Running:\n - MySQL (Port 3306)\n - PostgreSQL (Port 5432)\n!\nSecurity:\n - Firewall enabled\n - Only ports 3306, 5432 open from VLAN 10\n - SSH enabled (Port 22) from VLAN 10 only"
  },
  {
    "id": "SRV-S2",
    "name": "DNS/DHCP Server (Oracle)",
    "type": "Server",
    "model": "Server-PT",
    "layer": "endpoint",
    "symbol": "Oracle",
    "vlan": 30,
    "ring": 4,
    "config": "! Server Configuration - DNS/DHCP Server\nhostname SRV-S2-Oracle\n!\nInterface: FastEthernet0\n IP Address: 192.168.30.20\n Subnet Mask: 255.255.255.0\n Default Gateway: 192.168.30.1\n!\nServices Running:\n - DNS (Port 53 UDP/TCP)\n - DHCP (Port 67/68 UDP)\n!\nDHCP Pools:\n - VLAN10-POOL: 192.168.10.100-192.168.10.200\n - VLAN20-POOL: 192.168.20.100-192.168.20.200\n - VLAN40-POOL: 192.168.40.100-192.168.40.200\n!\nSecurity:\n - Firewall enabled\n - DNS/DHCP ports open to all VLANs"
  },
  {
    "id": "PC-W1",
    "name": "Guest Terminal Alpha (Wanderer)",
    "type": "PC",
    "model": "PC-PT",
    "layer": "endpoint",
    "symbol": "Wanderer",
    "vlan": 40,
    "ring": 4,
    "config": "! PC Configuration - Guest Terminal\nhostname PC-W1-Wanderer\n!\nInterface: FastEthernet0\n IP Address: DHCP (192.168.40.100)\n Subnet Mask: 255.255.255.0\n Default Gateway: 192.168.40.1\n DNS Server: 192.168.30.20\n!\nSecurity:\n - Guest network isolation\n - No access to internal VLANs\n - Internet access only"
  },
  {
    "id": "PC-W2",
    "name": "Guest Terminal Beta (Pilgrim)",
    "type": "PC",
    "model": "PC-PT",
    "layer": "endpoint",
    "symbol": "Pilgrim",
    "vlan": 40,
    "ring": 4,
    "config": "! PC Configuration - Guest Terminal\nhostname PC-W2-Pilgrim\n!\nInterface: FastEthernet0\n IP Address: DHCP (192.168.40.101)\n Subnet Mask: 255.255.255.0\n Default Gateway: 192.168.40.1\n DNS Server: 192.168.30.20\n!\nSecurity:\n - Guest network isolation\n - No access to internal VLANs\n - Internet access only"
  }
];
