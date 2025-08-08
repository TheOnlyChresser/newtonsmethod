"use client"

import {useEffect, useState} from "react";
import Link from "next/link";
import {LineChart} from "@mui/x-charts"
import {MathJax, MathJaxContext} from "better-react-mathjax";
function Makepdf () {
    const [result, setResult] = useState<[number, number[]] | null>(null);
    const [variable, setVariable] = useState<string | null>(null);
    const [xarray, setXarray] = useState<number[] | null>(null);
    const [yarray, setYarray] = useState<number[] | null>(null);
    const [pointarray, setPointarray] = useState<number[] | null>(null);
    const [iterations, setIterations] = useState<number | null>(null);
    const [startvalue, setStartvalue] = useState<number | null>(null);
    const [tolerance, setTolerance] = useState<number | null>(null);
    const [expression, setExpression] = useState<string | null>(null);
    const [calculationtime, setCalculationtime] = useState<number | null>(null);
    const [alternativecalculationtime, setAlternativecalculationtime] = useState<number | null>(null);
    const loading = result !== null && alternativecalculationtime !== null && variable !== null && iterations !== null && startvalue !== null && tolerance !== null && expression !== null && calculationtime !== null && xarray?.length && yarray?.length && pointarray?.length;


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
        const storedAlternativeCalculationtime = JSON.parse(localStorage.getItem("alternativeCalculationtime") || "null");
        setAlternativecalculationtime(storedAlternativeCalculationtime);

    }, []);
    return (
        <>
        {loading ? (
        <div className="mx-2">
            <h1 className="text-center text-4xl">Newtons metode</h1>
            <h2 className="font-thin text-md text-center">Genereret af newtonsmethod.vercel.app</h2>
            <LineChart
                xAxis={[{data: xarray, min: result[0]-1, max: result[0]+1, position: "none", stroke: "none", tickSize: 0, tickLabelStyle: {display: "none"}, hideTooltip: true}]}
                yAxis={[{min: result[0]-1, max: result[0]+1, position: "none", stroke: "none", tickSize: 0, tickLabelStyle: {display: "none"}, hideTooltip: true}]}
                series={[{data: yarray, showMark: false },
                    {data: pointarray, showMark: false }]}
                height={450}
                width={450}
                slotProps={{ tooltip: { trigger: 'none' }}}
                disableLineItemHighlight={true}
                axisHighlight={{x: "none"}}
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            />

        </div>):  (
            <></>
            )}
        </>
    )
}
export default function Index() {
    const [result, setResult] = useState<[number, number[]] | null>(null);
    const [variable, setVariable] = useState<string | null>(null);
    const [xarray, setXarray] = useState<number[] | null>(null);
    const [yarray, setYarray] = useState<number[] | null>(null);
    const [pointarray, setPointarray] = useState<number[] | null>(null);
    const [iterations, setIterations] = useState<number | null>(null);
    const [startvalue, setStartvalue] = useState<number | null>(null);
    const [tolerance, setTolerance] = useState<number | null>(null);
    const [expression, setExpression] = useState<string | null>(null);
    const [calculationtime, setCalculationtime] = useState<number | null>(null);
    const [alternativecalculationtime, setAlternativecalculationtime] = useState<number | null>(null);
    const loading = result && variable && iterations && alternativecalculationtime !==null && startvalue && tolerance && expression && calculationtime && xarray?.length && yarray?.length && pointarray?.length;
    const [highlighted, setHighlighted] = useState<boolean>(false);

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
        const storedAlternativeCalculationtime = JSON.parse(localStorage.getItem("alternativeCalculationtime") || "null");
        setAlternativecalculationtime(storedAlternativeCalculationtime);
    }, []);
    return (
        <MathJaxContext>
            <main className="bg-blue-50 w-full min-h-[100vh] flex flex-col p-10 lg:px-40 lg:justify-center">
            {loading ? (
                <div>
            <MathJax className="text-4xl mb-16 lg:text-[3vw] lg:-mt-[2vh] lg:mb-[4vh] text-center lg:text-start">{`\\(f(${variable}) = ${expression}\\)`}</MathJax>
            <div className="flex lg:justify-center lg:items-center w-full lg:flex-row flex-col">
                <div className="hidden lg:flex w-[50vw]">
                    <div className="w-[36vw] h-[36vw] p-2 border-2 rounded-md bg-blue-100/10 shadow-sm border-white">
                    <LineChart
                        xAxis={[{data: xarray, min: result[0]-1, max: result[0]+1, position: "none", stroke: "none", tickSize: 0, tickLabelStyle: {display: "none"}, hideTooltip: true}]}
                        yAxis={[{min: result[0]-1, max: result[0]+1, position: "none", stroke: "none", tickSize: 0, tickLabelStyle: {display: "none"}, hideTooltip: true}]}
                        series={[{data: yarray, showMark: false },
                            {data: pointarray, showMark: false }]}
                        slotProps={{ tooltip: { trigger: 'none' }}}
                        disableLineItemHighlight={true}
                        axisHighlight={{x: "none"}}
                        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                    />
                    </div>
                </div>
                <div className="flex lg:hidden justify-center items-center mb-16">
                    <LineChart
                        xAxis={[{data: xarray, min: result[0]-1, max: result[0]+1, position: "none", stroke: "none", tickSize: 0, tickLabelStyle: {display: "none"}, hideTooltip: true}]}
                        yAxis={[{min: result[0]-1, max: result[0]+1, position: "none", stroke: "none", tickSize: 0, tickLabelStyle: {display: "none"}, hideTooltip: true}]}
                        series={[{data: yarray, showMark: false },
                            {data: pointarray, showMark: false }]}
                        height={250}
                        width={250}
                        slotProps={{ tooltip: { trigger: 'none' }}}
                        disableLineItemHighlight={true}
                        axisHighlight={{x: "none"}}
                        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                    />
                </div>
                <div className="lg:w-[50vw] lg:ml-[2vw]">
                    <h3 className="italic font-extralight text-black text-sm lg:text-[1vw]">Nulpunkt</h3>
                    <h2 className="text-2xl lg:text-[2vw]">Fundet nulpunkt: {result[0]}</h2>
                    <div className="mt-16 lg:mt-[6vh]">
                        <h3 className="italic font-extralight text-black text-sm lg:text-[1vw]">Yderligere info</h3>
                        <h2 className="text-2xl mb-1 lg:text-[2vw] lg:mb-[0.25vh]">Startværdi: {startvalue}</h2>
                        <h2 className="text-2xl mb-1 lg:text-[2vw] lg:mb-[0.25vh]">Antal iterationer: {iterations}</h2>
                        <h2 className="text-2xl mb-1 lg:text-[2vw] lg:mb-[0.25vh]">Tolerance: {tolerance}</h2>
                        <h3 className="italic font-extralight text-black text-sm mt-6 lg:text-[1vw] lg:mt-[6vh]">IT</h3>
                        <h2 className="text-2xl mb-1 lg:text-[2vw] lg:mb-[0.25vh]">Beregningstid: {calculationtime} ms</h2>
                        {(alternativecalculationtime-calculationtime)>=0 ? (
                        <h2 className="text-2xl mb-1 lg:text-[2vw] lg:mb-[0.25vh]">{alternativecalculationtime-calculationtime} ms hurtigere end andre metoder<span className="mb-3 text-black/50 cursor-pointer hover:text-black" onClick={() => {
                            setHighlighted(true)
                            setTimeout(() => setHighlighted(false), 1000)
                        }}>*</span></h2>
                            ) : (
                                <h2 className="text-2xl mb-1 lg:text-[2vw] lg:mb-[0.25vh]">{calculationtime-alternativecalculationtime} ms langsommere end andre metoder<span className="mb-3 text-black/50 cursor-pointer hover:text-black" onClick={() => {
                                    setHighlighted(true)
                                    setTimeout(() => setHighlighted(false), 500)
                                }}>*</span></h2>
                            )}
                    </div>
                    <div className="w-full flex items-center mt-16 lg:mt-[6vh]">
                        <Link href="/" className="text-black/50 hover:text-black mr-10 lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="currentColor"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/></svg>
                        </Link>
                        <Link href="/" className="text-black/50 hover:text-black mr-[4vh] hidden lg:block">
                            <svg xmlns="http://www.w3.org/2000/svg" height="3vw" viewBox="0 -960 960 960" width="3vw" fill="currentColor"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/></svg>
                        </Link>
                        <button className="border-2 border-black rounded-2xl text-3xl p-2 hover:bg-black hover:text-white lg:border-[0.15vw] lg:text-[2.4vw] lg:p-[0.75vw]" onClick={Makepdf}>Download rapport</button>
                    </div>

                </div>
            </div>
                    <div className={ highlighted ? ("highlighted mt-8 font-bold"): ("mt-8")}>
                        <p><span className="mb-3 ml-2 font-thin">*</span>Baseret på sammenligning med bisektionsmetoden.</p>
                    </div>
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
        </MathJaxContext>
    );
}
