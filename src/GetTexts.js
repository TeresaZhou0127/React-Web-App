import { useSearchParams, useNavigate, createSearchParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { useState } from "react";

const TEXT_QUERY = gql`
    query GetContent($id: ID!) {
        getContentById(id: $id) {
            task {
                status
            }
            contentOutput {
                text{
                    choices 
                }
            }
        }
    }
`;


export const GetTexts = () => {
    const [searchparams] = useSearchParams()
    console.log(searchparams.get('contentId'))
    console.log(searchparams.get('userId'))
    const contentId = searchparams.get('contentId')
    const userId = searchparams.get('userId')
    const navigate = useNavigate()

    const {loading, error, data} = useQuery(TEXT_QUERY, {
        variables: {
            id: contentId
        }
    })

    if (loading) return <p> Loading... </p>
    if (error) return <p> Error: {error.message} </p>
    if (! data) return <p> No result </p>

    function openModelSelection() {
        navigate({
            pathname: "/ModelSelection",
            search: createSearchParams({
                userId: userId
            }).toString()
        })
    }

    return (
        <section>
            <h> Texts created: </h>
            <br />
            {data && (
               data.getContentById.contentOutput.text.choices[0].message.content
            )}
            <br /> 
            <button onClick={openModelSelection}> Go back to Model Selection </button>
        </section>   
    )

}

export default GetTexts;