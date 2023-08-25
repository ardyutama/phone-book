'use client'
import { useRouter } from 'next/navigation'
import styled from 'styled-components'
import CircleIcon from '@/components/Circle'
import Icon from '@/public/icons'
import Image from 'next/image'
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
    isFavorite: (event: React.MouseEvent<HTMLButtonElement>, contactId: number) => void;
    deleteItem: (event: React.MouseEvent<HTMLButtonElement>, contactId: number) => void
}

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

const Button = styled.button`
    width: 50%;
    display: flex;
    padding: 8px 16px;
    border-radius: 16px;
    text-decoration: none;
    border: none;
    font-size: 12px;
    justify-content: center;
    @media (min-width: 420px){
        
        font-size: 16px;
    }
`
const WarningButton = styled(Button)`
    background: var(--yellow);
    color: white;
`
const DangerButton = styled(Button)`
    background: var(--red);
    color: white;
`
const PrimaryButton = styled(Button)`
    background: var(--blue);
    color: white;
`

const CellAction = styled.td`
    align-items: center;
    flex-direction: column;
    visibility: visible;
    display: flex;
    justify-items: center;
    gap: 4px;
    padding: 8px 0px;

    ${WarningButton}{
        visibility: visible;
    }
    @media (min-width: 420px){
        visibility: hidden;
    }
    /* visibility: hidden; */
`

const RowGroup = styled.tr`
    &:hover{
        background: var(--grey-light);
        border-radius: 24px;
        ${CellAction}{
            visibility: visible;
        }
    }
`



const ContactList = ({ contacts, isFavorite, deleteItem }: ContactListProps) => {
    const favoriteContacts = contacts.filter(contact => contact.favorite);
    const regularContacts = contacts.filter(contact => !contact.favorite);

    const router = useRouter()
    return (
        <>
            {favoriteContacts.map(contact =>
                <RowGroup onClick={() => router.push(`/contact/detail/${contact.id}`)} style={{ cursor: 'pointer' }} role='button' key={contact.id}>
                    <ContainerContent $name>
                        <div className='NameContainer'>
                            <CircleIcon />
                            <p>{contact.first_name} {contact.last_name}</p>
                        </div>
                    </ContainerContent>
                    <ContainerContent>
                        <p>{contact.phones[0].number}</p>
                    </ContainerContent>
                    <CellAction>
                        <WarningButton onClick={(event) => isFavorite(event, contact.id)} style={{ cursor: 'pointer', visibility: contact.favorite ? 'visible' : 'hidden' }}>{contact.favorite ? 
                            <Image src={Icon.StarIcon} alt="start"/> :  <Image src={Icon.StarIcon} alt="start"/> }
                        </WarningButton>
                        <DangerButton onClick={(event) => deleteItem(event, contact.id)}>
                            <Image src={Icon.TrashIcon} alt='trash'/>
                        </DangerButton>
                    </CellAction>
                </RowGroup>
            )}
            {regularContacts.map(contact =>
                <RowGroup onClick={() => router.push(`/contact/detail/${contact.id}`)} style={{ cursor: 'pointer' }} role='button' key={contact.id}>
                    <ContainerContent $name>
                        <div className='NameContainer'>
                            <CircleIcon />
                            <p>{contact.first_name} {contact.last_name}</p>
                        </div>
                    </ContainerContent>
                    <ContainerContent>
                        <p>{contact.phones[0]?.number}</p>
                    </ContainerContent>
                    <CellAction>
                        {contact.favorite ? 
                        <WarningButton onClick={(event) => isFavorite(event, contact.id)} style={{ cursor: 'pointer'}}>
                            <Image src={Icon.StarIcon} alt="start"/>
                        </WarningButton>
                        :
                        <PrimaryButton onClick={(event) => isFavorite(event, contact.id)} style={{ cursor: 'pointer'}}>
                            <Image src={Icon.StarIcon} alt="start"/>
                        </PrimaryButton>
                        }
                        <DangerButton onClick={(event) => deleteItem(event, contact.id)}>
                            <Image src={Icon.TrashIcon} alt='trash'/>
                        </DangerButton>
                    </CellAction>
                </RowGroup>
            )}
        </>
    )
}

export default ContactList