import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import React from "react";
import * as actions from "@/actions";
import { notFound } from "next/navigation";

type SnipppetDetailsProps = {
  params: Promise<{ id: string }>;
};

const SnippetDetailPage: React.FC<SnipppetDetailsProps> = async ({
  params,
}) => {
  const id = parseInt((await params).id);



  const snippet = await prisma.snippet.findUnique({
    where: {
      id,
    },
  });

  if (!snippet) notFound();

  const deleteSnippetActions = actions.deleteSnippet.bind(null, snippet.id);

  return (
  <>
   <div className='w-full'>
    <div className="flex w-[60%] mt-14  items-center justify-between mx-auto">
         <h1 className="font-semibold text-xl"> {snippet.title} </h1>
         <div className='flex gap-5'>
          <Link href={`/snippet/${snippet.id}/edit`}> <Button >EDIT</Button>  </Link>
          <form action={deleteSnippetActions} >   
                   <Button type='submit' variant={'destructive'}>Delete</Button>  
          </form>
          </div>
        </div>
        <pre className="bg-gray-100 my-14  w-[60%]   items-center  mx-auto p-5">
        <code>{snippet.code}</code>
        </pre>
        </div>   
       </>
  );
};

export default SnippetDetailPage;


export const generateStaticParams = async () => {
  const snippets = await prisma.snippet.findMany();

  return snippets.map((snippet)=> {
    return {id:snippet.id.toString()}
  })
}
 
