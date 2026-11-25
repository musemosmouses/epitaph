// epitaph — writes one famous-last-words tombstone epitaph to entry.txt.
//
// The bounty: a single line, at most 150 characters, funny enough to be
// carved in stone. Node 22 stdlib only, no network, fully deterministic:
// the same entry is written on every run.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry itself: a deadpan last request, answered by the stone.
const ENTRY =
  "I asked for the Wi-Fi password. They gave me this stone instead.";

// The bounty cap: the gate rejects anything over 150 characters.
const MAX_CHARS = 150;

function main(): void {
  const text = ENTRY.trim();

  // Gate: the entry must be non-empty and fit the 150-character cap.
  if (text.length === 0 || text.length > MAX_CHARS) {
    console.error(
      `entry must be 1-${MAX_CHARS} characters, got ${text.length}`,
    );
    process.exit(1);
  }

  // Output dir: honour $MAKEFUN_OUTPUT_DIR when set, else /output.
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const outFile = join(outDir, "entry.txt");

  mkdirSync(outDir, { recursive: true });
  // No trailing newline: the file holds exactly the epitaph, one line.
  writeFileSync(outFile, text, "utf8");

  console.log(`wrote ${text.length} characters to ${outFile}`);
}

main();
