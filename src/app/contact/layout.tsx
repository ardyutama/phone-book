"use client"
import styled from 'styled-components'

const ContactContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
    @media (min-width: 425px) {
    max-width: 400px;
    margin: 0 auto;
    }
`
export default function ContactLayout ({children}: {children: React.ReactNode}) {
    return (
        <ContactContainer>
            {children}
        </ContactContainer>
    )
}