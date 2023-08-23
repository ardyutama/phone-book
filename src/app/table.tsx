"use client"
import styled from 'styled-components'
import { gql, useSuspenseQuery } from "@apollo/client";
import FloatingButton from "@/components/FloatButton"
import ContactList from '@/components/ContactList'
import Pagination from '@/components/Pagination';
import { useState } from 'react';
type Phone = {
    number: number;
};

type Contact = {
    id: number;
    first_name: string;
    last_name: string;
    phones: Phone[];
};

type ContactList = {
    contact: Contact[]
};


const query = gql`
      {
        contact(limit: 10){
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
    const { data } = useSuspenseQuery<ContactList>(query)
    const [currentPage,setCurrentPage] = useState(1);
    const pageSize = 10

    const onPageChange = (page:number) => {
        setCurrentPage(page)
    }
    console.log(data)
    return (
        <>
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', flexGrow: 1, position: 'relative' }}>
                <FloatingButton />
                <TableContainer>
                    <thead>
                        <TableHead>
                            <TableHeader>Name</TableHeader>
                            <TableHeader>Phone Number</TableHeader>
                        </TableHead>
                    </thead>
                    <tbody>
                        {data.contact.map((contact: Contact) => (
                            <ContactList
                                key={contact.id}
                                id={contact.id}
                                first_name={contact.first_name}
                                last_name={contact.last_name}
                                phones={contact.phones}
                            />
                        ))}
                    </tbody>
                </TableContainer>
            </div>
           <Pagination 

           />
        </>
    )
}