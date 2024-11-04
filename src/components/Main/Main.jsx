import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/context'

const Main = () => {

  const {onSent,setRecentPrompt,recentPrompt,showResult,loading,resultData,setInput,input,newChat} = useContext(Context)

  // Function to handle "Enter" key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSent(); // Call the onSent function when "Enter" is pressed
    }
  }

  const prompts = [
    { text: "Suggest beautiful places to visit", icon: assets.compass_icon },
    { text: "Briefly describe Harry Potter books", icon: assets.bulb_icon },
    { text: "What is the origin of Bourbon?", icon: assets.message_icon },
    { text: "Play a game of 20 questions", icon: assets.code_icon }
  ];


  return (
    <div className='main'>
        <div className="nav">
          <p onClick={() => newChat()}>Bourbon</p>
          <img src={assets.user_icon} alt="" />
        </div>
        <div className="main-container">

            {!showResult
            ?<>
              <div className="greet">
                <p><span>Hello There!</span></p>
                <p><span>How can I help you</span>?</p>
              </div>
              <div className="cards">

                {prompts.map((prompt,index)=>(     //takes the index from the user and displays it in the prompt after clicking                            
                  <div className="card"  key={index} onClick={() => {
                    onSent(prompt.text);
                    setInput(prompt.text);
                    setRecentPrompt(prompt.text);
                    {recentPrompt};
                  }}>   
                  <p>{prompt.text}</p>

                  <img src={prompt.icon} alt="" />
              </div>
                ))}                                                                         
            </div>
            </>
            : <div className="result">
                  <div className="result-title">
                    <img src={assets.user_icon} alt="" />
                    <p>{recentPrompt}</p>
                  </div>
                  <div className="result-data">
                    <img src={assets.bourbon_icon} alt="" />
                    {loading
                    ? <div className='loader'>
                        <hr />
                        <hr />
                        <hr />
                      </div>
                    :<p dangerouslySetInnerHTML={{__html:resultData}}></p>
                  }
                  </div>
              </div>
            }


          

          <div className="main-bottom">
            <div className="search-box">
              <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder="Enter a prompt here"
                onKeyPress={handleKeyPress}  />         
              <div>                                                   
                <img src={assets.gallery_icon} alt="" />
                <img src={assets.mic_icon} alt="" />
                {input? <img onClick={()=>onSent()} src={assets.send_icon} alt="" /> : null}
              </div>
            </div>
            <p className="bottom-info">
              Bourbon may display inaccurate information, so double check its responses.
            </p>
          </div>
        </div>
    </div>
  )
}

export default Main
