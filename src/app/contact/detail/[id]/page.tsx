'use client'
import styled from 'styled-components'
import Image from 'next/image'
import { WarningButton, OutlineButton, DangerButton } from '@/components/Button'
import CircleIcon from "@/components/Circle"
import VectorIcon from "@/public/icons/vector.svg"
import Link from 'next/link'
// import { GetContactsData } from '@/lib/contacts'
import { gql, useMutation, useSuspenseQuery } from "@apollo/client";
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Phone {
    number: number;
};

interface Contact {
    id: number;
    first_name: string;
    last_name: string;
    phones?: Phone[];
}
interface ContactByPk {
    contact_by_pk: Contact
};

const query = gql`
query getContactByPKgetContactById($id: Int!){
    contact_by_pk(id: $id){
      id,
      first_name,
      last_name,
      phones{
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

const TextHeading = styled.p`font-size: 24px;
                font-style: normal;
                font-weight: 700;
                line-height: normal;`

const HeaderText = styled.p`
    font-size: 24px;
    font-weight: 700;
    flex-grow: 1;
`

const CardContainer = styled.div`
    display: flex;
    padding: 24px 0px;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    align-self: stretch;
`

const CardInfoContainer = styled.div`
    display: flex;
    padding: 24px;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    align-self: stretch;
    border-radius: 16px;
    background: #F5F5F5;
`

export default function DetailPage({ params }: { params: { id: string } }) {
    const { data } = useSuspenseQuery<ContactByPk>(query, { variables: { id: params.id } })
    const contact: Contact = data.contact_by_pk
    const [deleteContact, { loading, error }] = useMutation(deleteQuery);
    const router = useRouter()
    const handleDeleteContact = async (contactId: number) => {
        try {
            const result = await deleteContact({variables: {id: contactId}})
            router.push('/')
        } catch (error) {
            console.error(error)
        }
    }
    console.log(contact)
    // const data = GetContactsData(parseInt(params.id))
    return (
        <>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                alignSelf: 'stretch'
            }}>
                <Link id="prev" style={{ display: 'flex' }} href={'/'} >
                    <Image src={VectorIcon} alt='previous' width={12} height={24} />
                </Link>
                <HeaderText>
                    Details
                </HeaderText>
                <WarningButton href={`/contact/edit/${contact.id}`}>
                    Edit
                </WarningButton>
            </div>
            <CardContainer>
                <CircleIcon />
                <TextHeading>{contact.first_name} {contact.last_name}</TextHeading>
                <CardInfoContainer>
                    <TextHeading>Contact Info</TextHeading>
                    {
                        contact.phones?.map((phone, index) => (
                            <p key={index}>{phone?.number}</p>
                        ))
                    }
                </CardInfoContainer>
            </CardContainer>
            <DangerButton style={{ alignSelf: 'center' }} onClick={(event)=> handleDeleteContact(contact.id)}>Delete Contact</DangerButton>
        </>
    )
}