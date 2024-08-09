import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

import { APP_URL, LEGAL_COMPANY_NAME, LEGAL_DATE, LEGAL_LAST_UPDATED_DATE } from '~constants'

import { Button } from '~components/ui/Button'

function Legal() {
  const navigate = useNavigate()

  return (
    <div className="pt-4 md:pt-8 pb-32 bg-neutral-background">
      <div className="px-4 md:px-8 mx-auto container max-w-4xl">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go back
        </Button>
        <div className="mt-2 pt-8 px-8 bg-white border rounded-lg">
          <h2 className="mb-4 text-4xl font-bold">Privacy Policy</h2>
          <p>
            Your privacy is important to us. It is
            {' '}
            {LEGAL_COMPANY_NAME}
            &#39;s policy to respect your privacy and comply with any applicable law and regulation regarding any personal information we may collect about you, including across our website,
            {' '}
            <a
              className="underline"
              href={APP_URL}
            >
              {APP_URL}
            </a>
            , and other sites we own and operate.
            {' '}
          </p>
          <p>Personal information is any information about you which can be used to identify you. This includes information about you as a person (such as name, address, and date of birth), your devices, payment details, and even information about how you use a website or online service.</p>
          <p>In the event our site contains links to third-party sites and services, please be aware that those sites and services have their own privacy policies. After following a link to any third-party content, you should read their posted privacy policy information about how they collect and use personal information. This Privacy Policy does not apply to any of your activities after you leave our site.</p>
          <p>
            This policy is effective as of
            {' '}
            {LEGAL_DATE}
            .
          </p>
          <p>
            Last updated:
            {' '}
            {LEGAL_LAST_UPDATED_DATE}
            .
          </p>
          <h3 className="my-4 font-bold text-2xl">Information We Collect</h3>
          <p>Information we collect falls into one of two categories: &ldquo;voluntarily provided&rdquo; information and &ldquo;automatically collected&rdquo; information.</p>
          <p>&ldquo;Voluntarily provided&rdquo; information refers to any information you knowingly and actively provide us when using or participating in any of our services and promotions.</p>
          <p>&ldquo;Automatically collected&rdquo; information refers to any information automatically sent by your devices in the course of accessing our products and services.</p>
          <h4 className="my-4 font-bold text-xl">Log Data</h4>
          <p>When you visit our website, our servers may automatically log the standard data provided by your web browser. It may include your device’s Internet Protocol (IP) address, your browser type and version, the pages you visit, the time and date of your visit, the time spent on each page, and other details about your visit.</p>
          <p>Additionally, if you encounter certain errors while using the site, we may automatically collect data about the error and the circumstances surrounding its occurrence. This data may include technical details about your device, what you were trying to do when the error happened, and other technical information relating to the problem. You may or may not receive notice of such errors, even in the moment they occur, that they have occurred, or what the nature of the error is.</p>
          <p>Please be aware that while this information may not be personally identifying by itself, it may be possible to combine it with other data to personally identify individual persons.</p>
          <h4 className="my-4 font-bold text-xl">Device Data</h4>
          <p>When you visit our website or interact with our services, we may automatically collect data about your device, such as:</p>
          <ul className="list-disc list-inside my-4">
            <li>Device Type</li>
            <li>Operating System</li>
            <li>Unique device identifiers</li>
            <li>Device settings</li>
            <li>Geo-location data</li>
          </ul>
          <p>Data we collect can depend on the individual settings of your device and software. We recommend checking the policies of your device manufacturer or software provider to learn what information they make available to us.</p>
          <h4 className="my-4 font-bold text-xl">Personal Information</h4>
          <p>We may ask for personal information — for example, when you subscribe to our newsletter or when you contact us — which may include one or more of the following:</p>
          <ul className="list-disc list-inside my-4">
            <li>Name</li>
            <li>Email</li>
            <li>Social media profiles</li>
            <li>Date of birth</li>
            <li>Phone/mobile number</li>
            <li>Home/mailing address</li>
          </ul>
          <h4 className="my-4 font-bold text-xl">User-Generated Content</h4>
          <p>We consider &ldquo;user-generated content&rdquo; to be materials (text, image and/or video content) voluntarily supplied to us by our users for the purpose of publication, processing, or usage on our platform. All user-generated content is associated with the account or email address used to submit the materials.</p>
          <p>Please be aware that any content you submit for the purpose of publication will be public after posting (and subsequent review or vetting process). Once published, it may be accessible to third parties not covered under this privacy policy.</p>
          <h4 className="my-4 font-bold text-xl">Transaction Data</h4>
          <p>Transaction data refers to data that accumulates over the normal course of operation on our platform. This may include transaction records, stored files, user profiles, analytics data and other metrics, as well as other types of information, created or generated, as users interact with our services.</p>
          <h4 className="my-4 font-bold text-xl">Legitimate Reasons for Processing Your Personal Information</h4>
          <p>We only collect and use your personal information when we have a legitimate reason for doing so. In which instance, we only collect personal information that is reasonably necessary to provide our services to you.</p>
          <h4 className="my-4 font-bold text-xl">Collection and Use of Information</h4>
          <p>We may collect personal information from you when you do any of the following on our website:</p>
          <ul className="list-disc list-inside my-4">
            <li>Register for an account</li>
            <li>Purchase a subscription</li>
            <li>Enter any of our competitions, contests, sweepstakes, and surveys</li>
            <li>Sign up to receive updates from us via email or social media channels</li>
            <li>Use a mobile device or web browser to access our content</li>
            <li>Contact us via email, social media, or on any similar technologies</li>
            <li>When you mention us on social media</li>
          </ul>
          <p>We may collect, hold, use, and disclose information for the following purposes, and personal information will not be further processed in a manner that is incompatible with these purposes:</p>
          <ul className="list-disc list-inside my-4">
            <li>to provide you with our platform's core features and services</li>
            <li>to enable you to customize or personalize your experience of our website</li>
            <li>to deliver products and/or services to you</li>
            <li>to contact and communicate with you</li>
            <li>for analytics, market research, and business development, including to operate and improve our website, associated applications, and associated social media platforms</li>
            <li>for advertising and marketing, including to send you promotional information about our products and services and information about third parties that we consider may be of interest to you</li>
            <li>to consider your employment application</li>
            <li>to enable you to access and use our website, associated applications, and associated social media platforms</li>
            <li>for internal record keeping and administrative purposes</li>
            <li>to run competitions, sweepstakes, and/or offer additional benefits to you</li>
            <li>to comply with our legal obligations and resolve any disputes that we may have</li>
            <li>to attribute any content (e.g. posts and comments) you submit that we publish on our website</li>
            <li>for security and fraud prevention, and to ensure that our sites and apps are safe, secure, and used in line with our terms of use</li>
            <li>for technical assessment, including to operate and improve our app, associated applications, and associated social media platforms</li>
          </ul>
          <p>We may combine voluntarily provided and automatically collected personal information with general information or research data we receive from other trusted sources. For example, If you provide us with your location, we may combine this with general information about currency and language to provide you with an enhanced experience of our site and service.</p>
          <h4 className="my-4 font-bold text-xl">Security of Your Personal Information</h4>
          <p>When we collect and process personal information, and while we retain this information, we will protect it within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use, or modification.</p>
          <p>Although we will do our best to protect the personal information you provide to us, we advise that no method of electronic transmission or storage is 100% secure, and no one can guarantee absolute data security.</p>
          <p>You are responsible for selecting any password and its overall security strength, ensuring the security of your own information within the bounds of our services. For example, ensuring any passwords associated with accessing your personal information and accounts are secure and confidential.</p>
          <h4 className="my-4 font-bold text-xl">How Long We Keep Your Personal Information</h4>
          <p>We keep your personal information only for as long as we need to. This time period may depend on what we are using your information for, in accordance with this privacy policy. For example, if you have provided us with personal information as part of creating an account with us, we may retain this information for the duration your account exists on our system. If your personal information is no longer required for this purpose, we will delete it or make it anonymous by removing all details that identify you.</p>
          <p>However, if necessary, we may retain your personal information for our compliance with a legal, accounting, or reporting obligation or for archiving purposes in the public interest, scientific, or historical research purposes or statistical purposes.</p>
          <h3 className="my-4 font-bold text-2xl">Children’s Privacy</h3>
          <p>We do not aim any of our products or services directly at children under the age of 13, and we do not knowingly collect personal information about children under 13.</p>
          <h3 className="my-4 font-bold text-2xl">Disclosure of Personal Information to Third Parties</h3>
          <p>We may disclose personal information to:</p>
          <ul className="list-disc list-inside my-4">
            <li>a parent, subsidiary, or affiliate of our company</li>
            <li>third-party service providers for the purpose of enabling them to provide their services, including (without limitation) IT service providers, data storage, hosting and server providers, analytics, error loggers, debt collectors, maintenance or problem-solving providers, professional advisors, and payment systems operators</li>
            <li>our employees, contractors, and/or related entities</li>
            <li>our existing or potential agents or business partners</li>
            <li>sponsors or promoters of any competition, sweepstakes, or promotion we run</li>
            <li>credit reporting agencies, courts, tribunals, and regulatory authorities, in the event you fail to pay for goods or services we have provided to you</li>
            <li>courts, tribunals, regulatory authorities, and law enforcement officers, as required by law, in connection with any actual or prospective legal proceedings, or in order to establish, exercise, or defend our legal rights</li>
            <li>third parties, including agents or sub-contractors, who assist us in providing information, products, services, or direct marketing to you</li>
            <li>third parties to collect and process data</li>
            <li>an entity that buys, or to which we transfer all or substantially all of our assets and business</li>
          </ul>
          <p>Third parties we currently use include:</p>
          <ul className="list-disc list-inside my-4">
            <li>Google Analytics</li>
            <li>Stripe</li>
          </ul>
          <h3 className="my-4 font-bold text-2xl">International Transfers of Personal Information</h3>
          <p>The personal information we collect is stored and/or processed in France, or where we or our partners, affiliates, and third-party providers maintain facilities.</p>
          <p>The countries to which we store, process, or transfer your personal information may not have the same data protection laws as the country in which you initially provided the information. If we transfer your personal information to third parties in other countries: (i) we will perform those transfers in accordance with the requirements of applicable law; and (ii) we will protect the transferred personal information in accordance with this privacy policy.</p>
          <h3 className="my-4 font-bold text-2xl">Your Rights and Controlling Your Personal Information</h3>
          <p>
            <strong>Your choice:</strong>
            {' '}
            By providing personal information to us, you understand we will collect, hold, use, and disclose your personal information in accordance with this privacy policy. You do not have to provide personal information to us, however, if you do not, it may affect your use of our website or the products and/or services offered on or through it.
            {' '}
          </p>
          <p>
            <strong>Information from third parties:</strong>
            {' '}
            If we receive personal information about you from a third party, we will protect it as set out in this privacy policy. If you are a third party providing personal information about somebody else, you represent and warrant that you have such person’s consent to provide the personal information to us.
            {' '}
          </p>
          <p>
            <strong>Marketing permission:</strong>
            {' '}
            If you have previously agreed to us using your personal information for direct marketing purposes, you may change your mind at any time by contacting us using the details below.
            {' '}
          </p>
          <p>
            <strong>Access:</strong>
            {' '}
            You may request details of the personal information that we hold about you.
            {' '}
          </p>
          <p>
            <strong>Correction:</strong>
            {' '}
            If you believe that any information we hold about you is inaccurate, out of date, incomplete, irrelevant, or misleading, please contact us using the details provided in this privacy policy. We will take reasonable steps to correct any information found to be inaccurate, incomplete, misleading, or out of date.
            {' '}
          </p>
          <p>
            <strong>Non-discrimination:</strong>
            {' '}
            We will not discriminate against you for exercising any of your rights over your personal information. Unless your personal information is required to provide you with a particular service or offer (for example processing transaction data), we will not deny you goods or services and/or charge you different prices or rates for goods or services, including through granting discounts or other benefits, or imposing penalties, or provide you with a different level or quality of goods or services.
            {' '}
          </p>
          <p>
            <strong>Downloading of Personal Information:</strong>
            {' '}
            We provide a means for you to download the personal information you have shared through our site. Please contact us for more information.
            {' '}
          </p>
          <p>
            <strong>Notification of data breaches:</strong>
            {' '}
            We will comply with laws applicable to us in respect of any data breach.
            {' '}
          </p>
          <p>
            <strong>Complaints:</strong>
            {' '}
            If you believe that we have breached a relevant data protection law and wish to make a complaint, please contact us using the details below and provide us with full details of the alleged breach. We will promptly investigate your complaint and respond to you, in writing, setting out the outcome of our investigation and the steps we will take to deal with your complaint. You also have the right to contact a regulatory body or data protection authority in relation to your complaint.
            {' '}
          </p>
          <p>
            <strong>Unsubscribe:</strong>
            {' '}
            To unsubscribe from our email database or opt-out of communications (including marketing communications), please contact us using the details provided in this privacy policy, or opt-out using the opt-out facilities provided in the communication. We may need to request specific information from you to help us confirm your identity.
            {' '}
          </p>
          <h3 className="my-4 font-bold text-2xl">Use of Cookies</h3>
          <p>We use &ldquo;cookies&rdquo; to collect information about you and your activity across our site. A cookie is a small piece of data that our website stores on your computer, and accesses each time you visit, so we can understand how you use our site. This helps us serve you content based on preferences you have specified.</p>
          <p>Please refer to our Cookie Policy for more information.</p>
          <h3 className="my-4 font-bold text-2xl">Business Transfers</h3>
          <p>If we or our assets are acquired, or in the unlikely event that we go out of business or enter bankruptcy, we would include data, including your personal information, among the assets transferred to any parties who acquire us. You acknowledge that such transfers may occur, and that any parties who acquire us may, to the extent permitted by applicable law, continue to use your personal information according to this policy, which they will be required to assume as it is the basis for any ownership or use rights we have over such information.</p>
          <h3 className="my-4 font-bold text-2xl">Limits of Our Policy</h3>
          <p>Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and policies of those sites, and cannot accept responsibility or liability for their respective privacy practices.</p>
          <h3 className="my-4 font-bold text-2xl">Changes to This Policy</h3>
          <p>At our discretion, we may change our privacy policy to reflect updates to our business processes, current acceptable practices, or legislative or regulatory changes. If we decide to change this privacy policy, we will post the changes here at the same link by which you are accessing this privacy policy.</p>
          <p>If the changes are significant, or if required by applicable law, we will contact you (based on your selected preferences for communications from us) and all our registered users with the new details and links to the updated or changed policy.</p>
          <p>If required by law, we will get your permission or give you the opportunity to opt in to or opt out of, as applicable, any new uses of your personal information.</p>
          <h3 className="my-4 font-bold text-2xl">Contact Us</h3>
          <p>For any questions or concerns regarding your privacy, you may contact us using the following details:</p>
          <p>
            David Hérault
            <br />
            david@herostrategy.com
          </p>
          <h2 className="text-4xl font-bold my-4">Terms of Service</h2>
          <p>
            These Terms of Service govern your use of the website located at
            {' '}
            <a
              className="underline"
              href={APP_URL}
            >
              {APP_URL}
            </a>
            {' '}
            and any related services provided by
            {' '}
            {LEGAL_COMPANY_NAME}
            .
            {' '}
          </p>
          <p>
            By accessing
            {' '}
            <a
              className="underline"
              href={APP_URL}
            >
              {APP_URL}
            </a>
            , you agree to abide by these Terms of Service and to comply with all applicable laws and regulations. If you do not agree with these Terms of Service, you are prohibited from using or accessing this website or using any other services provided by
            {' '}
            {LEGAL_COMPANY_NAME}
            .
            {' '}
          </p>
          <p>
            We,
            {' '}
            {LEGAL_COMPANY_NAME}
            , reserve the right to review and amend any of these Terms of Service at our sole discretion. Upon doing so, we will update this page. Any changes to these Terms of Service will take effect immediately from the date of publication.
          </p>
          <p>
            These Terms of Service were last updated on
            {' '}
            {LEGAL_LAST_UPDATED_DATE}
            .
          </p>
          <h3 className="my-4 font-bold text-2xl">Limitations of Use</h3>
          <p>By using this website, you warrant on behalf of yourself, your users, and other parties you represent that you will not:</p>
          <ol>
            <li>modify, copy, prepare derivative works of, decompile, or reverse engineer any materials and software contained on this website;</li>
            <li>remove any copyright or other proprietary notations from any materials and software on this website;</li>
            <li>transfer the materials to another person or “mirror” the materials on any other server;</li>
            <li>
              knowingly or negligently use this website or any of its associated services in a way that abuses or disrupts our networks or any other service
              {' '}
              {LEGAL_COMPANY_NAME}
              {' '}
              provides;
            </li>
            <li>use this website or its associated services to transmit or publish any harassing, indecent, obscene, fraudulent, or unlawful material;</li>
            <li>use this website or its associated services in violation of any applicable laws or regulations;</li>
            <li>use this website in conjunction with sending unauthorized advertising or spam;</li>
            <li>harvest, collect, or gather user data without the user’s consent; or</li>
            <li>use this website or its associated services in such a way that may infringe the privacy, intellectual property rights, or other rights of third parties.</li>
          </ol>
          <h3 className="my-4 font-bold text-2xl">Intellectual Property</h3>
          <p>
            The intellectual property in the materials contained in this website are owned by or licensed to
            {' '}
            {LEGAL_COMPANY_NAME}
            {' '}
            and are protected by applicable copyright and trademark law. We grant our users permission to download one copy of the materials for personal, non-commercial transitory use.
          </p>
          <p>
            This constitutes the grant of a license, not a transfer of title. This license shall automatically terminate if you violate any of these restrictions or the Terms of Service, and may be terminated by
            {' '}
            {LEGAL_COMPANY_NAME}
            {' '}
            at any time.
          </p>
          <h3 className="my-4 font-bold text-2xl">User-Generated Content</h3>
          <p>You retain your intellectual property ownership rights over content you submit to us for publication on our website. We will never claim ownership of your content, but we do require a license from you in order to use it.</p>
          <p>When you use our website or its associated services to post, upload, share, or otherwise transmit content covered by intellectual property rights, you grant to us a non-exclusive, royalty-free, transferable, sub-licensable, worldwide license to use, distribute, modify, run, copy, publicly display, translate, or otherwise create derivative works of your content in a manner that is consistent with your privacy preferences and our Privacy Policy.</p>
          <p>The license you grant us can be terminated at any time by deleting your content or account. However, to the extent that we (or our partners) have used your content in connection with commercial or sponsored content, the license will continue until the relevant commercial or post has been discontinued by us.</p>
          <p>You give us permission to use your username and other identifying information associated with your account in a manner that is consistent with your privacy preferences, and our Privacy Policy.</p>
          <h3 className="my-4 font-bold text-2xl">Liability</h3>
          <p>
            Our website and the materials on our website are provided on an 'as is' basis. To the extent permitted by law,
            {' '}
            {LEGAL_COMPANY_NAME}
            {' '}
            makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property, or other violation of rights.
          </p>
          <p>
            In no event shall
            {' '}
            {LEGAL_COMPANY_NAME}
            {' '}
            or its suppliers be liable for any consequential loss suffered or incurred by you or any third party arising from the use or inability to use this website or the materials on this website, even if
            {' '}
            {LEGAL_COMPANY_NAME}
            {' '}
            or an authorized representative has been notified, orally or in writing, of the possibility of such damage.
          </p>
          <p>In the context of this agreement, &ldquo;consequential loss&rdquo; includes any consequential loss, indirect loss, real or anticipated loss of profit, loss of benefit, loss of revenue, loss of business, loss of goodwill, loss of opportunity, loss of savings, loss of reputation, loss of use and/or loss or corruption of data, whether under statute, contract, equity, tort (including negligence), indemnity, or otherwise.</p>
          <p>Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.</p>
          <h3 className="my-4 font-bold text-2xl">Accuracy of Materials</h3>
          <p>
            The materials appearing on our website are not comprehensive and are for general information purposes only.
            {' '}
            {LEGAL_COMPANY_NAME}
            {' '}
            does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on this website, or otherwise relating to such materials or on any resources linked to this website.
          </p>
          <h3 className="my-4 font-bold text-2xl">Links</h3>
          <p>
            {LEGAL_COMPANY_NAME}
            {' '}
            has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement, approval, or control by
            {' '}
            {LEGAL_COMPANY_NAME}
            {' '}
            of the site. Use of any such linked site is at your own risk and we strongly advise you make your own investigations with respect to the suitability of those sites.
          </p>
          <h3 className="my-4 font-bold text-2xl">Right to Terminate</h3>
          <p>We may suspend or terminate your right to use our website and terminate these Terms of Service immediately upon written notice to you for any breach of these Terms of Service.</p>
          <h3 className="my-4 font-bold text-2xl">Severance</h3>
          <p>Any term of these Terms of Service which is wholly or partially void or unenforceable is severed to the extent that it is void or unenforceable. The validity of the remainder of these Terms of Service is not affected.</p>
          <h3 className="my-4 font-bold text-2xl">Governing Law</h3>
          <p>These Terms of Service are governed by and construed in accordance with the laws of France. You irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>
          <h2 className="text-4xl font-bold my-4">Cookie Policy</h2>
          <p>
            We use cookies to help improve your experience of our website at
            {' '}
            <a
              className="underline"
              href={APP_URL}
            >
              {APP_URL}
            </a>
            . This cookie policy is part of
            {' '}
            {LEGAL_COMPANY_NAME}
            &#39;s privacy policy. It covers the use of cookies between your device and our site.
            {' '}
          </p>
          <p>We also provide basic information on third-party services we may use, who may also use cookies as part of their service. This policy does not cover their cookies.</p>
          <p>
            If you don’t wish to accept cookies from us, you should instruct your browser to refuse cookies from
            {' '}
            <a
              className="underline"
              href={APP_URL}
            >
              {APP_URL}
            </a>
            . In such a case, we may be unable to provide you with some of your desired content and services.
            {' '}
          </p>
          <h3 className="my-4 font-bold text-2xl">What is a cookie?</h3>
          <p>A cookie is a small piece of data that a website stores on your device when you visit. It typically contains information about the website itself, a unique identifier that allows the site to recognize your web browser when you return, additional data that serves the cookie’s purpose, and the lifespan of the cookie itself.</p>
          <p>Cookies are used to enable certain features (e.g. logging in), track site usage (e.g. analytics), store your user settings (e.g. time zone, notification preferences), and to personalize your content (e.g. advertising, language).</p>
          <p>Cookies set by the website you are visiting are usually referred to as first-party cookies. They typically only track your activity on that particular site.</p>
          <p>Cookies set by other sites and companies (i.e. third parties) are called third-party cookies They can be used to track you on other websites that use the same third-party service.</p>
          <h3 className="my-4 font-bold text-2xl">Types of cookies and how we use them</h3>
          <h4 className="my-4 font-bold text-xl">Essential cookies</h4>
          <p>Essential cookies are crucial to your experience of a website, enabling core features like user logins, account management, shopping carts, and payment processing.</p>
          <p>We use essential cookies to enable certain functions on our website.</p>
          <h4 className="my-4 font-bold text-xl">Performance cookies</h4>
          <p>Performance cookies track how you use a website during your visit. Typically, this information is anonymous and aggregated, with information tracked across all site users. They help companies understand visitor usage patterns, identify and diagnose problems or errors their users may encounter, and make better strategic decisions in improving their audience’s overall website experience. These cookies may be set by the website you’re visiting (first-party) or by third-party services. They do not collect personal information about you.</p>
          <p>We use performance cookies on our site.</p>
          <h4 className="my-4 font-bold text-xl">Functionality cookies</h4>
          <p>Functionality cookies are used to collect information about your device and any settings you may configure on the website you’re visiting (like language and time zone settings). With this information, websites can provide you with customized, enhanced, or optimized content and services. These cookies may be set by the website you’re visiting (first-party) or by third-party services.</p>
          <p>We use functionality cookies for selected features on our site.</p>
          <h4 className="my-4 font-bold text-xl">Targeting/advertising cookies</h4>
          <p>Targeting/advertising cookies help determine what promotional content is most relevant and appropriate to you and your interests. Websites may use them to deliver targeted advertising or limit the number of times you see an advertisement. This helps companies improve the effectiveness of their campaigns and the quality of content presented to you. These cookies may be set by the website you’re visiting (first-party) or by third-party services. Targeting/advertising cookies set by third-parties may be used to track you on other websites that use the same third-party service.</p>
          <p>We use targeting/advertising cookies on our site.</p>
          <h2 className="text-xl font-bold my-4">Acceptable Use Policy</h2>
          <p>
            This acceptable use policy covers the products, services, and technologies (collectively referred to as the &ldquo;Products&rdquo;) provided by
            {' '}
            {LEGAL_COMPANY_NAME}
            {' '}
            under any ongoing agreement. It’s designed to protect us, our customers, and the general Internet community from unethical, irresponsible, and illegal activity.
          </p>
          <p>
            {LEGAL_COMPANY_NAME}
            {' '}
            customers found engaging in activities prohibited by this acceptable use policy can be liable for service suspension and account termination. In extreme cases, we may be legally obliged to report such customers to the relevant authorities.
          </p>
          <p>
            This policy was last reviewed on
            {' '}
            {LEGAL_LAST_UPDATED_DATE}
            .
          </p>
          <h3 className="my-4 font-bold text-2xl">Fair use</h3>
          <p>We provide our facilities with the assumption your use will be &ldquo;business as usual&rdquo;, as per our offer schedule. If your use is considered to be excessive, then additional fees may be charged, or capacity may be restricted.</p>
          <p>We are opposed to all forms of abuse, discrimination, rights infringement, and/or any action that harms or disadvantages any group, individual, or resource. We expect our customers and, where applicable, their users (&ldquo;end-users&rdquo;) to likewise engage our Products with similar intent.</p>
          <h3 className="my-4 font-bold text-2xl">Customer accountability</h3>
          <p>We regard our customers as being responsible for their own actions as well as for the actions of anyone using our Products with the customer’s permission. This responsibility also applies to anyone using our Products on an unauthorized basis as a result of the customer’s failure to put in place reasonable security measures.</p>
          <p>By accepting Products from us, our customers agree to ensure adherence to this policy on behalf of anyone using the Products as their end users. Complaints regarding the actions of customers or their end-users will be forwarded to the nominated contact for the account in question.</p>
          <p>If a customer — or their end-user or anyone using our Products as a result of the customer — violates our acceptable use policy, we reserve the right to terminate any Products associated with the offending account or the account itself or take any remedial or preventative action we deem appropriate, without notice. To the extent permitted by law, no credit will be available for interruptions of service resulting from any violation of our acceptable use policy.</p>
          <h3 className="my-4 font-bold text-2xl">Prohibited activity</h3>
          <h4 className="my-4 font-bold text-xl">Copyright infringement and access to unauthorized material</h4>
          <p>Our Products must not be used to transmit, distribute or store any material in violation of any applicable law. This includes but isn’t limited to:</p>
          <ol type="i">
            <li>any material protected by copyright, trademark, trade secret, or other intellectual property right used without proper authorization, and</li>
            <li>any material that is obscene, defamatory, constitutes an illegal threat or violates export control laws.</li>
          </ol>
          <p>The customer is solely responsible for all material they input, upload, disseminate, transmit, create or publish through or on our Products, and for obtaining legal permission to use any works included in such material.</p>
          <h4 className="my-4 font-bold text-xl">SPAM and unauthorized message activity</h4>
          <p>Our Products must not be used for the purpose of sending unsolicited bulk or commercial messages in violation of the laws and regulations applicable to your jurisdiction (“spam”). This includes but isn’t limited to sending spam, soliciting customers from spam sent from other service providers, and collecting replies to spam sent from other service providers.</p>
          <p>Our Products must not be used for the purpose of running unconfirmed mailing lists or telephone number lists (&ldquo;messaging lists&rdquo;). This includes but isn’t limited to subscribing email addresses or telephone numbers to any messaging list without the permission of the email address or telephone number owner, and storing any email addresses or telephone numbers subscribed in this way. All messaging lists run on or hosted by our Products must be &ldquo;confirmed opt-in&rdquo;. Verification of the address or telephone number owner’s express permission must be available for the lifespan of the messaging list.</p>
          <p>We prohibit the use of email lists, telephone number lists or databases purchased from third parties intended for spam or unconfirmed messaging list purposes on our Products.</p>
          <p>This spam and unauthorized message activity policy applies to messages sent using our Products, or to messages sent from any network by the customer or any person on the customer’s behalf, that directly or indirectly refer the recipient to a site hosted via our Products.</p>
          <h4 className="my-4 font-bold text-xl">Unethical, exploitative, and malicious activity</h4>
          <p>Our Products must not be used for the purpose of advertising, transmitting, or otherwise making available any software, program, product, or service designed to violate this acceptable use policy, or the acceptable use policy of other service providers. This includes but isn’t limited to facilitating the means to send spam and the initiation of network sniffing, pinging, packet spoofing, flooding, mail-bombing, and denial-of-service attacks.</p>
          <p>Our Products must not be used to access any account or electronic resource where the group or individual attempting to gain access does not own or is not authorized to access the resource (e.g. &ldquo;hacking&rdquo;, &ldquo;cracking&rdquo;, &ldquo;phreaking&rdquo;, etc.).</p>
          <p>Our Products must not be used for the purpose of intentionally or recklessly introducing viruses or malicious code into our Products and systems.</p>
          <p>Our Products must not be used for purposely engaging in activities designed to harass another group or individual. Our definition of harassment includes but is not limited to denial-of-service attacks, hate-speech, advocacy of racial or ethnic intolerance, and any activity intended to threaten, abuse, infringe upon the rights of, or discriminate against any group or individual.</p>
          <p>Other activities considered unethical, exploitative, and malicious include:</p>
          <ol>
            <li>Obtaining (or attempting to obtain) services from us with the intent to avoid payment;</li>
            <li>Using our facilities to obtain (or attempt to obtain) services from another provider with the intent to avoid payment;</li>
            <li>The unauthorized access, alteration, or destruction (or any attempt thereof) of any information about our customers or end-users, by any means or device;</li>
            <li>Using our facilities to interfere with the use of our facilities and network by other customers or authorized individuals;</li>
            <li>Publishing or transmitting any content of links that incite violence, depict a violent act, depict child pornography, or threaten anyone’s health and safety;</li>
            <li>Any act or omission in violation of consumer protection laws and regulations;</li>
            <li>Any violation of a person's privacy.</li>
          </ol>
          <p>Our Products may not be used by any person or entity, which is involved with or suspected of involvement in activities or causes relating to illegal gambling; terrorism; narcotics trafficking; arms trafficking or the proliferation, development, design, manufacture, production, stockpiling, or use of nuclear, chemical or biological weapons, weapons of mass destruction, or missiles; in each case including any affiliation with others whatsoever who support the above such activities or causes.</p>
          <h4 className="my-4 font-bold text-xl">
            Unauthorized use of
            {' '}
            {LEGAL_COMPANY_NAME}
            {' '}
            property
          </h4>
          <p>
            We prohibit the impersonation of
            {' '}
            {LEGAL_COMPANY_NAME}
            {' '}
            , the representation of a significant business relationship with
            {' '}
            {LEGAL_COMPANY_NAME}
            {' '}
            , or ownership of any
            {' '}
            {LEGAL_COMPANY_NAME}
            {' '}
            property (including our Products and brand) for the purpose of fraudulently gaining service, custom, patronage, or user trust.
          </p>
          <h3 className="my-4 font-bold text-2xl">About this policy</h3>
          <p>This policy outlines a non-exclusive list of activities and intent we deem unacceptable and incompatible with our brand.</p>
          <p>We reserve the right to modify this policy at any time by publishing the revised version on our website. The revised version will be effective from the earlier of:</p>
          <ul className="list-disc list-inside my-4">
            <li>the date the customer uses our Products after we publish the revised version on our website; or</li>
            <li>30 days after we publish the revised version on our website.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Legal
