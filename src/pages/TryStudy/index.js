import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import * as Blockly from 'blockly/core';
import * as libraryBlocks from 'blockly/blocks';
import { javascriptGenerator } from 'blockly/javascript';
import * as En from 'blockly/msg/en';
import { useEffect, useRef, useState } from "react";
import { toolbox } from "../../blockly/toolbox";
import ButtonLearn from "../../components/ButtonLearn";
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

Blockly.setLocale(En);
function TryStudy() {
    const blocklyDiv = useRef(null);
    const workspaceRef = useRef(null);
    const [workspace, setWorkspace] = useState(null);
    const [result, setResult] = useState(null);

    useEffect(() => {
        if (blocklyDiv.current) {
            workspaceRef.current = Blockly.inject(blocklyDiv.current, {
                toolbox: toolbox,
            });
            setWorkspace(workspaceRef.current);
        }

        return () => {
            if (workspaceRef.current) {
                workspaceRef.current.dispose();
            }
        };
    }, []);

    const runCode = () => {
        if (workspace) {
            const code = javascriptGenerator.workspaceToCode(workspaceRef.current);

            try {
                const evalResult = eval(code);
                setResult(evalResult);
            } catch (error) {
                console.error('Error executing Blockly generated code:', error);
                setResult('Error executing Blockly generated code');
            }
        }

        if(result){
            notify();
            setResult(null);
        }

    };

    const test = 24;
    const notify = () => {
        if (result === test) {
            toast.success("Congratulations on the correct answer!",{
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
                })
        }else{
            toast.error("Opps, the answer is wrong!",{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
                })
        }
    }

    return (
        <div>
            <Header />
            <Navbar />
            <div className={"bg-navbar min-h-screen translate-x-0 translate-y-0"}>
                <div ref={blocklyDiv} className={"absolute border-2 w-screen h-screen "}></div>
                <div className="absolute left-64 font-bold text-xl p-3"><span>Topic: </span>Create an addition or subtraction operation that results in 24 </div>
                <div className="absolute right-0">
                    <ButtonLearn onclick={runCode} />
                    <ToastContainer/>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default TryStudy;