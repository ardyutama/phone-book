"use client"
import styled from 'styled-components'

const ContactContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
    padding: 0px 24px;
    @media (min-width: 350px) {
    max-width: 350px;
    margin: 0 auto;
    }
`
export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return (
        <ContactContainer>
            {children}
        </ContactContainer>
    )
}