'use client'
/** @jsxImportSource @emotion/react */
import PlusIcon from "@/public/icons/plus.svg"
import Image from "next/image"
import styled from '@emotion/styled'

const Circle = styled.div`
    display: flex;
    width: 64px;
    height: 64px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 50%;
    background: white;
    flex-shrink: 0;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
`

export default function FloatingButton() {
    return (
        <a href="/add" style={{ position: 'absolute', right: '0em', bottom: '0em' }}>
            <Circle>
                <Image src={PlusIcon} alt="plus" width={48} height={48} />
            </Circle>
        </a>
    )
}