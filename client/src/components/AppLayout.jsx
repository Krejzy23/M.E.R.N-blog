export default function AppLayout({ children }) {
    return (
      <div
        className="
          min-h-screen
          bg-[#0b0f19]
          text-green-400
          font-mono
          relative
        "
      >
        {children}
      </div>
    );
  }