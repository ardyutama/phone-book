"use client"
/** @jsxImportSource @emotion/react */
import Image from 'next/image'
import PersonIcon from "@/public/icons/person.svg"
import styled from '@emotion/styled'
import CircleIcon from './Circle'

const ContainerHeader = styled.div`
    display: flex;
    padding: 16px 24px;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    background: white;
`

export default function Header() {
    return (
        <ContainerHeader>
            <CircleIcon>
                <Image src={PersonIcon} alt='Person' />
            </CircleIcon>
            <p style={{ color: '#8F8F8F', fontSize: '20px', }}>Phone Book</p>
        </ContainerHeader>
    )
}