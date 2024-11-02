import styled from 'styled-components'

const HorizontalRuleGradient = styled.hr`
  background: radial-gradient(ellipse 50% 50% at 50% 25%, #FFFFFF80 10%, transparent);
`;

type Props = {
  className?: string;
}

export default function HorizontalRule({
  className,
}: Props) {
  return (
    <HorizontalRuleGradient className={`${className} h-0.5 my-1 border-none`} />
  )
}