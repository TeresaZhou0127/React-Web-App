import React, { useState } from 'react';
import { useSearchParams, useNavigate, createSearchParams } from "react-router-dom";

export const UpdateModelFlow = () => {
    // const [msg, setMessage] = useState('')
    const [imagesGoogle, setImagesGoogle] = useState([])
    const [imagesLocal, setImagesLocal] = useState([])
    const [searchparams] = useSearchParams()
    const navigate = useNavigate()
    console.log(searchparams.get('userId'))
    console.log(searchparams.get('modelId'))
    const userId = searchparams.get('userId')
    const modelId = searchparams.get('modelId')

    const uploadImage = () => {
        fetch("http://localhost:3000/images")
        .then(response => {
            return response.json()
        })
        .then(data => {
            setImagesGoogle(data)
        })
    }

    const updateModel = () => {
        // need information from the backend
        fetch("", {model: 'updateModel'})
    }

    const backToModelSelection = () => {
        navigate({
            pathname: '/ModelSelection',
            search: createSearchParams({
                userId: userId
            }).toString()
        })
    }

    const onUploadImages = (event) => {
        const imagesLocal = event.target.files
        const imagesLocalArray = Array.from(imagesLocal)
        const imagesArray = imagesLocalArray.map(file => {
            return URL.createObjectURL(file)
        })

        setImagesLocal((prev) => prev.concat(imagesArray))
    } 

    function deleteHandler(imageL) {
        setImagesLocal(imagesLocal.filter((e) => e !== imageL))
        URL.revokeObjectURL(imageL)
    }

    return (
        <section>
            <h1 className="title"> Update Model Page: </h1>
            <h2 className="sub-title"> User ID: {userId} </h2>
            <h3 className="sub-title"> Model ID: {modelId} </h3>
            <form className="new-model-info" onSubmit={(e) => {e.preventDefault();}}>
                <div> 
                    <label> Instance Prompt: </label>
                    <input placeholder="instance prompt" />
                </div>
                <div>
                    <label> Class Prompt: </label>
                    <input placeholder="class prompt" />
                </div>
                <div>
                    <h2 className="sub-title"> Upload Additional images: </h2>
                    <label> Google Drive: </label>
                    <input placeholder="google drive url"/>
                    <button onClick={uploadImage}> Upload Image </button>
                    {imagesGoogle && (
                        <ul1 className="all-image">
                            {imagesGoogle.map((image, index)=> (
                                <url2 className="image-info">
                                    <img src={image.url} alt=""/>
                                    <button onClick={() => {
                                        const del = imagesGoogle.filter((e) => e.url !== image.url) 
                                        setImagesGoogle(del)
                                    }}>
                                        Delete 
                                    </button>
                                    <p> {index + 1} </p>
                                </url2>
                            ))}
                        </ul1>
                    )}
                </div>
                <br />
                <label className="upload-label">
                    Add Images from Local:
                    <br/>
                    <input className="upload-input"
                    type="file"
                    name="images"
                    onChange={onUploadImages}
                    multiple
                    accept="image/png. image/jpeg, image/webp"
                    />
                </label>
                {imagesLocal && (
                        <ul1 className="all-image">
                            {imagesLocal.map((imageL, index) => (
                                <ul2 className="image-info">
                                    <img src={imageL} height="200"alt="upload"/>
                                    <button onClick={() => deleteHandler(imageL)}>
                                        Delete
                                    </button>
                                    <p> {index+1} </p>
                                </ul2>
                            ))}
                        </ul1>
                    )}
            </form>
            <br />
            <div className="center-button">
                <button onClick={updateModel}> Update Model </button>
                <button onClick={backToModelSelection}> Back To Model Selection Page </button>
            </div>
        </section>
    )
}

export default UpdateModelFlow;