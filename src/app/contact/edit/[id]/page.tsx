"use client";
import styled from "styled-components";
import Image from "next/image";
import { PrimaryButton } from "@/components/Button";
import InputContainer from "@/components/Input";
import CircleIcon from "@/components/Circle";
import Icon from "@/public/icons";
import { EDIT_CONTACT_BY_PK, EDIT_PHONES_BY_PK, GET_CONTACT_BY_PK } from "@/lib/apolloQuery";
import { useMutation, useSuspenseQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Phone {
  number: string;
}

interface Contact {
  id: number;
  first_name: string;
  last_name: string;
  phones?: Phone[];
}
interface ContactByPk {
  contact_by_pk: Contact;
}

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

export default function EditPage({ params }: { params: { id: string } }) {
  const { data } = useSuspenseQuery<ContactByPk>(GET_CONTACT_BY_PK, {
    variables: { id: params.id },
  });
  const contact: Contact = data.contact_by_pk;
  const [editContact] = useMutation(EDIT_CONTACT_BY_PK);
  const [editPhone] = useMutation(EDIT_PHONES_BY_PK);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [inputFields, setInputFields] = useState<{id: number, number: string}[]>()
  const oldPhoneNumbers = contact.phones?.map(phone => phone.number) || []
  const router = useRouter()

  useEffect(()=> {
    if(data){
      setFirstName(contact.first_name)
      setLastName(contact.last_name)
      setInputFields(
        contact.phones ? contact.phones.map((phone, index) => ({ id: index, number: phone.number }))
          : [{ id: 0, number: "" }]);
    }
  }, [data])
    
  const handleInputChange = (id: number, value: string) => {
    const updatedInputFields = inputFields?.map((field) =>
      field.id == id ? { ...field, number: value } : field
    );
    setInputFields(updatedInputFields);
  };

  const handleSave = async () => {
    try {
      for (let i = 0; i < inputFields?.length!; i++) {
        const phone = inputFields![i];
        const oldPhoneNumber = oldPhoneNumbers[i];

        if (phone.number !== oldPhoneNumber) {
          await editPhone({
            variables: {
              pk_columns: {
                number: oldPhoneNumber,
                contact_id: contact.id,
              },
              new_phone_number: phone.number,
            },
          });
        }
      }
    } catch (error) {
      console.error('Error saving phone numbers', error);
    }
  }

  const handleUpdateContact = async () => {
    try {
      await editContact({
        variables: {
          id: contact.id,
          _set: {
            first_name: firstName,
            last_name: lastName,
          }
        },
      });
      handleSave()
      router.push('/')
    } catch (e) {
      console.error("Error update Contact", e);
    }
  };


  return (
    <>
      <NavContainer>
        <a id="prev" style={{ display: "inline-flex" }} onClick={()=> router.back()}>
          <Image src={Icon.ArrowIcon} alt="previous" width={12} height={24} />
        </a>
        <HeaderText>Edit Contact</HeaderText>
        <PrimaryButton onClick={() => {
          handleUpdateContact()
        }}>Save</PrimaryButton>
      </NavContainer>
      <CardContainer>
        <CircleIcon />
        <NameContainer>
          <Image src={Icon.PersonIcon} alt="Person" width={24} height={24} />
          <FormContainer>
            <InputContainer>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </InputContainer>
            <InputContainer>
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </InputContainer>
          </FormContainer>
        </NameContainer>
        <NameContainer>
          <Image src={Icon.PhoneIcon} alt="Person" width={24} height={24} />
          <FormContainer>
            {inputFields?.map((input) => (
              <InputContainer key={input.id}>
                <input
                  type="text"
                  placeholder="+62xxxx"
                  value={input.number}
                  onChange={(e) =>
                    handleInputChange(input.id, e.target.value)
                  }
                />
              </InputContainer>
            ))}
          </FormContainer>
        </NameContainer>
      </CardContainer>
    </>
  );
}
