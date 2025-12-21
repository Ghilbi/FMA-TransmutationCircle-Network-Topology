# 🔮 Network Transmutation Circle

> *"Humankind cannot gain anything without first giving something in return."* — The Law of Equivalent Exchange

An interactive network topology visualization inspired by **Fullmetal Alchemist**, built with React and Node.js. This project visualizes a three-tier enterprise network architecture as a mystical transmutation circle.

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?logo=vite)
![Express](https://img.shields.io/badge/Express-5.2.1-000000?logo=express)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js)

---

## ✨ Features

- **Interactive SVG Visualization** — Click on devices to view detailed information
- **Sacred Geometry Design** — Pentagram and hexagram patterns with concentric rings
- **Layer Filtering** — Filter by Core, Distribution, Access, or Endpoint layers
- **VLAN Highlighting** — Color-coded VLAN visualization (10, 20, 30, 40)
- **Alchemical Theming** — Each device type has a unique symbol (⬡ ⊛ ☿ ◎ ☉ ☽)
- **Responsive Design** — Dark theme with glowing effects

## 🏗️ Architecture

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
      │   FW-N    │         │   FW-E    │         │   FW-S/W  │
      │  Firewall │         │  Firewall │         │ Firewalls │
      └─────┬─────┘         └─────┬─────┘         └─────┬─────┘
            │                     │                     │
      ┌─────┴─────┐         ┌─────┴─────┐         ┌─────┴─────┐
      │   DSW-N   │         │   DSW-E   │         │  DSW-S/W  │
      │  VLAN 10  │         │  VLAN 20  │         │ VLANs 30/40│
      └─────┬─────┘         └─────┬─────┘         └─────┬─────┘
            │                     │                     │
         Access               Access                 Access
        Switches             Switches               Switches
            │                     │                     │
        Endpoints             Endpoints             Endpoints
```

## 📦 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, Vite 7, CSS3 |
| Backend | Node.js, Express 5 |
| Visualization | SVG with React |

## � Cisco Packet Tracer File

A complete `.pkt` file is included in this repository for use with **Cisco Packet Tracer**. This file contains the full network topology with all device configurations pre-built, allowing you to:

- Explore the network in simulation mode
- Test connectivity between VLANs
- View and modify device configurations
- Practice network troubleshooting

> **Note:** Requires [Cisco Packet Tracer](https://www.netacad.com/courses/packet-tracer) to open.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn
- (Optional) Cisco Packet Tracer 8.0+ for the `.pkt` file

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/network-transmutation-circle.git
   cd network-transmutation-circle
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the backend server** (Terminal 1)
   ```bash
   cd backend
   npm start
   ```
   The API will be available at `http://localhost:5000`

2. **Start the frontend** (Terminal 2)
   ```bash
   cd frontend
   npm run dev
   ```
   Open `http://localhost:5173` in your browser

## 📁 Project Structure

```
├── backend/
│   ├── server.js        # Express API server
│   ├── devices.json     # Network device data
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx      # Main visualization component
│   │   ├── App.css      # Styling with animations
│   │   └── main.jsx     # React entry point
│   ├── index.html
│   └── package.json
└── documentation/
    ├── COMPLETE_PROJECT_DOCUMENTATION.md
    ├── DEFENSE_GUIDE.md
    └── PACKET_TRACER_BUILD.md
```

## 🎨 Device Symbols

| Symbol | Device Type | Meaning |
|--------|-------------|---------|
| ⬡ | Router | The Gate |
| ⊛ | Firewall | Protection Array |
| ☿ | L3 Switch | Mercury/Equivalent Exchange |
| ◎ | Switch | Ouroboros |
| ☉ | Server | Philosopher's Stone |
| ☽ | PC | Human Soul |

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/devices` | Returns all network devices |

## 📖 Documentation

Detailed documentation is available in the [documentation](./documentation/) folder:

- **[Complete Project Documentation](./documentation/COMPLETE_PROJECT_DOCUMENTATION.md)** — Full network architecture details
- **[Defense Guide](./documentation/DEFENSE_GUIDE.md)** — Presentation guide
- **[Packet Tracer Build](./documentation/PACKET_TRACER_BUILD.md)** — Cisco Packet Tracer setup

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  <em>"The world isn't perfect. But it's there for us, doing the best it can."</em>
</p>
