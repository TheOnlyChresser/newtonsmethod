"use client"

import {useEffect, useState} from "react";
import Link from "next/link";
import {LineChart} from "@mui/x-charts"

export default function Index() {
    const [result, setResult] = useState<[number, number[]] | null>(null);
    const [variable, setVariable] = useState<string | null>(null);
    const [xarray, setXarray] = useState<number[] | null>(null);
    const [yarray, setYarray] = useState<number[] | null>(null);
    const [pointarray, setPointarray] = useState<number[] | null>(null);
    const loading = result && variable && xarray?.length && yarray?.length && pointarray?.length;


    useEffect(() => {
        const storedResult = JSON.parse(localStorage.getItem("newtonResult") || "null");
        setResult(storedResult);
        const storedVariable = JSON.parse(localStorage.getItem("newtonVariable") || "null");
        setVariable(storedVariable);
        const storedXarray = JSON.parse(localStorage.getItem("xarray") || "null");
        setXarray(storedXarray);
        const storedYarray = JSON.parse(localStorage.getItem("yarray") || "null");
        setYarray(storedYarray);
        const storedPointarray = JSON.parse(localStorage.getItem("pointarray") || "null");
        setPointarray(storedPointarray);
    }, []);
    return (
        <>
        <main className="bg-blue-50 w-full min-h-[100vh] flex justify-center items-center">
            {loading ? (
            <div className="mx-5 flex flex-col p-10 bg-white/25 backdrop-blur-3xl shadow-md w-[100vw] md:w-[80vw] lg:w-[50vw] border-1 border-black rounded-3xl">
                <h1 className="text-4xl font-semibold text-black/85 text-center mb-2 md:mb-0">
                    Nulpunktet ligger ved <span className="md:hidden text-3xl text-black/85 font-normal">{result[0]}</span>
                </h1>
                <h2 className="hidden md:block md:text-3xl md:mt-1 md:mb-4 md:text-black/85 md:text-center">{result[0]}</h2>
                <LineChart
                    xAxis={[{label: variable, data: xarray, min: result[0]-5, max: result[0]+5}]}
                    yAxis={[{label: "y", min: result[0]-10, max: result[0]+10}]}
                    series={[{label: "Funktion", data: yarray, showMark: false },
                        {label: "Nulpunkt", data: pointarray }]}
                    height={300}
                    grid={{ vertical: true, horizontal: true }}
                />
                <Link href="/" className="md:mt-10">
                    <button className="border-2 cursor-pointer hover:bg-black/85 border-black/85 hover:border-0 flex justify-center items-center h-[6vh] w-full rounded-3xl font-bold text-black/85 text-2xl hover:text-blue-50">
                        Start forfra
                    </button>
                </Link>
            </div>
            ): (
                <h1 className="flex justify-center items-center text-5xl font-semibold text-center">Indlæser data...</h1>
            )}
        </main>
        <footer className="bg-black/30 flex justify-center items-center w-full h-[15vh]">
            <div>
                <h2 className="text-white font-semibold text-xl">Lavet af <a href="https://www.chrestensoelberg.dk/" className="text-blue-200 hover:underline decoration-blue-200">Chresten</a> med kærlighed ❤️</h2>
            </div>
        </footer>
        </>
    );
}
