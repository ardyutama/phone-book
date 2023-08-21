"use client";
import styled from "styled-components";
import Image from "next/image";
import { PrimaryButton, OutlineButton } from "@/components/Button";
import InputContainer from "@/components/Input";
import CircleIcon from "@/components/Circle";
import VectorIcon from "@/public/icons/vector.svg";
import PersonIcon from "@/public/icons/person-2.svg";
import PhoneIcon from "@/public/icons/phone.svg";

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

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  padding: 24px;
  @media (min-width: 425px) {
    max-width: 400px;
    margin: 0 auto;
  }
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  align-self: stretch;
`;

export default function AddPage() {
    return (
        <ContentContainer>
            <NavContainer>
                <a id="prev" style={{ display: "inline-flex" }} href="/">
                    <Image src={VectorIcon} alt="previous" width={12} height={24} />
                </a>
                <HeaderText>New Contact</HeaderText>
                <PrimaryButton>Save</PrimaryButton>
            </NavContainer>
            <CardContainer>
                <CircleIcon />
                <NameContainer>
                    <Image src={PersonIcon} alt="Person" width={24} height={24} />
                    <FormContainer>
                        <InputContainer>
                            <input type="text" placeholder="First Name"></input>
                        </InputContainer>
                        <InputContainer>
                            <input type="text" placeholder="Last Name"></input>
                        </InputContainer>
                    </FormContainer>
                </NameContainer>
                <NameContainer>
                    <Image src={PhoneIcon} alt="Person" width={24} height={24} />
                    <FormContainer>
                        <InputContainer>
                            <input type="text" placeholder="+62xxxx"></input>
                        </InputContainer>
                        <OutlineButton style={{ alignSelf: "flex-end" }}>
                            Add More{" "}
                        </OutlineButton>
                    </FormContainer>
                </NameContainer>
            </CardContainer>
        </ContentContainer>
    );
}
