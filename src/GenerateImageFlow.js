import { useSearchParams, useNavigate, createSearchParams } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";
import { useState } from "react";

const SEND_IMAGE_PROMPT = gql`
    mutation CreateContent($userId: ID!, $modelId: ID!, $contentMetadata: ContentMetadataInput) {
        createContent(userId: $userId, modelId: $modelId, contentMetadata: $contentMetadata) {
            id
            task {
                status
            }
            contentOutput {
                image {
                    images {
                        url
                    }
                }
            }
        }
    }
`;

export const GenerateImageFlow = () => {
    const [searchparams] = useSearchParams()
    const navigate = useNavigate()
    console.log(searchparams.get('modelId'))
    console.log(searchparams.get('userId'))
    console.log(searchparams.get('modelType'))
    const modelId = searchparams.get('modelId')
    const userId = searchparams.get('userId')
    const modelType = searchparams.get('modelType')
    const [prompt, setPrompt] = useState('')

    const [sendImageGenpromt, {data, loading, error}] = useMutation(SEND_IMAGE_PROMPT, {
        variables: {
            userId: userId,
            modelId: modelId,
            contentMetadata: {
                image: {
                    prompt: prompt
                }
            }
        }
    })

    if (loading) return <p> Loading... </p>
    if (error) return <p> Error: {error.message} </p>


    const handleSubmit = async(e) => {
        e.preventDefault()
        sendImageGenpromt()
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

    function openImages(contentId) {
        navigate({
            pathname: "/GetImages",
            search: createSearchParams({
                contentId: contentId,
                userId: userId
            }).toString()
        })
    }

    return (
        <section>
            <h1 className="title"> Generate Image Flow Page:  </h1>
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
                <button onClick={handleSubmit}> Generate Image </button>
            </form>
            <div className="new-content"> 
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
            <button onClick={() => openImages(data.createContent.id)}> Get Images </button>
                <button onClick={() => openModelSelection()}>
                    Back to Model Selection Page
                </button>               
            </div>    
        </section>
    )
}

export default GenerateImageFlow;