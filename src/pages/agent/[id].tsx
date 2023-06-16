import React, { useEffect } from "react";
import { useRouter } from "next/router";

const Index = () => {
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        console.log(id)
    }, [id])

    return (
        <div>
            <p>Agente {id}</p>
        </div>
    )
}

export default Index