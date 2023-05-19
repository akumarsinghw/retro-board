import React from 'react'
import  { useRouter } from "next/router"

const index = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <div>
            The ID should show up here { id }
        </div>
    )
}



export default index
