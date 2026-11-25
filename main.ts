// The Best Advice I Ever Got — entry program.
//
// Writes one sentence (at most 200 characters) about the best advice
// the writer ever received to /output/entry.txt.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The sentence, kept as short labelled fragments so every line stays
// short and the entry reads as authored code, not one long string.
const opener = "My mother said, ";
const quotedAdvice = "'If everyone is the problem, look in the mirror,'";
const reflection = " and it stung for years before it finally saved me.";

const entry = opener + quotedAdvice + reflection;

// Gate: the entry must be a single sentence of 1 to 200 characters,
// and it must not be only white space.
function validate(text: string): void {
  if (text.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (text.length < 1 || text.length > 200) {
    throw new Error(`entry is ${text.length} characters, must be 1-200`);
  }
  if (text.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  // One sentence: exactly one terminal full stop, at the end.
  const terminators = (text.match(/[.!?]/g) ?? []).length;
  if (terminators !== 1 || !text.endsWith(".")) {
    throw new Error("entry must be exactly one sentence ending with '.'");
  }
}

validate(entry);

const outPath = "/output/entry.txt";
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, entry, "utf8");
