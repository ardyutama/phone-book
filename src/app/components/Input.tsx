'use client'
import styled from 'styled-components'
import { ReactNode } from 'react'

const InputContainerStyle = styled.div`
    display: flex;
    padding: 8px 16px;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    border-radius: 8px;
    background: #F5F5F5;

    input{
        all: unset;
    }
`
export default function InputContainer({ children }: { children: ReactNode }) {
    return (
        <InputContainerStyle>
            {children}
        </InputContainerStyle>
    )
}


