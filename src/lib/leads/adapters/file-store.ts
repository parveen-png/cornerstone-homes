import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import type { LeadAdapter, LeadSendResult } from "@/lib/leads/adapter";
import { redactLeadForLogs } from "@/lib/leads/adapter";
import type { CapturedLead } from "@/lib/leads/schema";

async function writeJsonl(lead: CapturedLead) {
  const directory = path.join(process.cwd(), ".data");
  await mkdir(directory, { recursive: true });
  await appendFile(
    path.join(directory, "leads.jsonl"),
    `${JSON.stringify({
      ...lead,
      storedAt: new Date().toISOString(),
    })}\n`,
    "utf8",
  );
}

export const fileStoreAdapter: LeadAdapter = {
  name: "file-store",
  enabled: process.env.LEAD_FILE_STORE !== "false",
  async send(lead: CapturedLead): Promise<LeadSendResult> {
    try {
      await writeJsonl(lead);
      console.info("[lead:file-store]", redactLeadForLogs(lead));
      return { adapter: this.name, ok: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : "File store failed";
      console.error("[lead:file-store:error]", message);
      return { adapter: this.name, ok: false, error: message };
    }
  },
};
