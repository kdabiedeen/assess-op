"use client";
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
                body: JSON.stringify({key: gptKey}),
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
        <div className="min-h-screen flex items-center justify-center bg-blue-50">
            <div className="max-w-md w-full p-6 bg-white rounded shadow">
                <h2 className="text-2xl font-bold mb-4 text-blue-700 text-center">
                    Update GPT Key
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="gptKey" className="block mb-2 text-blue-700">
                            Enter your GPT Key:
                        </label>
                        <input
                            id="gptKey"
                            type="text"
                            value={gptKey}
                            onChange={handleChange}
                            placeholder="Your GPT key"
                            className="w-full px-3 py-2 border border-blue-300 rounded focus:outline-none focus:ring focus:ring-blue-200 placeholder-gray-500 text-black"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
                    >
                        Save Key
                    </button>
                </form>
                {message && <p className="mt-4 text-center text-green-600">{message}</p>}
                <div className="mt-6 text-center">
                    <a href="/">
                        <p className="text-blue-700 underline">Go to Home</p>
                    </a>
                </div>
            </div>
        </div>
    );
}
