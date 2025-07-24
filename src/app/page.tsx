"use client"
import { MathJax, MathJaxContext } from "better-react-mathjax";
import {useState} from "react";
import {derivative, evaluate} from "mathjs";
import dynamic from "next/dynamic";

const EditableMathField = dynamic(
    () =>
        import("react-mathquill").then((mod) => {
            mod.addStyles();
            return mod.EditableMathField;
        }),
    { ssr: false }
);

function calculate(expression : string, x: number): number {
    return evaluate(expression, {x})
}
function differentiate(expression:string) : string {
    return derivative(expression, "x").toString();
}

function newtonsmethod(expression: string): string {
    let x = 100
    const derivativeexpression = differentiate(expression)
    for (let i = 0; i < 1000; i++) {
        const notderivative = calculate(expression, x)
        const derivative = calculate(derivativeexpression, x)
        if (Math.abs(notderivative) < 0.000000000001) {
            break
        }
        x = x - notderivative/derivative
    }
    return x.toFixed(3)
}

export default function Index() {
    const [latex, setLatex] = useState('')
    return (
        <MathJaxContext>
            <main className="bg-blue-50 w-full min-h-[85vh] flex justify-center items-center">
                <div className="mx-5 mb-12 flex flex-col justify-between p-10 bg-white/25 backdrop-blur-3xl shadow-md w-150 h-100 border-1 border-black rounded-3xl">
                    <h1 className="text-4xl font-semibold text-black/85">
                        Hvilken funktion ville du finde nulpunktet for?
                    </h1>
                    <div className="flex flex-row mb-5">
                        <MathJax className="text-2xl">{"\\(f(x) =\\)"}<div className="ml-2 mb-5 inline"><EditableMathField
                            latex={latex}
                            onChange={(mathField) => {
                                setLatex(mathField.latex())
                            }}
                        /></div></MathJax>
                    </div>
                    <a href="/resultater">
                        <button className="border-2 hover:bg-black/85 border-black/85 hover:border-0 flex justify-center items-center h-10 w-full rounded-3xl font-bold text-black/85 text-2xl hover:text-blue-50"   onClick={() => {
                            const result = newtonsmethod(latex);
                            localStorage.setItem("newtonResult", JSON.stringify(result));
                        }}>
                            Udregn
                        </button>
                    </a>
                </div>
            </main>
            <footer className="bg-black/30 flex justify-center items-center w-full h-[15vh]">
                <div>
                    <h2 className="text-white font-semibold text-xl">Made by <a href="https://www.chrestensoelberg.dk/" className="text-blue-200 hover:underline decoration-blue-200">Chresten</a> with care ❤️</h2>
                </div>
            </footer>
        </MathJaxContext>
    );
}
