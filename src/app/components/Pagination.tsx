'use client'
import styled from 'styled-components'
import Image from 'next/image'
import VectorIcon from "@/public/icons/vector.svg"
const ContainerPagination = styled.ul`
    display: flex;
    padding: 16px 0px;
    justify-content: center;
    align-items: center;
    gap: 16px;
    align-self: stretch;
    border-top: 1px solid #3E3E3E;
    >li {
        display: inline;
    }
`

export default function Pagination () {
    return (
        <ContainerPagination>
        <a id="prev">
            <Image src={VectorIcon} alt='previous' width={12} height={24} />
        </a>
        <a id="prev">
            <Image
                src={VectorIcon}
                alt='previous'
                style={{
                    scale: -1
                }}
                width={12} height={24}
            />
        </a>
    </ContainerPagination>
    )
}