import { useSearchParams, useNavigate, createSearchParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { useState } from "react";

const USER_QUERY = gql`
    query GetUser($id: ID!) {
        getUserById(id: $id) {
            models(pageNum: 1, pageSize: 100) {
                id 
                name
                type
                createdTime
            }
        }
    }
`;



export const ModelSelection = () => {
    const navigate = useNavigate()
    const [searchparams] = useSearchParams()
    console.log(searchparams.get('userId'))
    const userId = searchparams.get('userId')
    const [selectedBase, setSelectedBase] = useState('')

    
    const {loading, error, data} = useQuery(USER_QUERY, {
        variables:{
            id: userId
        }
    })

    if (loading) return <p> Loading... </p>
    if (error) return <p> Error: {error.message} </p>


    function openUpdate(modelId) {
        navigate({
            pathname: "/UpdateModelFlow",
            search: createSearchParams({
                modelId: modelId,
                userId: userId
            }).toString()
        })
    }

    function openGenerate(model) {
        if (model.type === "image") {
            navigate({
                pathname: "/GenerateImageFlow",
                search: createSearchParams({
                    modelId: model.id,
                    userId: userId,
                    modelType: model.type
                }).toString()
            })
        } 
        else if (model.type === "text") {
            navigate({
                pathname: "/GenerateTextFlow",
                search: createSearchParams({
                    modelId: model.id,
                    userId: userId,
                    modelType: model.type
                }).toString()
            })
        }
        }

        function openMethod(selectedBase) {
            navigate({
                pathname: "/GetTrainingMethod",
                search: createSearchParams({
                    userId: userId,
                    selectedBaseId: selectedBase
                }).toString()
            })
        }
        

    return (
        <section>
            <h1 className="title"> Model Selection Page: User Id {userId} </h1>
            <div>
                <h2 className="sub-title"> Displaying All Models: </h2>
                <ul className="all-models">
                    {data.getUserById.models.map(model => (
                        <ul className="model-info">
                            <li> Model id: {model.id}</li>
                            <li> Model Type: {model.type}</li>
                            <li> Created Time: {model.createdTime}</li>
                            <div className="center-button">
                                <button onClick={() => {
                                    data.getUserById.models.filter((e) => e.id !== model.id)
                                }}>
                                    Delete
                                </button>
                                <button onClick={()=>openUpdate(model)}>
                                    Update
                                </button>
                                <button onClick={()=>openGenerate(model)}>
                                    Select
                                </button>
                            </div>
                        </ul>   
                    ))}
                </ul>
            </div>
            <br/>
            <div className="center-button">
                <div>
                    <label>  
                        Pick a Base Model:
                        <select
                            value={selectedBase}
                            onChange={(e) => setSelectedBase(e.target.value)}
                        >
                            <option value="model-base-gpt3-0607"> Basic GPT 3.5 </option>
                            <option value="model-base-stable-paw-0605"> runwayml/stable-diffusion-v1-5 </option>
                            <option value="model-base-stable-paw-2-0625"> stabilityai/stable-diffusion-2-1 </option>
                            <option value="model-majicmixRealistic-v6"> Realistic Human: majicmixRealistic v6 </option>
                        </select>
                    </label>
                </div>
                <button onClick={() => openMethod(selectedBase)}> Select a base model to start </button>
                
            </div>
        </section>
    )
}


export default ModelSelection;