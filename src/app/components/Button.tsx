'use client'
import styled from 'styled-components'
import Link from 'next/link'

const Button = styled.a`
    display: inline-block;
    padding: 8px 16px;
    border-radius: 16px;
    text-decoration: none;
    border: none;
    font-size: 16px;
`
export const PrimaryButton = styled(Button)`
    background: var(--blue);
    color: white;
`
export const WarningButton = styled(Button)`
    background: var(--yellow);
    color: white;
`

export const DangerButton = styled(Button)`
    background: var(--red);
    color: white;
`

export const OutlineButton = styled(Button)`
    background: white;
    color: var(--blue);
    border: 1px solid var(--blue);
`
export default function ButtonLink ({className, href, children}: {className: string,href:string, children: React.ReactNode}) {
    return (
        <Link className={className} href={href}>
            <Button>{children}</Button>
        </Link>
    )
}