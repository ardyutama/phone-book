"use client"
import styled from 'styled-components'
import { useMutation, useSuspenseQuery } from "@apollo/client";
import FloatingButton from "@/components/FloatButton"
import ContactList from '@/components/ContactList'
import { useEffect, useState } from 'react';
import Image from 'next/image'
import { GET_ALL_CONTACT, DELETE_CONTACT_BY_PK } from '@/lib/apolloQuery';
import Icon from "@/public/icons"
import InputContainer from '@/components/Input'
import { PrimaryButton } from '@/components/Button';
interface Phone {
    number: string;
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
    position: sticky;
    bottom: 0;
    width: 100%;
    background: white;
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
const ITEMS_PER_PAGE = 10;

export default function Table() {
    const { data, refetch } = useSuspenseQuery<ContactList>(GET_ALL_CONTACT)
    const [deleteContact, { loading, error }] = useMutation(DELETE_CONTACT_BY_PK);
    const [contacts, setContacts] = useState<Contact[]>([])
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [filteredList, setFilteredList] = useState<Contact[]>([])
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const totalPages = Math.ceil(contacts.length / ITEMS_PER_PAGE)

    //Condition if there's any seach query then use the filtered list if not then normal sort
    const sortedContacts = searchQuery ?
        [...filteredList].sort(
            (a, b) => b.favorite ? 1 : -1
        ) :
        [...contacts].sort(
            (a, b) => b.favorite ? 1 : -1
        );

    const displayedItems = sortedContacts.slice(startIndex, endIndex)

    //To fetch first data and then match it with the favorite in the local storage
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

    //To toogle the favorite button, also add and remove item from favorite
    useEffect(() => {
        const favoriteContacts: Contact[] = contacts.filter(contact => contact.favorite);
        localStorage.setItem('favoriteContacts', JSON.stringify(favoriteContacts));
    }, [contacts])

    const handleDeleteContact = async (event: React.MouseEvent<HTMLButtonElement>, contactId: number) => {
        event.stopPropagation()
        try {
            await deleteContact({ variables: { id: contactId } })
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

    const handlePreviousPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
        refetch();
    }
    const handleNextPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage + 1, 1));
        refetch()
    }

    const searchContact = (query: string) => {
        query = query.toLowerCase()
        setSearchQuery(query)

        const filtered = contacts.filter(contact => {
            const firstName = contact.first_name?.toLowerCase()
            const lastName = contact.last_name?.toLowerCase()
            const phones = contact.phones?.map(phone => phone.number.toLowerCase())
            if (
                firstName?.includes(query) ||
                lastName?.includes(query) ||
                phones?.includes(query)
            ) {
                return true;
            } else return false;
        })
        setFilteredList(filtered)
    }

    return (
        <>
            <div className="SearchContainer">
                <InputContainer>
                    <Image src={Icon.SearchIcon} alt='Search' />
                    <input type='text' placeholder='Cari Kontak...' onChange={(event) => searchContact(event.target.value)} value={searchQuery} />
                </InputContainer>
                <PrimaryButton className="AddButton" href="/contact/add">Add Contact</PrimaryButton>
            </div>
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', flexGrow: 1, position: 'relative' }}>
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
                            contacts={displayedItems}
                            isFavorite={toggleFavorite}
                            deleteItem={handleDeleteContact}
                        />
                    </tbody>
                </TableContainer>
            </div>
            <FloatingButton />
            <ContainerPagination>
                <button
                    onClick={() => { handlePreviousPage() }}
                    disabled={currentPage === 1}
                >
                    <Image src={Icon.ArrowIcon} alt='previous' width={12} height={24} />
                </button>
                <button
                    onClick={() => { handleNextPage() }}
                    disabled={currentPage === totalPages}
                >
                    <Image
                        src={Icon.ArrowIcon}
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