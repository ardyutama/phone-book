"use client"
import styled from 'styled-components'
import { gql, useMutation, useSuspenseQuery } from "@apollo/client";
import FloatingButton from "@/components/FloatButton"
import ContactList from '@/components/ContactList'
import Pagination from '@/components/Pagination';
import { useEffect, useState } from 'react';
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
interface Phone {
    number: number;
};

interface Contact {
    id: number;
    first_name?: string;
    last_name?: string;
    phones: Phone[];
    favorite: boolean;
};

interface ContactList {
    contact: Contact[];
};


const query = gql`
query getAllContact {
    contact{
      id,
      first_name,
      last_name
      phones {
        number
      }
      }
  }
`;

const deleteQuery = gql`
mutation MyMutation($id: Int!) {
    delete_contact_by_pk(id: $id) {
      first_name
      last_name
      id
    }
  }
`;

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
const ITEMS_PER_PAGE = 10;

export default function Table() {
    const [contacts, setContacts] = useState<Contact[]>([])
    const [currentPage, setCurrentPage] = useState(1);
    const { data, refetch } = useSuspenseQuery<ContactList>(query)
    const [deleteContact, { loading, error }] = useMutation(deleteQuery);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const displayedItems = contacts.slice(startIndex,endIndex)
    const sortedContacts = [...displayedItems].sort(
        (a, b) => b.favorite ? 1 : -1
    );

    useEffect(() => {
        if (data) {
            refetch()
            const favoriteIdsFromStorage = JSON.parse(localStorage.getItem('favoriteContacts') || '[]');
            const updatedContacts = data.contact.map(contact => ({
                ...contact,
                favorite: favoriteIdsFromStorage.filter((c_contact: Contact) => {
                    if (c_contact.id === contact.id) {
                        return c_contact.favorite;
                    }
                }).length == 1,
            }));
            setContacts(updatedContacts);
        }
    }, [data]);

    useEffect(() => {
        const favoriteContacts: Contact[] = contacts.filter(contact => contact.favorite);
        localStorage.setItem('favoriteContacts', JSON.stringify(favoriteContacts));
    }, [contacts])

    const handleDeleteContact = async (event: React.MouseEvent<HTMLButtonElement>,contactId: number) => {
        event.stopPropagation()
        try {
            await deleteContact({variables: {id: contactId}})
            refetch()
        } catch (error) {
            console.error(error)
        }
    }
    
    const toggleFavorite = (event: React.MouseEvent<HTMLButtonElement>, contactId: number) => {
        event.stopPropagation()
        setContacts(
            contacts.map(
                contact => contact.id === contactId ? { ...contact, favorite: !contact.favorite } : contact
            ))
    }
    
    return (
        <>
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', flexGrow: 1, position: 'relative' }}>
                <FloatingButton />
                <TableContainer>
                    <thead>
                        <TableHead>
                            <TableHeader>Name</TableHeader>
                            <TableHeader>Phone Number</TableHeader>
                            <TableHeader>Favorite</TableHeader>
                        </TableHead>
                    </thead>
                    <tbody>
                        <ContactList
                            contacts={sortedContacts}
                            isFavorite={toggleFavorite}
                            deleteItem={handleDeleteContact}
                        />
                    </tbody>
                </TableContainer>
            </div>
            <ContainerPagination>
                <button
                    onClick={() => { setCurrentPage(prevPage => Math.max(prevPage - 1, 1)); refetch() }}
                    disabled={currentPage === 1}
                >
                    <Image src={VectorIcon} alt='previous' width={12} height={24} />
                </button>
                <button
                    onClick={() => { setCurrentPage(prevPage => Math.max(prevPage + 1, 1)); refetch() }}
                    disabled={contacts.length < ITEMS_PER_PAGE}
                >
                    <Image
                        src={VectorIcon}
                        alt='previous'
                        style={{
                            scale: -1
                        }}
                        width={12} height={24}
                    />
                </button>
            </ContainerPagination>
        </>
    )
}