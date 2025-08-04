"use client"

import {useEffect, useState} from "react";
import Link from "next/link";
import {LineChart} from "@mui/x-charts"
import {MathJax, MathJaxContext} from "better-react-mathjax";
function makepdf () {
    alert("Under udvikling.")
}
export default function Index() {
    const [result, setResult] = useState<[number, number[]] | null>(null);
    const [variable, setVariable] = useState<string | null>(null);
    const [xarray, setXarray] = useState<number[] | null>(null);
    const [yarray, setYarray] = useState<number[] | null>(null);
    const [pointarray, setPointarray] = useState<number[] | null>(null);
    const loading = result && variable && xarray?.length && yarray?.length && pointarray?.length;
    const [iterations, setIterations] = useState<number | null>(null);
    const [startvalue, setStartvalue] = useState<number | null>(null);
    const [tolerance, setTolerance] = useState<number | null>(null);
    const [expression, setExpression] = useState<string | null>(null);
    const [calculationtime, setCalculationtime] = useState<number | null>(null);


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
        const storedIterations = JSON.parse(localStorage.getItem("iterations") || "null");
        setIterations(storedIterations);
        const storedStartvalue = JSON.parse(localStorage.getItem("startvalue") || "null");
        setStartvalue(storedStartvalue);
        const storedTolerance = JSON.parse(localStorage.getItem("tolerance") || "null");
        setTolerance(storedTolerance);
        const storedExpression = JSON.parse(localStorage.getItem("expression") || "null");
        setExpression(storedExpression);
        const storedCalculationtime = JSON.parse(localStorage.getItem("calculationtime") || "null");
        setCalculationtime(storedCalculationtime);

    }, []);
    return (
        <MathJaxContext>
            <main className="bg-blue-50 w-full min-h-[100vh] flex flex-col p-10 lg:px-50 lg:justify-center">
            {loading ? (
                <>
            <MathJax className="text-4xl lg:-mt-12 mb-16 lg:mb-10 text-center lg:text-start">{`\\(f(${variable}) = ${expression}\\)`}</MathJax>
            <div className="flex lg:justify-center lg:items-center w-full lg:flex-row flex-col">
                <div className="hidden lg:flex w-[50vw]">
                    <LineChart
                        xAxis={[{data: xarray, min: result[0]-10, max: result[0]+10, position: "none", stroke: "none", tickSize: 0, tickLabelStyle: {display: "none"}, hideTooltip: true}]}
                        yAxis={[{min: result[0]-10, max: result[0]+10, position: "none", stroke: "none", tickSize: 0, tickLabelStyle: {display: "none"}, hideTooltip: true}]}
                        series={[{data: yarray, showMark: false },
                            {data: pointarray, showMark: false }]}
                        height={450}
                        width={450}
                        slotProps={{ tooltip: { trigger: 'none' }}}
                        disableLineItemHighlight={true}
                        axisHighlight={{x: "none"}}
                        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                    />
                </div>
                <div className="lg:w-[50vw]">
                    <h3 className="italic font-extralight text-black text-sm">Nulpunkt</h3>
                    <h2 className="text-2xl">Fundet nulpunkt: {result[0]}</h2>
                    <div className="mt-16">
                        <h3 className="italic font-extralight text-black text-sm">Yderligere info</h3>
                        <h2 className="text-2xl mb-1">Startværdi: {startvalue}</h2>
                        <h2 className="text-2xl mb-1">Antal iterationer: {iterations}</h2>
                        <h2 className="text-2xl mb-1">Tolerance: {tolerance}</h2>
                        <h3 className="italic font-extralight text-black text-sm mt-6">IT</h3>
                        <h2 className="text-2xl mb-1">Beregningstid: {calculationtime} ms</h2>
                    </div>
                    <div className="w-full flex justify-center items-center mt-16 lg:mt-6">
                        <button className="border-2 border-black rounded-2xl text-3xl p-2 hover:bg-black hover:text-white" onClick={makepdf}>Download rapport</button>
                    </div>

                </div>
            </div>
            </>
        ): (
                <h1 className="flex justify-center items-center text-5xl font-semibold text-center">Indlæser data...</h1>
            )}
        </main>
        <footer className="bg-black/30 flex justify-center items-center w-full h-[15vh]">
            <div>
                <h2 className="text-white font-semibold text-xl">Lavet af <a href="https://www.chrestensoelberg.dk/" className="text-blue-200 hover:underline decoration-blue-200">Chresten</a> med kærlighed ❤️</h2>
            </div>
        </footer>
        </MathJaxContext>
    );
}
