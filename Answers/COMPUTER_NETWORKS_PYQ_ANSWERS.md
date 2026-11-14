# Computer Networks (CS601) — Complete PYQ Answers

**B.Tech CSE / IT · Semester VI · Vinoba Bhave University**  
**Source papers:** Annual examinations 2025, 2024, 2023, 2022 and 2021  
**Reference syllabus:** CS601 Computer Network, Modules I–VI  
**Primary textbook:** Behrouz A. Forouzan, *Data Communications and Networking*, 4th Edition.  
**Reference books:** William Stallings, *Data and Computer Communications*, 8th Edition; Andrew S. Tanenbaum, *Computer Networks*, 8th Edition.

> **Preparation rule:** The papers say “Answer any five questions”. This collection answers every readable question, subquestion and short-note alternative in the supplied papers. Repeated questions are retained under their original examination year. The answers are written in straightforward exam-ready English; use the diagrams and calculation steps where they appear.

> **Short-note source check:** The 2024 paper and 2021 paper contain different Q8 option lists. The 2024 options are ARP/RARP, Routing Protocol, Switches and Hubs, FDM/TDM, and IPv4. The 2021 options are Multiplexing, Routing Protocol, Switches and Hubs, TCP vs UDP, and Piggybacking. Both sets are answered under their respective examination years below.

## Syllabus alignment

- **Module I:** Data communication components, representation and flow, network topologies, protocols and standards, OSI model, transmission media.
- **Module II:** Wired and wireless LANs, VLANs, multiplexing (FDM, TDM, WDM), spread spectrum.
- **Module III:** Data-link error detection and correction, block coding, Hamming distance, CRC.
- **Module IV:** Stop-and-Wait, Go-Back-N, Selective Repeat, sliding windows, piggybacking, random access, ALOHA and CSMA/CD.
- **Module V:** Switching, IPv4/IPv6, ARP/RARP/BOOTP/DHCP, delivery, forwarding and routing.
- **Module VI:** Process-to-process delivery, UDP, TCP, SCTP, congestion control and QoS; Leaky Bucket and Token Bucket.

Some PYQ questions ask supporting concepts that are not named as separate headings in the detailed syllabus (for example, PPP framing, Ethernet generations, bit stuffing, satellite-window calculations and some device types). They are answered because they appear in the examination papers; their presence in a PYQ does not mean they are separately listed in the syllabus.

---

# PART I — 2025 ANNUAL EXAMINATION

## Q1(a) Explain briefly the TCP/IP model. [7 marks]

### Answer
The **TCP/IP model** is a layered networking architecture used by the Internet. It describes how data is prepared by an application, divided into packets, transported across networks, and delivered to the destination application. The commonly taught model has four layers.

1. **Application layer:** Provides network services to user applications. It combines functions that are separate in the OSI application, presentation and session layers. Examples include HTTP/HTTPS for web access, FTP for file transfer, SMTP for e-mail, DNS for name resolution and DHCP for address configuration.
2. **Transport layer:** Provides process-to-process communication. TCP offers connection-oriented, reliable, ordered delivery with flow and congestion control. UDP offers connectionless, best-effort datagram delivery with low overhead. Port numbers identify application processes.
3. **Internet layer:** Provides logical addressing and routing between networks. IP carries packets from source to destination; routers examine destination IP addresses to forward packets. Supporting protocols include ICMP and, in IPv4 networks, ARP for address resolution.
4. **Network access (link) layer:** Handles framing and transmission over the local medium. It includes functions such as physical addressing, media access, and error detection. Ethernet and Wi-Fi are common examples.

**Encapsulation:** As data moves down the layers, each layer adds control information. Application data becomes a TCP segment or UDP datagram, then an IP packet, then a link-layer frame. At the receiver, the headers are removed in reverse order (decapsulation).

```text
Sending host                         Receiving host
Application data  -----------------> Application
       |                                  ^
TCP segment / UDP datagram                 |
       |                                  |
IP packet  -------------------------> Internet
       |                                  ^
Link frame  ------------------------> Link / access
       |                                  ^
       +------ physical medium -----------+
```

**Conclusion:** The TCP/IP model provides the practical framework for communication over interconnected networks and is the foundation of the Internet.

## Q1(b) What are the types of wireless transmission media? Explain. [7 marks]

### Answer
**Wireless (unguided) transmission media** carry electromagnetic signals through air, vacuum or space without a physical cable. The main types are radio waves, microwaves and infrared waves.

1. **Radio waves:** Usually spread in many directions and can pass through walls, depending on frequency and material. They are useful for broadcasting and mobile communication. Examples: AM/FM radio, television broadcasting, Wi-Fi and some cellular systems. They can cover relatively large areas, but may suffer from interference and limited spectrum.
2. **Microwaves:** Higher-frequency radio waves that are commonly directional and often require line-of-sight between antennas. Terrestrial microwave links connect buildings or towers; satellite microwave links provide communication over large distances. Examples: point-to-point backhaul, satellite TV and satellite Internet. Obstacles and heavy rain can affect some microwave bands.
3. **Infrared waves:** Used for short-range communication and generally do not pass through walls. They can be directed or diffuse. Examples include television remote controls and short-range device communication. Their limited range can reduce interference between rooms.

| Medium | Direction / range | Common uses | Main limitation |
|---|---|---|---|
| Radio | Often omnidirectional; medium to long range | Broadcasting, Wi-Fi, cellular | Interference and shared spectrum |
| Microwave | Usually directional; line-of-sight | Point-to-point links, satellites | Obstructions and alignment |
| Infrared | Short range; generally room-limited | Remote controls, short links | Cannot normally pass through walls |

**Conclusion:** Wireless media provide mobility and reduce cabling, but their performance depends on frequency, distance, obstacles, interference and weather.

## Q2(a) Differentiate between TCP/IP model and OSI model. [7 marks]

### Answer
The **OSI model** is a seven-layer reference model developed by ISO. The **TCP/IP model** is the practical protocol architecture used by the Internet, commonly represented by four layers.

| Basis | OSI model | TCP/IP model |
|---|---|---|
| Number of layers | Seven | Four in the common model |
| Layers | Physical, Data Link, Network, Transport, Session, Presentation, Application | Network Access, Internet, Transport, Application |
| Origin | ISO reference model | Internet protocol architecture developed through DARPA/DoD work |
| Design approach | Separates services, interfaces and protocols conceptually | Built around the TCP/IP protocol suite |
| Session and presentation | Separate layers | Their functions are handled within applications/libraries |
| Physical and data link | Separate layers | Usually combined as Network Access / Link |
| Network service | Allows connection-oriented and connectionless concepts in the model | IP provides connectionless, best-effort datagram delivery |
| Use | Mainly a teaching and design reference | Used in real Internet communication |

**Layer mapping:** OSI application, presentation and session correspond broadly to TCP/IP application; OSI transport maps to transport; OSI network maps to Internet; OSI data link and physical map to network access.

**Conclusion:** OSI gives a more detailed conceptual separation, while TCP/IP describes the practical protocol suite used on real networks.

## Q2(b) What is network topology? Explain different types of topologies. [7 marks]

### Answer
**Network topology** is the physical or logical arrangement of network devices and communication links. It describes how nodes are connected and how data travels.

1. **Bus topology:** All devices share one main cable (backbone). It is inexpensive and easy for a small network, but a backbone fault can stop the whole network and performance falls as traffic increases. Terminators are required at the cable ends.
2. **Star topology:** Every device connects to a central hub or switch. It is easy to manage and a single link failure affects only one device. If the central device fails, the network is disrupted. Modern Ethernet LANs commonly use star topology.
3. **Ring topology:** Each node connects to two neighbouring nodes to form a closed loop. Data travels around the ring, often controlled by a token. It can provide orderly access, but a break or failed node may disrupt a simple ring unless bypass or dual-ring protection is used.
4. **Mesh topology:** Nodes are connected to many or all other nodes. A full mesh of `n` nodes has `n(n−1)/2` links. It offers high redundancy and fault tolerance, but requires many links and is expensive. It is used where reliability is important.
5. **Tree topology:** Multiple star networks are connected in a hierarchy through a backbone. It is scalable and supports structured management, but backbone or upper-level failures can affect many branches.
6. **Hybrid topology:** Combines two or more topologies, such as star-bus or star-ring. It can be designed to meet organizational needs, but planning and maintenance may be more complex.

**Conclusion:** The suitable topology depends on cost, size, scalability, reliability, cabling and maintenance requirements.

## Q3(a) What are the elementary Data Link Layer protocols? Discuss. [7 marks]

### Answer
The **Data Link Layer** provides node-to-node delivery over a single link. In the elementary protocol discussion, three basic protocols illustrate how framing, flow control and error control are introduced.

1. **Unrestricted Simplex Protocol:** Communication is one-way (simplex). The channel is assumed error-free and the receiver is always ready. The sender continuously sends frames. No flow-control or error-control mechanism is needed. This is an idealized model, not a realistic protocol for a slow receiver.
2. **Simplex Stop-and-Wait Protocol:** The channel is assumed error-free, but the receiver may need time to process a frame. The sender transmits one frame and waits before sending the next. This prevents the sender from overwhelming the receiver. Since errors are excluded in this model, acknowledgements are mainly used to control the sender's pace.
3. **Simplex Protocol for a Noisy Channel (Stop-and-Wait ARQ):** Frames or acknowledgements may be lost or damaged. The sender transmits one frame and starts a timer. The receiver checks the frame and sends an ACK if it is correct. Sequence numbers (usually 0 and 1) distinguish a new frame from a retransmitted duplicate. If the ACK is lost or the timer expires, the sender retransmits. The receiver discards duplicate frames but acknowledges them again.

| Protocol | Channel assumption | Flow control | Error control |
|---|---|---|---|
| Unrestricted simplex | Error-free; receiver always ready | No | No |
| Simplex stop-and-wait | Error-free; receiver may be slow | Yes | No |
| Stop-and-wait ARQ | Noisy channel | Yes | Yes, using ACK, timer and sequence number |

**Conclusion:** These protocols show the progression from simple transmission to controlled and reliable data-link communication.

## Q3(b) Discuss Ethernet MAC sublayer. [7 marks]

### Answer
The **Media Access Control (MAC) sublayer** is the lower part of the Data Link Layer. In Ethernet, it controls how a device uses the shared medium (in traditional shared Ethernet), provides MAC addressing, forms frames and detects transmission errors.

**Main functions:**
1. **Physical addressing:** Each Ethernet interface has a 48-bit MAC address, normally written as six hexadecimal octets, for example `00:1A:2B:3C:4D:5E`.
2. **Frame encapsulation:** MAC places network-layer packets into Ethernet frames by adding destination and source MAC addresses, length/type information and an error-checking field.
3. **Media access:** Traditional half-duplex shared Ethernet uses CSMA/CD. A station senses the carrier, transmits when the channel is idle, detects a collision, sends a jam signal and retries after a random backoff. Modern switched full-duplex Ethernet does not use CSMA/CD.
4. **Error detection:** The Frame Check Sequence (FCS) contains a CRC value. The receiver checks it to detect corruption; Ethernet does not itself retransmit a damaged frame.
5. **Frame delimiting and addressing:** The preamble and start-frame delimiter help the receiver synchronize and identify the start of a frame.

**Ethernet frame format (common Ethernet II view):**

```text
| Preamble 7 | SFD 1 | Destination MAC 6 | Source MAC 6 |
| Type 2 | Data + Pad 46–1500 | FCS 4 |
```

The minimum Ethernet frame size from Destination Address through FCS is 64 bytes; the maximum standard payload is 1500 bytes. (The preamble and SFD are not counted in the 64-byte minimum.)

**Conclusion:** The Ethernet MAC sublayer provides local addressing, frame delivery, medium access rules and CRC-based error detection.

## Q4(a) What is Sliding Window Protocol? Discuss with a neat example. [7 marks]

### Answer
The **Sliding Window Protocol** is a flow-control and error-control method that allows a sender to transmit multiple frames before receiving acknowledgements. The sender and receiver maintain windows that define which sequence numbers may be sent or accepted.

**Working:**
1. Frames carry sequence numbers.
2. The sender may transmit frames within its sending window without waiting for an ACK after every frame.
3. The receiver accepts frames allowed by its receiving window and sends acknowledgements.
4. When acknowledgements arrive, the sender's window moves forward (“slides”), allowing new frames to be sent.
5. Timers and retransmissions handle loss or damage.

**Example:** Suppose the sender window size is 4 and sequence numbers are 0–7. The sender sends frames 0, 1, 2 and 3. If ACKs confirm frames 0 and 1, the window advances and the sender may send frames 4 and 5 while frames 2 and 3 are still outstanding.

```text
Initial sender window: [0 1 2 3]  4  5  6  7
After ACK 0 and ACK 1:  0  1 [2 3 4 5]  6  7
```

**Types:**
- **Go-Back-N ARQ:** Receiver accepts only the next expected frame. If one frame is lost, the sender retransmits that frame and all later outstanding frames.
- **Selective Repeat ARQ:** Receiver can buffer correctly received out-of-order frames. Only lost or damaged frames are retransmitted.

**Advantages:** Better link utilization than stop-and-wait, supports pipelining, reduces idle time and provides flow/error control.

**Conclusion:** Sliding windows improve throughput by allowing several frames to be in transit while controlling the sender and handling errors.

## Q4(b) What are network connecting devices? Explain. [7 marks]

### Answer
**Network connecting devices** are hardware devices used to connect computers, LAN segments or different networks. They operate at different layers and perform different functions.

1. **Repeater (Physical layer):** Regenerates or retimes a weakened signal to extend the distance of a network. It does not examine MAC or IP addresses.
2. **Hub (Physical layer):** A multiport repeater. It sends incoming bits to all other ports; all devices share the bandwidth and collision domain.
3. **Bridge (Data Link layer):** Connects LAN segments and forwards or filters frames using MAC addresses. It reduces unnecessary traffic between segments.
4. **Switch (Data Link layer):** A high-speed multiport bridge. It learns source MAC addresses and forwards frames to the relevant port. Each switch port forms a separate collision domain.
5. **Router (Network layer):** Connects different IP networks and forwards packets using destination IP addresses and routing tables. Routers separate broadcast domains by default.
6. **Gateway:** A general term for a device or software that connects dissimilar networks or performs protocol conversion. A default gateway is the router a host uses to reach other IP networks.
7. **Wireless Access Point:** Connects wireless stations to a wired LAN using Wi-Fi.
8. **Modem:** Modulates and demodulates signals to enable data communication over a transmission service such as cable or DSL.

**Conclusion:** Repeater and hub regenerate/broadcast signals, bridges and switches forward frames, routers forward IP packets, and gateways can interconnect different systems or protocols.

## Q5(a) What are the responsibilities of the Network Layer? [7 marks]

### Answer
The **Network Layer** provides source-to-destination delivery of packets across multiple interconnected networks. Its main responsibilities are:

1. **Logical addressing:** Uses logical addresses such as IPv4 and IPv6 to identify source and destination hosts across networks.
2. **Routing:** Selects a path through interconnected networks using routing algorithms and routing information.
3. **Packet forwarding:** Moves an incoming packet from a router's input interface to the appropriate output interface according to the forwarding table.
4. **Internetworking:** Connects different networks and hides many differences in their underlying link technologies.
5. **Fragmentation and packet-size handling:** IPv4 routers may fragment packets when required (subject to header flags); IPv6 routers do not fragment packets, leaving fragmentation to the source using an extension header.
6. **Congestion and diagnostic support:** IP itself provides best-effort delivery; ICMP supports error reporting and diagnostics such as unreachable destination and time exceeded.
7. **Delivery modes:** Supports unicast, multicast and broadcast in IPv4 (IPv6 supports unicast and multicast, but not broadcast).

**Conclusion:** The Network Layer enables communication across different networks through logical addressing, routing and forwarding.

## Q5(b)(i) Short note on IPv4 addressing. [Part of 7 marks]

### Answer
**IPv4** uses a 32-bit logical address to identify an interface on an IP network. It is written in dotted-decimal notation as four 8-bit octets, each ranging from 0 to 255, for example `192.168.1.10`.

An IPv4 address contains a network prefix and a host portion. In modern classless addressing (CIDR), the prefix length is written after a slash, such as `192.168.1.0/24`. The `/24` means the first 24 bits identify the network and the remaining 8 bits identify addresses within the block.

A subnet mask represents the network prefix; for `/24` it is `255.255.255.0`. IPv4 supports unicast, multicast and broadcast. Private IPv4 ranges include `10.0.0.0/8`, `172.16.0.0/12` and `192.168.0.0/16`.

**Conclusion:** IPv4 addressing enables hosts to be identified and packets to be routed across IP networks.

## Q5(b)(ii) Short note on IPv6 addressing. [Part of 7 marks]

### Answer
**IPv6** uses 128-bit addresses to provide a much larger address space than IPv4. It is written as eight groups of four hexadecimal digits separated by colons, for example `2001:0db8:0000:0000:0000:ff00:0042:8329`.

Rules allow leading zeros in a group to be omitted and one continuous sequence of zero groups to be compressed using `::` (only once in an address). The example can be written as `2001:db8::ff00:42:8329`.

IPv6 supports unicast, multicast and anycast. It has no broadcast address. A common LAN subnet is `/64`. IPv6 provides a simplified base header, auto-configuration support and removes the need for address translation in many network designs, although NAT may still be used for specific purposes.

**Conclusion:** IPv6 provides a vastly larger address space and improves the design of modern IP networks.

## Q5(b)(iii) Short note on routing table. [Part of 7 marks]

### Answer
A **routing table** is a data structure maintained by a host or router. It contains information used to decide where to forward an IP packet.

A routing-table entry generally includes:
- Destination network or prefix.
- Prefix length or subnet mask.
- Next-hop address, if needed.
- Outgoing interface.
- Metric or route preference.
- Route source or type (connected, static or dynamically learned).

When a router receives a packet, it compares the destination IP address with entries in the table and uses **longest-prefix matching**: the matching route with the longest network prefix is normally selected. If no more specific route exists, a default route (`0.0.0.0/0` in IPv4 or `::/0` in IPv6) may be used.

**Conclusion:** Routing tables guide packet forwarding and allow routers to select an appropriate next hop.

## Q6(a) Define subnetting and supernetting. [7 marks]

### Answer
**Subnetting** divides one larger IP network into multiple smaller networks by borrowing bits from the host portion to create a longer network prefix. It improves address organization, limits broadcast domains in IPv4 LAN design and supports efficient administration.

Example: `192.168.1.0/24` can be divided into four equal `/26` subnets. Each `/26` contains 64 addresses (normally 62 usable host addresses): `.0–.63`, `.64–.127`, `.128–.191` and `.192–.255`.

**Supernetting** combines multiple contiguous networks into a larger address block by using a shorter common prefix. The networks must be contiguous and correctly aligned for a single aggregate route.

Example: Four contiguous `/24` networks `192.168.0.0/24` through `192.168.3.0/24` can be summarized as `192.168.0.0/22`.

| Basis | Subnetting | Supernetting |
|---|---|---|
| Purpose | Divide a large network | Combine multiple networks into a summary block |
| Prefix | Becomes longer | Becomes shorter |
| Address bits | Borrows host bits | Uses common leading network bits |
| Benefit | Easier internal management and isolation | Smaller routing tables and route aggregation |

**Conclusion:** Subnetting divides address space; supernetting aggregates contiguous address space.

## Q6(b) What are the default masks for Class A, B and C addressing? [7 marks]

### Answer
In historical classful IPv4 addressing, the default masks are:

| Class | First-octet range (usual unicast range) | Default mask | Prefix |
|---|---:|---|---|
| A | 1–126 | `255.0.0.0` | `/8` |
| B | 128–191 | `255.255.0.0` | `/16` |
| C | 192–223 | `255.255.255.0` | `/24` |

Class A uses 8 network bits, Class B uses 16, and Class C uses 24. The remaining bits are used for host identification. Addresses beginning with 0 and 127 have special purposes; Class D is used for multicast and Class E is reserved/experimental in the historical classful scheme.

**Note:** Modern networks use CIDR and explicit prefix lengths rather than relying on classful default masks, but the above values answer the question as written.

## Q7(a) A host has IP address 25.34.12.56/16. Find the first (network) and last (limited broadcast) address. [7 marks]

### Answer
Given host address: `25.34.12.56/16`.

1. `/16` means 16 network bits and 16 host bits.
2. Subnet mask = `255.255.0.0`.
3. Keep the first two octets and set the host bits to zero for the network address.
4. Set all host bits to one for the directed broadcast address.

- **Network (first) address:** `25.34.0.0`
- **Broadcast (last) address:** `25.34.255.255`

Strict terminology: `25.34.255.255` is the **directed broadcast address of this /16 block**. “Limited broadcast” normally means `255.255.255.255`, which is not the last address of this subnet.

## Q7(b) A host has IP address 182.44.82.16/26. Find the first and last address. [7 marks]

### Answer
Given: `182.44.82.16/26`.

1. `/26` mask = `255.255.255.192`.
2. The block size in the fourth octet is `256 − 192 = 64`.
3. Subnet ranges in the fourth octet are 0–63, 64–127, 128–191 and 192–255.
4. The host value 16 lies in the 0–63 block.

- **Network (first) address:** `182.44.82.0`
- **Broadcast (last) address:** `182.44.82.63`
- **Usable host range:** `182.44.82.1` to `182.44.82.62`
- **Total addresses:** 64; normally 62 usable host addresses.

# PART II — 2024 ANNUAL EXAMINATION

## Q1(a) Draw the OSI model and state the responsibilities of each layer. [7 marks]

### Answer
The **OSI (Open Systems Interconnection) model** divides network communication into seven layers. Each layer provides services to the layer above and uses services from the layer below.

```text
7. Application   — services for user applications
6. Presentation  — translation, encryption, compression
5. Session       — dialog control, synchronization
4. Transport     — process delivery, reliability, flow control
3. Network       — logical addressing and routing
2. Data Link     — framing, MAC addressing, error detection
1. Physical      — transmission of raw bits over medium
```

1. **Physical:** Transmits raw bits; defines signals, connectors, data rate, cable and radio characteristics.
2. **Data Link:** Frames bits, uses physical/MAC addresses, controls access to the medium and detects link errors.
3. **Network:** Provides logical addressing, routing and packet forwarding between networks.
4. **Transport:** Provides end-to-end process communication, segmentation, reassembly, reliability, flow control and congestion control as supported by the protocol.
5. **Session:** Establishes, manages and terminates dialogs; provides synchronization checkpoints.
6. **Presentation:** Handles data representation, format translation, compression and encryption/decryption.
7. **Application:** Provides network services to applications, such as web, e-mail and file transfer.

**Conclusion:** The OSI model simplifies network design, learning, troubleshooting and interoperability by separating communication into seven functional layers.

## Q1(b) Explain various connection topologies. [7 marks]

### Answer
A connection topology describes how devices and links are arranged in a network.

- **Bus:** Devices share one backbone cable. It is simple and inexpensive, but a backbone fault can stop the network and collisions may reduce performance.
- **Star:** Each node connects to a central hub or switch. It is easy to install and troubleshoot; a central-device failure affects the network.
- **Ring:** Each node connects to two neighbours, forming a loop. Token-based access can avoid collisions; a break can disrupt a simple ring.
- **Mesh:** Nodes have multiple interconnections. It provides redundancy and high reliability but requires more cable/ports and costs more.
- **Tree:** Hierarchical arrangement of star networks. It is scalable, but backbone failure affects branches.
- **Hybrid:** Combination of topologies to meet practical needs.

## Q2(a) Message 11001001 is transmitted using CRC polynomial x³ + 1. Find the transmitted message. [7 marks]

### Answer
Given data = `11001001`; generator polynomial `x³ + 1` gives divisor `1001`.

1. Degree of generator = 3, so append three zeros to data: `11001001000`.
2. Divide this bit sequence by `1001` using modulo-2 division (XOR; no carry or borrow).
3. The 3-bit remainder is `011`.
4. Append the remainder to the original data.

```text
Original data : 11001001
CRC remainder :       011
Transmitted   : 11001001011
```

**Answer:** `11001001011`. At the receiver, dividing the codeword by `1001` should give remainder `000` if no error is detected.

## Q2(b) Define bit rate and baud rate. Bit rate = 8000 bps and baud rate = 1000 baud. Find data elements per signal element and signal elements per second. [7 marks]

### Answer
- **Bit rate:** Number of data bits transmitted per second (bps).
- **Baud rate:** Number of signal elements or symbols transmitted per second (baud).

Given bit rate = 8000 bps and baud rate = 1000 baud.

\[
\text{Bits per signal element} = \frac{8000}{1000}=8
\]

Thus, each signal element carries **8 data bits** (equivalent to 256 possible bit patterns if all combinations are used). The number of signal elements transmitted per second is the baud rate: **1000 signal elements per second**.

## Q3(a) Compare Slotted ALOHA and Pure ALOHA. Give vulnerable time and maximum throughput. [7 marks]

### Answer
ALOHA is a random-access protocol in which a station transmits when it has data. A collision occurs if transmissions overlap.

| Feature | Pure ALOHA | Slotted ALOHA |
|---|---|---|
| Transmission time | Any time | Only at slot boundaries |
| Synchronization | Not required | Required |
| Vulnerable period | `2T` | `T` |
| Throughput | `S = G e^(−2G)` | `S = G e^(−G)` |
| Maximum throughput | `1/(2e) ≈ 0.184` (18.4%) | `1/e ≈ 0.368` (36.8%) |

Here `T` is one frame transmission time and `G` is the average number of transmission attempts per frame time. Pure ALOHA has a vulnerable period of two frame times because another frame may start within one frame time before or after the start of a given frame. Slotted ALOHA restricts transmission to slot boundaries, reducing the vulnerable period to one frame time.

**Conclusion:** Slotted ALOHA can achieve about twice the maximum throughput of Pure ALOHA, at the cost of synchronization.

## Q3(b) Why is CSMA/CD better than CSMA? Explain minimum frame size with a diagram. [7 marks]

### Answer
**CSMA** (Carrier Sense Multiple Access) requires a station to listen before transmitting. If the channel is idle, it transmits; if busy, it waits according to the protocol. A collision can still occur because two stations may sense an idle channel before either signal reaches the other.

**CSMA/CD** adds collision detection. A station continues monitoring the medium while transmitting. If it detects a collision, it stops the frame, sends a jam signal and waits for a random backoff interval before retrying. Thus, it detects collisions earlier and avoids wasting the remaining transmission time. CSMA/CD was used in shared half-duplex Ethernet; modern full-duplex switched Ethernet does not use it.

**Minimum frame size:** A sender must still be transmitting when a worst-case collision signal returns. If `τ` is the maximum one-way propagation delay and `R` is the bit rate, then:

\[
T_{frame} \ge 2\tau, \qquad L_{min}=R(2\tau)=2\tau R
\]

```text
Station A                         Station B
  | -------- frame begins --------> |
  | <------ collision travels ----- |
  | detects collision before frame transmission ends
```

For classic Ethernet, the minimum MAC frame size is 64 bytes, allowing collision detection within the defined network diameter and timing constraints.

## Q4(a) Explain the significance of gateway and router. Write their different types. [7 marks]

### Answer
A **router** connects different IP networks and forwards packets using network-layer addresses and routing tables. It chooses a next hop based on the destination prefix and routing metrics. Routers separate broadcast domains and can interconnect LANs, WANs and the Internet.

**Types of routers:**
- Wired router: connects networks through wired interfaces.
- Wireless router: combines routing and Wi-Fi access-point functions.
- Core router: forwards traffic inside the backbone of a large network.
- Edge/border router: connects an organization's network to an external network or ISP.
- Virtual/software router: performs routing functions in software.

A **gateway** connects networks or systems that may use different protocols, architectures or data formats. A default gateway is the next-hop router used by a host to reach destinations outside its local subnet.

**Types/examples of gateways:** default gateway, protocol gateway (converts between protocols), application gateway (acts at application level, e.g. proxy), and media gateway (connects different communication media or networks).

**Difference:** A router normally forwards IP packets between IP networks; a protocol/application gateway may translate or mediate between unlike systems. In ordinary IP LAN usage, the term “default gateway” usually refers to a router.

## Q4(b) Token Ring: transmission rate is 10⁷ bps and propagation speed is 200 metres per microsecond. Find cable length equal to one-bit delay. [7 marks]

### Answer
Given:
- Data rate `R = 10⁷ bits/s`.
- Propagation speed `v = 200 m/µs`.

Time to transmit one bit:

\[
T_b=\frac{1}{10^7}\;s=10^{-7}s=0.1\;\mu s
\]

Cable length corresponding to this propagation time:

\[
L=vT_b=200\;\frac{m}{\mu s}\times0.1\;\mu s=\boxed{20\;m}
\]

**Answer:** 20 metres of cable produces a propagation delay equal to one bit time.

## Q5(a) How is a TCP connection established? Explain with a diagram. [7 marks]

### Answer
TCP establishes a connection using a **three-way handshake** so that both endpoints synchronize their initial sequence numbers and confirm that both can send and receive.

1. **SYN:** Client sends a TCP segment with SYN=1 and initial sequence number `x`.
2. **SYN-ACK:** Server replies with SYN=1, ACK=1, sequence number `y`, and acknowledgement `x+1`.
3. **ACK:** Client sends ACK=1 with acknowledgement `y+1`. The connection is established.

```text
Client                                      Server
  | ---- SYN, Seq = x ----------------------> |
  | <--- SYN+ACK, Seq = y, Ack = x+1 ------- |
  | ---- ACK, Ack = y+1 --------------------> |
  |            Connection established        |
```

The handshake confirms reachability in both directions and synchronizes sequence-number state. Data can then be exchanged reliably using acknowledgements, retransmission and flow control.

## Q5(b) Given 205.16.37.39/28, find first address, last address and total addresses. [7 marks]

### Answer
Prefix `/28` gives mask `255.255.255.240`. The block size in the last octet is `256−240=16`.

The ranges are 0–15, 16–31, 32–47, 48–63, etc. The value 39 lies in the 32–47 range.

- **First/network address:** `205.16.37.32`
- **Last/broadcast address:** `205.16.37.47`
- **Total addresses:** `2^(32−28)=16`
- **Usable host addresses:** 14 (`.33` through `.46`)

## Q6(a) What techniques improve Quality of Service? Explain Leaky Bucket for fixed-size and variable-length packets. [7 marks]

### Answer
**Quality of Service (QoS)** is the ability of a network to provide predictable service characteristics such as bandwidth, delay, jitter and packet loss.

Four general QoS-improvement techniques are:
1. **Scheduling:** Decides which packet is transmitted next. Examples: FIFO, priority queuing and weighted fair queuing.
2. **Traffic shaping:** Controls the rate and burstiness of traffic before it enters the network. Examples: Leaky Bucket and Token Bucket.
3. **Resource reservation:** Reserves bandwidth or other resources for a flow when supported by the network.
4. **Admission control:** Accepts a new flow only if sufficient resources are available to maintain existing QoS commitments.

**Leaky Bucket algorithm:** Imagine a bucket with a small leak. Packets enter a finite queue; packets leave at a controlled, approximately constant rate. If the bucket is full, arriving packets are discarded. This smooths bursty traffic.

- **Fixed-size packets:** The bucket can be represented as a queue of packet slots. One packet is transmitted at each fixed interval. If the queue is full, a new packet is dropped.
- **Variable-length packets:** The bucket is measured in bytes/bits rather than packet count. A fixed number of bytes is allowed to leave per time interval; packets are queued until enough service capacity is available. The implementation must define how packet boundaries are handled.

**Advantages:** Controls output rate, reduces bursts and makes traffic more predictable. **Limitation:** It may discard bursts when the queue fills and does not allow unused capacity to be saved for a later burst, unlike Token Bucket.

## Q6(b) How does DHCP provide static and dynamic address allocation? [7 marks]

### Answer
**DHCP (Dynamic Host Configuration Protocol)** automatically provides IP configuration such as IP address, subnet mask, default gateway and DNS server.

Three allocation approaches are commonly described:
1. **Manual / static allocation:** The administrator binds a particular IP address to a client's MAC/client identifier. DHCP supplies the same configured address to that client.
2. **Automatic allocation:** The server assigns an address from a pool permanently or for an indefinite period, according to its configuration.
3. **Dynamic allocation:** The server leases an address for a limited time. The client must renew the lease to continue using it.

**DORA process for dynamic allocation:**

```text
Client                         DHCP Server
  | ---- DHCPDISCOVER (broadcast) ----> |
  | <--- DHCPOFFER -------------------- |
  | ---- DHCPREQUEST -----------------> |
  | <--- DHCPACK ---------------------- |
```

The client discovers a server, receives an offer, requests an address and receives acknowledgement. DHCP uses UDP ports 68 (client) and 67 (server) in IPv4.

## Q7(a) Find the minimum Stop-and-Wait frame size for 50% utilization on a 64-kbps link with 20-ms propagation delay. [7 marks]

### Answer
The question is the same calculation as 2025 Q7(c). ACK transmission and processing are negligible.

\[
U=\frac{T_f}{T_f+2T_p},\quad U=0.5,\quad T_p=0.02s
\]

\[
0.5=\frac{T_f}{T_f+0.04}\Rightarrow T_f=0.04s
\]

\[
L=64,000\times0.04=2,560\;bits=\boxed{320\;bytes}
\]

## Q7(b) Describe unicast, broadcast and multicast. [7 marks]

### Answer
- **Unicast:** One sender transmits to one destination host; example is a client-server web connection.
- **Broadcast:** One sender transmits to all nodes in an IPv4 broadcast domain. A limited broadcast is `255.255.255.255` and is not routed.
- **Multicast:** One sender transmits to a group of interested receivers. IPv4 multicast uses addresses from `224.0.0.0/4`; IPv6 multicast addresses begin with `FF`.

Unicast is one-to-one, broadcast is one-to-all within the defined broadcast scope, and multicast is one-to-selected-group. IPv6 uses multicast instead of broadcast.

## Q8. Short notes — answer every listed alternative (the paper asks any two).

The five options below are the options printed in the **2024 Annual Examination**. All five are answered here for preparation.

> **Paper-printing note:** In the scan, the final IPv4 option is labelled “(c)” again after option “(d)”. It is treated as the fifth option and labelled “(e)” here only to keep the answer sections distinct.

### (a) ARP and RARP

**Address Resolution Protocol (ARP)** is used in IPv4 networks to find the hardware (MAC) address corresponding to a known IPv4 address on the local network.

**Working of ARP:**
1. The sender first checks its ARP cache for an existing IP-to-MAC mapping.
2. If the mapping is unavailable, it sends an **ARP Request** in an Ethernet broadcast frame (`FF:FF:FF:FF:FF:FF`). The request contains the target IPv4 address.
3. All devices on the local LAN receive the request. The device whose IPv4 address matches the target normally sends an **ARP Reply** containing its MAC address.
4. The reply is usually unicast to the requester. The sender stores the mapping temporarily in its ARP cache and uses it to build Ethernet frames.
5. If the destination is on another network, the sender resolves the MAC address of its default gateway rather than the remote host.

**Reverse Address Resolution Protocol (RARP)** performs the reverse task: a host that knows its hardware/MAC address requests its IPv4 address from a RARP server. It was historically used by diskless workstations during booting.

| ARP | RARP |
|---|---|
| Resolves IPv4 address to MAC address | Resolves MAC address to IPv4 address |
| Used by an IPv4 host to send a frame on the local link | Historically used by a device that did not know its IP address at startup |
| Request is broadcast; reply normally unicast | Client broadcasts a request; a RARP server replies |
| Still used in IPv4 LANs | Largely obsolete; replaced by BOOTP and DHCP, which can provide more configuration information |

**Conclusion:** ARP finds the local hardware address for a known IPv4 destination, while RARP historically allowed a device to discover its IPv4 address from its hardware address.

### (b) Routing Protocol

A **routing protocol** is a set of rules that allows routers to exchange network-reachability information and select paths for forwarding packets. It helps routers build and update their routing tables when network conditions or topology change.

**Main types:**
1. **Distance-vector protocols:** Routers exchange route information with their neighbours and select routes using a metric such as hop count. Example: **RIP**.
2. **Link-state protocols:** Routers distribute link-state information, build a topology database and calculate shortest paths. Example: **OSPF**.
3. **Path-vector protocols:** Routers advertise reachable network prefixes together with path and policy information between autonomous systems. Example: **BGP**.

**Other classification:** Static routes are entered manually by an administrator, whereas dynamic routes are learned and updated through routing protocols.

**Important functions:** route discovery, best-path selection, route-table maintenance, adaptation to link failures and route sharing between routers. Common route metrics include hop count, cost, delay and bandwidth, depending on the protocol.

**Conclusion:** Routing protocols help routers learn where destination networks are located and maintain suitable paths for packet delivery.

### (c) Switches and Hubs

A **hub** is a Physical Layer multiport repeater. It regenerates incoming bits and sends them out through all other ports. All connected devices share the same collision domain and bandwidth; hubs generally operate in half-duplex mode.

A **switch** is commonly a Data Link Layer device that learns source MAC addresses and stores them in a MAC address table. It forwards a unicast frame to the port associated with the destination MAC address; unknown unicast and broadcast frames are flooded within the relevant VLAN.

| Hub | Switch |
|---|---|
| Works at the Physical Layer | Commonly works at the Data Link Layer |
| Repeats incoming bits to all other ports | Forwards frames using a MAC address table |
| All ports share one collision domain | Each switch port is a separate collision domain |
| Shared bandwidth; usually half-duplex | Dedicated port bandwidth; commonly full-duplex |
| Does not learn MAC addresses | Learns source MAC addresses |
| More collisions and unnecessary traffic | More efficient forwarding and fewer collisions |

**Conclusion:** A hub repeats signals to every port, while a switch makes forwarding decisions using MAC addresses. Switches have largely replaced hubs in modern Ethernet LANs.

### (d) FDM and TDM

**Frequency Division Multiplexing (FDM)** and **Time Division Multiplexing (TDM)** are techniques for sharing one communication channel among multiple signals or users.

**1. Frequency Division Multiplexing (FDM):** The available channel bandwidth is divided into separate frequency bands. Each signal uses its assigned band, so multiple signals can be transmitted at the same time. Guard bands are placed between adjacent channels to reduce interference. FDM is used in radio broadcasting and cable communication systems.

**2. Time Division Multiplexing (TDM):** Users share the same channel by transmitting in different time slots. Each source is assigned one or more slots in a repeating frame. Synchronous TDM uses fixed slots, while statistical TDM assigns capacity according to which sources have data. TDM requires timing and frame synchronization.

| Basis | FDM | TDM |
|---|---|---|
| Resource divided | Frequency bandwidth | Transmission time |
| Transmission | Multiple signals can be sent simultaneously in separate bands | Users transmit in separate time slots |
| Separation | Guard bands | Time-slot boundaries and synchronization |
| Common use | Radio and cable systems | Digital telephone and digital communication systems |
| Main requirement | Adequate frequency separation | Accurate timing/synchronization |

**Conclusion:** FDM separates signals by frequency, whereas TDM separates them by time. Both allow multiple data streams to share a communication channel.

### (e) IPv4 Addressing

**Internet Protocol version 4 (IPv4)** uses a 32-bit logical address to identify an interface on an IP network. It is written in dotted-decimal notation as four 8-bit octets separated by dots. For example, `192.168.1.10`.

An IPv4 address contains a **network prefix** and a **host portion**. In CIDR notation, the prefix length is written after a slash. For example, `192.168.1.0/24` means that the first 24 bits identify the network and the remaining 8 bits are available for addresses within that block.

**Main points:**
1. IPv4 addresses are 32 bits long and provide approximately 4.3 billion possible bit patterns.
2. The subnet mask or prefix length identifies the network portion of the address.
3. Historical classful addressing divided unicast ranges into Class A, B and C, but modern networks use CIDR rather than fixed class boundaries.
4. IPv4 supports unicast, broadcast and multicast communication.
5. Private IPv4 address blocks are `10.0.0.0/8`, `172.16.0.0/12` and `192.168.0.0/16`. They are commonly used inside private networks and are not globally routed on the public Internet.
6. ARP is used to resolve a local IPv4 next-hop address to a MAC address on an Ethernet LAN.

**Conclusion:** IPv4 addressing identifies interfaces and enables packet delivery through network prefixes, subnet masks and routing.

---

# PART III — 2023 ANNUAL EXAMINATION

## Q1(a) What are the main functions of different layers in the OSI approach? [7 marks]

### Answer
The OSI model has seven layers:

1. **Physical:** Sends raw bits through a medium; defines signals, data rate, connectors and transmission characteristics.
2. **Data Link:** Provides framing, MAC/physical addressing, media access and error detection for a link.
3. **Network:** Provides logical addressing, routing and packet forwarding across networks.
4. **Transport:** Provides process-to-process delivery, segmentation, reassembly, reliability and flow control.
5. **Session:** Establishes and manages dialogs and synchronization between applications.
6. **Presentation:** Translates data formats and may perform encryption and compression.
7. **Application:** Provides network services to user applications, such as web, e-mail and file transfer.

```text
Application → Presentation → Session → Transport
     → Network → Data Link → Physical
```

## Q1(b) Compare wired media and wireless media. [7 marks]

### Answer
**Wired (guided) media** carry signals through a physical path such as twisted-pair cable, coaxial cable or optical fibre. **Wireless (unguided) media** carry electromagnetic waves through air or space, such as radio, microwave and infrared.

| Basis | Wired media | Wireless media |
|---|---|---|
| Physical path | Requires cable/fibre | No physical signal cable between endpoints |
| Mobility | Limited by cable connection | Supports mobility and roaming |
| Interference | Usually less affected by external radio interference; copper can pick up noise | More exposed to interference, fading and obstacles |
| Security | Physical access is generally needed to tap the cable | Signals may be received outside the intended area; encryption is important |
| Installation | Cable routing may be expensive | Faster deployment in many environments |
| Speed/reliability | Fibre and modern Ethernet can provide high, stable rates | Depends on radio conditions, range and shared spectrum |
| Examples | Twisted pair, coaxial, optical fibre | Wi-Fi, cellular, microwave, satellite |

**Conclusion:** Wired media are often chosen for stable high-capacity fixed links, while wireless media provide mobility and flexible deployment.

## Q2(a) Describe multiplexing techniques. [7 marks]

### Answer
**Multiplexing** combines multiple signals so they can share one physical communication channel. A MUX combines the source streams and a DEMUX separates them at the destination.

1. **Frequency Division Multiplexing (FDM):** Divides channel bandwidth into non-overlapping frequency bands. Each user transmits simultaneously in a different band. Guard bands reduce overlap. Used in radio and cable systems.
2. **Time Division Multiplexing (TDM):** Divides transmission time into slots. Users share the full channel bandwidth but transmit in different slots. Synchronous TDM has fixed slots; statistical TDM assigns slots to active users.
3. **Wavelength Division Multiplexing (WDM):** Uses different optical wavelengths (colours) to carry independent channels through one optical fibre. It is the optical-fibre form analogous to FDM.

**Advantages:** Better bandwidth utilization, shared infrastructure and multiple simultaneous communications. The systems require appropriate frequency, time or wavelength separation and synchronization.

## Q2(b) Explain spread spectrum. [7 marks]

### Answer
**Spread spectrum** is a transmission technique in which the signal is spread over a bandwidth much wider than the minimum required to send the information. A spreading code is used at the transmitter and the receiver uses the same code to recover the data.

**Main techniques:**
1. **Frequency Hopping Spread Spectrum (FHSS):** The carrier rapidly changes among a sequence of frequency channels according to a shared hopping pattern. It can reduce the effect of narrowband interference.
2. **Direct Sequence Spread Spectrum (DSSS):** Each data bit is combined with a faster pseudo-random chip sequence. This spreads the signal over a wider bandwidth; the receiver correlates with the same code to recover the data.

**Advantages:** Resistance to narrowband interference, improved privacy against casual interception, and support for multiple users using different codes in code-division systems. **Limitations:** Requires bandwidth, code synchronization and more complex receivers.

## Q3(a) A 10-bit sequence 1010011110 uses divisor 1011. Find the CRC check bits. [7 marks]

### Answer
Data = `1010011110`; divisor = `1011` (degree 3).

1. Append 3 zeros: `1010011110000`.
2. Perform modulo-2 division by `1011` using XOR.
3. Remainder = `001`.
4. Transmitted codeword = data + remainder.

\[
\boxed{1010011110001}
\]

At the receiver, division by `1011` should produce zero remainder if no error is detected.

## Q3(b) Describe the error-detection approach in computer networks. [7 marks]

### Answer
Errors can occur when transmitted bits are altered by noise or interference. **Error detection** adds redundant bits so the receiver can check whether a frame has likely been corrupted.

1. **Parity check:** Adds one parity bit so the number of 1s becomes even or odd. It detects all odd-numbered bit errors but may miss even-numbered errors.
2. **Two-dimensional parity / block parity:** Adds parity for rows and columns of a block. It can detect many multiple-bit errors and locate a single-bit error at a row-column intersection.
3. **Checksum:** Data is divided into fixed-size words, added using one's-complement arithmetic, and the complement is transmitted. The receiver repeats the calculation and checks the result. It is used in IP-related and transport checksums.
4. **Cyclic Redundancy Check (CRC):** Treats the bit sequence as a polynomial over modulo-2 arithmetic. The sender divides the augmented data by a generator polynomial and appends the remainder. The receiver divides the codeword by the same generator; a non-zero remainder indicates an error.

Error detection does not itself correct the error. The receiver may discard the frame and request retransmission using ARQ.

## Q4(a) Discuss the mechanism of Sliding Window flow control with diagram. [7 marks]

### Answer
Sliding Window flow control allows a sender to send several frames before stopping for acknowledgements. It prevents a fast sender from overwhelming a slower receiver.

The sender maintains a window of sequence numbers that it is allowed to transmit. The receiver advertises or implies the amount of data it can accept. When acknowledgements arrive, the sender window advances.

Example with window size 4:

```text
Before ACKs:  [0] [1] [2] [3]  4   5   6   7
After ACK 0,1: 0   1  [2] [3] [4] [5]  6   7
```

If frames are received correctly, acknowledgements confirm receipt and allow the window to move. In Go-Back-N, the receiver generally accepts only in-order frames; in Selective Repeat, it can buffer certain out-of-order frames. Sliding windows improve throughput compared with stop-and-wait because multiple frames can be in transit.

## Q4(b) Explain CSMA/CD protocol. [7 marks]

### Answer
**CSMA/CD (Carrier Sense Multiple Access with Collision Detection)** is a medium access method used in traditional shared, half-duplex Ethernet.

1. A station listens to the channel (carrier sensing).
2. If the channel is busy, it waits; if idle, it begins transmitting.
3. While transmitting, it continues monitoring the medium.
4. If a collision is detected, it stops normal transmission and sends a jam signal so all stations recognize the collision.
5. It waits for a random time determined by binary exponential backoff and then tries again.

Collision detection is possible only if the collision signal returns while the station is still transmitting. Therefore, Ethernet defines a minimum frame size related to maximum propagation delay:

\[
L_{min}=2\tau R
\]

where `τ` is one-way propagation delay and `R` is the bit rate. Modern switched full-duplex Ethernet does not use CSMA/CD because each link is point-to-point and can transmit in both directions simultaneously.

## Q5(a) Compare IPv4 and IPv6. [7 marks]

### Answer
| Feature | IPv4 | IPv6 |
|---|---|---|
| Address length | 32 bits | 128 bits |
| Notation | Dotted decimal | Colon-separated hexadecimal |
| Example | `192.0.2.1` | `2001:db8::1` |
| Header | Variable length, 20–60 bytes | Fixed base header, 40 bytes |
| Checksum | Header checksum present | No base-header checksum |
| Fragmentation | Source and routers may fragment | Only source performs fragmentation; routers do not |
| Broadcast | Supported | No broadcast; multicast is used |
| Address configuration | Manual or DHCP | SLAAC, DHCPv6 or manual |
| Address resolution | ARP | Neighbor Discovery Protocol (ICMPv6) |

IPv6 provides a much larger address space, simplified base header and improved support for autoconfiguration and extension headers. IPv4 remains widely deployed, so transition mechanisms are used.

## Q5(b) Explain ARP protocol. [7 marks]

### Answer
ARP resolves an IPv4 address to a MAC address on the local network.

1. The sender checks its ARP cache for the target IPv4-to-MAC mapping.
2. If no mapping exists, it broadcasts an ARP Request frame containing the target IP address.
3. All devices on the LAN receive the request, but only the device whose IP matches the target normally replies.
4. The target sends an ARP Reply containing its MAC address, usually as a unicast frame to the requester.
5. The requester stores the mapping in its ARP cache for future communication.

If the destination IP is outside the local subnet, the sender resolves the MAC address of its default gateway and sends the IP packet to that router. ARP operates within a local IPv4 broadcast domain and is not routed across routers.

## Q6(a) Compare TCP and UDP protocols. [7 marks]

### Answer
TCP is connection-oriented, reliable and ordered. It uses sequence numbers, acknowledgements, retransmission, flow control and congestion control. It provides a byte stream and uses a three-way handshake.

UDP is connectionless and message-oriented. It provides datagram delivery without built-in acknowledgement, ordering, retransmission or congestion control. Its header is only 8 bytes.

| TCP | UDP |
|---|---|
| Connection-oriented | Connectionless |
| Reliable and ordered | Best-effort, no delivery/order guarantee |
| Byte-stream service | Datagram service |
| Flow and congestion control | No built-in flow/congestion control |
| Minimum 20-byte header | 8-byte header |
| Web, e-mail, file transfer | DNS, real-time media, online games |

## Q6(b) Explain the Leaky Bucket algorithm. [7 marks]

### Answer
Leaky Bucket is a traffic-shaping algorithm that converts bursty input traffic into a controlled output rate. Packets enter a finite buffer (bucket) and leave at a fixed rate. If the buffer is full when a packet arrives, that packet is discarded.

**Working:**
1. Incoming packets are placed in the queue.
2. A timer or scheduler removes data at a constant rate.
3. If no data is waiting, the output is idle.
4. If the queue is full, new packets are dropped.

```text
Bursty input → [Finite queue / bucket] → Constant-rate output
                      |
                 overflow: drop
```

For variable-size packets, the bucket/queue is measured in bytes and the output rate is limited in bytes per second. For fixed-size packets, it can be represented as a queue of packet slots served at fixed intervals.

**Advantages:** Smooths bursts, controls average output rate and helps avoid congestion. **Disadvantage:** It cannot preserve large bursts once the queue is full; Token Bucket permits controlled bursts by accumulating tokens.

## Q7(a) Explain Go-Back-N ARQ with a suitable diagram. [7 marks]

### Answer
**Go-Back-N ARQ** is a sliding-window error-control protocol in which the sender may transmit several frames before receiving acknowledgements, but the receiver accepts only the next expected frame in sequence.

- The sender window may contain up to `N` outstanding frames.
- The receiver window size is normally 1.
- ACKs are cumulative: an ACK indicates the next sequence number expected (depending on numbering convention).
- If a frame is lost or damaged, the receiver discards subsequent out-of-order frames.
- When the timer for the oldest unacknowledged frame expires, the sender retransmits that frame and all later outstanding frames.

```text
Sender                         Receiver
  | -------- Frame 0 ----------> | accepts 0
  | -------- Frame 1 ----X       | lost
  | -------- Frame 2 ----------> | discards (out of order)
  | <------- ACK 1 ------------- | still expects 1
  |       timeout for frame 1    |
  | -------- Frame 1 ----------> | accepts 1
  | -------- Frame 2 ----------> | accepts 2
```

**Advantage:** Simple receiver and efficient pipelining. **Disadvantage:** A single error may force retransmission of several correctly transmitted later frames.

## Q7(b) What is topology in a computer network? [7 marks]

### Answer
Network topology is the physical or logical arrangement of nodes and links. Common types are:

- **Bus:** All nodes share one backbone; low cost but backbone failure affects all nodes.
- **Star:** All nodes connect to a central switch/hub; easy to manage, but central-device failure affects the network.
- **Ring:** Each node connects to two neighbours; orderly access is possible, but a break can disrupt a simple ring.
- **Mesh:** Nodes have multiple paths; highly reliable but costly and complex.
- **Tree:** Hierarchical combination of stars; scalable but depends on the backbone.
- **Hybrid:** Combination of topologies.

## Q8(a) Discuss the elements of routing techniques. [7 marks]

### Answer
Routing is the process of selecting a path for packets from source to destination. Important elements include:

1. **Metric:** A measurable value used to compare routes, such as hop count, delay, bandwidth, reliability or cost.
2. **Routing algorithm:** The procedure used to calculate a preferred route. Examples include distance-vector and link-state algorithms.
3. **Routing table:** Stores destination prefixes, next hops, outgoing interfaces and metrics.
4. **Next-hop selection:** Chooses the neighbouring router to which a packet should be forwarded.
5. **Route update/convergence:** Routers exchange information and update their tables after topology changes.
6. **Static or dynamic routing:** Static routes are configured manually; dynamic routes are learned through protocols such as RIP, OSPF or BGP.
7. **Forwarding:** After a route is selected, the router sends the packet through the chosen interface.

## Q8(b) Short note on Wireless LAN. [7 marks]

### Answer
A **Wireless LAN (WLAN)** connects devices in a local area using radio waves instead of physical Ethernet cables. IEEE 802.11 Wi-Fi is the most common WLAN technology.

A WLAN normally uses an **Access Point (AP)** that connects wireless stations to a wired distribution network. In infrastructure mode, stations communicate through the AP; in ad hoc mode, stations communicate directly without an AP.

**Advantages:** Mobility, flexible installation, reduced cabling and easy expansion. **Limitations:** Radio interference, variable range, shared bandwidth and security risks if encryption/authentication are weak. WLAN security commonly uses WPA2 or WPA3.

---

# PART IV — 2022 ANNUAL EXAMINATION

## Q1(a) Differentiate between a port address, logical address and physical address. What are guided and unguided transmission media? [7 marks]

### Answer
Addresses at different layers identify different endpoints:

1. **Physical address:** A link-layer address such as an Ethernet MAC address. It identifies a network interface on a local link and is used for frame delivery.
2. **Logical address:** A Network Layer address such as IPv4 or IPv6. It identifies a host/interface across interconnected networks and is used for routing.
3. **Port address:** A Transport Layer port number identifies a process or service on a host. For example, TCP port 443 is commonly used for HTTPS.

| Address | Layer | Identifies | Example |
|---|---|---|---|
| Physical | Data Link | Local network interface | `00:1A:2B:3C:4D:5E` |
| Logical | Network | Network interface across networks | `192.168.1.10` |
| Port | Transport | Application process/service | TCP 443 |

**Guided media** carry signals through a physical path: twisted-pair cable, coaxial cable and optical fibre. **Unguided media** transmit electromagnetic waves through air or space: radio waves, microwaves and infrared. Guided media require a physical cable; unguided media support wireless communication and mobility.

## Q1(b) How does an e-mail go from sender to receiver? Explain the steps in the context of SMTP. [7 marks]

### Answer
E-mail delivery commonly uses SMTP to transfer outgoing mail between a sender's mail client and mail servers. POP3 or IMAP may later be used by the receiver to access the mailbox.

1. The sender writes an e-mail in a mail user agent (MUA) and submits it to the outgoing mail server, commonly using SMTP with authentication.
2. The sender's mail server checks the recipient domain. DNS is used to find the domain's MX (mail exchange) record.
3. The sender's mail transfer agent (MTA) establishes an SMTP connection with the recipient's mail server.
4. SMTP commands such as `EHLO/HELO`, `MAIL FROM`, `RCPT TO`, `DATA` and `QUIT` are used to transfer the message.
5. The recipient server accepts the message and stores it in the recipient's mailbox after applying its policies and filtering.
6. The receiver accesses the mailbox using IMAP or POP3, or through webmail.

```text
Sender MUA → Sender SMTP server → DNS MX lookup
       → Recipient SMTP server → Recipient mailbox
       → Receiver accesses by IMAP / POP3 / webmail
```

SMTP is a message-transfer protocol; IMAP and POP3 are mailbox-access protocols.

## Q2(a) Message 1010001101 is transmitted using CRC polynomial x⁵ + x⁴ + x² + 1. Find the transmitted message. [7 marks]

### Answer
Data = `1010001101`. Generator polynomial is:

\[
x^5+x^4+x^2+1 \Rightarrow 110101
\]

1. Degree = 5, so append five zeros: `101000110100000`.
2. Divide by `110101` using modulo-2 division.
3. The 5-bit remainder is `01110`.
4. Append the remainder to the original data.

\[
\boxed{101000110101110}
\]

This is the transmitted codeword. A receiver divides it by `110101`; zero remainder indicates no error detected.

## Q2(b) Compare Standard Ethernet and Gigabit Ethernet. Give data rates for Standard, Fast, Gigabit and Ten-Gigabit Ethernet. [7 marks]

### Answer
**Ethernet** is a family of wired LAN technologies standardized mainly under IEEE 802.3. It defines frame format, MAC addressing and physical-layer signalling.

| Ethernet type | Nominal data rate | Typical description |
|---|---:|---|
| Standard Ethernet | 10 Mbps | 10BASE-T, 10BASE-2, 10BASE-5 |
| Fast Ethernet | 100 Mbps | 100BASE-TX and related variants |
| Gigabit Ethernet | 1 Gbps | 1000BASE-T, fibre variants |
| 10-Gigabit Ethernet | 10 Gbps | 10GBASE-T and fibre variants |

Standard Ethernet operates at 10 Mbps and has historically supported shared half-duplex CSMA/CD as well as modern switched full-duplex operation. Fast Ethernet increases the nominal rate to 100 Mbps. Gigabit Ethernet provides 1 Gbps and is commonly used in LAN access and uplinks. 10-Gigabit Ethernet provides 10 Gbps, typically over fibre or suitable copper cabling.

Modern switched Ethernet is generally full duplex, so CSMA/CD is not used on those links. The exact cable type and maximum distance depend on the specific physical-layer variant.

## Q3(a) Distinguish multilevel TDM, multiple-slot TDM and pulse-stuffed TDM. [7 marks]

### Answer
These are methods used to combine multiple digital input streams.

1. **Multilevel TDM:** Several lower-rate multiplexed streams are combined in stages to create a higher-rate stream. For example, groups of primary channels may be multiplexed into a secondary group and then into a still higher-level group.
2. **Multiple-slot TDM:** A source is assigned more than one time slot in a frame when it has a higher data rate or needs more capacity than other sources. A source with twice the rate may receive twice as many slots.
3. **Pulse-stuffed TDM:** Input streams may have slightly different clock rates. Extra, non-information bits (stuffing bits) are inserted into faster streams so that all streams match a common rate. The receiver identifies and removes the stuffing bits.

**Difference:** Multilevel TDM combines groups in stages; multiple-slot TDM gives one source more than one slot per frame; pulse stuffing synchronizes input streams with slightly different rates.

## Q3(b) Compare Slotted ALOHA and Pure ALOHA. [7 marks]

### Answer
Pure ALOHA permits transmission at any time. Its vulnerable period is `2T`, and throughput is `S=G e^(−2G)`. Maximum throughput is `1/(2e) ≈ 18.4%` at `G=0.5`.

Slotted ALOHA divides time into equal frame slots and permits transmission only at the start of a slot. Its vulnerable period is `T`, and throughput is `S=G e^(−G)`. Maximum throughput is `1/e ≈ 36.8%` at `G=1`.

Slotted ALOHA needs synchronization but achieves about twice the maximum throughput of Pure ALOHA.

## Q4(a) State Nyquist formula for a noiseless channel and Shannon formula for a noisy channel. If bandwidth is 1 MHz and SNR is 63, calculate bit rate and signal levels. [7 marks]

### Answer
**Nyquist bit-rate formula** for a noiseless channel:

\[
C=2B\log_2 L
\]

where `B` is bandwidth in hertz and `L` is the number of discrete signal levels.

**Shannon capacity formula** for a noisy channel:

\[
C=B\log_2(1+SNR)
\]

Given `B = 1 MHz = 10^6 Hz`, `SNR = 63`.

\[
C=10^6\log_2(1+63)=10^6\log_2 64
\]

\[
C=10^6\times6=\boxed{6\;Mbps}
\]

Now use Nyquist formula to find the number of signal levels that can support this bit rate:

\[
6\times10^6=2(10^6)\log_2 L
\]

\[
3=\log_2 L\Rightarrow L=2^3=\boxed{8\;levels}
\]

**Answer:** Shannon capacity is 6 Mbps. The corresponding Nyquist calculation requires 8 signal levels. This is the theoretical maximum under the ideal assumptions of the formulas.

## Q4(b) Draw NRZ-L, NRZ-I, Manchester and Differential Manchester encoding for bit stream 010110110. [7 marks]

### Answer
Line coding maps digital bits into signal levels or transitions. The exact voltage polarity convention may vary; the following common convention is used:

- **NRZ-L:** 0 = high level; 1 = low level.
- **NRZ-I:** 1 causes a transition at the beginning of the bit interval; 0 causes no beginning transition. Assume initial level high.
- **Manchester:** 0 = high-to-low mid-bit transition; 1 = low-to-high mid-bit transition.
- **Differential Manchester:** Always has a mid-bit transition; 0 has a transition at the beginning of the bit, 1 has no beginning transition. Assume initial level high.

Bit stream: `0 1 0 1 1 0 1 1 0`.

| Bit | 0 | 1 | 0 | 1 | 1 | 0 | 1 | 1 | 0 |
|---|---|---|---|---|---|---|---|---|---|
| NRZ-L | H | L | H | L | L | H | L | L | H |
| NRZ-I level during bit* | H | L | L | H | L | L | H | L | L |
| Manchester half-bit | H-L | L-H | H-L | L-H | L-H | H-L | L-H | L-H | H-L |
| Differential Manchester half-bit* | L-H | H-L | H-L | L-H | H-L | H-L | L-H | H-L | H-L |

`*` For Differential Manchester, assume the level immediately before the first bit is high; 0 causes a transition at the start, 1 causes no start transition, and every bit has a mid-bit transition. NRZ-I also assumes initial level H and transitions at the start of each 1 bit. In the exam, draw equal-width bit intervals and mark the transitions clearly.

**Main difference:** NRZ uses levels; Manchester always has a mid-bit transition for clock recovery; Differential Manchester uses the presence or absence of a beginning transition to represent the bit.

## Q5(a) Compare IPv4 and IPv6 header formats. If IPv4 HLEN = 5 and Total Length = 0x0028, find the data bytes. [7 marks]

### Answer
**IPv4 header** has a variable size from 20 to 60 bytes. It includes Version, IHL/HLEN, DS/TOS, Total Length, Identification, Flags, Fragment Offset, TTL, Protocol, Header Checksum, source/destination addresses and optional fields.

**IPv6 base header** is fixed at 40 bytes. It includes Version, Traffic Class, Flow Label, Payload Length, Next Header, Hop Limit, Source Address and Destination Address. IPv6 removes the base-header checksum and uses extension headers for optional information.

Given HLEN = 5. In IPv4, HLEN is measured in 32-bit words:

\[
\text{Header length}=5\times4=20\;bytes
\]

Total Length = `0x0028` hexadecimal = 40 decimal bytes.

\[
\text{Data length}=40-20=\boxed{20\;bytes}
\]

## Q5(b) Define subnetting and supernetting. How do subnet and supernet masks differ from a default mask in classful addressing? [7 marks]

### Answer
**Subnetting** divides a network into smaller networks by borrowing bits from the host portion; the prefix becomes longer. **Supernetting** aggregates contiguous networks into a larger block; the prefix becomes shorter.

In classful addressing, default masks are Class A `/8` (`255.0.0.0`), Class B `/16` (`255.255.0.0`) and Class C `/24` (`255.255.255.0`). A subnet mask has more 1-bits than the classful default mask. A supernet mask has fewer network bits than the classful defaults and combines contiguous blocks, subject to alignment requirements.

Example: A Class C `/24` network can be subnetted into `/26` subnets. Four contiguous `/24` networks can be aggregated into one `/22` supernet.

## Q6(a) What are four general techniques to improve QoS? Explain Token Bucket. [7 marks]

### Answer
Four general QoS techniques are **scheduling, traffic shaping, resource reservation and admission control**.

**Token Bucket** is a traffic-shaping algorithm that allows controlled bursts while limiting the long-term average rate.

1. Tokens are added to a bucket at a fixed rate `r` tokens per second.
2. The bucket has a maximum capacity `B` tokens.
3. To send a packet of `n` bytes, the system must have enough tokens (often one token per byte).
4. If enough tokens exist, they are removed and the packet is sent immediately.
5. If not enough tokens exist, the packet waits or is handled according to the configured policy.
6. If the bucket becomes full, newly generated tokens are discarded.

The average output rate is limited by the token-generation rate, but accumulated tokens allow a burst up to bucket capacity. Unlike Leaky Bucket, Token Bucket does not force all output to be at a constant rate.

## Q6(b) Compare TCP header and UDP header. List TCP fields missing from UDP and explain why. [7 marks]

### Answer
The TCP header has a minimum size of 20 bytes and may be larger when options are present. UDP has a fixed 8-byte header.

**TCP fields:** source port, destination port, sequence number, acknowledgement number, data offset, reserved bits, control flags, window size, checksum, urgent pointer and optional fields.

**UDP fields:** source port, destination port, length and checksum.

TCP-only or TCP-specific fields absent from UDP:
- **Sequence number:** UDP does not provide ordered byte-stream sequencing.
- **Acknowledgement number:** UDP does not acknowledge each received byte/segment.
- **Data offset/header length:** UDP header has a fixed 8-byte size.
- **Control flags (SYN, ACK, FIN, RST, etc.):** UDP has no connection establishment or teardown.
- **Window size:** UDP has no built-in receiver flow control.
- **Urgent pointer:** UDP has no TCP-style urgent-data mechanism.
- **Options:** UDP has no TCP-style header options.

UDP is intentionally simpler and has lower overhead. Applications requiring reliability or ordering must implement those functions themselves or use another transport protocol.

## Q7(a) Satellite link problem: 1 Mbps, satellite altitude 36,504 km, propagation speed 3×10⁸ m/s. Find packet size for 25% utilization with Go-Back-127; ACK time negligible and no errors. [7 marks]

### Answer
Assumptions: one-way propagation from a ground station to the satellite and down to the other ground station is `2h`; the acknowledgement returns over the corresponding path, so round-trip propagation time is `4h/v`. Sender window size `W=127` frames. ACK transmission and processing are negligible.

Given:
- `R = 1 Mbps = 10^6 bits/s`
- `h = 36,504 km = 36,504,000 m`
- `v = 3×10^8 m/s`
- `W = 127`, required utilization `U = 0.25`

Round-trip propagation time:

\[
T_{RTT}=\frac{4h}{v}=\frac{4\times36,504,000}{3\times10^8}=0.48672\;s
\]

For a sliding window with negligible ACK transmission time:

\[
U=\frac{W T_f}{T_{RTT}+T_f}
\]

\[
0.25=\frac{127T_f}{0.48672+T_f}
\]

\[
0.25(0.48672+T_f)=127T_f
\]

\[
T_f=\frac{0.25\times0.48672}{127-0.25}=0.00096\;s
\]

Frame size:

\[
L=R T_f=10^6\times0.00096=960\;bits=\boxed{120\;bytes}
\]

**Answer:** 120 bytes, under the stated satellite path and RTT assumptions. If a course solution treats the quoted altitude as the one-way link distance rather than ground-satellite-ground distance, the assumed propagation path must be stated because it changes the result.

## Q7(b) Why is an ARP request broadcast? Discuss cases where ARP is used. [7 marks]

### Answer
An ARP request is broadcast because the sender knows the destination IPv4 address but does not know its MAC address. It therefore cannot address the request to the target MAC. The Ethernet destination is set to the broadcast MAC `FF:FF:FF:FF:FF:FF`, so every device on the local LAN receives it. The device whose IPv4 address matches the target replies with its MAC address.

**Cases of use:**
1. A host sends to another host on the same IPv4 subnet and needs that host's MAC address.
2. A host sends to a remote network and needs the MAC address of its default gateway.
3. A router needs the MAC address of a next-hop IPv4 neighbor on a directly connected network.
4. Gratuitous ARP may announce or check an IP-to-MAC mapping (e.g., detect duplicate IPv4 address or update caches).

ARP requests are not forwarded by routers. For IPv6, Neighbor Discovery replaces ARP.

## Q8(a) Short note on Classless Addressing. [7 marks]

### Answer
**Classless Inter-Domain Routing (CIDR)** assigns IPv4 addresses using an explicit prefix length rather than fixed Class A, B or C network boundaries. An address is written as `a.b.c.d/n`, where `n` is the number of leading network bits.

For example, `192.168.10.0/24` has 24 network bits and 8 host bits, giving 256 total addresses. CIDR supports flexible block sizes, efficient address allocation and route aggregation (supernetting). Routers use longest-prefix matching to select the most specific route.

## Q8(b) Short note on OSI Model. [7 marks]

### Answer
The OSI model has seven layers: Physical, Data Link, Network, Transport, Session, Presentation and Application. Physical transmits bits; Data Link frames them and handles MAC addressing; Network routes packets; Transport delivers data between processes; Session manages dialogs; Presentation translates/encrypts/compresses data; Application provides network services to users. It is a reference model used to understand, design and troubleshoot network systems.

## Q8(c) Short note on Byte and Bit Stuffing. [7 marks]

### Answer
**Stuffing** inserts extra data into a frame so that control patterns are not mistaken for frame delimiters.

- **Byte stuffing:** In byte-oriented protocols, a special escape byte is inserted before a data byte that equals a flag or escape value. The receiver removes the inserted escape byte. Example: if `FLAG` marks a frame boundary and the data contains `FLAG`, an `ESC` is inserted before it.
- **Bit stuffing:** In bit-oriented protocols such as HDLC, after five consecutive 1s in the data, the sender inserts a 0. The receiver removes a 0 that follows five consecutive 1s. This prevents the data from imitating the HDLC flag pattern `01111110`.

Byte stuffing works at byte level; bit stuffing works at bit level. Both provide transparent framing.

## Q8(d) Short note on PPP frame format. [7 marks]

### Answer
**PPP (Point-to-Point Protocol)** is a Data Link Layer protocol used to carry network-layer packets over point-to-point links. Its common frame format is:

```text
| Flag | Address | Control | Protocol | Information | FCS | Flag |
|  1 B |   1 B   |   1 B   |  2 B     | Variable    |2/4B |  1 B |
```

- **Flag:** `01111110` marks the start/end of a frame.
- **Address:** Usually the all-stations address in point-to-point PPP.
- **Control:** Usually a fixed unnumbered-frame value.
- **Protocol:** Identifies the encapsulated payload, e.g. IPv4 or IPv6.
- **Information:** Carries network-layer data.
- **FCS:** Frame Check Sequence for error detection.

PPP supports link establishment and configuration through LCP, and network-layer configuration through NCP. It uses byte stuffing on asynchronous links and bit stuffing on synchronous bit-oriented links.

---

# PART V — 2021 ANNUAL EXAMINATION

## Q1(a) Draw the OSI model and state the responsibilities of each layer. [10 marks]

### Answer
The OSI reference model divides network communication into seven layers:

```text
+-----------------------------+
| 7. Application               | User network services
+-----------------------------+
| 6. Presentation              | Translation, encryption, compression
+-----------------------------+
| 5. Session                   | Dialog and synchronization control
+-----------------------------+
| 4. Transport                 | End-to-end / process delivery
+-----------------------------+
| 3. Network                   | Logical addressing and routing
+-----------------------------+
| 2. Data Link                 | Framing, MAC addressing, link error detection
+-----------------------------+
| 1. Physical                  | Raw-bit transmission and signalling
+-----------------------------+
```

1. **Physical:** Defines transmission medium, connectors, signalling, bit timing, data rate and physical topology.
2. **Data Link:** Converts the raw bit stream into frames, adds physical addresses, controls access to the medium and detects link-level errors.
3. **Network:** Provides logical addressing, routing and forwarding so packets can travel across multiple networks.
4. **Transport:** Provides process-to-process delivery, segmentation/reassembly, reliability, flow control and congestion control depending on protocol.
5. **Session:** Establishes, maintains and terminates dialogs; supports synchronization and checkpoints.
6. **Presentation:** Translates data formats and may compress or encrypt data.
7. **Application:** Provides services to end-user applications such as e-mail, file transfer and web access.

**Conclusion:** The OSI model provides a systematic framework for understanding and troubleshooting network communication.

## Q1(b) Write advantages and disadvantages of Mesh and Ring topologies. [4 marks]

### Answer
**Mesh topology:** Each device is connected to several or all other devices.

Advantages: high reliability, multiple alternate paths, good fault tolerance and easier fault isolation.  
Disadvantages: expensive cabling and ports, complex installation, difficult expansion in a full mesh.

**Ring topology:** Each node is connected to two neighbouring nodes to form a closed loop.

Advantages: orderly access (in token-ring systems), predictable performance under load and fewer collisions in token-based operation.  
Disadvantages: a link or node failure may disrupt a simple ring; adding/removing nodes can interrupt service; delay can increase with the number of nodes.

## Q2(a) Message 11001001 uses CRC polynomial x³ + 1. Find the transmitted message. [8 marks]

### Answer
Data = `11001001`; polynomial `x³+1` corresponds to divisor `1001`.

1. Append three zeros: `11001001000`.
2. Divide by `1001` using modulo-2 XOR division.
3. Remainder = `011`.
4. Append remainder to original data.

\[
\boxed{11001001011}
\]

## Q2(b) Bit rate is 8000 bps and baud rate is 1000 baud. Find data elements per signal element and number of signal elements per second. [6 marks]

### Answer
Bit rate is the number of bits sent per second; baud rate is the number of signal elements (symbols) sent per second.

\[
\frac{8000\;bits/s}{1000\;symbols/s}=8\;bits/symbol
\]

Each signal element carries **8 data bits**. The signal rate is **1000 signal elements per second**.

## Q3(a) How does Slotted ALOHA differ from Pure ALOHA? Give vulnerable time and maximum throughput. [8 marks]

### Answer
Pure ALOHA allows a station to transmit at any time. Its vulnerable period is `2T`; throughput is `S=G e^(−2G)` and maximum throughput is `1/(2e)≈18.4%`.

Slotted ALOHA allows transmission only at the start of synchronized time slots. Its vulnerable period is `T`; throughput is `S=G e^(−G)` and maximum throughput is `1/e≈36.8%`.

Slotted ALOHA reduces the collision vulnerable period by half and doubles the theoretical maximum throughput, but requires synchronization among stations.

## Q3(b) Why is CSMA/CD better than CSMA? How is minimum frame size decided? [6 marks]

### Answer
CSMA senses the channel before sending, but collisions may still occur due to propagation delay. CSMA/CD also detects a collision while transmitting, sends a jam signal, stops transmission and retries after a random backoff. It therefore reduces the time wasted after a collision.

The minimum frame transmission time must be at least the round-trip propagation time:

\[
T_{frame}\ge 2\tau
\]

At bit rate `R`:

\[
L_{min}=2\tau R
\]

This ensures the sender is still transmitting when a worst-case collision returns. The classic Ethernet minimum MAC frame is 64 bytes. CSMA/CD applies to shared half-duplex Ethernet; not to modern full-duplex switched Ethernet.

## Q4(a) Explain the significance of gateway and router. Write their different types. [6 marks]

### Answer
A router connects IP networks and forwards packets using destination IP addresses and routing tables. It selects a next hop and separates broadcast domains. Router types include wired, wireless, core, edge/border and virtual routers.

A gateway connects networks or systems that may use different protocols or architectures. A default gateway is the router used by a host to reach destinations outside its local subnet. Other gateway examples include protocol gateways, application gateways/proxies and media gateways.

## Q4(b) Token Ring: transmission speed is 10⁷ bps and propagation speed is 200 m/µs. Find cable length equal to one-bit delay. [8 marks]

### Answer
Bit time:

\[
T_b=1/(10^7)=10^{-7}s=0.1\;\mu s
\]

Cable length:

\[
L=200\;m/\mu s\times0.1\;\mu s=\boxed{20m}
\]

## Q5(a) How is a TCP connection established? Explain with a diagram. [8 marks]

### Answer
TCP uses a three-way handshake:

1. Client sends SYN with initial sequence number `x`.
2. Server replies with SYN+ACK, sequence number `y`, acknowledgement `x+1`.
3. Client sends ACK acknowledging `y+1`.

```text
Client                                      Server
  | -------- SYN, Seq=x --------------------> |
  | <------- SYN+ACK, Seq=y, Ack=x+1 -------- |
  | -------- ACK, Ack=y+1 ------------------> |
                 Connection established
```

This synchronizes sequence numbers and confirms both endpoints are reachable before data transfer begins.

## Q5(b) For address 205.16.37.39/28, find first address, last address and total addresses. [6 marks]

### Answer
`/28` gives mask `255.255.255.240`; block size = `256−240=16`. Address `.39` falls in the `.32–.47` range.

- Network/first: `205.16.37.32`
- Broadcast/last: `205.16.37.47`
- Total addresses: `2^4=16`
- Usable host addresses: 14 (`.33–.46`).

## Q6(a) What techniques improve QoS? Explain Leaky Bucket for fixed-size and variable-length packets. [8 marks]

### Answer
Four QoS techniques are scheduling, traffic shaping, resource reservation and admission control.

**Leaky Bucket** stores incoming packets in a finite buffer and transmits them at a controlled rate. If the buffer is full, additional packets are discarded.

- For fixed-size packets, use a finite queue of packet slots and transmit one packet per fixed time interval.
- For variable-length packets, measure the queue in bytes and release a controlled number of bytes per unit time, while preserving packet boundaries as required by the implementation.

It smooths bursty input and helps control congestion, but can discard bursts when the queue fills. Token Bucket differs because it accumulates tokens and permits bursts up to its bucket capacity.

## Q6(b) How does DHCP provide static and dynamic address allocation? [6 marks]

### Answer
DHCP provides host configuration automatically.

- **Manual/static allocation:** Administrator reserves a fixed address for a particular client identifier/MAC address; the client receives the same address.
- **Automatic allocation:** Server assigns an address from a pool, commonly for long-term or indefinite use.
- **Dynamic allocation:** Server leases an address for a limited period; the client renews the lease to keep it.

Dynamic allocation uses DORA: DHCPDISCOVER, DHCPOFFER, DHCPREQUEST and DHCPACK. DHCP also provides subnet mask, router and DNS configuration.

## Q7(a) Stop-and-Wait with 64 kbps and 20 ms propagation delay: find minimum frame size for 50% utilization. [7 marks]

### Answer
Using negligible ACK transmission and processing time:

\[
U=\frac{T_f}{T_f+2T_p},\quad 0.5=\frac{T_f}{T_f+0.04}
\]

So `Tf=0.04 s`.

\[
L=64,000\times0.04=2,560\;bits=\boxed{320\;bytes}
\]

## Q7(b) Describe unicast, broadcast and multicast. [6 marks]

### Answer
- **Unicast:** one sender to one receiver (e.g., ordinary web connection).
- **Broadcast:** one sender to all devices in an IPv4 local broadcast domain (e.g., ARP request). IPv6 does not use broadcast.
- **Multicast:** one sender to a selected receiver group (e.g., IPTV). Only group members receive the data where multicast routing is supported.

## Q8(a) Short note on Multiplexing. [7 marks]

### Answer
Multiplexing combines several data streams over one physical channel. FDM gives users separate frequency bands; TDM gives users separate time slots; WDM uses different optical wavelengths in fibre; CDM uses spreading codes. A multiplexer combines signals and a demultiplexer separates them. Multiplexing improves channel utilization and reduces the need for separate physical channels.

## Q8(b) Short note on Routing Protocol. [7 marks]

### Answer
A routing protocol exchanges route information between routers so that they can choose paths. RIP is a distance-vector protocol using hop count; OSPF is a link-state protocol using a topology database and shortest-path calculation; BGP is a path-vector protocol used between autonomous systems. Route metrics and policies influence path selection.

## Q8(c) Short note on Switches and Hubs. [7 marks]

### Answer
A hub is a Physical Layer repeater that repeats incoming signals to every other port. All devices share one collision domain. A switch learns MAC addresses and forwards frames to the correct port, creating a separate collision domain per port. Full-duplex switching supports simultaneous two-way transmission and avoids collisions.

## Q8(d) Short note on TCP vs UDP. [7 marks]

### Answer
TCP is connection-oriented and reliable. It uses acknowledgements, sequence numbers, retransmissions, flow control and congestion control. UDP is connectionless, has a fixed 8-byte header and offers best-effort datagram delivery without built-in retransmission or ordering. TCP suits reliable web/file/e-mail transfer; UDP suits DNS and latency-sensitive voice/video or applications that implement their own reliability.

## Q8(e) Short note on Piggybacking. [7 marks]

### Answer
Piggybacking attaches an acknowledgement to an outgoing data frame in the reverse direction rather than sending a separate ACK immediately. It reduces control-frame overhead in bidirectional communication. The receiver waits for a short period for reverse data; if none arrives, it sends a standalone ACK so acknowledgement is not delayed indefinitely.

---
