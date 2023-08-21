"use client"
/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled'
import Image from 'next/image'
import CircleIcon from './components/Circle'
import VectorIcon from "./public/icons/vector.svg"
import FloatingButton from "./components/FloatButton"

const TableContainer = styled.table`
    width: 100%;
    height: 100%;
    position: relative;
    border-collapse: collapse;
`

const TableHead = styled.tr`
    border-bottom: 1px solid #3E3E3E;
    background: white;
`
const TableHeader = styled.th`
    width: 50%;
    font-weight: 500;
    padding: 8px;
    text-align: start;
`

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

const TextName = styled.p`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

type ContentProps = {
    name: boolean
}

const ContainerContent = styled('td') <ContentProps>`
    display: ${(props: ContentProps) => props.name ? 'flex' : ''};
    gap: 12px;
    align-items: center;
    padding-left: 8px;
`

export default function Table() {
    return (
        <>
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', flexGrow:1, position: 'relative'}}>
            <FloatingButton />
                <TableContainer>
                    <thead>
                        <TableHead>
                            <TableHeader>Name</TableHeader>
                            <TableHeader>Phone Number</TableHeader>
                        </TableHead>
                    </thead>
                    {/* <tr>
                        <H3>Favorites</H3>
                    </tr> */}
                    <tbody>
                        <tr onClick={ (e) => location.href = '/detail'} style={{ cursor:'pointer'}}>
                            <ContainerContent name={true}>
                                <CircleIcon />
                                <div style={{maxWidth: '100px'}}>
                                <TextName>Ardy Putra Utama</TextName>
                                </div>
                            </ContainerContent >
                            <ContainerContent name={false}>
                                020 194 4591
                            </ContainerContent>
                        </tr>
                    </tbody>
                    {/* <div>
                        <H3>All Contacts</H3>
                    </div> */}
                </TableContainer>
            </div>
            <ContainerPagination>
                <a id="prev">
                    <Image src={VectorIcon} alt='previous' width={12} height={24} />
                </a>
                <a>1</a>
                <a>2</a>
                <a>3</a>
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
        </>
    )
}