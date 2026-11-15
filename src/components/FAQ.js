//IMPORT
import Question from './data/faqs.json'
import { useState } from 'react';

function FAQ() {
    //states, data , function or methods
    const [enteredKeywords , setEnteredKeywords ] = useState("");

    // UI rendering
    return(
        <>
         <div style = {{minHeight: '60vh'}}>
            <h1>Frequently Asked Questions </h1>
            {/*Search box*/}
            <div>
                <input type="text" className = 'col-11 m-3' name = "search" placeholder = 'Keywords'
                    onChange = {(e) => {setEnteredKeywords(e.target.value)}}
                ></input>
            </div>
            {/*Loop through all question in Questions and dispaly them here"*/}
            {

                //Filter questions that contain keywords
                  Question.filter(
                    question => question.question.toLowerCase().includes(enteredKeywords.toLowerCase()) ||
                                question.answer.toLowerCase().includes(enteredKeywords.toLowerCase())
                ).map(
                    question => {
                        return(
                            <div key={question.question}>
                                <h4>{question.question}</h4>
                                <p>{question.answer}</p>
                            </div>
                        )
                    }
                )
            }

         </div>
        </>
    );

}

export default FAQ;