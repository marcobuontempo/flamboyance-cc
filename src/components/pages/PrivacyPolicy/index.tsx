import MainWrapper from '@/components/common/MainWrapper'

type Props = {}

export default function PrivacyPolicyPage({ }: Props) {
  return (
    <MainWrapper title="Privacy Policy">
      <p>Thank you for visiting flamboyance.cc ("we", "us", or "our"). Your privacy is important to us. This Privacy Policy explains what information we collect, how we use it, and your rights in relation to it.</p>

      <ol className='py-2 flex flex-col gap-2'>
        <li>
          <h2 className='font-bold underline'>What We Collect</h2>
          <p>We do not collect any personal information such as names, email addresses, wallet addresses, or other identifying data. The website is a user-focused analytics dashboard that displays data from Flamingo Finance, a decentralized finance (DeFi) protocol, and does not require user accounts or logins. If you ever wish to remove your locally-stored wallet address, this option is available in the 'Settings' section (or use your browser to clear the data).</p>
        </li>
        <li>
          <h2 className='font-bold underline'>Analytics</h2>
          <p>We use Simple Analytics to understand general usage patterns and improve the website. Simple Analytics is a <a className='text-purple-primary underline' href='https://simpleanalytics.com/privacy' referrerPolicy='no-referrer' target='_blank'>privacy-first analytics provider</a>.</p>
        </li>
        <li>
          <h2 className='font-bold underline'>Third Parties</h2>
          <p>We do not share any data with third parties, and we do not use any other third-party trackers or advertising services except those explicitly mentioned in this document. As part of the functionality of the site in fetching data, requests are made to the <a className='text-purple-primary underline' href='https://neo-api.b-cdn.net/docs#/' referrerPolicy='no-referrer' target='_blank'>NEO DATA API</a>.
          </p>
        </li>
        <li>
          <h2 className='font-bold underline'>Data Security</h2>
          <p>Although we do not collect or store personal data, we take reasonable steps to ensure that any service providers we use (such as hosting and analytics) follow best practices in data security.</p>
        </li>
        <li>
          <h2 className='font-bold underline'>Your Rights</h2>
          <p>Since we do not collect personal information, there is nothing to request, delete, or export. However, if you have concerns about privacy or data use, you can reach out to us.</p>
        </li>
        <li>
          <h2 className='font-bold underline'>Contact</h2>
          <p>For questions about this policy, please make a request through the <a className='text-purple-primary underline' href='https://github.com/marcobuontempo/flamboyance-cc' referrerPolicy='no-referrer' target='_blank'>GitHub</a>.</p>
        </li>
        <li>
          <h2 className='font-bold underline'>Changes</h2>
          <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.</p>
        </li>
      </ol>
    </MainWrapper >
  )
}