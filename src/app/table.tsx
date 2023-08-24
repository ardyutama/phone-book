"use client"
import styled from 'styled-components'
import { gql, useSuspenseQuery } from "@apollo/client";
import FloatingButton from "@/components/FloatButton"
import ContactList from '@/components/ContactList'
import Pagination from '@/components/Pagination';
import { useEffect, useState } from 'react';

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
      {
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

export default function Table() {
    const { data, refetch } = useSuspenseQuery<ContactList>(query)
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10
    const [contacts, setContacts] = useState<Contact[]>([])

    useEffect(() => {
        if (data) {
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

    const toggleFavorite = (event: React.MouseEvent<HTMLButtonElement>, contactId: number) => {
        event.stopPropagation()
        setContacts(
            contacts.map(
                contact => contact.id === contactId ? { ...contact, favorite: !contact.favorite } : contact
            ))
    }

    const onPageChange = (page: number) => {
        setCurrentPage(page)
    }

    const sortedContacts = [...contacts].sort(
        (a, b) => b.favorite ? 1 : -1
    );


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
                        />
                    </tbody>
                </TableContainer>
            </div>
            <Pagination

            />
        </>
    )
}