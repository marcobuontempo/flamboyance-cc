import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  0% {
    transform: scaleX(1) scaleY(1);
  }
  25% {
    transform: scaleX(-1) scaleY(1);
  }
  50% {
    transform: scaleX(-1) scaleY(-1);
  }
  75% {
    transform: scaleX(1) scaleY(-1);
  }
`

const Spinner = styled.img`
  animation: ${spin} 4s linear infinite;
`;

type Props = {
  className?: string;
}

export default function LoadingSpinner({ className }: Props) {
  return (
    <div className={`flex flex-col justify-center items-center min-w-full min-h-full ${className}`}>
      <Spinner src='/images/logo.png' height={50} width={50} />
      <p className='text-sm'>loading...</p>
    </div>
  )
}