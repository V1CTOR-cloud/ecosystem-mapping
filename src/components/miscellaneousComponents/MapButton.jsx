import React from 'react';
import { Button } from "@chakra-ui/react"


export default function MapButton({setFormOpen}) {
    
    return (
        <Button onClick={() => setFormOpen(true)} colorScheme="blue">Button</Button>
    )
}