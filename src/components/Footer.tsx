import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {}

export default function Footer({ }: Props) {
  return (
    <footer className='flex justify-between items-center w-full px-5 py-2 text-sm border-black border-solid border-t-2 bg-cyan-600 text-cyan-50 sm:m-0 mt-5'>
      <span>2024 <span className=''>&copy;</span> flamboyance.cc</span>
      <div>
        <p>made with <span className=''>&hearts;</span></p>
        <a className='hover:text-cyan-300' href='https://github.com/marcobuontempo/flamboyance-cc/' target='_blank' referrerPolicy='no-referrer'>open-sourced <FontAwesomeIcon icon={faGithub} /></a>
      </div>
    </footer>
  )
}