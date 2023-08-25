'use client'
import SearchIcon from "@/public/icons/search.svg"
import Image from 'next/image'
import InputContainer from '@/components/Input'

export default function Search ({}) {
    return (
        <InputContainer>
            <Image src={SearchIcon} alt='Search' />
            <input type='text' placeholder='Cari Kontak...'  onChange={(event) => event.target.value}/>
        </InputContainer>
    )
}