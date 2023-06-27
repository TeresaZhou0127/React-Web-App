import { useSearchParams, useNavigate, createSearchParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { useState } from "react";

const CONTENT_QUERY = gql`
    query GetContent($id: ID!) {
        getContentById(id: $id) {
            task {
                status
            }
            contentOutput {
                image{
                    images {
                        url
                    }
                }
            }
        }
    }
`;


export const GetImages = () => {
    const [searchparams] = useSearchParams()
    console.log(searchparams.get('contentId'))
    console.log(searchparams.get('userId'))
    const contentId = searchparams.get('contentId')
    const userId = searchparams.get('userId')
    const navigate = useNavigate()

    const {loading, error, data} = useQuery(CONTENT_QUERY, {
        variables: {
            id: contentId
        }
    })

    if (loading) return <p> Loading... </p>
    if (error) return <p> Error: {error.message} </p>

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
            <h> Images created: </h>
            {data && data.getContentById.contentOutput.image.images.map(pic => (
                <ul>
                    {pic.url}
                    <img source={pic.url} alt=""/>
                </ul>
            ))}
            <button onClick={openModelSelection}> Go back to Model Selection </button>
        </section>   
    )

}

export default GetImages;