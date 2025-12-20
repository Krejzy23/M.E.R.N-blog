export const category = [
  {
    id: "1",
    title: "Scripts",
    color: ["#39FF14"],
  },
  {
    id: "2",
    title: "Linux",
    color: ["#FF00FF"],
  },
  {
    id: "3",
    title: "Red Team",
    color: ["#FF1B1C"],
  },
  {
    id: "4",
    title: "Flashing",
    color: ["#FF6A00"],
  },
  {
    id: "5",
    title: "Blue Team",
    color: ["#007BFF"],
  },
  {
    id: "6",
    title: "ChatGPT",
    color: ["#FFEA00"],
  },
  {
    id: "7",
    title: "Crypto",
    color: ["#00F4D1"],
  },
  {
    id: "8",
    title: "Coding",
    color: ["#9B00FF"],
  },
  {
    id: "9",
    title: "WiFi",
    color: ["#FF499E"],
  },
];

export const CATEGORY_OPTIONS = [
  { value: "uncategorized", label: "all categories" },
  { value: "Red Team", label: "Red Team" },
  { value: "Blue Team", label: "Blue Team" },
  { value: "Scripts", label: "Scripts" },
  { value: "Flashing", label: "Flashing" },
  { value: "Wifi", label: "WiFi" },
  { value: "Linux", label: "Linux" },
  { value: "Crypto", label: "Crypto" },
  { value: "Coding", label: "Coding" },
  { value: "ChatGPT", label: "ChatGPT" },
];

export const SORT_OPTIONS = [
  { value: "desc", label: "latest" },
  { value: "asc", label: "oldest" },
];

export const LAB_FS = {
  lab: {
    pwnagotchi: {
      "README.md": `
# Pwnagotchi

Autonomous WiFi auditing companion and experimentation platform.

## What I worked on
- Custom themes (pwnaflipper-theme)
- XP bar positioning & UI tweaks
- Manual internet sharing (security reasons)
- Plugin testing & automation

## Stack
- Raspberry Pi Zero 2 W
- bettercap
- custom plugins (Python)

\`\`\`bash
sudo bettercap -iface wlan0
\`\`\`

Status: **ACTIVE**
`,
      "notes.log": `
[INFO] UI customization experiments
[OK] XP bar repositioned
[WARN] Auto internet sharing disabled (manual only)
[OK] Plugins stable
`,
    },

    pineApple: {
      "README.md": `
# WiFi Pineapple Clone

OpenWRT-based WiFi Pineapple clone for network auditing.

##Hardware
-Shadow GL‑AR300M16‑Ext
-2x RTL RTL5370 antennas
-USB flah disc 16GB

## Focus
- Handshake capture
- PineAP behavior
- OpenWRT filesystem quirks

## Known Issues
- Handshakes saved to \`/\` instead of \`/tmp/handshakes\`
- Installing missing dependencies
- Update python scripts
- Management AP instability

Status: **VIP**
`,
      "capture.log": `
[BUG]     Handshake path mismatch
Expected: /tmp/handshakes/
Actual:   path on USB disc
[DEBUG]   work's fine

[v1.0] Install dependencies
[v1.1] Testing funcionality
[v1.2] Add new modules
[v1.3] Connect with Nethunter

`,
    },

    autodarts: {
      "README.md": `
# Autodarts (DIY)

Low-cost Autodarts hardware build.

## Hardware
- Raspberry Pi 5
- Printed frame & lighting
- Multiple cameras

## Goal
- Replace expensive official hardware
- Fully self-hosted setup

Status: **VIP**
`,
    },

    deauther: {
      "README.md": `
# Deauther

## Hardware
- NodeMCU ESP8266 with a 0.96 OLED display

##Goal
- Flashing with new firmware
- connecting in mobile UI

## Purpose
-Wifi penetration testing 

## Testing
-Wifi deauth flood functions

Status: **ACTIVE**
`,
      "changelog.log": `
[v1.0] Flashed throught ArduinoIDE
[v1.1] Connect to mobile UI
[v1.2] Testing functions
[BUG] Solving OLED bug
`,
    },
    m5stack: {
      "README.md": `
# M5stickC Plus2

Flashing Bruce v1.8.2

## Features
- add RFID reader
- extend IR functions
- Fake AP 
- Bluetooth spamming
- Connecting to mobile UI

## Purpose
Boosted projects with new functions.

Status: **ACTIVE**
`,
      "changelog.log": `
[v0.1] RFID hardware added
[v0.2] Free skipas achieved
[v0.3] IR Tv functions extend
[v0.4] Noise Tv in pub shutdown
`,
    },
  },
};


export const STATUS = {
  ACTIVE: {
    label: "ACTIVE",
    color: "text-green-400",
    glow: "shadow-green-500/40",
  },
  VIP: {
    label: "VIP",
    color: "text-yellow-400",
    glow: "shadow-yellow-500/40",
  },
  ARCHIVED: {
    label: "ARCHIVED",
    color: "text-gray-400",
    glow: "shadow-gray-500/30",
  },
};

export const PROJECT_STATUS = {
  m5stack: "ARCHIVED",
  autodarts: "VIP",
  pwnagotchi: "ACTIVE",
  "old-exploits": "ARCHIVED",
};
