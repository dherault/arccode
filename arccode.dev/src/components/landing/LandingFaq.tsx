import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~components/ui/Accordion'

function LandingFaq() {
  return (
    <section className="pt-16 md:pt-32 pb-8 md:pb-16 container max-w-[calc(1024px+64px)]">
      <div className="font-semibold">
        Frequently Asked Questions
      </div>
      <Accordion
        type="multiple"
        className="mt-4"
      >
        <AccordionItem value="what">
          <AccordionTrigger>
            What is Arccode?
          </AccordionTrigger>
          <AccordionContent>
            Arccode is a game — nothing more, nothing less. Only those who code are able to play it.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="how">
          <AccordionTrigger>
            How does it work?
          </AccordionTrigger>
          <AccordionContent>
            Arccode works through a VSCode extension that reads your code and counts keywords such as `function`, `const`, or `true`.
            Your progress in the game is determined by the number of keywords you produce each day.
            I no way does Arccode uploads your code to a server.
            You can check its
            {' '}
            <a
              href="https://github.com/dherault/arccode"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue hover:underline"
            >
              source code
            </a>
            {' '}
            to be sure.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="extension">
          <AccordionTrigger>
            Do I need to install the Arccode VSCode extension to play?
          </AccordionTrigger>
          <AccordionContent>
            Yes, installing the Arccode VSCode extension is necessary for the game to function.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="languages">
          <AccordionTrigger>
            What programming languages are compatible with Arccode?
          </AccordionTrigger>
          <AccordionContent>
            So far Arccode reads from JavaScript, TypeScript, Python, Java, C, C++, C#, Ruby, Php and Go. Please
            {' '}
            <a
              href="https://github.com/dherault/arccode"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue hover:underline"
            >
              post an issue or open a PR
            </a>
            {' '}
            to add more languages.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="github">
          <AccordionTrigger>
            Is Arccode open-source?
          </AccordionTrigger>
          <AccordionContent>
            Yes,
            {' '}
            <a
              href="https://github.com/dherault/arccode"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue hover:underline"
            >
              hosted on GitHub
            </a>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  )
}

// What is Arccode?

// Arccode is a game — nothing more, nothing less. Only those who code are able to play it.

// How does it work?

// Arccode functions through a VSCode extension that reads your code and counts keywords such as `function`, `const`, or `true`. Your progress in the game is determined by the number of keywords you produce each day. I no way does Arccode uploads your code to a server. You can check its source code to be sure.

// Do I need to install the Arccode VSCode extension to play?

// Yes, installing the Arccode VSCode extension is necessary for the game to function.

// What programming languages are compatible with Arccode?

// So far Arccode reads from JavaScript, TypeScript, Python, Java, C, C++, C#, Ruby, Php and Go. Please post an issue or open a PR to add more languages.

// Is Arccode open-source?

// Yes, hosted on GitHub (link)

export default LandingFaq
