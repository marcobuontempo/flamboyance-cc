import styled from 'styled-components'

const HorizontalRuleGradient = styled.hr`
  background: radial-gradient(circle, #FFF 8%, transparent);
`;

type Props = {
  className?: string;
}

export default function HorizontalRule({
  className,
}: Props) {
  return (
    <HorizontalRuleGradient className={`h-0.5 border-none ${className}`} />
  )
}