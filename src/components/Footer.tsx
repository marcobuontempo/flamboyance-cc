import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {}

export default function Footer({ }: Props) {
  return (
    <footer className='flex justify-between items-center w-full px-5 py-2 text-sm'>
      <span>2024 <span className=''>&copy;</span> flamboyance.cc</span>
      <div>
        <p>made with <span className=''>&hearts;</span></p>
        <a>open-sourced <FontAwesomeIcon icon={faGithub} /></a>
      </div>
    </footer>
  )
}