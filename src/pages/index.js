import Image from "next/image";
import { Inter } from "next/font/google";
import Zephyr from '@juspay/zephyr-sdk-web';
import NodeRSA from "node-rsa";

const inter = Inter({ subsets: ["latin"] });
const privateKey = `-----BEGIN PRIVATE KEY-----\nMIIBUwIBADANBgkqhkiG9w0BAQEFAASCAT0wggE5AgEAAkEAsJdmZvdP9AdObZuE\nj4FV/uEl8TBm6zJFAO05QidPtia2V6Y6LxCyZpA1tOl1+f1XZRB25Z3DBSHpBQjz\nljCm3QIDAQABAkAtk/YPL1fIgTZB3fjZ3STn8w6K8NYvcDsVISU9KM5PEcLEeyc4\nk7R+AbvFGJEATYhKpkTQJOeqtXmShMGnD2ZVAiEA5KvtIe2w91XetEFgi5D4I9dI\narbdb6C1SDGFo0dGuDsCIQDFshxpbP4gl34wHwDqZacCqqoqQ4UjOZtQWzBQRABD\nxwIgH7acV4VAcrzs+vDKM/DyCP51Y59izHVsTsvXbdKXwzsCIAcbZBIWLPyW9Z5d\nPvcuOFbMM9nZG4wsofy9insYNro5AiAqyaGfC0JUjW7gQpSmVhp/Nn0hKinwpRaB\n6Yg1ilTysg==\n-----END PRIVATE KEY-----`

export default function Home() {
  const initiatePayload = {
    merchantId: 'd2cstorebeta',
    shopUrl: 'http://localhost:3001',
    environment: 'production',
    shopPlatform: 'custom'
  };
  const stringifiedCart = JSON.stringify({
    initialPrice: 1000,
    totalPrice: 900,
    totalDiscount: 100,
    weight: 1000,
    itemCount: 2,
    currency: 'INR',
    items: [
      {
        id: '1',
        title: 'Item 1',
        variantTitle: 'Variant 1',
        variantId: '1',
        image: 'https://example.com/image1.jpg',
        weight: 500,
        quantity: 1,
        discount: 50,
        initialPrice: 500,
        finalPrice: 450
      },
      {
        id: '2',
        title: 'Item 2',
        variantTitle: 'Variant 2',
        variantId: '2',
        image: 'https://example.com/image2.jpg',
        weight: 500,
        quantity: 1,
        discount: 50,
        initialPrice: 500,
        finalPrice: 450
      }
    ]
  });
  const signingKey = new NodeRSA(privateKey, 'pkcs8-private-pem');
  Zephyr.initiate(initiatePayload);
  const onClickAction = (e) => {
    console.log(">>>Breeze button is clicked");
    const processPayload = {
      action: 'startCheckout',
      cart: stringifiedCart,
      utmParams: {
        utm_source: 'google',
        utm_medium: 'cpc',
        utm_campaign: 'summer-sale'
      },
      signature: signingKey.sign(stringifiedCart, 'base64')
    };
    
    Zephyr.process(processPayload);
  }
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">src/pages/index.js</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div>
        <button
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClickAction}
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Open Breeze{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
        </button>
      </div>
    </main>
  );
}
