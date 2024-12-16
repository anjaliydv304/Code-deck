import React, { useCallback, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { EditorContainer } from './EditorContainer';
import { makeSubmission } from './service';
import "./index.scss"
export const PlaygroundScreen = () => {
  const params=useParams();
  const [input,setInput]=useState('');
  const [output,setOutput]=useState('');
  const {fileId,folderId} = params;
  const[showLoader,setShowLoader]=useState(false)

  const importInput=(e)=>{
    const file=e.target.files[0]
    const fileType = file.type.includes("text")
        if(fileType){
           const fileReader = new FileReader;
           fileReader.readAsText(file);
           fileReader.onload=(e)=>{
            setInput(e.target.result)
           }
        }
        else{
            alert("Please choose a program file")
        }
  }

  const exportOutput=()=>{
    const outputValue=output.trim();
    if(!outputValue){
      alert("Output is Empty")
      return;
    }
    const blob = new Blob([outputValue],{type:"text/plain"})
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a")
    link.href = url;
    link.download=`output.txt`;
    link.click();
  }

  const callback=({apiStatus,data,message})=>{
    if(apiStatus==='loading'){
      setShowLoader(true);
    }
    else if(apiStatus==='error'){
      setShowLoader(false)
      setOutput('Something went wrong')
    }
    else{
      setShowLoader(false)
      if(data.status.id===3){
        setOutput(atob(data.stdout))
      }
      else{
        setOutput(atob(data.stderr))
      }
    }

  }

  const runCode = useCallback(({ code, language }) => {
    makeSubmission({ code, language, stdin: input, callback });
    console.log('Encoded Source Code:', btoa(code)); // For debugging
console.log('Encoded Stdin:', btoa(input)); // For debugging

}, [input]);


  return (
    <div className='playground-container'>
      <div className='header-container'>
        <img src="/logo.png" className='logo'/>
      </div>
      <div className='content-container'>
      <div className='editor-container'>
      <EditorContainer fileId={fileId} folderId={folderId} runCode={runCode}/>
      </div>
        <div className='input-output-container'>
          <div className='input-header'>
            <b>Input:</b>
            <label htmlFor="input" className='icon-container'>
            <span class="material-icons">
            cloud_download
            </span>
            <b className=''>Import Input</b>

            </label>

            <input type="file" id="input" style={{display:'none'}} onChange={importInput}/>
          </div>
          <textarea value={input} onChange={(e)=>setInput(e.target.value)}></textarea>
        </div>
        <div className='input-output-container'>
          <div className='input-header'>
            <b>Output:</b>
            <button className='icon-container' onClick={exportOutput}>
              <span className='material-icons'>cloud_upload</span>
              <b>Export Output</b>
            </button>
          </div>
          <textarea readOnly value={output} onChange={(e)=>setOutput(e.target.value)}></textarea>
        </div>
      
      
      </div>
      {showLoader&&<div className="fullpage-loader">
        <div className="loader">
        </div>
    </div>}
    
      
    </div>
  )
}

export default PlaygroundScreen
