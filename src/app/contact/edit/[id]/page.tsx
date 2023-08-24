"use client";
import styled from "styled-components";
import Image from "next/image";
import { PrimaryButton, OutlineButton } from "@/components/Button";
import InputContainer from "@/components/Input";
import CircleIcon from "@/components/Circle";
import VectorIcon from "@/public/icons/vector.svg";
import PersonIcon from "@/public/icons/person-2.svg";
import PhoneIcon from "@/public/icons/phone.svg";
import Link from "next/link";
import { gql, useSuspenseQuery } from "@apollo/client";
import { useState } from "react";

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

const HeaderText = styled.p`
  font-size: 24px;
  font-weight: 700;
  flex-grow: 1;
`;

const CardContainer = styled.div`
  display: flex;
  padding: 24px 0px;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  align-self: stretch;
`;

const NameContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
  align-items: center;

  img {
    margin-top: 4px;
    align-self: flex-start;
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 16px;
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  align-self: stretch;
`;



export default function AddPage({ params }: { params: { id: string } }) {
  const { data } = useSuspenseQuery<ContactByPk>(query, { variables: { id: params.id } })
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [inputFields, setInputFields] = useState([{ id: 0, value: "" }]);

  const handleAddField = () => {
    const newInputFields = [
      ...inputFields,
      { id: inputFields.length, value: "" },
    ];

    setInputFields(newInputFields);
  };
  const handleInputChange = (id: number, value: string) => {
    const updatedInputFields = inputFields.map((field) =>
      field.id == id ? { ...field, value } : field
    );
    console.log(updatedInputFields);
    setInputFields(updatedInputFields);
  };

  const contact: Contact = data.contact_by_pk
  return (
    <>
      <NavContainer>
        <Link id="prev" style={{ display: "inline-flex" }} href="/">
          <Image src={VectorIcon} alt="previous" width={12} height={24} />
        </Link>
        <HeaderText>New Contact</HeaderText>
        <PrimaryButton>Save</PrimaryButton>
      </NavContainer>
      <CardContainer>
        <CircleIcon />
        <NameContainer>
          <Image src={PersonIcon} alt="Person" width={24} height={24} />
          <FormContainer>
            <InputContainer>
              <input
                type="text"
                placeholder="First Name"
                value={contact.first_name}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </InputContainer>
            <InputContainer>
              <input
                type="text"
                placeholder="Last Name"
                value={contact.last_name}
                onChange={(e) => setLastName(e.target.value)}
              />
            </InputContainer>
          </FormContainer>
        </NameContainer>
        <NameContainer>
          <Image src={PhoneIcon} alt="Person" width={24} height={24} />
          <FormContainer>
            {contact.phones ?
              contact.phones?.map((phone) => (
                <InputContainer key={contact.id}>
                  <input
                    type="text"
                    placeholder="+62xxxx"
                    value={phone.number}
                    onChange={(e) => handleInputChange(contact.id, e.target.value)}
                  />
                </InputContainer>
              )) :
              inputFields.map((input) => (
                <InputContainer key={input.id}>
                  <input
                    type="text"
                    placeholder="+62xxxx"
                    value={input.value}
                    onChange={(e) => handleInputChange(contact.id, e.target.value)}
                  />
                </InputContainer>
              ))

            }

            {inputFields.map((field) => (
              <InputContainer key={field.id}>
                <input
                  type="text"
                  placeholder="+62xxxx"
                  value={field.value}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                />
              </InputContainer>
            ))}
            <OutlineButton
              style={{ alignSelf: "flex-end" }}
              onClick={handleAddField}
            >
              Add More{" "}
            </OutlineButton>
          </FormContainer>
        </NameContainer>
      </CardContainer>
    </>
  );
}
