import { useState } from "react";
import axios from "axios";

function SolveQuestions() {
    const [topic, setTopic] = useState("");
    const [subject, setSubject] = useState("");
    const [book, setBook] = useState("");
    const [numQuestions, setNumQuestions] = useState(5);
    const [questions, setQuestions] = useState([]);
    const [isMCQ, setIsMCQ] = useState(false); // ✅ checkbox state

    const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

    const handleFetch = async () => {
        try {
            // ✅ Dynamic prompt
            const prompt = `
Generate ${numQuestions} ${isMCQ ? "multiple-choice" : "descriptive"} questions 
similar to those at the end of the chapter "${topic}" 
from the book "${book}", subject "${subject}".
${isMCQ
                    ? "Each question should have 4 options (A–D) and specify the correct answer at the end."
                    : "Include both conceptual and numerical problems if applicable."}
Number the questions clearly.
`;

            console.log("📌 Prompt sent:", prompt);

            const response = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
                {
                    contents: [{ parts: [{ text: prompt }] }],
                }
            );

            const generated =
                response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No output";

            // Split lines for better readability
            setQuestions(generated.split("\n").filter((line) => line.trim() !== ""));
        } catch (err) {
            console.error("Error:", err);
        }
    };

    return (
        <div>
            <div className="w-[50%] bg-red-400 mx-auto p-5 flex flex-col gap-3">
                <input
                    type="text"
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="p-3 bg-black text-red-800 text-xl w-full"
                />
                <input
                    type="text"
                    placeholder="Book"
                    value={book}
                    onChange={(e) => setBook(e.target.value)}
                    className="p-3 bg-black text-red-800 text-xl w-full"
                />
                <input
                    type="text"
                    placeholder="Topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="p-3 bg-black text-red-800 text-xl w-full"
                />
                <input
                    type="number"
                    placeholder="Number of Questions"
                    value={numQuestions}
                    onChange={(e) => setNumQuestions(e.target.value)}
                    className="p-3 bg-black text-red-800 text-xl w-full"
                />

                {/* ✅ Checkbox for MCQ/Normal */}
                <label className="flex items-center gap-2 text-lg text-black">
                    <input
                        type="checkbox"
                        checked={isMCQ}
                        onChange={() => setIsMCQ(!isMCQ)}
                    />
                    Generate as MCQs
                </label>

                <button
                    onClick={handleFetch}
                    className="bg-black text-red-400 py-2 px-4 text-xl rounded-md"
                >
                    Proceed
                </button>
            </div>

            <div className="w-[50%] mx-auto mt-5 p-5 bg-blue-100 rounded-xl">
                {questions.length > 0 ? (
                    questions.map((q, i) => <p key={i} className="mb-2">{q}</p>)
                ) : (
                    <p>No questions yet</p>
                )}
            </div>
        </div>
    );
}

export default SolveQuestions;
