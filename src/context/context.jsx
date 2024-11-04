import { createContext, useState } from "react";
import run from "../config/Bourbon";

export const Context = createContext();

export const ContextProvider = (props) => {

    const [input,setInput] = useState("");                  /*to save the input data*/
    const [recentPrompt, setRecentPrompt] = useState("");   /*when we click on the send button the input data will be saved here*/
    const [prevPrompts, setPrevPrompts] = useState([]);       /*an array to store in the recent data*/
    const [showResult, setShowResult] = useState(false);    /*it will hide the boxes in main page and display the results of the prompt*/
    const [loading, setLoading] = useState(false);          /*it will display a loading animation*/
    const [resultData, setResultData] = useState("");       /*display the results on the web page*/

    const delayParameter = (index,nextWord) => {
        setTimeout(function (){
            setResultData(prev =>  prev + nextWord);

        },75*index)
    }

    const newChat = () => {
        setLoading(false)
        setShowResult(false)
    }

    const onSent = async(prompt) => {

        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response;
        if(prompt !== undefined){
            response = await run(prompt);
        }
        else{
            setPrevPrompts(prev=>[...prev,input])
            setRecentPrompt(input)
            response = await run(input)
        }
       
        let responseArray = response.trim().split("**"); ////the responseArray is trimmed and then split like ["response","response","response"] from ["response **response** response"]
        let newResponse ="";
        for(let i = 0 ;  i < responseArray.length ; i++){
                if (i % 2 === 0){     //the even indices will be stored in newResponse


                    newResponse += responseArray[i];
                }
                else{
                    newResponse += "<b>"+ responseArray[i] + "</b>";    //the odd indices will be stored in newResponse with <b> tag

                }
        }  
        let newResponse2 = newResponse.split("*").join("</br>")     //break the  string at every * and join with <br> tag
        let newResponseArray = newResponse2.split(" ");

        for(let i = 0; i < newResponseArray.length; i++){
            const nextWord = newResponseArray[i];
            delayParameter(i,nextWord+" ");
        }

        setLoading(false)
        setInput("")
    }


    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,
    }

    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}
