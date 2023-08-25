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

interface Phone {
    number: string;
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
    deleteItem:(event: React.MouseEvent<HTMLButtonElement>,contactId: number) => void
}

const ContactList = ({ contacts, isFavorite, deleteItem }: ContactListProps) => {
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
                        <button onClick={(event) => deleteItem(event,contact.id)}>delete</button>
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
                        <p>{contact.phones[0]?.number}</p>
                    </ContainerContent>
                    <td>
                        <button onClick={(event) => isFavorite(event,contact.id)} style={{ cursor: 'pointer' }}>{contact.favorite ? 'Unfavorite' : 'Favorite'}</button>
                        <button onClick={(event) => deleteItem(event,contact.id)}>delete</button>
                    </td>
                </tr>
            )}
        </>
    )
}

export default ContactList