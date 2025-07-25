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
        console.log(pointarray);
    }, []);
    return (
        <>
        <main className="bg-blue-50 w-full min-h-[100vh] flex justify-center items-center">
            <div className="mx-5 flex flex-col p-10 bg-white/25 backdrop-blur-3xl shadow-md w-150 border-1 border-black rounded-3xl">
                <h1 className="text-4xl font-semibold text-black/85 text-center">
                    Nulpunktet ligger ved
                </h1>
                {loading ? (
                    <>
                    <h2 className="text-3xl mt-1 mb-4 text-black/85 text-center">{result[0]}</h2>
                        <LineChart
                            xAxis={[{label: variable, data: xarray}]}
                            yAxis={[{label: "y"}]}
                            series={[{label: "Funktion", data: yarray, showMark: false },
                                {label: "Nulpunkt", data: pointarray }]}
                            height={300}
                            grid={{ vertical: true, horizontal: true }}
                        />
                    </>
                ): (
                    <h2 className="mt-5 2xl font-semibold text-center">Indlæser data...</h2>
                )}
                <Link href="/" className="mt-10">
                    <button className="border-2 cursor-pointer hover:bg-black/85 border-black/85 hover:border-0 flex justify-center items-center h-10 w-full rounded-3xl font-bold text-black/85 text-2xl hover:text-blue-50">
                        Start forfra
                    </button>
                </Link>
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
