"use client";
import { useState } from "react";
import { useScheduleStore } from "@/store/scheduleStore";

interface NLPResponse {
  event?: string;
  action?: string;
  delay?: number;
  error?: string;
}

export default function NlpProcessor() {
  const { nlpInput, setNlpInput, setSelectedEvent, setSelectedAction, setDelaySeconds } = useScheduleStore();
  const [nlpResponse, setNlpResponse] = useState<NLPResponse | null>(null);
  const [nlpLoading, setNlpLoading] = useState(false);
  const [nlpError, setNlpError] = useState("");

  const processNlpInput = async () => {
    setNlpLoading(true);
    setNlpError("");
    setNlpResponse(null);
    try {
      const res = await fetch("/api/nlp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sentence: nlpInput }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to process sentence");

      setNlpResponse(data);
      // Auto-fill the form with the NLP response
      setSelectedEvent(data.event || "");
      setSelectedAction(data.action || "");
      setDelaySeconds(data.delay ?? 0);
    } catch (err: any) {
      setNlpError(err.message);
    } finally {
      setNlpLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded mb-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Enter automation rule as a sentence.</h3>
      <input
        type="text"
        value={nlpInput}
        onChange={(e) => setNlpInput(e.target.value)}
        placeholder="Enter a command (e.g., 'Send an email after a guest checks in')"
        className="w-full p-2 border border-gray-400 text-black bg-white rounded mb-2"
        onKeyDown={(e) => e.key === "Enter" && processNlpInput()}
      />
      <div className="flex gap-2">
        <button
          onClick={processNlpInput}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          disabled={nlpLoading}
        >
          {nlpLoading ? "Processing..." : "Submit"}
        </button>
        <button
          onClick={() => setNlpInput("")}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
        >
          Clear
        </button>
      </div>
      {nlpError && <p className="text-red-500 mt-2">{nlpError}</p>}
      {nlpResponse && (
        <div className="mt-4 p-3 border border-gray-400 rounded bg-white text-black transition-opacity duration-500 shadow">
          <h3 className="font-bold text-black">NLP Response:</h3>
          <p>
            <strong>Event:</strong> {nlpResponse.event || "N/A"}
          </p>
          <p>
            <strong>Action:</strong> {nlpResponse.action || "N/A"}
          </p>
          <p>
            <strong>Delay:</strong> {nlpResponse.delay ?? "N/A"} seconds
          </p>
        </div>
      )}
    </div>
  );
}
