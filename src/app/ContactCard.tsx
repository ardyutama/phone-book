'use client'
import { useRouter } from 'next/navigation'
import styled from 'styled-components'
import CircleIcon from '@/components/Circle'

const ContainerContent = styled('td') <{ $name?: Boolean }>` 
    max-width: 0;
    .NameContainer {
        display: ${(props) => props.$name ? 'flex' : ''};
        gap: 12px;
        align-items: center;
        padding-left: 8px;
        padding: 16px;
    }
    p{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`

interface Props {
    id: number;
    first_name: string;
    last_name: string;
    phones: {number: number}[];
}

const ContactList = ({id, first_name, last_name, phones}: Props) => {
    const router = useRouter()
    return (
        <tr onClick={() => router.push(`/contact/detail/${id}`)} style={{ cursor: 'pointer' }} role='button'>
            <ContainerContent $name>
                <div className='NameContainer'>
                    <CircleIcon />
                    <p>{first_name} {last_name}</p>
                </div>
            </ContainerContent>
            <ContainerContent>
                <p>{phones[0].number}</p>
            </ContainerContent>
        </tr>
    )
}

export default ContactList