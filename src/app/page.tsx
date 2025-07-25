"use client"
import { MathJax, MathJaxContext } from "better-react-mathjax";
import {useState} from "react";
import {derivative, evaluate} from "mathjs";
import dynamic from "next/dynamic";
import {useRouter} from "next/navigation";

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

function newtonsmethod(expression: string, variable: string): [number, number[]] {
    let x = 100
    const xarray: number[] = [];
    const derivativeexpression = differentiate(expression, variable)
    for (let i = 0; i < 1000; i++) {
        xarray.push(x);
        const notderivative = calculate(expression, variable, x)
        const derivative = calculate(derivativeexpression, variable, x)
        if (Math.abs(notderivative) < 0.000000000001) {
            break
        }
        x = x - notderivative/derivative
    }
    if(parseFloat(x.toFixed(3)) === Math.round(x)) {
        return [Math.round(x), xarray];
    }
    else return [parseFloat(x.toFixed(3)), xarray];
}

function functionarray(result: [number, number[]], expression: string | null, variable: string | null) {
    const xarray = [];
    const yarray = [];
    const pointarray = [];
    if (typeof expression === "string" && typeof variable === "string" ) {
        for (let i = result[0]-10; i < result[0]+10; i+=0.1) {
            if(parseFloat((i).toFixed(3)) === Math.round(i)) {
                xarray.push(Math.round(i))
            }
            else xarray.push(parseFloat(i.toFixed(3)));
            if(parseFloat(i.toFixed(3)) === Math.round(i)) {
                yarray.push(Math.round(i))
            }
            else yarray.push(parseFloat(i.toFixed(3)));
        }
        for (let i = result[0]-9.9; i < result[0]; i+=0.1) {
            pointarray.push(null)
        }
        pointarray.push(0)
    }
    return (
        [xarray, yarray, pointarray]
    )
}

export default function Index() {
    const [latex, setLatex] = useState('')
    const [x, setX] = useState('x')
    const [focus, setFocus] = useState(false)
    const router = useRouter()
    return (
        <MathJaxContext>
            <main className="bg-blue-50 w-full min-h-[100vh] flex justify-center items-center">
                <div className="mx-5 mb-12 flex flex-col justify-between p-10 bg-white/25 backdrop-blur-3xl shadow-md w-[100vw] md:w-[80vw] lg:w-[50vw] h-[60vh] border-1 border-black rounded-3xl">
                    <h1 className="text-4xl font-semibold text-black/85">
                        Hvilken funktion ville du finde nulpunktet for?
                    </h1>
                    <div className="flex flex-row mb-5">
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
                        <button className="border-2 cursor-pointer hover:bg-black/85 border-black/85 hover:border-0 flex justify-center items-center h-[6vh] w-full rounded-3xl font-bold text-black/85 text-2xl hover:text-blue-50"   onClick={() => {
                            if (Math.round(calculate(latex, x, newtonsmethod(latex, x)[0])) === 0) {
                                const result = newtonsmethod(latex, x);
                                localStorage.setItem("newtonResult", JSON.stringify(result));
                                localStorage.setItem("newtonVariable", JSON.stringify(x));
                                localStorage.setItem("xarray", JSON.stringify(functionarray(result, latex, x)[0]))
                                localStorage.setItem("yarray", JSON.stringify(functionarray(result, latex, x)[1]))
                                localStorage.setItem("pointarray", JSON.stringify(functionarray(result, latex, x)[2]))
                                router.push("/resultater")
                            } else {
                                alert("Ugyldig funktion.")
                            }
                        }}>
                            Udregn
                        </button>
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
