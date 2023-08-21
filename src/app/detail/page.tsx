'use client'
/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import Image from 'next/image'
import { WarningButton, OutlineButton, DangerButton } from '@/components/Button'
import CircleIcon from "@/components/Circle"
import VectorIcon from "@/public/icons/vector.svg"

const TextHeading = css`font-size: 24px;
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

export default function AddPage() {
    return (
        <div css={css`
            display: flex;
            flex-direction: column;
            align-self: stretch;
            padding: 24px;
    `}>
            <div css={css`
                display: flex;
                align-items: center;
                gap: 16px;
                align-self: stretch;
            `}>
                <a id="prev" style={{ display: 'flex' }} href='/'>
                    <Image src={VectorIcon} alt='previous' width={12} height={24} />
                </a>
                <HeaderText>
                    Details
                </HeaderText>
                <WarningButton href='/edit'>
                    Edit
                </WarningButton>
            </div>
            <CardContainer>
                <CircleIcon />
                <p css={TextHeading}>Sharron Zimmer</p>
                <div css={css`
                    display: flex;
                    padding: 24px;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 16px;
                    align-self: stretch;
                    border-radius: 16px;
                    background: #F5F5F5;
                `}>
                    <p css={TextHeading}>Contact Info</p>
                    <p>020 194 4591</p>
                    <p>020 194 4591</p>
                </div>
            </CardContainer>
            <DangerButton style={{alignSelf: 'center'}}>Delete Contact</DangerButton>
        </div>
    )
}