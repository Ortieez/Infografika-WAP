"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowBigDown, ArrowDownCircle } from "lucide-react"
import { codeToHtml } from "shiki"

import { siteConfig } from "@/config/site"
import { Button, buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const codeSnippets = [
  `gh pr status
  
  Relevant pull requests in cli/cli
  
  Current branch
  There is no pull request associated with [fix-homepage-bug]
  
  Created by you
  You have no open pull requests
  
  Requesting a code review from you
  #100 Fix footer on homepage [fix-homepage-footer]
  ✓ Checks passing - Review pending`,
  ` gh issue list

  Showing 4 of 4 issues in cli/cli
  
  #16 Improving interactions with protected branches
  #14 PR commands on a detached head
  #13 Support for GitHub Enterprise (enhancement)
  #8 Add an easier upgrade command (bug)`,
  `gh pr checkout 12
  remote: Enumerating objects: 66, done.
  remote: Counting objects: 100% (66/66), done.
  remote: Total 83 (delta 66), reused 66 (delta 66), pack-reused 17
  Unpacking objects: 100% (83/83), done.
  From https://github.com/owner/repo
  * [new ref] refs/pull/8896/head -> patch-2
  M README.md
  Switched to branch 'patch-2'`,
]

const names = [
  {
    command: "gh pr status",
    description: "List pull requests",
  },
  {
    command: "gh issue list",
    description: "List issues",
  },
  {
    command: "gh pr checkout 12",
    description: "Checkout a pull request",
  },
]

export default function IndexPage() {
  const [raw, setRaw] = useState(codeSnippets[0])
  const [code, setCode] = useState({ __html: "" })
  const [loadingCode, setLoadingCode] = useState(true)

  useEffect(() => {
    const convertStuff = async () => {
      setLoadingCode(true)
      const html = await codeToHtml(raw, {
        lang: "shell",
        theme: "ayu-dark",
      })
      setCode({ __html: html })
      setLoadingCode(false)
    }

    convertStuff()
  }, [raw])

  const [currentIndex, setCurrentIndex] = useState(0)

  const switchCode = (index: number) => {
    if (index < 0) {
      index = codeSnippets.length - 1
    }

    if (index >= codeSnippets.length) {
      index = 0
    }

    setCurrentIndex(index)
    setRaw(codeSnippets[index])
  }

  return (
    <div>
      <main className="hidden md:block">
        <div className="h-svh">
          <section
            className="flex h-[80svh] w-full flex-col flex-wrap content-center justify-center"
            id="top"
          >
            <div className="text-center">
              <h1 className="text-8xl font-bold">Github CLI</h1>
              <p className="mt-4 text-lg">
                Best tool for productivity with Github
              </p>
            </div>

            {loadingCode ? (
              <Skeleton className="mt-5 flex h-[360px] items-center justify-center rounded-md bg-secondary">
                Loading codeblock
              </Skeleton>
            ) : (
              <div>
                <div className="mt-5 flex w-full flex-col items-center justify-center gap-4">
                  <p className="rounded-xl bg-secondary p-5">
                    $ {names[currentIndex].command}
                  </p>
                  <p>{names[currentIndex].description}</p>
                </div>
                <div className="mt-5 h-[360px]  rounded-md bg-secondary p-5">
                  <div dangerouslySetInnerHTML={code} />
                </div>
                <div className="mt-5 flex flex-row gap-4">
                  <Button
                    variant={"outline"}
                    onClick={() => switchCode(currentIndex - 1)}
                  >
                    Previous
                  </Button>
                  <Button
                    variant={"outline"}
                    onClick={() => switchCode(currentIndex + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </section>

          <div className="flex w-full items-center justify-center">
            <ArrowDownCircle className="mt-5 size-10 animate-bounce text-primary" />
          </div>
        </div>

        <Separator />

        <section
          className="mt-10 flex flex-col items-center justify-center gap-4"
          id="features"
        >
          <h1 className="mb-10 p-5 text-6xl font-bold">
            Welcome terminal, bye bye browser.
          </h1>

          <h2 className="text-6xl font-bold">Features</h2>
          <p className="text-lg">Some of the features of Github CLI</p>
          <p className="text-lg">
            More info at
            <Button variant={"link"}>
              <Link href="https://cli.github.com/manual/gh">github docs</Link>
            </Button>
            .
          </p>

          <div className="mt-5 grid grid-cols-1 gap-10">
            <div className="flex flex-col items-center justify-center gap-4">
              <h3 className="p-5 text-center text-4xl font-bold">
                Make your workflow easier
              </h3>
              <div className="grid grid-cols-3 gap-5 p-6">
                <Button variant={"outline"}>Issue management</Button>
                <Button variant={"outline"}>Pull request management</Button>
                <Button variant={"outline"}>Repo management</Button>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
              <h3 className="p-5 text-center text-4xl font-bold">
                Scripting is the way
              </h3>
              <div className="grid grid-cols-3 gap-5 p-6">
                <Button variant={"outline"}>Integrate shell</Button>
                <Button variant={"outline"}>Script github actions</Button>
                <Button variant={"outline"}>Script github pages</Button>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
              <h3 className="p-5 text-center text-4xl font-bold">
                AI is the new partner
              </h3>
              <div className="grid grid-cols-3 gap-5 p-6">
                <Button variant={"outline"}>Automated testing</Button>
                <Button variant={"outline"}>Predictive typing</Button>
                <Button variant={"outline"}>Integration with AI tools</Button>
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-10 flex w-full items-center justify-center bg-primary p-5">
          <span className="text-secondary">Made by Adam Lipert, 2024</span>
        </footer>
      </main>
      <main className=" hidden h-screen w-screen items-center justify-center max-md:flex">
        <p className="p-5 text-center text-2xl">
          You are on a phone, lmao. Use computer or a tablet to view this page
          :)
        </p>
      </main>
    </div>
  )
}
