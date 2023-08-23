"use client"
import styled from 'styled-components'
import Image from 'next/image'
import CircleIcon from '@/components/Circle'
import VectorIcon from "@/public/icons/vector.svg"
import FloatingButton from "@/components/FloatButton"
import { useRouter } from 'next/navigation'

import { gql, useSuspenseQuery } from "@apollo/client";
import ContactList from './ContactCard'

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

export default function Table() {
    const router = useRouter()
    const { data } = useSuspenseQuery<ContactList>(query)
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