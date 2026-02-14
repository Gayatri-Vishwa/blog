import { useEffect, useState } from "react";

export default function DarkMode() {
const [dark, setDark] = useState(
localStorage.getItem("theme") === "dark"
);

useEffect(() => {
if (dark) {
document.documentElement.classList.add("dark");
localStorage.setItem("theme", "dark");
} else {
document.documentElement.classList.remove("dark");
localStorage.setItem("theme", "light");
}
}, [dark]);

return (
<button
onClick={() => setDark(!dark)}
className="px-4 py-2 rounded-lg bg-gray-800 text-white dark:bg-yellow-400 dark:text-black"
>
{dark ? "☀️ Light" : "🌙 Dark"} </button>
);
}
