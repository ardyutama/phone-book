'use client'
/** @jsxImportSource @emotion/react */
import SearchIcon from "@/public/icons/search.svg"
import Image from 'next/image'
import InputContainer from './Input'

export default function Search () {
    return (
        <InputContainer>
            <Image src={SearchIcon} alt='Search' />
            <input type='text' placeholder='Cari Kontak...' ></input>
        </InputContainer>
    )
}