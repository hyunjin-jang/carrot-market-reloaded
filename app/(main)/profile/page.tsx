import db from "@/app/lip/db";
import getSession from "@/app/lip/session";
import { notFound, redirect } from "next/navigation";

const getUser = async () => {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound();
};

export default async function Profile() {
  const user = await getUser();
  const logout = async () => {
    "use server";
    const session = await getSession();
    session.destroy();
    redirect("/");
  };
  return (
    <div>
      <h1>Welcome! {user?.username}</h1>
      <form action={logout}>
        <button>Logout</button>
      </form>
    </div>
  );
}
