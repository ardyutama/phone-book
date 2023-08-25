"use client";
import styled from "styled-components";
import Image from "next/image";
import { PrimaryButton, OutlineButton } from "@/components/Button";
import InputContainer from "@/components/Input";
import CircleIcon from "@/components/Circle";
import Icon from "@/public/icons";
import Link from "next/link";
import { useState } from "react";
import { ADD_CONTACT } from "@/lib/apolloQuery";
import {  useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";

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

export default function AddPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [inputFields, setInputFields] = useState([{ id: 0, value: "" }]);
  const [addContact, { loading, error }] = useMutation(ADD_CONTACT);
  const router = useRouter();
  const handleAddContact = async () => {
    try {
      const phonesData = inputFields.map((field) => ({ number: field.value }));
      const result = await addContact({
        variables: {
          first_name: firstName,
          last_name: lastName,
          phones: phonesData,
        },
      });
      setInputFields([{ id: 0, value: "" }]);
      setFirstName("");
      setLastName("");
      router.push("/");
      console.log(result.data.insert_contact.returning);
    } catch (e) {
      console.error("Error adding Contact", e);
    }
  };
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
  return (
    <>
      <NavContainer>
        <Link id="prev" style={{ display: "inline-flex" }} href="/">
          <Image src={Icon.ArrowIcon} alt="previous" width={12} height={24} />
        </Link>
        <HeaderText>New Contact</HeaderText>
        <PrimaryButton onClick={handleAddContact}>Save</PrimaryButton>
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
