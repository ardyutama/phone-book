"use client"
import Image from 'next/image'
import Icon from "@/public/icons"
import styled from 'styled-components'
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
                <Image src={Icon.WebIcon} alt='Person' />
            </CircleIcon>
            <p style={{ color: '#8F8F8F', fontSize: '20px', }}>Phone Book</p>
        </ContainerHeader>
    )
}