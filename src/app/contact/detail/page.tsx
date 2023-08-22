'use client'
import styled from 'styled-components'
import Image from 'next/image'
import { WarningButton, OutlineButton, DangerButton } from '@/components/Button'
import CircleIcon from "@/components/Circle"
import VectorIcon from "@/public/icons/vector.svg"
import Link from 'next/link'
const TextHeading = styled.p`font-size: 24px;
                font-style: normal;
                font-weight: 700;
                line-height: normal;`

const HeaderText = styled.p`
    font-size: 24px;
    font-weight: 700;
    flex-grow: 1;
`

const CardContainer = styled.div`
    display: flex;
    padding: 24px 0px;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    align-self: stretch;
`

const CardInfoContainer = styled.div`
    display: flex;
    padding: 24px;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    align-self: stretch;
    border-radius: 16px;
    background: #F5F5F5;
`

export default function AddPage() {

    return (
        <>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                alignSelf: 'stretch'
            }}>
                <Link id="prev" style={{ display: 'flex' }} href={'/'}>
                    <Image src={VectorIcon} alt='previous' width={12} height={24} />
                </Link>
                <HeaderText>
                    Details
                </HeaderText>
                <WarningButton href='/contact/edit'>
                    Edit
                </WarningButton>
            </div>
            <CardContainer>
                <CircleIcon />
                <TextHeading>Sharron Zimmer</TextHeading>
                <CardInfoContainer>
                    <TextHeading>Contact Info</TextHeading>
                    <p>020 194 4591</p>
                    <p>020 194 4591</p>
                </CardInfoContainer>
            </CardContainer>
            <DangerButton style={{ alignSelf: 'center' }}>Delete Contact</DangerButton>
        </>
    )
}