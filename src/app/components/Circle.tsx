'use client'
/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled'
import { ReactNode } from 'react'

type CircleProps = {
    className?: string
}
export const Circle = styled.div`
    display: flex;
    width: 48px;
    height: 48px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 50%;
    background: var(--blue);    
`
export default function CircleIcon({children}:{children?: ReactNode}){
    return (
        <Circle>
            {children}
        </Circle>
    )
}