type Props = {
  value: string;
}

export default function TruncatedTextCell({ value }: Props) {
  const text = value.length <= 8 ? value : `${value.substring(0, 4)}...${value.substring(value.length - 4, value.length)}`;

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(value)
  };

  return (
    <p className={`underline cursor-pointer hover:font-medium`} onClick={handleCopyToClipboard}>{text}</p>
  )
}