import { useState } from "react";

export default function SettingsPage() {
    const [gptKey, setGptKey] = useState("");
    const [message, setMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGptKey(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/gpt-key", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ key: gptKey }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage(data.message || "GPT key updated successfully!");
            } else {
                setMessage(data.error || "Error updating GPT key.");
            }
        } catch (error) {
            console.error("Error updating GPT key:", error);
            setMessage("Error updating GPT key.");
        }
    };

    return (
        <div className="p-4 border rounded shadow mb-6">
            <h2 className="text-xl font-bold mb-4">Update GPT Key</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="gptKey" className="block mb-2">
                        Enter your GPT Key:
                    </label>
                    <input
                        id="gptKey"
                        type="text"
                        value={gptKey}
                        onChange={handleChange}
                        placeholder="Your GPT key"
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                    Save Key
                </button>
            </form>
            {message && <p className="mt-2">{message}</p>}
        </div>
    );
}
