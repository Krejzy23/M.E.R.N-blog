import { useState } from "react";
import Section from "../components/Section.jsx";
import { HiFolder, HiDocumentText, HiTerminal } from "react-icons/hi";
import { LAB_FS } from "../constants/index.js";
import { PROJECT_STATUS } from "../constants/index.js";
import { StatusBadge } from "../components/design/StatusBadge.jsx";

export default function LabPage() {
  const [path, setPath] = useState(["lab"]);
  const [output, setOutput] = useState("> cd /lab\n");

  const currentDir = path.reduce((acc, p) => acc[p], LAB_FS);

  const handleCd = (dir) => {
    setPath([...path, dir]);
    setOutput(`> cd ${dir}\n`);
  };

  const handleCat = (file) => {
    const content = currentDir[file];
    setOutput((o) => o + `> cat ${file}\n`);

    if (typeof content !== "string") {
      setOutput((o) => o + "[error] file is not readable text\n\n");
      return;
    }

    setOutput((o) => o + content + "\n\n");
  };

  const handleBack = () => {
    if (path.length > 1) {
      setPath(path.slice(0, -1));
      setOutput(`> cd ..\n`);
    }
  };

  return (
    <Section className="pt-[5rem] mt-[2.25rem]" crosses paddings>
      <div className="flex flex-col items-center min-h-screen bg-[#0b0f19] text-cyan-300 font-mono p-6 -mt-10 md:-mt-16 lg:-mt-24">
        <h1 className="flex items-center justify-start mr-auto text-xl md:text-2xl md:px-10 mb-2 gap-2">
          <HiTerminal /> LAB FILE_SYSTEM
        </h1>

        <div className="grid md:grid-cols-2 gap-6 w-full md:p-10">
          {/* filesystem */}
          <div className="border bg-black/80 border-cyan-500/30 rounded-sm p-4">
            <div className="mb-2 text-sm text-cyan-500">/{path.join("/")}</div>

            {path.length > 1 && (
              <button
                onClick={handleBack}
                className="block text-left w-full hover:text-green-400 mb-1"
              >
                ../../
              </button>
            )}

            {Object.keys(currentDir).map((item) => {
              const isDir =
                typeof currentDir[item] === "object" &&
                !Array.isArray(currentDir[item]);

              const status = PROJECT_STATUS[item];

              return (
                <div key={item}>
                  {isDir ? (
                    <button
                      onClick={() => handleCd(item)}
                      className="flex items-center w-full text-left hover:text-green-400"
                    >
                      {/* levá část: ikona + název */}
                      <div className="flex items-center mr-5 gap-2 w-32">
                        {/* w-32 = pevná šířka pro názvy */}
                        <HiFolder />
                        <span className="text-cyan-400">{item}</span>
                      </div>
                      <div></div>
                      {/* badge */}
                      {status && <StatusBadge status={status} />}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleCat(item)}
                      className="flex items-center gap-2 hover:text-purple-400 w-full text-left"
                    >
                      <HiDocumentText /> {item}
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* terminal */}
          <div className="bg-black/40 border border-cyan-500/30 rounded p-4 h-[400px] overflow-auto text-sm">
            <pre className="whitespace-pre-wrap">{output}</pre>
            <span className="animate-pulse">▌</span>
          </div>
        </div>
      </div>
    </Section>
  );
}
