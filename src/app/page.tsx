"use client"
import { MathJax, MathJaxContext } from "better-react-mathjax";
import {useEffect, useState} from "react";
import {derivative, evaluate} from "mathjs";
import dynamic from "next/dynamic";
import {useRouter} from "next/navigation";
import {gsap} from "gsap/all"
import {useGSAP} from "@gsap/react";
// TODO: regex pattern til at lave latex om til plain text.
// TODO: adde animationer
// TODO: juster startværdi hvis f'(startværdi)=0
const EditableMathField = dynamic(
    () =>
        import("react-mathquill").then((mod) => {
            return mod.EditableMathField;
        }),
    { ssr: false }
);

function calculate(expression : string, variable: string, x: number): number {
    return evaluate(expression, {[variable]: x})
}
function differentiate(expression:string, variable: string) : string {
    return derivative(expression, variable).toString();
}

function newtonsmethod(expression: string, variable: string, startvalue: number = 100, iterations: number = 1000, tolerance: number = 0.000000000001): [number, number[], number] {
    const start = Date.now();
    let x = startvalue
    const xarray: number[] = [];
    const derivativeexpression = differentiate(expression, variable)
    for (let i = 0; i < iterations; i++) {
        xarray.push(x);
        const notderivative = calculate(expression, variable, x)
        const derivative = calculate(derivativeexpression, variable, x)
        if (Math.abs(notderivative) < tolerance) {
            break
        }
        x = x - notderivative/derivative
    }
    const end = Date.now();
    if(parseFloat(x.toFixed(3)) === Math.round(x)) {
        return [Math.round(x), xarray, end-start];
    }
    else return [parseFloat(x.toFixed(3)), xarray, end-start];
}

function functionarray(result: [number, number[]], expression: string | null, variable: string | null) {
    const xarray = [];
    const yarray = [];
    const pointarray = [];
    if (typeof expression === "string" && typeof variable === "string" ) {
        for (let i = result[0]-1; i < result[0]+1; i+=0.1) {
            xarray.push(i)
            if(parseFloat(evaluate(expression, {[variable]: i}).toFixed(3)) === Math.round(evaluate(expression, {[variable]: i}))) {
                yarray.push(Math.round(evaluate(expression, {[variable]: i})))
            }
            else yarray.push(parseFloat(evaluate(expression, {[variable]: i}).toFixed(3)));
        }
        for (let i = result[0]-0.9; i < result[0]; i+=0.1) {
            pointarray.push(null)
        }
        pointarray.push(0)
    }
    return (
        [xarray, yarray, pointarray]
    )
}

function bisectionmethod(expression: string, variable: string, startValue: number = 100, tolerance: number = 0.000000000001) {
    const start: number = Date.now();
    let startInterval: number = startValue
    let endInterval: number = startValue
    let x: number = startValue
    while (calculate(expression, variable, startInterval) > 0) {
        startInterval = startInterval - 1
    }
    while (calculate(expression, variable, endInterval) < 0) {
        endInterval = endInterval + 1
    }
    while (calculate(expression, variable, x) < tolerance) {
        x = (startInterval+endInterval)/2
    }
    const calculationTime: number = Date.now()-start
    return calculationTime
}

export default function Index() {
    const [latex, setLatex] = useState('')
    const [x, setX] = useState('x')
    const [focus, setFocus] = useState(false)
    const [step, setStep] = useState(0)
    const [iterations, setIterations] = useState<string>("")
    const [tolerance, setTolerance] = useState<string>("")
    const [startvalue, setStartvalue] = useState<string>("")
    const router = useRouter()
    function updateStep(step: number) {
        setStep(Math.min(Math.max(step, 0), 3))
    }
    useGSAP(
        () => {
            gsap.utils.toArray<HTMLElement>("h1").forEach(h1 => {
                gsap.from(h1, {
                    duration: 0.8,
                    x: -25,
                    opacity: 0,
                    ease: "power2.out",
                });
            });
            gsap.utils.toArray<HTMLElement>("input").forEach(input => {
                gsap.from(input, {
                    duration: 0.8,
                    opacity: 0,
                    ease: "power2.out",
                });
            });
        }, {dependencies: [step]});

    useEffect(() => {
        const keyDownHandler = (event: { key: string; preventDefault: () => void; }) => {

            if (event.key === 'Enter') {
                event.preventDefault();
                updateStep(step+1)
            }
        };

        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    })
    return (
        <MathJaxContext>
            <main className="bg-blue-50 w-full min-h-[100vh] flex justify-center items-center">
                <div className="mx-5 mb-12 flex flex-col justify-between p-10 bg-white/25 backdrop-blur-3xl shadow-md w-[100vw] md:w-[80vw] lg:w-[50vw] h-[60vh] border-1 border-black rounded-3xl">
                    {step===0 && (
                        <>
                    <h1 className="text-4xl font-semibold text-black/85">
                        Hvilken funktion ville du finde nulpunktet for?
                    </h1>
                    <div className="flex flex-row mb-5 ml-10">
                        <MathJax className="text-2xl">{"\\(f(\\)"}</MathJax><div className="text-2xl inline -ml-[4px] -mr-[4px]"><EditableMathField
                            latex={x}
                            onChange={(mathField) => {
                                setX(mathField.latex())
                            }}
                        /></div><MathJax className="text-2xl">{"\\() =\\)"}</MathJax><div className="relative text-2xl ml-2 mb-5 inline-block w-72">
                        {(!focus && latex.trim() === "") && (
                            <div className="tracking-[0.1em] absolute top-1/2 transform -translate-y-1/2 text-black/75 pointer-events-none select-none">
                                ...
                            </div>
                        )}
                        <EditableMathField
                            latex={latex}
                            onChange={(mathField) => {
                                setLatex(mathField.latex())
                            }}
                            onFocus={() => setFocus(true)}
                            onBlur={() => setFocus(false)}
                        />
                    </div>
                    </div>
                            <div className="w-full flex justify-end">
                                <button className="cursor-pointer text-black hover:text-red-500 flex items-center"   onClick={() => {
                                    setStep(step+1)
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg>
                                </button>
                            </div>
                        </>)}
                    {step===1 && (
                        <>
                            <h1 className="text-4xl font-semibold text-black/85">
                                Hvad skal startværdien være?
                            </h1>
                            <div className="flex flex-row mb-5 ml-10">
                                <div className="relative text-2xl ml-2 mb-5 inline-block w-72">
                                <input
                                    placeholder="100"
                                    value={startvalue}
                                    className="focus:outline-0 text-3xl font-[350]"
                                    onChange={(e) => {
                                        setStartvalue(e.target.value)
                                    }}
                                />
                            </div>
                            </div>
                            <div className="w-full flex justify-between">
                                <button className="cursor-pointer text-black hover:text-red-500 flex items-center"   onClick={() => {
                                    setStep(step-1)
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#1f1f1f"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/></svg>
                                </button>
                            <button className="cursor-pointer text-black hover:text-red-500 flex items-center"   onClick={() => {
                                setStep(step+1)
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg>
                            </button>
                            </div>
                        </>)}
                    {step===2 && (
                        <>
                            <h1 className="text-4xl font-semibold text-black/85">
                                Hvor mange iterationer skal der være?
                            </h1>
                            <div className="flex flex-row mb-5 ml-10">
                                <div className="relative text-2xl ml-2 mb-5 inline-block w-72">
                                    <input
                                        placeholder="1000"
                                        value={iterations}
                                        className="focus:outline-0 text-3xl font-[350]"
                                        onChange={(e) => {
                                            setIterations(e.target.value)
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="w-full flex justify-between">
                                <button className="cursor-pointer text-black hover:text-red-500 flex items-center"   onClick={() => {
                                    setStep(step-1)
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#1f1f1f"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/></svg>
                                </button>
                                <button className="cursor-pointer text-black hover:text-red-500 flex items-center"   onClick={() => {
                                    setStep(step+1)
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg>
                                </button>
                            </div>
                        </>)}
                    {step===3 && (
                        <>
                            <h1 className="text-4xl font-semibold text-black/85">
                                Hvad skal tolerancen være?
                            </h1>
                            <div className="flex flex-row mb-5 ml-10">
                                <div className="relative text-2xl ml-2 mb-5 inline-block w-72">
                                    <input
                                        placeholder="0.000000000001"
                                        value={tolerance}
                                        className="focus:outline-0 text-3xl font-[350]"
                                        onChange={(e) => {
                                            setTolerance(e.target.value)
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="w-full flex justify-between">
                                <button className="cursor-pointer text-black hover:text-red-500 flex items-center mr-4"   onClick={() => {
                                    setStep(step-1)
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#1f1f1f"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/></svg>
                                </button>
                            <button className="border-2 cursor-pointer hover:bg-black/85 border-black/85 hover:border-0 flex justify-center items-center h-[6vh] w-full rounded-3xl font-bold text-black/85 text-2xl hover:text-blue-50"   onClick={() => {
                                const truestartvalue: number = Number(startvalue) || 100
                                const trueiterations: number = Number(iterations) || 1000
                                const truetolerance: number = Number(tolerance) || 0.000000000001
                                if (Math.abs(calculate(latex, x, newtonsmethod(latex, x, truestartvalue, trueiterations, truetolerance)[0])) < 5) {
                                    const [a, b] = newtonsmethod(latex, x, truestartvalue, trueiterations, truetolerance);
                                    const result: [number, number[]] = [a, b];
                                    localStorage.setItem("newtonResult", JSON.stringify(result));
                                    localStorage.setItem("newtonVariable", JSON.stringify(x));
                                    localStorage.setItem("xarray", JSON.stringify(functionarray(result, latex, x)[0]))
                                    localStorage.setItem("yarray", JSON.stringify(functionarray(result, latex, x)[1]))
                                    localStorage.setItem("pointarray", JSON.stringify(functionarray(result, latex, x)[2]))
                                    localStorage.setItem("iterations", JSON.stringify(trueiterations))
                                    localStorage.setItem("startvalue", JSON.stringify(truestartvalue))
                                    localStorage.setItem("tolerance", JSON.stringify(truetolerance))
                                    localStorage.setItem("expression", JSON.stringify(latex))
                                    localStorage.setItem("calculationtime", JSON.stringify(newtonsmethod(latex, x, truestartvalue, trueiterations, truetolerance)[2]))
                                    localStorage.setItem("alternativeCalculationtime", JSON.stringify(bisectionmethod(latex, x, truestartvalue, truetolerance)))
                                    router.push("/resultater")
                                } else {
                                    alert("Ugyldige parametre.")
                                    setStep(0)
                                    console.log(Math.abs(calculate(latex, x, newtonsmethod(latex, x, truestartvalue, trueiterations, truetolerance)[0])))
                                }
                            }}>
                                Udregn
                            </button>
                            </div>
                        </>)}
                </div>
            </main>
            <footer className="bg-black/30 flex justify-center items-center w-full h-[15vh]">
                <div>
                    <h2 className="text-white font-semibold text-xl">Lavet af <a href="https://www.chrestensoelberg.dk/" className="text-blue-200 hover:underline decoration-blue-200">Chresten</a> med kærlighed ❤️</h2>
                </div>
            </footer>
        </MathJaxContext>
    );
}
