'use client'
import styled from 'styled-components'
import Image from 'next/image'
import { WarningButton, OutlineButton, DangerButton } from '@/components/Button'
import CircleIcon from "@/components/Circle"
import VectorIcon from "@/public/icons/vector.svg"
import Link from 'next/link'
// import { GetContactsData } from '@/lib/contacts'
import { gql, useSuspenseQuery } from "@apollo/client";

type Phone = {
    number: number;
};

type ContactList = {
    [contact : number]: Contact[]
};
type Contact = {
    contact_by_pk :{
    id: number;
    first_name: string;
    last_name: string;
    phones?: Phone[];
    }  
};
const query = gql`
query getContactByPKgetContactById($id: Int!){
    contact_by_pk(id: $id){
      first_name,
      last_name,
      phones{
        number
      }
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

export default function DetailPage({params}: {params: {id: string}}) {
    const { data } = useSuspenseQuery<Contact>(query, {variables: {id: params.id}})
    const contact = data.contact_by_pk
    // const data = GetContactsData(parseInt(params.id))
    return (
        <>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                alignSelf: 'stretch'
            }}>
                <Link id="prev" style={{ display: 'flex' }} href={'/'}>
                    <Image src={VectorIcon} alt='previous' width={12} height={24} />
                </Link>
                <HeaderText>
                    Details
                </HeaderText>
                <WarningButton href='/contact/edit'>
                    Edit
                </WarningButton>
            </div>
            <CardContainer>
                <CircleIcon />
                <TextHeading>{contact?.first_name}</TextHeading>
                <CardInfoContainer>
                    <TextHeading>Contact Info</TextHeading>
                    {
                        contact?.phones?.map((phone,index)=> (
                            <p key={index}>{phone?.number}</p>
                        ))
                    }
                </CardInfoContainer>
            </CardContainer>
            <DangerButton style={{ alignSelf: 'center' }}>Delete Contact</DangerButton>
        </>
    )
}