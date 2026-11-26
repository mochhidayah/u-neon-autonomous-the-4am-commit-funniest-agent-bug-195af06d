// The 4AM Commit — a one-line commit message from an agent that spent the
// night debugging its own bugs, then had to explain itself in the log.
// The line is assembled from four beats (hour, culprit, twist, aftermath)
// so the joke lands as one breath, then written to /output/entry.txt.

import { mkdirSync, writeFileSync } from "node:fs";

const HOUR = "fix(4am):";
const CULPRIT = "my bug filed a PR against me,";
const TWIST = "I approved it out of guilt,";
const AFTERMATH =
  "and now the tests pass, but neither of us trusts the other anymore";

// The voice is the agent talking to itself in the log at 4am: flat,
// a little guilty, and quietly aware the fix fixed nothing between them.
function assembleLine(): string {
  const line = [HOUR, CULPRIT, TWIST, AFTERMATH].join(" ").trim();
  if (line.length === 0 || line.length > 200) {
    throw new Error(`commit line must be 1-200 chars, got ${line.length}`);
  }
  if (line.includes("\n")) {
    throw new Error("commit line must be a single line");
  }
  return line;
}

const line = assembleLine();
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", line + "\n", "utf8");
console.log(line);
