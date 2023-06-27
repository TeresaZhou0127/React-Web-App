import { useSearchParams, useNavigate, createSearchParams } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";
import { useState } from "react";

const SEND_TEXT_PROMPT = gql`
    mutation CreateContent($userId: ID!, $modelId: ID!, $contentMetadata: ContentMetadataInput) {
        createContent(userId: $userId, modelId: $modelId, contentMetadata: $contentMetadata) {
            id
            task {
                status
            }
            contentOutput {
                text {
                    choices {
                        message {
                            content
                        }
                    }
                }
            }
        }
    }
`;

export const GenerateTextFlow = () => {
    const [searchparams] = useSearchParams()
    const navigate = useNavigate()
    console.log(searchparams.get('modelId'))
    console.log(searchparams.get('userId'))
    console.log(searchparams.get('modelType'))
    const modelId = searchparams.get('modelId')
    const userId = searchparams.get('userId')
    const modelType = searchparams.get('modelType')
    const [prompt, setPrompt] = useState('')

    const [sendTextGenpromt, {data, loading, error}] = useMutation(SEND_TEXT_PROMPT, {
        variables: {
            userId: userId,
            modelId: modelId,
            contentMetadata: {
                text: {
                    prompt: prompt
                }
            }
        }
    })

    if (loading) return <p> Loading... </p>
    if (error) return <p> Error: {error.message} </p>


    const handleSubmit = async(e) => {
        e.preventDefault()
        sendTextGenpromt()
        setPrompt('')
    }

    function openModelSelection() {
        navigate({
            pathname: "/ModelSelection",
            search: createSearchParams({
                userId: userId
            }).toString()
        })
    }

    function openTexts(contentId) {
        navigate({
            pathname: "/GetTexts",
            search: createSearchParams({
                contentId: contentId,
                userId: userId
            }).toString()
        })
    }

    return (
        <section>
            <h1 className="title"> Generate Text Flow Page:  </h1>
            <h2 className="sub-title"> User: {userId} </h2>
            <h3 className="sub-title"> Model {modelId} </h3>
            <h4 className="sub-title"> Model Type: {modelType} </h4>
            <form className="new-model-info" onSubmit={handleSubmit}>
                <div>
                    <label> Generate Prompt: </label>
                    <input 
                    placeholder="generate prompt"
                    type="string"
                    value={prompt}
                    onChange={(e)=>setPrompt(e.target.value)}
                    />
                </div>     
                <button onClick={handleSubmit}> Generate Text </button>
            </form>
            <div> 
                {data && (
                    <ul>
                        <p> contentId: {data.createContent.id} </p>
                        <p> status: {data.createContent.task.status} </p>
                        <h> If the status is 1, meaning that the images are still processing. </h>
                        <h> Please wait for about 1 minute to get the generated pictures. </h>
                    </ul>  
                )}                
            </div>
            <br /> 
            <div className="center-button">
            <button onClick={() => openTexts(data.createContent.id)}> Get Texts </button>
                <button onClick={() => openModelSelection()}>
                    Back to Model Selection Page
                </button>               
            </div>    
        </section>
    )
}

export default GenerateTextFlow;