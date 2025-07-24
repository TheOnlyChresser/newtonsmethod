"use client"

import {useEffect, useState} from "react";

export default function Index() {
    const [result, setResult] = useState<number | null>(null);

    useEffect(() => {
        const storedResult = JSON.parse(localStorage.getItem("newtonResult") || "null");
        setResult(storedResult);
    }, []);
    return (
        <>
        <main className="bg-blue-50 w-full min-h-[85vh] flex justify-center items-center">
            <div className="mx-5 mb-20 flex flex-col p-10 bg-white/25 backdrop-blur-3xl shadow-md w-150 border-1 border-black rounded-3xl">
                <h1 className="text-4xl font-semibold text-black/85 text-center">
                    Nulpunktet ligger ved
                </h1>
                <h2 className="text-3xl mt-5 text-black/85 text-center">{result}</h2>
                <a href="/" className="mt-10">
                    <button className="border-2 cursor-pointer hover:bg-black/85 border-black/85 hover:border-0 flex justify-center items-center h-10 w-full rounded-3xl font-bold text-black/85 text-2xl hover:text-blue-50">
                        Start forfra
                    </button>
                </a>
            </div>
        </main>
        <footer className="bg-black/30 flex justify-center items-center w-full h-[15vh]">
            <div>
                <h2 className="text-white font-semibold text-xl">Lavet af <a href="https://www.chrestensoelberg.dk/" className="text-blue-200 hover:underline decoration-blue-200">Chresten</a> med kærlighed ❤️</h2>
            </div>
        </footer>
        </>
    );
}
