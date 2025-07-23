"use client"

import {useEffect} from "react";

export default function Index() {
    useEffect(() => {const result = JSON.parse(localStorage.getItem("newtonResult") || "null");}, []);
    return (
        <>
        <main className="bg-blue-50 w-full min-h-screen flex justify-center items-center">
            <div className="flex flex-col p-10 bg-white/25 backdrop-blur-3xl shadow-md w-150 h-100 border-1 border-black rounded-3xl">
                <h1 className="text-4xl font-semibold text-black/85">
                    Nulpunktet ligger ved
                </h1>
                <h2 className="text-3xl mt-5 text-black/85">{result}</h2>
            </div>
        </main>
        <footer className="bg-black/30 flex justify-center items-center w-full h-28">
            <div>
                <h2 className="text-white font-semibold text-xl">Made by <a href="https://www.chrestensoelberg.dk/" className="text-blue-200 hover:underline decoration-blue-200">Chresten</a> with care ❤️</h2>
            </div>
        </footer>
        </>
    );
}
