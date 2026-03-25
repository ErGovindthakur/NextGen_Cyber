import { currentUser } from "@clerk/nextjs/server";
import FormComponent from "@/components/FormComponent";
import { redirect } from "next/navigation";

export default async function FormPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in?redirect_url=/form");
  }

  return <FormComponent />;
}