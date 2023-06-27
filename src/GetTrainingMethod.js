import { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { useSearchParams, useNavigate, createSearchParams } from "react-router-dom";

const TRAINING_METHOD_QUERY = gql`
    query GetModelById($id: ID!) {
        getModelById(id: $id) {
            optionalTrainingMethod
        }
    }
`;

export const GetTrainingMethod = () => {
    const navigate = useNavigate()
    const [searchparams] = useSearchParams()
    console.log(searchparams.get('selectedBaseId'))
    console.log(searchparams.get('userId'))
    const selectedBaseId = searchparams.get('selectedBaseId')
    const userId = searchparams.get('userId')
    const [trainingMethod, setTrainingMethod] = useState('')

    const {loading, error, data} = useQuery(TRAINING_METHOD_QUERY, {
        variables: {
            id: selectedBaseId
        }
    })

    if (loading) return <p> Loading ... </p>
    if (error) return <p> Error: {error.message} </p>

    const directToCreate = () => {
        navigate({
            pathname: "/CreateModelFlow",
            search: createSearchParams({
                userId: userId,
                method: trainingMethod,
                baseModelId: selectedBaseId
            }).toString()
        })
    }

    return (
        <section>
            <h className="title"> Selected Base Model ID: {selectedBaseId} </h>
            <br />
            <div>
                You can pick one training method from as follows: 
                <br />
                {data && (
                    data.getModelById.optionalTrainingMethod
                )}
                <br />
                <label> Training Method: </label> 
                <input placeholder="Training Method" value={trainingMethod} onChange={e => setTrainingMethod(e.target.value)} />
            </div>
            <button onClick={directToCreate}> New Model </button>
        </section>
        
    )
}

export default GetTrainingMethod;