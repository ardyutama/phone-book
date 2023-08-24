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

type Phone = {
    number: number;
};

interface Contact {
    id: number;
    first_name?: string;
    last_name?: string;
    phones: Phone[];
    favorite?: boolean;
}

interface ContactListProps {
    contacts: Contact[];
    isFavorite: (event: React.MouseEvent<HTMLButtonElement>,contactId: number) => void;
}


// const saveToLocalStorage = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
//     event.stopPropagation()
//     let tempFavoriteContact: string[] = [];
//     const storeFavoriteContact = localStorage.getItem('favoriteContacts')
//     if (storeFavoriteContact !== null) {
//         tempFavoriteContact = JSON.parse(storeFavoriteContact)
//     }
//     tempFavoriteContact.push(id.toString())
//     let checkDuplicates = tempFavoriteContact.filter(function (item, index) {
//         return tempFavoriteContact.indexOf(item) == index;
//     })
//     localStorage.setItem('favoriteContacts', JSON.stringify(checkDuplicates))
// }

const ContactList: React.FC<ContactListProps> = ({ contacts, isFavorite }: ContactListProps) => {
    const favoriteContacts = contacts.filter(contact => contact.favorite);
    const regularContacts = contacts.filter(contact => !contact.favorite);
    const router = useRouter()
    return (
        <>
            {favoriteContacts.map(contact =>
                <tr onClick={() => router.push(`/contact/detail/${contact.id}`)} style={{ cursor: 'pointer' }} role='button' key={contact.id}>
                    <ContainerContent $name>
                        <div className='NameContainer'>
                            <CircleIcon />
                            <p>{contact.first_name} {contact.last_name}</p>
                        </div>
                    </ContainerContent>
                    <ContainerContent>
                        <p>{contact.phones[0].number}</p>
                    </ContainerContent>
                    <td>
                        <button onClick={(event) => isFavorite(event,contact.id)} style={{ cursor: 'pointer' }}>{contact.favorite ? 'Unfavorite' : 'Favorite'}</button>
                        <button>delete</button>
                    </td>
                </tr>
            )}
            {regularContacts.map(contact =>
                <tr onClick={() => router.push(`/contact/detail/${contact.id}`)} style={{ cursor: 'pointer' }} role='button' key={contact.id}>
                    <ContainerContent $name>
                        <div className='NameContainer'>
                            <CircleIcon />
                            <p>{contact.first_name} {contact.last_name}</p>
                        </div>
                    </ContainerContent>
                    <ContainerContent>
                        <p>{contact.phones[0].number}</p>
                    </ContainerContent>
                    <td>
                        <button onClick={(event) => isFavorite(event,contact.id)} style={{ cursor: 'pointer' }}>{contact.favorite ? 'Unfavorite' : 'Favorite'}</button>
                        <button>delete</button>
                    </td>
                </tr>
            )}
        </>
    )
}

export default ContactList