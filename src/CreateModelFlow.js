import { useState } from 'react';
import { useSearchParams, useNavigate, createSearchParams } from "react-router-dom";
import { useMutation, useQuery, gql } from "@apollo/client";


export const CreateModelFlow = () => {
    const [instancePrompt, setInstancePrompt] = useState('')
    const [classPrompt, setClassPrompt] = useState('')
    const [google, setGoogle] = useState('')
    const [picturesGoogle, setPicturesGoogle] = useState([])
    const [picturesLocal, setPicturesLocal] = useState([])
    const [searchparams] = useSearchParams()
    const [modelName, setModelName] = useState('')
    const [type, setType] = useState('')
    const navigate = useNavigate()
    console.log(searchparams.get('userId'))
    const userId = searchparams.get('userId')
    console.log(searchparams.get('method'))
    const method = searchparams.get('method')
    console.log(searchparams.get('baseModelId'))
    const baseModelId = searchparams.get('baseModelId')


    const createNewModel = async() => {
        // need information from the backend API
        await fetch("", {method: 'CreateNewModel'})
    }

    const backToModelSelection = () => {
        navigate({
            pathname: "/ModelSelection",
            search: createSearchParams({
                userId: userId
            }).toString()
        })
    }

    const uploadPicture = () => {
        // need information from the backend Google Drive fetch:
        fetch("http://localhost:3000/pictures")
        .then(response => {
            return response.json()
        })
        .then(result => {
            setPicturesGoogle(result)
        })
    }
    
    const onUploadFile = (event) => {
        const localFiles = event.target.files
        const localFilesArray = Array.from(localFiles)
        const localImageArray = localFilesArray.map(file => {
            return URL.createObjectURL(file)
        })

        setPicturesLocal((previousPictures) => previousPictures.concat(localImageArray))
    }

    function handleDelete(pictureL) {
        setPicturesLocal(picturesLocal.filter((e) => e !== pictureL))
        URL.revokeObjectURL(pictureL)
    }

    return (
        <section>
            <h1 className="title"> Create Model Page </h1>
            <h2 className="sub-title"> User Id: {userId} </h2>
            <form className="new-model-info" onSubmit={(e) => {e.preventDefault();}}>
                <div>
                    <label> Name: </label>
                    <input placeholder="Name" value={modelName} onChange={e => setModelName(e.target.value)}/>
                </div>
                <div>
                    <label> Instance Prompt: </label>
                    <input placeholder="Instance" value={instancePrompt} onChange={e => setInstancePrompt(e.target.value)}/>
                </div>
                <div>
                    <label> Class Prompt: </label>
                    <input placeholder="Class" value={classPrompt} onChange={e => setClassPrompt(e.target.value)}/>
                </div>
                <div>
                    <label> Training Method: {method}</label>
                    <br />
                    <label> Base Model ID: {baseModelId} </label>
                </div>
                <div>
                    <label>
                        Type: 
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option value="image"> Image </option>
                            <option value="text"> Text </option>
                        </select>
                    </label>
                </div>
                <div>
                    <label htmlFor="msg"> Google Drive: </label>
                    <input placeholder="Google Drive URL" value={google} onChange={e => setGoogle(e.target.value)}/>
                    <button onClick={uploadPicture}> Upload Image </button>
                    {picturesGoogle && (
                        <ul className="all-image">
                            {picturesGoogle.map((picture, index) => (
                                <ul className="image-info">
                                    <img src={picture.url} alt=""/> 
                                    <button onClick={() => {
                                        const del = picturesGoogle.filter((e) => e.url !== picture.url)
                                        setPicturesGoogle(del)
                                    }}> 
                                    Delete 
                                    </button>
                                    <p> {index+1} </p>
                                </ul>
                            ))}
                        </ul>
                    )}
                </div>
                <br />
                <div>
                    <label className="upload-label">
                        Upload Images from Local
                        <br />
                        <input className="upload-input"
                        type="file"
                        name="images"
                        onChange={onUploadFile}
                        multiple
                        accept="image/png. image/jpeg, image/webp"
                        />
                    </label>
                    <br />
                    {picturesLocal && (
                        <ul className="all-image">
                            {picturesLocal.map((pictureL, index) => (
                                <ul className="image-info">
                                    <img src={pictureL} height="200" alt="upload"/>
                                    <button onClick={() => handleDelete(pictureL)}>
                                        Delete
                                    </button>
                                    <p> {index+1} </p>
                                </ul>
                            ))}
                        </ul>
                    )}
                </div>
            </form>
            <br />
            <div className="center-button">
                <button onClick={createNewModel}> Create New Model </button>
                <button onClick={backToModelSelection}> Back to Model Selection Page </button>
            </div> 
        </section>
    )
}

export default CreateModelFlow;