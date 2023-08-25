'use client'
import styled from 'styled-components'
import Image from 'next/image'
import { WarningButton, DangerButton } from '@/components/Button'
import CircleIcon from "@/components/Circle"
import Icon from '@/public/icons'
import { GET_CONTACT_BY_PK, DELETE_CONTACT_BY_PK } from '@/lib/apolloQuery'
import { useMutation, useSuspenseQuery } from "@apollo/client";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Phone {
    number: string;
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
    const { data } = useSuspenseQuery<ContactByPk>(GET_CONTACT_BY_PK, { variables: { id: params.id } })
    const contact: Contact = data.contact_by_pk
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumbers, setPhoneNumbers] = useState<string[]>()
    const [deleteContact] = useMutation(DELETE_CONTACT_BY_PK);
    const router = useRouter()
    // console.log(contact.phones?.map((phone)=> {
    //     console.log(phone.number)
    // }))
    // console.log(contact.phones?.map((phone)=> console.log(phone.number)))
    useEffect(() => {
        if (data) {
            setFirstName(contact.first_name)
            setLastName(contact.last_name)
            setPhoneNumbers(contact.phones?.map((phone) => phone.number));
        }
        console.log(phoneNumbers)
    }, [data])

    const handleDeleteContact = async (contactId: number) => {
        try {
            const result = await deleteContact({ variables: { id: contactId } })
            router.push('/')
        } catch (error) {
            console.error(error)
        }
    }
    console.log(data)
    return (
        <>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                alignSelf: 'stretch'
            }}>
                <a id="prev" style={{ display: 'flex' }} onClick={() => router.back()}>
                    <Image src={Icon.ArrowIcon} alt='previous' width={12} height={24} />
                </a>
                <HeaderText>
                    Details
                </HeaderText>
                <WarningButton href={`/contact/edit/${contact.id}`}>
                    Edit
                </WarningButton>
            </div>
            <CardContainer>
                <CircleIcon />
                <TextHeading>{firstName} {lastName}</TextHeading>
                <CardInfoContainer>
                    <TextHeading>Contact Info</TextHeading>
                    {
                        phoneNumbers?.map((phone, index) => (
                            <p key={index}>{phone}</p>
                        ))
                    }
                </CardInfoContainer>
            </CardContainer>
            <DangerButton style={{ alignSelf: 'center' }} onClick={(event) => handleDeleteContact(contact.id)}>Delete Contact</DangerButton>
        </>
    )
}