import { useEffect, useRef, useState } from "react";

const COMMANDS = {
  help: () => `Welcome to KrejzyOS terminal

Try commands like:
  whoami        identify user
  neofetch      system info
  skills --all  show full skillset
  tree          explore structure
  help --all    list all commands
`,

  "help --all": () => `Available commands:

whoami
id
uname -a
uptime
pwd
ls
tree
cat skills/frontend.txt
cat skills/backend.txt
cat skills/security.txt
skills --all
stack
nmap localhost
sudo rm -rf /
exploit
neofetch
fallout
coffee
clear
reset
exit
`,

  whoami: () => "ales krejzl",
  id: () => "uid=1000(krejzy) gid=1000(dev) groups=dev,security,linux",
  "uname -a": () => "KrejzyOS 6.1.0-sec #1 SMP x86_64 GNU/Linux",
  uptime: () => "up 37 years, load average: coffee, code, exploits",
  pwd: () => "/home/krejzy/about",
  ls: () => "about.txt  skills/  projects/",
  tree: () => `.
├── about.txt
├── skills/
│   ├── frontend.txt
│   ├── backend.txt
│   └── security.txt
└── projects/`,

  "cat skills/frontend.txt": () => "React\nTailwind\nShadCn\nUI/UX",
  "cat skills/backend.txt": () => "Node.js\nExpress\nMongoDB",
  "cat skills/security.txt": () => "Kali Linux\nBurp\nWireshark",

  "skills --all": () => `Frontend: React, Tailwind, ShadCN, GSAP
Backend: Node.js, Express, MongoDB
Security: Kali Linux, NetHunter, Burp Suite, Wireshark
Tools: Git, Linux, Docker`,

  stack: () => "MERN • Linux • Terminal UI",
  "nmap localhost": () => `PORT     STATE SERVICE
22/tcp   open  ssh
80/tcp   open  http
443/tcp  open  https`,

  "sudo rm -rf /": () => "Permission denied: nice try 😏",
  exploit: () => "No exploits found… yet.",

  neofetch: () => `      /\\_/\\
     ( o.o )  KrejzyOS
      > ^ <   React | Security | Linux`,

  fallout: () => "War. War never changes.",
  coffee: () => "☕ Brewing coffee... Productivity +10%",
};

export default function AboutTerminal() {
  const [lines, setLines] = useState([
    "Booting KrejzyOS...",
    "Loading modules...",
    "System ready. Type 'help' to begin.",
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef(null);

  const runCommand = (cmd) => {
    if (cmd === "clear") {
      setLines([]);
      return;
    }

    if (cmd === "reset") {
      setLines([
        "Rebooting KrejzyOS...",
        "System ready. Type 'help' to begin.",
      ]);
      return;
    }

    if (cmd === "exit") {
      window.location.href = "/";
      return;
    }

    const output = COMMANDS[cmd]
      ? COMMANDS[cmd]()
      : `command not found: ${cmd}`;

    setLines((prev) => [...prev, `$ ${cmd}`, output]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      runCommand(input.trim());
      setInput("");
    }
  };

  return (
    <div className="bg-black text-green-400 font-mono p-4 rounded-lg shadow-lg h-[500px] overflow-y-auto">
      {lines.map((line, i) => (
        <pre key={i}>{line}</pre>
      ))}
      <div className="flex">
        <span className="mr-2">$</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent outline-none flex-1 text-green-400"
          autoFocus
        />
      </div>
      <div ref={endRef} />
    </div>
  );
}
