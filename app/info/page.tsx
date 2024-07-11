import Link from "next/link"
import { Navbar } from "@/components/component/navbar"
import Image from "next/image"

export default function Info() {
  return (
    <>
    <Navbar/>
    <main className="flex-1 bg-muted/40 py-8 md:py-12">
      <div className="container">
        <div className="mb-8 md:mb-12 flex justify-center">
          <h1 className="text-3xl font-bold md:text-4xl">Obrigado Pela Preferencia</h1>
        </div>
        <div className="grid gap-8 justify-center md:grid-cols-1 lg:grid-cols-1">
          <div className="flex flex-col items-center justify-center">
            <div className="mb-4 text-center">
              <h2 className="text-2xl font-bold">Apoie-nos</h2>
              <p className="text-muted-foreground">Ajude-nos a pagar nossa formatura.</p>
            </div>
            <Image
              src="/placeholder.svg"
              width={600}
              height={600}
              alt="QR Code"
              className="w-full max-w-[600px] rounded-lg"
            />
          </div>
          <div className="flex mt-8 flex-col items-center justify-center">
            <div className="mb-4 text-center">
              <h2 className="text-2xl font-bold">Kalebe</h2>
              <p className="text-muted-foreground">Criador do Site.</p>
            </div>
            <Image
              src="/placeholder.svg"
              width={300}
              height={300}
              alt="QR Code"
              className="w-full max-w-[300px] rounded-lg"
            />
            <div className="mt-4 flex gap-4">
              <Link href="#" className="text-muted-foreground hover:underline" prefetch={false}>
                <TwitterIcon className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:underline" prefetch={false}>
                <InstagramIcon className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:underline" prefetch={false}>
                <LinkedinIcon className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:underline" prefetch={false}>
                <GitlabIcon className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 md:mt-12 grid gap-8 justify-center md:grid-cols-2 lg:grid-cols-2">
          <div className="flex mt-8 flex-col items-center justify-center">
            <Image
              src="/placeholder.svg"
              width={300}
              height={300}
              alt="Assistente 1"
              className="w-full max-w-[300px] rounded-lg"
            />
            <div className="mt-4 text-center">
              <h3 className="text-xl font-bold">Vinícius</h3>
              <p className="text-muted-foreground">Assistente na criação do Site.</p>
              <div className="mt-4 flex gap-4">
                <Link href="#" className="text-muted-foreground hover:underline" prefetch={false}>
                  <TwitterIcon className="h-6 w-6" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:underline" prefetch={false}>
                  <InstagramIcon className="h-6 w-6" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:underline" prefetch={false}>
                  <LinkedinIcon className="h-6 w-6" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:underline" prefetch={false}>
                  <GitlabIcon className="h-6 w-6" />
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Image
              src="/placeholder.svg"
              width={300}
              height={300}
              alt="Assistente 2"
              className="w-full max-w-[300px] rounded-lg"
            />
            <div className="mt-4 text-center">
              <h3 className="text-xl font-bold">Eduan</h3>
              <p className="text-muted-foreground">Assistente na criação do Site.</p>
              <div className="mt-4 flex gap-4">
                <Link href="#" className="text-muted-foreground hover:underline" prefetch={false}>
                  <TwitterIcon className="h-6 w-6" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:underline" prefetch={false}>
                  <InstagramIcon className="h-6 w-6" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:underline" prefetch={false}>
                  <LinkedinIcon className="h-6 w-6" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:underline" prefetch={false}>
                  <GitlabIcon className="h-6 w-6" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    </>
  )
}

function GitlabIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 13.29-3.33-10a.42.42 0 0 0-.14-.18.38.38 0 0 0-.22-.11.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18l-2.26 6.67H8.32L6.1 3.26a.42.42 0 0 0-.1-.18.38.38 0 0 0-.26-.08.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18L2 13.29a.74.74 0 0 0 .27.83L12 21l9.69-6.88a.71.71 0 0 0 .31-.83Z" />
    </svg>
  )
}


function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}


function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}


function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}
