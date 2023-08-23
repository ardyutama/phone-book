'use client'
import { useRouter } from 'next/navigation'
import styled from 'styled-components'
import CircleIcon from '@/components/Circle'
import { useState } from 'react'
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
    phones: { number: number }[];
}
const saveToLocalStorage = (event: React.MouseEvent<HTMLButtonElement>,id:number) => {
    event.stopPropagation()
    let tempFavoriteContact:string[] = [];
    const storeFavoriteContact = localStorage.getItem('favoriteContacts')
    if (storeFavoriteContact !== null){
        tempFavoriteContact = JSON.parse(storeFavoriteContact)  
    }
    tempFavoriteContact.push(id.toString())
    let checkDuplicates = tempFavoriteContact.filter(function(item,index){
        return tempFavoriteContact.indexOf(item) == index;
    })
    localStorage.setItem('favoriteContacts', JSON.stringify(checkDuplicates))
}

const ContactList = ({ id, first_name, last_name, phones }: Props) => {
        
    const router = useRouter()
    return (
        <>
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
                <td>
                    <button onClick={(event) => saveToLocalStorage(event,id)} style={{cursor:'pointer'}}>fav</button>
                    <button>delete</button>
                </td>
            </tr>
        </>
    )
}

export default ContactList